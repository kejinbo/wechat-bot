import { log, ScanStatus, WechatyBuilder } from 'wechaty';
import { PuppetPadlocal } from 'wechaty-puppet-padlocal';
import { onMessage } from './message';
import { notForgetSignInOut, sleepTips, dailyWeatherTips } from './schedule/daily-tips';
import { puppet_token, boss_id } from './tools/constant';

const puppet = new PuppetPadlocal({
  token: puppet_token,
});

const bot = WechatyBuilder.build({
  name: 'kebobo',
  puppet, // 还是得用puppet，不然像找联系人，是无法找全的。
});
bot.on('scan', (qrcode, status) => {
  if (status === ScanStatus.Waiting && qrcode) {
    const qrcodeImageUrl = ['https://wechaty.js.org/qrcode/', encodeURIComponent(qrcode)].join('');
    log.info(`onScan: ${ScanStatus[status]}(${status}) - ${qrcodeImageUrl}`);

    // require('qrcode-terminal').generate(qrcode, { small: true }); // 生成二维码到控制台
  } else {
    log.info(`onScan: ${ScanStatus[status]}(${status})`);
  }
});

bot.on('login', async (user) => {
  log.info(`${user} login`);
  await notForgetSignInOut(bot, boss_id);
  await sleepTips(bot);
  await dailyWeatherTips(bot);
});

bot.on('logout', (user, reason) => {
  log.info(`${user} logout, reason: ${reason}`);
});

bot.on('message', (message) => {
  onMessage(message, bot);
});

bot.start().then(async () => {
  log.info('started.');
});

bot.ready().then(() => {
  log.info('ready.');
});
