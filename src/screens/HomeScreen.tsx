import React from 'react'
import MainLayout from '../layouts/MainLayout'
import tw from '../styles/tailwind'
import { View, Text } from 'react-native'

const HomeScreen = (): JSX.Element => {
  return (
    <MainLayout>
      <View style={tw`flex-1 flex-col items-center justify-center w-full`}>
        <Text style={tw`font-poppins text-xl`}>This is Home Page</Text>
      </View>
    </MainLayout>
  )
}

export default HomeScreen