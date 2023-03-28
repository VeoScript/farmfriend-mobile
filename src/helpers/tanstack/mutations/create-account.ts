import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../config/Axios'

export const useCreateAccountMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { account_type: string, first_name: string, last_name: string, address: string, contact_num: string, email: string, password: string, }) =>
    api.post('/api/register', {
      account_type: _args.account_type,
      first_name: _args.first_name,
      last_name: _args.last_name,
      address: _args.address,
      contact_num: _args.contact_num,
      email: _args.email,
      password: _args.password,
    }),
    {
      onError: (error: any) => {
        console.error('ERROR CREATE ACCOUNT', error.response.data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['user'])
      }
    }
  )
}