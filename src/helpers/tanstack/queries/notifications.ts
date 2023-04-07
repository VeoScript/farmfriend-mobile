import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import api from '../../../config/Axios'

export const useGetNotifications = (account_type: string) => {
  return useInfiniteQuery(['notifications', account_type],
    async ({ pageParam = ''}) => {
      const notifications = await api.get(`/api/notifications?cursor=${pageParam}&notification_to=${account_type}`)
      return notifications.data
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
      onError: (error: any) => {
        console.error('ERROR NOTIFICATIONS', error.response.data)
      }
    }
  )
}

export const useGetUnreadNotifications = (account_type: string) => {
  return useQuery(['unreadNotifications', account_type],
    async () => {
      const unreadNotifications = await api.get(`/api/unread-notifications?notification_to=${account_type}`)
      return unreadNotifications.data
    },
    {
      refetchInterval: 3000,
      onError: (error: any) => {
        console.error('ERROR UNREAD NOTIFICATIONS', error.response.data)
      }
    }
  )
}
