// Translation dictionary for Bua Luang Thai Spa
// Languages: sr (default), en, ru, zh

export const LANGUAGES = [
  { code: "sr", label: "SR", name: "Srpski", flag: "🇷🇸" },
  { code: "en", label: "EN", name: "English", flag: "🇬🇧" },
  { code: "ru", label: "RU", name: "Русский", flag: "🇷🇺" },
  { code: "zh", label: "ZH", name: "中文", flag: "🇨🇳" },
];

export const translations = {
  sr: {
    nav: {
      home: "Početna",
      about: "O nama",
      massages: "Masaže",
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
        "Tajlandska masaža Beograd — Dobrodošli u prostor posvećen vašem telu, vašem miru i vašem balansu.",
        "Naš salon u srcu Beograda nudi autentičnu tajlandsku masažu koju s ljubavlju i znanjem izvode terapeutkinje sa samog izvora tajlandske tradicije. Njihovo višegodišnje iskustvo i posvećenost donose vam tretmane koji nisu samo relaksacija, već duboka nega tela i duha.",
        "Svaka masaža prilagođena je vama — vašoj energiji, stepenu napetosti i potrebama tela. Kombinacijom pažljivog pritiska, pasivnog istezanja i prirodnih ulja, tretman deluje na vašu fleksibilnost, cirkulaciju i unutrašnji mir. Cilj je jednostavan: da izađete lakši, smireniji i povezani sa sobom.",
        "Ako tražite tajlandsku masažu u Beogradu koja je više od opuštanja, došli ste na pravo mesto.",
      ],
      stats: [
        { value: "10+", label: "godina iskustva" },
        { value: "100%", label: "autentično tajlandski" },
        { value: "5★", label: "ocena gostiju" },
      ],
    },
    massages: {
      eyebrow: "Naše masaže",
      title: "Tretmani inspirisani tradicijom",
      subtitle:
        "Svaki tretman pažljivo se izvodi po metodama prenetim generacijama tajlandskih majstora.",
      items: [
        {
          name: "Tradicionalna Tajlandska Masaža",
          desc: "Klasična suva masaža sa pasivnim istezanjem i akupresurnim pritiscima duž energetskih linija.",
        },
        {
          name: "Aroma Oil Masaža",
          desc: "Topla aromatična ulja, blagi pokreti i duboka relaksacija mišića — bekstvo za čula.",
        },
        {
          name: "Thai Herbal Compress",
          desc: "Topli zavežljaji od tajlandskih lekovitih biljaka koji oslobađaju napetost i otvaraju cirkulaciju.",
        },
        {
          name: "Deep Tissue & Sportska",
          desc: "Intenzivan tretman za napete mišiće, idealan za sportiste i one sa sedentarnim radom.",
        },
        {
          name: "Foot Reflexology",
          desc: "Refleksološki pritisak na ključne tačke stopala koji uravnotežuje celokupan organizam.",
        },
        {
          name: "Couple Spa Ritual",
          desc: "Privatni paket za dvoje — sveće, ulja, tišina i potpuna posvećenost zajedničkom predahu.",
        },
      ],
    },
    pricing: {
      eyebrow: "Cenovnik",
      title: "Birajte ritual koji vam odgovara",
      subtitle: "Cene su orijentacione i biće potvrđene prilikom rezervacije.",
      currency: "RSD",
      note: "* Konačan cenovnik biće naknadno dodat. Sve cene podležu promenama.",
      rows: [
        { name: "Tradicionalna Tajlandska", duration: "60 min", price: 4500 },
        { name: "Tradicionalna Tajlandska", duration: "90 min", price: 6300 },
        { name: "Aroma Oil Masaža", duration: "60 min", price: 5200 },
        { name: "Aroma Oil Masaža", duration: "90 min", price: 7000 },
        { name: "Thai Herbal Compress", duration: "75 min", price: 6800 },
        { name: "Deep Tissue", duration: "60 min", price: 5500 },
        { name: "Foot Reflexology", duration: "45 min", price: 3800 },
        { name: "Couple Spa Ritual", duration: "90 min", price: 13500 },
      ],
    },
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
  },

  en: {
    nav: {
      home: "Home",
      about: "About",
      massages: "Massages",
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
      stats: [
        { value: "10+", label: "years of experience" },
        { value: "100%", label: "authentic Thai" },
        { value: "5★", label: "guest rating" },
      ],
    },
    massages: {
      eyebrow: "Our massages",
      title: "Treatments rooted in tradition",
      subtitle:
        "Each ritual is performed using methods passed down by Thai masters across generations.",
      items: [
        {
          name: "Traditional Thai Massage",
          desc: "Classic dry massage with passive stretching and acupressure along the body's energy lines.",
        },
        {
          name: "Aroma Oil Massage",
          desc: "Warm aromatic oils, gentle strokes and deep muscle relaxation — an escape for the senses.",
        },
        {
          name: "Thai Herbal Compress",
          desc: "Warm pouches of Thai medicinal herbs that release tension and stimulate circulation.",
        },
        {
          name: "Deep Tissue & Sport",
          desc: "An intense treatment for tense muscles — ideal for athletes and sedentary lifestyles.",
        },
        {
          name: "Foot Reflexology",
          desc: "Reflexology pressure on key foot points that brings balance to the whole body.",
        },
        {
          name: "Couple Spa Ritual",
          desc: "A private ritual for two — candles, oils, silence and shared stillness.",
        },
      ],
    },
    pricing: {
      eyebrow: "Pricing",
      title: "Choose the ritual that suits you",
      subtitle: "Prices are indicative and will be confirmed at booking.",
      currency: "RSD",
      note: "* Final price list will be added later. All prices subject to change.",
      rows: [
        { name: "Traditional Thai", duration: "60 min", price: 4500 },
        { name: "Traditional Thai", duration: "90 min", price: 6300 },
        { name: "Aroma Oil Massage", duration: "60 min", price: 5200 },
        { name: "Aroma Oil Massage", duration: "90 min", price: 7000 },
        { name: "Thai Herbal Compress", duration: "75 min", price: 6800 },
        { name: "Deep Tissue", duration: "60 min", price: 5500 },
        { name: "Foot Reflexology", duration: "45 min", price: 3800 },
        { name: "Couple Spa Ritual", duration: "90 min", price: 13500 },
      ],
    },
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
  },

  ru: {
    nav: {
      home: "Главная",
      about: "О нас",
      massages: "Массажи",
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
      stats: [
        { value: "10+", label: "лет опыта" },
        { value: "100%", label: "аутентично" },
        { value: "5★", label: "оценка гостей" },
      ],
    },
    massages: {
      eyebrow: "Наши массажи",
      title: "Процедуры в духе традиции",
      subtitle:
        "Каждый ритуал выполняется по методикам, передаваемым тайскими мастерами из поколения в поколение.",
      items: [
        {
          name: "Традиционный тайский массаж",
          desc: "Классический сухой массаж с пассивным растяжением и акупрессурой по энергетическим линиям тела.",
        },
        {
          name: "Аромамасляный массаж",
          desc: "Тёплые ароматические масла, мягкие движения и глубокое расслабление мышц — побег для чувств.",
        },
        {
          name: "Тайский травяной компресс",
          desc: "Тёплые мешочки с тайскими лекарственными травами снимают напряжение и улучшают кровообращение.",
        },
        {
          name: "Глубокий и спортивный массаж",
          desc: "Интенсивная процедура для напряжённых мышц — идеально для спортсменов и сидячего образа жизни.",
        },
        {
          name: "Рефлексология стоп",
          desc: "Рефлексотерапия ключевых точек стоп, гармонизирующая весь организм.",
        },
        {
          name: "Парный СПА-ритуал",
          desc: "Приватный ритуал для двоих — свечи, масла, тишина и общее уединение.",
        },
      ],
    },
    pricing: {
      eyebrow: "Цены",
      title: "Выберите подходящий ритуал",
      subtitle: "Цены ориентировочные и подтверждаются при бронировании.",
      currency: "RSD",
      note: "* Окончательный прайс-лист будет добавлен позже. Цены могут изменяться.",
      rows: [
        { name: "Традиционный тайский", duration: "60 мин", price: 4500 },
        { name: "Традиционный тайский", duration: "90 мин", price: 6300 },
        { name: "Аромамасляный массаж", duration: "60 мин", price: 5200 },
        { name: "Аромамасляный массаж", duration: "90 мин", price: 7000 },
        { name: "Травяной компресс", duration: "75 мин", price: 6800 },
        { name: "Глубокий массаж", duration: "60 мин", price: 5500 },
        { name: "Рефлексология стоп", duration: "45 мин", price: 3800 },
        { name: "Парный ритуал", duration: "90 мин", price: 13500 },
      ],
    },
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
  },

  zh: {
    nav: {
      home: "首页",
      about: "关于我们",
      massages: "按摩",
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
      stats: [
        { value: "10+", label: "年经验" },
        { value: "100%", label: "正宗泰式" },
        { value: "5★", label: "顾客评分" },
      ],
    },
    massages: {
      eyebrow: "我们的疗程",
      title: "扎根于传统的疗程",
      subtitle: "每一项仪式都遵循代代相传的泰国大师手法。",
      items: [
        {
          name: "传统泰式按摩",
          desc: "经典干式按摩，沿身体能量线进行被动伸展与穴位按压。",
        },
        {
          name: "芳香精油按摩",
          desc: "温暖的芳香精油、轻柔的手法与深层肌肉放松 —— 感官的逃逸。",
        },
        {
          name: "泰式草药热敷",
          desc: "温热的泰式草药包，舒缓紧绷并促进循环。",
        },
        {
          name: "深层组织与运动按摩",
          desc: "针对紧绷肌肉的强力疗程，适合运动者与久坐人士。",
        },
        {
          name: "足部反射疗法",
          desc: "刺激足部关键反射点，为全身带来平衡。",
        },
        {
          name: "双人SPA仪式",
          desc: "为两位准备的私密仪式 —— 烛光、精油、宁静与共同的放下。",
        },
      ],
    },
    pricing: {
      eyebrow: "价目表",
      title: "选择属于您的仪式",
      subtitle: "价格仅供参考，预订时将予以确认。",
      currency: "RSD",
      note: "* 最终价目将稍后补充。所有价格可能调整。",
      rows: [
        { name: "传统泰式", duration: "60 分钟", price: 4500 },
        { name: "传统泰式", duration: "90 分钟", price: 6300 },
        { name: "芳香精油", duration: "60 分钟", price: 5200 },
        { name: "芳香精油", duration: "90 分钟", price: 7000 },
        { name: "泰式草药热敷", duration: "75 分钟", price: 6800 },
        { name: "深层组织", duration: "60 分钟", price: 5500 },
        { name: "足部反射", duration: "45 分钟", price: 3800 },
        { name: "双人仪式", duration: "90 分钟", price: 13500 },
      ],
    },
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
  },
};
