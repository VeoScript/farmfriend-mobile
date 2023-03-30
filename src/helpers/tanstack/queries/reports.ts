import { useInfiniteQuery } from '@tanstack/react-query'
import api from '../../../config/Axios'

export const useGetReports = (search: string) => {
  return useInfiniteQuery(['reports', search],
    async ({ pageParam = ''}) => {
      const reports = await api.get(`/api/reports?cursor=${pageParam}&search=${search}`)
      return reports.data
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
      onError: (error: any) => {
        console.error('ERROR REPORTS', error.response.data)
      }
    }
  )
}
