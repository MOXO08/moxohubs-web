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

/* ---------------- scroll reveal ---------------- */
document.querySelectorAll('.showcase, .whycard, .section-head, .faqlist details, .closing-panel, .registry, .statuspanel').forEach((el) => {
  el.classList.add('reveal');
});
document.querySelectorAll('.whygrid').forEach((el) => el.classList.add('reveal-stagger'));

if (reduceMotion) {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
  document.querySelectorAll('.reveal-stagger').forEach((el) => el.classList.add('in'));
} else if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => io.observe(el));
} else {
  document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => el.classList.add('in'));
}

/* ---------------- animated stat counters ---------------- */
function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  if (reduceMotion || isNaN(target)) { el.textContent = target + suffix; return; }
  const dur = 1100;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const countEls = document.querySelectorAll('[data-count]');
if (countEls.length) {
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { animateCount(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    countEls.forEach((el) => cio.observe(el));
  } else {
    countEls.forEach(animateCount);
  }
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
  'also.included': 'De asemenea incluse',

  'sentinel.kicker': '01 — RegTech · Node.js', 'sentinel.status': 'Pre-lansare · 66/66 teste',
  'sentinel.tagline': '"Building Trust Through Evidence" — conformitate EU AI Act',
  'sentinel.pitch': 'Platformă de evaluare a conformității <strong>orientată pe dovezi</strong>, pentru furnizori de sisteme AI care trebuie să demonstreze conformitatea cu Regulation (EU) 2024/1689 — validată de 4 experți independenți și testată end-to-end.',
  'sentinel.problem': 'EU AI Act cere demonstrarea conformității articol-cu-articol, sub amenzi de până la 30M€. De obicei se face manual, fără legătură verificabilă cu codul real.',
  'sentinel.solution': 'Pipeline de 18 faze analizează codul și documentația, extrage dovezi și le mapează pe articole, sigilate cu timestamp RFC 3161 real.',
  'sentinel.feat1': '<span class="ft"><b>Pipeline de analiză în 18 faze</b><span class="ft-d">cod sursă, configurații și documentație</span></span>',
  'sentinel.feat2': '<span class="ft"><b>Wizard de conformitate ghidat</b><span class="ft-d">restructurat în jurul documentelor semnabile</span></span>',
  'sentinel.feat3': '<span class="ft"><b>Audit Navigator</b><span class="ft-d">navigare structurată a rezultatelor pe articol și nivel de risc</span></span>',
  'sentinel.feat4': '<span class="ft"><b>Sistem de semnătură digitală</b><span class="ft-d">cu verificare live a modificării conținutului</span></span>',
  'sentinel.feat5': '<span class="ft"><b>Timestamp RFC 3161</b><span class="ft-d">verificat cu OpenSSL, nu simulat</span></span>',
  'sentinel.feat6': '<span class="ft"><b>Hash pe conținut real</b><span class="ft-d">detectează drift, nu doar locație</span></span>',
  'sentinel.feat7': '<span class="ft"><b>8 șabloane legale</b><span class="ft-d">migrate pe risc real</span></span>',
  'sentinel.feat8': '<span class="ft"><b>Generare SBOM automată</b><span class="ft-d">delta report la re-audit</span></span>',
  'sentinel.feat9': '<span class="ft"><b>Roluri și permisiuni multi-organizație</b><span class="ft-d">cu audit trail complet</span></span>',
  'sentinel.feat10': '<span class="ft"><b>Notificări in-app și webhook</b><span class="ft-d">către Slack/Teams</span></span>',
  'sentinel.vlabel': 'Scanare de cod live', 'sentinel.vvalue': '18 faze de analiză',
  'sentinel.f1t': 'Analiză', 'sentinel.f1d': '18 faze pe sursă/config',
  'sentinel.f2t': 'Mapare', 'sentinel.f2d': 'dovezi → articole',
  'sentinel.f3t': 'Dosar', 'sentinel.f3d': 'PDF + SBOM sigilat',
  'sentinel.proof1': '4 experți independenți au validat hardening-ul (juridic, criptografie, arhitectură, produs).',
  'sentinel.proof2': 'Testarea e2e a găsit 2 bug-uri reale de concurență — ambele reparate, cu test dedicat.',
  'sentinel.b1t': 'Analiză în 18 faze', 'sentinel.b1d': 'Pipeline pe cod sursă, configurații și documentație.',
  'sentinel.b2t': 'Sigiliu RFC 3161', 'sentinel.b2d': 'Timestamp verificat cu OpenSSL, nu simulat.',
  'sentinel.b3t': 'Audit Navigator', 'sentinel.b3d': 'Navigare structurată a rezultatelor pe articol și risc.',
  'sentinel.b4t': 'Semnături live', 'sentinel.b4d': 'Semnare digitală cu verificare live a modificării.',
  'sentinel.m1': 'Wizard de conformitate ghidat', 'sentinel.m2': 'Detectare drift pe hash de conținut',
  'sentinel.m3': '8 șabloane legale', 'sentinel.m4': 'Generare SBOM automată',
  'sentinel.m5': 'Roluri și permisiuni multi-organizație', 'sentinel.m6': 'Alerte webhook Slack/Teams',

  'guanina.kicker': '02 — Marketplace · Next.js Edge', 'guanina.status': 'Live · tranzacții reale',
  'guanina.tagline': 'Marketplace de flori — cunoscută și ca „Piața de Flori"',
  'guanina.pitch': 'Construit pe <strong>Next.js Edge Runtime</strong> cu Cloudflare D1, KV și R2, cu integrare <strong>Stripe Connect</strong> pentru plăți divizate și un sistem de ridicare pe bază de cod QR. Rulează pe 47 de migrări incrementale de schemă, aplicate fără downtime.',
  'guanina.problem': 'O platformă multi-vânzător comună trebuie să garanteze izolare strictă a datelor — un vânzător nu trebuie niciodată să poată vedea comenzile, stocul sau decontările altui vânzător.',
  'guanina.solution': 'Fiecare vânzător primește un dashboard complet izolat, aplicat la nivel de schemă și interogare. Plățile merg direct către vânzător prin Stripe Connect, cu comisionul reținut automat la nivelul de procesare.',
  'guanina.feat1': '<span class="ft"><b>Motor de cerere de ofertă</b><span class="ft-d">difuzare automată cu valuri de notificare către vânzătorii din apropiere</span></span>',
  'guanina.feat2': '<span class="ft"><b>Motor de inventar în timp real</b><span class="ft-d">expirare automată a anunțurilor și sincronizare de stoc</span></span>',
  'guanina.feat3': '<span class="ft"><b>Dashboard mobil pentru vânzător</b><span class="ft-d">scanare QR pentru confirmarea ridicării, istoric, profil</span></span>',
  'guanina.feat4': '<span class="ft"><b>Căutare comandă fără cont</b><span class="ft-d">urmărire și gestionare comandă fără autentificare</span></span>',
  'guanina.feat5': '<span class="ft"><b>Catalog geolocalizat</b><span class="ft-d">navigare pe oraș/cartier cu căutare fuzzy</span></span>',
  'guanina.feat6': '<span class="ft"><b>Panou admin complet</b><span class="ft-d">comenzi, vânzători, decontări, echipă, sondaj de piață</span></span>',
  'guanina.feat7': '<span class="ft"><b>Push web (VAPID)</b><span class="ft-d">email tranzacțional, degradare grațioasă</span></span>',
  'guanina.feat8': '<span class="ft"><b>Motor de livrare și anulare</b><span class="ft-d">livrare per-vânzător, ferestre de rambursare ancorate pe plată</span></span>',
  'guanina.feat9': '<span class="ft"><b>Linkuri de produs partajabile</b><span class="ft-d">pagini legale structurate și consimțământ cookie</span></span>',
  'guanina.feat10': '<span class="ft"><b>Strat SEO/AIO nativ</b><span class="ft-d">JSON-LD, sitemap dinamic, IndexNow, llms.txt</span></span>',
  'guanina.vlabel': 'Stoc live', 'guanina.vvalue': 'Se epuizează în timp real',
  'guanina.f1t': 'Listare', 'guanina.f1d': 'stoc limitat',
  'guanina.f2t': 'Plată', 'guanina.f3t': 'Ridicare', 'guanina.f3d': 'bilet QR',
  'guanina.proof1': 'Audit de securitate dedicat: hardening XSS, reparare race condition la dublă-vânzare pe webhook-uri întârziate, rate limiting la checkout.',
  'guanina.proof2': 'Modul de livrare lansat cu ferestre de anulare ancorate pe plată și rambursări parțiale automate Stripe.',
  'guanina.b1t': 'Arhitectură Edge', 'guanina.b1d': 'Cloudflare D1, KV și R2, fără server dedicat.',
  'guanina.b2t': 'Plăți divizate', 'guanina.b2d': 'Rută directă către vânzător prin Stripe Connect.',
  'guanina.b3t': 'Motor de cerere de ofertă', 'guanina.b3d': 'Valuri de notificare geolocalizate către vânzători.',
  'guanina.b4t': 'Dashboard vânzător + QR', 'guanina.b4d': 'Confirmare instantă prin scanare la stand.',
  'guanina.m1': 'Motor de inventar în timp real', 'guanina.m2': 'Căutare comandă fără cont',
  'guanina.m3': 'Catalog geolocalizat + căutare fuzzy', 'guanina.m4': 'Panou admin complet',
  'guanina.m5': 'Push web + email tranzacțional', 'guanina.m6': 'Motor de livrare și anulare',
  'guanina.m7': 'Linkuri de produs partajabile', 'guanina.m8': 'Strat SEO/AIO nativ',

  'smartdrive.kicker': '03 — Rideshare · Android nativ', 'smartdrive.status': 'Live · clienți plătitori',
  'smartdrive.tagline': 'Copilotul vocal pentru șoferii de rideshare',
  'smartdrive.pitch': 'O aplicație Android nativă care citește ecranul aplicației de rideshare prin OCR local, rulează un motor de calcul al profitului în timp real și livrează rezultatul <strong>vocal</strong> — susținută de sincronizare cloud și un dashboard complet de operațiuni interne.',
  'smartdrive.problem': 'Aplicațiile de rideshare arată doar tariful brut. Calcularea profitului net real — combustibil, uzură, comision — în timp real, fără a atinge contul sau datele șoferului, necesită citirea externă și sigură a interfeței.',
  'smartdrive.solution': 'Rulează pasiv alături de aplicația de rideshare, folosind OCR local pentru a citi ofertele de tarif și un motor de calcul local pentru profitul net, livrat prin sinteză vocală — fără acces la contul de rideshare al șoferului în niciun moment.',
  'smartdrive.feat1': '<span class="ft"><b>Motor OCR local</b><span class="ft-d">citește ofertele de tarif direct de pe ecranul aplicației de rideshare</span></span>',
  'smartdrive.feat2': '<span class="ft"><b>Mod voice-first</b><span class="ft-d">ieșire text-to-speech, zero interacțiune cu ecranul necesară</span></span>',
  'smartdrive.feat3': '<span class="ft"><b>Quick Mute</b><span class="ft-d">un tap silențiază anunțurile la urcarea unui pasager</span></span>',
  'smartdrive.feat4': '<span class="ft"><b>Motor de profit în timp real</b><span class="ft-d">combustibil, uzură vehicul și comision calculate per cursă</span></span>',
  'smartdrive.feat5': '<span class="ft"><b>Zone evitate</b><span class="ft-d">avertizare vocală când o cursă intră pe o stradă/zonă marcată</span></span>',
  'smartdrive.feat6': '<span class="ft"><b>Obiectiv zilnic de câștig</b><span class="ft-d">progres în timp real față de ținta setată</span></span>',
  'smartdrive.feat7': '<span class="ft"><b>Rapoarte financiare</b><span class="ft-d">bilanț zilnic/săptămânal/lunar și grafic ore profitabile</span></span>',
  'smartdrive.feat8': '<span class="ft"><b>Canale audio separate</b><span class="ft-d">pentru anunțuri private vs. pentru pasageri</span></span>',
  'smartdrive.feat9': '<span class="ft"><b>Sistem de tracking recomandări</b><span class="ft-d">atribuire automată cu protecții anti-fraudă integrate</span></span>',
  'smartdrive.feat10': '<span class="ft"><b>Dashboard de operațiuni</b><span class="ft-d">gestionare abonați, metrici, cereri de retragere</span></span>',
  'smartdrive.vlabel': 'Anunț vocal', 'smartdrive.vvalue': '„42 RON pe oră"',
  'smartdrive.f1t': 'Ofertă', 'smartdrive.f1d': 'apare pe ecran',
  'smartdrive.f2t': 'Calcul', 'smartdrive.f2d': 'profit net',
  'smartdrive.f3t': 'Anunț', 'smartdrive.f3d': 'vocal, în cască',
  'smartdrive.b1t': 'Motor OCR local', 'smartdrive.b1d': 'Citește ofertele direct de pe ecranul aplicației.',
  'smartdrive.b2t': 'Mod Voice-First', 'smartdrive.b2d': 'Ieșire text-to-speech, zero interacțiune cu ecranul.',
  'smartdrive.b3t': 'Motor de profit real-time', 'smartdrive.b3d': 'Combustibil, uzură și comision per cursă.',
  'smartdrive.b4t': 'Rapoarte financiare', 'smartdrive.b4d': 'Bilanț zilnic/săptămânal/lunar și grafic orar.',
  'smartdrive.m1': 'Quick Mute', 'smartdrive.m2': 'Zone evitate',
  'smartdrive.m3': 'Obiectiv zilnic de câștig', 'smartdrive.m4': 'Canale audio separate',
  'smartdrive.m5': 'Sistem de tracking recomandări', 'smartdrive.m6': 'Dashboard de operațiuni',

  'dealhunter.kicker': '04 — E-commerce afiliat · Flutter', 'dealhunter.status': 'În dezvoltare',
  'dealhunter.tagline': 'Urmărire automată de prețuri pentru magazinele din România',
  'dealhunter.pitch': 'Aplicație mobilă (iOS + Android) care urmărește automat prețurile din magazinele românești și notifică exact când prețul scade sub prag — construită cu aceeași disciplină ca produsele live de mai sus.',
  'dealhunter.problem': 'Prețurile din eMAG, FashionDays, Notino, Altex fluctuează constant, dar nimeni nu are timp să verifice manual zilnic.',
  'dealhunter.solution': 'Utilizatorul setează pragul o singură dată; aplicația compară automat și trimite push exact la momentul potrivit.',
  'dealhunter.feat1': '<span class="ft"><b>Ingestie automată de feed-uri</b><span class="ft-d">parsează feed-uri XML/CSV/API de la magazine partenere</span></span>',
  'dealhunter.feat2': '<span class="ft"><b>Motor de comparare a prețului</b><span class="ft-d">verifică preț nou vs. salvat, declanșează la trecerea pragului</span></span>',
  'dealhunter.feat3': '<span class="ft"><b>Istoric complet de preț</b><span class="ft-d">per produs, afișat grafic</span></span>',
  'dealhunter.feat4': '<span class="ft"><b>Fără parolă</b><span class="ft-d">Apple/Google Sign In</span></span>',
  'dealhunter.feat5': '<span class="ft"><b>Browser in-app obligatoriu</b><span class="ft-d">păstrează cookie-ul de atribuire afiliată</span></span>',
  'dealhunter.feat6': '<span class="ft"><b>Interfață adaptivă dark/light</b></span>',
  'dealhunter.feat7': '<span class="ft"><b>Nicio tranzacție în aplicație</b><span class="ft-d">redirecționare către magazinul oficial</span></span>',
  'dealhunter.feat8': '<span class="ft"><b>Chei UUID</b><span class="ft-d">pe toată schema</span></span>',
  'dealhunter.vlabel': 'Preț sub prag', 'dealhunter.vvalue': 'Alertă trimisă',
  'dealhunter.f1t': 'Alertă', 'dealhunter.f1d': 'prag setat',
  'dealhunter.f2t': 'Comparare', 'dealhunter.f2d': 'zilnică', 'dealhunter.f3d': 'la scădere',
  'dealhunter.b1t': 'Ingestie de feed-uri', 'dealhunter.b1d': 'Parsează feed-uri XML/CSV/API de la magazine.',
  'dealhunter.b2t': 'Motor de comparare', 'dealhunter.b2d': 'Verifică prețul vs. valoarea salvată, alertă la prag.',
  'dealhunter.b3t': 'Istoric de preț', 'dealhunter.b3d': 'Grafic complet per produs, ca semnal de încredere.',
  'dealhunter.b4t': 'Autentificare fără parolă', 'dealhunter.b4d': 'Apple / Google Sign In, fără fricțiune.',
  'dealhunter.m1': 'Browser in-app obligatoriu', 'dealhunter.m2': 'UI adaptivă dark/light',
  'dealhunter.m3': 'Nicio tranzacție în aplicație', 'dealhunter.m4': 'Chei UUID pe toată schema',

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
