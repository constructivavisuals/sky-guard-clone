// Runtime CS↔EN překlad pro Framer mirror.
// Sleduje DOM přes MutationObserver — odolné vůči Framer hydration / re-renderu.

(function () {
  const DICT = {
    // Navigace
    "O nás": "About",
    "Technologie": "Technology",
    "Služby": "Services",
    "Kontakt": "Contact",
    "Sky Guard Hub": "Sky Guard Hub",
    "Navigation": "Navigation",
    "Socials": "Socials",
    "Next": "Next",
    "Previous": "Previous",
    "Předchozí": "Previous",
    "Další": "Next",

    // Hero
    "Sky Guard - Dronová ostraha": "Sky Guard - Drone Security",
    "Dronová ostraha - strážce který nikdy nespí.": "Drone security — a guard that never sleeps.",
    "Dronová": "Drone",
    "Skyguard.": "Skyguard.",
    "Domluvit ukázku": "Book a demo",
    "Mějte": "Stay",

    // Produktové bloky
    "SKY ": "SKY ",
    "SECURITY": "SECURITY",
    "CONSTRUCTION": "CONSTRUCTION",
    "SKY SECURITY": "SKY SECURITY",
    "SKY CONSTRUCTION": "SKY CONSTRUCTION",
    "Sky security": "Sky security",
    "Sky construction": "Sky construction",
    "Sky construction ": "Sky construction ",
    "Sky reporting": "Sky reporting",
    "Sky storage": "Sky storage",
    "Sky Storage": "Sky Storage",
    "Sky": "Sky",
    "Guard": "Guard",
    "Komplexní řešení ochrany vašeho objektu": "Comprehensive protection for your property",
    "Komplexní řešení pro vaše stavební projekty": "Comprehensive solution for your construction projects",
    "Komplexní řešení pro ": "Comprehensive solution for ",

    // Features / výhody
    "Proč": "Why",
    "Bezpečí": "Safety",
    "Vše": "All",
    "Veškeré": "All",
    "Tiché": "Quiet",
    "Připojte": "Connect",
    "Kamerový": "Camera",
    "Foto a video": "Photo and video",
    "Termokamera,": "Thermal camera,",
    "GPS,": "GPS,",
    "Noční vidění ": "Night vision ",
    "Termální diagnostika": "Thermal diagnostics",
    "Termální diagnostika a analýza": "Thermal diagnostics and analysis",
    "Termokamera - detekce osob ve tmě": "Thermal camera — person detection at night",
    "Detekce osob ve tmě": "Person detection at night",
    "Aktivní odstrašení": "Active deterrence",
    "Aktivní odrazení a odstrašení pachatele": "Active deterrence of intruders",
    "Okamžité notifikace": "Instant notifications",
    "Voděodolná konstrukce": "Waterproof construction",
    "Pravidelné reporty": "Regular reports",
    "Pravidelný report z nasbíraných dat (PDF)": "Regular report from collected data (PDF)",
    "Foto a video dokumentace (reporty)": "Photo and video documentation (reports)",
    "Fotogammetrie": "Photogrammetry",
    "Fotogammetrické scany": "Photogrammetric scans",
    "Fotogametrie - detailní 3D výstupy": "Photogrammetry — detailed 3D outputs",
    "Ortofotomapa": "Orthophoto map",
    "Ortofotomapa - denní záznamy staveniště": "Orthophoto map — daily site records",
    "Ortofotomapy staveniště": "Construction site orthophoto maps",
    "Sky Storage - online dostupné záznamy": "Sky Storage — online available recordings",
    "Napojení na EPS": "EPS integration",
    "Napojení na existující security systémy": "Integration with existing security systems",
    "Instalace": "Installation",

    // Popisy
    "Naše technologie zajistí, že váš areál bude v bezpečí.": "Our technology keeps your premises safe.",
    "Bezpečnost jako služba, nikoli starost": "Security as a service, not a worry",
    "Dron nepotřebuje odpočinek, dovolenou ani nemocenskou. Navíc je služba daleko levnější.": "The drone needs no rest, vacation, or sick leave. Plus the service costs much less.",
    "Dron automaticky hlídkuje ve zvolených intervalech ve dne i v noci.": "The drone automatically patrols at chosen intervals, day and night.",
    "Dvě integrované termokamery a chytrá AI analýza odhalí narušitele ve tmě.": "Two integrated thermal cameras and smart AI analysis detect intruders in the dark.",
    "Mráz, teplo, déšť, sníh - zařízení pracuje bezchybně v každém počasí.": "Cold, heat, rain, snow — the device works flawlessly in any weather.",
    "O každém narušení, které dron zaznamená informuje do pár vteřin.": "Every breach detected by the drone is reported within seconds.",
    "Při zjištění pohybu mimo zvolenou dobu systém ihned upozorní náš dohled a Vás.": "When motion is detected outside the selected window, the system immediately alerts our monitoring and you.",
    "Postaráme se o zlegalizování použití dronů u Vás, vy nic řešit nemusíte.": "We handle drone legalization at your site, you don't have to deal with anything.",
    "Legislativu vyřešíme za Vás": "We handle the legislation for you",
    "Do kamerových záznamů nahlížíte kdykoliv a odkudkoliv přes naše úložiště.": "Access camera recordings anytime, anywhere via our storage.",
    "Unifikované snadno přístupné úložiště pro kontrolu a operaci se záznamy z dronu.": "Unified, easily accessible storage for reviewing and managing drone recordings.",
    "Denní záznamy stavebního pozemku včetně přehledu o rozmístění stavební techniky.": "Daily records of the construction site, including an overview of equipment placement.",
    "Pravidelné analýzy založené na sesbíraných datech, doplněné o poznatky stavebního procesu.": "Regular analyses based on collected data, supplemented with construction process insights.",
    "Výhody oproti klasické security": "Advantages over traditional security",
    "Construction Management": "Construction Management",
    "Construction Manager": "Construction Manager",

    // FAQ
    "Jak funguje dronová ostraha v praxi?": "How does drone security work in practice?",
    "Jak je dron chráněn proti krádeži nebo poškození?": "How is the drone protected against theft or damage?",
    "Co když dron selže nebo spadne?": "What if the drone fails or crashes?",
    "Co když je špatné počasí? Funguje to i v dešti nebo zimě?": "What about bad weather? Does it work in rain or cold?",

    // Formulář
    "Jméno": "Name",
    "Email": "Email",
    "Volba služby": "Service",
    "Vybrat": "Select",
    "Stavební projekt": "Construction project",
    "Průmyslový areál": "Industrial site",
    "Zemědělský objekt": "Agricultural property",
    "Odeslat": "Submit",

    // Footer
    "Sky Guard s.r.o.": "Sky Guard s.r.o.",
    "Pernerova 533/59, Praha 8": "Pernerova 533/59, Praha 8",
    "IČO: 24803383": "ID: 24803383",
    "C 175699 vedená u Městského soudu v Praze": "C 175699 filed at the Municipal Court in Prague",
    "Comming Soon": "Coming Soon",
    "Facebook": "Facebook",
    "Instagram": "Instagram",
    "LinkedIn": "LinkedIn",
    "Tiktok": "Tiktok",
  };

  const STORAGE_KEY = "sg-lang";
  const getLang = () => localStorage.getItem(STORAGE_KEY) || "cs";
  const setLang = (l) => {
    localStorage.setItem(STORAGE_KEY, l);
    location.reload();
  };

  // Plain text node překlad — pouze přesná shoda klíče v DICT.
  function translateNode(node) {
    if (node.nodeType !== Node.TEXT_NODE) return;
    const v = node.nodeValue;
    if (!v) return;
    const t = v.trim();
    if (!t) return;
    if (DICT.hasOwnProperty(t)) {
      // Zachovej leading/trailing whitespace.
      const lead = v.match(/^\s*/)[0];
      const tail = v.match(/\s*$/)[0];
      const replaced = lead + DICT[t] + tail;
      if (replaced !== v) node.nodeValue = replaced;
    }
  }

  function walk(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      translateNode(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    const tag = root.tagName;
    if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return;
    if (root.id === "sg-lang-switcher") return;
    // placeholders / aria-label u inputů
    if (root.placeholder && DICT.hasOwnProperty(root.placeholder.trim())) {
      root.placeholder = DICT[root.placeholder.trim()];
    }
    if (root.hasAttribute && root.hasAttribute("aria-label")) {
      const al = root.getAttribute("aria-label").trim();
      if (DICT.hasOwnProperty(al)) root.setAttribute("aria-label", DICT[al]);
    }
    for (let i = 0; i < root.childNodes.length; i++) walk(root.childNodes[i]);
  }

  function injectSwitcher() {
    if (document.getElementById("sg-lang-switcher")) return;
    const lang = getLang();
    const wrap = document.createElement("div");
    wrap.id = "sg-lang-switcher";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "Language switcher");
    wrap.style.cssText = [
      "position:fixed",
      "top:20px",
      "right:20px",
      "z-index:2147483647",
      "display:flex",
      "gap:4px",
      "padding:4px",
      "background:rgba(0,0,0,0.55)",
      "backdrop-filter:blur(8px)",
      "-webkit-backdrop-filter:blur(8px)",
      "border:1px solid rgba(255,255,255,0.15)",
      "border-radius:999px",
      "font:600 12px/1 system-ui,-apple-system,'Inter',sans-serif",
      "letter-spacing:0.05em",
    ].join(";");
    const mkBtn = (code, label) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = label;
      const active = lang === code;
      b.style.cssText = [
        "appearance:none",
        "border:0",
        "cursor:pointer",
        "padding:6px 12px",
        "border-radius:999px",
        "color:" + (active ? "#000" : "#fff"),
        "background:" + (active ? "#fff" : "transparent"),
        "font:inherit",
        "transition:background 0.15s, color 0.15s",
      ].join(";");
      b.addEventListener("click", () => {
        if (lang !== code) setLang(code);
      });
      b.addEventListener("mouseenter", () => {
        if (!active) b.style.background = "rgba(255,255,255,0.1)";
      });
      b.addEventListener("mouseleave", () => {
        if (!active) b.style.background = "transparent";
      });
      return b;
    };
    wrap.appendChild(mkBtn("cs", "CS"));
    wrap.appendChild(mkBtn("en", "EN"));
    document.body.appendChild(wrap);
  }

  function start() {
    injectSwitcher();
    if (getLang() !== "en") return;

    document.documentElement.lang = "en";
    if (document.title === "Sky Guard - Dronová ostraha") {
      document.title = "Sky Guard - Drone Security";
    }

    // Initial sweep.
    walk(document.body);

    // Sleduj re-rendery (Framer hydration / route changes).
    const obs = new MutationObserver((records) => {
      for (const r of records) {
        if (r.type === "characterData") {
          translateNode(r.target);
        } else if (r.type === "childList") {
          r.addedNodes.forEach(walk);
        } else if (r.type === "attributes") {
          if (r.attributeName === "placeholder" || r.attributeName === "aria-label") {
            walk(r.target);
          }
        }
      }
    });
    obs.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["placeholder", "aria-label"],
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
