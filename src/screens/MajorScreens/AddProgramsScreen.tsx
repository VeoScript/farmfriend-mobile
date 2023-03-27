import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import tw from '../../styles/tailwind'
import { Text, View } from 'react-native'

const AddProgramsScreen = () => {
  return (
    <MainLayout title="Add Programs">
      <View style={tw`flex-1 flex-col w-full p-3`}>
        <Text>Check Weather Screen</Text>
      </View>
    </MainLayout>
  )
}

export default AddProgramsScreen