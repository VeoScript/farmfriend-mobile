import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../config/Axios'
import { Toast } from '../../../utils/Toast'
import { useNavigate } from '../../../config/RootNavigation'

export const useCreateCropMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { photo: string, name: string, description: string, temperature: string, max_temperature: string, user_id: string }) =>
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
  return useMutation((_args: { photo: string, name: string, description: string, temperature: string, max_temperature: string }) =>
    api.put(`/api/update-crop/${id}`, _args),
    {
      onError: (error: any) => {
        console.error('ERROR UPDATE CROP', error.response.data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['crops'])
      }
    }
  )
}

export const useDeleteCropMutation = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation(() =>
    api.delete(`/api/delete-crop/${id}`),
    {
      onError: (error: any) => {
        console.error('ERROR DELETE CROP', error.response.data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['crops'])
        Toast('Deleted successfully')
        useNavigate('SearchCropsScreen')
      }
    }
  )
}
