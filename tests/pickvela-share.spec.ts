import { expect, test } from '@playwright/test'

const poll = {
  id: 1,
  slug: 'scrunchies-or-clips',
  title: 'Satin scrunchies or claw clips?',
  subtitle: 'Pick the one you would actually use.',
  a_label: 'Satin scrunchies',
  a_description: '',
  a_art: 'scrunchies',
  b_label: 'Claw clips',
  b_description: '',
  b_art: 'clips',
  status: 'active',
  sort_order: 1,
}
const nextPoll = { ...poll, id: 2, slug: 'crossbody-or-tote', title: 'Crossbody or tote?', a_label: 'Crossbody', b_label: 'Tote', sort_order: 2 }

test('a shared pick opens a direct challenge and keeps source attribution', async ({ page }) => {
  let voteSource = ''
  await page.addInitScript(() => {
    ;(window as Window & { sharedUrl?: string }).open = (url?: string | URL) => {
      ;(window as Window & { sharedUrl?: string }).sharedUrl = String(url)
      return null
    }
  })
  await page.route('**/rest/v1/**', async route => {
    const url = route.request().url()
    const body = route.request().postDataJSON() as { p_src?: string } | null
    let data: unknown = null
    if (url.includes('/buylink_polls?')) data = [poll, nextPoll]
    else if (url.includes('/buylink_cast_vote')) {
      voteSource = body?.p_src ?? ''
      data = 'a'
    } else if (url.includes('/buylink_result')) data = { a_votes: 1, b_votes: 0 }
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(data) })
  })

  await page.goto('/p/scrunchies-or-clips/?src=wa_friend&friend=a')
  await expect(page.getByText('A friend picked Satin scrunchies. Would you choose the same?')).toBeVisible()
  await page.getByRole('button', { name: 'Vote for Satin scrunchies' }).click()
  await expect(page.getByRole('button', { name: /Challenge a friend on WhatsApp/ })).toBeVisible()
  await page.getByRole('button', { name: /Challenge a friend on WhatsApp/ }).click()

  const shared = await page.evaluate(() => (window as Window & { sharedUrl?: string }).sharedUrl)
  expect(shared).toContain('wa.me/?text=')
  const message = new URL(shared!).searchParams.get('text') ?? ''
  expect(message).toContain('I picked Satin scrunchies')
  expect(message).toContain('src=wa_friend')
  expect(message).toContain('friend=a')
  expect(voteSource).toBe('wa_friend')

  await page.getByRole('button', { name: 'Try another pick →' }).click()
  await expect(page).toHaveURL(/crossbody-or-tote/)
  await expect(page.getByText(/A friend picked/)).toHaveCount(0)
})

test('each poll exposes a reachable image for WhatsApp link previews', async ({ request }) => {
  for (const slug of ['scrunchies-or-clips', 'crossbody-or-tote', 'organiser-or-pouch', 'pins-or-headbands']) {
    const html = await (await request.get(`/p/${slug}/`)).text()
    expect(html).toContain(`https://buylink-ng.onrender.com/social/${slug}.jpg`)
    const image = await request.get(`/social/${slug}.jpg`)
    expect(image.status()).toBe(200)
    expect(image.headers()['content-type']).toContain('image/jpeg')
    expect((await image.body()).byteLength).toBeGreaterThan(50_000)
  }
})
