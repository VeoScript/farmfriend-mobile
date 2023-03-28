import React from 'react'
import NetInfo from '@react-native-community/netinfo'
import { Platform } from 'react-native'

export const useCheckOnline = () => {
  const [isOnline, setIsOnline] = React.useState<any>(null)

  React.useEffect(() => {
    if (Platform.OS !== 'web') {
      return NetInfo.addEventListener((state) => {
        if (state.isConnected != null && state.isConnected && Boolean(state.isInternetReachable)) {
          setIsOnline(true)
        } else {
          setIsOnline(false)
        }
      })
    }
  }, [])

  return isOnline
}