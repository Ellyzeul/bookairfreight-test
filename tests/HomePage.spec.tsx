import { expect, test } from "@playwright/test";

const APP_URL = 'http://localhost:5173'

test('inputs are empty on render', async({page}) => {
  await page.goto(APP_URL)

  await expect(page.locator("select[name='starting-country']")).toHaveValue('')
  await expect(page.locator("select[name='destination-country']")).toHaveValue('')
  await expect(page.locator("select[name='shipping-channel']")).toHaveValue('')
  await expect(page.locator("input[name='units']")).toHaveValue('')
  await expect(page.locator("input[name='length']")).toHaveValue('')
  await expect(page.locator("input[name='width']")).toHaveValue('')
  await expect(page.locator("input[name='height']")).toHaveValue('')
  await expect(page.locator("input[name='weight']")).toHaveValue('')
})

test('fills inputs', async({page}) => {
  await page.goto(APP_URL)

  // Quote shouldn't exist before submition
  expect(page.locator('.quote-component').isHidden()).toBeTruthy()

  // Filling the form
  await page.locator("select[name='starting-country']").selectOption('China')
  await page.locator("select[name='destination-country']").selectOption('USA')
  await page.locator("select[name='shipping-channel']").selectOption('Air')
  await page.locator("input[name='units']").fill('5')
  await page.locator("input[name='length']").fill('50')
  await page.locator("input[name='width']").fill('40')
  await page.locator("input[name='height']").fill('30')
  await page.locator("input[name='weight']").fill('15')

  // Submiting form
  await page.locator('button.home-page-submit').click()
  
  // Quote should exist now
  await expect(page.locator('.quote-component')).toBeVisible()
})

test('displays error message on empty input', async({page}) => {
  await page.goto(APP_URL)

  // Selecting the default value should provide an error
  await page.locator("select[name='starting-country']").selectOption('')
  await expect(page.locator("select[name='starting-country'] + .selector-component-error-message")).toBeVisible()
  
  // The same applies for carton inputs
  await page.locator("input[name='units']").fill('0')
  await page.locator("input[name='units']").fill('')
  await expect(page.locator("input[name='units'] + .carton-input-component-error-message")).toBeVisible()
})

test('saves quote', async({page}) => {
  await page.goto(APP_URL)

  await page.locator("select[name='starting-country']").selectOption('Vietnam')
  await page.locator("select[name='destination-country']").selectOption('Germany')
  await page.locator("select[name='shipping-channel']").selectOption('Ocean')
  await page.locator("input[name='units']").fill('10')
  await page.locator("input[name='length']").fill('10')
  await page.locator("input[name='width']").fill('10')
  await page.locator("input[name='height']").fill('10')
  await page.locator("input[name='weight']").fill('5')

  await page.locator('button.home-page-submit').click()

  await page.locator('button.quote-component-save-button').click()
})
