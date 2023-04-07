import React from 'react'
import Copyright from '../components/Copyright'
import tw from '../styles/tailwind'
import { SafeAreaView, ScrollView, ImageBackground, View, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'

interface IProps {
  children: React.ReactNode
}

type AuthLayoutProps = (props: IProps) => JSX.Element

const AuthLayout: AuthLayoutProps = ({ children }) => {

  const router = useRoute()

  return (
    <SafeAreaView style={tw`flex-1 bg-olive-light`}>
      <ImageBackground
        source={require('../assets/images/farmfriend-background.jpg')}
        resizeMode="cover"
        style={tw`flex-1`}
      >
        {router.name === 'LoginScreen' && (
          <View style={tw`relative flex-1 flex-col items-center justify-center w-full px-5`}>
            <Image
              style={tw`w-[12rem] h-[12rem]`}
              resizeMode="cover"
              source={require('../assets/images/farmfriend-logo.png')}
            />
            {children}
            <Copyright />
          </View>
        )}
        {router.name === 'CreateAccountScreen' && (
          <ScrollView style={tw`flex-1`} keyboardShouldPersistTaps="handled">
            <View style={tw`relative flex-col items-center justify-start w-full px-5 pb-10`}>
              <Image
                style={tw`w-[12rem] h-[12rem]`}
                resizeMode="cover"
                source={require('../assets/images/farmfriend-logo.png')}
              />
              {children}
              <Copyright />
            </View>
          </ScrollView>
        )}
      </ImageBackground>
    </SafeAreaView>
  )
}

export default AuthLayout