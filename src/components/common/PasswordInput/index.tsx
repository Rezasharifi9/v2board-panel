import { useState } from 'react'
import Eye from 'public/icons/common/Eye'

interface Props {
  label: string
  error?: string
  onChange?: (value: string) => void
  inputProps?: Omit<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type'
  >
}

const inputStyles = {
  container: 'flex relative text-gray_dark w-full',
  label: `font-extrabold w-full lg:w-[15%] whitespace-nowrap`,
  wrapper: 'gap-[.2rem] flex flex-col',
  box: 'flex items-center p-[8px] xs:p-[10px]  w-full rounded-sm relative',
  input: `tracking-wide outline-none bg-transparent text-ternary`,
  error:
    'text-primary xs:whitespace-nowrap font-bold text-[14px] absolute -bottom-[45px] xs:-bottom-[28px] flex items-start',
  details: 'w-[30%] flex justify-center items-center whitespace-nowrap',
}

const PasswordInput = ({ label, error, onChange, inputProps }: Props) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className={`${inputStyles.container} flex-col lg:flex-row gap-[.5rem] lg:gap-0`}>
      <label className={inputStyles.label}>{label}</label>
      <div
        className={`${inputStyles.wrapper} w-full lg:w-[90%] ${
          error ? 'border-primary' : 'border-transparent'
        } `}
      >
        <div className={`${inputStyles.box} bg-light2`}>
          <input
            onChange={(e) => {
              onChange && onChange(e.target.value)
            }}
            type={isVisible ? 'text' : 'password'}
            {...inputProps}
            className={` w-full ${inputStyles.input}${
              !isVisible ? 'font-serif tracking-widest' : ''
            }`}
          />
          <div className="cursor-pointer" onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? (
              <Eye />
            ) : (
              <>
                <div className="relative">
                  <Eye />
                  <div className="bg-gray_light w-[14px] left-[2px] h-[1px] top-[7px] -rotate-[30deg] absolute"></div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className={inputStyles.error}>
          <p>{error}</p>
        </div>
      </div>
    </div>
  )
}

export default PasswordInput
