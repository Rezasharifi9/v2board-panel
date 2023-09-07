import type { LoginUserDTO } from '@/types/react-query'
import { useMutation } from '@tanstack/react-query'

const loginUser = async (body: LoginUserDTO) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) throw await res.json()

  return res.json()
}

const useLoginUserMutation = () => {
  return useMutation((body: LoginUserDTO) => loginUser(body))
}

export default useLoginUserMutation
