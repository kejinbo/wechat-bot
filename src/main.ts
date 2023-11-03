import { config, Wechaty, log, ScanStatus, WechatyBuilder } from 'wechaty';
import { onMessage } from './message';
import { notForgetSignOut } from './schedule/daily-tips';
import { PuppetPadlocal } from 'wechaty-puppet-padlocal';
const puppet = new PuppetPadlocal({
  token: 'puppet_padlocal_5e719c9342584cea9b0157b7a6b1c8cd',
});

const bot = WechatyBuilder.build({
  name: 'WechatBot',
  puppet, // 还是得用puppet，不然像找联系人，是无法找全的。
})
  .on('scan', (qrcode, status) => {
    if (status === ScanStatus.Waiting && qrcode) {
      const qrcodeImageUrl = ['https://wechaty.js.org/qrcode/', encodeURIComponent(qrcode)].join('');

      log.info(`onScan: ${ScanStatus[status]}(${status}) - ${qrcodeImageUrl}`);

      require('qrcode-terminal').generate(qrcode, { small: true }); // show qrcode on console
    } else {
      log.info(`onScan: ${ScanStatus[status]}(${status})`);
    }
  })

  .on('login', async (user) => {
    log.info(`${user} login`);
    await notForgetSignOut(bot, '🍥');
  })

  .on('logout', (user, reason) => {
    log.info(`${user} logout, reason: ${reason}`);
  })

  .on('message', onMessage);

bot.start().then(async () => {
  log.info('started.');
});
// const toContact = await bot.Contact.load('KJinBo');
