import { Button } from "@/components/Button"
import { Flex } from "@/components/Flex"
import { useWalletRequest } from "@starknet-react/core"
import { constants } from "starknet"

const ChangeNetwork = () => {
  const walletRequest = useWalletRequest({
    type: "wallet_switchStarknetChain",
    params: {
      chainId: constants.StarknetChainId.SN_MAIN,
    },
  })

  return (
    <Flex
      color="black"
      borderWidth="0px"
      borderRadius="8px"
      justifyContent="flex-start"
      width="100%"
    >
      <Button
        onClick={async () => {
          await walletRequest.requestAsync()
        }}
        style={{ width: "100%" }}
      >
        Change Network
      </Button>
    </Flex>
  )
}

export { ChangeNetwork }
