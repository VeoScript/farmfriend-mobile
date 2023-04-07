import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import LoadingScreen from '../../components/SplashScreens/LoadingScreen'
import tw from '../../styles/tailwind'
import { FeatherIcon } from '../../utils/Icons'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useNavigate } from '../../config/RootNavigation'
import { useGetUserAccount } from '../../helpers/hooks/useGetUserAccount'
import { useGetCrop } from '../../helpers/tanstack/queries/crops'

const ViewCropsScreen = () => {

  const route: any = useRoute()

  const account = useGetUserAccount()

  const { data: crop, isLoading } = useGetCrop(route.params?.id)

  if (isLoading) return <LoadingScreen />

  return (
    <MainLayout title={crop.name}>
      <View style={tw`relative flex-1 flex-col items-center w-full p-3`}>
        <Image
          style={tw`rounded-xl w-[10rem] h-[10rem] bg-olive bg-opacity-50`}
          resizeMode="cover"
          source={{ uri: crop.image }}
        />
        {account.account_type === 'ADMIN' && (
          <TouchableOpacity
            activeOpacity={0.5}
            style={tw`absolute top-3 right-3 w-auto rounded-full p-2 bg-white bg-opacity-50`}
            onPress={() => useNavigate('EditCropsScreen', {
              cropId: crop.id,
              cropPhoto: crop.image,
              cropName: crop.name,
              cropDescription: crop.description,
              cropTemperature: crop.temperature
            })}
          >
            <FeatherIcon size={18} name="edit" color="#333333" />
          </TouchableOpacity>
        )}
        <View style={tw`flex-col items-center w-full my-10`}>
          <View style={tw`flex-col items-center my-3`}>
            <Text style={tw`font-poppins-bold text-2xl text-olive-dark`}>{ crop.name }</Text>
          </View>
          <View style={tw`flex-col items-center my-3`}>
            <Text style={tw`font-poppins-bold text-xl text-olive-dark`}>{ crop.temperature }°C</Text>
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