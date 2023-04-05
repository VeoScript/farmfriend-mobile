import { PermissionsAndroid } from 'react-native'
import { Toast } from '../../utils/Toast';
import ErrorScreen from '../../components/SplashScreens/ErrorScreen'

export async function requestLocationPermission() {
  try {
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
    } else {
      <ErrorScreen error="Location permission denied" />
      return
    }
  } catch (err) {
    console.warn(err)
  }
}