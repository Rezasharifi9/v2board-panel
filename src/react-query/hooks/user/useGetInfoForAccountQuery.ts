import { TOKEN } from '@/lib/storage-keys'
import { RQ_KEYS } from '@/react-query/react-query-keys'
import type { GetInfoForAccountDTO } from '@/types/react-query'
import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'

export const getInfoForAccount = async (body: GetInfoForAccountDTO) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/GetInfoForAccount`, {
    headers: { authorization: `Bearer ${getCookie(TOKEN)!.toString()}` },
    body: JSON.stringify(body),
  })

  if (!res.ok) throw await res.json()

  return await res.json()
}

const useGetInfoForAccountQuery = (body: GetInfoForAccountDTO) => {
  return useQuery([RQ_KEYS.GET_INFO_FOR_ACCOUNT, body], () => getInfoForAccount(body))
}

export default useGetInfoForAccountQuery
