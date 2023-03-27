import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import tw from '../../styles/tailwind'
import { Text, View } from 'react-native'

const UserFarmersScreen = () => {
  return (
    <MainLayout title="User Farmers">
      <View style={tw`flex-1 flex-col w-full p-3`}>
        <Text>User Farmers Screen</Text>
      </View>
    </MainLayout>
  )
}

export default UserFarmersScreen