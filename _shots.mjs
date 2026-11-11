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

async function newPage(width, height, dpr = 1) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: dpr });
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`[console] ${msg.text()}`);
  });
  page.on("pageerror", (err) => errors.push(`[pageerror] ${err.message}`));
  return page;
}

const desktop = await newPage(1440, 900);
await desktop.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
await desktop.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });
await sleep(3200);
await desktop.screenshot({ path: `${OUT}\\shot-walk.png` });
await sleep(2600);
await desktop.screenshot({ path: `${OUT}\\shot-dissolve.png` });
await sleep(900);
await desktop.screenshot({ path: `${OUT}\\shot-logo.png` });
await sleep(1800);
await desktop.screenshot({ path: `${OUT}\\shot-hero.png` });
await desktop.screenshot({ path: `${OUT}\\shot-full.png`, fullPage: true });

const viewportHeight = await desktop.evaluate(() => document.documentElement.scrollHeight);
console.log("desktop scrollHeight", viewportHeight);

const mobile = await newPage(390, 844, 2);
await mobile.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
await mobile.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });
await sleep(9000);
await mobile.screenshot({ path: `${OUT}\\shot-mobile-hero.png` });
await mobile.screenshot({ path: `${OUT}\\shot-mobile-full.png`, fullPage: true });
const mobileHeight = await mobile.evaluate(() => document.documentElement.scrollHeight);
const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
console.log("mobile scrollHeight", mobileHeight, "horizontal overflow", overflow);

console.log("errors", JSON.stringify(errors, null, 2));
await browser.close();
