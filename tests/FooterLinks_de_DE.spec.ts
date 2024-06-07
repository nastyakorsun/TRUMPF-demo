import { test, expect } from '@playwright/test';

test('Check footer links', async ({ page }) => {
  await test.step('Navigate to the homepage', async () => {
    await page.goto('https://www.trumpf.com/de_DE/');
  });

  await test.step('Accept cookies if the button is present', async () => {
    const acceptCookiesButton = page.locator('button:has-text("Alle Cookies akzeptieren")');
    if (await acceptCookiesButton.isVisible()) {
      await acceptCookiesButton.click();
    }
  });

  const footerLinks = [
    { text: 'Impressum', href: '/de_DE/meta/impressum/' },
    { text: 'Datenschutz', href: '/de_DE/meta/datenschutz/' },
    { text: 'Copyright und Markenzeichen', href: '/de_DE/meta/copyright-und-markenzeichen/' },
    { text: 'Privatsphäre-Einstellungen', href: '#' }
  ];

  for (const link of footerLinks) {
    await test.step(`Check if the link "${link.text}" is present in the footer and verify its href attribute`, async () => {
      const footerLink = page.locator(`ul.ux-iws-footer__bottom-links a:has-text("${link.text}")`);
      await expect(footerLink).toBeVisible();
      await expect(footerLink).toHaveAttribute('href', link.href);
    });

    if (link.href !== '#') {
      await test.step(`Click the "${link.text}" link and verify the navigation`, async () => {
        const footerLink = page.locator(`ul.ux-iws-footer__bottom-links a:has-text("${link.text}")`);
        await footerLink.click();
        await expect(page).toHaveURL(new RegExp(link.href));
        await page.goto('https://www.trumpf.com/de_DE/');
      });
    }
  }
});
