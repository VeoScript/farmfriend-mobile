import React from 'react'
import TopBar from '../components/TopBar'
import tw from '../styles/tailwind'
import { SafeAreaView, ScrollView, ImageBackground } from 'react-native'

interface IProps {
  title: string
  children: React.ReactNode
}

type MainLayoutProps = (props: IProps) => JSX.Element

const MainLayout: MainLayoutProps = ({ title, children }) => {
  return (
    <SafeAreaView style={tw`flex-1 bg-olive-light`}>
      <ImageBackground
        source={require('../assets/images/farmfriend-background.jpg')}
        resizeMode="cover"
        style={tw`relative flex-1 flex-col items-start w-full`}
      >
        <TopBar title={title} />
        <ScrollView style={tw`flex-1 w-full`}>
          {children}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default MainLayout