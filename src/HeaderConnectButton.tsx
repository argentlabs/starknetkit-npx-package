import { useConnect } from "@starknet-react/core"
import { StarknetkitConnector, useStarknetkitConnectModal } from "starknetkit"

const HeaderConnectButton = () => {
  const { connectAsync, connectors } = useConnect()

  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as StarknetkitConnector[],
  })

  return (
    <>
      <button
        style={{
          background: "linear-gradient(to bottom right, #EC796B, #D672EF)",
        }}
        onClick={async () => {
          const { connector } = await starknetkitConnectModal()
          if (!connector) {
            // or throw error
            return
          }
          await connectAsync({ connector })
        }}
      >
        Connect wallet
      </button>
    </>
  )
}

export { HeaderConnectButton }
