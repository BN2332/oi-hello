import puppeteer from "puppeteer-core";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
await page.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });
await page.waitForFunction(() => !document.querySelector(".intro"), { timeout: 20000 });
await page.evaluate(() => {
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, document.documentElement.scrollHeight);
});
await new Promise((r) => setTimeout(r, 500));
const m = await page.evaluate(() => {
  const wm = document.querySelector(".footer-watermark");
  const footer = document.querySelector(".site-footer");
  const r = wm.getBoundingClientRect();
  return {
    scrollY: window.scrollY,
    scrollHeight: document.documentElement.scrollHeight,
    viewport: window.innerHeight,
    wmTop: r.top,
    wmBottom: r.bottom,
    footerBottom: footer.getBoundingClientRect().bottom,
  };
});
console.log(JSON.stringify(m, null, 2));
await page.screenshot({ path: "C:\\Users\\dyparis\\AppData\\Local\\Temp\\opencode\\sec-footer2.png" });
await browser.close();
