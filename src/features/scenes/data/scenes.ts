/**
 * Level 1 bundled content for the 8 MVP scenes (docs/MVP_SCOPE.md).
 *
 * DRAFT CONTENT: these phrases have not yet been reviewed by a native or
 * professional Japanese speaker. They are drawn from common, well-attested
 * travel Japanese, but this app has not independently verified them with a
 * qualified reviewer. Never present this content as verified — see
 * docs/QA.md and the Phase 0 report.
 */

import type { IconName } from '@/src/design-system/IconName';

export type Phrase = {
  id: string;
  zh: string;
  ja: string;
  romaji: string;
  english: string;
};

export type SceneCategory = {
  id: string;
  label: string;
  phrases: Phrase[];
};

export type Scene = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  categories: SceneCategory[];
};

export const SCENE_CONTENT_REVIEW_STATUS = 'draft' as const;

export const scenes: Scene[] = [
  {
    id: 'train',
    title: 'Train / Station',
    description: 'Tickets, platforms, transfers, and lost items.',
    icon: { ios: 'tram.fill', android: 'train', web: 'train' },
    categories: [
      {
        id: 'train-general',
        label: 'General',
        phrases: [
          { id: 'train-1', zh: '这趟车开往___吗？', ja: 'この電車は◯◯行きですか？', romaji: 'Kono densha wa ◯◯ iki desu ka?', english: 'Is this train bound for ___?' },
          { id: 'train-2', zh: '售票处在哪里？', ja: '切符売り場はどこですか？', romaji: 'Kippu-uriba wa doko desu ka?', english: 'Where is the ticket counter?' },
          { id: 'train-3', zh: '下一班车几点？', ja: '次の電車は何時ですか？', romaji: 'Tsugi no densha wa nanji desu ka?', english: 'What time is the next train?' },
          { id: 'train-4', zh: '在这里可以换乘吗？', ja: 'ここで乗り換えられますか？', romaji: 'Koko de norikaeraremasu ka?', english: 'Can I transfer here?' },
          { id: 'train-5', zh: '我把东西忘在这里了。', ja: '忘れ物をしました。', romaji: 'Wasuremono o shimashita.', english: 'I left something behind.' },
        ],
      },
    ],
  },
  {
    id: 'airport',
    title: 'Airport',
    description: 'Gates, baggage, and immigration.',
    icon: { ios: 'airplane', android: 'flight', web: 'flight' },
    categories: [
      {
        id: 'airport-general',
        label: 'General',
        phrases: [
          { id: 'airport-1', zh: '登机口在哪里？', ja: '搭乗口はどこですか？', romaji: 'Toujouguchi wa doko desu ka?', english: 'Where is the boarding gate?' },
          { id: 'airport-2', zh: '在哪里取行李？', ja: '荷物はどこで受け取れますか？', romaji: 'Nimotsu wa doko de uketoremasu ka?', english: 'Where can I pick up my luggage?' },
          { id: 'airport-3', zh: '出境审查在哪里？', ja: '出国審査はどこですか？', romaji: 'Shukkoku shinsa wa doko desu ka?', english: 'Where is departure immigration?' },
          { id: 'airport-4', zh: '航班延误了吗？', ja: 'フライトが遅れていますか？', romaji: 'Furaito ga okurete imasu ka?', english: 'Is the flight delayed?' },
        ],
      },
    ],
  },
  {
    id: 'hotel',
    title: 'Hotel',
    description: 'Check-in, check-out, and room requests.',
    icon: { ios: 'bed.double.fill', android: 'hotel', web: 'hotel' },
    categories: [
      {
        id: 'hotel-general',
        label: 'General',
        phrases: [
          { id: 'hotel-1', zh: '我要办理入住。', ja: 'チェックインをお願いします。', romaji: 'Chekku-in o onegaishimasu.', english: 'Check-in, please.' },
          { id: 'hotel-2', zh: '几点退房？', ja: 'チェックアウトは何時ですか？', romaji: 'Chekkuauto wa nanji desu ka?', english: 'What time is check-out?' },
          { id: 'hotel-3', zh: '可以寄存行李吗？', ja: '荷物を預けられますか？', romaji: 'Nimotsu o azukeraremasu ka?', english: 'Can I leave my luggage here?' },
          { id: 'hotel-4', zh: '请告诉我Wi-Fi密码。', ja: 'Wi-Fiのパスワードを教えてください。', romaji: 'Wi-Fi no pasuwaado o oshiete kudasai.', english: 'Please tell me the Wi-Fi password.' },
          { id: 'hotel-5', zh: '可以换个房间吗？', ja: '部屋を変えてもらえますか？', romaji: 'Heya o kaete moraemasu ka?', english: 'Could I change rooms?' },
        ],
      },
    ],
  },
  {
    id: 'restaurant',
    title: 'Restaurant / Food',
    description: 'Ordering, paying, and allergy communication.',
    icon: { ios: 'fork.knife', android: 'restaurant', web: 'restaurant' },
    categories: [
      {
        id: 'restaurant-general',
        label: 'General',
        phrases: [
          { id: 'restaurant-1', zh: '有什么推荐的吗？', ja: 'おすすめは何ですか？', romaji: 'Osusume wa nan desu ka?', english: 'What do you recommend?' },
          { id: 'restaurant-2', zh: '买单。', ja: 'お会計をお願いします。', romaji: 'Okaikei o onegaishimasu.', english: 'Check, please.' },
          { id: 'restaurant-3', zh: '请不要做辣的。', ja: '辛くしないでください。', romaji: 'Karaku shinaide kudasai.', english: "Please don't make it spicy." },
        ],
      },
      {
        id: 'restaurant-allergy',
        label: 'Allergy',
        phrases: [
          { id: 'restaurant-allergy-1', zh: '我对___过敏。', ja: '私は◯◯アレルギーがあります。', romaji: 'Watashi wa ◯◯ arerugii ga arimasu.', english: 'I have a ___ allergy.' },
          { id: 'restaurant-allergy-2', zh: '这里面有鸡蛋吗？', ja: 'これに卵が入っていますか？', romaji: 'Kore ni tamago ga haitte imasu ka?', english: 'Does this contain egg?' },
          { id: 'restaurant-allergy-3', zh: '我不能吃猪肉。', ja: '豚肉を食べられません。', romaji: 'Butaniku o taberaremasen.', english: 'I cannot eat pork.' },
        ],
      },
    ],
  },
  {
    id: 'help',
    title: 'Lost / Help / Directions',
    description: 'When you need directions or a hand from someone nearby.',
    icon: { ios: 'signpost.right.fill', android: 'signpost', web: 'signpost' },
    categories: [
      {
        id: 'help-general',
        label: 'General',
        phrases: [
          { id: 'help-1', zh: '我迷路了。', ja: '道に迷いました。', romaji: 'Michi ni mayoimashita.', english: "I'm lost." },
          { id: 'help-2', zh: '这里是哪里？', ja: 'ここはどこですか？', romaji: 'Koko wa doko desu ka?', english: 'Where am I?' },
          { id: 'help-3', zh: '能帮我一下吗？', ja: '助けていただけますか？', romaji: 'Tasukete itadakemasu ka?', english: 'Could you help me?' },
          { id: 'help-4', zh: '最近的车站在哪里？', ja: '一番近い駅はどこですか？', romaji: 'Ichiban chikai eki wa doko desu ka?', english: 'Where is the nearest station?' },
          { id: 'help-5', zh: '我不会说日语。', ja: '日本語が話せません。', romaji: 'Nihongo ga hanasemasen.', english: "I can't speak Japanese." },
        ],
      },
    ],
  },
  {
    id: 'shopping',
    title: 'Shopping / Payment',
    description: 'Prices, payment methods, and tax-free.',
    icon: { ios: 'bag.fill', android: 'shopping_bag', web: 'shopping_bag' },
    categories: [
      {
        id: 'shopping-general',
        label: 'General',
        phrases: [
          { id: 'shopping-1', zh: '这个多少钱？', ja: 'これはいくらですか？', romaji: 'Kore wa ikura desu ka?', english: 'How much is this?' },
          { id: 'shopping-2', zh: '可以刷信用卡吗？', ja: 'クレジットカードは使えますか？', romaji: 'Kurejitto kaado wa tsukaemasu ka?', english: 'Can I use a credit card?' },
          { id: 'shopping-3', zh: '可以退税吗？', ja: '免税できますか？', romaji: 'Menzei dekimasu ka?', english: 'Can this be tax-free?' },
          { id: 'shopping-4', zh: '请给我一个袋子。', ja: '袋をください。', romaji: 'Fukuro o kudasai.', english: 'A bag, please.' },
          { id: 'shopping-5', zh: '可以试穿吗？', ja: '試着できますか？', romaji: 'Shichaku dekimasu ka?', english: 'Can I try this on?' },
        ],
      },
    ],
  },
  {
    id: 'medical',
    title: 'Emergency / Medical',
    description: 'Feeling unwell, finding a hospital or pharmacy.',
    icon: { ios: 'cross.case.fill', android: 'medical_services', web: 'medical_services' },
    categories: [
      {
        id: 'medical-general',
        label: 'General',
        phrases: [
          { id: 'medical-1', zh: '我不舒服。', ja: '具合が悪いです。', romaji: 'Guai ga warui desu.', english: 'I feel unwell.' },
          { id: 'medical-2', zh: '医院在哪里？', ja: '病院はどこですか？', romaji: 'Byouin wa doko desu ka?', english: 'Where is the hospital?' },
          { id: 'medical-3', zh: '药店在哪里？', ja: '薬局はどこですか？', romaji: 'Yakkyoku wa doko desu ka?', english: 'Where is the pharmacy?' },
          { id: 'medical-4', zh: '请叫救护车。', ja: '救急車を呼んでください。', romaji: 'Kyuukyuusha o yonde kudasai.', english: 'Please call an ambulance.' },
        ],
      },
    ],
  },
  {
    id: 'event',
    title: 'Event',
    description: 'Concerts, exhibitions, conventions, and stage events — generic, for any event.',
    icon: { ios: 'ticket.fill', android: 'confirmation_number', web: 'confirmation_number' },
    categories: [
      {
        id: 'event-general',
        label: 'General',
        phrases: [
          { id: 'event-1', zh: '入口在哪里？', ja: '入り口はどこですか？', romaji: 'Iriguchi wa doko desu ka?', english: 'Where is the entrance?' },
          { id: 'event-2', zh: '应该在哪里排队？', ja: 'どこに並べばいいですか？', romaji: 'Doko ni narabeba ii desu ka?', english: 'Where should I line up?' },
          { id: 'event-3', zh: '这是正确的队伍吗？', ja: 'これは正しい列ですか？', romaji: 'Kore wa tadashii retsu desu ka?', english: 'Is this the correct line?' },
          { id: 'event-4', zh: '在哪里可以买周边商品？', ja: 'グッズはどこで買えますか？', romaji: 'Guzzu wa doko de kaemasu ka?', english: 'Where can I buy merchandise?' },
          { id: 'event-5', zh: '可以拍照吗？', ja: '写真を撮ってもいいですか？', romaji: 'Shashin o totte mo ii desu ka?', english: 'Can I take photos?' },
          { id: 'event-6', zh: '可以帮我叫工作人员吗？', ja: 'スタッフを呼んでもらえますか？', romaji: 'Sutaffu o yonde moraemasu ka?', english: 'Could you call staff for me?' },
        ],
      },
    ],
  },
];

export function getSceneById(id: string): Scene | undefined {
  return scenes.find((scene) => scene.id === id);
}
