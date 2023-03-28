import { useQuery } from '@tanstack/react-query'
import api from '../../../config/Axios'

export const useGetAccount = () => {
  return useQuery(['account'],
    async () => {
      const account = await api.get('/api/user')
      return account.data
    },
    {
      onError: (error: any) => {
        console.error('ERROR ACCOUNT', error.response.data)
      }
    }
  )
}