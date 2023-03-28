import React from 'react'
import LoadingScreen from '../../components/SplashScreens/LoadingScreen'
import { useGetAccount } from '../tanstack/queries/account'

export const useGetUserAccount = () => {
  const { data: account, isLoading: isLoadingAccount } = useGetAccount()

  if (isLoadingAccount) return <LoadingScreen />

  return account
}