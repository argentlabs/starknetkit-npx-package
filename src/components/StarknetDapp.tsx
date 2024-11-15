"use client"
import { SignMessage } from "@/components/sections/SignMessage"
import { Transactions } from "@/components/sections/Transactions/Transactions"
import { useAccount } from "@starknet-react/core"
import { useState } from "react"
import { Connect } from "./connect/Connect"
import { Header } from "./Header"
import { AccountStatus } from "./sections/AccountStatus"
import { AddToken } from "./sections/ERC20/AddToken"
import { Network } from "./sections/Network/Network"
import { SectionButton } from "./sections/SectionButton"
import { Section } from "./sections/types"
import { GithubLogo } from "./icons/GithubLogo"

const StarknetDapp = () => {
  const [section, setSection] = useState<Section | undefined>(undefined)
  const { isConnected } = useAccount()

  return (
    <div className="flex w-full h-full column">
      <Header />

      <div className="flex gap-[120px] py-[56px] px-[116px] bg-heading-bg">
        <div className="flex column gap-2.5">
          <h1 className="get-started-title">your</h1>
          <span className="get-started-subtitle">
            Starknet utilizes the power of STARK technology to ensure
            computational integrity.
          </span>
        </div>

        <div className="status-grid-container">
          <AccountStatus />
        </div>
      </div>

      <div className="flex gap-[180px] py-[76px] px-[116px] flex-1 h-full">
        <div className="flex w-full column gap-3 flex-[0.5]">
          <SectionButton
            section="Connection"
            setSection={setSection}
            selected={section === "Connection"}
          />
          <SectionButton
            section="Transactions"
            setSection={setSection}
            selected={section === "Transactions"}
            disabled={!isConnected}
          />
          <SectionButton
            section="Signing"
            setSection={setSection}
            selected={section === "Signing"}
            disabled={!isConnected}
          />
          <SectionButton
            section="Network"
            setSection={setSection}
            selected={section === "Network"}
            disabled={!isConnected}
          />
          <SectionButton
            section="ERC20"
            setSection={setSection}
            selected={section === "ERC20"}
            disabled={!isConnected}
          />
        </div>

        <div className="flex flex-1 w-full">
          {section === "Connection" && <Connect />}
          {section === "Transactions" && <Transactions />}
          {section === "Signing" && <SignMessage />}
          {section === "Network" && <Network />}
          {section === "ERC20" && <AddToken />}
        </div>
      </div>
      <a
        href="https://github.com/argentlabs/demo-dapp-starknet"
        target="_blank"
        rel="noreferrer"
      >
        <div className="flex items-center cursor-pointer w-full justify-end px-[116px] py-10 text-lavander-sky gap-2">
          <GithubLogo />
          Github
        </div>
      </a>
    </div>
  )
}

export { StarknetDapp }
