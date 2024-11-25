import { Page, expect } from "@playwright/test"
import { ICredentials } from "./Login"
import Navigation from "./Navigation"
import { artifactsDir } from "../shared/cfg/test"
import { randomUUID } from "crypto"
import SapoEmailClient from "../shared/src/emailClient"
import config from "../config"
type DappUrl = 'http://localhost:3000/'
let mailClient: SapoEmailClient

console.log(config.validLogin.email, config.emailPassword)
export default class Dapps extends Navigation {
  constructor(page: Page) {
    super(page)
    mailClient = new SapoEmailClient(config.validLogin.email, config.emailPassword);
  }

  async requestConnectionFromDapp({
    dApp,
    dappUrl,
    credentials,
    newAccount = false,
  }: {
    dApp: Page
    dappUrl: DappUrl
    credentials: ICredentials
    newAccount: boolean
  }) {
    const starknetKitModal = true

    await dApp.setViewportSize({ width: 1080, height: 720 })
    await dApp.goto(dappUrl)
    await dApp.getByRole('button', { name: 'Connection' }).click()
    if (starknetKitModal) {
      await dApp.getByRole('button', { name: 'Starknetkit Modal' }).click()
    }
    const popup = await this.handlePopup(dApp, credentials, newAccount)
    await this.verifyEmailInPopup(popup, credentials.email)
    await popup.locator('button[type="submit"]').click()
    return dApp
  }

  private async handleDappSpecificLogic(dApp: Page, dappUrl: DappUrl) {
    switch (dappUrl) {
      case "http://localhost:3000/":
        await this.handleStarknetIdDapp(dApp);
        break;

      default:
        throw new Error(`Unsupported dApp URL: ${dappUrl}`);
    }
  }
  private async handlePortfolionDapp(dApp: Page) {
    await dApp.locator('button:has-text("Connect wallet")').first().click();
  }

  private async handleRubyDapp(dApp: Page) {
    await dApp
      .locator('button:has-text("starknetkit@latest")')
      .first()
      .click();
  }

  private async handleStarknetkitDapp(dApp: Page) {
    await dApp.locator('button:has-text("Connect")').first().click();
  }

  private async handleStarknetIdDapp(dApp: Page) {
    await expect(dApp.locator("text=CONNECT ARGENT")).toBeVisible();
    await dApp.locator("text=CONNECT ARGENT").click();
  }

  private async handlePopup(dApp: Page, credentials: ICredentials, newAccount: boolean) {
    const popupPromise = dApp.waitForEvent("popup")
    await expect(dApp.locator("p:text-is('Email')")).toBeVisible()
    await dApp.locator("p:text-is('Email')").click()
    const popup = await popupPromise
    // Wait for the popup to load.
    await popup.waitForLoadState()
    await popup.locator("[name=email]").fill(credentials.email)
    await popup.locator('button[type="submit"]').click()
    const pin = await mailClient.getPin()
    console.log("PIN:", pin)
    await popup.locator('[id^="pin-input"]').first().click()
    await popup.locator('[id^="pin-input"]').first().fill(pin!)
    if (newAccount) {
      await popup.locator("[name=password]").fill(credentials.password)
      await popup.locator("[name=repeatPassword]").fill(credentials.password)
    } else {
      await popup.locator("[name=password]").fill(credentials.password)
    }
    await popup.locator('button[type="submit"]').click()
    await popup.waitForLoadState()
    return popup
  }

  private async verifyEmailInPopup(popup: Page, email: string) {
    await expect(popup.locator(`text="${email}"`))
      .toBeVisible()
      .catch(async () => {
        await popup.screenshot({ path: `${artifactsDir}/${randomUUID()}.png` })
        throw new Error("Email not visible")
      })
  }
}
