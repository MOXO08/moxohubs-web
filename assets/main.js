const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  document.querySelectorAll('.tilt').forEach((el) => {
    const MAX_DEG = 5;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform =
        `perspective(700px) rotateX(${(-py * MAX_DEG).toFixed(2)}deg) rotateY(${(px * MAX_DEG).toFixed(2)}deg) translateZ(2px)`;
    }, { passive: true });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg)';
    });
  });
}

/* ---------------- i18n: English default, Romanian toggle ---------------- */
const RO = {
  'nav.produse': 'Produse', 'nav.standard': 'Cum lucrăm', 'nav.faq': 'Întrebări', 'nav.cta': 'Scrie-ne',
  'hero.eyebrow': 'Studio de inginerie software',
  'hero.title': 'Construim sisteme care <em>rezistă la verificare</em>.',
  'hero.lead': '<strong>MOXO Technology</strong> proiectează și livrează software de producție: un marketplace cu plăți live, un copilot Android cu abonați plătitori, un motor de conformitate reglementară testat cu 66 de teste end-to-end, o aplicație mobilă de tracking prețuri. Fiecare afirmație de mai jos are o dovadă atașată — cod, test sau tranzacție reală.',
  'hero.cta1': 'Vezi produsele', 'hero.cta2': 'Hai să vorbim',
  'panel.head': 'Registru live · MOXO', 'panel.count': '4 sisteme',
  'row.sentinel': '— Conformitate EU AI Act', 'row.guanina': '— Marketplace flori',
  'row.smartdrive': '— Copilot rideshare', 'row.dealhunter': '— Tracking prețuri',
  'pill.sentinel': 'Pre-lansare', 'pill.live': 'Live', 'pill.dealhunter': 'În dezvoltare',
  'stat.1': 'produse construite', 'stat.2': 'live, în producție',
  'stat.3': 'teste end-to-end (Sentinel)', 'stat.4': 'migrări de schemă (Guanina)',

  'produse.eyebrow': 'Portofoliu', 'produse.h2': 'Fiecare produs, în detaliu',
  'produse.p': 'Arhitectură, sisteme de bază și funcționalități pentru fiecare platformă construită și lansată.',

  'callout.problem': 'Provocare', 'callout.solution': 'Arhitectură',

  'sentinel.kicker': '01 — RegTech · Node.js', 'sentinel.status': 'Pre-lansare · 66/66 teste',
  'sentinel.tagline': '"Building Trust Through Evidence" — conformitate EU AI Act',
  'sentinel.pitch': 'Platformă de evaluare a conformității <strong>orientată pe dovezi</strong>, pentru furnizori de sisteme AI care trebuie să demonstreze conformitatea cu Regulation (EU) 2024/1689 — validată de 4 experți independenți și testată end-to-end.',
  'sentinel.problem': 'EU AI Act cere demonstrarea conformității articol-cu-articol, sub amenzi de până la 30M€. De obicei se face manual, fără legătură verificabilă cu codul real.',
  'sentinel.solution': 'Pipeline de 18 faze analizează codul și documentația, extrage dovezi și le mapează pe articole, sigilate cu timestamp RFC 3161 real.',
  'sentinel.feat1': '<b>Timestamp RFC 3161</b> verificat cu OpenSSL, nu simulat',
  'sentinel.feat2': '<b>Hash pe conținut real</b>, detectează drift, nu doar locație',
  'sentinel.feat3': '<b>8 șabloane legale</b> migrate pe risc real',
  'sentinel.feat4': '<b>SBOM automat</b> + delta report la re-audit',
  'sentinel.feat5': '<b>Notificări webhook</b> Slack/Teams',
  'sentinel.feat6': '<b>tsc --noEmit</b> curat, zero regresii',
  'sentinel.vlabel': 'Scanare de cod live', 'sentinel.vvalue': '18 faze de analiză',
  'sentinel.f1t': 'Analiză', 'sentinel.f1d': '18 faze pe sursă/config',
  'sentinel.f2t': 'Mapare', 'sentinel.f2d': 'dovezi → articole',
  'sentinel.f3t': 'Dosar', 'sentinel.f3d': 'PDF + SBOM sigilat',
  'sentinel.proof1': '4 experți independenți au validat hardening-ul (juridic, criptografie, arhitectură, produs).',
  'sentinel.proof2': 'Testarea e2e a găsit 2 bug-uri reale de concurență — ambele reparate, cu test dedicat.',

  'guanina.kicker': '02 — Marketplace · Next.js Edge', 'guanina.status': 'Live · tranzacții reale',
  'guanina.tagline': 'Marketplace de flori — cunoscută și ca „Piața de Flori"',
  'guanina.pitch': 'Construit pe <strong>Next.js Edge Runtime</strong> cu Cloudflare D1, KV și R2, cu integrare <strong>Stripe Connect</strong> pentru plăți divizate și un sistem de ridicare pe bază de cod QR. Rulează pe 47 de migrări incrementale de schemă, aplicate fără downtime.',
  'guanina.problem': 'O platformă multi-vânzător comună trebuie să garanteze izolare strictă a datelor — un vânzător nu trebuie niciodată să poată vedea comenzile, stocul sau decontările altui vânzător.',
  'guanina.solution': 'Fiecare vânzător primește un dashboard complet izolat, aplicat la nivel de schemă și interogare. Plățile merg direct către vânzător prin Stripe Connect, cu comisionul reținut automat la nivelul de procesare.',
  'guanina.feat1': '<b>Motor de cerere de ofertă</b> — difuzare automată cu valuri de notificare către vânzătorii din apropiere',
  'guanina.feat2': '<b>Motor de inventar în timp real</b> — expirare automată a anunțurilor și sincronizare de stoc',
  'guanina.feat3': '<b>Panou admin complet</b> — comenzi, vânzători, decontări, echipă, sondaj de piață',
  'guanina.feat4': '<b>Push web (VAPID)</b> + email tranzacțional, degradare grațioasă',
  'guanina.feat5': '<b>Strat SEO/AIO nativ</b> — JSON-LD, sitemap dinamic, llms.txt',
  'guanina.feat6': '<b>Motor de livrare și anulare</b> — livrare per-vânzător, ferestre de rambursare ancorate pe plată',
  'guanina.vlabel': 'Stoc live', 'guanina.vvalue': 'Se epuizează în timp real',
  'guanina.f1t': 'Listare', 'guanina.f1d': 'stoc limitat',
  'guanina.f2t': 'Plată', 'guanina.f3t': 'Ridicare', 'guanina.f3d': 'bilet QR',
  'guanina.proof1': 'Audit de securitate dedicat: hardening XSS, reparare race condition la dublă-vânzare pe webhook-uri întârziate, rate limiting la checkout.',
  'guanina.proof2': 'Modul de livrare lansat cu ferestre de anulare ancorate pe plată și rambursări parțiale automate Stripe.',

  'smartdrive.kicker': '03 — Rideshare · Android nativ', 'smartdrive.status': 'Live · clienți plătitori',
  'smartdrive.tagline': 'Copilotul vocal pentru șoferii de rideshare',
  'smartdrive.pitch': 'O aplicație Android nativă care citește ecranul aplicației de rideshare prin OCR local, rulează un motor de calcul al profitului în timp real și livrează rezultatul <strong>vocal</strong> — susținută de sincronizare cloud și un dashboard complet de operațiuni interne.',
  'smartdrive.problem': 'Aplicațiile de rideshare arată doar tariful brut. Calcularea profitului net real — combustibil, uzură, comision — în timp real, fără a atinge contul sau datele șoferului, necesită citirea externă și sigură a interfeței.',
  'smartdrive.solution': 'Rulează pasiv alături de aplicația de rideshare, folosind OCR local pentru a citi ofertele de tarif și un motor de calcul local pentru profitul net, livrat prin sinteză vocală — fără acces la contul de rideshare al șoferului în niciun moment.',
  'smartdrive.feat1': '<b>Motor OCR local</b> — citește ofertele de tarif direct de pe ecranul aplicației de rideshare',
  'smartdrive.feat2': '<b>Mod voice-first</b> — ieșire text-to-speech, zero interacțiune cu ecranul necesară',
  'smartdrive.feat3': '<b>Motor de profit în timp real</b> — combustibil, uzură vehicul și comision calculate per cursă',
  'smartdrive.feat4': '<b>Sistem de tracking recomandări</b> — atribuire automată cu protecții anti-fraudă integrate',
  'smartdrive.feat5': '<b>Dashboard de operațiuni</b> — gestionare abonați, metrici, cereri de retragere',
  'smartdrive.feat6': '<b>Migrări de schemă</b> testate față de fiecare versiune lansată anterior',
  'smartdrive.vlabel': 'Anunț vocal', 'smartdrive.vvalue': '„42 RON pe oră"',
  'smartdrive.f1t': 'Ofertă', 'smartdrive.f1d': 'apare pe ecran',
  'smartdrive.f2t': 'Calcul', 'smartdrive.f2d': 'profit net',
  'smartdrive.f3t': 'Anunț', 'smartdrive.f3d': 'vocal, în cască',

  'dealhunter.kicker': '04 — E-commerce afiliat · Flutter', 'dealhunter.status': 'În dezvoltare',
  'dealhunter.tagline': 'Urmărire automată de prețuri pentru magazinele din România',
  'dealhunter.pitch': 'Aplicație mobilă (iOS + Android) care urmărește automat prețurile din magazinele românești și notifică exact când prețul scade sub prag — construită cu aceeași disciplină ca produsele live de mai sus.',
  'dealhunter.problem': 'Prețurile din eMAG, FashionDays, Notino, Altex fluctuează constant, dar nimeni nu are timp să verifice manual zilnic.',
  'dealhunter.solution': 'Utilizatorul setează pragul o singură dată; aplicația compară automat și trimite push exact la momentul potrivit.',
  'dealhunter.feat1': '<b>Fără parolă</b> — Apple/Google Sign In',
  'dealhunter.feat2': '<b>Istoric de preț</b> per produs',
  'dealhunter.feat3': '<b>Browser in-app obligatoriu</b> — păstrează cookie-ul de afiliere',
  'dealhunter.feat4': '<b>Nicio tranzacție în aplicație</b>',
  'dealhunter.feat5': '<b>Chei UUID</b> pe toată schema',
  'dealhunter.vlabel': 'Preț sub prag', 'dealhunter.vvalue': 'Alertă trimisă',
  'dealhunter.f1t': 'Alertă', 'dealhunter.f1d': 'prag setat',
  'dealhunter.f2t': 'Comparare', 'dealhunter.f2d': 'zilnică', 'dealhunter.f3d': 'la scădere',

  'standard.eyebrow': 'Cum lucrăm', 'standard.h2': 'Standardul de inginerie',
  'standard.p': 'Aplicat identic, indiferent de stack — verificabil direct în produsele de mai sus.',
  'why1.h': 'Izolare de date verificată',
  'why1.p': 'Într-un sistem multi-tenant, izolarea se verifică la nivel de schemă și query. <b>Guanina</b> a trecut printr-un audit dedicat care a confirmat-o explicit.',
  'why2.h': 'Migrări testate pe versiuni reale',
  'why2.p': '<b>Guanina</b> rulează pe 47 de migrări fără downtime; <b>SmartDrive</b> are un istoric documentat de bug-uri de migrare reparate.',
  'why3.h': 'Infrastructura rămâne a ta',
  'why3.p': 'Cod, hosting, bază de date și chei de acces în conturile clientului de la prima zi. Fără lock-in.',
  'why4.h': '„Gata" înseamnă testat',
  'why4.p': '<b>Sentinel</b> rulează 66 de teste end-to-end cu server și bază de date reale — a găsit 2 bug-uri de concurență reale înainte de lansare.',
  'why5.h': 'Bani și identitate reale',
  'why5.p': 'Plăți în producție (Stripe Connect, Lemon Squeezy). <b>Sentinel</b> sigilează fiecare dosar cu RFC 3161 real, verificat cu OpenSSL.',
  'why6.h': 'Onestitate tehnică',
  'why6.p': 'Când o regulă nu e complet acoperită, spunem explicit ce lipsește — documentat ca „rezolvat parțial, onest", nu simulat.',

  'faq.eyebrow': 'Întrebări frecvente', 'faq.h2': 'Ce vrei să știi',
  'faq.q1': 'Ce este MOXO Technology?',
  'faq.a1': 'MOXO Technology proiectează și construiește aplicații full-stack complete — un marketplace live cu plăți reale, un copilot mobil cu abonați plătitori, o platformă de conformitate testată end-to-end, o aplicație de tracking prețuri. Fiecare produs e documentat cu dovezi verificabile.',
  'faq.q2': 'Ce este Sentinel și ce reglementare acoperă?',
  'faq.a2': 'Sentinel este o platformă de conformitate pentru EU AI Act (Regulation (EU) 2024/1689). Analizează codul sursă și documentația pentru a genera dovezi mapate pe articolele regulamentului, testată cu 66 de teste end-to-end și validată de 4 experți independenți.',
  'faq.q3': 'Ce este Guanina (Piața de Flori)?',
  'faq.a3': 'Guanina este un marketplace live unde florăriile listează buchete cu stoc limitat, clienții plătesc prin Stripe Connect și ridică produsul cu un bilet QR. Rulează pe 47 de migrări în producție și a trecut printr-un audit de securitate documentat public.',
  'faq.q4': 'Ce este SmartDrive?',
  'faq.a4': 'SmartDrive este o aplicație Android nativă, live, cu abonați plătitori, care calculează în timp real câștigul net al fiecărei curse de rideshare și anunță vocal dacă merită acceptată.',
  'faq.q5': 'Ce este Deal Hunter RO?',
  'faq.a5': 'Deal Hunter RO este o aplicație mobilă în dezvoltare pentru iOS și Android care urmărește automat prețurile din magazinele românești și trimite notificări push la scăderi sub pragul setat.',

  'closing.h2': 'Ai un produs de construit?',
  'closing.p': 'De la MVP-uri până la platforme cu reguli de conformitate complexe — hai să vorbim despre ce vrei să construiești și ce dovadă vrei să poți arăta la final.',
  'closing.cta': 'Scrie-ne',
  'footer.line': '© 2026 MOXO Technology · SmartDrive nu e afiliat cu Bolt sau Uber',

  'nav.about': 'Despre',

  'about.eyebrow': 'Despre MOXO Technology',
  'about.title': 'Un studio de inginerie software construit în jurul unui singur standard: <em>dovada verificabilă</em>.',
  'about.lead': 'MOXO Technology proiectează, construiește și operează software de producție într-o gamă deliberat de largă de domenii — comerț și plăți, mobilitate, tehnologie de reglementare și produse de abonament pentru consumatori. Nu ne specializăm pe o industrie; ne specializăm pe un standard de inginerie care se transferă peste toate — fiecare sistem pe care îl livrăm e construit ca să fie inspectat, testat și verificat, nu doar demonstrat.',

  'about.what.eyebrow': 'Ce facem',
  'about.what.h2': 'Inginerie full-stack, de la un capăt la altul',
  'about.what.p1': 'Preluăm produsele de la decizii de arhitectură până la operarea în producție. Asta include design de sistem, strategie de schemă de bază de date și migrări, implementare backend și API, interfețe frontend și mobile native, integrări cu terți (plăți, notificări, geolocalizare, autentificare), infrastructură și pipeline-uri de deploy, plus mentenanța și hardening-ul continuu care mențin un sistem fiabil după lansare.',
  'about.what.p2': 'Munca noastră acoperă aplicații Android native scrise în Java, platforme web randate la edge pe Next.js și stack-ul serverless Cloudflare, aplicații mobile cross-platform în Flutter și servicii backend în Node.js — alese per proiect în funcție de ce cere efectiv problema, nu un șablon implicit repetat la fiecare colaborare.',

  'about.stack.eyebrow': 'Tehnologie și domenii',
  'about.stack.h2': 'Unde operăm',
  'about.stack.p': 'O suprafață tehnică largă, aplicată cu aceeași disciplină de inginerie indiferent de stack.',
  'about.d1.h': 'Platforme web și edge computing',
  'about.d1.p': 'Next.js App Router, runtime-uri edge, Cloudflare D1/KV/R2, PostgreSQL și Supabase — platforme randate server-side, proiectate pentru latență mică și scalare orizontală fără infrastructură de server dedicată.',
  'about.d2.h': 'Mobil nativ și cross-platform',
  'about.d2.p': 'Inginerie Android nativă în Java pentru workload-uri critice de performanță pe dispozitiv (OCR local, sincronizare în fundal), și Flutter pentru livrare cross-platform iOS/Android dintr-o singură bază de cod.',
  'about.d3.h': 'Infrastructură de plăți și comerț',
  'about.d3.p': 'Integrări Stripe și Stripe Connect pentru plăți divizate în marketplace-uri, facturare pe abonament și sisteme de checkout — inclusiv logică de rambursare, reconciliere de webhook-uri și fluxuri de plată multi-parte.',
  'about.d4.h': 'Tehnologie de reglementare și conformitate',
  'about.d4.p': 'Unelte de conformitate bazate pe dovezi pentru domenii reglementate, inclusiv fluxuri de conformitate EU AI Act: extragere automată de dovezi, marcaj temporal criptografic și generare de documentație pregătită pentru audit.',
  'about.d5.h': 'Arhitectură de date și sisteme',
  'about.d5.p': 'Design de schemă relațională, strategie de migrare incrementală, izolare de date multi-tenant și procesare în fundal (cron/edge functions) pentru ingestie de feed-uri, motoare de notificare și urmărire de preț/stare.',
  'about.d6.h': 'Optimizare SEO și pentru crawlere AI',
  'about.d6.p': 'Date structurate (JSON-LD), markup semantic, sitemap-uri dinamice și <code>llms.txt</code> — conținut construit să fie lizibil atât pentru motoarele de căutare, cât și pentru sistemele AI care citesc și citează web-ul.',

  'about.how.eyebrow': 'Cum lucrăm',
  'about.how.h2': 'Standardul de inginerie',
  'about.how.p': 'Șase principii aplicate identic, indiferent de client, stack sau termen.',
  'about.p1.h': 'Izolare de date, verificată',
  'about.p1.p': 'În sistemele multi-tenant, izolarea e aplicată și verificată la nivel de schemă și interogare — nu presupusă doar din interfață.',
  'about.p2.h': 'Migrări testate pe istoric real',
  'about.p2.p': 'Orice schimbare de schemă e testată explicit față de versiunile lansate anterior, nu doar față de ultima — traseele de upgrade sunt o preocupare de prim rang, nu o idee ulterioară.',
  'about.p3.h': 'Infrastructura rămâne la client',
  'about.p3.p': 'Cod, hosting, baze de date și credențiale de acces trăiesc în conturile proprii ale clientului din prima zi. Fără lock-in pe un backend proprietar, fără un singur punct de dependență.',
  'about.p4.h': '„Gata" înseamnă testat',
  'about.p4.p': 'Nicio funcționalitate nu e raportată completă fără o suită de teste reală rulată pe ea — inclusiv teste end-to-end cu server și bază de date live, nu doar teste unitare izolate.',
  'about.p5.h': 'Bani și identitate reale, protejate',
  'about.p5.p': 'Integrări de plăți de nivel producție, audit trail pe acțiuni sensibile și autentificare cu doi factori acolo unde datele o justifică.',
  'about.p6.h': 'Onestitate tehnică despre limite',
  'about.p6.p': 'Când o cerință nu e complet acoperită, spunem asta explicit în loc să simulăm acoperire — documentat ca parțial și onest, nu exagerat.',

  'about.ind.eyebrow': 'Industrii',
  'about.ind.h2': 'Domenii pentru care construim',
  'about.ind.p1': 'Standardul nostru de inginerie e agnostic de domeniu prin design, motiv pentru care portofoliul nostru acoperă mai multe industrii distincte, nu una singură: marketplace-uri multi-vânzător și e-commerce, unelte pentru mobilitate și transport, tehnologie de reglementare și conformitate (RegTech), aplicații de abonament pentru consumatori și unelte de descoperire e-commerce bazate pe afiliere.',
  'about.ind.p2': 'Această întindere e deliberată. Un sistem de reconciliere a plăților, un model de date multi-tenant și un motor de notificări în timp real reapar, în forme diferite, în aproape orice produs software serios — construirea lor corectă o singură dată, și reaplicarea consecventă a acelei discipline, e ceea ce ne permite să avansăm rapid pe probleme cu adevărat noi fără să tăiem din colțuri pe fundamente.',
};

let EN = null; // captured from the page's own default markup on first load

function collectDefault() {
  EN = {};
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    EN[el.getAttribute('data-i18n')] = el.innerHTML;
  });
}

function applyLang(lang) {
  const dict = lang === 'ro' ? RO : EN;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] != null) el.innerHTML = dict[key];
  });
  document.documentElement.lang = lang;
  document.querySelectorAll('.langbtn').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
  });
  try { localStorage.setItem('moxo-lang', lang); } catch (e) {}
}

collectDefault();
document.querySelectorAll('.langbtn').forEach((b) => {
  b.addEventListener('click', () => applyLang(b.dataset.lang));
});

let initial = 'en';
try { initial = localStorage.getItem('moxo-lang') || 'en'; } catch (e) {}
if (initial === 'ro') applyLang('ro');
