import { test, expect } from '@playwright/test';


test('Verify user can create choice successfully @regression @Smoke', async ({page }) => {
 
  const { token,appBaseURL} = process.env;
  test.setTimeout(120000);
  await page.goto(appBaseURL+"/page-with-no-auth");
  
  
  await page.evaluate(() => localStorage.setItem('isAutomationTestRunning',JSON.stringify(true)));

  const url = appBaseURL + "/?token=" + token;
  await page.goto(url)
  await page.getByLabel("menu").click();
  await page.getByText('My Homepage').click();
  await page.getByLabel('menu').click();
  await expect(page.getByText('Choices and R&Os', { exact: true })).toBeVisible();

});