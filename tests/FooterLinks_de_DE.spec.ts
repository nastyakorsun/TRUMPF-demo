import { test, expect } from '@playwright/test';

test('Check footer links', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('https://www.trumpf.com/de_DE/');
  
  // Accept cookies if the button is present
  const acceptCookiesButton = page.locator('button:has-text("Alle Cookies akzeptieren")');
  if (await acceptCookiesButton.isVisible()) {
    await acceptCookiesButton.click();
  }

  // Define the footer links and their expected href attributes
  const footerLinks = [
    { text: 'Impressum', href: '/de_DE/meta/impressum/' },
    { text: 'Datenschutz', href: '/de_DE/meta/datenschutz/' },
    { text: 'Copyright und Markenzeichen', href: '/de_DE/meta/copyright-und-markenzeichen/' },
    { text: 'Privatsphäre-Einstellungen', href: '#' }  // This link might not navigate away, so we just check its presence
  ];

  for (const link of footerLinks) {
    // Check if the link is present in the footer
    const footerLink = page.locator(`ul.ux-iws-footer__bottom-links a:has-text("${link.text}")`);
    await expect(footerLink).toBeVisible();

    // Check if the href attribute is correct
    await expect(footerLink).toHaveAttribute('href', link.href);

    // Click the link if it is not the privacy settings link
    if (link.href !== '#') {
      await footerLink.click();
      // Ensure the navigation was successful
      await expect(page).toHaveURL(new RegExp(link.href));
      // Navigate back to the homepage
      await page.goto('https://www.trumpf.com/de_DE/');
    }
  }
});
