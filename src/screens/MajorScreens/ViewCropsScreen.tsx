import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import LoadingScreen from '../../components/SplashScreens/LoadingScreen'
import tw from '../../styles/tailwind'
import { View, Text, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useGetCrop } from '../../helpers/tanstack/queries/crops'

const ViewCropsScreen = () => {

  const route: any = useRoute()

  const { data: crop, isLoading } = useGetCrop(route.params?.id)

  if (isLoading) return <LoadingScreen />

  return (
    <MainLayout title={crop.name}>
      <View style={tw`flex-1 flex-col items-center w-full p-3`}>
        <Image
          style={tw`rounded-xl w-[10rem] h-[10rem] bg-olive bg-opacity-50`}
          resizeMode="cover"
          source={{ uri: crop.image }}
        />
        <View style={tw`flex-col items-center w-full my-10`}>
          <View style={tw`flex-col items-center my-3`}>
            <Text style={tw`font-poppins-bold text-2xl text-olive-dark`}>{ crop.name }</Text>
          </View>
          <View style={tw`flex-col items-center my-3`}>
            <Text style={tw`font-poppins-bold text-xl text-olive-dark`}>{ crop.temperature }°</Text>
            <Text style={tw`font-poppins text-xs text-olive`}>Required Temperature</Text>
          </View>
          <View style={tw`flex-col items-center my-3`}>
            <Text style={tw`font-poppins text-sm text-olive-dark`}>{ crop.description }</Text>
          </View>
        </View>
      </View>
    </MainLayout>
  )
}

export default ViewCropsScreen