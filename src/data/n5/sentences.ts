import type { LevelId, SentenceChallenge } from '../types.ts';

/**
 * Sentence-building challenges ("ghép câu"). Each one reuses vocabulary and
 * grammar of its lesson. Tokens are the tiles the learner has to arrange.
 */
const level: LevelId = 'n5';

type Draft = Omit<SentenceChallenge, 'id' | 'level'>;

const drafts: Draft[] = [
  // ---------- 1A ----------
  { lessonId: '1A', grammarId: 'n5-1A-g01', vi: 'Tôi là sinh viên.', answer: ['私', 'は', '学生', 'です'], distractors: ['も', 'か'] },
  { lessonId: '1A', grammarId: 'n5-1A-g01', vi: 'Anh Nam là người Việt Nam.', answer: ['ナムさん', 'は', 'ベトナム人', 'です'], distractors: ['日本人', 'も'] },
  { lessonId: '1A', grammarId: 'n5-1A-g01', vi: 'Đây là cà phê.', answer: ['これ', 'は', 'コーヒー', 'です'], distractors: ['あれ', 'ビール'] },
  { lessonId: '1A', grammarId: 'n5-1A-g02', vi: 'Anh Tanaka là bác sĩ phải không?', answer: ['田中さん', 'は', '医者', 'です', 'か'], distractors: ['も', 'ね'], hint: 'Câu hỏi: thêm「か」vào cuối câu.' },
  { lessonId: '1A', grammarId: 'n5-1A-g02', vi: 'Đó là món ăn Nhật phải không?', answer: ['それ', 'は', '日本料理', 'です', 'か'], distractors: ['これ', 'ベトナム料理'] },
  { lessonId: '1A', grammarId: 'n5-1A-g03', vi: 'Chị Mai cũng là nhân viên công ty.', answer: ['マイさん', 'も', '会社員', 'です'], distractors: ['は', '銀行員'], hint: '「も」= cũng, thay thế cho「は」.' },
  { lessonId: '1A', grammarId: 'n5-1A-g03', vi: 'Cái kia cũng là bia.', answer: ['あれ', 'も', 'ビール', 'です'], distractors: ['は', 'ジュース'] },
  { lessonId: '1A', grammarId: 'n5-1A-g01', vi: 'Thầy giáo là người Nhật.', answer: ['先生', 'は', '日本人', 'です'], distractors: ['学生', 'か'] },

  // ---------- 1B ----------
  { lessonId: '1B', grammarId: 'n5-1B-g04', vi: 'Tôi không phải là nhân viên ngân hàng.', answer: ['私', 'は', '銀行員', 'じゃありません'], distractors: ['です', 'も'], hint: 'Phủ định của「です」là「じゃありません / じゃないです」.' },
  { lessonId: '1B', grammarId: 'n5-1B-g04', vi: 'Đây không phải là chữ Hán.', answer: ['これ', 'は', '漢字', 'じゃないです'], distractors: ['ひらがな', 'です'] },
  { lessonId: '1B', grammarId: 'n5-1B-g04', vi: 'Không phải tiếng Nhật. Là tiếng Trung.', answer: ['日本語', 'じゃないです', '中国語', 'です'], distractors: ['韓国語', 'か'] },
  { lessonId: '1B', grammarId: 'n5-1B-g05', vi: 'Thư viện mở từ 9 giờ đến 6 giờ.', answer: ['図書館', 'は', '9時', 'から', '6時', 'まで', 'です'], distractors: ['まで', 'に'], hint: '「から」= từ (bắt đầu),「まで」= đến (kết thúc).' },
  { lessonId: '1B', grammarId: 'n5-1B-g05', vi: 'Bưu điện mở từ mấy giờ đến mấy giờ?', answer: ['郵便局', 'は', '何時', 'から', '何時', 'まで', 'です', 'か'], distractors: ['何分', 'ね'] },
  { lessonId: '1B', grammarId: 'n5-1B-g05', vi: 'Bây giờ là 4 giờ 15 phút.', answer: ['今', '4時', '15分', 'です'], distractors: ['何時', 'から'] },
  { lessonId: '1B', grammarId: 'n5-1B-g05', vi: 'Ngân hàng làm việc đến 3 giờ chiều.', answer: ['銀行', 'は', '午後', '3時', 'まで', 'です'], distractors: ['午前', 'から'] },

  // ---------- 1C ----------
  { lessonId: '1C', grammarId: 'n5-1C-g06', vi: 'Cái này bao nhiêu tiền?', answer: ['これ', 'は', 'いくら', 'です', 'か'], distractors: ['何', 'ね'] },
  { lessonId: '1C', grammarId: 'n5-1C-g06', vi: 'Cái đó 500 yên.', answer: ['そちら', 'は', '500円', 'です'], distractors: ['いくら', 'か'] },
  { lessonId: '1C', grammarId: 'n5-1C-g07', vi: 'Đó là cái gì?', answer: ['それ', 'は', '何', 'です', 'か'], distractors: ['いくら', 'よ'] },
  { lessonId: '1C', grammarId: 'n5-1C-g08', vi: '1.980 yên nhỉ.', answer: ['1,980円', 'です', 'ね'], distractors: ['か', 'よ'], hint: '「ね」dùng để xác nhận lại thông tin.' },
  { lessonId: '1C', grammarId: 'n5-1C-g09', vi: 'Ngày mai là Chủ nhật cơ.', answer: ['明日', 'は', '日曜日', 'です', 'よ'], distractors: ['土曜日', 'か'], hint: '「よ」báo thông tin mà đối phương chưa biết.' },
  { lessonId: '1C', grammarId: 'n5-1C-g09', vi: 'Anh Tanaka là nhân viên công ty đúng không nhỉ?', answer: ['田中さん', 'は', '会社員', 'です', 'よね'], distractors: ['か', 'も'] },
];

export const sentences: SentenceChallenge[] = drafts.map((d, i) => ({
  ...d,
  id: `${level}-${d.lessonId}-s${String(i + 1).padStart(2, '0')}`,
  level,
}));

