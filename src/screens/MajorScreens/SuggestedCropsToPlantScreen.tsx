import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import ErrorScreen from '../../components/SplashScreens/ErrorScreen'
import LoadingScreen from '../../components/SplashScreens/LoadingScreen'
import tw from '../../styles/tailwind'
import { FeatherIcon } from '../../utils/Icons'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { useGetWeather } from '../../helpers/hooks/useGetWeather'
import { suggestedCrops } from '../../shared/mocks/suggested-crops'

const SuggestedCropsToPlantScreen = () => {

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>('')
  const [forecast, setForecast] = React.useState<any>()

  const handleFetchWeather = () => {
    useGetWeather({
      options: {
        setIsLoading: setIsLoading,
        setError: setError,
        setForecast: setForecast
      }
    })
  }

  React.useEffect(() => {
    handleFetchWeather()
  }, [])

  if (!forecast || isLoading) return <LoadingScreen />
  if (error) return <ErrorScreen error={error} />

  return (
    <MainLayout title="Suggested Crops">
      <View style={tw`flex-1 flex-col w-full py-3`}>
        <View style={tw`flex-col w-full px-5 border-b border-olive border-opacity-40`}>
          <View style={tw`flex-row items-center w-full my-1`}>
            <View style={tw`flex-1 flex-col items-start w-full mr-2`}>
              <Image
                style={tw`rounded-full w-[2rem] h-[2rem]`}
                resizeMode="cover"
                source={{ uri: `http:${forecast?.current.condition.icon}` }}
              />
              <Text style={tw`font-poppins text-[2rem] text-olive-dark`}>{ Math.round(forecast?.current.temp_c) }° C</Text>
            </View>
            <View style={tw`flex-1 flex-col items-end w-full ml-2`}>
              <Text style={tw`font-poppins text-base text-right text-olive capitalize`}>{ forecast?.current.condition.text }</Text>
            </View>
          </View>
        </View>
        <View style={tw`flex-col w-full`}>
          <View style={tw`flex-row items-center justify-between w-full p-3`}>
            <View>
              <Text style={tw`font-poppins text-base text-olive-dark`}>Available Crops</Text>
              <Text style={tw`font-poppins-light text-sm text-olive`}>Discover the perfect crop for you!</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`w-auto rounded-full p-2 bg-white bg-opacity-50`}
              onPress={handleFetchWeather}
            >
              <FeatherIcon size={18} name="refresh-cw" color="#333333" />
            </TouchableOpacity>
          </View>
          {suggestedCrops.map((crop: { image: string, name: string, description: string }, i: number) => (
            <View key={i} style={tw`flex-row w-full p-3 overflow-hidden border-b border-olive border-opacity-40`}>
              <Image
                style={tw`rounded-xl w-[3rem] h-[3rem] bg-olive`}
                resizeMode="cover"
                source={{ uri: crop.image }}
              />
              <View style={tw`flex-1 flex-col w-full ml-2 overflow-hidden`}>
                <Text style={tw`my-0.5 font-poppins-bold text-sm text-olive-dark`}>{ crop.name }</Text>
                <Text style={tw`my-0.5 font-poppins text-xs text-olive`}>{ crop.description }</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </MainLayout>
  )
}

export default SuggestedCropsToPlantScreen