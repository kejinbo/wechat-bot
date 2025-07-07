/**
 * 微信群 ID
 * 49904552220@chatroom 机器人测试群
 * 12138991560@chatroom 🌿(1-5)
 * 24942146074@chatroom 嗨森
 * 34533469663@chatroom 麻将群
 */
const dev = true;
const dev_room_list = ['49904552220@chatroom'];
const room_id_list = dev ? dev_room_list : ['12138991560@chatroom', '24942146074@chatroom', '34533469663@chatroom'];

/**
 * 联系人ID
 * */ 
const jian_bao_id = 'gh_a79260f596c1'; // 每日资讯简报公众号ID
const boss_id = 'wxid_wc3ya6ldt72222'; //大佬ID
const boss_bro_id = 'wxid_r7d3kgz8smqm22'; // 大佬小号ID

/**
 * 第三方 key
 * 
 * GD => 高德
 * */
const GD_KEY = '';
const GD_HOST = 'https://restapi.amap.com/v3/weather/weatherInfo';

const puppet_token = '';
const rapid_key = ''; // 去背景的 请求接口key

/**
 * 其他常量
 * */
// 获取宠物狗图片
const get_dog_photo_api = 'https://api.thedogapi.com/v1/images/search?size=full'
const get_cat_photo_api = 'https://api.thecatapi.com/v1/images/search?size=full'

// 名言警句
const get_quotations_from_famous_people = 'https://api.xygeng.cn/one';

// 讲个笑话
const joke_api = 'https://api.vvhan.com/api/joke';

export {
  room_id_list,
  jian_bao_id,
  boss_id,
  boss_bro_id,
  GD_KEY,
  GD_HOST,
  puppet_token,
  get_dog_photo_api,
  get_cat_photo_api,
  get_quotations_from_famous_people,
  rapid_key,
  joke_api,
}
