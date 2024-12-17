import { Button } from "@/components/ui/Button"
import { FC } from "react"

interface SessionKeysEFOLayoutProps {
  handleSubmit: () => Promise<void>
  copyData: string
  submitDisabled: boolean
  copyDataDisabled: boolean
  title: string
  submitText: string
}

const SessionKeysEFOLayout: FC<SessionKeysEFOLayoutProps> = ({
  handleSubmit,
  copyData,
  submitDisabled,
  copyDataDisabled,
  title,
  submitText,
}) => {
  const copy = () => {
    navigator.clipboard.writeText(JSON.stringify(copyData))
  }

  return (
    <div className="flex flex-col gap-3">
      <h4>{title}</h4>
      <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={submitDisabled}
        hideChevron
      >
        Submit {submitText}
      </Button>
      <Button
        className="w-full rounded-lg"
        onClick={copy}
        disabled={copyDataDisabled}
        hideChevron
      >
        Copy {submitText}
      </Button>
    </div>
  )
}

export { SessionKeysEFOLayout }
