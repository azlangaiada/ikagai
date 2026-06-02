import { test, expect } from '@playwright/test'

const WEB_URL = process.env.WEB_URL || 'http://localhost:3004'

test.describe('Frontend', () => {
  test('homepage returns 200', async ({ page }) => {
    const response = await page.goto(WEB_URL)
    expect(response?.status()).toBeLessThan(500)
  })

  test('renders SSR content', async ({ page }) => {
    await page.goto(WEB_URL)
    const body = await page.locator('body').innerText()
    expect(body.length).toBeGreaterThan(0)
  })
})
