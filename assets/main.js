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
  'produse.p': 'Ordonate după complexitatea tehnică și maturitatea dovezilor din producție.',

  'callout.problem': 'Situație', 'callout.solution': 'Soluție',

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
  'guanina.pitch': 'Florăriile din piețe listează buchete cu stoc limitat, clienții plătesc online prin <strong>Stripe Connect</strong> și ridică produsul pe bază de <strong>bilet QR</strong>. 47 de migrări în producție, audit de securitate documentat.',
  'guanina.problem': 'Florăriile mici nu au echipă IT. O platformă comună riscă să amestece date între vânzători — o florărie nu trebuie să vadă comenzile alteia.',
  'guanina.solution': 'Dashboard izolat complet per florărie. Plată directă către vânzător prin Stripe Connect, comision reținut automat, bilet QR fără cont necesar.',
  'guanina.feat1': '<b>Cerere de ofertă</b> — licitație între vânzători apropiați',
  'guanina.feat2': '<b>15 conturi demo</b>, ascunse la primul vânzător real',
  'guanina.feat3': '<b>Panou admin complet</b> — comenzi, decontări, sondaj',
  'guanina.feat4': '<b>Push web</b> + email, degradare silențioasă',
  'guanina.feat5': '<b>SEO/AIO nativ</b> — JSON-LD, llms.txt',
  'guanina.feat6': '<b>Comision 0%</b> primele 30 zile, apoi 5%',
  'guanina.vlabel': 'Stoc live', 'guanina.vvalue': 'Se epuizează în timp real',
  'guanina.f1t': 'Listare', 'guanina.f1d': 'stoc limitat',
  'guanina.f2t': 'Plată', 'guanina.f3t': 'Ridicare', 'guanina.f3d': 'bilet QR',
  'guanina.proof1': 'Audit de securitate: 4 probleme găsite și reparate (XSS, risc dublă-vânzare, cont demo, orașe lipsă).',
  'guanina.proof2': 'Livrare la domiciliu lansată + politică de anulare rescrisă, cu reținere reală a taxei Stripe.',

  'smartdrive.kicker': '03 — Rideshare · Android nativ', 'smartdrive.status': 'Live · clienți plătitori',
  'smartdrive.tagline': 'Copilotul vocal pentru șoferii de rideshare',
  'smartdrive.pitch': 'Calculează în timp real câștigul net al fiecărei curse Bolt/Uber și îl anunță <strong>vocal</strong> — plus un back-office complet de business (abonamente, recomandări, MRR), nu doar o aplicație mobilă.',
  'smartdrive.problem': 'Șoferul vede doar prețul brut. Calculează mental, sub presiune, dacă merită cursa — risc real la volan.',
  'smartdrive.solution': 'Rulează pasiv, alături de aplicația de rideshare. Fiecare ofertă e evaluată automat și șoptită vocal: „Cursă 30 RON, câștig net 42 RON/oră."',
  'smartdrive.feat1': '<b>Mod complet vocal</b> — zero distragere de la drum',
  'smartdrive.feat2': '<b>Quick Mute</b> — un tap la urcarea pasagerului',
  'smartdrive.feat3': '<b>7 zile probă</b>, apoi -50% preț lansare',
  'smartdrive.feat4': '<b>Anti-fraudă recomandări</b> — anulare dacă referentul nu mai e activ',
  'smartdrive.feat5': '<b>Back-office</b> — MRR, retenție, retrageri',
  'smartdrive.feat6': '<b>Migrări testate</b> pe fiecare versiune veche',
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
