import { test, expect } from "@playwright/test";

test("mobileTest", async ({page}) => {
    await page.goto('https://www.trumpf.com/de_DE/');
    await page.getByRole('button', { name: 'Alle Cookies akzeptieren' }).click();
    await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
    await page.getByRole('link', { name: 'TRUMPF Newsletteranmeldung' }).click();
    await page.getByLabel('E-Mail\n\t\t\t\t\n*').click();
    await page.getByLabel('E-Mail\n\t\t\t\t\n*').fill('mobiletest@galaniprojectsteam.testinator.com')
    await page.getByLabel('Vorname').click();
    await page.getByLabel('Vorname').fill('Kate');
    await page.getByLabel('Nachname').click();
    await page.getByLabel('Nachname').fill('Becker');
    await page.getByLabel('Firma').click();
    await page.getByLabel('Firma').fill('traum');
    await page.getByLabel('Land/Region').click();
    await page.getByLabel('Land/Region').fill('d');
    await page.getByText('Deutschland', { exact: true }).click();
    await page.locator('#powermail_field_newsletter_0').check();
    await page.getByRole('button', { name: 'Absenden' }).click();
    await expect(page.getByRole('heading', { name: 'TRUMPF News per E-Mail' })).toBeVisible();
    await expect(page.getByText('Sichern Sie sich einen')).toBeVisible();
    await expect(page.getByText('Vielen Dank für Ihre')).toBeVisible();
}) 