export interface TopicInfo {
  slug: string;
  title: string;
  description: string;
  lessonIds: string[];
  accent: string;
}

export const n5Topics: TopicInfo[] = [
  {
    slug: 'gioi-thieu-thoi-gian',
    title: 'Giới thiệu, Quốc gia & Thời gian',
    description: 'Chào hỏi, nghề nghiệp, quốc tịch, giờ giấc và giá tiền cơ bản.',
    lessonIds: ['1A', '1B', '1C'],
    accent: 'emerald',
  },
  {
    slug: 'do-vat-ngay-thang',
    title: 'Đồ vật, Ngày tháng & Sở hữu',
    description: 'Ngày mùng 1–31, thời tiết cơ bản, đồ dùng cá nhân và sở hữu (の).',
    lessonIds: ['2A', '2B', '2C'],
    accent: 'amber',
  },
  {
    slug: 'dia-diem-tinh-chat',
    title: 'Địa điểm, Tính từ & So sánh',
    description: 'Tính từ đuôi い / な, miêu tả cửa hàng, thành phố và so sánh hơn/nhất.',
    lessonIds: ['3A', '3B', '3C', '3D'],
    accent: 'sky',
  },
  {
    slug: 'con-nguoi-hoi-thoai',
    title: 'Con người & Hội thoại thân mật',
    description: 'Tính cách, ngoại hình, trường học và cách nói thể thường.',
    lessonIds: ['4A', '4B'],
    accent: 'rose',
  },
  {
    slug: 'vi-tri-so-dem',
    title: 'Vị trí, Tồn tại & Số đếm',
    description: 'Trên/dưới/trong/ngoài, động từ tồn tại あります・います và đếm người/vật/tuổi.',
    lessonIds: ['5A', '5B', '5C'],
    accent: 'indigo',
  },
  {
    slug: 'sinh-hoat-di-chuyen',
    title: 'Sinh hoạt, Di chuyển & Ăn uống',
    description: 'Động từ thường ngày, đi/đến/về, đồ ăn thức uống và mốc thời gian.',
    lessonIds: ['6A', '6B', '6C'],
    accent: 'teal',
  },
  {
    slug: 'ky-nghi-mong-muon',
    title: 'Kỳ nghỉ, Mong muốn & Giải trí',
    description: 'Thể たい, ほしい, rủ rê và kế hoạch cuối tuần/kỳ nghỉ.',
    lessonIds: ['7A', '7B', '7C', '7D'],
    accent: 'orange',
  },
  {
    slug: 'phuong-tien-gia-dinh',
    title: 'Phương tiện, Sở thích & Gia đình',
    description: 'Tàu xe, nhạc cụ, màu sắc, sở trường và các thành viên gia đình.',
    lessonIds: ['8A', '8B', '8C'],
    accent: 'cyan',
  },
  {
    slug: 'kha-nang-kinh-nghiem',
    title: 'Khả năng, Thói quen & Kinh nghiệm',
    description: 'Thể từ điển, ない, た, khả năng, 前に/後で và đã từng (たことがある).',
    lessonIds: ['9A', '9B', '9C', '10A', '10B'],
    accent: 'violet',
  },
  {
    slug: 'dieu-kien-quy-dinh',
    title: 'Điều kiện & Quy định',
    description: 'Thể ば, phải làm (なければなりません) và lời khuyên.',
    lessonIds: ['11A', '11B'],
    accent: 'fuchsia',
  },
  {
    slug: 'the-te-cho-nhan',
    title: 'Thể て, Xin phép & Cho nhận',
    description: 'Đang diễn ra (ている), xin phép, nhờ vả, あげる・くれる và điều kiện なら.',
    lessonIds: ['12A', '12B', '12C', '13A', '13B', '13C', '14A', '14B', '14C'],
    accent: 'lime',
  },
];

export function getTopicForLesson(lessonId: string): TopicInfo | undefined {
  return n5Topics.find((t) => t.lessonIds.includes(lessonId));
}

