import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../config/Axios'

export const useCreateRateMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { rate: number, feedback?: string, user_id: string }) =>
    api.post('/api/submit-rate', _args),
    {
      onError: (error: any) => {
        console.error('ERROR CREATE RATE', error.response.data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['rates'])
      }
    }
  )
}
