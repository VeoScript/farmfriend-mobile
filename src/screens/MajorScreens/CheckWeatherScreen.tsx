import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import ErrorScreen from '../../components/SplashScreens/ErrorScreen'
import LoadingScreen from '../../components/SplashScreens/LoadingScreen'
import Geolocation from 'react-native-geolocation-service'
import moment from 'moment'
import tw from '../../styles/tailwind'
import { FeatherIcon } from '../../utils/Icons'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { WEATHER_API_KEY } from '@env'

const BASE_URL = 'https://api.weatherapi.com/v1/forecast.json'

const CheckWeatherScreen = () => {

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [forecast, setForecast] = React.useState<any>()
  const [error, setError] = React.useState<string>('')

  const handleFetchWeather = () => {
    setIsLoading(true)
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords

        fetch(`${BASE_URL}?key=${WEATHER_API_KEY}&q=${`${latitude},${longitude}`}&days=6&aqi=yes`)
          .then(response => response.json())
          .then(data => {
            setIsLoading(false)
            setForecast(data)
          })
          .catch(error => {
            setIsLoading(false)
            setError(error.message)
          })
      },
      error => {
        setError(error.message)
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    )
  }

  React.useEffect(() => {
    handleFetchWeather()
  }, [])

  if (!forecast || isLoading) return <LoadingScreen />
  if (error) return <ErrorScreen error={error} />

  return (
    <MainLayout title="Check Weather">
      <View style={tw`flex-1 flex-col w-full py-3`}>
        <View style={tw`flex-col w-full px-5 border-b border-olive border-opacity-40`}>
          <View style={tw`flex-row items-center w-full my-3`}>
            <View style={tw`flex-1 flex-col items-start w-full mr-2`}>
              <Text style={tw`font-poppins text-lg text-olive`}>{ forecast?.location.name }</Text>
              <Text style={tw`font-poppins-light text-xs text-olive`}>{ forecast?.location.region }, { forecast?.location.country }</Text>
            </View>
            <View style={tw`flex-1 flex-col items-end w-full ml-2`}>
              <Text style={tw`font-poppins text-lg text-olive`}>{ moment(new Date()).format('LT') }</Text>
              <Text style={tw`font-poppins-light text-xs text-olive`}>{ moment(forecast?.location.localtime).format('LL') }</Text>
            </View>
          </View>
          <View style={tw`flex-row items-center w-full my-3`}>
            <View style={tw`flex-1 flex-col items-start w-full mr-2`}>
              <Image
                style={tw`rounded-full w-[2rem] h-[2rem]`}
                resizeMode="cover"
                source={{ uri: `http:${forecast?.current.condition.icon}` }}
              />
              <Text style={tw`font-poppins text-[3rem] text-olive-dark`}>{ Math.round(forecast?.current.temp_c) }° C</Text>
            </View>
            <View style={tw`flex-1 flex-col items-end w-full ml-2`}>
              <Text style={tw`font-poppins text-base text-right text-olive`}>{ forecast?.current.condition.text }</Text>
            </View>
          </View>
        </View>
        <View style={tw`flex-col w-full`}>
          <View style={tw`flex-row items-center justify-between w-full p-3`}>
            <Text style={tw`font-poppins text-base text-olive-dark`}>This Week</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`w-auto rounded-full p-2 bg-white bg-opacity-50`}
              onPress={handleFetchWeather}
            >
              <FeatherIcon size={18} name="refresh-cw" color="#333333" />
            </TouchableOpacity>
          </View>
          {forecast?.forecast.forecastday.map((weather: any, i: number) => (
            <View key={i} style={tw`flex-1 flex-row items-center justify-between w-full px-5 py-3 overflow-hidden border-b border-olive border-opacity-40`}>
              <View style={tw`flex-row items-center justify-start w-[5rem]`}>
                <Text style={tw`font-poppins-bold text-xs text-olive uppercase`}>{ moment(weather?.date).format('dddd').substring(0, 3) }</Text>
              </View>
              <View style={tw`flex-1 flex-row items-center justify-start w-full`}>
                <Text style={tw`mr-1 font-poppins text-xs text-olive-dark`}>{ Math.round(weather?.day.maxtemp_c) }° C</Text>
                <Text style={tw`ml-1 font-poppins text-xs text-olive`}>{ Math.round(weather?.day.avgtemp_c) }° C</Text>
              </View>
              <View style={tw`flex-1 flex-row items-center justify-start w-full`}>
                <Image
                  style={tw`rounded-full w-[2rem] h-[2rem]`}
                  resizeMode="cover"
                  source={{ uri: `http:${weather?.day.condition.icon}` }}
                />
                <Text style={tw`font-poppins text-xs text-left text-olive`}>{ weather?.day.condition.text }</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </MainLayout>
  )
}

export default CheckWeatherScreen