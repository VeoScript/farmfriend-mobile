import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import LoadingScreen from '../../components/SplashScreens/LoadingScreen'
import moment from 'moment'
import tw from '../../styles/tailwind'
import { View, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useGetProgram } from '../../helpers/tanstack/queries/programs'

const ViewProgramsScreen = () => {

  const route: any = useRoute()

  const { data: program, isLoading } = useGetProgram(route.params?.id)

  if (isLoading) return <LoadingScreen />

  return (
    <MainLayout title="Program Details">
      <View style={tw`flex-1 flex-col items-center w-full p-3`}>
        <View style={tw`flex-col items-center w-full`}>
          <View style={tw`flex-col items-center my-3`}>
            <Text style={tw`my-1 font-poppins-bold text-2xl text-olive-dark`}>{ program.title }</Text>
            <Text style={tw`my-1 font-poppins text-xs text-olive`}>{ moment(program.created_at).format('LLL') }</Text>
          </View>
          <View style={tw`flex-col items-center my-3`}>
            <Text style={tw`font-poppins text-sm text-olive-dark`}>{ program.description }</Text>
          </View>
        </View>
      </View>
    </MainLayout>
  )
}

export default ViewProgramsScreen