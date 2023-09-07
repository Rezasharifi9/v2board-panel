import { useState } from 'react'

interface Props {
  label?: string
  error?: string
  onChange?: (value: string) => void
  defaultValue?: string
  whiteBg?: boolean
  grayBorder?: boolean
  disabled?: boolean
  limit?: string
}

//FIXME style
const s = {
  container: 'flex relative text-gray_dark w-full gap-2',
  label: 'font-extrabold w-full lg:min-w-[35%] lg:w-[35%] whitespace-nowrap',
  wrapper: 'gap-[.2rem] flex flex-col',
  box: 'flex items-center w-full rounded-sm relative',
  input: `tracking-wide outline-none bg-transparent text-ternary p-2 rounded-sm `,
  error:
    'text-primary xs:whitespace-nowrap font-bold text-[14px] absolute -bottom-[45px] xs:-bottom-[28px] flex items-start',
  details: 'w-[30%] flex justify-center items-center whitespace-nowrap',
}

const Textarea = ({
  label,
  error,
  defaultValue,
  whiteBg,
  onChange,
  grayBorder,
  disabled,
  limit,
}: Props) => {
  const [value, setValue] = useState(defaultValue ?? '')

  return (
    <div className={`${s.container}  flex-col  ${whiteBg ? 'bg-transparent' : 'bg-white'}`}>
      {label && <label className={s.label}>{label}</label>}
      <div className={`${s.wrapper} w-full ${error ? 'border-primary' : 'border-transparent'}`}>
        <div className={`${s.box} flex-col ${whiteBg ? 'bg-white' : 'bg-light2'}  `}>
          <textarea
            disabled={disabled}
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              onChange && onChange(e.target.value)
            }}
            className={`w-full max-h-[200px] min-h-[100px] ${s.input}${
              grayBorder ? 'border border-gray_medium' : ''
            } `}
          ></textarea>
          <div className="absolute bottom-1 left-2 text-gray-600">{limit}</div>
        </div>
        <div className={s.error}>
          <p>{error}</p>
        </div>
      </div>
    </div>
  )
}

export default Textarea
