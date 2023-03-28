import React from 'react'
import tw from '../../styles/tailwind'
import { SafeAreaView, ImageBackground, Image, Text, View, ActivityIndicator } from 'react-native'
import { useCheckOnline } from '../../helpers/hooks/useCheckOnline'

const LoadingScreen = () => {

  const checkOnline = useCheckOnline()

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
          <View style={tw`my-3`}>
            <ActivityIndicator
              color='#010101'
              size={50}
            />
          </View>
          <Text style={tw`font-poppins-bold text-xl text-olive`}>Loading...</Text>
          {(checkOnline !== null && !checkOnline) && (
            <View style={tw`flex-col items-center w-full my-5`}>
              <Text style={tw`font-poppins text-xl text-olive`}>
                You are offline.
              </Text>
              <Text style={tw`font-light text-sm text-olive`}>
                Check your internet connection.
              </Text>
            </View>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default LoadingScreen