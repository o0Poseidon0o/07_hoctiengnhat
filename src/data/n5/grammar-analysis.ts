import type { GrammarAnalysis } from '../types.ts';
import { grammarAnalysis1to7 } from './grammar-analysis-1to7.ts';

const grammarAnalysis8to14: Record<string, GrammarAnalysis> = {
  // ---------------- Unit 8 ----------------
  'n5-8A-g01': {
    formula: '（N は）～ が V（thể Khả năng）',
    parts: [
      { token: 'Thể khả năng', role: 'Nhóm I: đuôi cột い → cột え + ます; Nhóm II: bỏ ます + られます; します → できます; 来ます → 来られます.' },
      { token: 'が', role: 'Đối tượng của động từ khả năng thường dùng trợ từ 「が」 (thay cho 「を」).' },
    ],
    tip: 'Chú ý: Động từ khả năng bản thân là nhóm II nên chia phủ định là 「～られません / ～できません」.',
  },
  'n5-8A-g02': {
    formula: 'N（phương tiện / công cụ）で ＋ V / 何で V か',
    parts: [
      { token: 'で', role: 'Đánh dấu phương tiện di chuyển (tàu, xe buýt), công cụ (đũa, dao) hoặc ngôn ngữ sử dụng.' },
    ],
    tip: 'Ngoại lệ: Đi bộ không dùng 「で」, dùng 「歩いて（あるいて）」!',
  },
  'n5-8A-g03': {
    formula: '[Số tiền / Thời gian] ＋ くらい・ぐらい かかります',
    parts: [
      { token: 'くらい / ぐらい', role: 'Mang nghĩa ước lượng "khoảng, chừng".' },
      { token: 'かかります', role: 'Động từ chỉ sự tiêu tốn thời gian hoặc tiền bạc (KHÔNG dùng 「を」 ở trước).' },
    ],
    tip: 'Chú ý: Không viết 「お金をかかります」 — đúng là 「お金が かかります」.',
  },
  'n5-8A-g04': {
    formula: '[Số tiền / Thời gian] で ＋ V',
    parts: [
      { token: 'で', role: 'Đặt sau số lượng tiền/thời gian để chỉ giới hạn hoàn thành hành động ("trong vòng / với giá...").' },
    ],
    tip: 'Phân biệt: 「1時間で」(làm xong trong 1 tiếng) vs 「1時間」(kéo dài suốt 1 tiếng).',
  },
  'n5-8B-g05': {
    formula: 'N1 は N2 が 好き / 嫌い / 上手 / 下手 / 得意 / 苦手 ＋ です',
    parts: [
      { token: 'が', role: 'Tính từ chỉ sở thích/năng lực (好き・嫌い・上手・下手) luôn đi với trợ từ 「が」, KHÔNG dùng 「を」.' },
    ],
    tip: 'Chú ý: Toàn bộ các từ trong nhóm này đều là Tính từ đuôi な (khi phủ định là 「好きじゃないです」)!',
  },
  'n5-8B-g06': {
    formula: '[Nguyên nhân] ＋ から、[Kết quả]',
    parts: [
      { token: 'から', role: 'Đứng cuối mệnh đề nguyên nhân ("vì ～ nên ～"). Dùng sau cả thể lịch sự lẫn thể thường.' },
    ],
    tip: 'Lưu ý: Câu trả lời cho 「どうして / なぜ」(tại sao) thường kết thúc bằng 「～からです」.',
  },
  'n5-8C-g07': {
    formula: 'N1 は N2 が A です',
    parts: [
      { token: 'N1 は N2 が', role: 'N1 là chủ thể lớn; N2 là bộ phận/thuộc tính của N1 được miêu tả bằng tính từ A (tóc dài, mắt to...).' },
    ],
    tip: 'Mẹo nhớ: Mẫu "Con voi mũi dài" → 「象は 鼻が 長いです」.',
  },
  'n5-8C-g12': {
    formula: 'N1 が N2 / A です ・ N1 が V ます',
    parts: [
      { token: 'は vs が', role: '「は」 nhấn mạnh phần vị ngữ phía sau; 「が」 nhấn mạnh chính chủ ngữ N1 hoặc thông tin mới.' },
    ],
    tip: 'Bắt buộc: Khi từ để hỏi (だれ / どれ / 何) làm chủ ngữ, PHẢI dùng 「が」, tuyệt đối không dùng 「は」!',
  },

  // ---------------- Unit 9 ----------------
  'n5-9A-g01': {
    formula: 'V ます → V る（Thể Từ điển）',
    parts: [
      { token: 'Nhóm I', role: 'Bỏ ます, đổi âm cuối cột い sang cột う (書きます → 書く, 飲みます → 飲む).' },
      { token: 'Nhóm II & III', role: 'Nhóm II: bỏ ます + る (食べます → 食べる). Nhóm III: します → する, 来ます → 来る（くる）.' },
    ],
    tip: 'Chú ý: 「帰ります」「入ります」「切ります」「知ります」 có âm い trước ます nhưng thuộc Nhóm I → 「帰る」「入る」「切る」「知る」.',
  },
  'n5-9A-g02': {
    formula: 'V る ？',
    parts: [
      { token: 'V る？', role: 'Câu hỏi thể thường không thêm 「か」, chỉ cần lên giọng ở cuối câu.' },
    ],
    tip: 'Lưu ý: Chỉ dùng với bạn bè, người thân hoặc người nhỏ tuổi hơn.',
  },
  'n5-9A-g03': {
    formula: 'V る ＋ こと / N が できます',
    parts: [
      { token: 'V る ＋ こと', role: 'Thêm 「こと」 sau Thể từ điển để biến động từ thành cụm danh từ ("việc V").' },
      { token: 'が できます', role: 'Nói về khả năng có thể thực hiện hành động đó.' },
    ],
    tip: 'Chú ý: Trước 「ことができます」 luôn là Thể từ điển (Vる), không dùng Vます hay Vて.',
  },
  'n5-9A-g04': {
    formula: '（私の趣味は）V る ＋ ことです',
    parts: [
      { token: 'V る ことです', role: 'Danh từ hóa hành động để làm vị ngữ giới thiệu sở thích, ước mơ, mục tiêu.' },
    ],
    tip: 'Ví dụ chuẩn: 「趣味は 写真を 撮ることです」(Sở thích của tôi là việc chụp ảnh).',
  },
  'n5-9B-g05': {
    formula: 'V ません → V ない（Thể ない）',
    parts: [
      { token: 'Nhóm I', role: 'Đổi âm cuối cột い sang cột あ + ない. Ngoại lệ: đuôi う → わ + ない (買います → 買わない).' },
      { token: 'Nhóm II & III', role: 'Nhóm II: bỏ ます + ない (食べない). Nhóm III: する → しない, 来る → 来ない（こない）.' },
    ],
    tip: 'Ngoại lệ cực hay thi: 「あります」 ở thể ない là 「ない」 (không phải あらない)!',
  },
  'n5-9B-g06': {
    formula: '（一緒に）V ない ？',
    parts: [
      { token: 'V ない？', role: 'Thể thường của lời rủ 「V ませんか」, lên giọng nhẹ ở cuối.' },
    ],
    tip: 'Mẹo nhớ: Trả lời đồng ý thể thường dùng 「うん、V よう！」 (Thể ý chí).',
  },
  'n5-9B-g07': {
    formula: 'V（thể Khả năng）→ V る / V ない',
    parts: [
      { token: 'Chia nhóm II', role: 'Mọi động từ thể Khả năng đều chia y hệt động từ Nhóm II: 「～られる / ～られない」「できる / できない」.' },
    ],
    tip: 'Chú ý: Động từ thể khả năng không cần 「こと」 trước 「できる」.',
  },
  'n5-9C-g08': {
    formula: 'V ました → V た ・ V ない → V なかった',
    parts: [
      { token: 'V た', role: 'Quy tắc chia giống hệt Thể て, chỉ đổi 「て/で」 thành 「た/だ」 (食べて → 食べた, 飲んで → 飲んだ).' },
      { token: 'V なかった', role: 'Đổi 「い」 cuối của Vない thành 「かった」 (giống tính từ đuôi い).' },
    ],
    tip: 'Ngoại lệ: 「行きます」 → 「行った」（いった）; 「します」 → 「した」; 「来ます」 → 「来た」（きた）.',
  },
  'n5-9C-g09': {
    formula: 'V（khả năng）た / なかった ・ V たい → V たかった / たくなかった',
    parts: [
      { token: 'Khả năng quá khứ', role: '「できた / できなかった」「食べられた / 食べられなかった」.' },
      { token: 'V たい quá khứ', role: 'Chia như Aい: 「食べたかった」(đã muốn ăn) / 「食べたくなかった」(đã không muốn ăn).' },
    ],
    tip: 'Lưu ý: Đừng quên 「Vたい」 luôn đi theo quy tắc của Tính từ đuôi い.',
  },

  // ---------------- Unit 10 ----------------
  'n5-10A-g01': {
    formula: 'V ましょう → V よう（Thể Ý chí）',
    parts: [
      { token: 'Nhóm I', role: 'Đổi âm cuối cột い sang cột お + う (行きます → 行こう, 飲みます → 飲もう).' },
      { token: 'Nhóm II & III', role: 'Nhóm II: bỏ ます + よう (食べよう). Nhóm III: しよう / 来よう（こよう）.' },
    ],
    tip: 'Chú ý: Đừng quên âm kéo dài 「う」 ở Nhóm I (「いこ」 là sai, phải là 「いこう」).',
  },
  'n5-10A-g02': {
    formula: 'V1 る / N の ＋ 前に、V2',
    parts: [
      { token: 'V1 る / N の ＋ 前に', role: 'Trước hành động V1 hoặc sự kiện N thì làm V2.' },
    ],
    tip: 'Bắt buộc: Dù V2 ở thì quá khứ hay hiện tại, V1 đứng trước 「前に」 LUÔN Ở THỂ TỪ ĐIỂN (Vる)!',
  },
  'n5-10A-g03': {
    formula: 'V1 た / N の ＋ 後で、V2',
    parts: [
      { token: 'V1 た / N の ＋ 後で', role: 'Sau khi hoàn thành V1 hoặc sự kiện N thì làm V2.' },
    ],
    tip: 'Bắt buộc: Dù V2 ở thì tương lai, V1 đứng trước 「後で」 LUÔN Ở THỂ QUÁ KHỨ (Vた)!',
  },
  'n5-10B-g04': {
    formula: 'V1 た ＋ ら、V2',
    parts: [
      { token: 'V1 たら', role: 'Lấy Thể た + 「ら」. Dùng cho cả "Sau khi V1 (chắc chắn xảy ra) thì V2" và "Nếu V1 thì V2".' },
    ],
    tip: 'Chú ý: Có thể dùng 「たら」 cho N và A: 「N だったら」「Aい かったら」「Aな だったら」.',
  },
  'n5-10B-g05': {
    formula: 'V たばかりだ ・ V たことが あります',
    parts: [
      { token: 'V たばかり', role: '"Vừa mới V" (theo cảm nhận của người nói, dù thực tế có thể cách vài ngày/tháng).' },
      { token: 'V たことがある', role: '"Đã từng V" (nói về kinh nghiệm trong đời; phủ định là 「～たことがない」).' },
    ],
    tip: 'Phân biệt: 「Vたことがある」 (kinh nghiệm đã từng) vs 「Vることがある」 (đôi khi có làm).',
  },

  // ---------------- Unit 11 ----------------
  'n5-11A-g01': {
    formula: 'V ば / Aいければ ～',
    parts: [
      { token: 'V ば', role: 'Nhóm I: cột い → cột え + ば (行く → 行けば). Nhóm II: bỏ る + れば (食べれば). Nhóm III: すれば / 来れば（くれば）.' },
      { token: 'Aい ければ', role: 'Bỏ 「い」 + 「ければ」 (高い → 高ければ; ngoại lệ 「いい」 → 「よければ」).' },
    ],
    tip: 'Chú ý: Phủ định của Thể ば là bỏ 「い」 của Vない/Aいくない rồi thêm 「ければ」 → 「Vなければ / Aいくなければ」.',
  },
  'n5-11A-g02': {
    formula: '[Từ nghi vấn] ＋ V ば いいですか / ～か',
    parts: [
      { token: 'V ば いいですか', role: 'Hỏi xin lời khuyên, chỉ dẫn ("Nên làm thế nào / ở đâu thì tốt?").' },
    ],
    tip: 'Ví dụ chuẩn: 「どこで 買えば いいですか」(Tôi nên mua ở đâu thì được ạ?).',
  },
  'n5-11B-g03': {
    formula: 'V なければ、～',
    parts: [
      { token: 'なければ', role: 'Điều kiện phủ định: "Nếu không V thì..." (lấy từ Vない bỏ い + ければ).' },
    ],
    tip: 'Mẹo nhớ: Chữ 「い」 ở cuối 「ない」 luôn biến thành 「ければ」.',
  },
  'n5-11B-g04': {
    formula: 'V なければ なりません / V ないと いけません',
    parts: [
      { token: 'なければ なりません', role: 'Nghĩa là "Phải V" (nghĩa vụ, quy định, trang trọng hơn).' },
      { token: 'ないと いけません', role: 'Nghĩa tương đương, dùng tự nhiên hơn trong giao tiếp hằng ngày.' },
    ],
    tip: 'Chú ý: Nhớ nghĩa gốc: "Nếu không V thì không được" → dịch xuôi là "Phải V".',
  },
  'n5-11B-g05': {
    formula: 'V なきゃ、～',
    parts: [
      { token: 'なきゃ', role: 'Dạng rút gọn thân mật trong văn nói của 「なければ」 ("Nếu không V thì...").' },
    ],
    tip: 'Lưu ý: Chỉ dùng 「なきゃ」 khi nói chuyện thân mật, không dùng trong văn viết hay với cấp trên.',
  },
  'n5-11B-g06': {
    formula: 'V なきゃ いけない / V なきゃ（だめ）',
    parts: [
      { token: 'なきゃ いけない', role: 'Dạng văn nói thân mật của "Phải làm V" (thậm chí người Nhật hay bỏ cả 「いけない」, chỉ nói 「行かなきゃ！」).' },
    ],
    tip: 'Mẹo nhớ: 「行かなきゃ！」 = "Phải đi thôi!" — câu cửa miệng cực phổ biến.',
  },

  // ---------------- Unit 12 ----------------
  'n5-12A-g01': {
    formula: 'V1 て、V2 て、V3（ます / ました）',
    parts: [
      { token: 'Thể て', role: 'Nối chuỗi các hành động xảy ra liên tiếp theo thứ tự thời gian ("V1 rồi V2 rồi V3").' },
    ],
    tip: 'Chú ý: Thì (hiện tại/quá khứ) và phủ định của cả chuỗi hành động chỉ chia ở động từ CUỐI CÙNG (V3).',
  },
  'n5-12A-g02': {
    formula: 'V1 てから、V2',
    parts: [
      { token: 'てから', role: 'Nhấn mạnh "Sau khi làm XONG V1 thì mới làm V2" (mối liên kết chặt hơn 「V1て、V2」).' },
    ],
    tip: 'Lưu ý: Khác với 「V1て、V2」, 「V1てから V2」 thường chỉ dùng cho 1 cặp hành động (không nối 3–4 cái).',
  },
  'n5-12B-g03': {
    formula: '（N は）V て ＋ います（Đang diễn ra）',
    parts: [
      { token: 'V ています', role: 'Hành động đang diễn ra ngay tại thời điểm nói (đang ăn, đang học...).' },
    ],
    tip: 'Chú ý: Thể thường là 「V ている」 (trong văn nói hay lược 「い」 thành 「V てる」).',
  },
  'n5-12B-g04': {
    formula: 'N が V て ＋ います',
    parts: [
      { token: 'N が', role: 'Miêu tả hiện tượng tự nhiên hoặc cảnh tượng đang diễn ra trước mắt (trời đang mưa: 「雨が 降っています」).' },
    ],
    tip: 'Lưu ý: Chủ thể của hiện tượng trước mắt dùng trợ từ 「が」.',
  },
  'n5-12B-g05': {
    formula: '（N は）V て ＋ います（Thói quen）',
    parts: [
      { token: 'V ています', role: 'Diễn tả thói quen lặp đi lặp lại hoặc nghề nghiệp hiện tại (hằng ngày chạy bộ, đang làm ở công ty X).' },
    ],
    tip: 'Phân biệt: Có trạng từ tần suất (毎日 / 毎週) + 「Vています」 → thói quen hiện tại.',
  },
  'n5-12C-g06': {
    formula: 'N が V て ＋ います（Trạng thái kết quả）',
    parts: [
      { token: 'Trạng thái kết quả', role: 'Với động từ tức thời (kết hôn, bật đèn, mở cửa, mặc áo...), 「Vています」 chỉ trạng thái còn giữ nguyên sau khi hành động đã xong.' },
    ],
    tip: 'Chú ý: 「結婚しています」 = Đang có gia đình (đã kết hôn rồi và hiện vẫn vậy), KHÔNG dịch là "đang làm đám cưới"!',
  },
  'n5-12C-g07': {
    formula: 'V て ＋ います（Trạng thái duy trì lâu dài）',
    parts: [
      { token: 'Nhóm động từ trạng thái', role: 'Các động từ 「住む」(sống), 「持つ」(có/mang), 「知る」(biết), 「勤める」(làm việc ở) luôn dùng dạng 「ています」.' },
    ],
    tip: 'Ví dụ chuẩn: 「東京に 住んでいます」(Tôi sống ở Tokyo) — không nói 「住みます」.',
  },
  'n5-12C-g08': {
    formula: 'N を 知っていますか → はい、知っています / いいえ、知りません',
    parts: [
      { token: '知りません', role: 'Ngoại lệ đặc biệt: Khẳng định dùng 「知っています」, nhưng phủ định KHÔNG nói 「知っていません」 mà phải nói 「知りません」!' },
    ],
    tip: 'Bắt buộc nhớ: Hỏi 「知っていますか」 → Phủ định: 「いいえ、知りません」 (bẫy hay ra thi JLPT N5!).',
  },

  // ---------------- Unit 13 ----------------
  'n5-13A-g01': {
    formula: 'N でも いいです（か） / N でも V（khả năng）',
    parts: [
      { token: 'でも', role: 'Đưa ra một gợi ý/lựa chọn tối thiểu ("Ngay cả N / N thôi cũng được chứ?").' },
    ],
    tip: 'Lưu ý: Khác với 「で」 (chỉ định chính xác), 「でも」 mang sắc thái nhượng bộ nhẹ nhàng, lịch sự.',
  },
  'n5-13A-g02': {
    formula: 'V ても いいですか',
    parts: [
      { token: 'ても いいですか', role: 'Mẫu câu xin phép lịch sự ("Tôi làm V có được không ạ?").' },
    ],
    tip: 'Chú ý: Trả lời đồng ý: 「ええ、いいですよ / どうぞ」; từ chối lịch sự: 「すみません、ちょっと…」.',
  },
  'n5-13A-g03': {
    formula: 'V ても いいです',
    parts: [
      { token: 'ても いいです', role: 'Cho phép làm gì đó ("Được phép V / Làm V cũng được").' },
    ],
    tip: 'Lưu ý: Cấm đoán ngược lại là 「V ては いけません」 (Không được phép V).',
  },
  'n5-13A-g04': {
    formula: 'V ない（bỏ い）＋ くても いいです',
    parts: [
      { token: 'なくても いいです', role: 'Nói về việc KHÔNG CẦN THIẾT phải làm ("Không cần V cũng được").' },
    ],
    tip: 'Phân biệt cực quan trọng: Khi bị hỏi 「Vなければ なりませんか」(Có phải V không?), nếu không cần thì trả lời 「いいえ、Vなくても いいです」 (KHÔNG trả lời 「～てはいけません」!).',
  },
  'n5-13B-g05': {
    formula: 'V て ＋ ください / V ない ＋ で ＋ ください',
    parts: [
      { token: 'V てください', role: 'Yêu cầu, nhờ vả hoặc mời đối phương làm V ("Hãy V / Vui lòng V").' },
      { token: 'V ないでください', role: 'Khuyên ngăn hoặc yêu cầu đừng làm V ("Xin đừng V").' },
    ],
    tip: 'Chú ý: Dạng phủ định dùng 「ないでください」 (giữ nguyên 「ない」 + 「で」), không dùng 「なくて」.',
  },
  'n5-13B-g06': {
    formula: 'V て ＋ くれますか（Thể thường: V てくれる？）',
    parts: [
      { token: 'てくれますか', role: 'Nhờ vả nhẹ nhàng người ngang hàng/thân thiết làm giúp mình ("Bạn V giúp tôi nhé?").' },
    ],
    tip: 'Lưu ý: Với cấp trên hoặc người lạ, nên nâng lên 「V て くれませんか」 hoặc 「V て くださいませんか」.',
  },
  'n5-13B-g07': {
    formula: 'V て ＋ くれませんか / V て ＋ くださいませんか',
    parts: [
      { token: 'てくれませんか', role: 'Nhờ vả lịch sự ("Bạn làm V giúp tôi có được không?").' },
      { token: 'てくださいませんか', role: 'Nhờ vả rất lịch sự, trang trọng (dùng với thầy cô, cấp trên, người lớn).' },
    ],
    tip: 'Mẹo nhớ: Mức độ lịch sự tăng dần: 「てくれる？」 → 「てくれますか」 → 「てくれませんか」 → 「てくださいませんか」.',
  },
  'n5-13C-g08': {
    formula: 'N1 は / が（私に）N2 を くれる / くださる',
    parts: [
      { token: 'くれる / くださる', role: 'Người khác (N1) cho/tặng ĐỒ VẬT (N2) cho MÌNH (hoặc người thân phía mình).' },
    ],
    tip: 'Bắt buộc: Không bao giờ dùng 「私があげる」 khi người nhận là tôi; hễ "cho TÔI" thì phải dùng 「くれる / くださる」!',
  },
  'n5-13C-g09': {
    formula: 'N は / が（私に）V て ＋ くれる / くださる',
    parts: [
      { token: 'てくれる / てくださる', role: 'Người khác làm hành động V giúp cho mình (mang hàm ý biết ơn).' },
    ],
    tip: 'Chú ý: 「くださる」 là kính ngữ của 「くれる」, chia lịch sự thành 「くださいます」 (không phải くださります).',
  },
  'n5-13C-g10': {
    formula: 'N1 は N2 に N3 を あげる / さしあげる',
    parts: [
      { token: 'あげる / さしあげる', role: 'N1 (thường là Tôi) cho/tặng N3 cho người khác (N2).' },
    ],
    tip: 'Chú ý: Không dùng 「さしあげる」 khi nói với cấp trên để tránh khoe khoang sự ban ơn.',
  },
  'n5-13C-g11': {
    formula: 'N1 は N2 に V て ＋ あげる / さしあげる',
    parts: [
      { token: 'てあげる', role: 'Làm hành động V giúp cho người khác (N2).' },
    ],
    tip: 'Lưu ý giao tiếp: Tránh nói trực tiếp 「私が やってあげます」 với người lớn/cấp trên vì nghe hơi trịch thượng; hãy dùng 「しましょうか」!',
  },

  // ---------------- Unit 14 ----------------
  'n5-14A-g01': {
    formula: 'V ましょうか（Thể thường: V ようか）',
    parts: [
      { token: 'ましょうか', role: 'Chủ động đề nghị làm giúp ai đó việc gì ("Để tôi V giúp nhé?").' },
    ],
    tip: 'Mẹo nhớ: Đáp lại lời đề nghị giúp đỡ: 「ええ、お願いします」(Vâng, nhờ anh/chị) hoặc 「いいえ、大丈夫です」(Không sao đâu ạ).',
  },
  'n5-14A-g02': {
    formula: 'N / [Số lượng] ＋ しか ＋ V phủ định',
    parts: [
      { token: 'しか ～ ない', role: 'Nhấn mạnh sự ít ỏi, giới hạn ("chỉ có ngần ấy thôi, không hơn").' },
    ],
    tip: 'Bắt buộc: Đằng sau 「しか」 LUÔN PHẢI là động từ/tính từ PHỦ ĐỊNH! Không dùng 「を / が」 cùng 「しか」.',
  },
  'n5-14A-g03': {
    formula: 'N / [Số lượng] ＋ だけ ～',
    parts: [
      { token: 'だけ', role: 'Mang nghĩa "chỉ..." một cách khách quan, đi được với cả khẳng định lẫn phủ định.' },
    ],
    tip: 'Phân biệt: 「100円 だけ あります」(khẳng định, trung tính) vs 「100円 しか ありません」(phủ định, nhấn mạnh "ít quá, chỉ có 100 yên").',
  },
  'n5-14B-g04': {
    formula: 'N ＋（trợ từ）は ～',
    parts: [
      { token: 'Trợ từ kép', role: '「には / では / へは / とは」 ghép thêm 「は」 vào sau trợ từ khác để nhấn mạnh chủ đề/sự đối chiếu.' },
    ],
    tip: 'Chú ý: 「を」 và 「が」 biến mất khi gặp 「は」 (chỉ còn 「は」), còn 「に / で / へ / と / から / まで」 giữ nguyên rồi thêm 「は」.',
  },
  'n5-14B-g05': {
    formula: 'N1 は ～ が / けど、N2 は ～',
    parts: [
      { token: 'N1 は ～、N2 は ～', role: 'Đặt 2 chủ thể N1 và N2 song song với trợ từ 「は」 để so sánh đối chiếu đặc điểm trái ngược.' },
    ],
    tip: 'Mẹo nhớ: 「は」 ngoài đánh dấu chủ đề còn có chức năng đối chiếu ("Còn N1 thì..., còn N2 thì...").',
  },
  'n5-14B-g06': {
    formula: 'Aい（bỏ い）/ Aな（bỏ な）＋ さ',
    parts: [
      { token: '＋ さ', role: 'Biến Tính từ thành Danh từ trừu tượng chỉ mức độ (「高い」→「高さ」 độ cao; 「おいしい」→「おいしさ」 độ ngon).' },
    ],
    tip: 'Ngoại lệ: 「いい」(tốt) → 「よさ」 (độ tốt, ưu điểm).',
  },
  'n5-14C-g07': {
    formula: '[Thể Thường] / Aな / N ＋ なら',
    parts: [
      { token: 'なら', role: 'Tiếp nhận chủ đề người đối diện vừa nhắc ("Nếu nói về ～ thì..."), dùng để đưa ra lời khuyên hoặc gợi ý.' },
    ],
    tip: 'Chú ý: Danh từ và Aな đi thẳng với 「なら」, KHÔNG thêm 「だ」 (đúng: 「日本なら」, sai: 「日本だなら」)!',
  },
  'n5-14C-g08': {
    formula: 'N / Aな（bỏ な）＋ なら',
    parts: [
      { token: 'なら cho N / Aな', role: 'Đóng vai trò dạng điều kiện "Nếu ～ thì" tương ứng với 「ば」 của động từ và Aい.' },
    ],
    tip: 'Mẹo nhớ bộ 3 điều kiện 「ば/なら」: V → 「Vば」, Aい → 「Aいければ」, N/Aな → 「N/Aな + なら」.',
  },
};

export const GRAMMAR_ANALYSIS: Record<string, GrammarAnalysis> = {
  ...grammarAnalysis1to7,
  ...grammarAnalysis8to14,
};

