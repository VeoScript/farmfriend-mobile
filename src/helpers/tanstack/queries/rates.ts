import { useInfiniteQuery } from '@tanstack/react-query'
import api from '../../../config/Axios'

export const useGetRates = (search: string) => {
  return useInfiniteQuery(['rates', search],
    async ({ pageParam = ''}) => {
      const rates = await api.get(`/api/rates?cursor=${pageParam}&search=${search}`)
      return rates.data
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
      onError: (error: any) => {
        console.error('ERROR RATES', error.response.data)
      }
    }
  )
}
