import { TOKEN } from '@/lib/storage-keys'
import { RQ_KEYS } from '@/react-query/react-query-keys'
import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'

export const getPlans = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/GetPlans`, {
    headers: { authorization: getCookie(TOKEN)!.toString() },
  })

  if (!res.ok) throw await res.json()

  return await res.json()
}

const useGetPlansQuery = () => {
  return useQuery([RQ_KEYS.GET_PLANS], () => getPlans())
}

export default useGetPlansQuery
