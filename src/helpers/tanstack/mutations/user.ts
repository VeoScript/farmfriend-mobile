import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '../../../config/RootNavigation'
import api from '../../../config/Axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useUpdateAccountInfoMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { userId: string, first_name: string, last_name: string, address: string, contact_num: string, email: string }) =>
    api.put(`/api/update-account/${_args.userId}`, {
      first_name: _args.first_name,
      last_name: _args.last_name,
      address: _args.address,
      contact_num: _args.contact_num,
      email: _args.email
    }),
    {
      onError: (error: any) => {
        console.error('ERROR UPDATE ACCOUNT INFORMATION', error.response.data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['account'])
      }
    }
  )
}

export const useChangeProfileMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { id: string, imageURL: string }) =>
    api.put(`/api/change-profile/${_args.id}`, {
      imageURL: _args.imageURL
    }),
    {
      onError: (error: any) => {
        console.error(error.response.data)
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['account'])
        queryClient.invalidateQueries(['users'])
      }
    }
  )
}

export const useChangePasswordMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { userId: string, old_password: string, new_password: string }) =>
    api.put(`/api/change-password/${_args.userId}`, {
      old_password: _args.old_password,
      new_password: _args.new_password
    }),
    {
      onError: (error: any) => {
        console.error('ERROR CHANGE PROFILE', error.response.data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['account'])
      }
    }
  )
}

export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { userId: string, user_password: string }) =>
    api.put(`/api/delete-account/${_args.userId}`, {
      user_password: _args.user_password
    }),
    {
      onError: (error: any) => {
        console.error('ERROR DELETE ACCOUNT', error.response.data)
      },
      onSuccess: async () => {
        await AsyncStorage.setItem('COOKIES', '')
        queryClient.invalidateQueries(['user'])
        useNavigate('LoginScreen')
      }
    }
  )
}
