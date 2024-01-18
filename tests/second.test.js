import {test} from "@playwright/test";

test.only("second test", async ({ page }) => {
  await page.goto("https://www.trumpf.com/de_INT/")

  await page.getByRole('button', { name: 'Alle Cookies akzeptieren' }).click();

  await page.getByText('Lösungen Zurück Übersicht Lösungen Smart Factory Smart Factory Consulting Anwend').click();
  await page.getByRole('link', { name: 'Smart Factory Consulting' }).click();
  await page.locator('#c850745').getByRole('link', { name: 'Beratung anfordern' }).click();
  await page.getByLabel('Vorname\n\t\t\t\t\n*').click();
  await page.keyboard.insertText("Adam");
  await page.getByLabel('Nachname\n\t\t\t\t\n*').click();
  await page.keyboard.insertText("Adam");
  await page.getByLabel('E-Mail\n\t\t\t\t\n*').click();
  await page.keyboard.insertText("adam@gmail.com");
  await page.getByLabel('Land/Region\n                \n*').click();
  await page.keyboard.insertText("Deutschland");
  await page.getByRole('button', { name: 'Absenden' }).click();

});