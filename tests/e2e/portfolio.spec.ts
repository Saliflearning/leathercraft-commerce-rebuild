import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

async function expectNoSeriousAccessibilityViolations(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter(
    ({ impact }) => impact === 'serious' || impact === 'critical',
  );
  expect(blocking).toEqual([]);
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.localStorage.clear());
  await page.goto('/');
});

test('recruiter can verify the bounded three-stage story', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1, name: /learning rebuilt/i })).toBeVisible();
  await expect(page.getByText(/clean-room reconstruction/i)).toBeVisible();

  const timeline = page.getByRole('region', { name: /three-stage learning timeline/i });
  await expect(timeline.getByRole('article')).toHaveCount(3);
  await expect(
    timeline.getByRole('heading', { name: /2019 · static storefront concept/i }),
  ).toBeVisible();
  await expect(
    timeline.getByRole('heading', { name: /2022 · custom team marketplace/i }),
  ).toBeVisible();
  await expect(
    timeline.getByRole('heading', { name: /2023 · personal hci and commerce redesign/i }),
  ).toBeVisible();
  await expect(page.getByText(/assigned coding lead\/contributor/i).first()).toBeVisible();
  await expectNoSeriousAccessibilityViolations(page);

  await page.goto('/#catalog');
  await expect(
    page.getByRole('heading', { name: /commerce interaction, without pretending/i }),
  ).toBeInViewport();
  await page.goto('/#cart');
  await expect(page.getByRole('heading', { name: 'Demo cart', exact: true })).toBeInViewport();
});

test('visitor searches, filters, inspects, and manages the local demo cart', async ({ page }) => {
  const search = page.getByRole('searchbox', { name: /search fictional products/i });
  await search.fill('travel');
  await expect(page.getByText('3 products')).toBeVisible();
  await page.getByRole('button', { name: /show travel products/i }).click();
  await expect(page.getByText('2 products')).toBeVisible();
  await page
    .getByRole('button', { name: /clear search and category/i })
    .first()
    .click();
  await expect(page.getByText('8 products')).toBeVisible();

  const details = page.getByRole('button', { name: /details for trailfold satchel/i });
  await details.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('heading', { name: 'Trailfold Satchel' })).toBeFocused();
  await expectNoSeriousAccessibilityViolations(page);
  await dialog.getByRole('button', { name: /add trailfold satchel/i }).click();
  await page.keyboard.press('Escape');
  await expect(details).toBeFocused();
  await expect(page.getByRole('link', { name: /cart · 1 item$/i })).toBeVisible();

  await page.getByRole('link', { name: /cart · 1 item$/i }).click();
  await page.getByRole('button', { name: /increase trailfold satchel/i }).click();
  await expect(page.getByLabel(/quantity for trailfold satchel/i)).toContainText('2');
  await page.getByRole('button', { name: /remove trailfold satchel/i }).click();
  await expect(page.getByRole('heading', { name: /your demo cart is empty/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /checkout|pay|purchase/i })).toHaveCount(0);
});

test('keyboard, mobile, zoom, and reduced-motion boundaries remain usable', async ({ page }) => {
  await page.locator('body').press('Tab');
  await expect(page.getByRole('link', { name: /skip to main content/i })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();

  await page.setViewportSize({ width: 320, height: 780 });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);

  await page.evaluate(() => {
    document.documentElement.style.zoom = '2';
  });
  await expect(page.getByRole('heading', { level: 1, name: /learning rebuilt/i })).toBeVisible();

  await page.emulateMedia({ reducedMotion: 'reduce' });
  const behavior = await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  );
  expect(behavior).toBe('auto');
});
