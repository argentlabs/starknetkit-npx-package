import { expect } from "@playwright/test"

import test from "../test"
import { downloadGitHubRelease, unzip } from "../utils"
import config from "../config"


test.describe("Dapps", () => {
  test.beforeAll(async ({ }) => {
    const version = '6.19.5'
    await downloadGitHubRelease(version)
    const currentVersionDir = await unzip(version)
    console.log(currentVersionDir)
    config.distDir = currentVersionDir

  })

  test.only("connect from testDapp", async ({ extension, browserContext }) => {

    //setup wallet
    await extension.wallet.newWalletOnboarding()
    await extension.open()
    await extension.dapps.requestConnectionFromDapp(
      browserContext,
    )
    //accept connection from Argent X
    await extension.dapps.accept.click()
    //check connect dapps
    await extension.navigation.showSettingsLocator.click()
    await extension.settings.account(extension.account.accountName1).click()
    await extension.page.getByRole('button', { name: 'Connected dapps' }).click()
    await expect(
      extension.dapps.connected(),
    ).toBeVisible()
    //disconnect dapp from Argent X
    await extension.dapps
      .disconnect()
      .click()
    await expect(
      extension.dapps.connected(),
    ).toBeHidden()
    await extension.page.getByRole('button', { name: 'Connected dapps' }).click()
    await expect(extension.page.getByRole('heading', { name: 'No connected dapps' })).toBeVisible()
  })

})
