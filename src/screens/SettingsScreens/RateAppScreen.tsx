import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import tw from '../../styles/tailwind'
import { Text, View } from 'react-native'
import { useNavigate } from '../../config/RootNavigation'
import { useBackHandler } from '../../helpers/hooks/useBackHandler'

const RateAppScreen = () => {

  useBackHandler(() => {
    useNavigate('HomeScreen')
  })

  return (
    <MainLayout title="Rate App">
      <View style={tw`flex-1 flex-col w-full p-3`}>
        <Text>Rate App Screen</Text>
      </View>
    </MainLayout>
  )
}

export default RateAppScreen