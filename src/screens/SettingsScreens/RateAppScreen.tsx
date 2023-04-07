import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import tw from '../../styles/tailwind'
import { Toast } from '../../utils/Toast'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Rating } from 'react-native-ratings'
import { useNavigate } from '../../config/RootNavigation'
import { useBackHandler } from '../../helpers/hooks/useBackHandler'
import { useGetUserAccount } from '../../helpers/hooks/useGetUserAccount'
import { useCreateRateMutation } from '../../helpers/tanstack/mutations/rates'

const RateAppScreen = () => {

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [rate, setRate] = React.useState<number>(2.5)
  const [feedback, setFeedback] = React.useState<string>('')

  const account = useGetUserAccount()

  const createRateMutation = useCreateRateMutation()

  const handleSubmitRate = async () => {
    setIsLoading(true)

    await createRateMutation.mutateAsync({
      rate,
      feedback,
      user_id: account.id
    },
    {
      onError: (error: any) => {
        Toast(`${error.response?.data?.message}`)
        setIsLoading(false)
      },
      onSuccess: () => {
        Toast('Thanks for your feedback')
        setRate(2.5)
        setFeedback('')
        setIsLoading(false)
        useNavigate('HomeScreen')
      }
    })
  }

  useBackHandler(() => {
    useNavigate('HomeScreen')
  })

  return (
    <MainLayout title="Rate App">
      <View style={tw`flex-1 flex-col items-center w-full p-3`}>
        <Image
          style={tw`w-[15rem] h-[15rem]`}
          resizeMode="cover"
          source={require('../../assets/images/farmfriend-logo.png')}
        />
        <View style={tw`flex-col items-center w-full`}>
          <Text style={tw`my-3 font-poppins-bold text-2xl text-center text-olive-dark`}>Enjoying FarmFriend Application?</Text>
          <View style={tw`flex-col w-full`}>
            <Text style={tw`mb-2 font-poppins text-lg text-center text-olive`}>Tap a star to rate!</Text>
            <Rating
              showRating
              fractions={1}
              startingValue={rate}
              tintColor='#425951'
              style={tw`w-full rounded-xl p-5 bg-olive`}
              onFinishRating={(rating: number) => {
                setRate(rating)
              }}
            />
            <View style={tw`flex-col w-full my-2`}>
              <TextInput
                multiline
                style={tw`font-poppins text-sm text-olive border-b border-olive`}
                placeholder="Your Feedback (optional)"
                value={feedback}
                onChangeText={(value: string) => setFeedback(value)}
              />
            </View>
            <TouchableOpacity
              disabled={isLoading}
              activeOpacity={0.7}
              style={tw`flex-row items-center justify-center w-full my-5 px-2 py-3 rounded-full bg-olive-dark ${isLoading ? 'opacity-50' : 'opacity-100'}`}
              onPress={handleSubmitRate}
            >
              <Text style={tw`font-poppins text-sm text-white`}>{ isLoading ? 'Submitting...' : 'Submit' }</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </MainLayout>
  )
}

export default RateAppScreen