import { test, expect } from '@playwright/test';

test.describe('Check navigation Submenu "Lösungen" on trumpf.com', () => {
  test('Check Links on "Lösungen"', async ({ page }) => {
    await test.step('Navigate to the homepage and accept cookies', async () => {
      await page.goto('https://www.trumpf.com/de_DE/');
      await page.getByRole('button', { name: 'Alle Cookies akzeptieren' }).click();
    });

    await test.step('Open "Lösungen" submenu', async () => {
      await page.getByText('Lösungen Zurück Übersicht Lö').click();
      await expect(page).toHaveURL('https://www.trumpf.com/de_DE/');
      await page.waitForTimeout(2000);
      await expect(page.getByRole('link', { name: 'Übersicht Lösungen' })).toBeVisible();
    });

    await test.step('Verify visibility of links under "Lösungen"', async () => {
      await expect(page.getByRole('navigation').getByRole('link', { name: 'Smart Factory', exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Smart Factory Consulting' })).toBeVisible();
      await expect(page.getByText('Anwendungen Zurück Übersicht')).toBeVisible();
      await expect(page.getByRole('link', { name: 'Beispielteile' })).toBeVisible();
      await expect(page.getByText('Branchen Zurück Übersicht')).toBeVisible();
      await expect(page.getByRole('link', { name: 'Erfolgsgeschichten' })).toBeVisible();
      await expect(page.getByText('Vorteile TRUMPF Maschinen Zurück Übersicht')).toBeVisible();
    });

    await test.step('Open "Anwendungen" submenu and verify links', async () => {
      await page.getByText('Anwendungen Zurück Übersicht').click({ force: true });
      await expect(page.getByRole('link', { name: 'Übersicht Anwendungen' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'UWB – Ultra-Wideband' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Laserschweißen' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Lichtbogenschweißen' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Laserschneiden' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'EUV-Lithografie' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Additive Fertigung' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Oberflächenbearbeitung mit dem Laser' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Mikrobearbeitung' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Laserbeschriftung' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Plasmatechnik' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Induktionserwärmung' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Trennen' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Verbinden' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Kantenformen' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Stanzen und Nibbeln' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Biegen' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Optische Sensorik' })).toBeVisible();
    });

    await test.step('Open "Branchen" submenu and verify links', async () => {
      await page.getByText('Branchen Zurück Übersicht').click({ force: true });
      await expect(page.getByRole('link', { name: 'Übersicht Branchen' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Automobil' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Bauindustrie' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Blechbearbeitung' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Dental' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Datenkommunikation' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Display' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Elektronik', exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Klima- und Energietechnik' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Luft- und Raumfahrt' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Maschinen- und Anlagenbau' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Medizintechnik' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Nutzfahrzeuge und Transport' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Photovoltaik' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Uhren- und Schmuckindustrie' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Werkzeug- und Formenbau' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Wissenschaft' })).toBeVisible();
    });

    await test.step('Open "Vorteile TRUMPF Maschinen" submenu and verify links', async () => {
      await page.getByText('Vorteile TRUMPF Maschinen Zurück Übersicht').click({ force: true });
      await expect(page.getByRole('link', { name: 'Übersicht Vorteile TRUMPF Maschinen' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Vorteile 2D-Laserschneidmaschinen' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Vorteile Biegemaschinen' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Vorteile Stanzmaschinen' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Vorteile Stanz-Laser-Maschinen' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Vorteile Laser-Rohrschneidmaschinen' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Vorteile Roboterschweißzellen' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Vorteile der TRUMPF VCSEL' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Vorteile Additive Fertigungssysteme' })).toBeVisible();
    });
  });
});
