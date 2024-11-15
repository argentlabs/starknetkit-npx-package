"use client"

import { StarknetDapp } from "@/components/StarknetDapp"
import { connectors } from "@/connectors"
import { mainnet, sepolia } from "@starknet-react/chains"
import { publicProvider, StarknetConfig } from "@starknet-react/core"

export default function Home() {
  const chains = [mainnet, sepolia]
  const providers = publicProvider()

  return (
    <div className="flex flex-col h-screen p-4 sm:p-5">
      {/* eslint-disable @typescript-eslint/no-explicit-any */}
      <StarknetConfig
        chains={chains}
        provider={providers}
        /* TODO: wait for starknet-react to update Connector interface */
        connectors={connectors as any}
      >
        <StarknetDapp />
      </StarknetConfig>
      {/* eslint-enable @typescript-eslint/no-explicit-any */}
    </div>
  )
}
