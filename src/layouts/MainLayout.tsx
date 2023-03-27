import React from 'react'
import tw from '../styles/tailwind'
import { SafeAreaView, ImageBackground } from 'react-native'

interface IProps {
  children: React.ReactNode
}

type MainLayoutProps = (props: IProps) => JSX.Element

const MainLayout: MainLayoutProps = ({ children }) => {
  return (
    <SafeAreaView style={tw`flex-1 bg-olive-light`}>
      <ImageBackground
        source={require('../assets/images/farmfriend-background.jpg')}
        resizeMode="cover"
        style={tw`relative flex-1 flex-col items-start w-full`}
      >
        {children}
      </ImageBackground>
    </SafeAreaView>
  )
}

export default MainLayout