import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../config/Axios'

export const useCreateReportMutations = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { type: string, description: string, user_id: string }) =>
    api.post('/api/create-report', _args),
    {
      onError: (error: any) => {
        console.error('ERROR CREATE REPORT', error.response.data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['reports'])
      }
    }
  )
}