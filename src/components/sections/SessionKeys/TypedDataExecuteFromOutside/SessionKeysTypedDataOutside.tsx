import { CHAIN_ID } from "@/constants"
import { FC, useState } from "react"
import { constants } from "starknet"
import { SessionKeysEFOLayout } from "../SessionKeysEFOLayout"
import { WithSession } from "../types"
import { useMainnetContract } from "./useMainnetContract"
import { useTestnetContract } from "./useTestnetContract"

const SessionKeysTypedDataOutside: FC<WithSession> = ({
  session,
  sessionAccount,
}) => {
  const submitTestnetEFO = useTestnetContract({
    session,
    sessionAccount,
  })
  const submitMainnetEFO = useMainnetContract({
    session,
    sessionAccount,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [outsideTypedData, setOutsideTypedData] = useState<any | undefined>()

  const handleSubmitEFO = async () => {
    try {
      const efoTypedData =
        CHAIN_ID === constants.NetworkName.SN_MAIN
          ? await submitMainnetEFO?.()
          : await submitTestnetEFO?.()

      setOutsideTypedData(efoTypedData)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SessionKeysEFOLayout
      copyData={JSON.stringify(outsideTypedData)}
      copyDataDisabled={!sessionAccount || !outsideTypedData}
      handleSubmit={handleSubmitEFO}
      submitDisabled={!sessionAccount}
      title="Create outside typed data"
      submitText="EFO TypedData"
    />
  )
}

export { SessionKeysTypedDataOutside }
