const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
let chromium;
try { ({ chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright")); }
catch { ({ chromium } = require("C:/Users/Huawei/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright")); }
const url = process.env.GAME_URL || "http://127.0.0.1:8770/law-mountains/shao-yidou/";

async function frame(page, label) {
  const result = await page.evaluate(async () => {
    const bg = document.querySelector("#scene-image");
    const portrait = document.querySelector("#portrait");
    await bg.decode();
    if (!portrait.hidden) await portrait.decode();
    const panel = document.querySelector(".dialogue").getBoundingClientRect();
    return {
      bg: bg.naturalWidth > 0, portrait: portrait.hidden || portrait.naturalWidth > 0,
      overflow: document.documentElement.scrollWidth > innerWidth,
      panel: panel.left >= 0 && panel.right <= innerWidth && panel.top >= 0 && panel.bottom <= innerHeight,
      bounds: [panel.left, panel.top, panel.right, panel.bottom, innerWidth, innerHeight]
    };
  });
  assert.ok(result.bg && result.portrait, `${label}: image missing`);
  assert.equal(result.overflow, false, `${label}: horizontal overflow`);
  assert.equal(result.panel, true, `${label}: clipped panel ${result.bounds}`);
}
async function click(page, id) { await page.locator(`[data-action="${id}"]`).click(); }
async function shot(page, file) {
  const dir = process.env.SCREENSHOT_DIR || __dirname;
  fs.mkdirSync(dir, { recursive: true });
  await page.screenshot({ path: path.join(dir, file) });
}
async function card(page, id) {
  await page.locator(`[data-card="${id}"]`).click();
  assert.match(await page.locator("#overlay-body").innerText(), /可核实史实/);
  assert.match(await page.locator("#overlay-body").innerText(), /虚构案情边界/);
  await page.locator("#overlay-close").click();
}
async function start(page, opts, prefix) {
  await page.goto(url, { waitUntil: "load" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "load" });
  await frame(page, `${prefix} buyer`);
  await shot(page, `${prefix}_01告发.png`);
  await card(page, "law");
  await click(page, `buyer:${opts.buyer}`);
  await click(page, "next:inspect");
  await frame(page, `${prefix} inspect`);
  await click(page, `route:${opts.route}`);
  await card(page, "record");
  await click(page, `encounter:${opts.encounter}`);
  await shot(page, `${prefix}_02问话线索.png`);
  await click(page, "next:tian");
  await click(page, `tian:${opts.tian}`);
  await frame(page, `${prefix} tian`);
  await shot(page, `${prefix}_03田禾回应.png`);
  await click(page, "next:clerk");
  await card(page, "governance");
  await click(page, `clerk:${opts.clerk}`);
  await click(page, "next:hearing");
  await frame(page, `${prefix} hearing`);
  await shot(page, `${prefix}_04裁断.png`);
}
async function finish(page, ending, prefix) {
  if (ending === "C") { await click(page, "verdict:C"); await click(page, "verdict:C-final"); }
  else await click(page, `verdict:${ending}`);
  await click(page, "submit");
  assert.match(await page.locator(".inline-error").innerText(), /援引的依据/);
  await click(page, ending === "A" ? "basis:deterrence" : "basis:fact");
  await click(page, "submit");
  assert.match(await page.locator(".inline-error").innerText(), /完整的话/);
  await page.locator("#reason").fill("共同复量已确认现存短少；故意仍需独立证据，量粮环节也应核查。");
  await click(page, "submit");
  await frame(page, `${prefix} outcome`);
  await shot(page, `${prefix}_05人物影响.png`);
  for (const next of ["outcomeTian", "outcomeFamily", "future", "reform"]) await click(page, `next:${next}`);
  await frame(page, `${prefix} reform`);
  await shot(page, `${prefix}_06规则选择.png`);
  await click(page, "measure:0"); await click(page, "measure:2"); await click(page, "measure:5");
  await click(page, "reform:submit");
  assert.match(await page.locator("#place").innerText(), /春秋/);
  await card(page, "spring");
  await click(page, "era:spring-bounded");
  await click(page, "next:eraWarring");
  assert.match(await page.locator("#place").innerText(), /战国/);
  assert.equal(await page.locator("#scene-image").isHidden(), true);
  await shot(page, `${prefix}_07战国制度对照.png`);
  await card(page, "warring");
  await click(page, "era:warring-bounded");
  await click(page, "next:eraQin");
  assert.match(await page.locator("#place").innerText(), /秦朝/);
  await click(page, "era:qin-bounded");
  await click(page, "next:reveal");
  assert.match(await page.locator("#speech").innerText(), /没有证据证明/);
  await click(page, "next:finish");
  assert.match(await page.locator(".finish-question").innerText(), /你的处理/);
  await frame(page, `${prefix} finish`);
  await shot(page, `${prefix}_08分时代复盘.png`);
  await click(page, "journal");
  assert.match(await page.locator("#overlay-body").innerText(), /裁断理由/);
  await page.locator("#overlay-close").click();
}

async function testRecovery(browser) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await start(page, { buyer: "severe", route: "road", encounter: "scope", tian: "threat", clerk: "full" }, "手机补查");
  assert.equal(await page.locator('[data-action="verdict:B"]').isDisabled(), true);
  await click(page, "verdict:C");
  await click(page, "follow:tian");
  assert.match(await page.locator("#speech").innerText(), /继续查/);
  await click(page, "next:hearing");
  assert.equal(await page.locator('[data-action="verdict:B"]').isEnabled(), true);
  await page.reload({ waitUntil: "load" });
  assert.equal(await page.locator('[data-action="verdict:B"]').isEnabled(), true);
  await page.close();
}

async function testSiteEntry(browser) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(new URL("../", url).toString(), { waitUntil: "load" });
  assert.equal(await page.locator('a[href="./shao-yidou/?v=2"]').count(), 2);
  await page.locator("#title .shao-entry-link").click();
  await page.waitForURL(/shao-yidou/);
  assert.match(await page.locator("#speaker").innerText(), /孟庸/);
  await page.locator(".back-link").click();
  await page.waitForURL(/law-mountains\/$/);
  assert.match(await page.locator("#title h1").innerText(), /律脉千秋/);
  await page.close();
}

async function testInvalidSavedProgress(browser) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(url, { waitUntil: "load" });
  await page.evaluate(() => localStorage.setItem("shaoyidou-full-v1", JSON.stringify({ version: 1, step: "missing-stage", logs: [] })));
  await page.reload({ waitUntil: "load" });
  assert.match(await page.locator("#speaker").innerText(), /孟庸/);
  assert.equal(await page.locator('[data-action="buyer:loss"]').isEnabled(), true);
  assert.deepEqual(errors, []);
  await page.close();
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_PATH || "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" });
  try {
    if (process.argv.includes("--storage-only")) {
      await testInvalidSavedProgress(browser);
      console.log("PASS: invalid saved stage recovers to the playable opening");
      return;
    }
    const b = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await start(b, { buyer: "rules", route: "road", encounter: "scope", tian: "open", clerk: "full" }, "桌面B");
    assert.equal(await b.locator('[data-action="verdict:B"]').isEnabled(), true);
    await card(b, "severe");
    await finish(b, "B", "桌面B");
    await b.close();

    const a = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await start(a, { buyer: "severe", route: "market", encounter: "pressure", tian: "threat", clerk: "presume" }, "手机A");
    assert.equal(await a.locator('[data-action="verdict:B"]').isDisabled(), true);
    await finish(a, "A", "手机A");
    await a.close();

    const c = await browser.newPage({ viewport: { width: 320, height: 700 } });
    await start(c, { buyer: "loss", route: "market", encounter: "accept", tian: "threat", clerk: "brief" }, "手机C");
    await finish(c, "C", "手机C");
    await c.close();

    const d = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await start(d, { buyer: "loss", route: "market", encounter: "verify", tian: "open", clerk: "brief" }, "手机D");
    await finish(d, "D", "手机D");
    await d.close();
    await testRecovery(browser);
    await testSiteEntry(browser);
    await testInvalidSavedProgress(browser);
    console.log("PASS: four endings, source cards, era boundaries, desktop 1440 and mobile 390/320");
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
