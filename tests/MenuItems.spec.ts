import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.trumpf.com/de_DE/');
  await page.getByRole('button', { name: 'Alle Cookies akzeptieren' }).click();
  await expect(page.getByText('Produkte')).toBeVisible();
  await expect(page.getByText('Lösungen')).toBeVisible();
  await expect(page.getByText('Unternehmen')).toBeVisible();
  await expect(page.getByText('Nachhaltigkeit')).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Newsroom' })).toBeVisible();
  await expect(page.getByText('Karriere')).toBeVisible(); 

  await expect(page.locator('a[href="/de_DE/produkte/"]')).toBeVisible(); // Sichtbar
await page.click('a[href="/de_DE/produkte/"]'); // click URL
await expect(page).toHaveURL('https://www.trumpf.com/de_DE/produkte/'); // Check URL

  await page.getByText('Produkte Zurück Übersicht').click();
  await expect(page.getByText('Maschinen & Systeme Zurück Ü')).toBeVisible();
  await expect(page.getByText('Laser Zurück Übersicht Laser')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Übersicht Produkte' })).toBeVisible();
  await expect(page.getByText('VCSEL Lösungen & Photodioden Zurück Übersicht VCSEL Lösungen & Photodioden')).toBeVisible();
  await expect(page.getByText('Echtzeit-Lokalisierung Zurück')).toBeVisible();
  await expect(page.getByText('Leistungselektronik Zurück Ü')).toBeVisible();
  await expect(page.getByText('Elektrowerkzeuge Zurück Ü')).toBeVisible();
  await expect(page.getByText('Software Zurück Übersicht')).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Services' })).toBeVisible();
  await page.getByText('Maschinen & Systeme Zurück Ü').click();
  await expect(page.getByRole('link', { name: '2D-Laserschneidmaschinen' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Übersicht Maschinen & Systeme' })).toBeVisible();
  await expect(page.getByRole('link', { name: '3D-Laserschneidanlagen' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Laserschweißanlagen und' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Laser-Rohrschneidmaschinen' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Markiersysteme' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Additive Fertigungssysteme' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Stanzmaschinen' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Stanz-Laser-Maschinen' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Biegemaschinen' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Lagersysteme' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Automatisierung' })).toBeVisible();
  await page.getByText('Laser Zurück Übersicht Laser').click();
  await expect(page.locator('li').filter({ hasText: 'Übersicht Laser' }).nth(2)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Scheibenlaser' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Faserlaser' })).toBeVisible();
  await expect(page.locator('li').filter({ hasText: 'Diodenlaser' }).nth(2)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Kurz- und Ultrakurzpulslaser' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Beschriftungslaser' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Gepulste Laser' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'CO2-Laser' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'EUV Drive Laser' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sensorik' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Bearbeitungsoptiken' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Technologiepakete' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Wissenschaftslaser' })).toBeVisible();
  await page.getByText('VCSEL Lösungen & Photodioden Zurück Übersicht VCSEL Lösungen & Photodioden').click();
  await expect(page.getByRole('link', { name: 'Übersicht VCSEL Lösungen &' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Single & Multi-Mode-VCSEL' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Datacom VCSEL & Photodioden' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Integrierte VCSEL Lösungen' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'TruHeat VCSEL' })).toBeVisible();
  await page.getByText('Echtzeit-Lokalisierung Zurück').click();
  await expect(page.getByRole('link', { name: 'Übersicht Echtzeit-' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'CorivaEngine' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'CorivaSatellite' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'omlox – Der offene' })).toBeVisible();
  await page.getByText('Leistungselektronik Zurück Ü').click();
  await expect(page.getByRole('link', { name: 'Übersicht Leistungselektronik' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Plasmageneratoren' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Wechselrichter' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Generatoren zur industriellen' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Mikrowellenverstärker' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'TRUMPF Hüttinger Whitepaper' })).toBeVisible();
  await page.getByText('Elektrowerkzeuge Zurück Ü').click();
  await expect(page.getByRole('link', { name: 'Übersicht Elektrowerkzeuge' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Akkumaschinen' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Schlitzscheren' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Scheren', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Nibbler', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Profilnibbler' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Panel Cutter' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Fiber Composite Nibbler' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Falzschließer' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Fügepresse' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Kantenfräsgeräte' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Kantenkampagne' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Schweißkantenformer' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Auflageleisten-Reiniger' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Teileseparator' })).toBeVisible();
  await page.getByText('Software Zurück Übersicht').click();
  await expect(page.getByRole('link', { name: 'Übersicht Software' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Oseon – Software für' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Programmiersoftware' })).toBeVisible();
  await page.getByText('Lösungen Zurück Übersicht Lö').click();
  await expect(page.getByRole('link', { name: 'Übersicht Lösungen' })).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Smart Factory', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Smart Factory Consulting' })).toBeVisible();
  await expect(page.getByText('Anwendungen Zurück Übersicht')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Beispielteile' })).toBeVisible();
  await expect(page.getByText('Branchen Zurück Übersicht')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Erfolgsgeschichten' })).toBeVisible();
  await expect(page.getByText('Vorteile TRUMPF Maschinen Zur')).toBeVisible();
  await page.getByText('Anwendungen Zurück Übersicht').click();
  await expect(page.getByRole('link', { name: 'Übersicht Anwendungen' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'UWB – Ultra-Wideband' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Laserschweißen' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Lichtbogenschweißen' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Laserschneiden' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'EUV-Lithografie' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Additive Fertigung' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Oberflächenbearbeitung mit' })).toBeVisible();
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
  await page.getByText('Branchen Zurück Übersicht').click();
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
  await expect(page.locator('li').filter({ hasText: 'Maschinen- und Anlagenbau' }).nth(2)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Medizintechnik' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Nutzfahrzeuge und Transport' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Photovoltaik' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Uhren- und Schmuckindustrie' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Werkzeug- und Formenbau' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Wissenschaft' })).toBeVisible();
  await page.getByText('Vorteile TRUMPF Maschinen Zur').click();
  await expect(page.getByRole('link', { name: 'Übersicht Vorteile TRUMPF' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Vorteile 2D-' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Vorteile Biegemaschinen' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Vorteile Stanzmaschinen' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Vorteile Stanz-Laser-Maschinen' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Vorteile Laser-' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Vorteile Roboterschweißzellen' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Vorteile der TRUMPF VCSEL' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Vorteile Additive' })).toBeVisible();
  await page.getByText('Unternehmen Zurück Übersicht').click();
  await expect(page.getByRole('link', { name: 'Übersicht Unternehmen' })).toBeVisible();
  await expect(page.getByText('Profil Zurück Übersicht')).toBeVisible();
  await expect(page.getByText('Grundsätze Zurück Übersicht')).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Veranstaltungen und Termine' })).toBeVisible();
  await expect(page.getByText('Geschichte Zurück Übersicht')).toBeVisible();
  await expect(page.getByText('Weitere Tätigkeitsfelder Zurü')).toBeVisible();
  await page.getByText('Profil Zurück Übersicht').click();
  await expect(page.getByRole('link', { name: 'Übersicht Profil' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Über uns' })).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Vorstand' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Aufsichtsrat' })).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Geschäftsbericht' })).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Standorte' })).toBeVisible();
  await page.getByText('Grundsätze Zurück Übersicht').click();
  await expect(page.getByRole('link', { name: 'Übersicht Grundsätze' })).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Unternehmensgrundsätze' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Qualität' })).toBeVisible();
  await expect(page.locator('li').filter({ hasText: 'SYNCHRO' }).nth(2)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Lieferanten' })).toBeVisible();
  await page.getByText('Geschichte Zurück Übersicht').click();
  await expect(page.getByRole('link', { name: 'Übersicht Geschichte' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Epoche 2020-heute' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Epoche 2013-' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Epoche 2005-' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Epoche 1996-' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Epoche 1985-' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Epoche 1978-' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Epoche 1967-' })).toBeVisible();
  await expect(page.locator('li').filter({ hasText: 'Epoche 1960-' }).nth(2)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Epoche 1950-' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Epoche 1934-' })).toBeVisible();
  await expect(page.locator('li').filter({ hasText: 'Epoche 1923-' }).nth(2)).toBeVisible();
  await page.getByText('Weitere Tätigkeitsfelder Zurü').click();
  await expect(page.getByRole('link', { name: 'Übersicht Weitere Tä' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Kooperationen und weitere' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Financial Services' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'TRUMPF Venture' })).toBeVisible();
  await page.getByText('Nachhaltigkeit Zurück Ü').click();
  await expect(page.getByRole('link', { name: 'Übersicht Nachhaltigkeit' })).toBeVisible();
  await expect(page.getByText('Umwelt und Klima Zurück Ü')).toBeVisible();
  await expect(page.getByText('Soziales und Gesellschaft Zur')).toBeVisible();
  await expect(page.getByText('Zurück Übersicht Nachhaltigkeit Umwelt und Klima Zurück Übersicht Umwelt und')).toBeVisible();
  await expect(page.getByText('Unternehmensführung Zurück Ü')).toBeVisible();
  await page.getByText('Umwelt und Klima Zurück Ü').click();
  await expect(page.getByRole('link', { name: 'Übersicht Umwelt und Klima' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Klimaschutz an unseren' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Nachhaltig produzieren mit' })).toBeVisible();
  await page.getByText('Soziales und Gesellschaft Zur').click();
  await expect(page.getByRole('link', { name: 'Übersicht Soziales und' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Mitarbeiter' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Soziales Engagement' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Bildung und Forschung' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Kunst und Kultur' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Förderanfrage Deutschland' })).toBeVisible();
  await page.getByText('Unternehmensführung Zurück Ü').click();
  await expect(page.getByRole('link', { name: 'Übersicht Unternehmensführung' })).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Compliance' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Datensicherheit' })).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Newsroom' })).toBeVisible();
  await expect(page.getByText('Karriere Zurück Übersicht')).toBeVisible();
  await page.getByText('Karriere Zurück Übersicht').click();
  await expect(page.getByRole('link', { name: 'Übersicht Karriere' })).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Stellenangebote' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'So bewerben Sie sich' })).toBeVisible();
  await expect(page.getByText('TRUMPF als Arbeitgeber Zurück')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Berufserfahrene' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Absolventen' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Studierende' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Schüler' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Menschen bei TRUMPF' })).toBeVisible();
  await page.getByText('TRUMPF als Arbeitgeber Zurück').click();
  await expect(page.getByRole('link', { name: 'Übersicht TRUMPF als' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'TRUMPF als Arbeitgeber' }).nth(2)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Leistungen und Angebote' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Vielfalt' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Entwicklungsmöglichkeiten' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Internationales Arbeiten' })).toBeVisible();
  await page.getByText('Produkte Zurück Übersicht').click();
  await page.getByText('Maschinen & Systeme Zurück Ü').click();
  await page.getByRole('link', { name: '2D-Laserschneidmaschinen' }).click();
  await page.getByRole('img', { name: 'Technologiebild 2D-' }).click();
});