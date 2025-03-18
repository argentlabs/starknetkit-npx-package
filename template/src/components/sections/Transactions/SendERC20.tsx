import { ETHTokenAddress } from "@/constants"
import { parseInputAmountToUint256 } from "@/helpers/token"
import {
  useAccount,
  useContract,
  useSendTransaction,
} from "@starknet-react/core"
import { useState } from "react"
import { Button } from "../../ui/Button"
import { erco20TransferAbi } from "../../../abi/erc20TransferAbi"
import { CallData } from "starknet"

const SendERC20 = () => {
  const { account } = useAccount()

  const [lastTxStatus, setLastTxStatus] = useState("idle")
  const [lastTxError, setLastTxError] = useState("")

  const { contract } = useContract({
    abi: erco20TransferAbi,
    address: ETHTokenAddress,
  })

  const { sendAsync } = useSendTransaction({
    calls:
      contract && account?.address
        ? [
            {
              contractAddress: ETHTokenAddress,
              entrypoint: "transfer",
              calldata: CallData.compile([
                account?.address,
                parseInputAmountToUint256("0.000000001"),
              ]),
            },
          ]
        : undefined,
  })

  const buttonsDisabled = ["approve"].includes(lastTxStatus)

  const handleTransferSubmit = async (e: React.FormEvent) => {
    try {
      setLastTxError("")
      e.preventDefault()
      setLastTxStatus("approve")
      const { transaction_hash } = await sendAsync()
      setTimeout(() => {
        alert(`Transaction sent: ${transaction_hash}`)
      })
    } catch (error) {
      setLastTxError((error as Error).message)
    } finally {
      setLastTxStatus("idle")
    }
  }

  return (
    <div className="flex w-full column gap-2">
      <Button
        className="w-full"
        onClick={handleTransferSubmit}
        disabled={buttonsDisabled}
        hideChevron
      >
        {lastTxStatus === "approve" ? "Waiting for transaction" : "Send ERC20"}
      </Button>
      {lastTxError ? (
        <span style={{ color: "red" }}>Error: {lastTxError}</span>
      ) : null}
    </div>
  )
}

export { SendERC20 }
