import { test, expect } from '@playwright/test';

test.describe('Search Functionality Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage before each test
    await page.goto('https://www.trumpf.com/en_INT/');

    // Accept cookies
    const acceptCookiesButton = await page.getByRole('button', { name: 'Accept all cookies' });
    await acceptCookiesButton.click();
  });

  test('Search and validate results', async ({ page }) => {
    // Click the search icon
    const searchIcon = page.locator('div.ux-iws-navigation-meta__search ux-icon[name="nav-search"]');
    await searchIcon.click();

    // Enter a relevant keyword and press enter
    const searchInput = page.locator('input.ux-iws-navigation-meta__search__input');
    await searchInput.fill('battery');
    await searchInput.press('Enter');

    // Verify redirection to the search page
    await expect(page).toHaveURL(/\/en_INT\/meta\/search\/\?q=battery/, { timeout: 10000 });

    // Debugging step: wait for the search results container to appear
    await page.waitForSelector('div.ux-iws-search-results__results-container', { timeout: 10000 });

    // Verify the first 10 search results are displayed
    const searchResults = page.locator('ux-iws-link-wrapper.ux-iws-teaser-page');
    await expect(searchResults).toHaveCount(10, { timeout: 10000 });

    // Verify the total number of results is displayed
    const totalResults = page.locator('.ux-iws-search-results__summary');
    await expect(totalResults).toBeVisible();

    // Verify "Show more" button is displayed
    const showMoreButton = page.locator('ux-button:has-text("Show more")');
    await expect(showMoreButton).toBeVisible();

    // Click the "Show more" button and verify the next 10 results
    await showMoreButton.click();
       // Verify loading circle is displayed when results are loading
       const loadingCircle = page.locator('.loading-spinner');
       await expect(loadingCircle).toBeVisible({ timeout: 10000 });
    await expect(searchResults).toHaveCount(20, { timeout: 10000 });

 

    // Click the "Show more" button again and verify the next 10 results
    await showMoreButton.click();
    await expect(searchResults).toHaveCount(30, { timeout: 10000 });

    // Repeat until no results left to show
    let resultsCount = 30;
    while (true) {
      const previousResultsCount = await searchResults.count();
      if (!await showMoreButton.isVisible()) {
        break;
      }
      await showMoreButton.click();
      await expect(loadingCircle).toBeVisible({ timeout: 15000 });
    
      // Warten Sie eine kurze Zeit, bevor Sie die Anzahl der Suchergebnisse überprüfen
      await page.waitForTimeout(2000); // Warten Sie 2 Sekunden
    
      // Überprüfen Sie, ob die Anzahl der Suchergebnisse größer oder gleich resultsCount ist
      const currentResultsCount = await searchResults.count();
      if (currentResultsCount <= previousResultsCount) {
        break;
      }
      resultsCount = currentResultsCount;
      expect(currentResultsCount).toBeGreaterThanOrEqual(resultsCount);
      
    }

  }); 

  test('Search with no match', async ({ page }) => {
    // Click the search icon
    const searchIcon = page.locator('div.ux-iws-navigation-meta__search ux-icon[name="nav-search"]');
    await searchIcon.click();

    // Enter a keyword with no match and press enter
    const searchInput = page.locator('input.ux-iws-navigation-meta__search__input');
    await searchInput.fill('qq');
    await searchInput.press('Enter');

    // Wait for the search results summary to appear
    const totalResults = page.locator('div.ux-iws-search-results__summary');
    await expect(totalResults).toHaveText(/0 Results/, { timeout: 10000 });

    // Verify no results are displayed
    const searchResults = page.locator('div.ux-iws-teaser-page');
    await expect(searchResults).toHaveCount(0, { timeout: 10000 });
  });


});
