import type { GrammarAnalysis } from '../types.ts';

export const grammarAnalysis1to7: Record<string, GrammarAnalysis> = {
  // ---------------- Unit 1 ----------------
  'n5-1A-g01': {
    formula: 'N1 は N2 です',
    parts: [
      { token: 'N1 は', role: 'Chủ đề câu (người, vật được nói tới). Trợ từ 「は」 luôn đọc là "wa".' },
      { token: 'N2 です', role: 'Vị ngữ danh từ khẳng định lịch sự ở hiện tại/tương lai.' },
    ],
    tip: 'Chú ý: Khi N1 là "tôi" hoặc đối tượng cả hai đã biết, có thể lược bỏ 「N1 は」, chỉ nói 「N2 です」.',
  },
  'n5-1A-g02': {
    formula: 'N1 は N2 ですか',
    parts: [
      { token: 'か', role: 'Đặt ở cuối câu để biến câu khẳng định thành câu hỏi (lên giọng nhẹ ở cuối).' },
      { token: 'はい / いいえ', role: 'Trả lời: 「はい、そうです」(Vâng, đúng vậy) hoặc 「いいえ、N3 です」.' },
    ],
    tip: 'Lưu ý: Trong tiếng Nhật câu hỏi lịch sự dùng dấu chấm 「。」 chứ không bắt buộc dùng 「？」.',
  },
  'n5-1A-g03': {
    formula: 'N も N2 です',
    parts: [
      { token: 'も', role: 'Thay thế hoàn toàn cho 「は」 để mang nghĩa "cũng" khi N có cùng tính chất với chủ thể trước.' },
    ],
    tip: 'Chú ý: Không dùng 「はも」 cùng lúc! Khi trả lời phủ định cho câu hỏi có 「も」, trợ từ quay về 「は」.',
  },
  'n5-1B-g04': {
    formula: 'N1 は N2 じゃないです / じゃありません / ではありません',
    parts: [
      { token: 'じゃないです', role: 'Phủ định danh từ dùng phổ biến trong hội thoại hằng ngày.' },
      { token: 'じゃありません / ではありません', role: 'Trang trọng hơn; 「ではありません」 thường dùng trong văn viết/thuyết trình.' },
    ],
    tip: 'Mẹo nhớ: "Không phải là" ở lịch sự tăng dần từ 「じゃないです」 → 「じゃありません」 → 「ではありません」.',
  },
  'n5-1B-g05': {
    formula: 'N は 何時から 何時までですか → ～から ～までです',
    parts: [
      { token: '～から', role: 'Đánh dấu điểm bắt đầu ("từ ～").' },
      { token: '～まで', role: 'Đánh dấu điểm kết thúc ("đến ～"). Có thể dùng tách lẻ 「～から」 hoặc 「～まで」.' },
    ],
    tip: 'Chú ý: 「何時」 đọc là 「なんじ」. Có thể trả lời ngắn gọn chỉ bằng 「～から ～までです」.',
  },
  'n5-1C-g06': {
    formula: 'N は いくらですか → [Số tiền] です',
    parts: [
      { token: 'いくら', role: 'Từ để hỏi giá tiền ("bao nhiêu tiền").' },
    ],
    tip: 'Lưu ý: Với số tiền lớn (nghìn, vạn), chú ý âm biến đổi như 「さんぜんえん」(3000円), 「はっせんえん」(8000円).',
  },
  'n5-1C-g07': {
    formula: 'N1 は 何ですか → N1 は N2 です',
    parts: [
      { token: '何ですか', role: 'Trước 「です」 thì 「何」 luôn đọc là 「なん」 ("là cái gì?").' },
    ],
    tip: 'Phân biệt: Dùng 「何」 (đọc là 「なん」) khi đứng trước 「です / の / ですか」; đọc là 「なに」 trước 「を / が / に」.',
  },
  'n5-1C-g08': {
    formula: 'Câu ＋ ね',
    parts: [
      { token: 'ね', role: 'Tiểu từ cuối câu dùng để xác nhận lại thông tin hoặc tìm sự đồng cảm ("...nhỉ?").' },
    ],
    tip: 'Chú ý: Đọc kéo dài nhẹ ở cuối câu để nghe tự nhiên và thân thiện.',
  },
  'n5-1C-g09': {
    formula: 'Câu ＋ よ / よね',
    parts: [
      { token: 'よ', role: 'Thông báo thông tin mới mà người nghe chưa biết ("...đấy / ...cơ").' },
      { token: 'よね', role: 'Xác nhận nhẹ nhàng khi người nói tin 80–90% là đúng ("...đúng không nhỉ?").' },
    ],
    tip: 'Phân biệt: 「ね」 (cả hai cùng biết) vs 「よ」 (chỉ người nói biết) vs 「よね」 (hỏi lại để chắc chắn).',
  },

  // ---------------- Unit 2 ----------------
  'n5-2A-g01': {
    formula: 'N1 は N2 でした',
    parts: [
      { token: 'でした', role: 'Dạng quá khứ khẳng định của 「です」 ("đã là ～").' },
    ],
    tip: 'Mẹo nhớ: Chỉ cần đổi 「です」 → 「でした」 là thành quá khứ cho cả Danh từ và Tính từ đuôi な.',
  },
  'n5-2A-g02': {
    formula: 'N1 は N2 じゃなかったです / じゃありませんでした / ではありませんでした',
    parts: [
      { token: 'じゃなかったです', role: 'Phủ định quá khứ thông dụng trong giao tiếp ("đã không phải là ～").' },
      { token: 'ではありませんでした', role: 'Dạng trang trọng nhất của phủ định quá khứ.' },
    ],
    tip: 'Chú ý: Không dùng 「じゃないでした」! Phải là 「じゃなかったです」 hoặc 「～ありませんでした」.',
  },
  'n5-2B-g03': {
    formula: '誰の N2 ですか → N1 の N2 です',
    parts: [
      { token: '誰の', role: 'Hỏi chủ sở hữu ("của ai?").' },
      { token: 'N1 の N2', role: '「の」 nối hai danh từ chỉ quyền sở hữu ("N2 của N1").' },
    ],
    tip: 'Chú ý: Nếu N2 đã được nhắc ở câu hỏi, câu trả lời có thể lược bỏ N2: 「私のです」 ("Của tôi").',
  },
  'n5-2B-g04': {
    formula: '何の N2 ですか → N1（nội dung）の N2 です',
    parts: [
      { token: '何の', role: '「何」 đọc là 「なん」 trước 「の」 ("về cái gì?").' },
      { token: 'N1 の N2', role: 'N1 bổ nghĩa làm rõ chủ đề/nội dung của N2 (sách về tiếng Nhật, tạp chí ô tô...).' },
    ],
    tip: 'Lưu ý: Trong tiếng Nhật, danh từ bổ nghĩa (N1) luôn đứng TRƯỚC danh từ chính (N2).',
  },
  'n5-2B-g05': {
    formula: 'どこの N2 ですか → N1（nơi sản xuất）の N2 です',
    parts: [
      { token: 'どこの', role: 'Hỏi xuất xứ, thương hiệu, nơi sản xuất ("của nước nào / hãng nào?").' },
    ],
    tip: 'Phân biệt: Dùng 「どこ」 (ở đâu) cho xuất xứ/hãng, không dùng 「何」.',
  },
  'n5-2B-g06': {
    formula: '何の N2 ですか → N1（nguyên liệu）の N2 です',
    parts: [
      { token: 'N1 の N2', role: 'N1 chỉ nguyên liệu, chất liệu tạo nên N2 (bánh mì làm từ gạo, nhẫn vàng...).' },
    ],
    tip: 'Mẹo nhớ: Trợ từ 「の」 nối N1–N2 có 4 nghĩa N5: sở hữu, nội dung, xuất xứ và nguyên liệu.',
  },
  'n5-2C-g07': {
    formula: 'N1（tổ chức / nơi chốn）の N2',
    parts: [
      { token: 'N1 の N2', role: 'N2 thuộc biên chế, trường học, công ty hoặc địa điểm N1.' },
    ],
    tip: 'Chú ý: Thứ tự luôn đi từ phạm vi lớn/cơ quan (N1) → đối tượng nhỏ hơn (N2).',
  },
  'n5-2C-g08': {
    formula: 'N1 は N2 で、N3 です',
    parts: [
      { token: 'N2 で', role: '「で」 là dạng nối của 「です」, dùng để liệt kê 2 đặc điểm/danh từ cho cùng chủ ngữ.' },
    ],
    tip: 'Lưu ý: Tuyệt đối không nối 2 danh từ bằng 「です」 ở giữa câu (sai: N2ですN3です → đúng: N2でN3です).',
  },

  // ---------------- Unit 3 ----------------
  'n5-3A-g01': {
    formula: 'N は Aい です',
    parts: [
      { token: 'Aい', role: 'Tính từ đuôi い giữ nguyên 「い」 khi đứng trước 「です」.' },
    ],
    tip: 'Chú ý: Không thêm 「の」 hay 「な」 vào giữa Aい và 「です」.',
  },
  'n5-3A-g02': {
    formula: 'N は Aい（bỏ い）＋ くないです',
    parts: [
      { token: 'くないです', role: 'Bỏ 「い」 cuối tính từ, thêm 「くないです」 (hoặc 「くありません」).' },
    ],
    tip: 'Ngoại lệ quan trọng: 「いい」(tốt) khi chia phủ định phải đổi gốc thành 「よくないです」 (không phải いくないです).',
  },
  'n5-3A-g03': {
    formula: 'N は Aな（bỏ な）です',
    parts: [
      { token: 'Aな', role: 'Tính từ đuôi な bỏ 「な」 khi đứng làm vị ngữ trước 「です」.' },
    ],
    tip: 'Chú ý: Các từ kết thúc bằng い như 「きれい」「有名（ゆうめい）」「嫌い（きらい）」 là Aな, không phải Aい!',
  },
  'n5-3A-g04': {
    formula: 'N は Aな（bỏ な）＋ じゃないです / じゃありません',
    parts: [
      { token: 'じゃないです', role: 'Chia phủ định giống hệt Danh từ (bỏ 「な」 rồi thêm 「じゃないです」).' },
    ],
    tip: 'Mẹo nhớ: Nhóm Aな và Danh từ chia khẳng định / phủ định / quá khứ giống nhau 100%.',
  },
  'n5-3A-g05': {
    formula: 'N は Aい / Aな ですか',
    parts: [
      { token: 'か', role: 'Thêm 「か」 ở cuối để hỏi tính chất; trả lời lặp lại tính từ hoặc phủ định cùng loại.' },
    ],
    tip: 'Lưu ý: Tránh trả lời 「はい、そうです」 cho câu hỏi tính từ; hãy lặp lại tính từ đó cho tự nhiên.',
  },
  'n5-3B-g06': {
    formula: 'Aい（bỏ い）＋ くて、A2 です',
    parts: [
      { token: 'くて', role: 'Nối 2 tính từ để liệt kê tính chất (thường cùng chiều khen hoặc cùng chiều chê).' },
    ],
    tip: 'Ngoại lệ: 「いい」 → 「よくて」. Không dùng 「くて」 để nối 2 tính từ trái nghĩa (phải dùng 「が」).',
  },
  'n5-3B-g07': {
    formula: 'Aな（bỏ な）＋ で、A2 です',
    parts: [
      { token: 'で', role: 'Bỏ 「な」, thêm 「で」 để nối tiếp sang tính từ thứ hai (Aい hoặc Aな đều được).' },
    ],
    tip: 'Chú ý: Thì quá khứ hay phủ định của cả cụm nối chỉ chia ở tính từ cuối cùng!',
  },
  'n5-3B-g08': {
    formula: 'N は どうですか',
    parts: [
      { token: 'どう', role: 'Từ để hỏi cảm nhận, nhận xét, tình trạng ("...như thế nào?").' },
    ],
    tip: 'Phân biệt: 「どうですか」 hỏi cảm nhận nói chung; 「どんな N ですか」 hỏi đặc điểm của N.',
  },
  'n5-3B-g09': {
    formula: 'Mệnh đề 1 が、Mệnh đề 2',
    parts: [
      { token: 'が', role: 'Liên từ nối hai vế có ý đối lập nhẹ hoặc chuyển ý ("...nhưng...").' },
    ],
    tip: 'Lưu ý: Khác với trợ từ chủ ngữ 「が」, 「が」 ở cuối mệnh đề 1 đi sau 「です / ます」.',
  },
  'n5-3C-g10': {
    formula: 'Aい（bỏ い）＋ かったです / くなかったです',
    parts: [
      { token: 'かったです', role: 'Quá khứ khẳng định của Aい ("đã...").' },
      { token: 'くなかったです', role: 'Quá khứ phủ định của Aい ("đã không...").' },
    ],
    tip: 'Ngoại lệ: 「いい」 → 「よかったです」 / 「よくなかったです」. Không nói 「いかったです」!',
  },
  'n5-3C-g11': {
    formula: 'Aな（bỏ な）＋ でした / じゃなかったです',
    parts: [
      { token: 'でした / じゃなかったです', role: 'Chia quá khứ giống hệt Danh từ.' },
    ],
    tip: 'Mẹo nhớ: Aな chỉ giữ 「な」 khi đứng trước Danh từ, còn lại trước 「です / でした / じゃない」 đều bỏ 「な」.',
  },
  'n5-3C-g12': {
    formula: 'どんな N ですか → Aい N / Aな N です',
    parts: [
      { token: 'どんな', role: 'Hỏi đặc điểm, tính chất của danh từ ("N như thế nào?").' },
      { token: 'Aな N', role: 'Khi Aな đứng trước bổ nghĩa trực tiếp cho N thì BẮT BUỘC giữ nguyên 「な」.' },
    ],
    tip: 'Chú ý: Tuyệt đối không bỏ 「な」 trước N (sai: 静か部屋 → đúng: 静かな部屋).',
  },
  'n5-3D-g13': {
    formula: 'N1（phạm vi）で [Từ hỏi] が 一番 A ですか → N2 が 一番 A です',
    parts: [
      { token: 'N1 で', role: 'Xác định phạm vi so sánh ("trong số N1 / ở N1").' },
      { token: '一番（いちばん）', role: 'Nghĩa là "nhất". Luôn dùng trợ từ 「が」 sau đối tượng so sánh.' },
    ],
    tip: 'Chú ý: Từ để hỏi thay đổi theo đối tượng: 「だれ」(người), 「どこ」(nơi), 「いつ」(thời gian), 「どれ / 何」(vật).',
  },
  'n5-3D-g14': {
    formula: 'N1 と N2 と、どちらが A ですか → N1 の ほうが A です',
    parts: [
      { token: 'どちら（どっち）', role: 'Dùng khi so sánh giữa 2 đối tượng ("cái nào hơn?").' },
      { token: 'N の ほうが', role: 'Nghĩa là "phía N thì ... hơn".' },
    ],
    tip: 'Chú ý: 「のほうが」 chỉ dùng trong câu trả lời so sánh 2 thứ; nếu cả hai ngang nhau dùng 「どちらも A です」.',
  },
  'n5-3D-g15': {
    formula: 'N1 は N2 より A です',
    parts: [
      { token: 'より', role: 'Đứng ngay sau đối tượng làm mốc so sánh ("hơn N2").' },
    ],
    tip: 'Mẹo nhớ: Trật tự ngược tiếng Việt một chút: [A] は [B] より [Tính từ] = A tính từ hơn B.',
  },

  // ---------------- Unit 4 ----------------
  'n5-4A-g01': {
    formula: 'N1（は）N2 / Aな ？ （Thể thường）',
    parts: [
      { token: 'Lược だ', role: 'Ở câu hỏi thể thường, N và Aな KHÔNG dùng 「だ」, chỉ lên giọng ở cuối câu.' },
    ],
    tip: 'Chú ý: Sai lầm hay gặp là hỏi 「学生だ？」 — tự nhiên nhất là 「学生？」 (lên giọng)!',
  },
  'n5-4A-g02': {
    formula: 'N2 / Aな（だ / だよ / だね / だよね）',
    parts: [
      { token: 'だ', role: 'Thể thường của 「です」. Có thể bỏ 「だ」 cho mềm mại (nhất là nữ giới) hoặc thêm 「よ / ね」.' },
    ],
    tip: 'Lưu ý: Khi có 「よ」 hoặc 「ね」 ở N/Aな thể thường, bắt buộc giữ 「だ」 trước 「よ/ね」: 「だよ」「だね」.',
  },
  'n5-4A-g03': {
    formula: 'N2 / Aな じゃない',
    parts: [
      { token: 'じゃない', role: 'Bỏ 「です」 của 「じゃないです」 để chuyển sang thể thường.' },
    ],
    tip: 'Chú ý: Lên giọng 「じゃない？」 mang nghĩa xác nhận "chẳng phải ～ sao?"; xuống giọng 「じゃない」 là phủ định.',
  },
  'n5-4A-g04': {
    formula: 'N2 / Aな だった（？）',
    parts: [
      { token: 'だった', role: 'Thể thường của 「でした」 ("đã là"). Lên giọng thành câu hỏi.' },
    ],
    tip: 'Mẹo nhớ: 「でした」 → 「だった」 áp dụng chung cho cả Danh từ và Tính từ đuôi な.',
  },
  'n5-4A-g05': {
    formula: 'N2 / Aな じゃなかった',
    parts: [
      { token: 'じゃなかった', role: 'Bỏ 「です」 của 「じゃなかったです」 để về thể thường phủ định quá khứ.' },
    ],
    tip: 'Chú ý: Học thuộc cặp 4 ô của N / Aな thể thường: 「だ / じゃない / だった / じゃなかった」.',
  },
  'n5-4B-g06': {
    formula: 'N は Aい ？',
    parts: [
      { token: 'Aい？', role: 'Bỏ 「ですか」, giữ nguyên 「い」 và lên giọng cuối câu.' },
    ],
    tip: 'Chú ý: Tính từ đuôi い KHÔNG BAO GIỜ đi với 「だ」 (sai: 高いだ → đúng: 高い).',
  },
  'n5-4B-g07': {
    formula: 'N は Aい（よ / ね）',
    parts: [
      { token: 'Aい', role: 'Chỉ cần bỏ 「です」 của câu lịch sự là ra thể thường.' },
    ],
    tip: 'Lưu ý: Với Aい, 「高いよ」「高いね」 nối thẳng vào 「よ/ね」, không chèn 「だ」.',
  },
  'n5-4B-g08': {
    formula: 'Mệnh đề 1（Thể thường）＋ けど、Mệnh đề 2',
    parts: [
      { token: 'けど', role: 'Dạng thân mật của 「が」 ("nhưng"), thường đi sau thể thường.' },
    ],
    tip: 'Phân biệt: 「が」 dùng trong câu lịch sự/viết; 「けど」 dùng phổ biến trong hội thoại.',
  },
  'n5-4B-g09': {
    formula: 'Aい（bỏ い）＋ かった',
    parts: [
      { token: 'かった', role: 'Bỏ 「です」 của 「かったです」 ("đã...").' },
    ],
    tip: 'Ngoại lệ: 「いい」 → 「よかった」.',
  },
  'n5-4B-g10': {
    formula: 'Aい（bỏ い）＋ くない / くなかった',
    parts: [
      { token: 'くない', role: 'Thể thường phủ định hiện tại (bỏ 「です」).' },
      { token: 'くなかった', role: 'Thể thường phủ định quá khứ (bỏ 「です」).' },
    ],
    tip: 'Mẹo nhớ: Toàn bộ Aい thể thường chỉ là bản lịch sự bỏ 「です」!',
  },

  // ---------------- Unit 5 ----------------
  'n5-5A-g01': {
    formula: 'N（đồ vật）は ありますか → あります / ないです・ありません',
    parts: [
      { token: 'あります', role: 'Chỉ sự tồn tại/sở hữu của đồ vật, cây cối, sự kiện (không tự di chuyển).' },
      { token: 'ないです / ありません', role: 'Phủ định của 「あります」.' },
    ],
    tip: 'Chú ý: Không dùng 「あります」 cho người hay động vật!',
  },
  'n5-5A-g02': {
    formula: 'N1（vật）は N2（nơi）に あります / です',
    parts: [
      { token: 'N2 に', role: '「に」 đánh dấu vị trí tồn tại của vật N1.' },
    ],
    tip: 'Phân biệt: Cấu trúc 「N1 は N2 に あります」 dùng khi N1 là chủ đề đã biết, người nghe hỏi "N1 ở đâu?".',
  },
  'n5-5A-g03': {
    formula: 'N1（nơi）に N2（vật）が あります',
    parts: [
      { token: 'N1 に', role: 'Địa điểm đứng đầu câu.' },
      { token: 'N2 が', role: 'Đối tượng tồn tại đi với trợ từ 「が」 ("Ở N1 có N2").' },
    ],
    tip: 'Chú ý: Cặp vị trí 「上 / 下 / 前 / 後ろ / 中 / 外 / 右 / 左 / 隣 / 近く / 間」 nối với N bằng 「の」: 「机の上に」.',
  },
  'n5-5B-g04': {
    formula: 'N（người / động vật）は いますか → います / いないです・いません',
    parts: [
      { token: 'います', role: 'Chỉ sự tồn tại của người và động vật.' },
    ],
    tip: 'Phân biệt: Có sự sống tự di chuyển (người, động vật) → 「います」; đồ vật, thực vật → 「あります」.',
  },
  'n5-5B-g05': {
    formula: 'N1（người / vật sống）は N2（nơi）に います / です',
    parts: [
      { token: 'N2 に', role: 'Vị trí nơi N1 đang có mặt.' },
    ],
    tip: 'Chú ý: Nếu thay 「います」 bằng 「です」 vẫn đúng khi trả lời câu hỏi 「N1 は どこですか」.',
  },
  'n5-5B-g06': {
    formula: 'N1（nơi）に N2（người / động vật）が います',
    parts: [
      { token: 'N2 が', role: 'Nhấn mạnh người/động vật đang có ở địa điểm N1.' },
    ],
    tip: 'Lưu ý: Từ để hỏi cho người là 「だれが いますか」, cho vật là 「何が ありますか」.',
  },
  'n5-5C-g07': {
    formula: 'N には ～ / N にも ～',
    parts: [
      { token: 'には', role: 'Kết hợp 「に」 + 「は」 để nhấn mạnh hoặc đối chiếu địa điểm N.' },
      { token: 'にも', role: 'Kết hợp 「に」 + 「も」 mang nghĩa "ở N cũng có...".' },
    ],
    tip: 'Chú ý: Trợ từ 「に」 KHÔNG bị biến mất trước 「は」 hay 「も」 mà ghép thành 「には」「にも」.',
  },
  'n5-5C-g08': {
    formula: 'N1 と N2',
    parts: [
      { token: 'と', role: 'Liệt kê đầy đủ các danh từ ("N1 và N2").' },
    ],
    tip: 'Phân biệt: 「と」 liệt kê hết toàn bộ; 「や / とか」 chỉ liệt kê ví dụ tiêu biểu.',
  },
  'n5-5C-g09': {
    formula: '[Số lượng từ] ＋ います / あります',
    parts: [
      { token: 'Vị trí số lượng từ', role: 'Số lượng từ đứng trực tiếp trước động từ, KHÔNG có trợ từ 「を / が」 ở giữa.' },
    ],
    tip: 'Chú ý: Chọn đúng lượng từ: người 「～人」, vật nhỏ 「～つ / ～個」, vật dài 「～本」, vật mỏng 「～枚」, động vật nhỏ 「～匹」.',
  },

  // ---------------- Unit 6 ----------------
  'n5-6A-g01': {
    formula: 'V ます / V ました',
    parts: [
      { token: 'V ます', role: 'Thói quen hằng ngày hoặc hành động trong tương lai.' },
      { token: 'V ました', role: 'Hành động đã xảy ra trong quá khứ.' },
    ],
    tip: 'Mẹo nhớ: Tiếng Nhật chỉ có 2 thì động từ chính: Phi quá khứ (ます) và Quá khứ (ました).',
  },
  'n5-6A-g02': {
    formula: '[Thời gian cụ thể] に V / 何時に V か',
    parts: [
      { token: 'に', role: 'Đánh dấu mốc thời gian cụ thể (giờ, ngày, thứ mấy, tháng, năm).' },
    ],
    tip: 'Chú ý: KHÔNG dùng 「に」 sau các từ chỉ thời gian tương đối như 「今日 / 明日 / 昨日 / 毎日 / 今週 / いつ」!',
  },
  'n5-6A-g03': {
    formula: '[Khoảng thời gian] ＋ V',
    parts: [
      { token: 'Không dùng に', role: 'Khoảng thời gian (2 tiếng, 30 phút, 1 tuần...) đứng trực tiếp trước V, không cần 「に」.' },
    ],
    tip: 'Phân biệt: 「7時に」(lúc 7 giờ - mốc thời gian, có に) vs 「7時間」(trong 7 tiếng - khoảng thời gian, không に).',
  },
  'n5-6A-g04': {
    formula: '～から ～まで V',
    parts: [
      { token: 'から / まで', role: 'Chỉ khoảng thời gian hoặc quãng đường từ điểm đầu đến điểm cuối.' },
    ],
    tip: 'Chú ý: Có thể dùng với động từ hành động (làm việc từ 8h đến 5h) lẫn danh từ.',
  },
  'n5-6A-g05': {
    formula: 'V ません / V ませんでした',
    parts: [
      { token: 'ません', role: 'Phủ định hiện tại/tương lai hoặc thói quen ("không V").' },
      { token: 'ませんでした', role: 'Phủ định quá khứ ("đã không V").' },
    ],
    tip: 'Mẹo nhớ: Đuôi 「ます」 luôn đổi 4 dạng chuẩn: 「ます / ません / ました / ませんでした」.',
  },
  'n5-6B-g06': {
    formula: 'N（địa điểm）へ / に 帰ります',
    parts: [
      { token: 'へ / に', role: 'Chỉ hướng hoặc đích đến của hành động trở về (về nhà, về nước).' },
    ],
    tip: 'Chú ý: Trợ từ 「へ」 khi làm trợ từ chỉ hướng luôn đọc là "e" (không đọc là "he").',
  },
  'n5-6B-g07': {
    formula: 'N（địa điểm）へ / に 行きます',
    parts: [
      { token: 'へ / に', role: '「へ」 nhấn mạnh phương hướng di chuyển; 「に」 nhấn mạnh điểm đích đến.' },
    ],
    tip: 'Lưu ý: Với 「どこ」 ở câu phủ định toàn phần dùng 「どこへも / どこにも 行きません」.',
  },
  'n5-6B-g08': {
    formula: 'N（địa điểm）へ / に 来ます',
    parts: [
      { token: '来ます（きます）', role: 'Di chuyển hướng về phía người nói hoặc nơi người nói đang ở.' },
    ],
    tip: 'Phân biệt: Rời xa vị trí hiện tại → 「行きます」; tiến về phía mình → 「来ます」.',
  },
  'n5-6C-g09': {
    formula: 'N を V / 何を V か',
    parts: [
      { token: 'を', role: 'Đọc là "o", đánh dấu tân ngữ chịu tác động trực tiếp của ngoại động từ.' },
    ],
    tip: 'Chú ý: Trong 「何をしますか」, 「何」 đọc là 「なに」 (vì đứng trước 「を」).',
  },
  'n5-6C-g10': {
    formula: 'N（địa điểm）で V / どこで V か',
    parts: [
      { token: 'で', role: 'Chỉ nơi diễn ra hành động (ăn ở nhà hàng, học ở thư viện).' },
    ],
    tip: 'Phân biệt cực quan trọng: Nơi có hành động → 「で」; nơi chỉ sự tồn tại (います/あります) hoặc điểm đến (行きます) → 「に」!',
  },
  'n5-6C-g11': {
    formula: 'N（người）と V / 誰と V か',
    parts: [
      { token: 'と', role: 'Chỉ người cùng thực hiện hành động ("cùng với N").' },
    ],
    tip: 'Lưu ý: Khi làm một mình, dùng 「一人で（ひとりで）」 (KHÔNG dùng 「一人と」).',
  },
  'n5-6C-g12': {
    formula: 'N1 とか N2 とか / N1 や N2（など）',
    parts: [
      { token: 'とか / や～など', role: 'Liệt kê mang tính đại diện, ví dụ ("những thứ như N1, N2...").' },
    ],
    tip: 'Phân biệt: 「や～など」 trang trọng hơn một chút; 「とか」 dùng tự nhiên trong văn nói và có thể nối cả động từ.',
  },

  // ---------------- Unit 7 ----------------
  'n5-7A-g01': {
    formula: 'どこか / だれか / 何か ＋（trợ từ）＋ V か',
    parts: [
      { token: 'Từ hỏi + か', role: 'Biến từ để hỏi thành đại từ bất định: 「どこか」(đâu đó), 「だれか」(ai đó), 「何か」(gì đó).' },
    ],
    tip: 'Chú ý: Trợ từ 「を / が / へ」 đứng sau 「か」 (thường có thể lược bỏ trong văn nói, nhưng 「に / で / と」 giữ lại).',
  },
  'n5-7A-g02': {
    formula: 'どこ（へ）も / だれも / 何も ＋ V ません',
    parts: [
      { token: 'Từ hỏi + も + Phủ định', role: 'Phủ định hoàn toàn: "không đâu cả / không ai cả / không gì cả".' },
    ],
    tip: 'Chú ý: Không dùng 「は / が / を」 trước 「も」 (sai: 何をも → đúng: 何も), nhưng 「に / へ / と / で」 đặt trước 「も」: 「どこへも」.',
  },
  'n5-7B-g03': {
    formula: 'N を [Số lượng] ください / お願いします',
    parts: [
      { token: 'ください / お願いします', role: 'Yêu cầu lịch sự khi mua hàng, gọi món ("Xin cho tôi...").' },
    ],
    tip: 'Lưu ý: 「お願いします」 nghe mềm mại, lịch sự hơn một chút trong nhà hàng/quán ăn.',
  },
  'n5-7B-g04': {
    formula: '[Khoảng thời gian] に [Số lần] V',
    parts: [
      { token: 'に', role: 'Đánh dấu chu kỳ/tần suất ("trong 1 tuần / 1 tháng làm mấy lần").' },
    ],
    tip: 'Ví dụ chuẩn: 「1週間に 2回 日本語を 勉強します」(Một tuần học tiếng Nhật 2 lần).',
  },
  'n5-7C-g05': {
    formula: 'V ませんか / V ましょう / V ましょうか',
    parts: [
      { token: 'V ませんか', role: 'Mời mọc lịch sự, tôn trọng ý kiến đối phương ("Cùng V nhé?").' },
      { token: 'V ましょう', role: 'Rủ rê tích cực hoặc đồng ý lời mời ("Cùng V thôi!").' },
      { token: 'V ましょうか', role: 'Đề nghị giúp đỡ hoặc gợi ý cùng làm ("Tôi V giúp nhé?").' },
    ],
    tip: 'Mẹo nhớ: Lịch sự rủ người mới quen → 「ませんか」; đáp lại lời rủ → 「はい、Vましょう」.',
  },
  'n5-7C-g06': {
    formula: '（私は）N が 欲しいです',
    parts: [
      { token: 'が 欲しいです', role: 'Diễn tả mong muốn sở hữu vật N. 「欲しい」 là tính từ đuôi い!' },
    ],
    tip: 'Chú ý: Trợ từ đi với 「欲しい」 là 「が」 (không dùng 「を」), và chỉ dùng cho ngôi thứ 1 (hoặc hỏi ngôi thứ 2).',
  },
  'n5-7D-g07': {
    formula: '（N1 へ）Vます / N2 に 行きます・来ます・帰ります',
    parts: [
      { token: 'Vます / N2 に', role: '「に」 đứng sau gốc Vます (bỏ ます) hoặc danh từ hành động N2 để chỉ MỤC ĐÍCH của việc đi/đến/về.' },
    ],
    tip: 'Chú ý: N2 phải là danh từ mang tính hành động/sự kiện (「買い物」「映画」「食事」...), không phải đồ vật.',
  },
  'n5-7D-g08': {
    formula: 'N が / を Vます ＋ たいです',
    parts: [
      { token: 'Vますたいです', role: 'Bỏ 「ます」, thêm 「たいです」 để nói muốn tự mình làm hành động V.' },
    ],
    tip: 'Chú ý: 「Vたい」 chia như Tính từ đuôi い (「Vたくないです」「Vたかったです」). Có thể dùng trợ từ 「が」 hoặc 「を」.',
  },
  'n5-7D-g09': {
    formula: 'Vます ＋ 方（かた）',
    parts: [
      { token: '方（かた）', role: 'Bỏ 「ます」 + 「方」 tạo thành Danh từ nghĩa là "cách V" (cách đọc, cách làm...).' },
    ],
    tip: 'Lưu ý: Cả cụm 「Vます方」 là Danh từ, nên nối với danh từ khác bằng 「の」 (ví dụ 「漢字の 書き方」).',
  },
};

