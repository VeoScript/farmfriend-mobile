import { useInfiniteQuery } from '@tanstack/react-query'
import api from '../../../config/Axios'

export const useGetUsers = (account_type: string, search: string) => {
  return useInfiniteQuery(['users', account_type, search],
    async ({ pageParam = ''}) => {
      const users = await api.get(`/api/users?cursor=${pageParam}&account_type=${account_type}&search=${search}`)
      return users.data
    },
    {
      enabled: !!account_type || !!search,
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
      onError: (error: any) => {
        console.error('ERROR USERS FARMERS/LGU/NGO', error.response.data)
      }
    }
  )
}