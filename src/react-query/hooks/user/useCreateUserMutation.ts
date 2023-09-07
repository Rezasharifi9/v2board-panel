import { TOKEN } from '@/lib/storage-keys'
import { RQ_KEYS } from '@/react-query/react-query-keys'
import type { CreateUserDTO } from '@/types/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'

const createUser = async (body: CreateUserDTO) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/CreateUser`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: getCookie(TOKEN)!.toString(),
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) throw await res.json()

  return res.json()
}

const useCreateUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation((body: CreateUserDTO) => createUser(body), {
    onSuccess: () => {
      queryClient.invalidateQueries([RQ_KEYS.GET_USERS])
    },
  })
}

export default useCreateUserMutation
