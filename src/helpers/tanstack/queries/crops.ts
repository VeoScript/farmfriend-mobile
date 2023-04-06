import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import api from '../../../config/Axios'

export const useGetCrops = (search: string) => {
  return useInfiniteQuery(['crops', search],
    async ({ pageParam = ''}) => {
      const crops = await api.get(`/api/crops?cursor=${pageParam}&search=${search}`)
      return crops.data
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
      onError: (error: any) => {
        console.error('ERROR CROPS', error.response.data)
      }
    }
  )
}

export const useGetSuggestedCrops = (search: string) => {
  return useQuery(['suggestedCrops', search],
    async () => {
      const suggestedCrops = await api.get(`/api/suggested-crops?search=${search}`)
      return suggestedCrops.data
    },
    {
      onError: (error: any) => {
        console.error('ERROR SUGGESTED CROPS', error.response.data)
      }
    }
  )
}
