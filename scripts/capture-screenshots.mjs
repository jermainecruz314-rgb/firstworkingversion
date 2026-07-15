import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const BASE = 'http://127.0.0.1:4173'
const OUT = '/opt/cursor/artifacts/screenshots'

await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 430, height: 932 } })

await page.goto(BASE)
await page.waitForSelector('.profile-card')

await page.locator('.profile-card').first().click()
await page.getByRole('button', { name: 'Sign in with Singpass' }).click()

await page.waitForSelector('.hb-card--peach', { timeout: 10000 })
await page.screenshot({ path: `${OUT}/consent.png`, fullPage: true })

await page.getByRole('button', { name: 'I consent' }).click()
await page.waitForSelector('.hb-referral-card', { timeout: 10000 })
await page.screenshot({ path: `${OUT}/landing.png`, fullPage: true })

await page.getByRole('button', { name: 'Go to my dashboard' }).click()
await page.waitForSelector('.hb-profile', { timeout: 10000 })
await page.screenshot({ path: `${OUT}/dashboard.png`, fullPage: true })

await browser.close()
console.log('Screenshots saved to', OUT)
