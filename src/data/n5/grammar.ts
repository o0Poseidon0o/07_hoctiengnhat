import type { Grammar, LevelId } from '../types.ts';
import { grammar2to7 } from './grammar-2to7.ts';
import { grammar8to10 } from './grammar-8to10.ts';
import { grammar8to14 } from './grammar-8to14.ts';

/**
 * Full N5 grammar across all 41 sub-lessons (1A–14C), following the Dung Mori "Ngữ pháp N5" book.
 */
const level: LevelId = 'n5';

const grammarUnit1: Grammar[] = [
  // ---------------- 1A ----------------
  {
    id: 'n5-1A-g01',
    level,
    lessonId: '1A',
    no: 1,
    pattern: '（N1 は） N2 です',
    meaning: 'N1 là N2',
    explanation:
      'Câu khẳng định có vị ngữ là danh từ ở thì phi quá khứ. Dùng để giới thiệu chủng loại, thời gian, địa điểm, tên tuổi, giới tính... của một chủ thể.',
    notes: [
      '「は」là trợ từ đứng sau chủ đề câu, đọc là "wa".',
      '「です」thể hiện ý khẳng định và tính lịch sự của câu.',
      'Khi N1 là bản thân người nói hoặc chủ đề đối phương đã biết thì có thể lược bỏ「N1 は」.',
    ],
    examples: [
      { ja: '鈴木です。', ruby: [["鈴木","すずき"],["です。"]], vi: 'Tôi là Suzuki.' },
      { ja: 'ナムさんは ベトナム人です。', ruby: [["ナムさんは ベトナム"],["人","じん"],["です。"]], vi: 'Anh Nam là người Việt Nam.' },
      { ja: 'かなえさんは 学生です。', ruby: [["かなえさんは "],["学生","がくせい"],["です。"]], vi: 'Kanae là sinh viên.' },
      { ja: 'これは フォーです。', vi: 'Đây là phở.' },
      { ja: 'はじめまして、ミンです。よろしくお願いします。', ruby: [["はじめまして、ミンです。よろしくお"],["願いします。","ねがいします"]], vi: 'Rất vui được gặp anh/chị, tôi là Minh. Rất mong được giúp đỡ.' },
    ],
  },
  {
    id: 'n5-1A-g02',
    level,
    lessonId: '1A',
    no: 2,
    pattern: '（N1 は） N2 ですか',
    meaning: 'N1 có phải là N2 không?',
    explanation:
      'Câu nghi vấn có vị ngữ là danh từ, tạo thành bằng cách thêm「か」vào cuối câu. Trả lời: はい、そうです / (N1 は) N2 です — いいえ、(N1 は) N3 です.',
    notes: ['Đọc lên giọng ở cuối câu「か」.'],
    examples: [
      { ja: 'あ、田中さんですか。', ruby: [["あ、"],["田中","たなか"],["さんですか。"]], vi: 'A, có phải anh Tanaka không?' },
      { ja: '会社員ですか。― いいえ、学生です。', ruby: [["会社員","かいしゃいん"],["ですか。― いいえ、"],["学生","がくせい"],["です。"]], vi: 'Bạn là nhân viên công ty à? ― Không, tôi là sinh viên.' },
      { ja: '田中さんは 会社員ですか。― はい、そうです。', ruby: [["田中","たなか"],["さんは "],["会社員","かいしゃいん"],["ですか。― はい、そうです。"]], vi: 'Anh Tanaka là nhân viên công ty phải không? ― Vâng, đúng vậy.' },
      { ja: 'これは フォーですか。― いいえ、これは ブンです。', vi: 'Đây là phở à? ― Không, đây là bún.' },
    ],
  },
  {
    id: 'n5-1A-g03',
    level,
    lessonId: '1A',
    no: 3,
    pattern: 'N も ～',
    meaning: 'N cũng ～',
    explanation:
      'N chỉ sự vật, sự việc có cùng thuộc tính với chủ thể đã được nhắc trước đó.「も」đứng ngay sau N, mang nghĩa "cũng".',
    notes: ['Khi trả lời phủ định cho câu hỏi có「も」, trợ từ quay về「は」: いいえ、ランさんは ベトナム人です。'],
    examples: [
      { ja: 'これは ベトナム料理です。それも ベトナム料理です。', ruby: [["これは ベトナム"],["料理","りょうり"],["です。それも ベトナム"],["料理","りょうり"],["です。"]], vi: 'Đây là món Việt. Cái đó cũng là món Việt.' },
      { ja: 'ナムさんは ベトナム人です。マインさんも ベトナム人です。', ruby: [["ナムさんは ベトナム"],["人","じん"],["です。マインさんも ベトナム"],["人","じん"],["です。"]], vi: 'Nam là người Việt Nam. Mạnh cũng là người Việt Nam.' },
      { ja: '田中さんは 会社員です。マイさんも 会社員です。', ruby: [["田中","たなか"],["さんは "],["会社員","かいしゃいん"],["です。マイさんも "],["会社員","かいしゃいん"],["です。"]], vi: 'Anh Tanaka là nhân viên công ty. Chị Mai cũng là nhân viên công ty.' },
    ],
  },
  // ---------------- 1B ----------------
  {
    id: 'n5-1B-g04',
    level,
    lessonId: '1B',
    no: 4,
    pattern: '（N1 は） N2 じゃないです / じゃありません / ではありません',
    meaning: 'N1 không phải là N2',
    explanation: 'Câu phủ định của câu có vị ngữ là danh từ.「じゃないです / じゃありません / ではありません」là dạng phủ định của「です」.',
    notes: [
      '「ではありません」thường dùng trong văn viết.',
      '「じゃないです」và「じゃありません」thường dùng trong văn nói;「じゃありません」cứng hơn một chút.',
    ],
    examples: [
      { ja: '田中さんは 銀行員じゃないです。', ruby: [["田中","たなか"],["さんは "],["銀行員","ぎんこういん"],["じゃないです。"]], vi: 'Anh Tanaka không phải là nhân viên ngân hàng.' },
      { ja: 'ミンさんは 中国人じゃないです。', ruby: [["ミンさんは "],["中国人","ちゅうごくじん"],["じゃないです。"]], vi: 'Minh không phải là người Trung Quốc.' },
      { ja: 'これは 日本語ですか。― いいえ、違います。中国語です。', ruby: [["これは "],["日本語","にほんご"],["ですか。― いいえ、"],["違","ちが"],["います。"],["中国語","ちゅうごくご"],["です。"]], vi: 'Đây là tiếng Nhật à? ― Không, sai rồi. Là tiếng Trung.' },
      { ja: 'これは ひらがなですか。― いいえ、ひらがなじゃないです。漢字です。', ruby: [["これは ひらがなですか。― いいえ、ひらがなじゃないです。"],["漢字","かんじ"],["です。"]], vi: 'Đây là hiragana à? ― Không, không phải hiragana. Là chữ Hán.' },
    ],
  },
  {
    id: 'n5-1B-g05',
    level,
    lessonId: '1B',
    no: 5,
    pattern: 'N は 何時から 何時までですか → ～から ～までです',
    meaning: 'N từ mấy giờ đến mấy giờ? → Từ ～ giờ đến ～ giờ.',
    explanation:
      'Hỏi và trả lời về thời gian bắt đầu – kết thúc của một cơ quan, chương trình, sự kiện.「から」chỉ điểm bắt đầu,「まで」chỉ điểm kết thúc; có thể dùng riêng lẻ.',
    notes: [
      'Giờ: số đếm + 時（じ）. Phút: số đếm + 分（ふん / ぷん）. Hỏi giờ: 何時（なんじ）, 何分（なんぷん）.',
      'Khi hỏi giờ hiện tại người Nhật thường không dùng「は」: 今 何時ですか。',
      'Chú ý: 4時 よじ, 7時 しちじ, 9時 くじ; 1分 いっぷん, 6分 ろっぷん, 10分 じゅっぷん.',
    ],
    examples: [
      { ja: '今 何時何分ですか。― 今 4時15分です。', ruby: [["今","いま"],[" "],["何時何分","なんじなんぷん"],["ですか。― "],["今","いま"],[" "],["4時","よじ"],["15分","じゅうごふん"],["です。"]], vi: 'Bây giờ là mấy giờ mấy phút? ― Bây giờ là 4 giờ 15 phút.' },
      { ja: '図書館は 9時からです。', ruby: [["図書館","としょかん"],["は "],["9時","くじ"],["からです。"]], vi: 'Thư viện mở cửa từ 9 giờ.' },
      { ja: '会社は 7時半から 5時までです。', ruby: [["会社","かいしゃ"],["は "],["7時","しちじ"],["半","はん"],["から "],["5時","ごじ"],["までです。"]], vi: 'Công ty làm việc từ 7 giờ rưỡi đến 5 giờ.' },
      { ja: '郵便局は 何時から 何時までですか。― 午前9時半から 午後4時半までです。', ruby: [["郵便局","ゆうびんきょく"],["は "],["何時","なんじ"],["から "],["何時","なんじ"],["までですか。― "],["午前","ごぜん"],["9時","くじ"],["半","はん"],["から "],["午後","ごご"],["4時","よじ"],["半","はん"],["までです。"]], vi: 'Bưu điện mở từ mấy giờ đến mấy giờ? ― Từ 9 giờ rưỡi sáng đến 4 giờ rưỡi chiều.' },
    ],
  },
  // ---------------- 1C ----------------
  {
    id: 'n5-1C-g06',
    level,
    lessonId: '1C',
    no: 6,
    pattern: 'N（は）いくらですか → N（は）[số tiền] です',
    meaning: 'N bao nhiêu tiền?',
    explanation: 'Mẫu câu dùng để hỏi giá tiền.「いくら」là từ để hỏi giá: bao nhiêu tiền?',
    notes: ['Người bán thường dùng「こちら / そちら」thay cho「これ / それ」để lịch sự hơn.'],
    examples: [
      { ja: 'これ、いくらですか。― そちらは 1,980円です。', ruby: [["これ、いくらですか。― そちらは 1,980"],["円","えん"],["です。"]], vi: 'Cái này bao nhiêu tiền? ― Cái đó 1.980 yên.' },
      { ja: 'それは いくらですか。― こちらは 3,800円です。', ruby: [["それは いくらですか。― こちらは 3,800"],["円","えん"],["です。"]], vi: 'Cái đó bao nhiêu tiền? ― Cái này 3.800 yên.' },
    ],
  },
  {
    id: 'n5-1C-g07',
    level,
    lessonId: '1C',
    no: 7,
    pattern: 'N1（は）何ですか → N1（は）N2 です',
    meaning: 'N1 là cái gì? → N1 là N2',
    explanation: 'Mẫu câu dùng để hỏi về đồ vật.「何（なん）」là từ để hỏi: cái gì?',
    notes: [],
    examples: [
      { ja: 'これは 何ですか。― カメラです。', ruby: [["これは "],["何","なん"],["ですか。― カメラです。"]], vi: 'Đây là cái gì? ― Là máy ảnh.' },
      { ja: 'それは 何ですか。― かさです。', ruby: [["それは "],["何","なん"],["ですか。― かさです。"]], vi: 'Đó là cái gì? ― Là cái ô.' },
      { ja: 'これは 何ですか。―（これは）辞書です。', ruby: [["これは "],["何","なん"],["ですか。―（これは）"],["辞書","じしょ"],["です。"]], vi: 'Đây là cái gì? ― (Đây là) từ điển.' },
    ],
  },
  {
    id: 'n5-1C-g08',
    level,
    lessonId: '1C',
    no: 8,
    pattern: '～ね',
    meaning: '～ nhỉ? (xác nhận lại)',
    explanation: '「～ね」đặt ở cuối câu để xác nhận lại thông tin từ đối phương một lần nữa.',
    notes: [],
    examples: [
      { ja: '電話番号は 080-1234-5678です。― 080-1234-5678ですね。', ruby: [["電話番号","でんわばんごう"],["は 080-1234-5678です。― 080-1234-5678ですね。"]], vi: 'Số điện thoại là 080-1234-5678. ― 080-1234-5678 nhỉ.' },
      { ja: 'こちらは 4,500円ですね。', ruby: [["こちらは 4,500"],["円","えん"],["ですね。"]], vi: 'Cái này 4.500 yên nhỉ.' },
    ],
  },
  {
    id: 'n5-1C-g09',
    level,
    lessonId: '1C',
    no: 9,
    pattern: '～よね / ～よ',
    meaning: '～ đúng không nhỉ? / ～ đấy, cơ',
    explanation:
      '「よね」: người nói cho rằng điều mình nghĩ là đúng và muốn xác nhận lại, hoặc tìm sự đồng tình. 「よ」: báo cho đối phương thông tin mà họ chưa biết.',
    notes: ['Dùng「よ」dễ nghe có vẻ bề trên, nên tránh dùng với cấp trên hoặc người không thân.'],
    examples: [
      { ja: '今日は 3日ですよね。― はい。そうです。', ruby: [["今日","きょう"],["は "],["3日","みっか"],["ですよね。― はい。そうです。"]], vi: 'Hôm nay là ngày 3 đúng không nhỉ? ― Vâng, đúng vậy.' },
      { ja: 'これは 1000円ですよね。― いいえ、それは 2000円です。', ruby: [["これは 1000"],["円","えん"],["ですよね。― いいえ、それは 2000"],["円","えん"],["です。"]], vi: 'Cái này 1000 yên đúng không? ― Không, cái đó 2000 yên.' },
      { ja: '明日は 土曜日ですよね。― いいえ、明日は 日曜日ですよ。', ruby: [["明日","あした"],["は "],["土曜日","どようび"],["ですよね。― いいえ、"],["明日","あした"],["は "],["日曜日","にちようび"],["ですよ。"]], vi: 'Ngày mai là thứ Bảy nhỉ? ― Không, ngày mai là Chủ nhật cơ.' },
      { ja: 'ゆいさんは 会社員ですよね。― いいえ、ゆいさんは 学生ですよ。', ruby: [["ゆいさんは "],["会社員","かいしゃいん"],["ですよね。― いいえ、ゆいさんは "],["学生","がくせい"],["ですよ。"]], vi: 'Yui là nhân viên công ty nhỉ? ― Không, Yui là sinh viên đấy.' },
    ],
  },
];

export const grammar: Grammar[] = [
  ...grammarUnit1,
  ...grammar2to7,
  ...grammar8to10,
  ...grammar8to14,
];

