// Translation dictionary for Bua Luang Thai Spa
// Languages: sr (default), en, ru, zh

export const LANGUAGES = [
  { code: "sr", label: "SR", name: "Srpski", flag: "🇷🇸", iso: "rs" },
  { code: "en", label: "EN", name: "English", flag: "🇬🇧", iso: "gb" },
  { code: "ru", label: "RU", name: "Русский", flag: "🇷🇺", iso: "ru" },
  { code: "zh", label: "ZH", name: "中文", flag: "🇨🇳", iso: "cn" },
  { code: "th", label: "TH", name: "ไทย", flag: "🇹🇭", iso: "th" },
];

const SR_PRICING = {
  eyebrow: "Cenovnik",
  title: "Izaberite ritual koji vam odgovara",
  subtitle: "Cene su orijentacione i biće potvrđene prilikom rezervacije.",
  currency: "RSD",
  note: "* Sve cene podležu promenama. Trajanja u minutama.",
  showDescription: "Pogledaj opis",
  hideDescription: "Sakrij opis",
  selectLabel: "Izaberi",
  selectedLabel: "Izabrano",
  selectedTemplate: "Odabrano: {name} — {duration} MIN — {price} RSD",
  rows: [
    {
      name: "Tradicionalna Tajlandska Masaža",
      subname: "Thai Traditional",
      options: [
        { duration: 60, price: 4500 },
        { duration: 90, price: 5500 },
      ],
      description:
        "Autentični tretman bez ulja koji kombinuje akupresuru i pasivno istezanje za oslobađanje od stresa i povećanje fleksibilnosti celog tela.",
    },
    {
      name: "Aroma Masaža",
      subname: "Aroma Massage",
      options: [
        { duration: 60, price: 4300 },
        { duration: 90, price: 5300 },
      ],
      description:
        "Opuštajuća masaža toplim prirodnim uljima i blagim pokretima koja hidrira kožu, smiruje um i dubinski regeneriše nervni sistem.",
    },
    {
      name: "Masaža sa Toplim Tajlandskim Biljnim Kompresama",
      subname: "Thai Herbal Hot Compress",
      options: [
        { duration: 90, price: 5900 },
        { duration: 120, price: 6900 },
      ],
      description:
        "Terapijski tretman toplim zavežljajima lekovitog tajlandskog bilja koji ublažava hronični bol, ukočenost i poboljšava cirkulaciju.",
    },
    {
      name: "Masaža Vrata, Glave i Ramena",
      subname: "Neck, Head and Shoulders",
      options: [
        { duration: 30, price: 2500 },
        { duration: 45, price: 3000 },
        { duration: 60, price: 3500 },
      ],
      description:
        "Ciljani tretman usmeren na gornji deo tela, idealan za brzo oslobađanje od napetosti uzrokovane dugim sedenjem i stresom.",
    },
    {
      name: "Deep Tissue Masaža",
      subname: "Deep Tissue Massage",
      options: [
        { duration: 60, price: 4500 },
        { duration: 90, price: 5500 },
      ],
      description:
        "Intenzivna masaža snažnijeg pritiska koja prodire u duboke slojeve mišića, otklanja hronične čvorove i ubrzava oporavak.",
    },
    {
      name: "Masaža Stopala",
      subname: "Foot Massage",
      options: [
        { duration: 30, price: 2500 },
        { duration: 45, price: 3000 },
        { duration: 60, price: 3500 },
      ],
      description:
        "Refleksološki tretman stopala koji stimuliše ključne tačke, uklanja osećaj teških nogu i balansira energiju čitavog organizma.",
    },
  ],
};

const EN_PRICING = {
  eyebrow: "Pricing",
  title: "Choose the ritual that suits you",
  subtitle: "Prices are indicative and will be confirmed at booking.",
  currency: "RSD",
  note: "* All prices are subject to change. Durations in minutes.",
  showDescription: "View description",
  hideDescription: "Hide description",
  selectLabel: "Select",
  selectedLabel: "Selected",
  selectedTemplate: "Selected: {name} — {duration} MIN — {price} RSD",
  rows: [
    {
      name: "Traditional Thai Massage",
      subname: "Thai Traditional",
      options: [
        { duration: 60, price: 4500 },
        { duration: 90, price: 5500 },
      ],
      description:
        "An authentic oil-free treatment that combines acupressure and passive stretching to release stress and boost full-body flexibility.",
    },
    {
      name: "Aroma Massage",
      subname: "Aroma Massage",
      options: [
        { duration: 60, price: 4300 },
        { duration: 90, price: 5300 },
      ],
      description:
        "A relaxing massage with warm natural oils and gentle strokes that hydrates the skin, calms the mind and deeply regenerates the nervous system.",
    },
    {
      name: "Massage with Warm Thai Herbal Compresses",
      subname: "Thai Herbal Hot Compress",
      options: [
        { duration: 90, price: 5900 },
        { duration: 120, price: 6900 },
      ],
      description:
        "A therapeutic treatment with warm pouches of Thai medicinal herbs that eases chronic pain, stiffness and improves circulation.",
    },
    {
      name: "Neck, Head and Shoulders Massage",
      subname: "Neck, Head and Shoulders",
      options: [
        { duration: 30, price: 2500 },
        { duration: 45, price: 3000 },
        { duration: 60, price: 3500 },
      ],
      description:
        "A targeted treatment for the upper body — perfect for quickly releasing tension caused by long hours of sitting and stress.",
    },
    {
      name: "Deep Tissue Massage",
      subname: "Deep Tissue Massage",
      options: [
        { duration: 60, price: 4500 },
        { duration: 90, price: 5500 },
      ],
      description:
        "An intense, firm-pressure massage that reaches deep muscle layers, releases chronic knots and accelerates recovery.",
    },
    {
      name: "Foot Massage",
      subname: "Foot Massage",
      options: [
        { duration: 30, price: 2500 },
        { duration: 45, price: 3000 },
        { duration: 60, price: 3500 },
      ],
      description:
        "A reflexology foot treatment that stimulates key points, relieves heavy-legs sensation and balances the energy of the whole body.",
    },
  ],
};

const RU_PRICING = {
  eyebrow: "Цены",
  title: "Выберите подходящий ритуал",
  subtitle: "Цены ориентировочные и подтверждаются при бронировании.",
  currency: "RSD",
  note: "* Все цены могут изменяться. Длительность указана в минутах.",
  showDescription: "Описание",
  hideDescription: "Скрыть",
  selectLabel: "Выбрать",
  selectedLabel: "Выбрано",
  selectedTemplate: "Выбрано: {name} — {duration} мин — {price} RSD",
  rows: [
    {
      name: "Традиционный тайский массаж",
      subname: "Thai Traditional",
      options: [
        { duration: 60, price: 4500 },
        { duration: 90, price: 5500 },
      ],
      description:
        "Аутентичная процедура без масел, сочетающая акупрессуру и пассивную растяжку — снимает стресс и повышает гибкость всего тела.",
    },
    {
      name: "Аромамасляный массаж",
      subname: "Aroma Massage",
      options: [
        { duration: 60, price: 4300 },
        { duration: 90, price: 5300 },
      ],
      description:
        "Расслабляющий массаж с тёплыми натуральными маслами и мягкими движениями — увлажняет кожу, успокаивает ум и восстанавливает нервную систему.",
    },
    {
      name: "Массаж с тёплыми тайскими травяными мешочками",
      subname: "Thai Herbal Hot Compress",
      options: [
        { duration: 90, price: 5900 },
        { duration: 120, price: 6900 },
      ],
      description:
        "Терапевтическая процедура с тёплыми мешочками с тайскими лекарственными травами — снимает хроническую боль и улучшает кровообращение.",
    },
    {
      name: "Массаж шеи, головы и плеч",
      subname: "Neck, Head and Shoulders",
      options: [
        { duration: 30, price: 2500 },
        { duration: 45, price: 3000 },
        { duration: 60, price: 3500 },
      ],
      description:
        "Целенаправленная процедура для верхней части тела — быстро снимает напряжение от долгого сидения и стресса.",
    },
    {
      name: "Глубокий массаж",
      subname: "Deep Tissue Massage",
      options: [
        { duration: 60, price: 4500 },
        { duration: 90, price: 5500 },
      ],
      description:
        "Интенсивный массаж с сильным давлением, прорабатывающий глубокие слои мышц — устраняет хронические узлы и ускоряет восстановление.",
    },
    {
      name: "Массаж стоп",
      subname: "Foot Massage",
      options: [
        { duration: 30, price: 2500 },
        { duration: 45, price: 3000 },
        { duration: 60, price: 3500 },
      ],
      description:
        "Рефлексотерапия стоп: стимулирует ключевые точки, убирает ощущение тяжёлых ног и гармонизирует энергию всего организма.",
    },
  ],
};

const ZH_PRICING = {
  eyebrow: "价目表",
  title: "选择属于您的仪式",
  subtitle: "价格仅供参考，预订时确认。",
  currency: "RSD",
  note: "* 价格可能调整。时长以分钟计。",
  showDescription: "查看说明",
  hideDescription: "收起",
  selectLabel: "选择",
  selectedLabel: "已选择",
  selectedTemplate: "已选择：{name} — {duration} 分钟 — {price} RSD",
  rows: [
    {
      name: "传统泰式按摩",
      subname: "Thai Traditional",
      options: [
        { duration: 60, price: 4500 },
        { duration: 90, price: 5500 },
      ],
      description: "正宗无油疗程，结合穴位按压与被动伸展，舒缓压力并提升全身柔韧度。",
    },
    {
      name: "芳香精油按摩",
      subname: "Aroma Massage",
      options: [
        { duration: 60, price: 4300 },
        { duration: 90, price: 5300 },
      ],
      description: "温暖的天然精油配合轻柔手法，滋润肌肤，安抚心神，深层修复神经系统。",
    },
    {
      name: "泰式热草药包按摩",
      subname: "Thai Herbal Hot Compress",
      options: [
        { duration: 90, price: 5900 },
        { duration: 120, price: 6900 },
      ],
      description: "温热的泰式药草包敷于身体，缓解慢性疼痛和僵硬，并促进血液循环。",
    },
    {
      name: "颈、头、肩按摩",
      subname: "Neck, Head and Shoulders",
      options: [
        { duration: 30, price: 2500 },
        { duration: 45, price: 3000 },
        { duration: 60, price: 3500 },
      ],
      description: "针对上半身的疗程，能快速释放久坐和压力带来的紧张感。",
    },
    {
      name: "深层组织按摩",
      subname: "Deep Tissue Massage",
      options: [
        { duration: 60, price: 4500 },
        { duration: 90, price: 5500 },
      ],
      description: "强力深层按摩，作用于深层肌肉组织，化解慢性结节并加快恢复。",
    },
    {
      name: "足部按摩",
      subname: "Foot Massage",
      options: [
        { duration: 30, price: 2500 },
        { duration: 45, price: 3000 },
        { duration: 60, price: 3500 },
      ],
      description: "足部反射疗法，刺激关键反射点，缓解双腿沉重感，平衡全身能量。",
    },
  ],
};

const TH_PRICING = {
  eyebrow: "ราคา",
  title: "เลือกพิธีกรรมที่เหมาะกับคุณ",
  subtitle: "ราคาเป็นข้อมูลอ้างอิงและจะได้รับการยืนยันเมื่อจอง",
  currency: "RSD",
  note: "* ราคาทั้งหมดอาจเปลี่ยนแปลงได้ ระยะเวลาเป็นนาที",
  showDescription: "ดูรายละเอียด",
  hideDescription: "ซ่อน",
  selectLabel: "เลือก",
  selectedLabel: "เลือกแล้ว",
  selectedTemplate: "เลือกแล้ว: {name} — {duration} นาที — {price} RSD",
  rows: [
    {
      name: "นวดแผนไทยดั้งเดิม",
      subname: "Thai Traditional",
      options: [
        { duration: 60, price: 4500 },
        { duration: 90, price: 5500 },
      ],
      description:
        "การรักษาแบบดั้งเดิมโดยไม่ใช้น้ำมัน ผสมผสานการกดจุดและการยืดเหยียดแบบพาสซีฟ เพื่อคลายความเครียดและเพิ่มความยืดหยุ่นของร่างกาย",
    },
    {
      name: "นวดอโรมา",
      subname: "Aroma Massage",
      options: [
        { duration: 60, price: 4300 },
        { duration: 90, price: 5300 },
      ],
      description:
        "นวดผ่อนคลายด้วยน้ำมันธรรมชาติอุ่นและสัมผัสที่นุ่มนวล ช่วยให้ผิวชุ่มชื้น สงบจิตใจ และฟื้นฟูระบบประสาทอย่างล้ำลึก",
    },
    {
      name: "นวดประคบสมุนไพรไทย",
      subname: "Thai Herbal Hot Compress",
      options: [
        { duration: 90, price: 5900 },
        { duration: 120, price: 6900 },
      ],
      description:
        "การรักษาด้วยลูกประคบสมุนไพรไทยอุ่น ช่วยบรรเทาอาการปวดเรื้อรัง ความตึง และปรับการไหลเวียนเลือดให้ดีขึ้น",
    },
    {
      name: "นวดคอ บ่า และไหล่",
      subname: "Neck, Head and Shoulders",
      options: [
        { duration: 30, price: 2500 },
        { duration: 45, price: 3000 },
        { duration: 60, price: 3500 },
      ],
      description:
        "การรักษาแบบเจาะจงสำหรับส่วนบนของร่างกาย เหมาะสำหรับการคลายความตึงเครียดจากการนั่งนานและความเครียด",
    },
    {
      name: "นวดเนื้อเยื่อชั้นลึก",
      subname: "Deep Tissue Massage",
      options: [
        { duration: 60, price: 4500 },
        { duration: 90, price: 5500 },
      ],
      description:
        "นวดแรงและลึกถึงชั้นกล้ามเนื้อ ช่วยคลายปมเรื้อรังและเร่งการฟื้นตัว",
    },
    {
      name: "นวดเท้า",
      subname: "Foot Massage",
      options: [
        { duration: 30, price: 2500 },
        { duration: 45, price: 3000 },
        { duration: 60, price: 3500 },
      ],
      description:
        "การนวดเท้าแบบสะท้อนกลับที่กระตุ้นจุดสำคัญ ลดอาการขาหนัก และปรับสมดุลพลังงานของร่างกาย",
    },
  ],
};

export const translations = {
  sr: {
    nav: {
      home: "Početna",
      about: "O nama",
      pricing: "Cenovnik",
      contact: "Kontakt",
      book: "Rezerviši",
    },
    hero: {
      eyebrow: "Autentična tajlandska tradicija",
      title: "Bua Luang Thai Spa",
      subtitle:
        "Putovanje ka unutrašnjem miru — masaže koje neguju telo, smiruju um i bude duh.",
      cta: "Zakažite tretman",
      ctaSecondary: "Pogledajte cenovnik",
    },
    about: {
      eyebrow: "O nama",
      title: "BUA LUANG THAI SPA",
      paragraphs: [
        "Tajlandska masaža Beograd – Dobrodošli u prostor posvećen vašem telu, vašem miru i vašem balansu.",
        "Naš salon u srcu Beograda nudi autentičnu tajlandsku masažu koju s ljubavlju i znanjem izvode terapeutkinje sa samog izvora tajlandske tradicije. Njihovo višegodišnje iskustvo i posvećenost donose vam tretmane koji nisu samo relaksacija, već duboka nega tela i duha.",
        "Svaka masaža prilagođena je vama – vašoj energiji, stepenu napetosti i potrebama tela. Kombinacijom pažljivog pritiska, pasivnog istezanja i prirodnih ulja, tretman deluje na vašu fleksibilnost, cirkulaciju i unutrašnji mir. Cilj je jednostavan: da izađete lakši, smireniji i povezani sa sobom.",
        "Ako tražite tajlandsku masažu u Beogradu koja je više od opuštanja, došli ste na pravo mesto.",
      ],
    },
    pricing: SR_PRICING,
    contact: {
      eyebrow: "Kontakt",
      title: "Zakažite svoj trenutak tišine",
      subtitle:
        "Pišite nam ili nas pozovite — odgovaramo brzo i radujemo se vašoj poseti.",
      form: {
        name: "Vaše ime",
        email: "Email adresa",
        phone: "Telefon (opciono)",
        message: "Poruka",
        submit: "Pošalji poruku",
        callUs: "Pozovite nas",
        sending: "Slanje...",
        success: "Hvala! Poslali smo vam potvrdu na email.",
        error: "Došlo je do greške. Pokušajte ponovo.",
      },
      info: {
        emailLabel: "Email",
        phoneLabel: "Telefon",
        hoursLabel: "Radno vreme",
        hoursValue: "Pon — Ned: 10:00 — 22:00",
        addressLabel: "Lokacija",
        addressValue:
          "Uskoro na novoj lokaciji u Beogradu (Adresa će biti naknadno dodata)",
      },
    },
    footer: {
      tagline: "Autentična tajlandska tradicija u srcu Beograda.",
      rights: "Sva prava zadržana.",
      quickLinks: "Brzi linkovi",
      followUs: "Pratite nas",
    },
    chat: {
      title: "Kontaktirajte nas",
      subtitle: "Brzi odgovor preko poruka",
      whatsapp: "Kontaktirajte nas preko WhatsApp-a",
      viber: "Kontaktirajte nas preko Viber-a",
    },
  },

  en: {
    nav: {
      home: "Home",
      about: "About",
      pricing: "Pricing",
      contact: "Contact",
      book: "Book Now",
    },
    hero: {
      eyebrow: "Authentic Thai tradition",
      title: "Bua Luang Thai Spa",
      subtitle:
        "A journey to inner stillness — treatments that nurture the body, calm the mind, and awaken the spirit.",
      cta: "Book a Treatment",
      ctaSecondary: "View Pricing",
    },
    about: {
      eyebrow: "About us",
      title: "BUA LUANG THAI SPA",
      paragraphs: [
        "Thai Massage Belgrade — Welcome to a space devoted to your body, your peace, and your balance.",
        "Our salon in the heart of Belgrade offers authentic Thai massage performed with love and knowledge by therapists trained at the very source of Thai tradition. Their many years of experience and dedication bring you treatments that are not just relaxation, but deep care for body and spirit.",
        "Every massage is tailored to you — to your energy, your level of tension, and the needs of your body. Through a combination of careful pressure, passive stretching, and natural oils, the treatment supports your flexibility, circulation, and inner peace. The goal is simple: that you leave lighter, calmer, and reconnected with yourself.",
        "If you are looking for a Thai massage in Belgrade that is more than relaxation, you have come to the right place.",
      ],
    },
    pricing: EN_PRICING,
    contact: {
      eyebrow: "Contact",
      title: "Reserve your moment of stillness",
      subtitle:
        "Write to us or call — we reply quickly and look forward to welcoming you.",
      form: {
        name: "Your name",
        email: "Email address",
        phone: "Phone (optional)",
        message: "Message",
        submit: "Send message",
        callUs: "Call us",
        sending: "Sending...",
        success: "Thank you! We've sent a confirmation to your email.",
        error: "Something went wrong. Please try again.",
      },
      info: {
        emailLabel: "Email",
        phoneLabel: "Phone",
        hoursLabel: "Working hours",
        hoursValue: "Mon — Sun: 10:00 — 22:00",
        addressLabel: "Location",
        addressValue:
          "Coming soon at a new location in Belgrade (address to be added)",
      },
    },
    footer: {
      tagline: "Authentic Thai tradition in the heart of Belgrade.",
      rights: "All rights reserved.",
      quickLinks: "Quick links",
      followUs: "Follow us",
    },
    chat: {
      title: "Contact us",
      subtitle: "Quick reply via messaging",
      whatsapp: "Contact us on WhatsApp",
      viber: "Contact us on Viber",
    },
  },

  ru: {
    nav: {
      home: "Главная",
      about: "О нас",
      pricing: "Прайс-лист",
      contact: "Контакты",
      book: "Записаться",
    },
    hero: {
      eyebrow: "Подлинная тайская традиция",
      title: "Bua Luang Thai Spa",
      subtitle:
        "Путешествие к внутренней тишине — процедуры, которые питают тело, успокаивают ум и пробуждают дух.",
      cta: "Записаться",
      ctaSecondary: "Прайс-лист",
    },
    about: {
      eyebrow: "О нас",
      title: "BUA LUANG THAI SPA",
      paragraphs: [
        "Тайский массаж в Белграде — Добро пожаловать в пространство, посвящённое вашему телу, вашему покою и вашему балансу.",
        "Наш салон в сердце Белграда предлагает аутентичный тайский массаж, который с любовью и знанием выполняют терапевты, обученные у самых истоков тайской традиции. Их многолетний опыт и преданность дарят вам процедуры, которые являются не только релаксацией, но и глубокой заботой о теле и духе.",
        "Каждый массаж адаптирован к вам — вашей энергии, степени напряжения и потребностям вашего тела. Сочетание мягкого давления, пассивной растяжки и натуральных масел поддерживает гибкость, кровообращение и внутренний покой. Цель проста: вы уходите лёгкими, спокойными и в гармонии с собой.",
        "Если вы ищете тайский массаж в Белграде, который больше чем просто расслабление — вы пришли в нужное место.",
      ],
    },
    pricing: RU_PRICING,
    contact: {
      eyebrow: "Контакты",
      title: "Забронируйте свой миг тишины",
      subtitle:
        "Напишите или позвоните нам — мы быстро отвечаем и будем рады встрече.",
      form: {
        name: "Ваше имя",
        email: "Email",
        phone: "Телефон (не обяз.)",
        message: "Сообщение",
        submit: "Отправить",
        callUs: "Позвоните нам",
        sending: "Отправка...",
        success: "Спасибо! Мы отправили подтверждение на ваш email.",
        error: "Произошла ошибка. Попробуйте ещё раз.",
      },
      info: {
        emailLabel: "Email",
        phoneLabel: "Телефон",
        hoursLabel: "Часы работы",
        hoursValue: "Пн — Вс: 10:00 — 22:00",
        addressLabel: "Локация",
        addressValue:
          "Скоро на новой локации в Белграде (адрес будет добавлен позже)",
      },
    },
    footer: {
      tagline: "Аутентичная тайская традиция в сердце Белграда.",
      rights: "Все права защищены.",
      quickLinks: "Навигация",
      followUs: "Подписывайтесь",
    },
    chat: {
      title: "Свяжитесь с нами",
      subtitle: "Быстрый ответ через мессенджер",
      whatsapp: "Связаться с нами в WhatsApp",
      viber: "Связаться с нами в Viber",
    },
  },

  zh: {
    nav: {
      home: "首页",
      about: "关于我们",
      pricing: "价目表",
      contact: "联系",
      book: "立即预约",
    },
    hero: {
      eyebrow: "正宗泰式传统",
      title: "Bua Luang Thai Spa",
      subtitle:
        "通往内心宁静的旅程 —— 滋养身体、平静心灵、唤醒精神的疗程。",
      cta: "预约疗程",
      ctaSecondary: "查看价目",
    },
    about: {
      eyebrow: "关于我们",
      title: "BUA LUANG THAI SPA",
      paragraphs: [
        "贝尔格莱德泰式按摩 —— 欢迎来到一个专为您的身体、安宁与平衡而设的空间。",
        "我们坐落于贝尔格莱德中心的沙龙提供正宗的泰式按摩，由在泰国传统源头接受训练的治疗师以爱与专业悉心施行。她们多年的经验与奉献，为您带来的不仅是放松，更是身心的深层照护。",
        "每一次按摩都为您量身定制 —— 依据您的能量、紧张程度和身体所需。结合细致的按压、被动伸展与天然精油，这一疗程能促进您的柔韧度、循环与内在平静。我们的目标很简单：让您轻盈、安宁、与自我重新连接。",
        "如果您寻找的不只是放松，而是真正的泰式按摩体验，您来对地方了。",
      ],
    },
    pricing: ZH_PRICING,
    contact: {
      eyebrow: "联系",
      title: "预约您的宁静时刻",
      subtitle: "致电或来信 —— 我们回复迅速，期待您的莅临。",
      form: {
        name: "您的姓名",
        email: "电子邮箱",
        phone: "电话（选填）",
        message: "留言",
        submit: "发送",
        callUs: "致电我们",
        sending: "发送中...",
        success: "感谢！我们已将确认邮件发送至您的邮箱。",
        error: "发生错误，请重试。",
      },
      info: {
        emailLabel: "邮箱",
        phoneLabel: "电话",
        hoursLabel: "营业时间",
        hoursValue: "周一至周日：10:00 — 22:00",
        addressLabel: "位置",
        addressValue: "即将于贝尔格莱德新址开业（地址稍后公布）",
      },
    },
    footer: {
      tagline: "贝尔格莱德中心的正宗泰式传统。",
      rights: "版权所有。",
      quickLinks: "快速链接",
      followUs: "关注我们",
    },
    chat: {
      title: "联系我们",
      subtitle: "通过消息快速回复",
      whatsapp: "通过 WhatsApp 联系我们",
      viber: "通过 Viber 联系我们",
    },
  },

  th: {
    nav: {
      home: "หน้าแรก",
      about: "เกี่ยวกับเรา",
      pricing: "ราคา",
      contact: "ติดต่อ",
      book: "จองเลย",
    },
    hero: {
      eyebrow: "ประเพณีไทยแท้",
      title: "Bua Luang Thai Spa",
      subtitle:
        "การเดินทางสู่ความสงบภายใน — การนวดที่บำรุงร่างกาย สงบจิตใจ และปลุกจิตวิญญาณ",
      cta: "จองทรีตเมนต์",
      ctaSecondary: "ดูราคา",
    },
    about: {
      eyebrow: "เกี่ยวกับเรา",
      title: "BUA LUANG THAI SPA",
      paragraphs: [
        "นวดไทยที่กรุงเบลเกรด — ยินดีต้อนรับสู่พื้นที่ที่อุทิศให้กับร่างกาย ความสงบ และความสมดุลของคุณ",
        "ร้านของเราในใจกลางกรุงเบลเกรดมอบบริการนวดไทยแท้ ดูแลด้วยความรักและความรู้โดยนักบำบัดที่ได้รับการฝึกฝนจากต้นกำเนิดของประเพณีไทย ประสบการณ์และความทุ่มเทอันยาวนานของพวกเธอมอบทรีตเมนต์ที่ไม่ใช่แค่การผ่อนคลาย แต่เป็นการบำรุงร่างกายและจิตใจอย่างลึกซึ้ง",
        "การนวดทุกครั้งปรับให้เหมาะกับคุณ — ตามพลังงาน ระดับความตึงเครียด และความต้องการของร่างกาย ด้วยการผสมผสานระหว่างการกดอย่างพิถีพิถัน การยืดเหยียดแบบพาสซีฟ และน้ำมันธรรมชาติ ทรีตเมนต์นี้ช่วยเสริมความยืดหยุ่น การไหลเวียน และความสงบภายใน เป้าหมายเรียบง่าย: ให้คุณออกไปด้วยความเบาสบาย สงบ และเชื่อมโยงกับตัวเองอีกครั้ง",
        "หากคุณกำลังมองหาการนวดไทยในเบลเกรดที่มากกว่าการผ่อนคลาย คุณมาถูกที่แล้ว",
      ],
    },
    pricing: TH_PRICING,
    contact: {
      eyebrow: "ติดต่อ",
      title: "จองช่วงเวลาแห่งความสงบของคุณ",
      subtitle:
        "เขียนหรือโทรหาเรา — เราตอบกลับอย่างรวดเร็วและรอต้อนรับคุณ",
      form: {
        name: "ชื่อของคุณ",
        email: "อีเมล",
        phone: "โทรศัพท์ (ไม่บังคับ)",
        message: "ข้อความ",
        submit: "ส่งข้อความ",
        callUs: "โทรหาเรา",
        sending: "กำลังส่ง...",
        success: "ขอบคุณ! เราได้ส่งอีเมลยืนยันให้คุณแล้ว",
        error: "เกิดข้อผิดพลาด กรุณาลองอีกครั้ง",
      },
      info: {
        emailLabel: "อีเมล",
        phoneLabel: "โทรศัพท์",
        hoursLabel: "เวลาทำการ",
        hoursValue: "จันทร์ — อาทิตย์: 10:00 — 22:00",
        addressLabel: "ที่ตั้ง",
        addressValue: "เปิดเร็ว ๆ นี้ที่สาขาใหม่ในเบลเกรด (จะแจ้งที่อยู่ภายหลัง)",
      },
    },
    footer: {
      tagline: "ประเพณีไทยแท้ในใจกลางกรุงเบลเกรด",
      rights: "สงวนลิขสิทธิ์",
      quickLinks: "ลิงก์ด่วน",
      followUs: "ติดตามเรา",
    },
    chat: {
      title: "ติดต่อเรา",
      subtitle: "ตอบกลับเร็วผ่านข้อความ",
      whatsapp: "ติดต่อเราทาง WhatsApp",
      viber: "ติดต่อเราทาง Viber",
    },
  },
};
