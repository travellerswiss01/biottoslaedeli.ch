// Optional browser regression suite; Playwright is a development tool, not a site dependency.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out =
  process.env.QA_OUTPUT_DIR || path.join(os.tmpdir(), 'biottos-browser-qa');
fs.mkdirSync(out, { recursive: true });
(async () => {
  const s = http
    .createServer((req, res) => {
      const p = path.join(
        root,
        decodeURIComponent(
          req.url.split('?')[0] === '/' ? '/index.html' : req.url.split('?')[0],
        ),
      );
      if (fs.existsSync(p) && fs.statSync(p).isFile()) {
        res.setHeader(
          'Content-Type',
          p.endsWith('.html')
            ? 'text/html'
            : p.endsWith('.js')
              ? 'application/javascript'
              : p.endsWith('.css')
                ? 'text/css'
                : p.endsWith('.svg')
                  ? 'image/svg+xml'
                  : 'image/jpeg',
        );
        res.end(fs.readFileSync(p));
      } else {
        res.statusCode = 404;
        res.end();
      }
    })
    .listen(8765, '127.0.0.1');
  const b = await chromium.launch({
    ...(process.env.CHROMIUM_PATH
      ? { executablePath: process.env.CHROMIUM_PATH }
      : {}),
    headless: true,
  });
  let failures = [],
    count = 0,
    requests = 0,
    mode = 'success',
    payloads = [];
  const context = await b.newContext({ timezoneId: 'America/Los_Angeles' });
  await context.route('**/*', async (r) => {
    const url = r.request().url();
    if (url.startsWith('http://127.0.0.1:8765')) return r.continue();
    if (url.startsWith('https://formspree.io/')) {
      requests++;
      payloads.push(r.request().postData());
      if (mode === 'network') return r.abort();
      if (mode === 'slow')
        await new Promise((resolve) => setTimeout(resolve, 250));
      return r.fulfill({
        status: mode === 'error' ? 422 : 200,
        contentType: 'application/json',
        body: mode === 'error' ? '{}' : '{"ok":true}',
      });
    }
    return r.abort();
  });
  const p = await context.newPage();
  p.setDefaultTimeout(5000);
  p.on('pageerror', (e) => failures.push(e.message));
  p.on('response', (r) => {
    if (r.url().startsWith('http://127.0.0.1') && r.status() >= 400)
      failures.push(r.status() + ' ' + r.url());
  });
  await p.clock.install({ time: new Date('2026-10-06T22:30:00Z') });
  const views = [
    'start',
    'koerbe',
    'gartenprodukte',
    'traubensaft',
    'suessmost',
    'essig',
    'doerrfruechte',
    'tee',
    'ueber-uns',
    'laedeli',
    'lucia-kocht',
    'otto-garten',
    'abholung',
    'faq',
    'kontakt',
  ];
  for (const width of [360, 390, 768, 1440]) {
    await p.setViewportSize({ width, height: 900 });
    for (const file of ['', 'geschenkskoerbe.html', 'firmengeschenke.html']) {
      await p.goto('http://127.0.0.1:8765/' + file);
      for (const view of file ? [''] : views) {
        if (view) await p.evaluate((v) => (location.hash = v), view);
        await p.locator('main').waitFor();
        await p.evaluate(async () => {
          for (const img of document.querySelectorAll('img[src]'))
            if (img.getClientRects().length) {
              img.loading = 'eager';
              try {
                await img.decode();
              } catch {}
            }
        });
        const data = await p.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          broken: [...document.querySelectorAll('img[src]')]
            .filter(
              (i) =>
                i.getClientRects().length &&
                (!i.complete || i.naturalWidth === 0),
            )
            .map((i) => i.getAttribute('src')),
        }));
        assert.equal(data.overflow, false, file + '#' + view + ' ' + width);
        assert.deepEqual(data.broken, [], file + '#' + view);
        count++;
        if (
          (width === 390 || width === 1440) &&
          ((!file && ['start', 'koerbe', 'suessmost'].includes(view)) || file)
        ) {
          await p.screenshot({
            path:
              out +
              '/' +
              (file ? file.replace('.html', '') : view) +
              '-' +
              width +
              '.png',
            fullPage: true,
          });
        }
      }
    }
  }
  await p.goto('http://127.0.0.1:8765/#suessmost');
  for (let i = 0; i < 5; i++) {
    await p.locator('[data-hero-story="' + i + '"]').click();
    assert.equal(
      await p
        .locator('[data-hero-story="' + i + '"]')
        .getAttribute('aria-current'),
      'step',
    );
    await p.locator('.hero-photo-target').evaluate((i) => i.decode());
  }
  count += 5;
  await p.setViewportSize({ width: 390, height: 844 });
  await p.goto('http://127.0.0.1:8765/');
  await p.locator('#menuToggle').click();
  assert.equal(
    await p.locator('#menuToggle').getAttribute('aria-expanded'),
    'true',
  );
  await p.locator('#siteNav a[href="#koerbe"]').click();
  assert.equal(
    await p.locator('#menuToggle').getAttribute('aria-expanded'),
    'false',
  );
  count++;
  await p.waitForFunction(() => document.body.dataset.currentView === 'koerbe');
  const original = await p.locator('main').innerText();
  await p.locator('#langSwitch').click();
  assert.equal(await p.locator('html').getAttribute('lang'), 'gsw-CH');
  await p.locator('#langSwitch').click();
  assert.equal(await p.locator('main').innerText(), original);
  count++;
  async function select(id, qty) {
    await p.locator('.korb-card [data-open="' + id + '"]').click();
    assert.equal(
      await p.locator('#nextPickupDate').innerText(),
      'Do, 08.10.2026',
    );
    await p.locator('#cD label').first().click();
    await p.locator('[data-time="08:00"]').click();
    await p
      .locator('#cN label')
      .nth(qty - 1)
      .click();
    await p.locator('#customerName').fill('Test Vorschau');
    await p.locator('#customerEmail').fill('preview@example.invalid');
  }
  for (const [id, price, qty] of [
    ['gross', 49.95, 10],
    ['fein', 29.95, 2],
    ['chili', 19.95, 1],
  ]) {
    await select(id, qty);
    assert.equal(
      await p.locator('#checkoutTotal').innerText(),
      'CHF ' + (price * qty).toFixed(2),
    );
    assert.equal(await p.locator('#cN input').count(), 10);
    await p.locator('#directForm button[type=submit]').click();
    await p.locator('#successScene').waitFor({ state: 'visible' });
    assert.equal(
      await p.locator('#successTotal').innerText(),
      'CHF ' + (price * qty).toFixed(2),
    );
    await p.locator('#successClose').click();
    await p.evaluate(() => (location.hash = 'koerbe'));
    count++;
  }
  for (const outcome of ['error', 'network']) {
    mode = outcome;
    await select('gross', 1);
    await p.locator('#directForm button[type=submit]').click();
    await p.locator('#directConfirm').waitFor({ state: 'visible' });
    assert.equal(
      await p.locator('#customerName').inputValue(),
      'Test Vorschau',
    );
    assert.equal(
      await p.locator('#directForm button[type=submit]').isEnabled(),
      true,
    );
    await p.locator('#x').click();
    count++;
  }
  mode = 'slow';
  await select('fein', 1);
  let before = requests;
  await p.evaluate(() => {
    const f = document.querySelector('#directForm');
    f.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    f.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });
  await p.locator('#successScene').waitFor({ state: 'visible' });
  assert.equal(requests - before, 1);
  count++;
  await p.locator('#successClose').click();
  await p.evaluate(() => (location.hash = 'koerbe'));
  mode = 'success';
  await select('chili', 1);
  await p.locator('.contact-tabs label').nth(1).click();
  await p.locator('#customerPhone').fill('+41 00 000 00 00');
  await p.locator('#directForm button[type=submit]').click();
  await p.locator('#successScene').waitFor({ state: 'visible' });
  assert.ok(!payloads.at(-1).includes('preview@example.invalid'));
  count++;
  await p.locator('#successClose').click();
  await p.evaluate(() => (location.hash = 'koerbe'));
  await select('gross', 1);
  await p.locator('#x').focus();
  await p.keyboard.press('Shift+Tab');
  assert.equal(
    await p.evaluate(() => document.activeElement.dataset.stepBack),
    'n',
  );
  await p.keyboard.press('Tab');
  assert.equal(await p.evaluate(() => document.activeElement.id), 'x');
  count++;
  // Validation must reject whitespace names and out-of-range quantities without sending.
  let sent = requests;
  await p.locator('#customerName').fill('   ');
  await p.evaluate(() =>
    document
      .querySelector('#directForm')
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })),
  );
  assert.equal(requests, sent);
  assert.equal(await p.locator('#directConfirm').isVisible(), true);
  count++;
  await p.locator('#customerName').fill('Test Vorschau');
  await p.evaluate(() => {
    let input = document.createElement('input');
    input.name = 'n';
    input.value = '11';
    document.querySelector('#cN').appendChild(input);
    input.dispatchEvent(new Event('change', { bubbles: true }));
    document
      .querySelector('#directForm')
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });
  assert.equal(requests, sent);
  assert.equal(await p.locator('#directConfirm').isVisible(), true);
  count++;
  await p.locator('#x').click();
  await select('gross', 1);
  await p.locator('#sp').focus();
  await p.keyboard.press('Enter');
  assert.equal(await p.locator('#lb').getAttribute('aria-hidden'), 'false');
  await p.keyboard.press('Escape');
  assert.equal(await p.locator('#ov').getAttribute('aria-hidden'), 'false');
  assert.equal(await p.evaluate(() => document.activeElement.id), 'sp');
  count++;
  await p.clock.setSystemTime(new Date('2026-10-07T22:30:00Z'));
  sent = requests;
  await p.locator('#directForm button[type=submit]').click();
  assert.equal(requests, sent);
  assert.equal(await p.locator('#directConfirm').isVisible(), true);
  count++;
  await p.locator('#x').click();
  await p.clock.setSystemTime(new Date('2026-10-10T10:00:00Z'));
  await p.locator('.korb-card [data-open="gross"]').click();
  assert.equal(
    await p.locator('#nextPickupDate').innerText(),
    'Mo, 12.10.2026',
  );
  await p.locator('#x').click();
  count++;
  await p.clock.setSystemTime(new Date('2026-11-30T10:00:00Z'));
  await p.locator('.korb-card [data-open="gross"]').click();
  let last = [];
  for (let i = 0; i < 16; i++) {
    last = await p
      .locator('#cD input')
      .evaluateAll((items) => items.map((i) => i.value));
    if (await p.locator('#weekNext').isHidden()) break;
    await p.locator('#weekNext').click();
  }
  assert.equal(last.at(-1), 'Sa, 27.02.2027');
  await p.locator('#x').click();
  count++;
  await p.locator('[data-legal="impressum"]').click();
  assert.equal(await p.evaluate(() => document.activeElement.id), 'lgx');
  await p.keyboard.press('Escape');
  assert.equal(await p.locator('#lg').getAttribute('aria-hidden'), 'true');
  count++;
  assert.deepEqual(failures, []);
  console.log(
    JSON.stringify(
      {
        checks: count,
        simulatedRequests: requests,
        errors: failures,
        screenshots: out,
      },
      null,
      2,
    ),
  );
  await b.close();
  s.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
