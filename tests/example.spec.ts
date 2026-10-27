import { test, expect } from '@playwright/test';

test.describe('tests for playwright page', ()=>{
  test.beforeEach(async({page})=>{
    await page.goto('https://playwright.dev/');
  })

  test('has title', async ({ page }) => {

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link', async ({ page }) => {
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

  test('get GitHub link', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'GitHub repository' })).toBeVisible();
  })

  test('get Discord link', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Discord server' })).toBeVisible();
  })

  test('get Switch between dark and light via getByRole', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Switch between dark and light' })).toBeVisible();
  });

  test('get Switch between dark and light via locator', async ({ page }) => {
    await expect(page.locator('[class="toggleIcon_g3eP systemToggleIcon_QzmC"]')).toBeVisible();
  })
})




