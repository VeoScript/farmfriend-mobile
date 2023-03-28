import React from 'react'
import tw from '../../styles/tailwind'
import { SafeAreaView, ImageBackground, Image, Text, View } from 'react-native'
import { FeatherIcon } from '../../utils/Icons'

interface IProps {
  error?: string
}

type ErrorScreenProps = (props: IProps) => JSX.Element

const ErrorScreen: ErrorScreenProps = ({ error }) => {
  return (
    <SafeAreaView style={tw`flex-1 bg-olive-light`}>
      <ImageBackground
        source={require('../../assets/images/farmfriend-background.jpg')}
        resizeMode="cover"
        style={tw`relative flex-1 flex-col items-start w-full`}
      >
        <View style={tw`flex-1 flex-col items-center justify-center w-full px-5`}>
          <Image
            style={tw`w-[12rem] h-[12rem]`}
            resizeMode="cover"
            source={require('../../assets/images/farmfriend-logo.png')}
          />
          <View style={tw`flex-col items-center w-full my-3`}>
            <FeatherIcon name="alert-triangle" size={90} color="#010101" />
          </View>
          <View style={tw`flex-col items-center w-full my-5`}>
            <Text style={tw`font-poppins text-xl text-olive`}>
              { error ? error : 'Opps! There is an error.' }
            </Text>
            {!error && (
              <Text style={tw`font-light text-sm text-olive`}>
                We're trying to fix this ASAP.
              </Text>
            )}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default ErrorScreen