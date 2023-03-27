import React from 'react'

import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { navigationRef } from './src/config/RootNavigation'

import * as screen from './src/shared/screens'

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
        <Stack.Screen name="LoginScreen" component={screen.LoginScreen} />
        <Stack.Screen name="CreateAccountScreen" component={screen.CreateAccountScreen} />
        <Stack.Screen name="HomeScreen" component={screen.HomeScreen} />
        <Stack.Screen name="CheckWeatherScreen" component={screen.CheckWeatherScreen} />
        <Stack.Screen name="SuggestedCropsToPlantScreen" component={screen.SuggestedCropsToPlantScreen} />
        <Stack.Screen name="SearchProgramsScreen" component={screen.SearchProgramsScreen} />
        <Stack.Screen name="AddProgramsScreen" component={screen.AddProgramsScreen} />
        <Stack.Screen name="UserFarmersScreen" component={screen.UserFarmersScreen} />
        <Stack.Screen name="UserLguNgoScreen" component={screen.UserLguNgoScreen} />
        <Stack.Screen name="NotificationsScreen" component={screen.NotificationsScreen} />
        <Stack.Screen name="ViewRatesScreen" component={screen.ViewRatesScreen} />
        <Stack.Screen name="ViewReportsScreen" component={screen.ViewReportsScreen} />
        <Stack.Screen name="EditAccountScreen" component={screen.EditAccountScreen} />
        <Stack.Screen name="RateAppScreen" component={screen.RateAppScreen} />
        <Stack.Screen name="ReportHereScreen" component={screen.ReportHereScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App