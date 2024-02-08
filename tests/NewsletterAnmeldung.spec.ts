import {test, expect} from "@playwright/test";

test("NewsletterAnmeldung", async ({ page, context }) => {
  await page.goto("https://www.trumpf.com/de_DE/")
  await page.getByRole('button', { name: 'Alle Cookies akzeptieren' }).click();
  await page.getByRole('link', { name: 'TRUMPF Newsletteranmeldung' }).click();

  await page.locator('#powermail_field_newsletteranmeldung-600343-salutation').selectOption('2');
  await page.getByLabel('Vorname').click();
  await page.keyboard.insertText("Adam");
  await page.getByLabel('Nachname').click();
  await page.keyboard.insertText("Sandler");
  await page.getByLabel('Firma').click();
  await page.getByLabel('Firma').fill('abc');
  await page.getByLabel('Land/Region').click();
  await page.getByLabel('Land/Region').fill('d');
  await page.getByText('Deutschland', { exact: true }).click();
  await page.locator('#powermail_field_newsletter_0').click();
  await page.getByLabel('E-Mail\n\t\t\t\t\n*').click();
  await page.keyboard.insertText("testingtrumpf@galaniprojectsteam.testinator.com")
  await page.getByRole('button', { name: 'Absenden' }).click();
  const title = page.getByRole('heading', { name: 'TRUMPF News per E-Mail' });
  await expect(title).toHaveText("TRUMPF News per E-Mail abonnieren");
  await expect(page.getByText('Sichern Sie sich einen')).toBeVisible();
  await expect(page.getByText('Vielen Dank für Ihre')).toBeVisible();
  const pageOne = await context.newPage();
  await pageOne.goto("https://www.mailinator.com/")
  await pageOne.locator('#menu-item-7937').getByRole('link', { name: 'LOGIN' }).click();
  await pageOne.getByPlaceholder('Email').click();
  await pageOne.keyboard.insertText("korsun@galaniprojects.com")
  await pageOne.getByPlaceholder('Password').click();
  await pageOne.keyboard.insertText("IWilltest42!")
  await pageOne.getByLabel('Login link').click();
  await pageOne.getByRole('cell', { name: 'testingtrumpf' }).click();
  await pageOne.frameLocator('iframe[name="texthtml_msg_body"]').getByRole('link', { name: 'https://de.trumpf-news.com/go' }).click();


  context.on('page', async (newPage) => {
    await newPage.waitForLoadState('domcontentloaded');
    await expect(newPage).toHaveURL("https://www.trumpf.com/de_DE/meta/bestaetigung-newsletteranmeldung/newsletteranmeldung-erfolgreich/");
    const heading = pageOne.getByRole('heading', { name: 'Newsletteranmeldung' });
    await expect(heading).toHaveText("Newsletteranmeldung erfolgreich");
  })
})