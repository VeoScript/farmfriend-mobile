import Geolocation from 'react-native-geolocation-service'
import { PermissionsAndroid } from 'react-native'
import { Toast } from '../../utils/Toast'
import { WEATHER_API_KEY } from '@env'

interface IProps {
  setIsLoading: (value: boolean) => void
  setError: (value: string) => void
  setForecast: (data: any) => void
}

const BASE_URL = 'https://api.weatherapi.com/v1/forecast.json'

export async function useGetWeather(props: { options: IProps }): Promise<void> {
  const {
    setIsLoading,
    setForecast,
    setError
  } = props.options

  try {
    setIsLoading(true)
    
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission',
        message: 'Please grant permission to access your location',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Toast('Location permission granted')

      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords

          fetch(`${BASE_URL}?key=${WEATHER_API_KEY}&q=${`${latitude},${longitude}`}&days=7&aqi=no&alerts=no`)
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
          setIsLoading(false)
          setError(error.message)
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      )
    } else {
      setIsLoading(false)
      Toast('Location permission denied')
    }
  } catch (err) {
    console.warn(err)
  }
}