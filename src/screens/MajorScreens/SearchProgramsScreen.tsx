import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import tw from '../../styles/tailwind'
import { Text, View } from 'react-native'

const SearchProgramsScreen = () => {
  return (
    <MainLayout title="Search Programs">
      <View style={tw`flex-1 flex-col w-full p-3`}>
        <Text>Search Programs Screen</Text>
      </View>
    </MainLayout>
  )
}

export default SearchProgramsScreen