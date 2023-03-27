import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import tw from '../../styles/tailwind'
import { Text, View } from 'react-native'

const UserLguNgoScreen = () => {
  return (
    <MainLayout title="User LGU/NGO">
      <View style={tw`flex-1 flex-col w-full p-3`}>
        <Text>User LGU/NGO Screen</Text>
      </View>
    </MainLayout>
  )
}

export default UserLguNgoScreen