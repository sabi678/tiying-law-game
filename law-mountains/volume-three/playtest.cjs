const { chromium } = require('C:/Users/Huawei/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const { pathToFileURL } = require('url');
const path = require('path');
const fs = require('fs');
const assert = require('assert');

const root = path.resolve(__dirname, '../../../output/少了一斗的粟_重刑剧情_本地验收');
const shots = path.join(root, '关键截图');
fs.mkdirSync(shots, { recursive: true });
const gameUrl = pathToFileURL(path.join(__dirname, 'index.html')).href;
const hubUrl = pathToFileURL(path.join(__dirname, '../index.html')).href;
const oldUrl = pathToFileURL(path.join(__dirname, '../shao-yidou/index.html')).href;

async function current(page) { return page.evaluate(() => window.__storySample.current); }
async function reach(page, target) {
  for (let i = 0; i < 100; i++) {
    const id = await current(page);
    if (id === target) return;
    await page.locator(id.startsWith('task') ? '#task-next' : '#next-button').click();
  }
  throw new Error(`Could not reach ${target}`);
}
async function choose(page, target, index) {
  await reach(page, target);
  const button = page.locator('.choice-button').nth(index);
  assert(await button.isEnabled(), `${target} choice ${index} locked unexpectedly`);
  await button.click();
}
async function layout(page, label) {
  await page.locator('.portrait').evaluateAll(imgs => Promise.all(imgs.map(img => img.decode().catch(() => {}))));
  const result = await page.evaluate(() => {
    const box = document.querySelector('.dialogue').getBoundingClientRect();
    return {
      horizontal: document.documentElement.scrollWidth > innerWidth,
      portraits: [...document.querySelectorAll('.portrait')].every(i => i.complete && i.naturalWidth > 0),
      panel: box.left >= 0 && box.right <= innerWidth && box.bottom <= innerHeight + 1,
      buttons: [...document.querySelectorAll('.choice-button:not(:disabled)')].every(b => b.getBoundingClientRect().right <= box.right + 1),
      images: [...document.querySelectorAll('.portrait')].map(i => i.naturalWidth)
    };
  });
  assert(!result.horizontal && result.portraits && result.panel && result.buttons, `${label}: ${JSON.stringify(result)}`);
}
async function shot(page, label, number, name) {
  await layout(page, `${label} ${name}`);
  await page.screenshot({ path: path.join(shots, `${label}_${number}_${name}.png`) });
}
async function route(browser, label, viewport, picks, resolution, notice) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(gameUrl);
  await shot(page, label, '01', '开场交易');
  await reach(page, 'neighborDeterrence');
  assert((await page.locator('#line').innerText()).includes('有意短给'));
  await shot(page, label, '01b', '虚构先例威慑');
  await choose(page, 'publicChoice', picks[0]);
  await reach(page, 'remeasure');
  await page.locator('#source-button').click();
  assert((await page.locator('#source-title').innerText()).includes('效律'));
  assert((await page.locator('#source-body').innerText()).includes('私人粮食交易'));
  await page.locator('#source-close').click();
  await choose(page, 'tianChoice', picks[1]);
  await choose(page, 'ayeChoice', picks[2]);
  await reach(page, 'recordChoice');
  await page.locator('#source-button').click();
  assert((await page.locator('#source-body').innerText()).includes('封诊式'));
  await page.locator('#source-close').click();
  await choose(page, 'recordChoice', picks[3]);
  await reach(page, 'judgmentChoice');
  await page.locator('#source-button').click();
  assert((await page.locator('#source-body').innerText()).includes('法律答问'));
  await page.locator('#source-close').click();
  await shot(page, label, '02', '处理意见');
  const available = await page.locator('.choice-button').evaluateAll(bs => bs.map(b => !b.disabled));
  assert.deepEqual(available, [picks[0] === 0, picks[3] === 0 && (picks[1] === 0 || picks[2] === 0), true]);
  await page.locator('.choice-button').nth(resolution).click();
  if (resolution === 0) {
    await reach(page, 'severeTian');
    assert((await page.locator('#place').innerText()).includes('教学反事实推演'));
    assert((await page.locator('#line').innerText()).includes('重刑已经落到我身上'));
    await shot(page, label, '02b', '反事实重刑裁断');
  }
  await reach(page, 'noticeChoice');
  await shot(page, label, '03', '市口说明');
  await page.locator('.choice-button').nth(notice).click();
  await reach(page, 'homeEvening');
  await shot(page, label, '04', '田禾家门');
  await reach(page, 'measurerLater');
  await shot(page, label, '05', '后来报错');
  await reach(page, 'reviewSpring');
  assert((await page.locator('#place').innerText()).includes('春秋'));
  await page.locator('#source-button').click();
  assert((await page.locator('#source-body').innerText()).includes('不是秦朝本案的法条'));
  assert((await page.locator('#source-era').innerText()).includes('春秋、战国'));
  await page.locator('#source-close').click();
  await shot(page, label, '06', '春秋独立复盘');
  await reach(page, 'final');
  await shot(page, label, '07', '卷终');
  assert((await page.locator('#line').innerText()).includes('仍不等于故意已查清'));
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('lvmai-shao-third-v2')));
  assert.equal(saved.current, 'final');
  assert.equal(saved.state.notice, notice ? 'quiet' : 'clear');
  await page.reload();
  assert.equal(await current(page), 'final', 'reload did not resume');
  await page.locator('#end-replay').click();
  assert.equal(await current(page), 'intro', 'replay did not reset');
  assert.equal(errors.length, 0, errors.join('\n'));
  console.log(`${label}: main route, asset rendering, save and replay passed`);
  await context.close();
}
async function combinations(browser) {
  const context = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await context.newPage();
  let passed = 0;
  for (let n = 0; n < 16; n++) {
    const p = [0, 1, 2, 3].map(i => (n >> i) & 1);
    await page.goto(gameUrl);
    await page.locator('#restart-button').click();
    await choose(page, 'publicChoice', p[0]);
    await choose(page, 'tianChoice', p[1]);
    await choose(page, 'ayeChoice', p[2]);
    await choose(page, 'recordChoice', p[3]);
    await reach(page, 'judgmentChoice');
    const available = await page.locator('.choice-button').evaluateAll(bs => bs.map(b => !b.disabled));
    for (let resolution = 0; resolution < 3; resolution++) {
      if (!available[resolution]) continue;
      await page.locator('.choice-button').nth(resolution).click();
      await reach(page, 'noticeChoice');
      await page.locator('.choice-button').nth(n % 2).click();
      await reach(page, 'final');
      passed++;
      await page.locator('#end-replay').click();
      await choose(page, 'publicChoice', p[0]);
      await choose(page, 'tianChoice', p[1]);
      await choose(page, 'ayeChoice', p[2]);
      await choose(page, 'recordChoice', p[3]);
      await reach(page, 'judgmentChoice');
    }
  }
  console.log(`${passed} reachable decision combinations ended successfully`);
  await context.close();
}
async function navigation(browser) {
  const context = await browser.newContext({ viewport: { width: 1366, height: 768 } });
  const page = await context.newPage();
  await page.goto(hubUrl);
  await page.getByRole('button', { name: '进入十案图' }).click();
  const third = page.locator('#caseGrid button').nth(2);
  assert((await third.innerText()).includes('少了一斗的粟'));
  await third.click();
  await page.waitForURL(/volume-three/);
  assert.equal(await current(page), 'intro');
  await choose(page, 'publicChoice', 1);
  await choose(page, 'tianChoice', 0);
  await choose(page, 'ayeChoice', 0);
  await choose(page, 'recordChoice', 0);
  await choose(page, 'judgmentChoice', 1);
  await choose(page, 'noticeChoice', 0);
  await reach(page, 'final');
  await page.locator('.home-button').click();
  await page.waitForURL(/index\.html\?map=1/);
  assert(await page.locator('#map').isVisible());
  assert((await page.locator('#caseGrid button').nth(2).innerText()).includes('重读案卷'));
  await page.goto(oldUrl);
  await page.waitForURL(/volume-three/);
  console.log('Hub third-volume entrance, return to map and old-link redirect passed');
  await context.close();
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  if (!process.env.NAV_ONLY) {
    await route(browser, '桌面_反事实重刑', { width: 1440, height: 900 }, [0, 0, 0, 0], 0, 0);
    await route(browser, '手机390_反事实重刑', { width: 390, height: 844 }, [0, 1, 1, 1], 0, 1);
    await route(browser, '手机390_回应损失', { width: 390, height: 844 }, [1, 0, 0, 0], 1, 0);
    await route(browser, '手机320_补记续查', { width: 320, height: 700 }, [1, 1, 1, 1], 2, 1);
    await combinations(browser);
  }
  await navigation(browser);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
