import type { Grammar, LevelId } from './types';

export interface GrammarClusterDef {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  /** Regex tested against pattern + meaning to auto-assign grammar items. */
  match: RegExp;
}

export interface ComparisonItem {
  pattern: string;
  meaning: string;
  usage: string;
  exampleJa: string;
  exampleVi: string;
  lessonId: string;
}

export interface GrammarComparisonGroup {
  id: string;
  level: LevelId;
  title: string;
  summary: string;
  items: ComparisonItem[];
}

export const N5_CLUSTERS: GrammarClusterDef[] = [
  {
    id: 'n5-te-rules',
    title: 'Thể て: Yêu cầu, Cho phép & Cấm',
    subtitle: 'てください, てもいい, てはいけません, ています',
    color: 'rose',
    match: /て\s*(?:ください|もいい|はいけません|います|いた|あげ|くれ|もら)|Vて|V て/,
  },
  {
    id: 'n5-nai-rules',
    title: 'Thể ない: Đừng làm, Phải làm & Không cần',
    subtitle: 'ないでください, なければ, なくてもいい',
    color: 'amber',
    match: /ない|なければ|なくても|なくちゃ|ないで/,
  },
  {
    id: 'n5-ta-time',
    title: 'Thể た, Kinh nghiệm & Thứ tự thời gian',
    subtitle: 'たことがある, たり～たり, まえに, あとで',
    color: 'emerald',
    match: /たこと|たり|まえに|前に|あとで|後で|てから|とき|Vた/,
  },
  {
    id: 'n5-desire-ability',
    title: 'Mong muốn, Khả năng & Sở thích',
    subtitle: 'たい, ほしい, ことができる, 好き/上手',
    color: 'sky',
    match: /たい|ほしい|欲しい|ことができ|好き|嫌い|上手|下手|得意|苦手/,
  },
  {
    id: 'n5-adj-compare',
    title: 'Tính từ い / な & So sánh hơn – nhất',
    subtitle: 'Tính từ, あまり～ない, より～ほうが, 一番',
    color: 'violet',
    match: /A\s*[いな]|より|ほうが|一番|あまり|とても|どんな/,
  },
  {
    id: 'n5-opinion-reason',
    title: 'Ý kiến, Trích dẫn & Lý do',
    subtitle: 'と思います, と言います, から, けど, でしょう',
    color: 'indigo',
    match: /と思|と言|から|ので|けど|でしょう|だろう|よね|ね|よ/,
  },
  {
    id: 'n5-exist-count',
    title: 'Tồn tại, Số lượng & Mức độ',
    subtitle: 'います・あります, だけ, しか, くらい, ずつ',
    color: 'teal',
    match: /います|あります|だけ|しか|くらい|ぐらい|ずつ|いくつ|いくら|何/,
  },
  {
    id: 'n5-particles-basic',
    title: 'Câu cơ bản, Chỉ định & Trợ từ nền tảng',
    subtitle: 'です, じゃありません, これ/それ/あれ, は/が/を/に/で/へ/と/の/も',
    color: 'stone',
    match: /.*/,
  },
];

export const N4_CLUSTERS: GrammarClusterDef[] = [
  {
    id: 'n4-guess-hearsay',
    title: 'Phán đoán, Suy đoán & Truyền đạt',
    subtitle: 'でしょう, かもしれない, みたい, ようだ, はず, そうだ, らしい, と言う/思う',
    color: 'rose',
    match: /でしょう|だろう|かもしれ|みたい|ようだ|はず|らしい|そうだ|と思|と言|し、/,
  },
  {
    id: 'n4-ndesu-state',
    title: 'Giải thích ～んです & Mức độ / Trạng thái',
    subtitle: 'んです, すぎる, やすい/にくい, なる/する, Aく/に + V, も〜',
    color: 'amber',
    match: /んです|すぎる|やすい|にくい|なる|＋ V|も〜|まだ.*ていない|そう/,
  },
  {
    id: 'n4-trans-mod',
    title: 'Tự / Tha động từ & Mệnh đề bổ nghĩa',
    subtitle: 'V自/V他, てある, MĐBNDT, 見える/聞こえる/わかる',
    color: 'sky',
    match: /自|他|てある|MĐBNDT|Bổ nghĩa|bổ nghĩa|見える|聞こえる|わかる|におい|声|音/,
  },
  {
    id: 'n4-nominal-cmd',
    title: 'Danh từ hóa (の), Mệnh lệnh & Cấm chỉ',
    subtitle: 'Vるの, ということ, Thể mệnh lệnh, Vるな, なさい, という意味',
    color: 'violet',
    match: /の\s*[がをは]|の＋|Mệnh|命令|な$|なさい|意味|って/,
  },
  {
    id: 'n4-giving-asking',
    title: 'Cho – Nhận hành động & Nhờ vả',
    subtitle: 'てあげる/もらう/くれる, いただく, てほしい, もらえませんか',
    color: 'emerald',
    match: /あげ|もら|くれ|いただ|ほしい|教わ|預か/,
  },
  {
    id: 'n4-te-aux',
    title: 'Phụ trợ Thể て & Khuyên bảo / Nghĩa vụ',
    subtitle: 'てしまう(ちゃう), ておく, ていく/てくる, てはいけない, なくては, ないで, ほうがいい',
    color: 'pink',
    match: /てしまう|ちゃう|ておく|ていく|てくる|て ＋ くる|ては|なくては|ないで|ほうがいい|て、.*て/,
  },
  {
    id: 'n4-decide-plan',
    title: 'Quyết định, Thói quen & Dự định',
    subtitle: 'ことにする/なる, ようにする/なる, つもり, 予定, ところ, たり',
    color: 'teal',
    match: /ことに|ように|つもり|予定|ところ|ようと思|たり|N の \/ V る/,
  },
  {
    id: 'n4-time-clauses',
    title: 'Thời gian (とき・間・まで) & Câu hỏi lồng',
    subtitle: 'とき, 間/間に, まで/までに, かどうか, Từ để hỏi + か',
    color: 'cyan',
    match: /とき|間|まで|かどうか|Từ để hỏi/,
  },
  {
    id: 'n4-cond-voice',
    title: 'Điều kiện, Lý do, Bị động & Sai khiến',
    subtitle: 'たら, ば, と, なら, ので, のに, ても, Bị động (られる), Sai khiến (させる)',
    color: 'indigo',
    match: /たら|ば|と～|なら|場合|ので|のに|ても|させ|られ|bị động|sai khiến/i,
  },
  {
    id: 'n4-purpose-keigo',
    title: 'Mục đích, Thử làm, Theo như & Kính ngữ',
    subtitle: 'ために, とおり/どおり, てみる, Tôn kính ngữ, Khiêm nhường ngữ, でございます',
    color: 'orange',
    match: /ため|みる|とおり|どおり|るの\s*N|お.*になる|お.*ください|Kính ngữ|Khiêm nhường|いらっしゃ|申|伺|参|ございます/,
  },
  {
    id: 'n4-other',
    title: 'Cấu trúc mở rộng khác',
    subtitle: 'Các mẫu liên kết & biểu hiện N4 khác',
    color: 'stone',
    match: /.*/,
  },
];

export const GRAMMAR_COMPARISONS: GrammarComparisonGroup[] = [
  {
    id: 'comp-permission-obligation',
    level: 'n5',
    title: 'Xin phép – Cấm đoán – Bắt buộc – Không cần',
    summary: '4 mẫu đi từ Thể て và Thể ない rất hay bị nhầm khi làm bài tập điền trợ từ hoặc chọn đáp án.',
    items: [
      {
        pattern: 'Vて + もいいですか',
        meaning: 'Làm V có được không? (Xin phép)',
        usage: 'Dùng khi xin phép hoặc cho phép ai làm gì.',
        exampleJa: 'ここで写真をとってもいいですか。',
        exampleVi: 'Tôi chụp ảnh ở đây có được không?',
        lessonId: '8A',
      },
      {
        pattern: 'Vて + はいけません',
        meaning: 'Không được phép làm V (Cấm đoán)',
        usage: 'Quy định, nội quy, cấm làm hành động đó.',
        exampleJa: 'ここでタバコを吸ってはいけません。',
        exampleVi: 'Không được hút thuốc ở đây.',
        lessonId: '8A',
      },
      {
        pattern: 'Vない (bỏ い) + ければなりません',
        meaning: 'Phải làm V (Nghĩa vụ / Bắt buộc)',
        usage: 'Việc bắt buộc phải làm dù muốn hay không.',
        exampleJa: '毎日薬を飲まなければなりません。',
        exampleVi: 'Mỗi ngày phải uống thuốc.',
        lessonId: '9B',
      },
      {
        pattern: 'Vない (bỏ い) + くてもいいです',
        meaning: 'Không cần phải làm V cũng được',
        usage: 'Miễn trừ nghĩa vụ, không bắt buộc.',
        exampleJa: '明日は来なくてもいいです。',
        exampleVi: 'Ngày mai không cần đến cũng được.',
        lessonId: '9B',
      },
    ],
  },
  {
    id: 'comp-request-advice',
    level: 'n5',
    title: 'Nhờ vả – Cấm nhẹ – Khuyên nên / không nên',
    summary: 'Phân biệt mức độ lịch sự và sắc thái giữa yêu cầu trực tiếp với lời khuyên.',
    items: [
      {
        pattern: 'Vて + ください',
        meaning: 'Hãy / Xin vui lòng làm V',
        usage: 'Nhờ vả, chỉ dẫn lịch sự.',
        exampleJa: 'ここに名前を書いてください。',
        exampleVi: 'Xin vui lòng viết tên vào đây.',
        lessonId: '7A',
      },
      {
        pattern: 'Vない + でください',
        meaning: 'Xin đừng làm V',
        usage: 'Yêu cầu ai đừng làm gì (nhẹ nhàng hơn てはいけません).',
        exampleJa: '忘れないでください。',
        exampleVi: 'Xin đừng quên nhé.',
        lessonId: '9A',
      },
      {
        pattern: 'Vた + ほうがいいです',
        meaning: 'Nên làm V thì hơn',
        usage: 'Đưa ra lời khuyên tích cực cho người nghe.',
        exampleJa: '早く寝たほうがいいですよ。',
        exampleVi: 'Bạn nên đi ngủ sớm thì hơn đấy.',
        lessonId: '12B',
      },
      {
        pattern: 'Vない + ほうがいいです',
        meaning: 'Không nên làm V',
        usage: 'Khuyên người nghe tránh làm gì.',
        exampleJa: 'お酒を飲まないほうがいいです。',
        exampleVi: 'Bạn không nên uống rượu.',
        lessonId: '12B',
      },
    ],
  },
  {
    id: 'comp-desire',
    level: 'n5',
    title: 'Mong muốn: たい (làm gì) vs ほしい (có cái gì)',
    summary: 'Học sinh yếu rất hay nhầm giữa muốn hành động và muốn đồ vật.',
    items: [
      {
        pattern: 'Vます + たいです',
        meaning: 'Muốn làm hành động V',
        usage: 'Chia như tính từ đuôi い (たくない / たかった).',
        exampleJa: '日本へ行きたいです。',
        exampleVi: 'Tôi muốn đi Nhật Bản.',
        lessonId: '6B',
      },
      {
        pattern: 'N + が ほしいです',
        meaning: 'Muốn có danh từ/đồ vật N',
        usage: 'Đi với trợ từ が, chia như tính từ đuôi い.',
        exampleJa: '新しいパソコンがほしいです。',
        exampleVi: 'Tôi muốn có một chiếc máy tính mới.',
        lessonId: '6B',
      },
    ],
  },
  {
    id: 'comp-experience-habit',
    level: 'n5',
    title: 'Kinh nghiệm (たこと) vs Thói quen/Thỉnh thoảng (ること)',
    summary: 'Chỉ khác nhau đúng 1 chữ た và る nhưng nghĩa thay đổi hoàn toàn!',
    items: [
      {
        pattern: 'Vた + ことがあります',
        meaning: 'Đã từng làm V (Kinh nghiệm trong quá khứ)',
        usage: 'Nhấn mạnh trải nghiệm ít nhất 1 lần từ trước tới nay.',
        exampleJa: '富士山に登ったことがあります。',
        exampleVi: 'Tôi đã từng leo núi Phú Sĩ.',
        lessonId: '10A',
      },
      {
        pattern: 'Vる + ことがあります',
        meaning: 'Thỉnh thoảng / Có lúc làm V',
        usage: 'Thói quen hoặc sự việc đôi khi xảy ra.',
        exampleJa: 'ときどき朝ごはんを食べないことがあります。',
        exampleVi: 'Thỉnh thoảng có lúc tôi không ăn sáng.',
        lessonId: '10A',
      },
    ],
  },
  {
    id: 'comp-n4-guess',
    level: 'n4',
    title: 'Mức độ suy đoán N4: かもしれない – みたい/ようだ – はずだ – だろう',
    summary: 'Sắp xếp theo độ chắc chắn từ thấp đến cao để không chọn nhầm trong bài đọc hiểu.',
    items: [
      {
        pattern: 'Thể thường + かもしれない',
        meaning: 'Có lẽ / Có khi (50%)',
        usage: 'Khả năng xảy ra không chắc chắn lắm.',
        exampleJa: '明日は雨が降るかもしれません。',
        exampleVi: 'Ngày mai có lẽ trời sẽ mưa.',
        lessonId: '15A',
      },
      {
        pattern: 'Thể thường + みたいだ / ようだ',
        meaning: 'Hình như / Có vẻ (70% — dựa vào cảm nhận)',
        usage: 'みたい dùng trong văn nói; よう trang trọng hơn, dùng trong văn viết.',
        exampleJa: '部屋の中は誰もいないようだ。',
        exampleVi: 'Trong phòng hình như không có ai.',
        lessonId: '15B',
      },
      {
        pattern: 'Thể thường + でしょう / だろう',
        meaning: 'Chắc hẳn (80% — dự đoán chủ quan)',
        usage: 'Thường đi với きっと / 多分.',
        exampleJa: 'たくさん勉強したから、きっと合格するでしょう。',
        exampleVi: 'Vì học nhiều nên chắc hẳn sẽ đỗ thôi.',
        lessonId: '15A',
      },
      {
        pattern: 'Thể thường + はずだ',
        meaning: 'Chắc chắn (90%+ — có căn cứ rõ ràng)',
        usage: 'Dựa trên bằng chứng, lịch trình, quy luật khách quan.',
        exampleJa: 'さっきメールがあったから、駅で待っているはずだ。',
        exampleVi: 'Vì vừa có email nên chắc chắn đang đợi ở ga.',
        lessonId: '15B',
      },
    ],
  },
  {
    id: 'comp-n4-decide-habit',
    level: 'n4',
    title: 'Quyết định (ことに) vs Cố gắng/Thay đổi (ように)',
    summary: 'Phân biệt giữa ý chí tự quyết định, quyết định khách quan và quá trình hình thành thói quen.',
    items: [
      {
        pattern: 'Vる / Vない + ことにする',
        meaning: 'Tự mình quyết định làm / không làm V',
        usage: 'Quyết định mang tính ý chí cá nhân của người nói.',
        exampleJa: '明日から甘いものを食べないことにする。',
        exampleVi: 'Từ mai tôi quyết định sẽ không ăn đồ ngọt nữa.',
        lessonId: '25A',
      },
      {
        pattern: 'Vる / Vない + ことになる',
        meaning: 'Được quyết định là / Hóa ra là',
        usage: 'Quyết định từ tập thể, công ty hoặc hoàn cảnh khách quan.',
        exampleJa: '来月からベトナムに出張することになった。',
        exampleVi: 'Theo quyết định từ tháng sau tôi sẽ đi công tác Việt Nam.',
        lessonId: '25A',
      },
      {
        pattern: 'Vる / Vない + ようにしている',
        meaning: 'Cố gắng duy trì thói quen làm / không làm V',
        usage: 'Nỗ lực đều đặn hằng ngày.',
        exampleJa: '毎日運動するようにしています。',
        exampleVi: 'Tôi luôn cố gắng tập thể dục mỗi ngày.',
        lessonId: '25B',
      },
      {
        pattern: 'Vる + ようになる',
        meaning: 'Trở nên có thể / Bắt đầu có thói quen V',
        usage: 'Thể hiện sự biến đổi trạng thái từ không thể → có thể.',
        exampleJa: '日本語が話せるようになりました。',
        exampleVi: 'Tôi đã có thể nói được tiếng Nhật rồi.',
        lessonId: '25B',
      },
    ],
  },
  {
    id: 'comp-n4-sou-hearsay-look',
    level: 'n4',
    title: 'Phân biệt「そうだ」: Nghe nói vs Trông có vẻ',
    summary: 'Cùng là そうだ nhưng cách chia phía trước khác nhau hoàn toàn!',
    items: [
      {
        pattern: 'Thể thường + そうだ (Nghe nói)',
        meaning: 'Nghe nói là ~ (Truyền đạt thông tin)',
        usage: 'Giữ nguyên い/だ trước そうだ. Thường đi với ～によると.',
        exampleJa: '天気予報によると、明日は寒いそうです。',
        exampleVi: 'Theo dự báo thời tiết, nghe nói ngày mai trời sẽ lạnh.',
        lessonId: '16A',
      },
      {
        pattern: 'Vます / A (bỏ い・な) + そうだ (Trông có vẻ)',
        meaning: 'Trông có vẻ ~ / Sắp sửa ~ (Cảm nhận trực quan)',
        usage: 'Bỏ ます, bỏ い/な (riêng いい → よさそう, ない → なさそう).',
        exampleJa: 'このケーキはおいしそうですね。',
        exampleVi: 'Cái bánh này trông có vẻ ngon nhỉ.',
        lessonId: '18A',
      },
    ],
  },
  {
    id: 'comp-n4-conditionals',
    level: 'n4',
    title: '4 Câu điều kiện N4: と – ば – たら – なら',
    summary: 'So sánh nhanh để không bị nhầm khi làm bài tập nối câu N4.',
    items: [
      {
        pattern: 'Vる + と',
        meaning: 'Hễ ~ thì tất yếu / tự nhiên xảy ra',
        usage: 'Quy luật tự nhiên, máy móc, chỉ đường. Vế sau KHÔNG dùng ý chí/mệnh lệnh.',
        exampleJa: 'このボタンを押すと、お釣りが出ます。',
        exampleVi: 'Hễ bấm nút này thì tiền thừa sẽ ra.',
        lessonId: '32A',
      },
      {
        pattern: 'Vば / Aければ + ...',
        meaning: 'Nếu ~ thì (điều kiện chung)',
        usage: 'Nhấn mạnh điều kiện cần để kết quả vế sau xảy ra.',
        exampleJa: '毎日練習すれば、上手になります。',
        exampleVi: 'Nếu luyện tập mỗi ngày thì sẽ giỏi lên.',
        lessonId: '31A',
      },
      {
        pattern: 'Vた / Aかった + ら',
        meaning: 'Nếu / Sau khi ~ thì (đa năng nhất)',
        usage: 'Dùng được cho mọi tình huống giả định, tương lai, rủ rê, nhờ vả.',
        exampleJa: '雨が降ったら、出かけません。',
        exampleVi: 'Nếu trời mưa thì tôi sẽ không ra ngoài.',
        lessonId: '27A',
      },
      {
        pattern: 'Thể thường + なら',
        meaning: 'Nếu nói về ~ thì (dựa trên lời đối phương)',
        usage: 'Đưa ra lời khuyên/thông tin tiếp nối chủ đề người kia vừa nhắc.',
        exampleJa: '日本語の本なら、先生に聞くといいですよ。',
        exampleVi: 'Nếu là sách tiếng Nhật thì hỏi thầy giáo là tốt đấy.',
        lessonId: '31B',
      },
    ],
  },
  {
    id: 'comp-n4-purpose-reason',
    level: 'n4',
    title: 'Mục đích (ために vs ように) & Nguyên nhân (から vs ので vs ため)',
    summary: 'Cặp bài trùng xuất hiện liên tục trong đề thi JLPT N4.',
    items: [
      {
        pattern: 'Vる / N の + ために',
        meaning: 'Để ~ (Mục đích mang tính ý chí)',
        usage: 'Vế trước là động từ có ý chí (mua, đi, làm) và 2 vế cùng chủ ngữ.',
        exampleJa: '家を買うために、貯金しています。',
        exampleVi: 'Tôi đang tiết kiệm tiền để mua nhà.',
        lessonId: '32A',
      },
      {
        pattern: 'V khả năng / Vない + ように',
        meaning: 'Để có thể ~ / Để không bị ~',
        usage: 'Vế trước là động từ khả năng hoặc trạng thái không tự chủ.',
        exampleJa: '日本の会社で働けるように、勉強しています。',
        exampleVi: 'Tôi đang học để có thể làm việc tại công ty Nhật.',
        lessonId: '32C',
      },
      {
        pattern: '～から vs ～ので vs ～ため',
        meaning: 'Vì ~ nên ~ (Mức độ lịch sự tăng dần)',
        usage: 'から (thân mật/chủ quan) → ので (lịch sự/mềm mỏng) → ため (trang trọng/báo cáo).',
        exampleJa: '体調が悪いので、早退させていただけませんか。',
        exampleVi: 'Vì sức khỏe không tốt nên cho phép tôi về sớm được không ạ?',
        lessonId: '31A',
      },
      {
        pattern: '～のに',
        meaning: 'Mặc dù ~ vậy mà ~ (Ngạc nhiên / Tiếc nuối)',
        usage: 'Vế sau trái ngược với kỳ vọng từ vế trước.',
        exampleJa: '薬を飲んだのに、熱が下がりません。',
        exampleVi: 'Mặc dù đã uống thuốc nhưng vẫn không hạ sốt.',
        lessonId: '29A',
      },
    ],
  },
  {
    id: 'comp-n4-voice-keigo',
    level: 'n4',
    title: 'Bị động – Sai khiến & Tôn kính – Khiêm nhường',
    summary: 'Phân biệt chủ thể thực hiện hành động và vị thế người nói/nghe.',
    items: [
      {
        pattern: 'Vられる (Bị động) vs Vさせる (Sai khiến)',
        meaning: 'Bị/Được làm V  ↔  Bắt/Cho phép ai làm V',
        usage: 'Bị động nhấn mạnh người chịu tác động; Sai khiến nhấn mạnh người ra lệnh/cho phép.',
        exampleJa: '部長に呼ばれた。 / 社長は私たちを待たせた。',
        exampleVi: 'Tôi bị Trưởng phòng gọi. / Giám đốc bắt chúng tôi đợi.',
        lessonId: '28A',
      },
      {
        pattern: 'Vさせていただけませんか',
        meaning: 'Xin phép cho tôi được làm V có được không ạ?',
        usage: 'Dùng khi xin phép cấp trên/khách hàng một cách cực kỳ lịch sự.',
        exampleJa: '写真を撮らせていただけませんか。',
        exampleVi: 'Xin phép cho tôi chụp ảnh có được không ạ?',
        lessonId: '29A',
      },
      {
        pattern: 'Tôn kính ngữ (いらっしゃる・おっしゃる・おVになる)',
        meaning: 'Nâng cao hành động của NGƯỜI BỀ TRÊN / KHÁCH',
        usage: 'Không bao giờ dùng cho bản thân hoặc người trong công ty mình khi nói với khách.',
        exampleJa: '先生は会議室にいらっしゃいます。',
        exampleVi: 'Thầy giáo đang ở trong phòng họp ạ.',
        lessonId: '33A',
      },
      {
        pattern: 'Khiêm nhường ngữ (おる・参る・申す・おVする)',
        meaning: 'Hạ thấp hành động của BẢN THÂN / PHÍA MÌNH',
        usage: 'Dùng để thể hiện sự tôn trọng với đối phương.',
        exampleJa: '田中が12時に伺います。 / ミンと申します。',
        exampleVi: 'Anh Tanaka (bên tôi) sẽ đến lúc 12h. / Tôi tên là Minh ạ.',
        lessonId: '33B',
      },
    ],
  },
];

export interface ClusteredGrammar {
  cluster: GrammarClusterDef;
  items: Grammar[];
}

export function groupGrammarByClusters(level: LevelId, items: Grammar[]): ClusteredGrammar[] {
  const defs = level === 'n4' ? N4_CLUSTERS : N5_CLUSTERS;
  const buckets = new Map<string, Grammar[]>();
  for (const d of defs) buckets.set(d.id, []);

  for (const g of items) {
    const target = `${g.pattern} ${g.meaning}`;
    const found = defs.find((d) => d.match.test(target)) ?? defs[defs.length - 1]!;
    buckets.get(found.id)!.push(g);
  }

  return defs
    .map((cluster) => ({ cluster, items: buckets.get(cluster.id) ?? [] }))
    .filter((entry) => entry.items.length > 0);
}

