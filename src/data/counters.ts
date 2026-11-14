export interface CounterEntry {
  value: string;
  kanji: string;
  reading: string;
  romaji: string;
  /** True when the reading is irregular or has sound-change (biến âm / っ / 濁音). */
  special?: boolean;
  note?: string;
}

export interface CounterCategory {
  id: string;
  title: string;
  kanjiBadge: string;
  questionWord: string;
  questionReading: string;
  questionMeaning: string;
  ruleSummary: string;
  memoryTip: string;
  entries: CounterEntry[];
}

export interface CounterQuiz {
  id: string;
  category: string;
  prompt: string;
  highlight?: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export const COUNTER_CATEGORIES: CounterCategory[] = [
  {
    id: 'basic-numbers',
    title: 'Số đếm cơ bản (0 – 10.000+)',
    kanjiBadge: '数字',
    questionWord: 'いくつ / いくら',
    questionReading: 'いくつ / いくら',
    questionMeaning: 'Bao nhiêu?',
    ruleSummary:
      'Số 1–10 là nền tảng ghép thành hàng chục (じゅう), hàng trăm (ひゃく), hàng nghìn (せん), hàng vạn (まん = 10.000).',
    memoryTip:
      'Nhớ 3 cặp biến âm kinh điển ở hàng trăm (300, 600, 800) và 2 mốc ở hàng nghìn (3.000, 8.000).',
    entries: [
      { value: '0', kanji: '零 / 〇', reading: 'ぜろ / れい', romaji: 'zero / rei' },
      { value: '1', kanji: '一', reading: 'いち', romaji: 'ichi' },
      { value: '2', kanji: '二', reading: 'に', romaji: 'ni' },
      { value: '3', kanji: '三', reading: 'さん', romaji: 'san' },
      { value: '4', kanji: '四', reading: 'よん / し', romaji: 'yon / shi', special: true, note: 'Hay dùng よん khi đếm độc lập' },
      { value: '5', kanji: '五', reading: 'ご', romaji: 'go' },
      { value: '6', kanji: '六', reading: 'ろく', romaji: 'roku' },
      { value: '7', kanji: '七', reading: 'なな / しち', romaji: 'nana / shichi', special: true, note: 'Hay dùng なな để tránh nhầm với いち' },
      { value: '8', kanji: '八', reading: 'はち', romaji: 'hachi' },
      { value: '9', kanji: '九', reading: 'きゅう / く', romaji: 'kyū / ku', special: true, note: 'Tháng 9 & 9 giờ đọc く' },
      { value: '10', kanji: '十', reading: 'じゅう', romaji: 'jū' },
      { value: '100', kanji: '百', reading: 'ひゃく', romaji: 'hyaku' },
      { value: '300', kanji: '三百', reading: 'さんびゃく', romaji: 'sanbyaku', special: true, note: 'Biến âm: ひゃく → びゃく' },
      { value: '600', kanji: '六百', reading: 'ろっぴゃく', romaji: 'roppyaku', special: true, note: 'Biến âm: ろく + ひゃく → ろっぴゃく' },
      { value: '800', kanji: '八百', reading: 'はっぴゃく', romaji: 'happyaku', special: true, note: 'Biến âm: はち + ひゃく → はっぴゃく' },
      { value: '1.000', kanji: '千', reading: 'せん', romaji: 'sen' },
      { value: '3.000', kanji: '三千', reading: 'さんぜん', romaji: 'sanzen', special: true, note: 'Biến âm: せん → ぜん' },
      { value: '8.000', kanji: '八千', reading: 'はっせん', romaji: 'hassen', special: true, note: 'Biến âm: はち + せん → はっせん' },
      { value: '10.000', kanji: '一万', reading: 'いちまん', romaji: 'ichiman', special: true, note: 'Tiếng Nhật đếm theo vạn (4 số 0), không phải nghìn!' },
    ],
  },
  {
    id: 'currency',
    title: 'Tiền tệ (Yên Nhật - 円)',
    kanjiBadge: '円',
    questionWord: '何円 / いくら',
    questionReading: 'なんえん / いくら',
    questionMeaning: 'Bao nhiêu tiền?',
    ruleSummary: 'Ghép số đếm + えん (Yên). Không biến âm っ hay ば/ぱ.',
    memoryTip: 'Chỉ cần nhớ 4円 đọc là よえん (KHÔNG đọc よんえん) và 9円 đọc là きゅうえん.',
    entries: [
      { value: '1¥', kanji: '1円', reading: 'いちえん', romaji: 'ichien' },
      { value: '4¥', kanji: '4円', reading: 'よえん', romaji: 'yoen', special: true, note: 'Bỏ ん của よん → よえん' },
      { value: '5¥', kanji: '5円', reading: 'ごえん', romaji: 'goen' },
      { value: '7¥', kanji: '7円', reading: 'ななえん', romaji: 'nanaen' },
      { value: '9¥', kanji: '9円', reading: 'きゅうえん', romaji: 'kyūen' },
      { value: '100¥', kanji: '100円', reading: 'ひゃくえん', romaji: 'hyakuen' },
      { value: '300¥', kanji: '300円', reading: 'さんびゃくえん', romaji: 'sanbyakuen', special: true, note: 'Theo biến âm 300: さんびゃく' },
      { value: '600¥', kanji: '600円', reading: 'ろっぴゃくえん', romaji: 'roppyakuen', special: true, note: 'Theo biến âm 600: ろっぴゃく' },
      { value: '1.000¥', kanji: '1,000円', reading: 'せんえん', romaji: 'senen' },
      { value: '3.000¥', kanji: '3,000円', reading: 'さんぜんえん', romaji: 'sanzenen', special: true, note: 'Theo biến âm 3.000: さんぜん' },
      { value: '10.000¥', kanji: '10,000円', reading: 'いちまんえん', romaji: 'ichimanen' },
    ],
  },
  {
    id: 'time',
    title: 'Thời gian: Giờ (時) & Phút (分)',
    kanjiBadge: '時・分',
    questionWord: '何時・何分',
    questionReading: 'なんじ・なんぷん',
    questionMeaning: 'Mấy giờ? Mấy phút?',
    ruleSummary:
      'Giờ dùng 時 (じ). Phút dùng 分 (ふん/ぷん) — biến âm theo quy tắc 1-3-4-6-8-10.',
    memoryTip:
      'Giờ nhớ "4-7-9" (よじ, しちじ, くじ). Phút nhớ các số tận cùng 1, 3, 4, 6, 8, 0 đều đọc là ぷん (1, 6, 8, 10 có âm ngắt っ). Nửa tiếng = 半 (はん).',
    entries: [
      { value: '1 giờ', kanji: '1時', reading: 'いちじ', romaji: 'ichiji' },
      { value: '2 giờ', kanji: '2時', reading: 'にじ', romaji: 'niji' },
      { value: '3 giờ', kanji: '3時', reading: 'さんじ', romaji: 'sanji' },
      { value: '4 giờ', kanji: '4時', reading: 'よじ', romaji: 'yoji', special: true, note: 'Không đọc よんじ hay しじ' },
      { value: '7 giờ', kanji: '7時', reading: 'しちじ', romaji: 'shichiji', special: true, note: 'Đọc しちじ (ít dùng ななじ)' },
      { value: '9 giờ', kanji: '9時', reading: 'くじ', romaji: 'kuji', special: true, note: 'Đọc くじ (không đọc きゅうじ)' },
      { value: '1 phút', kanji: '1分', reading: 'いっぷん', romaji: 'ippun', special: true, note: 'Âm ngắt っ + ぷん' },
      { value: '2 phút', kanji: '2分', reading: 'にふん', romaji: 'nifun' },
      { value: '3 phút', kanji: '3分', reading: 'さんぷん', romaji: 'sanpun', special: true, note: 'Đổi thành ぷん' },
      { value: '4 phút', kanji: '4分', reading: 'よんぷん', romaji: 'yonpun', special: true, note: 'Đổi thành ぷん' },
      { value: '5 phút', kanji: '5分', reading: 'ごふん', romaji: 'gofun' },
      { value: '6 phút', kanji: '6分', reading: 'ろっぷん', romaji: 'roppun', special: true, note: 'Âm ngắt っ + ぷん' },
      { value: '7 phút', kanji: '7分', reading: 'ななふん', romaji: 'nanafun' },
      { value: '8 phút', kanji: '8分', reading: 'はっぷん', romaji: 'happun', special: true, note: 'Âm ngắt っ + ぷん' },
      { value: '9 phút', kanji: '9分', reading: 'きゅうふん', romaji: 'kyūfun' },
      { value: '10 phút', kanji: '10分', reading: 'じゅっぷん / じっぷん', romaji: 'juppun', special: true, note: 'Âm ngắt っ + ぷん' },
      { value: '30 phút / Rưỡi', kanji: '半 / 30分', reading: 'はん / さんじゅっぷん', romaji: 'han / sanjuppun' },
    ],
  },
  {
    id: 'age',
    title: 'Tuổi tác (歳 / 才)',
    kanjiBadge: '歳',
    questionWord: '何歳 / おいくつ',
    questionReading: 'なんさい / おいくつ',
    questionMeaning: 'Bao nhiêu tuổi?',
    ruleSummary: 'Ghép số đếm + さい. Hỏi lịch sự dùng おいくつ.',
    memoryTip:
      'Đặc biệt nhất là 20 tuổi đọc là はたち (KHÔNG đọc にじゅっさい)! Các số 1, 8, 10 có âm ngắt っ (いっさい, はっさい, じゅっさい).',
    entries: [
      { value: '1 tuổi', kanji: '1歳', reading: 'いっさい', romaji: 'issai', special: true, note: 'Âm ngắt っ' },
      { value: '2 tuổi', kanji: '2歳', reading: 'にさい', romaji: 'nisai' },
      { value: '3 tuổi', kanji: '3歳', reading: 'さんさい', romaji: 'sansai' },
      { value: '4 tuổi', kanji: '4歳', reading: 'よんさい', romaji: 'yonsai' },
      { value: '7 tuổi', kanji: '7歳', reading: 'ななさい', romaji: 'nanasai' },
      { value: '8 tuổi', kanji: '8歳', reading: 'はっさい', romaji: 'hassai', special: true, note: 'Âm ngắt っ' },
      { value: '9 tuổi', kanji: '9歳', reading: 'きゅうさい', romaji: 'kyūsai' },
      { value: '10 tuổi', kanji: '10歳', reading: 'じゅっさい / じっさい', romaji: 'jussai', special: true, note: 'Âm ngắt っ' },
      { value: '18 tuổi', kanji: '18歳', reading: 'じゅうはっさい', romaji: 'jūhassai', special: true, note: 'Tận cùng 8 → はっさい' },
      { value: '20 tuổi', kanji: '20歳', reading: 'はたち', romaji: 'hatachi', special: true, note: 'CỰC ĐẶC BIỆT! Tuổi trưởng thành ở Nhật' },
      { value: '30 tuổi', kanji: '30歳', reading: 'さんじゅっさい', romaji: 'sanjussai', special: true, note: 'Tận cùng 10 → じゅっさい' },
    ],
  },
  {
    id: 'days',
    title: 'Ngày trong tháng (1日 – 31日)',
    kanjiBadge: '日',
    questionWord: '何日',
    questionReading: 'なんにち',
    questionMeaning: 'Ngày mấy / Bao nhiêu ngày?',
    ruleSummary:
      'Ngày 1–10 và ngày 14, 20, 24 đọc theo âm thuần Nhật đặc biệt. Các ngày còn lại ghép số + にち.',
    memoryTip:
      'Nhớ kỹ cặp dễ nhầm: 4日 (よっか - mùng 4) vs 8日 (ようか - mùng 8); 20日 đọc là はつか (không đọc にじゅうにち); 14 & 24 đều kết thúc bằng よっか.',
    entries: [
      { value: 'Mùng 1', kanji: '1日', reading: 'ついたち', romaji: 'tsuitachi', special: true, note: 'Riêng 1 ngày (khoảng) = いちにち' },
      { value: 'Mùng 2', kanji: '2日', reading: 'ふつか', romaji: 'futsuka', special: true },
      { value: 'Mùng 3', kanji: '3日', reading: 'みっか', romaji: 'mikka', special: true },
      { value: 'Mùng 4', kanji: '4日', reading: 'よっか', romaji: 'yokka', special: true, note: 'Âm ngắn よっか (dễ nhầm với 8日 ようか)' },
      { value: 'Mùng 5', kanji: '5日', reading: 'いつか', romaji: 'itsuka', special: true },
      { value: 'Mùng 6', kanji: '6日', reading: 'むいか', romaji: 'muika', special: true },
      { value: 'Mùng 7', kanji: '7日', reading: 'なのか', romaji: 'nanoka', special: true },
      { value: 'Mùng 8', kanji: '8日', reading: 'ようか', romaji: 'yōka', special: true, note: 'Âm dài ようか (khác 4日 よっか)' },
      { value: 'Mùng 9', kanji: '9日', reading: 'ここのか', romaji: 'kokonoka', special: true },
      { value: 'Mùng 10', kanji: '10日', reading: 'とおか', romaji: 'tōka', special: true },
      { value: 'Ngày 11', kanji: '11日', reading: 'じゅういちにち', romaji: 'jūichinichi' },
      { value: 'Ngày 14', kanji: '14日', reading: 'じゅうよっか', romaji: 'jūyokka', special: true, note: 'Đuôi 4 vẫn đọc よっか' },
      { value: 'Ngày 15', kanji: '15日', reading: 'じゅうごにち', romaji: 'jūgonichi' },
      { value: 'Ngày 20', kanji: '20日', reading: 'はつか', romaji: 'hatsuka', special: true, note: 'CỰC ĐẶC BIỆT: はつか' },
      { value: 'Ngày 24', kanji: '24日', reading: 'にじゅうよっか', romaji: 'nijūyokka', special: true, note: 'Đuôi 4 vẫn đọc よっか' },
      { value: 'Ngày 31', kanji: '31日', reading: 'さんじゅういちにち', romaji: 'sanjūichinichi' },
    ],
  },
  {
    id: 'months-years',
    title: 'Tháng (月), Năm (年) & Thứ (曜日)',
    kanjiBadge: '月・年',
    questionWord: '何月・何年・何曜日',
    questionReading: 'なんがつ・なんねん・なんようび',
    questionMeaning: 'Tháng mấy? Năm nào? Thứ mấy?',
    ruleSummary:
      'Tháng = số + がつ. Năm = số + ねん. Đếm số tháng (khoảng thời gian) dùng 〜か月 (かげつ).',
    memoryTip:
      'Tháng nhớ bộ 3 "4-7-9" (しがつ, しちがつ, くがつ). Năm nhớ 4 là よんねん / よねん, 9 là くねん.',
    entries: [
      { value: 'Tháng 1', kanji: '1月', reading: 'いちがつ', romaji: 'ichigatsu' },
      { value: 'Tháng 4', kanji: '4月', reading: 'しがつ', romaji: 'shigatsu', special: true, note: 'Không đọc よんがつ' },
      { value: 'Tháng 7', kanji: '7月', reading: 'しちがつ', romaji: 'shichigatsu', special: true, note: 'Không đọc なながつ' },
      { value: 'Tháng 9', kanji: '9月', reading: 'くがつ', romaji: 'kugatsu', special: true, note: 'Không đọc きゅうがつ' },
      { value: 'Tháng 10–12', kanji: '10〜12月', reading: 'じゅうがつ〜じゅうにがつ', romaji: 'jūgatsu ~ jūnigatsu' },
      { value: '1 tháng (khoảng)', kanji: '1か月', reading: 'いっかげつ', romaji: 'ikkagetsu', special: true, note: 'Khoảng thời gian dùng かげつ (1, 6, 10 biến âm っ)' },
      { value: '4 năm', kanji: '4年', reading: 'よねん', romaji: 'yonen', special: true, note: 'Bỏ ん → よねん' },
      { value: '9 năm', kanji: '9年', reading: 'くねん', romaji: 'kunen', special: true, note: 'Thường đọc くねん' },
      { value: 'Thứ 2', kanji: '月曜日', reading: 'げつようび', romaji: 'getsuyōbi' },
      { value: 'Thứ 3', kanji: '火曜日', reading: 'かようび', romaji: 'kayōbi' },
      { value: 'Thứ 4', kanji: '水曜日', reading: 'すいようび', romaji: 'suiyōbi' },
      { value: 'Thứ 5', kanji: '木曜日', reading: 'もくようび', romaji: 'mokuyōbi' },
      { value: 'Thứ 6', kanji: '金曜日', reading: 'きんようび', romaji: 'kinyōbi' },
      { value: 'Thứ 7', kanji: '土曜日', reading: 'どようび', romaji: 'doyōbi' },
      { value: 'Chủ nhật', kanji: '日曜日', reading: 'にちようび', romaji: 'nichiyōbi' },
    ],
  },
  {
    id: 'people',
    title: 'Đếm người (人)',
    kanjiBadge: '人',
    questionWord: '何人',
    questionReading: 'なんにん',
    questionMeaning: 'Mấy người?',
    ruleSummary: 'Từ 3 người trở lên đọc là số + にん. Riêng 1 người và 2 người đọc hoàn toàn khác!',
    memoryTip: 'Bắt buộc thuộc lòng: 1人 = ひとり, 2人 = ふたり, 4人 = よにん (bỏ ん).',
    entries: [
      { value: '1 người', kanji: '1人', reading: 'ひとり', romaji: 'hitori', special: true, note: 'CỰC ĐẶC BIỆT (không đọc いちにん)' },
      { value: '2 người', kanji: '2人', reading: 'ふたり', romaji: 'futari', special: true, note: 'CỰC ĐẶC BIỆT (không đọc ににん)' },
      { value: '3 người', kanji: '3人', reading: 'さんにん', romaji: 'sannin' },
      { value: '4 người', kanji: '4人', reading: 'よにん', romaji: 'yonin', special: true, note: 'Bỏ ん của よん → よにん' },
      { value: '5 người', kanji: '5人', reading: 'ごにん', romaji: 'gonin' },
      { value: '6 người', kanji: '6人', reading: 'ろくにん', romaji: 'rokunin' },
      { value: '7 người', kanji: '7人', reading: 'ななにん / しちにん', romaji: 'nananin / shichinin' },
      { value: '8 người', kanji: '8人', reading: 'はちにん', romaji: 'hachinin' },
      { value: '9 người', kanji: '9人', reading: 'きゅうにん / くにん', romaji: 'kyūnin' },
      { value: '10 người', kanji: '10人', reading: 'じゅうにん', romaji: 'jūnin' },
    ],
  },
  {
    id: 'general-objects',
    title: 'Đếm đồ vật chung (〜つ: 1–10 cái)',
    kanjiBadge: 'つ',
    questionWord: 'いくつ',
    questionReading: 'いくつ',
    questionMeaning: 'Mấy cái / Bao nhiêu tuổi?',
    ruleSummary:
      'Dùng cho đồ vật nói chung (quả táo, cái ghế, cái hộp, câu hỏi, vấn đề...) từ 1 đến 10. Từ 11 trở lên dùng số đếm thường hoặc 個 (こ).',
    memoryTip: 'Âm thuần Nhật kết thúc bằng つ (trừ số 10 là とお). Đọc gần giống ngày mùng 1–10!',
    entries: [
      { value: '1 cái', kanji: '一つ', reading: 'ひとつ', romaji: 'hitotsu', special: true },
      { value: '2 cái', kanji: '二つ', reading: 'ふたつ', romaji: 'futatsu', special: true },
      { value: '3 cái', kanji: '三つ', reading: 'みっつ', romaji: 'mittsu', special: true },
      { value: '4 cái', kanji: '四つ', reading: 'よっつ', romaji: 'yottsu', special: true },
      { value: '5 cái', kanji: '五つ', reading: 'いつつ', romaji: 'itsutsu', special: true },
      { value: '6 cái', kanji: '六つ', reading: 'むっつ', romaji: 'muttsu', special: true },
      { value: '7 cái', kanji: '七つ', reading: 'ななつ', romaji: 'nanatsu', special: true },
      { value: '8 cái', kanji: '八つ', reading: 'やっつ', romaji: 'yattsu', special: true },
      { value: '9 cái', kanji: '九つ', reading: 'ここのつ', romaji: 'kokonotsu', special: true },
      { value: '10 cái', kanji: '十', reading: 'とお', romaji: 'tō', special: true, note: 'Không có つ ở cuối!' },
    ],
  },
  {
    id: 'counters-flat-machines',
    title: 'Vật mỏng (枚), Máy móc/Xe (台), Cuốn sách (冊)',
    kanjiBadge: '枚・台・冊',
    questionWord: '何枚・何台・何冊',
    questionReading: 'なんまい・なんだい・なんさつ',
    questionMeaning: 'Mấy tờ/chiếc/cuốn?',
    ruleSummary:
      '枚 (まい): giấy, vé, áo, đĩa. 台 (だい): ô tô, xe đạp, TV, máy tính. 冊 (さつ): sách, vở, tạp chí.',
    memoryTip: '枚 và 台 KHÔNG có biến âm nào cả! Riêng 冊 (さつ) có âm ngắt ở 1 (いっさつ), 8 (はっさつ), 10 (じゅっさつ).',
    entries: [
      { value: '1 tờ/chiếc áo', kanji: '1枚', reading: 'いちまい', romaji: 'ichimai' },
      { value: '4 tờ/vé', kanji: '4枚', reading: 'よんまい', romaji: 'yonmai' },
      { value: '1 chiếc xe/máy', kanji: '1台', reading: 'いちだい', romaji: 'ichidai' },
      { value: '4 chiếc xe', kanji: '4台', reading: 'よんだい', romaji: 'yondai' },
      { value: '1 cuốn sách', kanji: '1冊', reading: 'いっさつ', romaji: 'issatsu', special: true, note: 'Âm ngắt っ' },
      { value: '3 cuốn sách', kanji: '3冊', reading: 'さんさつ', romaji: 'sansatsu' },
      { value: '8 cuốn sách', kanji: '8冊', reading: 'はっさつ', romaji: 'hassatsu', special: true, note: 'Âm ngắt っ' },
      { value: '10 cuốn sách', kanji: '10冊', reading: 'じゅっさつ', romaji: 'jussatsu', special: true, note: 'Âm ngắt っ' },
    ],
  },
  {
    id: 'counters-long-animals-cups',
    title: 'Vật dài (本), Con vật (匹), Ly/Cốc (杯)',
    kanjiBadge: '本・匹・杯',
    questionWord: '何本・何匹・何杯',
    questionReading: 'なんぼん・なんびき・なんばい',
    questionMeaning: 'Mấy cây/con/ly?',
    ruleSummary:
      'Cả 3 lượng từ này đều bắt đầu bằng hàng H (ほ・ひ・は) nên tuân theo CÙNG 1 QUY TẮC biến âm!',
    memoryTip:
      'Quy tắc VÀNG cho hàng H: Số 3 & Hỏi (何) → B (ぼん/びき/ばい). Số 1, 6, 8, 10 → っ + P (いっぽん, ろっぽん, はっぽん, じゅっぽん)!',
    entries: [
      { value: '1 cây (bút/ô/chai)', kanji: '1本', reading: 'いっぽん', romaji: 'ippon', special: true, note: '1 → っ + ぽん' },
      { value: '2 cây', kanji: '2本', reading: 'にほん', romaji: 'nihon' },
      { value: '3 cây', kanji: '3本', reading: 'さんぼん', romaji: 'sanbon', special: true, note: '3 → ぼん' },
      { value: '6 cây', kanji: '6本', reading: 'ろっぽん', romaji: 'roppon', special: true, note: '6 → っ + ぽん' },
      { value: '8 cây', kanji: '8本', reading: 'はっぽん', romaji: 'happon', special: true, note: '8 → っ + ぽん' },
      { value: '10 cây', kanji: '10本', reading: 'じゅっぽん', romaji: 'juppon', special: true, note: '10 → っ + ぽん' },
      { value: '1 con (mèo/chó/cá)', kanji: '1匹', reading: 'いっぴき', romaji: 'ippiki', special: true, note: '1 → っ + ぴき' },
      { value: '3 con', kanji: '3匹', reading: 'さんびき', romaji: 'sanbiki', special: true, note: '3 → びき' },
      { value: '6 con', kanji: '6匹', reading: 'ろっぴき', romaji: 'roppiki', special: true, note: '6 → っ + ぴき' },
      { value: '1 ly/cốc', kanji: '1杯', reading: 'いっぱい', romaji: 'ippai', special: true, note: '1 → っ + ぱい' },
      { value: '3 ly/cốc', kanji: '3杯', reading: 'さんばい', romaji: 'sanbai', special: true, note: '3 → ばい' },
      { value: '10 ly/cốc', kanji: '10杯', reading: 'じゅっぱい', romaji: 'juppai', special: true, note: '10 → っ + ぱい' },
    ],
  },
  {
    id: 'floors-times',
    title: 'Đếm tầng lầu (階) & Số lần (回)',
    kanjiBadge: '階・回',
    questionWord: '何階・何回',
    questionReading: 'なんがい・なんかい',
    questionMeaning: 'Tầng mấy? Mấy lần?',
    ruleSummary:
      'Đều đọc là かい, nhưng Tầng 3 (3階) và Hỏi tầng (何階) biến âm thành がい; còn Số lần (3回, 何回) giữ nguyên かい.',
    memoryTip: 'Nhớ 1, 6, 8, 10 có âm ngắt っ (いっかい, ろっかい, はっかい, じゅっかい). Riêng Tầng 3 = さんがい!',
    entries: [
      { value: 'Tầng 1', kanji: '1階', reading: 'いっかい', romaji: 'ikkai', special: true, note: 'Âm ngắt っ' },
      { value: 'Tầng 2', kanji: '2階', reading: 'にかい', romaji: 'nikai' },
      { value: 'Tầng 3', kanji: '3階', reading: 'さんがい', romaji: 'sangai', special: true, note: 'Biến âm: かい → がい' },
      { value: 'Tầng 4', kanji: '4階', reading: 'よんかい', romaji: 'yonkai' },
      { value: 'Tầng 6', kanji: '6階', reading: 'ろっかい', romaji: 'rokkai', special: true, note: 'Âm ngắt っ' },
      { value: 'Tầng 8', kanji: '8階', reading: 'はっかい', romaji: 'hakkai', special: true, note: 'Âm ngắt っ' },
      { value: 'Tầng mấy?', kanji: '何階', reading: 'なんがい', romaji: 'nangai', special: true, note: 'Biến âm: がい' },
      { value: '1 lần', kanji: '1回', reading: 'いっかい', romaji: 'ikkai', special: true, note: 'Âm ngắt っ' },
      { value: '3 lần', kanji: '3回', reading: 'さんかい', romaji: 'sankai', note: 'Số lần KHÔNG đổi thành がい' },
      { value: '6 lần', kanji: '6回', reading: 'ろっかい', romaji: 'rokkai', special: true, note: 'Âm ngắt っ' },
      { value: '10 lần', kanji: '10回', reading: 'じゅっかい', romaji: 'jukkai', special: true, note: 'Âm ngắt っ' },
    ],
  },
];

export const COUNTER_QUIZZES: CounterQuiz[] = [
  {
    id: 'q1',
    category: 'Tuổi tác',
    prompt: '「20歳」 (20 tuổi) đọc như thế nào cho đúng?',
    highlight: '20歳',
    options: ['にじゅっさい', 'はたち', 'はつか', 'にじゅうさい'],
    answerIndex: 1,
    explanation: '20 tuổi là trường hợp CỰC ĐẶC BIỆT đọc là「はたち」. (Đừng nhầm với ngày 20 là「はつか」nhé!).',
  },
  {
    id: 'q2',
    category: 'Ngày tháng',
    prompt: '「14日」 (Ngày 14) đọc đúng là gì?',
    highlight: '14日',
    options: ['じゅうよんにち', 'じゅうしにち', 'じゅうよっか', 'じゅうようか'],
    answerIndex: 2,
    explanation: 'Ngày 14 và ngày 24 vẫn giữ cách đọc đặc biệt của số 4 là「よっか」→「じゅうよっか」.',
  },
  {
    id: 'q3',
    category: 'Ngày tháng',
    prompt: 'Phân biệt「4日」và「8日」: Cách đọc đúng lần lượt là gì?',
    highlight: '4日 / 8日',
    options: [
      'よっか / ようか',
      'ようか / よっか',
      'よんにち / はちにち',
      'いつか / むいか',
    ],
    answerIndex: 0,
    explanation: 'Mùng 4 đọc ngắn có âm ngắt「よっか」(yokka). Mùng 8 đọc kéo dài「ようか」(yōka).',
  },
  {
    id: 'q4',
    category: 'Đếm người',
    prompt: 'Khi nói "Có 2 người bạn" (友達が 2人 います),「2人」đọc là gì?',
    highlight: '2人',
    options: ['ににん', 'ふたつ', 'ふたり', 'ふつか'],
    answerIndex: 2,
    explanation: 'Đếm người: 1 người =「ひとり」, 2 người =「ふたり」. (ふたつ là 2 cái, ふつか là mùng 2).',
  },
  {
    id: 'q5',
    category: 'Đếm tầng',
    prompt: 'Hỏi "Quầy giày ở tầng mấy?" dùng「何階」— đọc thế nào?',
    highlight: '何階',
    options: ['なんかい', 'なんがい', 'なにかい', 'どれかい'],
    answerIndex: 1,
    explanation: 'Đếm tầng: 3階 (さんがい) và 何階 (なんがい) biến âm thành「がい」.',
  },
  {
    id: 'q6',
    category: 'Số lần vs Tầng',
    prompt: '「3回」 (3 lần) đọc là gì? Có biến âm giống「3階」không?',
    highlight: '3回',
    options: ['さんがい', 'さんかい', 'さっかい', 'さんばい'],
    answerIndex: 1,
    explanation: 'Chỉ đếm tầng「3階」mới đọc「さんがい」. Còn số lần「3回」giữ nguyên là「さんかい」!',
  },
  {
    id: 'q7',
    category: 'Vật thon dài',
    prompt: 'Đếm 3 cái ô (傘 3本) đọc đúng là gì?',
    highlight: '3本',
    options: ['さんほん', 'さんぽん', 'さんぼん', 'みっつ'],
    answerIndex: 2,
    explanation: 'Theo quy tắc hàng H: số 3 đi với「本」đọc là「ぼん」→「さんぼん」.',
  },
  {
    id: 'q8',
    category: 'Giờ & Phút',
    prompt: '「4時 10分」 (4 giờ 10 phút) đọc đúng là gì?',
    highlight: '4時 10分',
    options: [
      'よんじ じゅうふん',
      'よじ じゅっぷん',
      'しじ じゅうぷん',
      'よじ じゅうふん',
    ],
    answerIndex: 1,
    explanation: '4 giờ đọc「よじ」(bỏ ん), 10 phút có âm ngắt「じゅっぷん」.',
  },
  {
    id: 'q9',
    category: 'Chọn lượng từ',
    prompt: 'Để đếm "2 chiếc áo sơ mi" hoặc "3 tờ vé", ta dùng lượng từ nào?',
    highlight: 'Áo sơ mi / Vé',
    options: ['本 (ほん)', '台 (だい)', '枚 (まい)', '冊 (さつ)'],
    answerIndex: 2,
    explanation: 'Đồ vật mỏng, phẳng như giấy, vé, đĩa, áo sơ mi đều dùng「枚 (まい)」.',
  },
  {
    id: 'q10',
    category: 'Chọn lượng từ',
    prompt: 'Để đếm "1 chiếc ô tô" hoặc "2 chiếc máy tính", ta dùng lượng từ nào?',
    highlight: 'Ô tô / Máy tính',
    options: ['台 (だい)', '匹 (ひき)', '枚 (まい)', '本 (ほん)'],
    answerIndex: 0,
    explanation: 'Xe cộ và máy móc, thiết bị điện tử dùng「台 (だい)」.',
  },
  {
    id: 'q11',
    category: 'Số đếm lớn',
    prompt: '「600円」 (600 yên) đọc như thế nào?',
    highlight: '600円',
    options: ['ろくひゃくえん', 'ろっぴゃくえん', 'ろくびゃくえん', 'ろっぽんえん'],
    answerIndex: 1,
    explanation: '600 là mốc biến âm đặc biệt:「ろっぴゃく」→「ろっぴゃくえん」.',
  },
  {
    id: 'q12',
    category: 'Tháng',
    prompt: 'Bộ 3 tháng đặc biệt (Tháng 4, Tháng 7, Tháng 9) đọc lần lượt là gì?',
    highlight: '4月・7月・9月',
    options: [
      'よんがつ・なながつ・きゅうがつ',
      'しがつ・しちがつ・くがつ',
      'よがつ・なながつ・くがつ',
      'しがつ・なながつ・きゅうがつ',
    ],
    answerIndex: 1,
    explanation: 'Tháng 4 (しがつ), Tháng 7 (しちがつ), Tháng 9 (くがつ) là 3 tháng bắt buộc thuộc lòng.',
  },
];

