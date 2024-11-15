import { Connector, useConnect } from "@starknet-react/core"
import { FC, ReactNode } from "react"
import { Button } from "../ui/Button"

const ConnectorButton: FC<{ connector: Connector; icon: ReactNode }> = ({
  connector,
  icon,
}) => {
  const { connectAsync } = useConnect()
  if (!connector.available()) {
    return null
  }

  return (
    <Button
      key={connector.id}
      onClick={async () => {
        await connectAsync({ connector })
      }}
      className="connector"
      hideChevron
    >
      <div className="flex items-center gap-2">
        {icon}
        {connector.name}
      </div>
    </Button>
  )
}

export { ConnectorButton }
