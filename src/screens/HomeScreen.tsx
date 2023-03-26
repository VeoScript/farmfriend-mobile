import React from 'react'
import tw from '../styles/tailwind'
import { View, Text } from 'react-native'

const HomeScreen = () => {
  return (
    <View style={tw`flex-1 flex-row items-center justify-center bg-olive-light`}>
      <Text style={tw`font-poppins text-sm`}>Farm Friend (Home Screen)</Text>
    </View>
  )
}

export default HomeScreen