import { useAccount, useConnect, useDisconnect } from "@starknet-react/core"
import Image from "next/image"
import { useEffect, useState } from "react"
import { SectionLayout } from "../sections/SectionLayout"
import { Button } from "../ui/Button"
import { ConnectorButton } from "./ConnectorButton"
import { ConnectStarknetkitModal } from "./ConnectStarknetkitModal"
import { DisconnectIcon } from "../icons/DisconnectIcon"

const Connect = () => {
  const { isConnected } = useAccount()
  const { connectors } = useConnect()
  const { disconnect } = useDisconnect({})
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <></>
  }

  return (
    <SectionLayout sectionTitle="Connection">
      <div className="flex column gap-3">
        <div className="flex gap-3">
          <ConnectStarknetkitModal />
          <Button
            className={`w-full ${!isConnected ? "disabled" : ""}`}
            onClick={() => disconnect()}
            disabled={!isConnected}
            hideChevron
            leftIcon={<DisconnectIcon />}
          >
            Disconnect
          </Button>
        </div>
        <div className="flex column w-full p-3 bg-[#262933] gap-5 rounded-xl">
          <span className="starknet-react-connectors-title">
            Starknet-react connectors
          </span>
          <div className="connectors-grid">
            {connectors.map((connector) => {
              const icon =
                typeof connector.icon === "string"
                  ? connector.icon
                  : connector.icon.dark
              const isSvg = icon?.startsWith("<svg")
              return (
                <ConnectorButton
                  key={connector.id}
                  connector={connector}
                  icon={
                    <>
                      {isSvg ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: icon }}
                          className="connector-icon"
                        />
                      ) : (
                        <Image
                          alt={connector.name}
                          src={icon}
                          height={17}
                          width={17}
                        />
                      )}
                    </>
                  }
                />
              )
            })}
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

export { Connect }
