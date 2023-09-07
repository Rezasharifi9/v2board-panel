import User from '@/admin/resources/User'
import ButtonOrLink from '@/components/common/ButtonOrLink'
import DataGrid from '@/components/common/DataGrid'
import Input from '@/components/common/Input'
import Modal from '@/components/common/Modal'
import { Select } from '@/components/common/Select'
import handleError from '@/enhancers/handleError'
import useCreateUserMutation from '@/react-query/hooks/user/useCreateUserMutation'
import useGetPlansQuery from '@/react-query/hooks/user/useGetPlansQuery'
import useGetUsersQuery from '@/react-query/hooks/user/useGetUsersQuery'
import type { CreateUserDTO } from '@/types/react-query'
import { useTranslation } from 'next-i18next'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'

const Content = () => {
  const { t } = useTranslation('table')

  const { data: usersData } = useGetUsersQuery()

  const { data: plansData } = useGetPlansQuery()

  const [showAddUserModel, setAddUserModal] = useState(false)

  const valuesRef = useRef<Partial<CreateUserDTO>>({})
  const createUserMutation = useCreateUserMutation()

  const updateValue = <T extends keyof CreateUserDTO>(key: T, value: CreateUserDTO[T]) => {
    valuesRef.current[key] = value
  }
  const handleCreateUser = async () => {
    createUserMutation.mutate(valuesRef.current as CreateUserDTO, {
      onSuccess: async (res) => {
        if (res.status === true) toast.success(res.result)
        else if (res.status === 'limited') toast.error(res.result)
        setAddUserModal(false)
      },
      onError: (e) => {
        handleError(e)
      },
      onSettled: () => {
        valuesRef.current = {}
      },
    })
  }

  return (
    <div className="min-h-full py-10 flex flex-col gap-8">
      <div className="flex justify-between px-10">
        <p className="text-lg font-extrabold text-[20px]">{t('user.title')}</p>
        <ButtonOrLink
          label={t('user.add-user')}
          onClick={() => {
            setAddUserModal(true)
          }}
          primary
        />
      </div>
      {usersData?.status === true && (
        <DataGrid loading={false} resource={User} data={usersData.result} />
      )}
      <Modal
        isOpen={showAddUserModel}
        setIsOpen={setAddUserModal}
        title={'کاربر جدید'}
        message={
          <div className="flex flex-col w-full gap-8">
            <Input
              label="نام کاربر"
              onChange={(value) => updateValue('name', value)}
              whiteBg
              grayBorder
            />
            <div className="flex w-full">
              <p className="font-extrabold text-gray_dark w-[13%] ">پلن</p>
              <div className="w-[87%]">
                <Select
                  options={plansData?.result ?? []}
                  onChange={(value) => updateValue('plan_id', value)}
                />
              </div>
            </div>
            <div className="flex gap-10 justify-center items-center">
              <ButtonOrLink
                label="ایجاد کاربر"
                isLoading={createUserMutation.isLoading}
                onClick={handleCreateUser}
                primary
              />
              <ButtonOrLink
                label="بازگشت"
                onClick={() => {
                  setAddUserModal(false)
                  valuesRef.current = {}
                }}
              />
            </div>
          </div>
        }
      />
    </div>
  )
}

export default Content
