import { Message, Wechaty } from 'wechaty';
import { hotNewsTips } from '../schedule/daily-tips';
import { jian_bao_id } from '../tools/constant';

export async function onMessage(message: Message, bot: Wechaty) {
  try {
    const room = message.room();
    const sender = message.talker();
    const content = message.text();
    console.log(sender);

    if (message.self()) {
      return;
    }

    // 每日简报
    if (sender && sender.id === jian_bao_id) {
      await hotNewsTips(bot, content);
    }

  } catch (e) {
    console.error(e);
  }
}

