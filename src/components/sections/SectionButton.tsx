import { FC } from "react"
import { Button } from "../ui/Button"
import { Section } from "./types"

interface SectionButtonProps {
  disabled?: boolean
  section: Section
  selected: boolean
  setSection: (
    value?: ((prevState?: Section | undefined) => Section) | undefined,
  ) => void
}

const SectionButton: FC<SectionButtonProps> = ({
  disabled,
  section,
  selected,
  setSection,
}) => {
  return (
    <Button
      selected={selected}
      className={`sections-list-button ${disabled ? "disabled" : ""}`}
      disabled={disabled}
      onClick={() =>
        setSection((prev?: Section) => (prev === section ? section : section))
      }
    >
      {section}
    </Button>
  )
}

export { SectionButton }
