/**
 * @format
 */

import {AppRegistry, Text, TextInput} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { DEV, API_URL_DEVELOPMENT, API_URL_PRODUCTION } from '@env'
import io from 'socket.io-client'
import notifee, { AndroidImportance } from '@notifee/react-native'

if (Text.defaultProps == null) {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
  TextInput.defaultProps.autoComplete = "off";
}

const socket = io(`${ DEV === 'yes' ? API_URL_DEVELOPMENT : API_URL_PRODUCTION }`)

socket.on('connect', () => {
  console.log('Connected to socket.io server')
})

socket.on('new_notification', async (data) => {
  console.log('Received new notification:', data)

  // Request permissions (required for iOS)
  await notifee.requestPermission()

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: data.id,
    name: 'FarmFriend Push Notification',
    importance: AndroidImportance.HIGH,
  })

  if (data.notification_to !== data.account_type) {
    // Display a notification
    await notifee.displayNotification({
      title: data.title,
      body: data.message,
      android: {
        smallIcon: 'ic_launcher', 
        channelId,
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        }
      },
    })
  }
})

AppRegistry.registerComponent(appName, () => App);
