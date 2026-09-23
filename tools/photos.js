/* Les Pages Bleues — crée les versions réduites des photos (…-480.webp, et …-800.webp pour les
   photos de plus de 1000 px de large), utilisées par le site sur les petits écrans.
   Lancement : npm run photos   (après avoir ajouté une photo dans assets/img/photos)
   Nécessite Chromium via Playwright (npx playwright install chromium). */

const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const DIR = path.join(__dirname, "..", "assets", "img", "photos");
const force = process.argv.includes("--force");

(async () => {
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const page = await browser.newPage();
  const originals = fs.readdirSync(DIR).filter(f => /^[a-z]+\.webp$/.test(f));
  let made = 0;
  for (const f of originals) {
    const dataUrl = "data:image/webp;base64," + fs.readFileSync(path.join(DIR, f)).toString("base64");
    const width = await page.evaluate(async src => { const i = new Image(); i.src = src; await i.decode(); return i.naturalWidth; }, dataUrl);
    for (const w of width > 1000 ? [480, 800] : [480]) {
      const out = path.join(DIR, f.replace(".webp", `-${w}.webp`));
      if (fs.existsSync(out) && !force) continue;
      const result = await page.evaluate(async ({ src, w }) => {
        const img = new Image(); img.src = src; await img.decode();
        const c = document.createElement("canvas");
        c.width = w; c.height = Math.round(img.naturalHeight * w / img.naturalWidth);
        const ctx = c.getContext("2d"); ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, c.width, c.height);
        return c.toDataURL("image/webp", 0.74);
      }, { src: dataUrl, w });
      fs.writeFileSync(out, Buffer.from(result.split(",")[1], "base64"));
      console.log("créé", path.basename(out));
      made++;
    }
  }
  await browser.close();
  console.log(made ? `${made} image(s) créée(s).` : "Toutes les versions réduites existent déjà.");
})();
