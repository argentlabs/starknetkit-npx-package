import { useAccount } from "@starknet-react/core"
import { SectionLayout } from "../SectionLayout"
import { SendERC20 } from "../Transactions/SendERC20"
import { SendMulticall } from "../Transactions/SendMulticall"

const Transactions = () => {
  const { account, address } = useAccount()

  if (!account || !address) {
    return null
  }

  return (
    <SectionLayout sectionTitle="Transactions">
      <div className="flex column gap-3">
        <SendERC20 />
        <SendMulticall />
      </div>
    </SectionLayout>
  )
}

export { Transactions }
