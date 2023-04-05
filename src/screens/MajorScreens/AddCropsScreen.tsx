import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import tw from '../../styles/tailwind'
import { FeatherIcon } from '../../utils/Icons'
import { Toast } from '../../utils/Toast'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { useGoBack, useNavigate } from '../../config/RootNavigation'
import { useBackHandler } from '../../helpers/hooks/useBackHandler'
import { useGetUserAccount } from '../../helpers/hooks/useGetUserAccount'
import { createCropStore } from '../../helpers/zustand/store'
import { useCreateCropMutation } from '../../helpers/tanstack/mutations/crops'
import { IMGBB_API_SECRET } from '@env'

const AddCropsScreen = () => {

  const account = useGetUserAccount()

  const {
    isLoading,

    photo,
    name,
    description,
    temperature,

    photo_error,
    name_error,
    description_error,
    temperature_error,

    setPhoto,
    setName,
    setDescription,
    setTemperature,
    setPhotoError,
    setNameError,
    setDescriptionError,
    setTemperatureError,

    setIsLoading,
    setDefault
  } = createCropStore()

  const createCropMutation = useCreateCropMutation()

  const handleChoosePhoto = () => {
    let options: any = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false
    }
    
    setPhotoError('')

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        setPhoto(null)
        return
      }
      if (response) {
        setPhoto(response.assets)
      }
    })
  }

  const handleCreateCrop = async () => {
    if (!photo) return setPhotoError('Photo is required')
    if (name === '') return setNameError('Name is required')
    if (description === '') return setDescriptionError('Description is required')
    if (temperature === '') return setTemperatureError('Temperature is required')

    try {
      setIsLoading(true)

      const image: any = photo[0]
      const data = new FormData()
      
      data.append('image', {
        uri: image.uri,
        name: image.fileName,
        type: image.type,
        size: image.fileSize
      })

      await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_SECRET}`, {
        method: 'POST',
        body: data
      })
      .then((response) => response.json())
      .then(async (result) => {
        await createCropMutation.mutateAsync({
          photo: String(result.data.url),
          name,
          description,
          temperature,
          user_id: account.id
        },
        {
          onError: (error: any) => {
            Toast(`${error.response?.data?.message}`)
            setIsLoading(false)
          },
          onSuccess: () => {
            Toast('Created successfully')
            setIsLoading(false)
            setDefault()
            useNavigate('SearchCropsScreen')
          }
        })
      })
      .catch((error) => {
        console.error(error)
      })
    } catch (error) {
      console.error(error)
    }
  }

  useBackHandler(() => {
    setDefault()
    useGoBack()
  })

  return (
    <MainLayout title="Add Crops">
      <View style={tw`flex-1 flex-col w-full my-2 px-5`}>
        <View style={tw`flex-col w-full my-2`}>
          <Text style={tw`font-poppins-bold text-xl`}>New Crop</Text>
          <View style={tw`flex-col items-start w-full mt-3`}>
            <View style={tw`relative my-1`}>
              {photo
                ? <Image
                    style={tw`rounded-xl w-[10rem] h-[10rem] bg-olive-semi-light`}
                    resizeMode="cover"
                    source={{ uri: photo[0].uri }}
                  />
                : <View style={tw`flex-row items-center justify-center w-[10rem] h-[10rem] p-2 overflow-hidden rounded-xl bg-olive-semi-light`}>
                    <FeatherIcon
                      name="image"
                      size={90}
                      color="#8EB6AD"
                    />
                  </View>
              }
              <TouchableOpacity
                activeOpacity={0.5}
                style={tw`absolute bottom-2 right-2 z-10 rounded-full p-2 bg-white bg-opacity-50`}
                onPress={handleChoosePhoto}
              >
                <FeatherIcon size={15} name="camera" color="#333333" />
              </TouchableOpacity>
            </View>
            {photo_error && (<Text style={tw`mt-1 font-poppins-light text-xs text-red-600`}>{photo_error}</Text>)}
          </View>
          <View style={tw`flex-col w-full my-2`}>
            <TextInput
              style={tw`font-poppins text-sm text-olive border-b border-olive`}
              placeholder="Name"
              value={name}
              onChangeText={(value: string) => {
                setName(value)
                setNameError('')
              }}
            />
            {name_error && (<Text style={tw`mt-1 font-poppins-light text-xs text-red-600`}>{name_error}</Text>)}
          </View>
          <View style={tw`flex-col w-full my-2`}>
            <TextInput
              multiline
              style={tw`font-poppins text-sm text-olive border-b border-olive`}
              placeholder="Description"
              value={description}
              onChangeText={(value: string) => {
                setDescription(value)
                setDescriptionError('')
              }}
            />
            {description_error && (<Text style={tw`mt-1 font-poppins-light text-xs text-red-600`}>{description_error}</Text>)}
          </View>
          <View style={tw`flex-col w-full my-2`}>
            <TextInput
              keyboardType="decimal-pad"
              style={tw`font-poppins text-sm text-olive border-b border-olive`}
              placeholder="Required Temperature"
              value={temperature}
              onChangeText={(value: string) => {
                setTemperature(value)
                setTemperatureError('')
              }}
            />
            {temperature_error && (<Text style={tw`mt-1 font-poppins-light text-xs text-red-600`}>{temperature_error}</Text>)}
          </View>
          <TouchableOpacity
            disabled={isLoading}
            activeOpacity={0.7}
            style={tw`flex-row items-center justify-center w-full my-1 px-2 py-3 rounded-full bg-olive-dark ${isLoading ? 'opacity-50' : 'opacity-100'}`}
            onPress={handleCreateCrop}
          >
            <Text style={tw`font-poppins text-sm text-white`}>{ isLoading ? 'Creating...' : 'Create' }</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MainLayout>
  )
}

export default AddCropsScreen