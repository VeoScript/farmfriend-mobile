import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import tw from '../../styles/tailwind'
import { FeatherIcon } from '../../utils/Icons'
import { Toast } from '../../utils/Toast'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { useRoute } from '@react-navigation/native'
import { useGoBack, useNavigate } from '../../config/RootNavigation'
import { useBackHandler } from '../../helpers/hooks/useBackHandler'
import { createCropStore } from '../../helpers/zustand/store'
import { useUpdateCropMutation } from '../../helpers/tanstack/mutations/crops'
import { IMGBB_API_SECRET } from '@env'

const EditCropsScreen = () => {

  const route: any = useRoute()

  const {
    isLoading,

    photo,
    name,
    description,
    temperature,
    max_temperature,

    name_error,
    description_error,
    temperature_error,
    max_temperature_error,

    setPhoto,
    setName,
    setDescription,
    setTemperature,
    setMaxTemperature,
    setNameError,
    setDescriptionError,
    setTemperatureError,
    setMaxTemperatureError,

    setIsLoading,
    setDefault
  } = createCropStore()

  const updateCropMutation = useUpdateCropMutation(route.params?.cropId)

  React.useEffect(() => {
    setName(route.params?.cropName)
    setDescription(route.params?.cropDescription)
    setTemperature(route.params?.cropTemperature)
    setMaxTemperature(route.params?.cropMaxTemperature)
  }, [route.params])

  const handleChoosePhoto = () => {
    let options: any = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false
    }

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

  const handleUpdateCrop = async () => {
    if (name === '') return setNameError('Name is required')
    if (description === '') return setDescriptionError('Description is required')
    if (temperature === '') return setTemperatureError('Temperature is required')
    if (max_temperature === '') return setMaxTemperatureError('Maximum Range Temperature is required')

    try {
      setIsLoading(true)

      if (photo) {
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
          await updateCropMutation.mutateAsync({
            photo: String(result.data.url),
            name,
            description,
            temperature,
            max_temperature
          },
          {
            onError: (error: any) => {
              Toast(`${error.response?.data?.message}`)
              setIsLoading(false)
            },
            onSuccess: () => {
              Toast('Updated successfully')
              setIsLoading(false)
              setDefault()
              useNavigate('SearchCropsScreen')
            }
          })
        })
        .catch((error) => {
          console.error(error)
        })
      } else {
        await updateCropMutation.mutateAsync({
          photo: String(route.params?.cropPhoto),
          name,
          description,
          temperature,
          max_temperature
        },
        {
          onError: (error: any) => {
            Toast(`${error.response?.data?.message}`)
            setIsLoading(false)
          },
          onSuccess: () => {
            Toast('Updated successfully')
            setIsLoading(false)
            setDefault()
            useNavigate('SearchCropsScreen')
          }
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  useBackHandler(() => {
    setDefault()
    useGoBack()
  })

  return (
    <MainLayout title={`Edit Crop`}>
      <View style={tw`flex-1 flex-col w-full my-2 px-5`}>
        <View style={tw`flex-col w-full my-2`}>
          <Text style={tw`font-poppins-bold text-xl`}>Edit {route.params?.cropName} Crop</Text>
          <View style={tw`flex-col items-start w-full mt-3`}>
            <View style={tw`relative my-1`}>
              {photo
                ? <Image
                    style={tw`rounded-xl w-[10rem] h-[10rem] bg-olive bg-opacity-50`}
                    resizeMode="cover"
                    source={{ uri: photo[0].uri }}
                  />
                : <Image
                    style={tw`rounded-xl w-[10rem] h-[10rem] bg-olive bg-opacity-50`}
                    resizeMode="cover"
                    source={{ uri: route.params?.cropPhoto }}
                  />
              }
              <TouchableOpacity
                activeOpacity={0.5}
                style={tw`absolute bottom-2 right-2 z-10 rounded-full p-2 bg-white bg-opacity-50`}
                onPress={handleChoosePhoto}
              >
                <FeatherIcon size={15} name="camera" color="#333333" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw`flex-col w-full my-2`}>
            <TextInput
              editable={!isLoading}
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
              editable={!isLoading}
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
              editable={!isLoading}
              keyboardType="numeric"
              style={tw`font-poppins text-sm text-olive border-b border-olive`}
              placeholder="Required Temperature"
              value={temperature}
              onChangeText={(value: string) => {
                setTemperature(value.replace(/\D/g, ''))
                setTemperatureError('')
              }}
            />
            {temperature_error && (<Text style={tw`mt-1 font-poppins-light text-xs text-red-600`}>{temperature_error}</Text>)}
          </View>
          <View style={tw`flex-col w-full my-2`}>
            <TextInput
              editable={!isLoading}
              keyboardType="numeric"
              style={tw`font-poppins text-sm text-olive border-b border-olive`}
              placeholder="Maximum Range Temperature"
              value={max_temperature}
              onChangeText={(value: string) => {
                setMaxTemperature(value.replace(/\D/g, ''))
                setMaxTemperatureError('')
              }}
            />
            {max_temperature_error && (<Text style={tw`mt-1 font-poppins-light text-xs text-red-600`}>{max_temperature_error}</Text>)}
          </View>
          <TouchableOpacity
            disabled={isLoading}
            activeOpacity={0.7}
            style={tw`flex-row items-center justify-center w-full my-1 px-2 py-3 rounded-full bg-olive-dark ${isLoading ? 'opacity-50' : 'opacity-100'}`}
            onPress={handleUpdateCrop}
          >
            <Text style={tw`font-poppins text-sm text-white`}>{ isLoading ? 'Updating...' : 'Update' }</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MainLayout>
  )
}

export default EditCropsScreen