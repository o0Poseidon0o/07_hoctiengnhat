import type { LevelId, SentenceChallenge } from '../types.ts';

/**
 * Sentence-building challenges ("ghép câu") for JLPT N4 (Units 15–33).
 */
const level: LevelId = 'n4';

type Draft = Omit<SentenceChallenge, 'id' | 'level'>;

const drafts: Draft[] = [
  // ---------- 15A–15B ----------
  { lessonId: '15A', grammarId: 'n4-15A-g01', vi: 'Vì đã học nhiều nên chắc hẳn sẽ đỗ thôi.', answer: ['たくさん', '勉強した', 'から', 'きっと', '合格する', 'でしょう'], distractors: ['のに', 'つもり'], hint: '「でしょう / だろう」= chắc hẳn (phán đoán tỷ lệ cao).' },
  { lessonId: '15A', grammarId: 'n4-15A-g02', vi: 'Cái cặp này dễ thương đúng không?', answer: ['この', 'かばん', 'かわいい', 'でしょう'], distractors: ['ですか', 'はず'], hint: 'Lên giọng với「でしょう？」để hỏi sự đồng tình.' },
  { lessonId: '15B', grammarId: 'n4-15B-g03', vi: 'Vì trời nhiều mây nên hình như sắp mưa.', answer: ['雲が', '多い', 'から', '雨が', '降る', 'ようだ'], distractors: ['はずだ', 'つもり'], hint: '「ようだ」diễn tả phán đoán từ những gì nhìn thấy/cảm nhận.' },
  { lessonId: '15B', grammarId: 'n4-15B-g04', vi: 'Nhà hàng này nổi tiếng nên chắc chắn ngon.', answer: ['この', 'レストランは', '有名', 'だから', 'おいしい', 'はずです'], distractors: ['ようです', 'かも'], hint: '「はずだ」= chắc chắn (dựa trên căn cứ).' },

  // ---------- 16A–16B ----------
  { lessonId: '16A', grammarId: 'n4-16A-g01', vi: 'Theo dự báo thời tiết thì ngày mai trời sẽ lạnh.', answer: ['天気予報', 'によると', '明日は', '寒い', 'そうです'], distractors: ['ようです', 'はずです'], hint: '「～によると～そうだ」= nghe nói theo nguồn tin...' },
  { lessonId: '16B', grammarId: 'n4-16B-g01', vi: 'Tôi nghe nói anh Tanaka đã về nước rồi.', answer: ['田中さんは', 'もう', '国へ', '帰った', 'そうです'], distractors: ['みたいです', 'らしい'], hint: 'Thể thường + そうだ (truyền đạt lại thông tin).' },

  // ---------- 17A–17B ----------
  { lessonId: '17A', grammarId: 'n4-17A-g01', vi: 'Vì bị sốt nên hôm nay tôi xin nghỉ làm.', answer: ['熱が', 'ある', 'んです', 'だから', '今日', '休みます'], distractors: ['のに', 'ので'], hint: '「～んです」dùng để giải thích nguyên nhân, tình huống.' },
  { lessonId: '17B', grammarId: 'n4-17B-g01', vi: 'Tại sao bạn lại đến muộn thế?', answer: ['どうして', '遅れた', 'んです', 'か'], distractors: ['ます', 'ね'], hint: '「どうして～んですか」hỏi lý do.' },

  // ---------- 18A–18B ----------
  { lessonId: '18A', grammarId: 'n4-18A-g01', vi: 'Cái bánh này trông có vẻ ngon nhỉ.', answer: ['この', 'ケーキは', 'おいし', 'そう', 'ですね'], distractors: ['よう', 'はず'], hint: 'Tính từ bỏ い + そうだ = trông có vẻ...' },
  { lessonId: '18B', grammarId: 'n4-18B-g01', vi: 'Trời đã trở nên tối rồi.', answer: ['空が', '暗く', 'なりました'], distractors: ['しました', 'です'], hint: 'A い (bỏ い) + く + なる = trở nên...' },

  // ---------- 19A–19B ----------
  { lessonId: '19A', grammarId: 'n4-19A-g01', vi: 'Cửa sổ đang mở sẵn kia kìa.', answer: ['窓が', '開いて', 'います'], distractors: ['開けて', 'あります'], hint: 'Tự động từ + ている diễn tả trạng thái kết quả.' },
  { lessonId: '19B', grammarId: 'n4-19B-g01', vi: 'Trên bàn có đặt sẵn hoa rồi.', answer: ['テーブルに', '花が', '飾って', 'あります'], distractors: ['います', 'おきます'], hint: 'N が + V 他 てある = có sẵn... (do ai đó làm trước).' },

  // ---------- 20A–20C ----------
  { lessonId: '20A', grammarId: 'n4-20A-g01', vi: 'Người đang đeo kính là anh Yamada.', answer: ['めがねを', 'かけている', '人は', '山田さん', 'です'], distractors: ['かけた', 'いる'], hint: 'Mệnh đề bổ nghĩa đứng ngay trước danh từ「人」.' },
  { lessonId: '20B', grammarId: 'n4-20B-g01', vi: 'Hôm nay tôi có hẹn đi xem phim với bạn.', answer: ['今日は', '友達と', '映画を', '見る', '約束が', 'あります'], distractors: ['見た', 'こと'], hint: '「V る + 約束があります」= có hẹn làm gì.' },
  { lessonId: '20C', grammarId: 'n4-20C-g01', vi: 'Có mùi thơm từ trong bếp bay ra.', answer: ['台所から', 'いい', 'においが', 'します'], distractors: ['あります', 'なります'], hint: '「におい / 音 / 声 + がする」= có mùi / tiếng...' },

  // ---------- 21A–21B ----------
  { lessonId: '21A', grammarId: 'n4-21A-g01', vi: 'Tôi thích việc nấu ăn.', answer: ['私は', '料理を', '作る', 'のが', '好き', 'です'], distractors: ['を', 'こと'], hint: '「V る + のが + 好き / 上手」= thích / giỏi việc...' },
  { lessonId: '21B', grammarId: 'n4-21B-g01', vi: 'Tôi đã quên mất việc gửi bức thư này.', answer: ['この', '手紙を', '出す', 'のを', '忘れました'], distractors: ['のが', 'のに'], hint: '「V る + のを忘れる」= quên làm gì.' },

  // ---------- 22A–22B ----------
  { lessonId: '22A', grammarId: 'n4-22A-g01', vi: 'Không được vứt rác ở đây!', answer: ['ここに', 'ゴミを', '捨てる', 'な'], distractors: ['て', 'ないで'], hint: '「V る + な」= cấm làm gì!' },
  { lessonId: '22B', grammarId: 'n4-22B-g01', vi: 'Biển báo này có nghĩa là cấm chụp ảnh.', answer: ['この', 'マークは', '写真を', '撮るな', 'という', '意味です'], distractors: ['ように', 'ため'], hint: '「～という意味です」= có nghĩa là...' },

  // ---------- 23A–23C ----------
  { lessonId: '23A', grammarId: 'n4-23A-g01', vi: 'Tôi đã được anh Suzuki dạy tiếng Nhật.', answer: ['私は', '鈴木さんに', '日本語を', '教えて', 'もらいました'], distractors: ['あげました', 'くれました'], hint: '「A は B に V てもらう」= A được B làm cho.' },
  { lessonId: '23B', grammarId: 'n4-23B-g01', vi: 'Bạn có thể cho tôi mượn bút một chút không?', answer: ['ちょっと', 'ペンを', '貸して', 'もらえませんか'], distractors: ['あげませんか', 'くれますか'], hint: '「V てもらえませんか」= bạn có thể làm giúp tôi được không?' },

  // ---------- 24A–24B ----------
  { lessonId: '24A', grammarId: 'n4-24A-g01', vi: 'Sáng nay tôi đã đi làm mà không ăn sáng.', answer: ['今朝', '朝ごはんを', '食べないで', '会社へ', '行きました'], distractors: ['なくて', 'ずに'], hint: '「V ないで」= làm V2 mà không làm V1.' },
  { lessonId: '24B', grammarId: 'n4-24B-g01', vi: 'Cái áo này đắt quá nên tôi không mua.', answer: ['この', 'シャツは', '高すぎる', 'ので', '買いません'], distractors: ['すぎる', 'から'], hint: '「A い (bỏ い) + すぎる」= quá...' },

  // ---------- 25A–25C ----------
  { lessonId: '25A', grammarId: 'n4-25A-g01', vi: 'Tôi đã quyết định năm sau sẽ đi du học Nhật Bản.', answer: ['来年', '日本へ', '留学する', 'ことに', 'しました'], distractors: ['なりました', 'ように'], hint: '「V る + ことにする」= tự mình quyết định.' },
  { lessonId: '25B', grammarId: 'n4-25B-g01', vi: 'Tôi cố gắng mỗi ngày đều học 30 phút tiếng Nhật.', answer: ['毎日', '30分', '日本語を', '勉強する', 'ように', 'しています'], distractors: ['ことに', 'なりました'], hint: '「V る + ようにしている」= duy trì thói quen/cố gắng.' },

  // ---------- 26A–26B ----------
  { lessonId: '26A', grammarId: 'n4-26A-g01', vi: 'Cuối tuần tôi dự định đi Kyoto cùng gia đình.', answer: ['週末は', '家族と', '京都へ', '行く', 'つもりです'], distractors: ['はずです', 'ようです'], hint: '「V る + つもりです」= dự định làm gì.' },
  { lessonId: '26B', grammarId: 'n4-26B-g01', vi: 'Tháng sau tôi có kế hoạch đi công tác Tokyo.', answer: ['来月', '東京へ', '出張する', '予定です'], distractors: ['つもり', 'はず'], hint: '「V る + 予定です」= theo kế hoạch/lịch trình.' },

  // ---------- 27A–27C ----------
  { lessonId: '27A', grammarId: 'n4-27A-g01', vi: 'Nếu trời mưa thì buổi dã ngoại sẽ bị hủy.', answer: ['雨が', '降ったら', 'ピクニックは', '中止に', 'なります'], distractors: ['降れば', 'のに'], hint: '「V た + ら」= nếu/khi...' },
  { lessonId: '27B', grammarId: 'n4-27B-g01', vi: 'Tôi lỡ làm rơi mất ví tiền trên tàu rồi.', answer: ['電車で', '財布を', '落として', 'しまいました'], distractors: ['おきました', 'みました'], hint: '「V てしまう」diễn tả sự việc lỡ xảy ra, đáng tiếc.' },

  // ---------- 28A–28B ----------
  { lessonId: '28A', grammarId: 'n4-28A-g01', vi: 'Chiếc đồng hồ này được làm ở Nhật Bản.', answer: ['この', '時計は', '日本で', '作られました'], distractors: ['作りました', '作らせました'], hint: 'Thể bị động (V られる) diễn tả đồ vật được sản xuất ở đâu.' },
  { lessonId: '28B', grammarId: 'n4-28B-g01', vi: 'Xin phép cho tôi nghỉ sớm hôm nay được không ạ?', answer: ['今日', '早く', '帰らせて', 'いただけませんか'], distractors: ['もらいますか', 'くれますか'], hint: '「V させていただけませんか」= xin phép cho tôi làm...' },

  // ---------- 29A–29B ----------
  { lessonId: '29A', grammarId: 'n4-29A-g01', vi: 'Mặc dù đã uống thuốc nhưng vẫn chưa khỏi sốt.', answer: ['薬を', '飲んだ', 'のに', '熱が', '下がりません'], distractors: ['から', 'ので'], hint: '「～のに」= mặc dù... nhưng (trái với mong đợi).' },
  { lessonId: '29B', grammarId: 'n4-29B-g01', vi: 'Hãy viết tên vào đây.', answer: ['ここに', '名前を', '書き', 'なさい'], distractors: ['て', 'ろ'], hint: '「V ます + なさい」= hãy làm... (mệnh lệnh nhẹ).' },

  // ---------- 30A–30C ----------
  { lessonId: '30A', grammarId: 'n4-30A-g01', vi: 'Khi đi ra ngoài, tôi luôn khóa cửa cẩn thận.', answer: ['出かける', 'とき', 'いつも', '鍵を', 'かけます'], distractors: ['出かけた', 'あとで'], hint: '「V る + とき」= trước khi / lúc sắp làm V.' },
  { lessonId: '30C', grammarId: 'n4-30C-g01', vi: 'Tôi đã thử mặc chiếc áo sơ mi mới này.', answer: ['この', '新しい', 'シャツを', '着て', 'みました'], distractors: ['おきました', 'しまいました'], hint: '「V てみる」= thử làm gì.' },

  // ---------- 31A–31B ----------
  { lessonId: '31A', grammarId: 'n4-31A-g01', vi: 'Nếu luyện tập mỗi ngày thì sẽ nói giỏi tiếng Nhật.', answer: ['毎日', '練習', 'すれば', '日本語が', '上手に', 'なります'], distractors: ['したら', 'しても'], hint: 'Thể điều kiện「～ば」= nếu... thì...' },
  { lessonId: '31B', grammarId: 'n4-31B-g01', vi: 'Dù trời có mưa tôi cũng sẽ đi.', answer: ['雨が', '降っても', '行きます'], distractors: ['降ったら', '降れば'], hint: '「V ても」= cho dù... đi nữa.' },

  // ---------- 32A–32C ----------
  { lessonId: '32A', grammarId: 'n4-32A-g01', vi: 'Để mua nhà, tôi đang tiết kiệm tiền.', answer: ['家を', '買う', 'ために', '貯金して', 'います'], distractors: ['ように', 'のに'], hint: '「V る + ために」= để làm gì (mục đích ý chí).' },
  { lessonId: '32C', grammarId: 'n4-32C-g01', vi: 'Tôi nói to để mọi người đều có thể nghe rõ.', answer: ['みんなに', '聞こえる', 'ように', '大きい声で', '話します'], distractors: ['ために', 'つもり'], hint: '「V khả năng + ように」= để có thể...' },

  // ---------- 33A–33B ----------
  { lessonId: '33A', grammarId: 'n4-33A-g01', vi: 'Thầy giáo đang ở trong phòng họp ạ.', answer: ['先生は', '会議室に', 'いらっしゃいます'], distractors: ['おります', 'います'], hint: '「いらっしゃる」là tôn kính ngữ của「いる / 行く / 来る」.' },
  { lessonId: '33B', grammarId: 'n4-33B-g01', vi: 'Tôi tên là Minh, rất hân hạnh được gặp ạ.', answer: ['ミンと', '申します', 'よろしく', 'お願いします'], distractors: ['おっしゃいます', '言います'], hint: '「申します」là khiêm nhường ngữ của「言います」.' },
];

export const sentences: SentenceChallenge[] = drafts.map((d, index) => ({
  id: `${level}-${d.lessonId}-s${String(index + 1).padStart(3, '0')}`,
  level,
  ...d,
}));

