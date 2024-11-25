import test from "../test"
import config from "../config"

test.describe(`Dapps`, () => {

  test("Connect from Dapp", async ({ webWallet, dApp }) => {

   
    await webWallet.dapps.requestConnectionFromDapp({
      dApp,
      dappUrl: "http://localhost:3000/",
      credentials: config.validLogin,
      newAccount: false,
    })
  })

})
