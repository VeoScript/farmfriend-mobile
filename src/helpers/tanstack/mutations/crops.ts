import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../config/Axios'
import { useNavigate } from '../../../config/RootNavigation'

export const useCreateCropMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { photo: string, name: string, description: string, temperature: string, user_id: string }) =>
    api.post('/api/create-crop', _args),
    {
      onError: (error: any) => {
        console.error('ERROR CREATE CROP', error.response.data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['crops'])
      }
    }
  )
}

export const useUpdateCropMutation = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation((_args: { photo: string, name: string, description: string, temperature: string }) =>
    api.put(`/api/update-crop/${id}`, _args),
    {
      onError: (error: any) => {
        console.error('ERROR CREATE CROP', error.response.data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['crops'])
      }
    }
  )
}
