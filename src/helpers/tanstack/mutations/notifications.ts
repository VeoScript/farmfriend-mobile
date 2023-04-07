import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../config/Axios'

export const useReadNotificationMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { id: string }) =>
    api.put(`/api/read-notification/${_args.id}`),
    {
      onError: (error: any) => {
        console.error('ERROR READ NOTIFICATION', error.response.data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['notifications'])
      }
    }
  )
}
