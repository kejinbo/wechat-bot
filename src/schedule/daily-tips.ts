import { Wechaty } from 'wechaty';
import schedule, { JobCallback } from 'node-schedule';
import { getCityWeather } from '../request';
import { parseStringPromise, superagent, cheerio } from '../tools/lib-tool';
import { room_id_list } from '../tools/constant';

// import { messageText } from '../message/mockData';
// date 参数

// 其他规则见 https://www.npmjs.com/package/node-schedule
// 规则参数讲解
// *：匹配任意单个原子值，每分钟，每小时，每天等
// ,：分隔列表项，星期项 1,3,5表示每周的一三五匹配
// -：定义范围，小时项 9-18表示早上9点到下午6点，每小时都匹配
// /：表示间隔时间执行，小时项9/2表示从早上9点开始，每2小时执行一次
// ?：只用于日期项和星期项，为了表示互斥，日期项如果有值，星期项就得用?，反之亦然，否则配置会失效
// L：只用于日期项和星期项，表示一个月的倒数第几天或一星期中的倒数第几天，5L表示倒数第五天
// W：只用于日期项，表示距离工作日（周一到周五）最近的一天
// #：只用于星期项，5#3对应于每个月的第三个星期五
//
// *  *  *  *  *  *
// ┬ ┬ ┬ ┬ ┬ ┬
// │ │ │ │ │ |
// │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
// │ │ │ │ └───── month (1 - 12)
// │ │ │ └────────── day of month (1 - 31)
// │ │ └─────────────── hour (0 - 23)
// │ └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

// 每分钟的第30秒触发： '30 * * * * *'
//
// 每小时的1分30秒触发 ：'30 1 * * * *'
//
// 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
//
// 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
//
// 每周1的1点1分30秒触发 ：'30 1 1 * * 1'
//
//

export function setSchedule(date: string, callback: JobCallback): void {
  schedule.scheduleJob(date, callback);
}
// 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

// 工作日签到提示
export async function notForgetSignInOut(bot: Wechaty, toUserId: string) {
  const contact = await bot.Contact.find({ id: toUserId });
  setSchedule('0 0 9 * * ,1-5', async () => {
    contact?.say('别忘了签入！');
  });
  setSchedule('0 0 19 * * ,1-5', async () => {
    contact?.say('别忘了签出！');
  });
}

// 早点休息：每天 23:30 提醒用户早点休息
export async function sleepTips(bot: Wechaty) {
  setSchedule('0 30 23 * * *', async () => {
    for (let id of room_id_list) {
      const room = await bot.Room.find({ id });
      room?.say('已经很晚咯，大家早点休息喔！');
    }
  });
}

// 每日热点
export async function hotNewsTips(bot: Wechaty, messageText: string) {
  const result = await parseStringPromise(messageText);
    const appmsgArr = result.msg.appmsg || result.appmsg
    if (appmsgArr && appmsgArr.length) {
      const url = appmsgArr[0].url[0];
      const news = await superagent.get(url);
      let $ = cheerio.load(news.text);
      const hotNews: string[] = [];
      $('section[data-id="89202"] p').each((idx: number, ele: any) => {
        hotNews.push($(ele).text());
      });
      // 【微语】
      $('section[data-id="89202"] section[data-role="outer"] p:last + section').each((idx: number, ele: any) => {
        hotNews.push($(ele).text());
      });
      let text = '';
      hotNews[0] = hotNews[0].replace('【每日资讯简报，一分钟知天下事】', '【早报】');
      for (let i = 0; i < hotNews.length; i++) {
        const news = hotNews[i];
        text += `
${news}
        `;
      }
      
      for (let id of room_id_list) {
        const room = await bot.Room.find({ id });
        room?.say(text);
      }
    }
}

// 天气预报
export async function dailyWeatherTips(bot: Wechaty) {
  try {
    
    setSchedule('0 0 9 * * *', async () => {
      Promise.all([getCityWeather(440300), getCityWeather(440100), getCityWeather(440900)]).then(async (results) => {
        let result = '米娜桑，早上好~';
        for (let i = 0; i < results.length; i++) {
          const res = results[i].data;
          if (res.status == 1) {
            const today = res.forecasts[0].casts[0];
            result += `
${res.forecasts[0].province}省${res.forecasts[0].city}今日天气报告：
白天：${today.dayweather}；夜间：${today.nightweather}，
白天气温：${today.daytemp_float}；夜间气温：${today.nighttemp_float}
            `;
          } else {
            throw new Error('获取天气信息失败，请稍后重试');
          }
        }

        for (let id of room_id_list) {
          const room = await bot.Room.find({ id });
          room?.say(result);
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}
