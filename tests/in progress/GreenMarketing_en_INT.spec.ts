import { test, expect } from '@playwright/test';

test.describe('UX Tab Container', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.trumpf.com/en_INT/landing-pages/global/sales/trubend-1000-basic-edition/');
    
    // Accept cookies
    await test.step('Accept cookies', async () => {
      const acceptCookiesButton = await page.getByRole('button', { name: 'Accept all cookies' });
      await acceptCookiesButton.click();
    });
  });

  test('Check tabs presence and default active tab', async ({ page }) => {
    const tabs = [
      { name: 'Overview', id: 'tab-p120024' },
      { name: 'Demo videos', id: 'tab-p120412' },
      { name: 'FAQ', id: 'tab-p120028' },
      { name: 'Request a quote', id: 'tab-p121091' }
    ];

    for (const tab of tabs) {
      await test.step(`Check presence of tab ${tab.name}`, async () => {
        const tabButton = page.locator(`ux-tab-button[name="${tab.name}"]`);
        await expect(tabButton).toBeVisible();
        const tabLabel = tabButton.locator(`div#${tab.id}`);
        await expect(tabLabel).toHaveText(tab.name);
      });
    }

    await test.step('Check default active tab is "Overview"', async () => {
      const activeTab = page.locator('ux-tab-button.is-active');
      await expect(activeTab).toHaveAttribute('name', 'Overview');
    });
  });

  test('Check tab switching functionality', async ({ page }) => {
    const tabs = [
      { name: 'Overview', id: 'tab-p120024' },
      { name: 'Demo videos', id: 'tab-p120412' },
      { name: 'FAQ', id: 'tab-p120028' },
      { name: 'Request a quote', id: 'tab-p121091' }
    ];

    for (const tab of tabs) {
      await test.step(`Switch to tab ${tab.name} and check active state`, async () => {
        const tabButton = page.locator(`ux-tab-button[name="${tab.name}"]`);
        await tabButton.click();
        await expect(tabButton).toHaveClass(/is-active/);
      });
    }
  });

  test('Verify content change on tab switch', async ({ page }) => {
    const tabs = [
      { name: 'Overview', contentSelector: 'div#overview-content' },
      { name: 'Demo videos', contentSelector: 'div#demo-videos-content' },
      { name: 'FAQ', contentSelector: 'div#faq-content' },
      { name: 'Request a quote', contentSelector: 'div#request-quote-content' }
    ];

    for (const tab of tabs) {
      await test.step(`Switch to tab ${tab.name} and verify content`, async () => {
        const tabButton = page.locator(`ux-tab-button[name="${tab.name}"]`);
        await tabButton.click();
        const tabContent = page.locator(tab.contentSelector);
        await expect(tabContent).toBeVisible();
      });
    }
  });
});
