import Geolocation from 'react-native-geolocation-service'
import { WEATHER_API_KEY } from '@env'

interface IProps {
  setIsLoading: (value: boolean) => void
  setError: (value: string) => void
  setForecast: (data: any) => void
}

const BASE_URL = 'https://api.weatherapi.com/v1/forecast.json'

export function useGetWeather(props: { options: IProps }) {
  const {
    setIsLoading,
    setForecast,
    setError
  } = props.options

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