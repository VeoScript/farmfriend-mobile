import { useInfiniteQuery } from '@tanstack/react-query'
import api from '../../../config/Axios'

export const useGetPrograms = (search: string) => {
  return useInfiniteQuery(['programs', search],
    async ({ pageParam = ''}) => {
      const programs = await api.get(`/api/programs?cursor=${pageParam}&search=${search}`)
      return programs.data
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
      onError: (error: any) => {
        console.error('ERROR PROGRAMS', error.response.data)
      }
    }
  )
}
