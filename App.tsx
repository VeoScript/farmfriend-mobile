import React from 'react'

import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { navigationRef } from './src/config/RootNavigation'

import HomeScreen from './src/screens/HomeScreen'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        animated={false}
        backgroundColor="#F3FADB"
        barStyle="dark-content"
      />
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App