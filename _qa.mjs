import puppeteer from "puppeteer-core";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const OUT = "C:\\Users\\dyparis\\AppData\\Local\\Temp\\opencode";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--font-render-hinting=none"],
});

const errors = [];
function watch(page) {
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`[console] ${msg.text()}`);
  });
  page.on("pageerror", (err) => errors.push(`[pageerror] ${err.message}`));
}

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
watch(page);
await page.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });
await page.waitForFunction(() => !document.querySelector(".intro"), { timeout: 20000 });

await page.evaluate(() => window.scrollTo(0, 0));
await sleep(300);
const metrics = await page.evaluate(() => {
  const h = document.querySelector(".hero");
  const foot = document.querySelector(".hero-foot");
  const marquee = document.querySelector(".marquee");
  return {
    heroHeight: h?.getBoundingClientRect().height,
    footTop: foot?.getBoundingClientRect().top,
    marqueeTop: marquee?.getBoundingClientRect().top,
    viewport: window.innerHeight,
  };
});
console.log("hero metrics", JSON.stringify(metrics));

async function scrollAll() {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.7);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
  });
  await sleep(500);
}

await scrollAll();
await page.evaluate(() => window.scrollTo(0, 0));
await sleep(500);

const sections = ["sobre", "servicos", "projetos", "processo", "padrao", "tecnologia", "contato"];
for (const id of sections) {
  await page.evaluate((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 84);
  }, id);
  await sleep(800);
  await page.screenshot({ path: `${OUT}\\sec-${id}.png` });
}

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await sleep(900);
await page.screenshot({ path: `${OUT}\\sec-footer.png` });

// ---- project modal ----
await page.evaluate(() => {
  const el = document.getElementById("projetos");
  if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 84);
});
await sleep(500);
await page.click(".project-media");
await sleep(700);
const modalOpen = await page.$eval(".modal", (el) => Boolean(el));
await page.screenshot({ path: `${OUT}\\modal.png` });
await page.keyboard.press("Escape");
await sleep(500);
const modalClosed = await page.evaluate(() => !document.querySelector(".modal"));

// ---- form validation ----
await page.evaluate(() => {
  const el = document.getElementById("contato");
  if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 60);
});
await sleep(700);
await page.click(".contact-submit");
await sleep(400);
const errorCount = await page.$$eval(".field-error", (els) => els.length);
const errorTexts = await page.$$eval(".field-error", (els) => els.map((e) => e.textContent.trim()));
await page.screenshot({ path: `${OUT}\\form-errors.png` });

// ---- fill and submit ----
await page.type("#name", "Teste de Qualidade");
await page.type("#email", "qa@example.com");
await page.select("#projectType", "Website institucional");
await page.type("#message", "Preciso de um site institucional com identidade própria, performance e estrutura preparada para evoluir.");
await page.click(".check-box");
await sleep(300);
await page.click(".contact-submit");
await sleep(900);
const result = await page.evaluate(() => {
  const node = document.querySelector(".contact-result");
  return node ? node.textContent.slice(0, 240) : null;
});
await page.screenshot({ path: `${OUT}\\form-result.png` });

// ---- mobile menu ----
const mobile = await browser.newPage();
await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await mobile.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
watch(mobile);
await mobile.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });
await mobile.waitForFunction(() => !document.querySelector(".intro"), { timeout: 20000 });
await mobile.click(".menu-toggle");
await sleep(700);
await mobile.screenshot({ path: `${OUT}\\mobile-menu.png` });
const menuInfo = await mobile.evaluate(() => {
  const menu = document.querySelector(".mobile-menu");
  const links = menu ? menu.querySelectorAll("a").length : 0;
  return { open: menu?.classList.contains("is-open"), links, overflow: document.documentElement.scrollWidth > window.innerWidth };
});

// mobile sections
await mobile.evaluate(() => {
  document.documentElement.style.scrollBehavior = "auto";
});
await mobile.click(".mobile-menu a[href='#servicos']");
await sleep(1200);
await mobile.screenshot({ path: `${OUT}\\mobile-services.png` });
await mobile.evaluate(() => {
  const el = document.getElementById("projetos");
  if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 70);
});
await sleep(1200);
await mobile.screenshot({ path: `${OUT}\\mobile-portfolio.png` });
await mobile.evaluate(() => {
  const el = document.getElementById("contato");
  if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 70);
});
await sleep(1200);
await mobile.screenshot({ path: `${OUT}\\mobile-contact.png` });

await mobile.evaluate(() => {
  const el = document.getElementById("tecnologia");
  if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 70);
});
await sleep(1200);
await mobile.screenshot({ path: `${OUT}\\mobile-tech.png` });

console.log(
  JSON.stringify(
    { modalOpen, modalClosed, errorCount, errorTexts, result, menuInfo, errors },
    null,
    2,
  ),
);

await browser.close();
