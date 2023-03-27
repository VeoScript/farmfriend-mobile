import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import tw from '../../styles/tailwind'
import { Text, View } from 'react-native'

const SuggestedCropsToPlantScreen = () => {
  return (
    <MainLayout title="Suggested Crops">
      <View style={tw`flex-1 flex-col w-full p-3`}>
        <Text>Suggested Crops to Plant Screen</Text>
      </View>
    </MainLayout>
  )
}

export default SuggestedCropsToPlantScreen