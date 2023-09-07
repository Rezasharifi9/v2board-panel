import Link from 'next/link'
import type { HTMLAttributeAnchorTarget } from 'react'

/**
 * It can render either a button or a link depending on the props it receives.
 */

interface CommonProps {
  primary?: boolean
  label: string
}
interface ButtonProps extends CommonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  isLoading?: boolean
  disabled?: boolean
}

interface LinkProps extends CommonProps {
  href: string
  target?: HTMLAttributeAnchorTarget
}

type Props = ButtonProps | LinkProps

const ButtonOrLink = (props: Props) => {
  const applyClass = () => {
    return `
    px-8 py-2 w-fit rounded-[6px] cursor-pointer select-none whitespace-nowrap flex items-center justify-center
    ${props.primary ? 'bg-black text-white' : 'bg-secondary text-black'}`
  }

  const renderButton = () => {
    const { isLoading, onClick, label, disabled } = props as ButtonProps

    return (
      <button
        type={isLoading ? 'submit' : 'button'}
        disabled={isLoading || disabled}
        className={`${applyClass()} ${isLoading ? 'bg-gray_light' : 'bg-primary'}`}
        onClick={(e) => {
          e.preventDefault()
          onClick(e)
        }}
      >
        <span>{label}</span>
      </button>
    )
  }

  const renderLink = () => {
    const { href, label, target } = props as LinkProps

    return (
      <Link className={applyClass()} href={href} target={target}>
        {label}
      </Link>
    )
  }

  return 'onClick' in props ? renderButton() : renderLink()
}

export default ButtonOrLink
