import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../config/Axios'
import { useNavigate } from '../../../config/RootNavigation'

export const useCreateProgramMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { title: string, description: string, user_id: string }) =>
    api.post('/api/create-program', _args),
    {
      onError: (error: any) => {
        console.error('ERROR CREATE PROGRAM', error.response.data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['programs'])
        useNavigate('SearchProgramsScreen')
      }
    }
  )
}
