import { useAccount } from "@starknet-react/core"
import { SectionLayout } from "../SectionLayout"
import { AddNetwork } from "./AddNetwork"
import { ChangeNetwork } from "./ChangeNetwork"

const Network = () => {
  const { account, address } = useAccount()

  if (!account || !address) {
    return null
  }

  return (
    <SectionLayout sectionTitle="Network">
      <div className="flex flex-1 w-full gap-3">
        <AddNetwork />
        <ChangeNetwork />
      </div>
    </SectionLayout>
  )
}

export { Network }
