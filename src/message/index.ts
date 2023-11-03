import { Message, Wechaty } from 'wechaty';

export async function onMessage(message: Message) {
  try {
    const room = message.room();
    const sender = message.talker();
    const content = message.text();
    // console.log(room, sender);

    if (message.self()) {
      return;
    }

    // @me
    // if (content.includes('非凡哥')) {
    //   await message.say('叼毛！');
    // }
  } catch (e) {
    console.error(e);
  }
}

// export const sendMsgToSomeone = async (bot: Wechaty, toUserId: string, msg: any): Promise<Message> => {
  // const toContact = await bot.Contact.load(toUserId);
  // const message = (await toContact.say(msg)) as Message;
  // return message;
// };
