import React from 'react'
import TopBar from '../components/TopBar'
import tw from '../styles/tailwind'
import { SafeAreaView, ScrollView, ImageBackground } from 'react-native'
import { useRoute } from '@react-navigation/native'

interface IProps {
  title: string
  children: React.ReactNode
}

type MainLayoutProps = (props: IProps) => JSX.Element

const MainLayout: MainLayoutProps = ({ title, children }) => {

  const route = useRoute()

  return (
    <SafeAreaView style={tw`flex-1 bg-olive-light`}>
      <ImageBackground
        source={require('../assets/images/farmfriend-background.jpg')}
        resizeMode="cover"
        style={tw`relative flex-1 flex-col items-start w-full`}
      >
        <TopBar title={title} />
        {(route.name === 'SearchProgramsScreen' ||
          route.name === 'SearchCropsScreen' ||
          route.name === 'UserFarmersScreen' ||
          route.name === 'UserLguNgoScreen' ||
          route.name === 'ViewReportsScreen' ||
          route.name === 'ViewRatesScreen'
        )
          ? <>
              {children}
            </>
          : <ScrollView style={tw`flex-1 w-full`} keyboardShouldPersistTaps="always">
              {children}
            </ScrollView>
        }
      </ImageBackground>
    </SafeAreaView>
  )
}

export default MainLayout