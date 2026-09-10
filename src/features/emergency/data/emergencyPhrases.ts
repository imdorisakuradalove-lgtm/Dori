/**
 * Level 1 bundled content — must work with the device in airplane mode,
 * from first launch, with no login and no network call. See
 * docs/ARCHITECTURE.md "Offline capability levels".
 *
 * DRAFT CONTENT: these phrases have not yet been reviewed by a native or
 * professional Japanese speaker. Do not present them as verified — see
 * docs/PROVIDER_DECISION.md and the Phase 0 report for status.
 */

export type EmergencyPhrase = {
  id: string;
  zh: string;
  ja: string;
  romaji: string;
  english: string;
  /** If present, a real tel: link is offered next to this phrase. */
  tel?: string;
};

export const EMERGENCY_CONTENT_REVIEW_STATUS = 'draft' as const;

export const emergencyPhrases: EmergencyPhrase[] = [
  {
    id: 'help',
    zh: '请帮帮我。',
    ja: '助けてください。',
    romaji: 'Tasukete kudasai.',
    english: 'I need help.',
  },
  {
    id: 'call-police',
    zh: '请报警。',
    ja: '警察を呼んでください。',
    romaji: 'Keisatsu o yonde kudasai.',
    english: 'Please call the police.',
    tel: 'tel:110',
  },
  {
    id: 'call-ambulance',
    zh: '请叫救护车。',
    ja: '救急車を呼んでください。',
    romaji: 'Kyuukyuusha o yonde kudasai.',
    english: 'Please call an ambulance.',
    tel: 'tel:119',
  },
  {
    id: 'need-hospital',
    zh: '我要去医院。',
    ja: '病院に行きたいです。',
    romaji: 'Byouin ni ikitai desu.',
    english: 'I need to go to a hospital.',
  },
  {
    id: 'lost',
    zh: '我迷路了。',
    ja: '道に迷いました。',
    romaji: 'Michi ni mayoimashita.',
    english: 'I am lost.',
  },
  {
    id: 'lost-passport',
    zh: '我的护照丢了。',
    ja: 'パスポートをなくしました。',
    romaji: 'Pasupooto o nakushimashita.',
    english: 'I lost my passport.',
  },
  {
    id: 'lost-wallet',
    zh: '我的钱包丢了。',
    ja: '財布をなくしました。',
    romaji: 'Saifu o nakushimashita.',
    english: 'I lost my wallet.',
  },
  {
    id: 'contact-staff',
    zh: '请帮我叫工作人员。',
    ja: 'スタッフを呼んでください。',
    romaji: 'Sutaffu o yonde kudasai.',
    english: 'Please help me contact staff.',
  },
];
