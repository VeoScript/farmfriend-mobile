import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import tw from '../../styles/tailwind'
import { Toast } from '../../utils/Toast'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useGoBack } from '../../config/RootNavigation'
import { useBackHandler } from '../../helpers/hooks/useBackHandler'
import { useGetUserAccount } from '../../helpers/hooks/useGetUserAccount'
import { createProgramStore } from '../../helpers/zustand/store'
import { useCreateProgramMutation } from '../../helpers/tanstack/mutations/programs'

const AddProgramsScreen = () => {
  
  const account = useGetUserAccount()

  const {
    isLoading,
    title,
    description,
    title_error,
    description_error,
    setTitle,
    setDescription,
    setTitleError,
    setDescriptionError,
    setIsLoading,
    setDefault
  } = createProgramStore()

  const createProgramMutation = useCreateProgramMutation()

  const handleCreateProgram = async () => {
    if (title === '') return setTitleError('Title is required')
    if (description === '') return setDescriptionError('Description is required')

    setIsLoading(true)

    await createProgramMutation.mutateAsync({
      title,
      description,
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
      }
    })
  }

  useBackHandler(() => {
    setDefault()
    useGoBack()
  })

  return (
    <MainLayout title="Add Programs">
      <View style={tw`flex-col w-full my-2 px-5`}>
        <View style={tw`flex-col w-full my-2`}>
          <Text style={tw`font-poppins-bold text-xl`}>New Program</Text>
          <View style={tw`flex-col w-full my-2`}>
            <TextInput
              style={tw`font-poppins text-sm text-olive border-b border-olive`}
              placeholder="Title"
              value={title}
              onChangeText={(value: string) => {
                setTitle(value)
                setTitleError('')
              }}
            />
            {title_error && (<Text style={tw`mt-1 font-poppins-light text-xs text-red-600`}>{title_error}</Text>)}
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
          <TouchableOpacity
            disabled={isLoading}
            activeOpacity={0.7}
            style={tw`flex-row items-center justify-center w-full my-1 px-2 py-3 rounded-full bg-olive-dark ${isLoading ? 'opacity-50' : 'opacity-100'}`}
            onPress={handleCreateProgram}
          >
            <Text style={tw`font-poppins text-sm text-white`}>{ isLoading ? 'Creating...' : 'Create' }</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MainLayout>
  )
}

export default AddProgramsScreen