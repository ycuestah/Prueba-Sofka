import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Navegar a la página web del e-commerce (demo site común)
  await page.goto('https://www.demoblaze.com/');
  
  await page.getByRole('link', { name: 'Home (current)' }).click();
  await page.locator('.card > a').first().click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('link', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: 'Home (current)' }).click();
  await page.locator('div:nth-child(2) > .card > a').click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('link', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  await page.getByRole('button', { name: 'Place Order' }).click();
  
  // Usando selectores más específicos para el formulario
  await page.locator('#name').fill('Yas');
  await page.locator('#country').fill('Uruguay');
  await page.locator('#card').fill('1234567898966355');
  await page.locator('#month').fill('12');
  await page.locator('#year').fill('2025');
  
  await page.getByRole('button', { name: 'Purchase' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
});