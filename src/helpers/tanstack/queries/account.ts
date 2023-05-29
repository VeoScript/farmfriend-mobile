import { useQuery } from '@tanstack/react-query'
import api from '../../../config/Axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useGetAccount = () => {
  return useQuery(['account'],
    async () => {
      const account = await api.get('/api/user')
      return account.data
    },
    {
      onError: (error: any) => {
        console.error('ERROR ACCOUNT', error.response.data)
      },
      onSuccess: async (data) => {
        await AsyncStorage.setItem('ACCOUNT_TYPE', data.account_type)
      }
    }
  )
}