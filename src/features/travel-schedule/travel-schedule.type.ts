export type Times = '오전' | '오후' | '저녁' | '밤' | '기본';

export const TIME_STRINGS: { [key in Times]: string } = {
  오전: 'sunrise',
  오후: 'sun',
  저녁: 'sunset',
  밤: 'moon',
  기본: 'default',
} as const;
