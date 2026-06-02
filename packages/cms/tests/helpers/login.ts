import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export interface LoginOptions {
  page: Page
  serverURL?: string
  user: { email: string; password: string }
}

export async function login({
  page,
  serverURL = process.env.CMS_URL || 'http://localhost:4004',
  user,
}: LoginOptions): Promise<void> {
  await page.goto(`${serverURL}/admin/login`)
  await page.fill('#field-email', user.email)
  await page.fill('#field-password', user.password)
  await page.click('button[type="submit"]')
  await page.waitForURL(`${serverURL}/admin`)
  const dashboardArtifact = page.locator('span[title="Dashboard"]')
  await expect(dashboardArtifact).toBeVisible()
}
