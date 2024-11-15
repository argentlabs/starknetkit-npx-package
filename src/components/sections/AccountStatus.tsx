import { toHexChainid } from "@/helpers/chainId"
import {
  useAccount,
  useBalance,
  useConnect,
  useStarkName,
  useStarkProfile,
} from "@starknet-react/core"
import { FC } from "react"
import { constants } from "starknet"
import { CopyIcon } from "../icons/CopyIcon"

interface BoxProps {
  title: string
  value?: string
  copy?: boolean
  truncate?: boolean
}

const Box: FC<BoxProps> = ({ title, value, copy, truncate }) => (
  <div className="flex flex-col rounded gap-2 overflow-hidden">
    <span className="status-grid-item-title">{title}</span>
    <span className={`status-grid-item-value ${truncate ? "truncate" : ""}`}>
      {value || "-"}
      {value && copy && <CopyIcon />}
    </span>
  </div>
)

const AccountStatus = () => {
  const { address, isConnected, chainId } = useAccount()
  const { connector } = useConnect()

  const { data: balance } = useBalance({
    address: address,
  })

  const { data: starknetId } = useStarkName({
    address,
  })

  const { data: starkProfile } = useStarkProfile({
    address,
  })

  const hexChainId = toHexChainid(chainId)

  return (
    <>
      <Box title="Status" value={isConnected ? "Connected" : "Not connected"} />
      <Box
        title="Connector"
        value={isConnected ? connector?.name : undefined}
      />
      <Box
        title="Network"
        value={
          hexChainId
            ? constants.StarknetChainId.SN_SEPOLIA === hexChainId
              ? "Sepolia"
              : "Mainnet"
            : undefined
        }
      />
      <Box
        title="Eth Balance"
        value={
          balance
            ? balance?.formatted.length > 7
              ? `${balance.formatted.slice(0, 7)} ETH`
              : `${balance?.formatted} ETH`
            : "-"
        }
      />
      <Box title="ID" value={starknetId} />
      <Box
        title="Avatar Url"
        value={starkProfile?.profilePicture}
        copy
        truncate
      />
    </>
  )
}

export { AccountStatus }
