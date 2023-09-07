import { useRef } from 'react'
import handleError from '@/enhancers/handleError'
import { setCookie } from 'cookies-next'
import { toast } from 'react-toastify'
import Input from '@/components/common/Input'
import PasswordInput from '@/components/common/PasswordInput'
import useLoginMutation from '@/react-query/hooks/user/useLoginUserMutation'
import { TOKEN } from '@/lib/storage-keys'
import { useTranslation } from 'next-i18next'
import type { LoginUserDTO } from '@/types/react-query'
import { useRouter } from 'next/router'

const Form = () => {
  const { t } = useTranslation('login')

  const { push } = useRouter()

  const valuesRef = useRef<Partial<LoginUserDTO>>({})
  const loginMutation = useLoginMutation()

  const updateValue = <T extends keyof LoginUserDTO>(key: T, value: LoginUserDTO[T]) => {
    valuesRef.current[key] = value
  }

  const handleLogin = async () => {
    loginMutation.mutate(valuesRef.current as LoginUserDTO, {
      onSuccess: async (res) => {
        if (res.status === true) {
          toast.success(t('login-sucessful'))
          setCookie(TOKEN, res.result, { path: '/', maxAge: 24 * 60 * 60 * 1000 })
          setTimeout(() => {
            push('/view/user')
          }, 2000)
        } else if (res.status === 'notfound' || res.status === 'error') toast.error(res.result)
      },
      onError: (e) => {
        handleError(e)
      },
    })
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-fit h-fit flex flex-col gap-[30px] items-center justify-center">
        <span className="font-extrabold text-[19px] sm:text-[22px] xs:text-[22px] text-gray_dark2">
          {t('header')}
        </span>
        <form className="flex flex-col gap-[35px] items-center justify-center w-[90vw] xs:w-[390px] lg:w-[430px] rounded-[5px] text-[16px] sm:text-[17px]">
          <Input
            label={t('email')}
            onChange={(value) => updateValue('username', value)}
            inputProps={{
              dir: 'ltr',
            }}
          />

          <PasswordInput
            label={t('password')}
            onChange={(value) => updateValue('password', value)}
          />

          <button
            type="submit"
            disabled={loginMutation.isLoading}
            className={`
            text-[16px] sm:text-[19px] bg-primary px-10 py-2 mt-2 rounded-[8px] text-white
            ${loginMutation.isLoading ? 'opacity-50' : 'opacity-1'}`}
            onClick={(e) => {
              e.preventDefault()
              handleLogin()
            }}
          >
            <span>{t('button')}</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Form
