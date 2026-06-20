import React from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/seo/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ChatFloater } from "@/components/ChatFloater";
import { Reveal } from "@/components/Reveal";
import { HOME_PATH, SERVICE_PATH, SERVICE_CONTENT } from "@/seo/services";
import { ChevronRight, Phone } from "lucide-react";

/**
 * Long-form Serbian SEO landing page — `/sr/o-tajlandskoj-masazi-beograd`.
 *
 * Linked from the footer to feed Google with 2,500+ words of dense, semantic
 * content covering: history of Thai massage, why authenticity matters, the
 * Bua Luang brand promise, an organic comparison to the local competitive
 * landscape (Siam Spa, Mai Thai Lux, Jai Thai, Lanna Thai, Rei, Sa-Wan), a
 * full menu walk-through, ambiance & rituals, FAQ (15 questions) and a final
 * conversion CTA. The homepage stays minimal-luxury; this page is the SEO
 * workhorse.
 */

const FAQ = [
  {
    q: "Šta čini tradicionalnu tajlandsku masažu drugačijom od švedske ili klasične relax masaže?",
    a: "Tradicionalna tajlandska masaža kombinuje akupresurne pritiske duž Sen energetskih linija sa pasivnim istezanjima inspirisanim jogom. Radi se kroz pamučnu odeću, na dušeku, bez ulja. Švedska masaža koristi duge klizajuće pokrete preko ulja na masažnom stolu i fokusira se uglavnom na površinske mišićne grupe. Razlika u dubini efekta je dramatična — posle 90 minuta autentične tajlandske masaže klijenti prijavljuju osećaj kao posle nedelje odmora.",
  },
  {
    q: "Zašto sve više Beograđana bira tajlandsku masažu umesto klasičnih wellness opcija?",
    a: "Beograd ima rastuću populaciju zahtevnih profesionalaca koji traže tretmane sa merljivim rezultatima — ne samo opuštanje, već stvarnu telesnu i mentalnu transformaciju. Tajlandska masaža istovremeno rešava stres, postupralne probleme, hroničnu zategnutost i kvalitet sna. To je razlog zašto je u poslednje tri godine porasla potražnja u svim spa salonima u gradu, uključujući Bua Luang Thai Spa, Siam Spa, Mai Thai Lux, Jai Thai, Lanna Thai, Rei Thailand Massage i Sa-Wan.",
  },
  {
    q: "Kako razlikujem autentični tajlandski spa od kopije?",
    a: "Tri ključna pokazatelja: 1) Terapeuti — pravi tajlandski spa zapošljava terapeute direktno iz Tajlanda sa formalnim sertifikatima iz tradicionalne tajlandske medicine. 2) Oprema — autentični dušek, drveni štapić za refleksologiju, originalne Luk Pra Kob komprese uvezene iz Tajlanda. 3) Ritual — od pozdrava (wai), preko toplog čaja pre tretmana, do posebnog tempa i tišine tokom rada.",
  },
  {
    q: "Da li je tajlandska masaža sigurna za starije osobe?",
    a: "Da, uz prilagođen pritisak i izbor tehnike. Aroma masaža i masaža stopala su izuzetno popularne kod beogradskih klijenata u 60-im i 70-im godinama jer kombinuju nežan pristup sa velikim terapeutskim efektom. Tradicionalna tajlandska masaža i deep tissue se prilagođavaju u dogovoru sa terapeutom.",
  },
  {
    q: "Šta da ne radim pre tretmana?",
    a: "Izbegavajte obilan obrok dva sata pre tretmana, ne dolazite gladni (popijte čaj ili pojedite nešto lagano sat ranije), i ako koristite kreme/ulja na koži, najbolje ih nemojte koristiti pred tajlandsku ili deep tissue masažu. Tuširanje pre dolaska je preporučljivo.",
  },
  {
    q: "Da li mogu da donesem partnera za masažu za parove u Beogradu?",
    a: "Da. Masaža za parove je jedan od najtraženijih ritual u Bua Luang Thai Spa — dva terapeuta rade istovremeno u istoj prostoriji, sa istom tehnikom (klasično: aroma + aroma ili tradicionalna + tradicionalna). Idealno za godišnjicu, rođendan ili poklon iznenađenja.",
  },
  {
    q: "Koliko često je preporučljivo dolaziti?",
    a: "Za održavanje opuste tela i smanjenje stresa preporučujemo 1x mesečno. Ako rešavate konkretan problem (hronični bol u leđima, 'office syndrome', priprema za maraton/sportski događaj) — 1x nedeljno tokom prve 3 do 4 nedelje, zatim ređe. Mnogi naši stalni klijenti dolaze 2x mesečno kao deo personalne rutine.",
  },
  {
    q: "Mogu li da koristim spa kao poklon vaučer?",
    a: "Naravno. Poklon vaučeri za bilo koji tretman su odlična ideja za rođendan, godišnjicu, korporativni poklon ili Dan zaljubljenih. Pišite nam direktno i pripremićemo vam personalizovan luxury voucher u zlatnom dizajnu.",
  },
  {
    q: "Da li ostvarujem popust ako kupim paket više tretmana?",
    a: "Da, naši loyalty paketi (5+1 i 10+2) donose najbolju vrednost po tretmanu. Detalje paketa najbolje je pogledati uživo u salonu jer pravimo personalizovane kombinacije po vašem ritmu dolaska.",
  },
  {
    q: "Da li je dozvoljen parking?",
    a: "Ulica u kojoj se salon nalazi ima i ulični i podzemni parking u okolini. Detaljne instrukcije šaljemo zajedno sa potvrdom termina.",
  },
  {
    q: "Kako se zakazuje termin?",
    a: "Najpogodnije online preko forme na sajtu — radno vreme za rezervacije je 10:00–22:00, poslednji termin je u 21:00. Sistem vam šalje potvrdu na email zajedno sa .ics kalendar dodatkom za jedan klik dodavanja u Google ili Apple kalendar. Alternativa je telefonski poziv ili WhatsApp/Viber kontakt.",
  },
  {
    q: "Da li se može masaža uraditi tokom trudnoće?",
    a: "U drugom trimestru, uz konsultaciju ginekologa, postoji bezbedan protokol za aroma masažu i masažu stopala. Tradicionalna tajlandska, deep tissue i biljne komprese nisu preporučljive tokom trudnoće.",
  },
  {
    q: "Šta nositi za vreme tretmana?",
    a: "Za tradicionalnu tajlandsku, deep tissue i masažu vrata/glave/ramena dobijate naš pamučni komplet. Za aroma masažu i masažu stopala se koristi ulje pa se radi delimično pokriven peškirom. Donji veš ostaje na vama. Kompletna privatnost je obezbeđena.",
  },
  {
    q: "Da li ćemo biti gledani od strane drugih klijenata?",
    a: "Ne. Naš prostor je dizajniran sa privatnim kabinama i izolovanim prijemom. Vaše iskustvo je strogo intimno.",
  },
  {
    q: "Da li primate korporativne klijente?",
    a: "Da. Pravimo personalizovane korporativne pakete za hotele, advokatske kancelarije, IT kompanije i kreativne agencije iz Beograda. Pišite nam za ponudu prilagođenu vašem timu.",
  },
];

export const MasterSEOPage = () => {
  const path = "/sr/o-tajlandskoj-masazi-beograd";
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Početna", item: HOME_PATH.sr },
      { "@type": "ListItem", position: 2, name: "O tajlandskoj masaži", item: path },
    ],
  };

  return (
    <>
      <SEOHead
        title="O tajlandskoj masaži u Beogradu · Vodič Bua Luang Thai Spa"
        description="Sve što treba da znate o tajlandskoj masaži u Beogradu — istorija, tehnike, ko su pravi tajlandski terapeuti i zašto je Bua Luang Thai Spa novi standard."
        ogDescription="Master vodič kroz tajlandsku masažu u Beogradu — autentičnost, terapeuti, ritual, cene i poređenje sa konkurencijom."
        canonical={path}
        lang="sr"
        alternates={[{ lang: "sr", href: path }]}
        jsonLd={[faqSchema, breadcrumb]}
      />
      <Navigation />

      <main className="pt-24 pb-20 bg-gradient-to-b from-[#fbf3dc] via-[#f8edd4] to-[#fbf3dc]">
        <article className="max-w-3xl mx-auto px-6 sm:px-10 prose-lg">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="text-xs tracking-[0.22em] uppercase text-[#7a6e5e] flex items-center gap-2 mb-6">
            <Link to={HOME_PATH.sr} className="hover:text-[#a17a35]">Početna</Link>
            <ChevronRight className="h-3 w-3 text-[#a17a35]" />
            <span className="text-[#2b2620]">O tajlandskoj masaži</span>
          </nav>

          <Reveal>
            <h1
              className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] bg-gradient-to-br from-[#c9a45a] via-[#a17a35] to-[#7a5a22] bg-clip-text text-transparent mb-6"
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
            >
              Tajlandska masaža u Beogradu — sve što treba da znate
            </h1>
            <p className="text-[#5a4f44] text-lg leading-[1.85] font-light">
              Tajlandska masaža u Beogradu je u poslednjih nekoliko godina prerasla iz egzotične opcije
              u standardni deo wellness rutine sofisticiranih klijenata. U ovom vodiču objašnjavamo zašto,
              kako prepoznati pravi tajlandski spa, šta tačno možete očekivati od tretmana — i kako se
              <strong> Bua Luang Thai Spa </strong> pozicionira kao novi standard autentičnosti u srcu Beograda.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-3xl mt-12 mb-4 text-[#2b2620]">Šta je zapravo tajlandska masaža?</h2>
            <p>
              Tradicionalna tajlandska masaža (na tajlandskom <em>Nuad Bo-Rarn</em> ili <em>Nuad Thai</em>)
              je oblik telesnog rada koji se razvija u Tajlandu već više od 2.500 godina. Njena teorijska
              osnova oslanja se na drevni indijski koncept energetskih kanala koji se kod Tajlanđana
              nazivaju <strong>Sen linije</strong>. Postoji deset glavnih Sen linija koje prolaze kroz telo,
              a terapeut tokom tretmana metodičnim pritiscima dlanovima, palčevima, laktovima, kolenima i
              stopalima oslobađa blokade duž ovih kanala. Cilj nije samo površno opuštanje mišića — već
              ponovna uspostava protoka životne energije <em>lom pran</em>.
            </p>
            <p>
              Drugi karakterističan element tajlandske masaže je <strong>pasivno istezanje</strong>. Tokom
              90-minutnog tretmana, vaše telo prolazi kroz seriju asana inspirisanih jogom — ali ne morate
              vi sami da ulažete napor. Terapeut vas pažljivo postavlja u poze, drži ih nekoliko diranja
              i vraća. Rezultat: izrazito povećana fleksibilnost, otvoreni zglobovi i osećaj kao da ste
              upravo završili sat joge bez napora.
            </p>
            <p>
              Treći element je <strong>ritam</strong>. Tajlandski terapeuti rade u veoma konkretnoj
              ritmičkoj sekvenci koja podseća na meditativnu praksu. Tretman počinje od stopala,
              ide naviše kroz noge, leđa, ramena, vrat i završava na glavi i licu. Ova putanja prati
              sequence u kojoj se Sen linije najefikasnije aktiviraju. Upravo zato je <strong>thai massage Belgrade </strong>
              iskustvo koje se razlikuje od bilo koje druge masaže koju ste do sada probali.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-3xl mt-12 mb-4 text-[#2b2620]">Zašto je važno gde se masaža radi</h2>
            <p>
              Mnogi beogradski klijenti su nam u poslednjih godinu dana ispričali isti scenario:
              prijatelj im je preporučio "tajlandski spa", otišli su, dobili nešto što je tehnički
              bila masaža sa ovlaš tajlandskim akcentima, i izašli su razočarani. Razlog leži u
              suštinskoj razlici između <strong>kopije</strong> i <strong>autentičnog spa centra</strong>.
              Nadalje navodimo šta pravi <strong>thai spa Belgrade</strong> mora da ima:
            </p>
            <ul className="space-y-2 my-6 text-[#3a312a]">
              <li><strong>Terapeute direktno iz Tajlanda.</strong> Ne sa kursom od dve nedelje u Beogradu — već sa formalnim sertifikatima iz tradicionalne tajlandske medicine, koji su godinama proveli učeći tehniku u manastirima i institutima u Bangkoku, Čijang Maju ili Najtoy.</li>
              <li><strong>Originalnu opremu.</strong> Dušek umesto stola, pamučni komplet za klijenta, drveni štapić za refleksologiju, Luk Pra Kob komprese punjene autentičnim tajlandskim biljem uvezenim iz Tajlanda.</li>
              <li><strong>Ritualni prijem.</strong> Topli čaj na dolasku, kratak razgovor o vašim potrebama, mir u prostoru, miris koji odmah signalizira mozgu "odlaziš iz Beograda".</li>
              <li><strong>Tišinu.</strong> Ne pozadinski TV, ne reklamne playliste — već autentičnu tajlandsku ambijentalnu muziku ili tišinu sa zvukom vode.</li>
            </ul>
            <p>
              Ovo nije sitničavost — to je razlog zašto neki klijenti posle prve tajlandske masaže
              kažu "to je bilo neverovatno", a drugi kažu "ne razumem zašto se ovde pravi takva
              halabuka". Razlika je u 100% ispoštovanom ili 60% odglumljenom ritualu.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-3xl mt-12 mb-4 text-[#2b2620]">Bua Luang Thai Spa — naš standard</h2>
            <p>
              <strong>Bua Luang</strong> u prevodu sa tajlandskog znači "zlatni lotus" — simbol koji u tajlandskoj
              kulturi predstavlja čistotu, prosvetljenje i unutrašnji mir. Salonu smo dali to ime jer je
              cela naša koncepcija fokusirana na to da svaki klijent koji prođe kroz naša vrata oseti
              isti onaj osećaj koji se doživljava na obali Mae Hong Sona u zoru — punu tišinu, mirisne
              biljke u vazduhu i osećaj da postoji vreme van vremena.
            </p>
            <p>
              Naši terapeuti su <strong>isključivo Tajlanđani</strong> sa formalnim sertifikatima iz tradicionalne
              tajlandske medicine. Pre nego što su došli u Beograd, godinama su radili u premium spa
              centrima u Bangkoku i Čijang Maju. Govore engleski i osnovni srpski, i znaju da prilagode
              pritisak preciznosti koja je nužna kako za zahtevne sportiste tako i za nežniju klijentelu.
            </p>
            <p>
              Ambijent je dizajniran u <strong>light luxury</strong> estetici — kremasta paleta sa zlatnim
              akcentima, mekano osvetljenje, autentični tajlandski elementi (Buda statua, lotus motivi,
              mirisne sveće sa esencijalnim uljima) i bogata tekstura prirodnih materijala (lan, pamuk,
              drvo). To je daleko od standardnog kliničkog wellness centra — ovde dolazite kao u luksuznu
              residenciju.
            </p>
            <p>
              Pripreme za svaki tretman traju duže nego što gost vidi. Ulja se mešaju pred svaki tretman,
              komprese se par voljom zagrevaju u tradicionalnom kazanu, prostorija se peni autentičnim
              mirisom prema gostovom raspoloženju. Mali ali presudan detalj: pre svake masaže gost
              dobija topli čaj od limuna trave i biljnu pripremu — to je tajlandski standard kojeg se
              ne odričemo ni u jednom danu.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-3xl mt-12 mb-4 text-[#2b2620]">Kompletna ponuda tretmana</h2>
            <p>
              Naša menija pokriva ceo spektar autentičnih tajlandskih tretmana. Svaki tretman ima
              jasnu cenu, jasno trajanje i jasnu specijalizaciju. Klikom na bilo koji link ispod
              otvarate detaljnu landing stranicu sa specifikacijama, benefitima, FAQ i CTA za
              direktno zakazivanje.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 my-6">
              {Object.entries(SERVICE_CONTENT).map(([slug, langs]) => {
                const c = langs.sr;
                return (
                  <li key={slug}>
                    <Link
                      to={`${SERVICE_PATH.sr}/${slug}`}
                      className="block rounded-xl bg-white/80 border border-[rgba(161,122,53,0.22)] p-4 hover:shadow-md transition-shadow"
                    >
                      <span className="block text-[10px] tracking-[0.3em] uppercase text-[#a17a35]">{c.eyebrow}</span>
                      <span className="block text-sm font-medium text-[#2b2620] mt-1">{c.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p>
              <strong>Tradicionalna tajlandska masaža</strong> (60 min — 4.500 RSD, 90 min — 5.500 RSD) je naš
              klasik — preporučujemo je svim prvim klijentima koji žele da osete originalni tajlandski
              ritual u punom obimu. <strong>Aroma masaža</strong> (60 min — 4.300 RSD, 90 min — 5.300 RSD) je
              najpogodnija za pristup pun mira i mirisa — savršena posle stresne nedelje. <strong>Masaža sa
              toplim tajlandskim biljnim kompresama</strong> (90 min — 5.900 RSD, 120 min — 6.900 RSD) je naš
              najupečatljiviji wellness ritual; idealan tokom hladnih meseci u Beogradu i kod hroničnih
              bolova u leđima ili ramenima.
            </p>
            <p>
              Za zauzete profesionalce koji žele brz i efikasan reset preporučujemo <strong>Masažu vrata, glave
              i ramena</strong> (30 min — 2.500 RSD, 45 min — 3.000 RSD, 60 min — 3.500 RSD) ili <strong>Masažu stopala</strong>
              (iste cene/trajanja). Oba ova tretmana se izvode obučeni i izvanredna su opcija za pauzu
              tokom radnog dana. Konačno, <strong>Deep Tissue masaža</strong> (60 min — 4.500 RSD, 90 min — 5.500 RSD)
              je za one koji žele snažan, ciljan rad na hroničnim mišićnim čvorovima i za sportiste u
              fazi oporavka.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-3xl mt-12 mb-4 text-[#2b2620]">Zašto izabrati Bua Luang Thai Spa</h2>
            <p>
              Konkurencija u domenu tajlandske masaže u Beogradu raste iz godine u godinu — što je
              odlično za grad i za klijente. U poređenju sa ostalim spa salonima u Beogradu kao što
              su <strong>Siam Spa</strong>, <strong>Mai Thai Lux</strong>, <strong>Jai Thai</strong>, <strong>Lanna Thai</strong>,
              <strong> Rei Thailand Massage</strong>, ili <strong>Sa-Wan</strong>, salon Bua Luang postavlja
              novi standard autentičnosti kroz tri ključne dimenzije:
            </p>
            <ol className="space-y-2 my-6 text-[#3a312a]">
              <li><strong>1. Sertifikovani tajlandski terapeuti</strong> — direktno iz Tajlanda, sa formalnim
                obrazovanjem u tradicionalnoj tajlandskoj medicini, ne iz dvonedeljnih lokalnih kurseva.</li>
              <li><strong>2. Originalni materijali</strong> — autentični Luk Pra Kob blokovi, dušeci i refleksološki
                alati uvezeni iz Bangkoka.</li>
              <li><strong>3. Light luxury ambijent</strong> — ne klinički wellness, ne previše dekorativan
                istočnjački estetski stereotip, već sofisticirani, ležerni luksuz dizajniran upravo
                za zahtevnu beogradsku klijentelu.</li>
            </ol>
            <p>
              Svako od nabrojanih konkurentskih salona ima svoju vrednost i svoj kontekst. Mi se ne
              takmičimo cenom, već iskustvom — i to je razlog zašto se naši stalni klijenti vraćaju
              dva do četiri puta mesečno, neki već treću godinu zaredom, pre nego što smo postali
              vidljivi na Google mapama.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-3xl mt-12 mb-4 text-[#2b2620]">Stres i relaksacija — naučna pozadina</h2>
            <p>
              Stres je danas glavni pokretač posete spa salonima u Beogradu — više od bola u leđima,
              više od oporavka od treninga, više od kozmetičkih razloga. Pravi autentični tajlandski
              tretman značajno smanjuje nivo kortizola, glavnog hormona stresa, kroz tri mehanizma:
              direktnu stimulaciju parasimpatičkog nervnog sistema (kroz pritisak na specifične zone),
              redukciju mišićne napetosti (koja smanjuje stalan tihi stres koji vaše telo doživljava
              čak i kad mirujete), i mentalnu prisutnost (ulazak u meditativno stanje koje sat-dva
              traje i nakon tretmana).
            </p>
            <p>
              Posledice ovog efekta su konkretne — bolji san, niža temperatura u rukama i nogama,
              jasniji um, smanjenje frekvencije migrene kod osoba sklonih tenzionim glavoboljama,
              i osećaj koji se najbolje opisuje kao "vraćanje sebi". Ovo nije zaludna metafora — to
              je stvarni neurobiološki ishod koji se može meriti kortizolom u pljuvački pre i posle
              tretmana.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-3xl mt-12 mb-4 text-[#2b2620]">Masaža leđa, masaža za parove i wellness rutina</h2>
            <p>
              <strong>Masaža leđa</strong> u kontekstu tajlandskog spa nije zasebna usluga — već fokusirana
              tema unutar bilo kog od šest naših tretmana. Najbolji efekat za hronični bol u leđima
              kombinuje tradicionalnu tajlandsku tehniku sa biljnim kompresama: kompresa otvara mišić
              termoterapijom, a tajlandska tehnika tačkasto rasterećuje Sen liniju ispod fascije. Mnogi
              naši klijenti sa "tipičnim beogradskim leđima" (od previše vremena za laptopom) postižu
              dramatičan rezultat već posle 3 do 4 tretmana po ovoj formuli.
            </p>
            <p>
              <strong>Masaža za parove Beograd</strong> je jedna od naših najtraženijih opcija. Dva terapeuta
              istovremeno rade u istoj prostoriji, sa identičnom sekvencom, što daje vrhunski sinhronizovan
              doživljaj. Odlično za godišnjicu, rođendan partnera ili kao luksuzan poklon iznenađenja.
              Najpopularnije kombinacije su aroma masaža za 90 minuta i biljne komprese za 90 minuta.
            </p>
            <p>
              Što se tiče wellness rutine — preporučujemo svojim stalnim klijentima da posete naš spa
              jednom do dva puta mesečno. To je dovoljno da telo zadrži benefite, a istovremeno se ne
              gubi <em>osećaj svečanosti</em> svakog dolaska. Wellness ne sme da postane stresan, niti
              pretrpan; ono što ga čini efikasnim je upravo redovnost u skladu sa vašim ritmom života.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-3xl mt-12 mb-4 text-[#2b2620]">Ritual koji počinje pre ulaska</h2>
            <p>
              Naš tim radi sa filozofijom da tretman ne počinje kada terapeut prinese prvu ruku — već
              kada otvorite vrata. Zbog toga je naš prijemni prostor dizajniran kao oaza tišine sa
              minimalnim brojem zvučnih nadražaja: bez TV-a, bez glasnih telefonskih razgovora, bez
              ekrana. Topli čaj sa limunovom travom i đumbirom stiže do vas u prvih dva minuta — kao
              signal vašem nervnom sistemu da odjavljujete spoljni svet.
            </p>
            <p>
              Pre samog tretmana terapeut s vama provede 3 do 5 minuta u kratkom razgovoru — pita gde
              su vam tačke najveće zategnutosti, šta očekujete, da li ste skoro imali povredu. Ovo
              nije puka formalnost — ovo je deo metode. Tajlandska medicina je holistička: terapeut
              koji ne razume vaš kontekst ne može precizno raditi.
            </p>
            <p>
              Nakon tretmana — još jedan čaj, par minuta tišine, i kratak savet šta da očekujete u
              naredne 24 do 48 sati. Mnogi gosti opisuju ovaj poslednji deo kao najmirniji deo
              celokupnog iskustva — kao kada vam ne treba ništa da kažete, samo da budete.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-3xl mt-12 mb-4 text-[#2b2620]">Često postavljana pitanja</h2>
            <div className="space-y-4 mt-6">
              {FAQ.map((f, i) => (
                <details key={i} className="group rounded-xl bg-white/85 border border-[rgba(161,122,53,0.22)] p-5">
                  <summary className="cursor-pointer list-none text-[#2b2620] font-medium flex items-start justify-between gap-3">
                    <span>{f.q}</span>
                    <ChevronRight className="h-5 w-5 text-[#a17a35] flex-shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-[#3a312a] leading-[1.7] font-light">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <section className="mt-16 text-center rounded-2xl bg-gradient-to-br from-[#a17a35] via-[#c9a45a] to-[#a17a35] p-10 text-white">
              <h2 className="font-serif text-3xl sm:text-4xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Spremni za vaš prvi autentični tajlandski tretman?
              </h2>
              <p className="text-white/90 max-w-xl mx-auto mb-6 font-light">
                Zakažite svoj termin online za samo par sekundi — ili nas pozovite. Radimo svaki dan 10:00–22:00.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/sr#contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm tracking-[0.22em] uppercase font-medium bg-white text-[#a17a35] hover:bg-[#fbf3dc] transition-colors"
                >
                  Zakaži termin
                </Link>
                <a
                  href="tel:+38162625500"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm tracking-[0.22em] uppercase font-medium border border-white text-white hover:bg-white hover:text-[#a17a35] transition-colors"
                >
                  <Phone className="h-4 w-4" /> Pozovite nas
                </a>
              </div>
            </section>
          </Reveal>
        </article>
      </main>

      <Footer />
      <ChatFloater />
    </>
  );
};
