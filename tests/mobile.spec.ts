import { expect, test } from '@playwright/test'

const routes = [
  ['/', '买家情报工作台'],
  ['/buyers', '买家企业'],
  ['/buyers/demo-atlas', 'Atlas Home Distribution'],
  ['/evidence', '证据审核'],
  ['/contacts', '联系方式'],
  ['/costs', '成本台账'],
  ['/s0', 'S0 验收'],
] as const

for (const [path, heading] of routes) {
  test(`${path} fits a 375px viewport and keeps navigation reachable`, async ({ page }) => {
    await page.goto(path)

    await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible()
    await expect(page.getByLabel('打开导航')).toBeVisible()
    await page.getByLabel('打开导航').click()
    await expect(page.getByRole('navigation', { name: '移动导航' })).toBeVisible()

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }))
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.viewportWidth)
  })
}

test('unknown route has a useful mobile-safe not-found state', async ({ page }) => {
  await page.goto('/missing-route')
  await expect(page.getByRole('heading', { name: '页面不存在' })).toBeVisible()
  await expect(page.getByRole('link', { name: '返回总览' })).toBeVisible()
})

