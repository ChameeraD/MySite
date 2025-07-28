import { test, expect } from '@playwright/test';

test('home page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Blazor/);
});

test('counter increments', async ({ page }) => {
    await page.goto('/counter');
    const button = page.getByRole('button', { name: /click me/i });
    await button.click();
    await expect(page.getByText('Current count: 1')).toBeVisible();
}); 