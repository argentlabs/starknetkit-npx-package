import { ButtonHTMLAttributes, FC, ReactNode } from "react"
import { ChevronDown, ChevronRight } from "../icons/Chevron"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hideChevron?: boolean
  selected?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const Button: FC<ButtonProps> = ({
  onClick,
  children,
  style,
  hideChevron,
  selected,
  leftIcon,
  rightIcon,
  ...props
}) => (
  <button
    style={{
      ...style,
    }}
    {...props}
    className={`${props.className} ${selected ? "selected" : ""} ${props.disabled ? "disabled" : ""} hover:bg-charcoal`}
    onClick={onClick}
  >
    <div className="flex items-center gap-2">
      {leftIcon}
      {children}
    </div>

    {(!hideChevron || rightIcon) && (
      <>{selected ? <ChevronRight /> : <ChevronDown />}</>
    )}

    {rightIcon && <div>{rightIcon}</div>}
  </button>
)

export { Button }
