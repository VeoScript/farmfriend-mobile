import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '../../../config/RootNavigation'
import api from '../../../config/Axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useLoginMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { email: string, password: string }) =>
    api.post('/api/login', {
      email: _args.email,
      password: _args.password
    }),
    {
      onError: (error: any) => {
        console.error('ERROR LOGIN', error.response.data)
      },
      onSuccess: async (data) => {
        const cookies: any = data.headers['set-cookie']
        await AsyncStorage.setItem('COOKIES', cookies[0])
        
        queryClient.resetQueries()
        useNavigate('HomeScreen')
      }
    }
  )
}

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(() =>
    api.post('/api/logout'),
    {
      onError: (error: any) => {
        console.error('ERROR LOGOUT', error.response.data)
      },
      onSuccess: async () => {
        await AsyncStorage.setItem('COOKIES', '')
        queryClient.invalidateQueries(['user'])
        useNavigate('LoginScreen')
      }
    }
  )
}