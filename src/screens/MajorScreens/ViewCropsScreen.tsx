import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import LoadingScreen from '../../components/SplashScreens/LoadingScreen'
import tw from '../../styles/tailwind'
import { FeatherIcon } from '../../utils/Icons'
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useNavigate } from '../../config/RootNavigation'
import { useGetUserAccount } from '../../helpers/hooks/useGetUserAccount'
import { useGetCrop } from '../../helpers/tanstack/queries/crops'
import { useDeleteCropMutation } from '../../helpers/tanstack/mutations/crops'

const ViewCropsScreen = () => {

  const route: any = useRoute()

  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  const account = useGetUserAccount()

  const { data: crop, isLoading } = useGetCrop(route.params?.id)

  const deleteCropMutation = useDeleteCropMutation(route.params?.id)

  if (isLoading || isDeleteLoading) return <LoadingScreen />

  const handleDeleteCrop = async () => {
    setIsDeleteLoading(true)
    await deleteCropMutation.mutateAsync(undefined, {
      onError: () => {
        setIsDeleteLoading(false)
      },
      onSuccess: () => {
        setIsDeleteLoading(false)
      }
    })
  }

  return (
    <MainLayout title={crop.name}>
      <View style={tw`relative flex-1 flex-col items-center w-full p-3`}>
        <Image
          style={tw`rounded-xl w-[10rem] h-[10rem] bg-olive bg-opacity-50`}
          resizeMode="cover"
          source={{ uri: crop.image }}
        />
        {account.account_type === 'ADMIN' && (
          <View style={tw`absolute top-3 right-3 flex-row items-center w-auto`}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`rounded-full mx-0.5 p-2 bg-white bg-opacity-50`}
              onPress={() => useNavigate('EditCropsScreen', {
                cropId: crop.id,
                cropPhoto: crop.image,
                cropName: crop.name,
                cropDescription: crop.description,
                cropTemperature: crop.temperature,
                cropMaxTemperature: crop.max_temperature,
              })}
            >
              <FeatherIcon size={18} name="edit" color="#333333" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`rounded-full mx-0.5 p-2 bg-white bg-opacity-50`}
              onPress={() => {
                Alert.alert(
                  '',
                  `Are you sure you want to delete this crop ${crop.name}?`,
                  [
                    {
                      text: 'No',
                      style: "cancel"
                    },
                    {
                      text: 'Yes',
                      style: "default",
                      onPress: handleDeleteCrop
                    }
                  ],
                  {
                    cancelable: true
                  }
                )
              }}
            >
              <FeatherIcon size={18} name="trash" color="#333333" />
            </TouchableOpacity>
          </View>
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
            <Text style={tw`font-poppins-bold text-xl text-olive-dark`}>{ crop.max_temperature }°C</Text>
            <Text style={tw`font-poppins text-xs text-olive`}>Maximum Temperature</Text>
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