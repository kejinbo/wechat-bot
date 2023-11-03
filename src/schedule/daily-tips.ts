import { Wechaty } from 'wechaty';
import schedule, { JobCallback } from 'node-schedule';
// import { sendMsgToSomeone } from '../message';
// date 参数

//其他规则见 https://www.npmjs.com/package/node-schedule
// 规则参数讲解    *代表通配符
//
// *  *  *  *  *  *
// ┬ ┬ ┬ ┬ ┬ ┬
// │ │ │ │ │  |
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

export function setSchedule(date: string, callback: JobCallback): void{
  schedule.scheduleJob(date, callback);
}

// 别忘了签出
export async function notForgetSignOut(bot: Wechaty, toUserId: string) {
  setSchedule('0 * * * *', async () => {
    let contact = (await bot.Contact.find({ name: toUserId })) || (await bot.Contact.find({ alias: '大佬' }));
    console.log(contact);
    contact?.say('别忘了打卡！');
  });
}
