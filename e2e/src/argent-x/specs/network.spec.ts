import test from "../test"
import config from "../../../config"
import { downloadGitHubRelease } from "../utils/downloadGitHubRelease"
import { unzip } from "../utils"
import { expect } from "@playwright/test"

test.describe(`Network`, () => {
  test.beforeAll(async ({}) => {
    const version = await downloadGitHubRelease()
    const currentVersionDir = await unzip(version)
    config.distDir = currentVersionDir
  })

  test(`not implemented while calling Add Network`, async ({
    extension,
    browserContext,
  }) => {
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

    await extension.dapps.network({
      browserContext,
      type: "Add",
    })

    await expect(extension.network.networkSelector).toBeVisible()
    extension.network.openNetworkSelector()

    await expect(
      extension.network.page.locator(
        `button[role="menuitem"] span:text-is("ZORG")`,
      ),
    ).toBeVisible()
  })

  test(`not implemented while calling Change Network`, async ({
    extension,
    browserContext,
  }) => {
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

    await extension.dapps.network({
      browserContext,
      type: "Change",
    })

    await expect(extension.network.networkSelector).toBeVisible()

    const element = extension.network.page.locator(
      '[aria-label="Show account list"]',
    )

    const innerText = await element.evaluate((el) => el.textContent)
    expect(innerText).toContain("Mainnet")
  })
})
