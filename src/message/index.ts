import { Message, Wechaty } from 'wechaty';
import * as PUPPET from 'wechaty-puppet';
import { FileBox } from 'file-box';
import { hotNewsTips, dailyWeatherTips } from '../schedule/daily-tips';
import { jian_bao_id } from '../tools/constant';
import {
  getCatPhoto,
  getDogPhoto,
  removeImgBackground,
  getQuotationsFromFamousPeople,
  getAJoke,
} from '../request/index';

export async function onMessage(message: Message, bot: Wechaty) {
  try {
    const room = message.room();
    const sender = message.talker();
    const content = message.text();

    if (message.self()) {
      return;
    }

    if (message.type() === PUPPET.types.Message.Recalled) {
      const recalledMessage = await message.toRecalled();
      console.log(`${sender.name}撤回：${recalledMessage}`);
      const allContent = await bot.Message.findAll();
      console.log(allContent);
    }

    // 是否在群里被@ 了
    if (room && content.includes('@kebobo')) {
      // console.log(content, room?.id);
      // if (content.includes('天气')) {
      //   dailyWeatherTips(bot, room?.id)
      // }

      if (/.*汪星人|狗|宠物|非凡哥.*/g.test(content) && /.*图片|图|照片.*/g.test(content)) {
        const res = await getDogPhoto();
        const url = res.data[0].url;
        const photo = await FileBox.fromUrl(url);
        message?.say(photo);
      }
      if (/.*喵星人|猫|宠物.*/g.test(content) && /.*图片|图|照片.*/g.test(content)) {
        const res = await getCatPhoto();
        const url = res.data[0].url;
        const photo = await FileBox.fromUrl(url);
        message?.say(photo);
      }

      if (/.*名人名言|名人语录|励志语言|鸡汤.*/g.test(content)) {
        const res = await getQuotationsFromFamousPeople();
        let text = `${res.data.data.content}
      ——${res.data.data.origin}`;
        message?.say(text);
      }

      if (/.*笑话.*/g.test(content)) {
        const res = await getAJoke();
        message?.say(res.data);
      }

      // const p = await removeImgBackground('https://cdn2.thedogapi.com/images/x6uo30K-M.jpg');
      // console.log(p);
    }

    // 每日简报
    if (sender && sender.id === jian_bao_id) {
      await hotNewsTips(bot, content);
    }
  } catch (e) {
    console.error(e);
  }
}
