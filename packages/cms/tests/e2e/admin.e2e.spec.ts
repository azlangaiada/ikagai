import { test, expect, Page } from '@playwright/test'
import { login } from '../helpers/login'
import { seedTestUser, cleanupTestUser, testUser } from '../helpers/seedUser'

const CMS_URL = process.env.CMS_URL || 'http://localhost:4004'

test.describe('Admin Panel', () => {
  let page: Page

  test.beforeAll(async ({ browser }) => {
    await seedTestUser()
    const context = await browser.newContext()
    page = await context.newPage()
    await login({ page, user: testUser, serverURL: CMS_URL })
  })

  test.afterAll(async () => {
    await cleanupTestUser()
  })

  test('can navigate to dashboard', async () => {
    await page.goto(`${CMS_URL}/admin`)
    await expect(page).toHaveURL(`${CMS_URL}/admin`)
    await expect(page.locator('span[title="Dashboard"]').first()).toBeVisible()
  })

  test('can navigate to users list', async () => {
    await page.goto(`${CMS_URL}/admin/collections/users`)
    await expect(page.locator('h1', { hasText: 'Users' }).first()).toBeVisible()
  })
})
