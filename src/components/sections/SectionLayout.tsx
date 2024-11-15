import { FC, PropsWithChildren } from "react"
import { IconStatusIcon } from "../icons/IconStatusIcon"
import { InfoIcon } from "../icons/InfoIcon"

interface SectionLayoutProps extends PropsWithChildren {
  sectionTitle: string
}

const SectionLayout: FC<SectionLayoutProps> = ({ children, sectionTitle }) => {
  return (
    <div className="flex section-layout-container">
      <div className="flex section-layout-heading">
        <IconStatusIcon />
        <h3 className="section-title">{sectionTitle}</h3>
        <InfoIcon
          style={{
            position: "absolute",
            right: "0",
          }}
        />
      </div>
      <div className="flex column gap-3">{children}</div>
    </div>
  )
}

export { SectionLayout }
