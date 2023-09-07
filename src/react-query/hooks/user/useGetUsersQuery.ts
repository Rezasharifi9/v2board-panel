import { TOKEN } from '@/lib/storage-keys'
import { RQ_KEYS } from '@/react-query/react-query-keys'
import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'

export const getUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/GetAll`, {
    headers: { authorization: getCookie(TOKEN)!.toString() },
  })

  if (!res.ok) throw await res.json()

  return await res.json()
}

const useGetUsersQuery = () => {
  return useQuery([RQ_KEYS.GET_USERS], () => getUsers())
}

export default useGetUsersQuery
