import React from 'react'

interface Props {
  label?: string
  error?: string
  details?: React.ReactNode
  edit?: React.ReactNode
  whiteBg?: boolean
  grayBorder?: boolean
  column?: boolean
  onChange?: (value: string) => void
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
}

const Input = ({
  label,
  error,
  details,
  onChange,
  whiteBg,
  grayBorder,
  inputProps,
  column,
}: Props) => {
  const inputStyles = {
    container: 'flex relative items-center text-gray_dark w-full',
    label: `font-extrabold w-full ${column ? '' : 'lg:w-[15%]'} whitespace-nowrap`,
    wrapper: 'gap-[.2rem] flex flex-col',
    box: 'flex items-center p-[8px] xs:p-[10px] w-full rounded-sm relative',
    input: `tracking-wide outline-none bg-transparent text-ternary`,
    error:
      'text-primary xs:whitespace-nowrap font-bold text-[14px] absolute -bottom-[45px] xs:-bottom-[28px] flex items-start',
    details: 'w-[30%] flex justify-center items-center whitespace-nowrap',
  }

  return (
    <div
      className={`${inputStyles.container} flex-col ${
        column ? '' : 'lg:flex-row'
      } gap-[.5rem] lg:gap-0 ${whiteBg ? 'bg-transparent' : ''} w-full`}
    >
      {label && <label className={inputStyles.label}>{label}</label>}
      <div
        className={`
         ${inputStyles.wrapper} w-full lg:${label && !column ? 'w-[80%]' : 'w-full'} lg:min-w-[85%] 
      ${error ? 'border-primary' : 'border-transparent'} `}
      >
        <div
          className={`${inputStyles.box} ${whiteBg ? 'bg-white' : 'bg-light2'} ${
            grayBorder ? 'border border-gray_medium' : ''
          } `}
        >
          <input
            {...inputProps}
            onChange={(e) => {
              onChange && onChange(e.target.value)
            }}
            className={`${details ? 'w-[70%]' : 'w-full'} ${inputStyles.input}`}
          />
          {details && <div className={`${inputStyles.details}`}>{details}</div>}
        </div>
        <div className={inputStyles.error}>
          <p>{error}</p>
        </div>
      </div>
    </div>
  )
}

export default Input
