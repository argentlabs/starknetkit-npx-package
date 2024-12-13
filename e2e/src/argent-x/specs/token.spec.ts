import test from "../test"
import config from "../../../config"
import { downloadGitHubRelease } from "../utils/downloadGitHubRelease"
import { unzip } from "../utils"
import { expect } from "@playwright/test"

test.describe(`Token`, () => {
  test.beforeAll(async ({}) => {
    const version = await downloadGitHubRelease()
    const currentVersionDir = await unzip(version)
    config.distDir = currentVersionDir
  })

  test(`add a new token`, async ({ extension, browserContext }) => {
    await extension.open()
    await extension.recoverWallet(config.testSeed3!)
    await expect(extension.network.networkSelector).toBeVisible()
    await extension.network.selectDefaultNetwork()

    await extension.dapps.requestConnectionFromDapp({
      browserContext,
      useStarknetKitModal: true,
    })
    //accept connection from Argent X
    await extension.dapps.accept.click()

    await extension.dapps.addToken({
      browserContext,
    })

    await expect(extension.network.networkSelector).toBeVisible()
    await expect(
      extension.dapps.page.locator('[aria-label="Show account list"]'),
    ).toBeVisible()
  })
})
