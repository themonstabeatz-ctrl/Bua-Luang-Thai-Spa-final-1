/**
 * Master SEO + booking data for every service offered by Bua Luang Thai Spa.
 *
 * This file is the single source of truth driving:
 *   • the 24 service pages (6 services × 4 languages)
 *   • per-page SEO `<head>` (title, meta, OG, Schema.org Service + FAQPage)
 *   • the Pricing section on each homepage
 *   • the `hreflang` cross-reference map
 *
 * Slugs are unique across languages so an `/sr/usluge/thai-tradition` page
 * can declare `hreflang="en"` → `/en/services/thai-tradition` and so on,
 * which is how Google ties translated versions together.
 */

export const SERVICE_SLUGS = [
  "thai-tradition",
  "aroma",
  "herbal-compress",
  "neck-head-shoulders",
  "deep-tissue",
  "foot-massage",
];

// Per-language URL prefix for the services section.
export const SERVICE_PATH = {
  sr: "/sr/usluge",
  en: "/en/services",
  ru: "/ru/uslugi",
  zh: "/zh/services",
  th: "/th/services",
};

export const HOME_PATH = { sr: "/sr", en: "/en", ru: "/ru", zh: "/zh", th: "/th" };

export const LANGS = ["sr", "en", "ru", "zh", "th"];

// Standard hreflang map for a given path family.
export const buildHreflangs = (slug) =>
  LANGS.map((l) => ({
    lang: l,
    href: slug ? `${SERVICE_PATH[l]}/${slug}` : HOME_PATH[l],
  }));

// ─── Pricing source of truth ──────────────────────────────────────────────
// Each option is { duration: minutes, price: RSD }.
export const SERVICE_PRICING = {
  "thai-tradition": [
    { duration: 60, price: 4500 },
    { duration: 90, price: 5500 },
  ],
  aroma: [
    { duration: 60, price: 4300 },
    { duration: 90, price: 5300 },
  ],
  "herbal-compress": [
    { duration: 90, price: 5900 },
    { duration: 120, price: 6900 },
  ],
  "neck-head-shoulders": [
    { duration: 30, price: 2500 },
    { duration: 45, price: 3000 },
    { duration: 60, price: 3500 },
  ],
  "deep-tissue": [
    { duration: 60, price: 4500 },
    { duration: 90, price: 5500 },
  ],
  "foot-massage": [
    { duration: 30, price: 2500 },
    { duration: 45, price: 3000 },
    { duration: 60, price: 3500 },
  ],
};

// ─── Per-language, per-service rich SEO content ───────────────────────────
// Keep copy semantic, dense with local intent ("Beograd", "Belgrade", etc.)
// and friendly to read. Each entry powers a full landing page.
export const SERVICE_CONTENT = {
  // ─────────── THAI TRADITION ───────────
  "thai-tradition": {
    sr: {
      name: "Tradicionalna Tajlandska Masaža",
      title: "Tradicionalna Tajlandska Masaža Beograd · Bua Luang Thai Spa",
      metaDescription:
        "Autentična tradicionalna tajlandska masaža u Beogradu sa sertifikovanim terapeutima iz Tajlanda. 60 ili 90 minuta luksuznog wellness iskustva.",
      ogDescription:
        "Bua Luang Thai Spa Beograd — tradicionalna tajlandska masaža kakvu izvode pravi tajlandski majstori, u luksuznom ambijentu.",
      h1: "Tradicionalna Tajlandska Masaža u Beogradu",
      eyebrow: "Drevna umetnost · Beograd",
      intro:
        "Tradicionalna tajlandska masaža je kompletan ritual istezanja, pritisaka duž energetskih linija (Sen) i dubokog ali pažljivog rada na celom telu. Kod nas u Bua Luang Thai Spa u Beogradu izvode je isključivo sertifikovani terapeuti iz Tajlanda, na originalnom tajlandskom dušeku, u tišini ambijenta dizajniranog da vas u prvom minutu izvuče iz beogradskog tempa.",
      benefitsTitle: "Šta dobijate posle samo jednog tretmana",
      benefits: [
        "Trenutno olakšanje od zategnutosti u leđima, vratu i ramenima",
        "Otvoreni protok energije kroz Sen linije i bolja cirkulacija",
        "Duboka mentalna relaksacija — efekat kao 8 sati kvalitetnog sna",
        "Veća fleksibilnost zglobova i kičme zahvaljujući pasivnom istezanju",
        "Smanjen kortizol i stres na nivou nervnog sistema",
      ],
      techniqueTitle: "Kako izgleda autentična thai masaža",
      technique:
        "Tretman počinje toplim čajem i kratkim razgovorom o vašim potrebama. Terapeut zatim radi serijom ritmičkih pritisaka palčevima i dlanovima duž Sen linija, kombinujući to sa nežnim pasivnim istezanjem inspirisanim jogom. Tokom 60 ili 90 minuta prolazi se kroz stopala, noge, leđa, ramena i vrat — bez ulja, kroz lagani pamučni komplet koji vam pripremamo.",
      compareTitle: "Zašto Bua Luang umesto drugog thai spa salona u Beogradu",
      compareBody:
        "U poređenju sa ostalim spa salonima u Beogradu kao što su Siam Spa, Mai Thai Lux, Jai Thai, Lanna Thai, Rei Thailand Massage ili Sa-Wan, Bua Luang Thai Spa postavlja novi standard autentičnosti: svi naši terapeuti dolaze direktno iz Tajlanda sa zvaničnim sertifikatima iz tradicionalne thai medicine, koristimo originalne tajlandske dušeke i pribor uvezen iz Bangkoka, a ambijent je dizajniran u sofisticiranoj light luxury estetici prilagođenoj zahtevnoj beogradskoj klijenteli.",
      faq: [
        {
          q: "Koliko traje tradicionalna tajlandska masaža u Beogradu?",
          a: "Možete birati između 60 minuta (4.500 RSD) i 90 minuta (5.500 RSD). Za prvi tretman preporučujemo 90 minuta jer ostavlja dovoljno vremena za kompletan ritual istezanja.",
        },
        {
          q: "Da li je tradicionalna thai masaža bolna?",
          a: "Ne. Pritisak se uvek prilagođava vašoj toleranciji. Tajlandski terapeuti su obučeni da rade duboko, ali nikada na štetu udobnosti — ako želite slabiji pritisak samo recite na početku tretmana.",
        },
        {
          q: "Šta da nosim za vreme tretmana?",
          a: "Mi vam obezbeđujemo pamučni komfor-set u kome se radi tretman. Ne koristi se ulje, tako da nema potrebe za posebnom pripremom kože.",
        },
        {
          q: "Mogu li da zakažem tradicionalnu tajlandsku masažu za parove?",
          a: "Da, imamo i opciju masaže za parove u Beogradu — dva terapeuta rade istovremeno u istom prostoriji. Kontaktirajte nas direktno za rezervaciju termina za dve osobe.",
        },
        {
          q: "Kako se zakazuje termin?",
          a: "Najlakše preko forme na našem sajtu (radno vreme 10:00–22:00, poslednji termin u 21:00) ili pozivom. Posle rezervacije šaljemo email potvrdu sa .ics kalendar dodatkom za jedan klik na vašem telefonu.",
        },
      ],
    },
    en: {
      name: "Thai Traditional Massage",
      title: "Thai Traditional Massage Belgrade · Bua Luang Thai Spa",
      metaDescription:
        "Authentic Thai traditional massage in Belgrade by certified therapists from Thailand. 60 or 90 minutes of luxury wellness on an original Thai futon.",
      ogDescription:
        "The most authentic Thai traditional massage in Belgrade — certified therapists, original Thai equipment, premium light-luxury ambiance.",
      h1: "Thai Traditional Massage in Belgrade",
      eyebrow: "Ancient practice · Belgrade",
      intro:
        "Thai traditional massage is a complete ritual of stretching, palm and thumb pressure along the body's Sen energy lines, and deep yet careful work on the entire body. At Bua Luang Thai Spa in Belgrade it is performed exclusively by certified therapists from Thailand, on an original Thai futon, in a quiet ambiance built to pull you out of city tempo within the first minute.",
      benefitsTitle: "What one session gives you",
      benefits: [
        "Immediate relief from tension in the back, neck and shoulders",
        "Restored energy flow along Sen lines and improved circulation",
        "Deep mental relaxation — comparable to 8 hours of quality sleep",
        "Greater joint and spinal mobility through passive yoga-style stretching",
        "Lower cortisol and a reset nervous system",
      ],
      techniqueTitle: "What an authentic Thai session looks like",
      technique:
        "Your session begins with warm tea and a short conversation about your needs. The therapist then applies rhythmic thumb and palm pressure along the Sen lines, combined with gentle passive stretching inspired by yoga. Across 60 or 90 minutes we move through the feet, legs, back, shoulders and neck — no oil is used; you wear a soft cotton set we provide.",
      compareTitle: "Why Bua Luang versus other Thai spas in Belgrade",
      compareBody:
        "Compared with other Thai spa salons in Belgrade — Siam Spa, Mai Thai Lux, Jai Thai, Lanna Thai, Rei Thailand Massage or Sa-Wan — Bua Luang Thai Spa raises the authenticity bar: every therapist comes directly from Thailand with formal certificates in traditional Thai medicine, we use original Thai futons and props imported from Bangkok, and the interior is designed in a refined light-luxury aesthetic for Belgrade's most discerning clientele.",
      faq: [
        {
          q: "How long does a Thai traditional massage in Belgrade last?",
          a: "Choose between 60 minutes (4,500 RSD) and 90 minutes (5,500 RSD). For a first visit we recommend 90 minutes — it leaves enough room for the full stretching ritual.",
        },
        {
          q: "Is a traditional Thai massage painful?",
          a: "No. Pressure is always adjusted to your tolerance. Thai therapists are trained to work deeply yet never at the cost of comfort — just tell us at the start if you prefer lighter pressure.",
        },
        {
          q: "What do I wear?",
          a: "We provide a soft cotton set worn during the treatment. No oils are used, so no special skin prep is needed.",
        },
        {
          q: "Can I book a couples Thai massage?",
          a: "Yes — couples massage in Belgrade is available with two therapists working in the same room. Contact us directly to reserve a two-person time slot.",
        },
        {
          q: "How do I book?",
          a: "Easiest via our online form (open 10:00–22:00, last slot 21:00) or by phone. You'll receive a confirmation email with a one-tap .ics calendar attachment.",
        },
      ],
    },
    ru: {
      name: "Тайский Традиционный Массаж",
      title: "Тайский традиционный массаж Белград · Bua Luang Thai Spa",
      metaDescription:
        "Подлинный тайский традиционный массаж в Белграде. Сертифицированные тайские терапевты. 60 или 90 минут премиум-велнес на оригинальном тайском футоне.",
      ogDescription:
        "Самый аутентичный тайский традиционный массаж в Белграде — мастера прямо из Таиланда, премиальная атмосфера.",
      h1: "Тайский традиционный массаж в Белграде",
      eyebrow: "Древняя практика · Белград",
      intro:
        "Тайский традиционный массаж — это полный ритуал растяжки, точечного давления вдоль энергетических линий Сэн и глубокой, но мягкой проработки всего тела. В Bua Luang Thai Spa в Белграде его выполняют исключительно сертифицированные мастера из Таиланда, на оригинальном тайском футоне, в атмосфере тишины, которая возвращает вас к себе уже в первые минуты.",
      benefitsTitle: "Эффект уже после одного сеанса",
      benefits: [
        "Мгновенное снятие напряжения в спине, шее и плечах",
        "Восстановление потока энергии вдоль линий Сэн, лучшая циркуляция",
        "Глубокое ментальное расслабление — эффект 8 часов качественного сна",
        "Большая подвижность суставов и позвоночника через пассивную растяжку",
        "Снижение кортизола и перезагрузка нервной системы",
      ],
      techniqueTitle: "Как проходит аутентичный сеанс",
      technique:
        "Сеанс начинается с тёплого чая и короткой беседы. Затем мастер работает ритмичным давлением больших пальцев и ладоней вдоль линий Сэн, сочетая это с мягкими пассивными растяжками, вдохновлёнными йогой. За 60 или 90 минут прорабатываются стопы, ноги, спина, плечи и шея — без масла, в мягком хлопковом комплекте, который мы предоставляем.",
      compareTitle: "Почему именно Bua Luang в Белграде",
      compareBody:
        "По сравнению с другими тайскими спа-салонами в Белграде — Siam Spa, Mai Thai Lux, Jai Thai, Lanna Thai, Rei Thailand Massage или Sa-Wan — Bua Luang Thai Spa поднимает планку аутентичности: все наши мастера прибыли непосредственно из Таиланда с официальными сертификатами по традиционной тайской медицине, мы используем оригинальные тайские футоны из Бангкока, а интерьер выдержан в утончённой light-luxury эстетике для самой требовательной аудитории Белграда.",
      faq: [
        {
          q: "Сколько длится тайский массаж в Белграде?",
          a: "60 минут (4 500 RSD) или 90 минут (5 500 RSD). Первый визит рекомендуем 90 минут — это полный ритуал.",
        },
        {
          q: "Это болезненно?",
          a: "Нет. Давление всегда подстраивается под вашу переносимость. Достаточно сказать в начале.",
        },
        {
          q: "В чём проходит сеанс?",
          a: "Мы предоставляем мягкий хлопковый комплект. Масло не используется.",
        },
        {
          q: "Можно ли для пары?",
          a: "Да — парный тайский массаж в Белграде доступен в одном кабинете с двумя мастерами.",
        },
        {
          q: "Как записаться?",
          a: "Онлайн-форма (10:00–22:00, последний слот в 21:00) или звонок. Подтверждение по email с .ics-вложением.",
        },
      ],
    },
    zh: {
      name: "传统泰式按摩",
      title: "贝尔格莱德传统泰式按摩 · Bua Luang Thai Spa",
      metaDescription:
        "在贝尔格莱德体验来自泰国的认证治疗师提供的正宗传统泰式按摩。60 或 90 分钟奢华养生疗程。",
      ogDescription:
        "贝尔格莱德最正宗的传统泰式按摩 —— 来自泰国的认证按摩师与精致环境。",
      h1: "贝尔格莱德传统泰式按摩",
      eyebrow: "古老技艺 · 贝尔格莱德",
      intro:
        "传统泰式按摩是一套完整的伸展、能量线 (Sen) 按压与全身深层放松仪式。在贝尔格莱德的 Bua Luang Thai Spa,所有疗程均由来自泰国的持证按摩师在原装泰式榻榻米上完成,让您在最初几分钟内便能远离都市节奏。",
      benefitsTitle: "一次疗程的效果",
      benefits: [
        "即刻缓解背、颈、肩部紧张",
        "疏通 Sen 能量线,改善循环",
        "深度心理放松 —— 相当于八小时高质量睡眠",
        "通过被动伸展提升关节与脊柱灵活度",
        "降低皮质醇,平衡神经系统",
      ],
      techniqueTitle: "正宗疗程流程",
      technique:
        "疗程从一杯温茶与简短沟通开始。按摩师沿 Sen 线进行节奏性指、掌按压,辅以瑜伽式被动伸展。60 或 90 分钟内依次处理足、腿、背、肩、颈 —— 不使用精油,我们提供柔软棉质套装。",
      compareTitle: "为何选择 Bua Luang",
      compareBody:
        "与贝尔格莱德其他泰式 spa(Siam Spa、Mai Thai Lux、Jai Thai、Lanna Thai、Rei Thailand Massage、Sa-Wan)相比,Bua Luang Thai Spa 提升了正宗标准:所有按摩师均直接来自泰国并持有传统泰医认证,使用从曼谷进口的原装设备,并以精致 light-luxury 风格服务于贝尔格莱德最挑剔的客户。",
      faq: [
        { q: "疗程时长?", a: "60 分钟 (4,500 RSD) 或 90 分钟 (5,500 RSD)。首次推荐 90 分钟。" },
        { q: "会痛吗?", a: "不会。力度始终根据您的承受度调整。" },
        { q: "需要穿什么?", a: "我们提供舒适的棉质套装。不使用精油。" },
        { q: "可以情侣预订吗?", a: "可以。两位按摩师同房同时服务。" },
        { q: "如何预订?", a: "网站表单 (10:00–22:00, 最后时段 21:00) 或电话。预订后将发送含 .ics 日历附件的邮件。" },
      ],
    },
  },
  // ─────────── AROMA ───────────
  aroma: {
    sr: {
      name: "Relax Masaža",
      title: "Relax Masaža Beograd · Bua Luang Thai Spa",
      metaDescription:
        "Aroma masaža u Beogradu sa premium esencijalnim uljima koja smiruju nervni sistem. 60 ili 90 minuta sa sertifikovanim tajlandskim terapeutom.",
      ogDescription:
        "Aroma masaža Beograd — premium ulja, tajlandski majstori, pravi spa odmor u srcu Beograda.",
      h1: "Aroma Masaža u Beogradu",
      eyebrow: "Mirisni ritual · Beograd",
      intro:
        "Aroma masaža je nežna ali izuzetno duboka tehnika u kojoj se koriste birana esencijalna ulja: lavanda za smirenje, ylang-ylang za hormonsku ravnotežu, eukaliptus za jasnoću i bergamot za podizanje raspoloženja. Kombinujemo ih sa tehnikom dugih klizajućih pokreta koja deluje istovremeno na kožu, mišiće i limfni sistem.",
      benefitsTitle: "Zašto se klijenti vraćaju",
      benefits: [
        "Trenutno smirenje nervnog sistema — savršeno protiv stresa",
        "Hidratacija i izrazito mekša koža posle samo jednog tretmana",
        "Bolji san i lakše uspavljivanje iste večeri",
        "Stimulacija limfnog sistema i prirodne detoksikacije",
        "Aromaterapeutski efekat koji traje danima nakon tretmana",
      ],
      techniqueTitle: "Kako se radi aroma masaža",
      technique:
        "Pre tretmana zajedno biramo miks ulja po vašem trenutnom raspoloženju. Tretman ide po klasičnoj tajlandskoj sekvenci — leđa, ramena, vrat, noge, ruke i lice — sa mirnim, ritmičkim klizajućim pokretima. Cela prostorija dodatno se aromatizuje difuzorom istog mirisnog profila.",
      compareTitle: "Aroma masaža Beograd — naša razlika",
      compareBody:
        "Dok mnogi spa centri u Beogradu (Siam Spa, Mai Thai Lux, Jai Thai, Lanna Thai, Rei Thailand Massage, Sa-Wan) koriste generička mirisna ulja, mi koristimo originalne tajlandske blend-ove pripremljene u Tajlandu, što daje znatno bogatiji aromaterapeutski efekat. Tretman izvode sertifikovani tajlandski terapeuti.",
      faq: [
        { q: "Koliko traje aroma masaža?", a: "60 minuta (4.300 RSD) ili 90 minuta (5.300 RSD)." },
        { q: "Da li mogu da izaberem ulje?", a: "Da, biramo zajedno pre tretmana na osnovu vašeg raspoloženja i potreba." },
        { q: "Da li je dobra za prvu posetu?", a: "Idealna — najpopularniji izbor za prvi spa odmor u Beogradu." },
        { q: "Da li je tretman pogodan za trudnice?", a: "Konsultujte se sa nama unapred — postoje sigurni protokoli za drugi trimestar." },
        { q: "Kako se osećam posle tretmana?", a: "Većina klijenata oseća izuzetnu lakoću, miran san i blago euforično raspoloženje narednog dana." },
      ],
    },
    en: {
      name: "Relax Massage",
      title: "Relax Massage Belgrade · Bua Luang Thai Spa",
      metaDescription:
        "Aroma massage in Belgrade using premium essential oil blends imported from Thailand. 60 or 90 minutes with certified Thai therapists.",
      ogDescription:
        "Aroma massage Belgrade — premium oils, authentic Thai therapists, the city's most relaxing escape.",
      h1: "Aroma Massage in Belgrade",
      eyebrow: "Scented ritual · Belgrade",
      intro:
        "Aroma massage is a gentle yet deep technique using curated essential oils — lavender for calm, ylang-ylang for hormonal balance, eucalyptus for clarity, bergamot for mood. Combined with long gliding strokes, it works on skin, muscles and the lymphatic system simultaneously.",
      benefitsTitle: "Why guests return",
      benefits: [
        "Immediate nervous-system reset — ideal against stress",
        "Hydrated, visibly softer skin after one session",
        "Better sleep that very evening",
        "Lymphatic stimulation and natural detox",
        "Aromatherapy effect that lasts for days",
      ],
      techniqueTitle: "How an aroma session flows",
      technique:
        "Before the session we choose your oil blend together based on mood. The treatment follows a classic Thai sequence — back, shoulders, neck, legs, arms and face — with calm rhythmic gliding strokes, while a diffuser perfumes the room with the same scent profile.",
      compareTitle: "Aroma massage in Belgrade — our edge",
      compareBody:
        "While many Belgrade spas (Siam Spa, Mai Thai Lux, Jai Thai, Lanna Thai, Rei Thailand Massage, Sa-Wan) use generic scented oils, we work with original Thai blends prepared in Thailand, which produces a far richer aromatherapy effect. All sessions are delivered by certified Thai therapists.",
      faq: [
        { q: "How long is the aroma massage?", a: "60 min (4,300 RSD) or 90 min (5,300 RSD)." },
        { q: "Can I choose my oil?", a: "Yes — we choose together before the session based on your mood." },
        { q: "Good for a first visit?", a: "Perfect — our most popular choice for a first spa day in Belgrade." },
        { q: "Pregnancy-friendly?", a: "Consult us in advance — safe protocols exist for the second trimester." },
        { q: "How will I feel afterwards?", a: "Most guests report deep lightness, restful sleep and a mild euphoria the next day." },
      ],
    },
    ru: {
      name: "Расслабляющий Массаж",
      title: "Расслабляющий массаж Белград · Bua Luang Thai Spa",
      metaDescription:
        "Ароматический массаж в Белграде с премиальными эфирными маслами из Таиланда. 60 или 90 минут с сертифицированными тайскими мастерами.",
      ogDescription:
        "Ароматический массаж в Белграде — премиальные масла, тайские мастера, лучший побег от города.",
      h1: "Ароматический массаж в Белграде",
      eyebrow: "Аромаритуал · Белград",
      intro:
        "Ароматический массаж — мягкая, но глубокая техника с премиальными эфирными маслами: лаванда для покоя, иланг-иланг для гормонального баланса, эвкалипт для ясности, бергамот для настроения. Длинные скользящие движения работают одновременно с кожей, мышцами и лимфой.",
      benefitsTitle: "Почему гости возвращаются",
      benefits: [
        "Мгновенная перезагрузка нервной системы",
        "Заметно мягче кожа после одного сеанса",
        "Глубокий сон в тот же вечер",
        "Стимуляция лимфы и естественный детокс",
        "Аромаэффект сохраняется днями",
      ],
      techniqueTitle: "Как проходит сеанс",
      technique:
        "Перед сеансом мы вместе выбираем смесь масел. Дальше — классическая тайская последовательность по спине, плечам, шее, ногам, рукам и лицу. В кабинете работает диффузор с тем же ароматом.",
      compareTitle: "Наше преимущество",
      compareBody:
        "Тогда как многие спа в Белграде (Siam Spa, Mai Thai Lux, Jai Thai, Lanna Thai, Rei Thailand Massage, Sa-Wan) используют универсальные ароматизированные масла, мы работаем с оригинальными тайскими смесями из Таиланда — это гораздо более глубокий ароматерапевтический эффект.",
      faq: [
        { q: "Продолжительность?", a: "60 минут (4 300 RSD) или 90 минут (5 300 RSD)." },
        { q: "Могу выбрать масло?", a: "Да, выбираем вместе перед сеансом." },
        { q: "Для первой посещения?", a: "Идеально — самый популярный первый выбор." },
        { q: "Для беременных?", a: "Обсудите заранее — есть безопасные протоколы для второго триместра." },
        { q: "Самочувствие после?", a: "Глубокое лёгкость, крепкий сон, лёгкая эйфория наутро." },
      ],
    },
    zh: {
      name: "放松按摩",
      title: "贝尔格莱德放松按摩 · Bua Luang Thai Spa",
      metaDescription:
        "贝尔格莱德芳香按摩,使用来自泰国的高级精油配方。60 或 90 分钟,认证泰国按摩师专业服务。",
      ogDescription:
        "贝尔格莱德芳香按摩 —— 高级精油、泰国按摩师、城市最佳放松体验。",
      h1: "贝尔格莱德芳香按摩",
      eyebrow: "香氛仪式 · 贝尔格莱德",
      intro:
        "芳香按摩是一种温柔但深入的技法,搭配精选精油:薰衣草助眠、依兰平衡荷尔蒙、桉树醒神、佛手柑提振情绪。配合长滑动手法,同时作用于皮肤、肌肉与淋巴系统。",
      benefitsTitle: "回头客的理由",
      benefits: [
        "即刻平衡神经系统",
        "一次疗程后皮肤明显更柔软",
        "当晚获得深度睡眠",
        "促进淋巴循环与自然排毒",
        "香氛效应可持续数日",
      ],
      techniqueTitle: "疗程流程",
      technique:
        "开始前共同挑选精油。随后进行经典泰式按摩顺序 —— 背、肩、颈、腿、手、面 —— 配合柔和的滑动手法,房间内同步释放相同香气。",
      compareTitle: "我们的优势",
      compareBody:
        "贝尔格莱德其他泰式 spa(Siam Spa、Mai Thai Lux、Jai Thai、Lanna Thai、Rei Thailand Massage、Sa-Wan)多使用通用精油,而我们使用泰国本地调配的精油配方,芳香疗效更为浓郁。所有按摩师均持泰国认证。",
      faq: [
        { q: "疗程时长?", a: "60 分钟 (4,300 RSD) 或 90 分钟 (5,300 RSD)。" },
        { q: "可以选精油吗?", a: "可以,我们一起选择。" },
        { q: "适合首次到访吗?", a: "非常适合,是最受欢迎的入门选择。" },
        { q: "孕妇可以做吗?", a: "请提前咨询,有针对孕中期的安全方案。" },
        { q: "结束后感受?", a: "深度轻盈、入睡顺畅、次日精神愉悦。" },
      ],
    },
  },
  // ─────────── HERBAL COMPRESS ───────────
  "herbal-compress": {
    sr: {
      name: "Masaža sa Toplim Tajlandskim Biljnim Kompresama",
      title: "Tajlandske Biljne Komprese Beograd · Bua Luang Thai Spa",
      metaDescription:
        "Tradicionalna tajlandska masaža sa toplim biljnim kompresama (Luk Pra Kob) u Beogradu. 90 ili 120 minuta dubinske terapije.",
      ogDescription:
        "Tajlandske biljne komprese Beograd — drevni Luk Pra Kob ritual sa autentičnim tajlandskim biljem.",
      h1: "Masaža sa Toplim Tajlandskim Biljnim Kompresama",
      eyebrow: "Luk Pra Kob · Beograd",
      intro:
        "Luk Pra Kob su tople komprese pune autentičnih tajlandskih biljaka — limunove trave, kafira, đumbira, kurkume, kafirske limete i tamarinda. Aktiviraju se toplom parom i potom polako prelaze po telu, otpuštajući esencijalna ulja direktno kroz kožu i istovremeno duboko prodirući u mišićna napregnuća.",
      benefitsTitle: "Šta dobijate iz ovog rituala",
      benefits: [
        "Duboka termoterapija — savršena za hladne zimske beogradske dane",
        "Antiinflamatorni efekat zahvaljujući kurkumi i đumbiru",
        "Anti-stres dejstvo karakteristično za autentičnu tajlandsku biljnu mešavinu",
        "Idealna kombinacija sa tradicionalnom thai masažom",
        "Olakšanje kod hroničnih bolova u leđima i ramenima",
      ],
      techniqueTitle: "Kako izgleda Luk Pra Kob ritual",
      technique:
        "Komprese se zagrevaju u tradicionalnom tajlandskom parnom kazanu. Terapeut zatim radi naizmenično: tehnike tradicionalne tajlandske masaže ručno + dodirivanje, valjanje i pritisak vrelim kompresama duž bolnih tačaka. 90 minuta je optimalno za prvi put, 120 minuta za kompletno iskustvo.",
      compareTitle: "Zašto naša verzija Luk Pra Kob nadmašuje konkurenciju",
      compareBody:
        "Većina spa salona u Beogradu (Siam Spa, Mai Thai Lux, Jai Thai, Lanna Thai, Rei Thailand Massage, Sa-Wan) koristi komprese iz EU sa zamenskim biljem. Mi naručujemo autentične Luk Pra Kob komprese sa originalnim tajlandskim biljkama uvezenim iz Bangkoka, što je razlog zašto je miris i terapeutski efekat potpuno drugačiji.",
      faq: [
        { q: "Šta su tačno Luk Pra Kob komprese?", a: "Pamučne kese pune mešavine tajlandskih biljaka, koje se zagrevaju i prelaze preko tela." },
        { q: "Koliko traje tretman?", a: "90 minuta (5.900 RSD) ili 120 minuta (6.900 RSD)." },
        { q: "Da li je vruće na koži?", a: "Komprese su tople ali ne opekotinski — terapeut konstantno testira temperaturu." },
        { q: "Kada je najbolje primeniti?", a: "U hladnijim mesecima ili kod hroničnih bolova u leđima i ramenima." },
        { q: "Da li je sigurno za sve?", a: "Konsultujte se sa nama ako imate izrazitu kožnu osetljivost ili upalne dermatološke probleme." },
      ],
    },
    en: {
      name: "Thai Herbal Hot Compress",
      title: "Thai Herbal Hot Compress Belgrade · Bua Luang Thai Spa",
      metaDescription:
        "Traditional Thai massage with warm Luk Pra Kob herbal compresses in Belgrade. 90 or 120 minutes of deep therapeutic care.",
      ogDescription:
        "Thai herbal hot compress Belgrade — the ancient Luk Pra Kob ritual with authentic Thai herbs.",
      h1: "Thai Herbal Hot Compress Massage in Belgrade",
      eyebrow: "Luk Pra Kob · Belgrade",
      intro:
        "Luk Pra Kob are warm compresses packed with authentic Thai herbs — lemongrass, kaffir lime, ginger, turmeric and tamarind. Steamed to activate their oils, they are then glided across the body, releasing essential oils through the skin while penetrating deep into muscle tension.",
      benefitsTitle: "What this ritual gives you",
      benefits: [
        "Deep thermotherapy — perfect on cold Belgrade winter days",
        "Anti-inflammatory effect from turmeric and ginger",
        "Strong anti-stress action characteristic of the original Thai herbal mix",
        "Ideal combined with traditional Thai bodywork",
        "Relief for chronic back and shoulder pain",
      ],
      techniqueTitle: "How a Luk Pra Kob session flows",
      technique:
        "The compresses are warmed in a traditional Thai steam pot. The therapist alternates classic Thai hand techniques with rolling, pressing and tapping the hot compresses along painful or tense points. 90 minutes is ideal for a first session; 120 minutes for the full experience.",
      compareTitle: "Why ours outperforms the competition",
      compareBody:
        "Most Belgrade spas (Siam Spa, Mai Thai Lux, Jai Thai, Lanna Thai, Rei Thailand Massage, Sa-Wan) use EU compresses with substitute herbs. We import authentic Luk Pra Kob compresses with original Thai herbs from Bangkok — the difference in scent and therapeutic effect is immediate.",
      faq: [
        { q: "What exactly is Luk Pra Kob?", a: "Cotton pouches filled with a Thai herbal blend, warmed and rolled across the body." },
        { q: "How long?", a: "90 min (5,900 RSD) or 120 min (6,900 RSD)." },
        { q: "Is it too hot on the skin?", a: "Warm, never burning — therapist tests temperature continuously." },
        { q: "When is it ideal?", a: "Cold months, or for chronic back and shoulder pain." },
        { q: "Safe for everyone?", a: "Consult us if you have very sensitive skin or active dermatological issues." },
      ],
    },
    ru: {
      name: "Массаж с Тайскими Тёплыми Травяными Компрессами",
      title: "Тайские травяные компрессы Белград · Bua Luang Thai Spa",
      metaDescription:
        "Традиционный тайский массаж с тёплыми травяными компрессами Luk Pra Kob в Белграде. 90 или 120 минут глубокой терапии.",
      ogDescription:
        "Тайские травяные компрессы в Белграде — древний ритуал Luk Pra Kob с подлинными травами из Таиланда.",
      h1: "Тайский массаж с тёплыми травяными компрессами",
      eyebrow: "Luk Pra Kob · Белград",
      intro:
        "Luk Pra Kob — тёплые компрессы с подлинными тайскими травами: лимонной травой, каффир-лаймом, имбирём, куркумой и тамариндом. Их распаривают, а затем проводят по телу, высвобождая эфирные масла через кожу и глубоко прорабатывая напряжённые мышцы.",
      benefitsTitle: "Эффект ритуала",
      benefits: [
        "Глубокая теплотерапия — идеально холодными зимами в Белграде",
        "Противовоспалительное действие куркумы и имбиря",
        "Сильный антистрессовый эффект",
        "Идеально в сочетании с традиционным тайским массажем",
        "Снятие хронической боли в спине и плечах",
      ],
      techniqueTitle: "Как проходит сеанс",
      technique:
        "Компрессы прогреваются в традиционном тайском пароварочном котле. Мастер чередует классические тайские техники руками и работу горячими компрессами по болевым точкам.",
      compareTitle: "Наше преимущество",
      compareBody:
        "Большинство спа в Белграде (Siam Spa, Mai Thai Lux, Jai Thai, Lanna Thai, Rei Thailand Massage, Sa-Wan) используют европейские компрессы с заменителями. Мы выписываем оригинальные Luk Pra Kob из Бангкока.",
      faq: [
        { q: "Что такое Luk Pra Kob?", a: "Хлопковые мешочки с тайской травяной смесью, прогретые и применяемые по телу." },
        { q: "Длительность?", a: "90 минут (5 900 RSD) или 120 минут (6 900 RSD)." },
        { q: "Не слишком ли горячо?", a: "Тёплый, не обжигающий — мастер контролирует температуру." },
        { q: "Когда лучше всего делать?", a: "В холодные месяцы и при хронических болях в спине." },
        { q: "Подходит всем?", a: "При особо чувствительной коже — проконсультируйтесь заранее." },
      ],
    },
    zh: {
      name: "泰式热草药敷包按摩",
      title: "贝尔格莱德泰式热草药敷包按摩 · Bua Luang Thai Spa",
      metaDescription:
        "贝尔格莱德传统泰式按摩搭配 Luk Pra Kob 热草药敷包。90 或 120 分钟深层疗愈体验。",
      ogDescription: "贝尔格莱德泰式热草药敷包 —— 来自曼谷的正宗草药与古老 Luk Pra Kob 仪式。",
      h1: "贝尔格莱德泰式热草药敷包按摩",
      eyebrow: "Luk Pra Kob · 贝尔格莱德",
      intro:
        "Luk Pra Kob 是装满正宗泰国草药(柠檬草、卡菲尔青柠、姜、姜黄、罗望子)的温热布包,经蒸汽加热后于全身滚动按压,将精油从皮肤释放,同时深入放松紧张肌肉。",
      benefitsTitle: "疗程效果",
      benefits: [
        "深层温热疗愈,贝尔格莱德冬季首选",
        "姜黄与生姜的抗炎作用",
        "强力的抗压舒缓",
        "与传统泰式按摩完美结合",
        "缓解慢性背肩疼痛",
      ],
      techniqueTitle: "疗程流程",
      technique: "草药包先于传统蒸笼内加热,按摩师交替使用泰式按摩手法与敷包滚压。",
      compareTitle: "我们的优势",
      compareBody:
        "贝尔格莱德其他泰式 spa 多用欧产替代草药,我们直接从曼谷进口正宗 Luk Pra Kob,香气与疗效完全不同。",
      faq: [
        { q: "Luk Pra Kob 是什么?", a: "装满泰国草药的棉布包,加热后按压全身。" },
        { q: "时长?", a: "90 分钟 (5,900 RSD) 或 120 分钟 (6,900 RSD)。" },
        { q: "会烫吗?", a: "温热而非灼热,按摩师持续测试温度。" },
        { q: "最佳时机?", a: "寒冷季节或慢性背肩疼痛。" },
        { q: "人人皆宜吗?", a: "敏感肌或皮肤问题请提前告知。" },
      ],
    },
  },
  // ─────────── NECK / HEAD / SHOULDERS ───────────
  "neck-head-shoulders": {
    sr: {
      name: "Masaža Vrata, Glave i Ramena",
      title: "Masaža Vrata, Glave i Ramena Beograd · Bua Luang Thai Spa",
      metaDescription:
        "Brza i efikasna masaža vrata, glave i ramena u Beogradu — savršena protiv 'office syndrome' tegoba. 30, 45 ili 60 minuta.",
      ogDescription:
        "Masaža vrata, glave i ramena u Beogradu — najefikasniji tretman protiv stresa i 'office syndrome' u gradu.",
      h1: "Masaža Vrata, Glave i Ramena u Beogradu",
      eyebrow: "Office syndrome · Beograd",
      intro:
        "Najpopularniji tretman za beogradske profesionalce koji provode previše vremena za laptopom. Kombinacija pritisaka palčevima, pasivnih istezanja i nežne tehnike akupresure direktno tretira napetost koju donosi 'office syndrome'.",
      benefitsTitle: "Šta dobijate iz 30, 45 ili 60 minuta",
      benefits: [
        "Trenutno olakšanje od ukočenosti u vratu i ramenima",
        "Lakše glavobolje (uključujući tenzione i migrenske)",
        "Bolja koncentracija i lakše disanje",
        "Smanjena napetost u čeljusti i licu",
        "Brz, efikasan, izvodi se i obučen (idealan tokom pauze)",
      ],
      techniqueTitle: "Kako se izvodi",
      technique:
        "Klijent sedi ili leži; terapeut radi naizmenično pritisak palčevima na trapezius, masažu lobanje, lagano klizanje duž vrata i posebnu sekvencu istezanja ramena. 30 minuta je 'reset', 45 i 60 minuta su potpuni tretmani.",
      compareTitle: "Najbolja masaža za vrat i ramena u Beogradu",
      compareBody:
        "Mnogi spa centri u Beogradu (Siam Spa, Mai Thai Lux, Jai Thai, Lanna Thai, Rei Thailand Massage, Sa-Wan) nude varijantu ovog tretmana, ali kombinacija autentične tajlandske tehnike sa našim sertifikovanim majstorima daje merljivo bolji rezultat — posebno na hroničnoj zategnutosti.",
      faq: [
        { q: "Koje su opcije trajanja?", a: "30 min (2.500 RSD), 45 min (3.000 RSD), 60 min (3.500 RSD)." },
        { q: "Mogu li da dođem u pauzi za ručak?", a: "Da — 30-minutna opcija je idealna pauza." },
        { q: "Da li se radi obučen?", a: "Da, izvodi se kroz mekanu odeću, bez ulja." },
        { q: "Da li pomaže kod migrene?", a: "Mnogi klijenti prijavljuju značajno olakšanje, posebno kod tenzionih glavobolja." },
        { q: "Koliko često?", a: "Za 'office syndrome' preporučujemo 1x nedeljno tokom prvih mesec dana." },
      ],
    },
    en: {
      name: "Neck, Head & Shoulders Massage",
      title: "Neck Head & Shoulders Massage Belgrade · Bua Luang Thai Spa",
      metaDescription:
        "Quick, effective neck, head and shoulders massage in Belgrade — perfect against office-syndrome tension. 30, 45 or 60 minutes.",
      ogDescription:
        "Neck, head and shoulders massage Belgrade — the city's most effective fix for office-syndrome tension.",
      h1: "Neck, Head & Shoulders Massage in Belgrade",
      eyebrow: "Office syndrome · Belgrade",
      intro:
        "The most popular treatment for Belgrade professionals who spend too long at a laptop. A combination of thumb pressure, passive stretching and acupressure directly targets the tension created by office syndrome.",
      benefitsTitle: "What 30, 45 or 60 minutes give you",
      benefits: [
        "Instant relief from neck and shoulder stiffness",
        "Headache relief — including tension and migraine types",
        "Sharper focus and easier breathing",
        "Reduced jaw and facial tension",
        "Quick, effective, fully clothed — perfect on a break",
      ],
      techniqueTitle: "How it's done",
      technique:
        "Seated or lying; the therapist alternates thumb pressure on trapezius, scalp massage, light gliding along the neck and a dedicated shoulder-stretch sequence. 30 minutes resets you; 45 and 60 minutes are full treatments.",
      compareTitle: "The best neck and shoulder massage in Belgrade",
      compareBody:
        "Many Belgrade spas (Siam Spa, Mai Thai Lux, Jai Thai, Lanna Thai, Rei Thailand Massage, Sa-Wan) offer a version of this treatment, but pairing authentic Thai technique with our certified Thai masters delivers measurably better results on chronic tension.",
      faq: [
        { q: "Duration options?", a: "30 min (2,500 RSD), 45 min (3,000 RSD), 60 min (3,500 RSD)." },
        { q: "Can I come on my lunch break?", a: "Yes — the 30-minute option is the perfect midday reset." },
        { q: "Clothed?", a: "Yes — done through soft clothing, no oil." },
        { q: "Help with migraines?", a: "Many guests report major relief, especially for tension-type headaches." },
        { q: "How often?", a: "For chronic office syndrome, once a week during the first month." },
      ],
    },
    ru: {
      name: "Массаж шеи, головы и плеч",
      title: "Массаж шеи, головы и плеч Белград · Bua Luang Thai Spa",
      metaDescription:
        "Быстрый и эффективный массаж шеи, головы и плеч в Белграде против 'офисного синдрома'. 30, 45 или 60 минут.",
      ogDescription:
        "Массаж шеи и плеч в Белграде — лучший способ снять офисный синдром.",
      h1: "Массаж шеи, головы и плеч в Белграде",
      eyebrow: "Офисный синдром · Белград",
      intro:
        "Самый популярный сеанс у белградских профессионалов, проводящих часы за ноутбуком. Сочетание давления больших пальцев, пассивных растяжек и акупрессуры прямо устраняет напряжение от офисного синдрома.",
      benefitsTitle: "Эффект 30/45/60 минут",
      benefits: [
        "Мгновенно снимается скованность шеи и плеч",
        "Облегчение головной боли (тензионной и мигренозной)",
        "Ясность мышления и свободное дыхание",
        "Снижение напряжения в челюсти и лице",
        "Быстро, в одежде, идеально в обеденный перерыв",
      ],
      techniqueTitle: "Как проходит",
      technique:
        "Сидя или лёжа: давление по трапециям, массаж кожи головы, лёгкое скольжение вдоль шеи, специальная серия растяжек плеч. 30 минут — сброс, 45–60 минут — полный сеанс.",
      compareTitle: "Лучший массаж шеи и плеч в Белграде",
      compareBody:
        "Многие спа в Белграде (Siam Spa, Mai Thai Lux, Jai Thai, Lanna Thai, Rei Thailand Massage, Sa-Wan) предлагают этот сеанс, но в нашем — настоящая тайская техника и сертифицированные мастера.",
      faq: [
        { q: "Длительности?", a: "30 мин (2 500 RSD), 45 мин (3 000 RSD), 60 мин (3 500 RSD)." },
        { q: "Можно в обеденный перерыв?", a: "Да — 30 минут идеально." },
        { q: "Одетым?", a: "Да, через мягкую одежду, без масла." },
        { q: "Помогает при мигрени?", a: "Многие отмечают значительное облегчение, особенно при тензионных болях." },
        { q: "Как часто?", a: "При хроническом офисном синдроме — раз в неделю первый месяц." },
      ],
    },
    zh: {
      name: "颈头肩按摩",
      title: "贝尔格莱德颈头肩按摩 · Bua Luang Thai Spa",
      metaDescription:
        "贝尔格莱德颈、头、肩部按摩,专治办公族紧张综合症。30、45 或 60 分钟可选。",
      ogDescription: "贝尔格莱德颈头肩按摩 —— 解决办公族紧张综合症的最有效方式。",
      h1: "贝尔格莱德颈头肩按摩",
      eyebrow: "办公族综合症 · 贝尔格莱德",
      intro:
        "本疗程是贝尔格莱德专业人士的最爱。结合拇指按压、被动伸展与穴位按摩,直接缓解长时间使用电脑造成的紧张。",
      benefitsTitle: "30 / 45 / 60 分钟效果",
      benefits: [
        "即刻舒缓颈肩僵硬",
        "缓解紧张性头痛与偏头痛",
        "提升专注力与呼吸顺畅度",
        "减轻下颌与面部紧张",
        "快速高效,无需脱衣,适合午休",
      ],
      techniqueTitle: "疗程流程",
      technique:
        "坐姿或卧姿;按摩师交替按压斜方肌、头皮按摩、颈部滑动及专属肩部伸展。30 分钟为快速重启,45–60 分钟为完整疗程。",
      compareTitle: "贝尔格莱德最佳颈肩按摩",
      compareBody:
        "其他贝尔格莱德 spa 虽然也提供该疗程,但我们结合正宗泰式手法与认证泰国按摩师,效果显著更佳。",
      faq: [
        { q: "时长选择?", a: "30 分钟 (2,500 RSD)、45 分钟 (3,000 RSD)、60 分钟 (3,500 RSD)。" },
        { q: "午休可以做吗?", a: "可以 —— 30 分钟最理想。" },
        { q: "需要脱衣吗?", a: "不需要,着柔软衣物,不使用精油。" },
        { q: "对偏头痛有效?", a: "许多客人对紧张性头痛反应良好。" },
        { q: "频率?", a: "慢性办公综合症首月每周一次。" },
      ],
    },
  },
  // ─────────── DEEP TISSUE ───────────
  "deep-tissue": {
    sr: {
      name: "Deep Tissue Masaža",
      title: "Deep Tissue Masaža Beograd · Bua Luang Thai Spa",
      metaDescription:
        "Deep tissue masaža u Beogradu sa sertifikovanim tajlandskim terapeutima. Trenutno olakšanje kod hroničnih bolova u leđima i mišićnih zategnutosti.",
      ogDescription:
        "Deep tissue masaža Beograd — najjača tehnika za hronične mišićne bolove i sportiste.",
      h1: "Deep Tissue Masaža u Beogradu",
      eyebrow: "Duboki rad · Beograd",
      intro:
        "Deep tissue masaža je tretman za one koji žele snažan, ciljan rad na dubokim slojevima mišićnog tkiva i fascije. Idealna je za sportiste, ljude sa hroničnim bolovima u leđima i one koji žele osloboditi 'čvorove' nakupljene mesecima ili godinama.",
      benefitsTitle: "Šta postiže ovaj tretman",
      benefits: [
        "Oslobađanje hroničnih mišićnih čvorova",
        "Brži oporavak posle treninga i fizičkog napora",
        "Trajno olakšanje kod posturalnih bolova u leđima",
        "Bolji opseg pokreta u zglobovima",
        "Snažan kombo sa biljnim kompresama",
      ],
      techniqueTitle: "Kako se izvodi",
      technique:
        "Terapeut radi sporim, namernim pritiskom dlanovima, laktovima i palčevima na specifične bolne tačke i napregnute mišićne grupe. Pre tretmana razgovaramo o vašim 'hot spot' tačkama i šta želite da postignete.",
      compareTitle: "Deep tissue masaža u Beogradu — kvalitet rada",
      compareBody:
        "U poređenju sa konkurencijom (Siam Spa, Mai Thai Lux, Jai Thai, Lanna Thai, Rei Thailand Massage, Sa-Wan), naši sertifikovani tajlandski terapeuti imaju formalno obrazovanje iz tradicionalne tajlandske medicine što im omogućava bezbedno i efikasno raditi na dubokim slojevima.",
      faq: [
        { q: "Da li boli?", a: "Pritisak je snažan ali kontrolisan. Klijentovo 'pain edge' osećanje uvek konsultujemo." },
        { q: "Koliko traje?", a: "60 minuta (4.500 RSD) ili 90 minuta (5.500 RSD)." },
        { q: "Da li se koriste ulja?", a: "Da, za bolji klizajući rad na dubokom tkivu." },
        { q: "Najbolje vreme?", a: "Posle treninga ili u danima sa povećanim stresom." },
        { q: "Da li je za prvu posetu?", a: "Bolje je da prva poseta bude aroma ili tradicionalna; deep tissue u drugom dolasku." },
      ],
    },
    en: {
      name: "Deep Tissue Massage",
      title: "Deep Tissue Massage Belgrade · Bua Luang Thai Spa",
      metaDescription:
        "Deep tissue massage in Belgrade by certified Thai therapists. Instant relief for chronic back pain and muscle tension.",
      ogDescription: "Deep tissue massage Belgrade — strongest technique for chronic tension and athletes.",
      h1: "Deep Tissue Massage in Belgrade",
      eyebrow: "Deep work · Belgrade",
      intro:
        "Deep tissue massage targets the deepest muscle layers and fascia with strong, intentional work. Ideal for athletes, people with chronic back pain and anyone wanting to release knots accumulated over months.",
      benefitsTitle: "What this session delivers",
      benefits: [
        "Release of chronic muscle knots",
        "Faster post-training recovery",
        "Lasting relief from postural back pain",
        "Improved joint range of motion",
        "Powerful combo with herbal compress",
      ],
      techniqueTitle: "How it's done",
      technique:
        "The therapist applies slow, intentional pressure with palms, elbows and thumbs on specific pain points. We discuss your hot spots and goals before starting.",
      compareTitle: "Deep tissue in Belgrade — quality of work",
      compareBody:
        "Compared to other Belgrade spas (Siam Spa, Mai Thai Lux, Jai Thai, Lanna Thai, Rei Thailand Massage, Sa-Wan), our certified Thai therapists hold formal traditional-medicine credentials, enabling safe yet powerful deep work.",
      faq: [
        { q: "Does it hurt?", a: "Pressure is strong but controlled — we stay at your 'edge', never past it." },
        { q: "Duration?", a: "60 min (4,500 RSD) or 90 min (5,500 RSD)." },
        { q: "Oils used?", a: "Yes, for smoother work on deep tissue." },
        { q: "Best moment?", a: "Post-training or in high-stress weeks." },
        { q: "Good for a first visit?", a: "We recommend aroma or traditional first; deep tissue on your second visit." },
      ],
    },
    ru: {
      name: "Глубокий тканевый массаж",
      title: "Deep tissue массаж Белград · Bua Luang Thai Spa",
      metaDescription:
        "Deep tissue массаж в Белграде у сертифицированных тайских мастеров. Мгновенное облегчение хронической боли и мышечного напряжения.",
      ogDescription: "Deep tissue массаж Белград — самая мощная техника для хронического напряжения и спортсменов.",
      h1: "Deep tissue массаж в Белграде",
      eyebrow: "Глубокая работа · Белград",
      intro:
        "Deep tissue — мощный сеанс на глубоких слоях мышц и фасции. Идеально для спортсменов, людей с хронической болью в спине и тех, кто хочет освободить 'узлы', накопленные месяцами.",
      benefitsTitle: "Что даёт сеанс",
      benefits: [
        "Освобождение хронических узлов",
        "Быстрое восстановление после тренировок",
        "Длительное снятие постуральной боли",
        "Большая подвижность суставов",
        "Идеально в паре с компрессами",
      ],
      techniqueTitle: "Как проходит",
      technique:
        "Мастер работает медленным точечным давлением — ладонями, локтями, большими пальцами — по конкретным точкам напряжения.",
      compareTitle: "Качество работы в Белграде",
      compareBody:
        "По сравнению с конкурентами (Siam Spa, Mai Thai Lux, Jai Thai, Lanna Thai, Rei Thailand Massage, Sa-Wan) наши мастера имеют сертификаты традиционной тайской медицины — глубокая работа безопасна и эффективна.",
      faq: [
        { q: "Больно?", a: "Сильно, но под контролем. Работаем до вашей грани, не за неё." },
        { q: "Длительность?", a: "60 мин (4 500 RSD) или 90 мин (5 500 RSD)." },
        { q: "Используются масла?", a: "Да, для глубокого скольжения." },
        { q: "Лучшее время?", a: "После тренировок и в стрессовые недели." },
        { q: "Для первого визита?", a: "Сначала аромат или традиционный, deep tissue — на втором." },
      ],
    },
    zh: {
      name: "深层组织按摩",
      title: "贝尔格莱德深层组织按摩 · Bua Luang Thai Spa",
      metaDescription:
        "贝尔格莱德深层组织按摩,由认证泰国按摩师执行。即刻缓解慢性背痛与肌肉紧张。",
      ogDescription: "贝尔格莱德深层组织按摩 —— 针对慢性紧张与运动员的最强力技法。",
      h1: "贝尔格莱德深层组织按摩",
      eyebrow: "深层疗愈 · 贝尔格莱德",
      intro:
        "深层组织按摩针对最深层的肌肉与筋膜,强力而有针对性。适合运动员、慢性背痛人群及希望释放长期累积结节的人。",
      benefitsTitle: "本疗程效果",
      benefits: [
        "释放慢性肌肉结节",
        "加快运动恢复",
        "缓解姿势性背痛",
        "提升关节活动范围",
        "与草药敷包结合效果更佳",
      ],
      techniqueTitle: "疗程流程",
      technique: "按摩师以掌、肘、拇指缓慢有目的地按压关键紧张点,疗前先讨论您的需求。",
      compareTitle: "贝尔格莱德深层组织品质",
      compareBody:
        "我们的认证泰国按摩师拥有传统泰医正规资格,深层力度安全且有效。",
      faq: [
        { q: "会很痛吗?", a: "强而有度。我们停在'临界点',不超出。" },
        { q: "时长?", a: "60 分钟 (4,500 RSD) 或 90 分钟 (5,500 RSD)。" },
        { q: "用精油吗?", a: "使用,以利深层滑动。" },
        { q: "最佳时机?", a: "训练后或压力大的一周。" },
        { q: "首次到访?", a: "建议首次选择芳香或传统,深层组织放第二次。" },
      ],
    },
  },
  // ─────────── FOOT MASSAGE ───────────
  "foot-massage": {
    sr: {
      name: "Masaža Stopala",
      title: "Masaža Stopala Beograd · Bua Luang Thai Spa",
      metaDescription:
        "Tajlandska masaža stopala u Beogradu sa refleksološkim mapiranjem. 30, 45 ili 60 minuta dubokog opuštanja celog tela kroz stopala.",
      ogDescription:
        "Masaža stopala Beograd — refleksologija + autentična tajlandska tehnika u luksuznom ambijentu.",
      h1: "Masaža Stopala u Beogradu",
      eyebrow: "Refleksologija · Beograd",
      intro:
        "Tajlandska masaža stopala je sofisticirana kombinacija refleksologije i tradicionalne tajlandske tehnike. Pritisak na specifične zone stopala stimuliše ceo organizam, donoseći dubinski osećaj relaksacije koji se širi celim telom.",
      benefitsTitle: "Šta dobijate",
      benefits: [
        "Aktivacija refleksoloških zona i stimulacija organa",
        "Trenutno opuštanje umornih, otečenih nogu",
        "Bolja cirkulacija i smanjeno otekanje",
        "Idealan tretman za one koji puno hodaju ili stoje",
        "Diskretan, izvodi se obučen — sjajan za pauzu",
      ],
      techniqueTitle: "Kako izgleda tretman",
      technique:
        "Sedeli ili poluležeći u luksuznoj refleksološkoj fotelji, terapeut izvodi sekvencu pritisaka palčevima, masažu sa specijalnim drvenim štapićem (tradicionalni tajlandski alat) i klizajuće pokrete uljem. Cilj je da svaka zona stopala koja odgovara konkretnom organu bude precizno tretirana.",
      compareTitle: "Najautentičnija masaža stopala u Beogradu",
      compareBody:
        "Konkurencija u Beogradu (Siam Spa, Mai Thai Lux, Jai Thai, Lanna Thai, Rei Thailand Massage, Sa-Wan) često nudi 'tajlandsku' masažu stopala koja se zapravo svodi na običnu refleksologiju. Mi koristimo originalni tajlandski drveni štapić i tehniku koja se prenosi generacijama, što daje merljivo bolji rezultat.",
      faq: [
        { q: "Trajanje?", a: "30 min (2.500 RSD), 45 min (3.000 RSD), 60 min (3.500 RSD)." },
        { q: "Da li je dobra posle dugog dana hodanja?", a: "Idealna — gosti često dolaze posle Knez Mihajlove ili posla na nogama." },
        { q: "Da li je opuštajuća za ceo organizam?", a: "Da, refleksološki pritisci utiču direktno na unutrašnje organe i nervni sistem." },
        { q: "Da li su stopala bolna posle?", a: "Ne — kraju tretmana se osećate izuzetno lagano." },
        { q: "Da li mogu da kombinujem sa drugim tretmanom?", a: "Da, najlepše ide nakon aroma ili tradicionalne masaže." },
      ],
    },
    en: {
      name: "Foot Massage",
      title: "Foot Massage Belgrade · Bua Luang Thai Spa",
      metaDescription:
        "Thai foot massage in Belgrade with reflexology mapping. 30, 45 or 60 minutes of full-body relaxation through the feet.",
      ogDescription: "Foot massage Belgrade — reflexology + authentic Thai technique in a luxury setting.",
      h1: "Thai Foot Massage in Belgrade",
      eyebrow: "Reflexology · Belgrade",
      intro:
        "Thai foot massage is a sophisticated blend of reflexology and traditional Thai technique. Targeted pressure on specific foot zones stimulates the entire body, delivering full-body relaxation that radiates outward.",
      benefitsTitle: "What you get",
      benefits: [
        "Reflex zone activation, organ stimulation",
        "Immediate relief for tired or swollen legs",
        "Better circulation and reduced swelling",
        "Ideal for people who walk or stand a lot",
        "Discreet, fully clothed — great on a break",
      ],
      techniqueTitle: "What the session looks like",
      technique:
        "Seated or reclined in a luxury reflexology chair, the therapist works thumb pressure, a traditional Thai wooden stick on key reflex points, and oil glides. Every foot zone tied to a specific organ is precisely treated.",
      compareTitle: "Most authentic foot massage in Belgrade",
      compareBody:
        "Belgrade competitors (Siam Spa, Mai Thai Lux, Jai Thai, Lanna Thai, Rei Thailand Massage, Sa-Wan) often label generic reflexology as a 'Thai foot massage'. We use the original wooden stick and lineage-passed technique — the result is measurably deeper.",
      faq: [
        { q: "Duration?", a: "30 min (2,500 RSD), 45 min (3,000 RSD), 60 min (3,500 RSD)." },
        { q: "Good after a day of walking?", a: "Perfect — guests come right after Knez Mihailova or a day on their feet." },
        { q: "Full-body effect?", a: "Yes — reflex pressure influences internal organs and nervous system." },
        { q: "Sore afterwards?", a: "No — you leave feeling unusually light." },
        { q: "Combine with another treatment?", a: "Yes — beautiful right after aroma or traditional." },
      ],
    },
    ru: {
      name: "Массаж стоп",
      title: "Массаж стоп Белград · Bua Luang Thai Spa",
      metaDescription:
        "Тайский массаж стоп в Белграде с рефлексологическим картированием. 30, 45 или 60 минут полного расслабления через стопы.",
      ogDescription: "Массаж стоп в Белграде — рефлексология + аутентичная тайская техника.",
      h1: "Тайский массаж стоп в Белграде",
      eyebrow: "Рефлексология · Белград",
      intro:
        "Тайский массаж стоп — изысканное сочетание рефлексологии и тайской техники. Направленное давление на зоны стоп стимулирует весь организм и приводит к глубокому расслаблению.",
      benefitsTitle: "Эффект",
      benefits: [
        "Активация рефлексогенных зон",
        "Мгновенное облегчение усталым стопам",
        "Лучшая циркуляция, меньше отёков",
        "Идеально, если много ходите или стоите",
        "В одежде, удобно в перерыве",
      ],
      techniqueTitle: "Как проходит",
      technique:
        "Сидя или полулёжа в рефлексологическом кресле, мастер работает давлением больших пальцев, традиционной тайской деревянной палочкой и масляными скольжениями.",
      compareTitle: "Самый аутентичный массаж стоп в Белграде",
      compareBody:
        "Многие в Белграде (Siam Spa, Mai Thai Lux, Jai Thai, Lanna Thai, Rei Thailand Massage, Sa-Wan) выдают обычную рефлексологию за 'тайский массаж стоп'. У нас — оригинальная техника и инструмент.",
      faq: [
        { q: "Длительность?", a: "30 мин (2 500 RSD), 45 мин (3 000 RSD), 60 мин (3 500 RSD)." },
        { q: "После долгой ходьбы?", a: "Идеально." },
        { q: "Эффект на весь организм?", a: "Да, через рефлексогенные зоны." },
        { q: "Будет больно потом?", a: "Нет — ощущение лёгкости." },
        { q: "Сочетать с другим сеансом?", a: "Прекрасно после аромата или традиционного." },
      ],
    },
    zh: {
      name: "足部按摩",
      title: "贝尔格莱德足部按摩 · Bua Luang Thai Spa",
      metaDescription:
        "贝尔格莱德泰式足部按摩搭配反射区图谱。30、45 或 60 分钟通过足底带来全身深度放松。",
      ogDescription: "贝尔格莱德足部按摩 —— 反射学结合正宗泰式手法。",
      h1: "贝尔格莱德泰式足部按摩",
      eyebrow: "反射学 · 贝尔格莱德",
      intro:
        "泰式足部按摩融合反射学与传统泰式技法,对足部特定反射区施压可刺激全身,带来由内而外的深度放松。",
      benefitsTitle: "疗程效果",
      benefits: [
        "激活反射区,刺激内脏",
        "立刻缓解疲倦双腿",
        "改善循环、减轻水肿",
        "适合长时间步行或站立人士",
        "全程着衣,适合午休",
      ],
      techniqueTitle: "疗程流程",
      technique: "坐姿或半躺,按摩师以拇指按压、传统泰式木棒及精油滑动作用于足底。",
      compareTitle: "贝尔格莱德最正宗的足部按摩",
      compareBody:
        "其他贝尔格莱德 spa 多以普通反射学冒充泰式足底,我们使用原装木棒与传承技法。",
      faq: [
        { q: "时长?", a: "30 分钟 (2,500 RSD)、45 分钟 (3,000 RSD)、60 分钟 (3,500 RSD)。" },
        { q: "走累后适合吗?", a: "非常适合。" },
        { q: "影响全身吗?", a: "通过反射区影响内脏与神经系统。" },
        { q: "之后会疼吗?", a: "不会,反而轻盈。" },
        { q: "可与其他疗程组合?", a: "可以,与芳香或传统按摩衔接最美。" },
      ],
    },
  },
};
