import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import ErrorScreen from '../../components/SplashScreens/ErrorScreen'
import LoadingScreen from '../../components/SplashScreens/LoadingScreen'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import tw from '../../styles/tailwind'
import { FeatherIcon } from '../../utils/Icons'
import { View, Image, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { useGetWeatherFuture } from '../../helpers/hooks/useGetWeatherFuture'
import { useGetSuggestedCrops } from '../../helpers/tanstack/queries/crops'
import { useNavigate } from '../../config/RootNavigation'

const SuggestedCropsFutureScreen = () => {

  var currentDate = new Date();  // Assuming the current date is 2023-06-20
  var newDate = new Date(currentDate);  // Create a new Date object based on the current date
  newDate.setMonth(currentDate.getMonth() + 1); // Set the month to one month ahead (required kang weather api na iset ang default date ug one month ahead)

  const [futureDate, setFutureDate] = React.useState<Date>(newDate)
  const [isOpenFutureDate, setIsOpenFutureDate] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>('')
  const [search, setSearch] = React.useState<string>('')
  const [forecast, setForecast] = React.useState<any>()

  const { data: suggestedCrops, isLoading: isLoadingSuggestedCrops, isError: isErrorSuggestedCrops, refetch } = useGetSuggestedCrops(search)

  const handleFetchWeather = () => {
    useGetWeatherFuture({
      options: {
        futureDate: moment(futureDate).format('YYYY-MM-DD'),
        setIsLoading: setIsLoading,
        setError: setError,
        setForecast: setForecast
      }
    })
  }

  React.useEffect(() => {
    handleFetchWeather()
  }, [futureDate])

  if (!forecast || isLoading) return <LoadingScreen />
  if (error || isErrorSuggestedCrops) return <ErrorScreen error={error} />
  if (forecast?.forecast === undefined) return (
    <ErrorScreen
      error="Date should be between 14 days and 300 days from today in the future."
      refresh={() => {
        handleFetchWeather()
        setFutureDate(newDate)
      }}
    />
  )

  const minimumTemperature = Math.round(forecast?.forecast.forecastday[0].day.mintemp_c)
  const maximumAverageTemperature = Math.round(forecast?.forecast.forecastday[0].day.maxtemp_c)

  return (
    <MainLayout title="Future Suggested Crops">
      <View style={tw`flex-1 flex-col w-full py-3`}>
        <View style={tw`flex-col w-full px-5 border-b border-olive border-opacity-40`}>
          <View style={tw`flex-row items-center w-full my-1`}>
            <View style={tw`flex-1 flex-col items-start w-full mr-2 mb-2`}>
              <Image
                style={tw`rounded-full w-[2rem] h-[2rem] mb-1`}
                resizeMode="cover"
                source={{ uri: `https:${forecast?.forecast.forecastday[0].day.condition.icon}` }}
              />
              <Text style={tw`font-poppins text-2xl text-olive-dark`}>{ Math.round(forecast?.forecast.forecastday[0].day.mintemp_c) }° C / <Text style={tw`font-poppins text-xl text-olive`}>{ Math.round(forecast?.forecast.forecastday[0].day.maxtemp_c) }° C</Text></Text>
            </View>
            <View style={tw`flex-1 flex-col items-end w-full ml-2`}>
              <Text style={tw`font-poppins-light text-sm`}>Future Date:</Text>
              <Text style={tw`font-poppins text-base text-right text-olive capitalize`}>
                { moment(futureDate).format('YYYY-MM-DD') }
              </Text>
            </View>
          </View>
        </View>
        <View style={tw`flex-col w-full`}>
          <View style={tw`flex-row items-center justify-between w-full p-3`}>
            <View>
              <Text style={tw`font-poppins text-base text-olive-dark`}>Available Crops</Text>
              <Text style={tw`font-poppins-light text-xs text-olive`}>Discover the perfect crop for you!</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`w-auto rounded-full p-2 bg-white bg-opacity-50`}
              onPress={() => {
                refetch()
                handleFetchWeather()
              }}
            >
              <FeatherIcon size={18} name="refresh-cw" color="#333333" />
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row items-center justify-between w-full p-3`}>
            <View style={tw`flex-row items-center w-full py-5 border-b border-olive`}>
              <FeatherIcon size={20} name="calendar" color="#425951" />
              <TouchableOpacity
                activeOpacity={0.5}
                style={tw`w-full ml-2`}
                onPress={() => setIsOpenFutureDate(true)}
              >
                <Text style={tw`font-poppins text-sm text-olive`}>Select Date</Text>
              </TouchableOpacity>
            </View>
            <DatePicker
              modal
              mode='date'
              textColor='#425951'
              theme='auto'
              open={isOpenFutureDate}
              date={futureDate ? futureDate : new Date()}
              onConfirm={(date) => {
                setIsOpenFutureDate(false)
                setFutureDate(date)
              }}
              onCancel={() => {
                setIsOpenFutureDate(false)
              }}
            />
          </View>
          <View style={tw`flex-col w-full px-3 mb-1`}>
            <View style={tw`flex-row items-center w-full border-b border-olive`}>
              <FeatherIcon size={20} name="search" color="#425951" />
              <TextInput
                style={tw`w-full ml-2 font-poppins text-sm text-olive`}
                placeholder="Search"
                value={search}
                onChangeText={(value: string) => setSearch(value)}
              />
            </View>
          </View>
          {isLoadingSuggestedCrops
            ? <View style={tw`flex-col items-center w-full my-10`}>
                <ActivityIndicator style={tw`pb-3`} color='#425951' size={40} />
                <Text style={tw`font-poppins text-base`}>Loading...</Text>
              </View>
            : <>
                {suggestedCrops.length === 0
                  ? <View style={tw`flex-1 flex-col items-center justify-center w-full my-3 `}>
                      <View style={tw`flex-1 w-full max-w-xs h-full`}>
                        <Text style={tw`font-poppins text-sm text-olive`}>
                          {search
                            ? `There's no result in keyword of '${search}'.`
                            : `There's no suggested crops as of now.`
                          }
                        </Text>
                      </View>
                    </View>
                  : <>
                      {suggestedCrops.map((crop: { id: string, image: string, name: string, description: string, temperature: string, max_temperature: string }, i: number) => (
                        <React.Fragment key={i}>
                          {(minimumTemperature <= Number(crop.temperature) && Number(crop.temperature) <= maximumAverageTemperature || minimumTemperature <= Number(crop.max_temperature) && Number(crop.max_temperature) <= maximumAverageTemperature) && (
                            <TouchableOpacity
                              activeOpacity={0.7}
                              style={tw`flex-row w-full p-3 overflow-hidden border-b border-olive border-opacity-40`}
                              onPress={() => {
                                useNavigate('ViewCropsScreen', {
                                  id: crop.id
                                })
                              }}
                            >
                              <Image
                                style={tw`rounded-xl w-[3rem] h-[3rem] bg-olive bg-opacity-50`}
                                resizeMode="cover"
                                source={{ uri: crop.image }}
                              />
                              <View style={tw`flex-1 flex-col w-full ml-2 overflow-hidden`}>
                                <Text style={tw`my-0.5 font-poppins-bold text-sm text-olive-dark`}>{ crop.name }</Text>
                                <Text style={tw`font-poppins text-xs text-olive`}>Required Temperature - <Text style={tw`font-poppins-bold text-sm`}>{ crop.temperature }°C</Text></Text>
                                <Text style={tw`font-poppins text-xs text-olive`}>Maximum Temperature - <Text style={tw`font-poppins-bold text-sm`}>{ crop.max_temperature }°C</Text></Text>
                                <Text numberOfLines={1} style={tw`font-poppins text-xs text-olive`}>{ crop.description }</Text>
                              </View>
                            </TouchableOpacity>
                          )}
                        </React.Fragment>
                      ))}
                    </>
                }
              </>
          }
        </View>
      </View>
    </MainLayout>
  )
}

export default SuggestedCropsFutureScreen