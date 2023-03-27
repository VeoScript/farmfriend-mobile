import React from 'react'

import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { navigationRef } from './src/config/RootNavigation'

import LoginScreen from './src/screens/LoginScreen'
import CreateAccountScreen from './src/screens/CreateAccountScreen'
import HomeScreen from './src/screens/HomeScreen'

const Stack = createNativeStackNavigator()

const App = (): JSX.Element => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        animated={false}
        backgroundColor="#8EB6AD"
        barStyle="dark-content"
      />
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App