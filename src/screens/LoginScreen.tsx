import React from 'react'
import AuthLayout from '../layouts/AuthLayout'
import tw from '../styles/tailwind'
import { BackHandler, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useNavigate } from '../config/RootNavigation'
import { useBackHandler } from '../helpers/hooks/useBackHandler'
import { loginStore } from '../helpers/zustand/store'

const LoginScreen = (): JSX.Element => {

  const { email, password, setEmail, setPassword, setDefault } = loginStore()

  const handleLogin = async () => {
    console.log('formData', {
      email,
      password
    })
    setDefault()
  }

  // nig back sa app, since gikan sija sa login screen dapat ma close na ang app
  useBackHandler(() => {
    setDefault()
    BackHandler.exitApp()
  })

  return (
    <AuthLayout>
      <View style={tw`flex-col w-full`}>
        <View style={tw`flex-col w-full my-2`}>
          <TextInput
            style={tw`font-poppins text-sm text-olive border-b border-olive`}
            placeholder="Email"
            value={email}
            onChangeText={(value: string) => setEmail(value)}
          />
        </View>
        <View style={tw`flex-col w-full my-2`}>
          <TextInput
            style={tw`font-poppins text-sm text-olive border-b border-olive`}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(value: string) => setPassword(value)}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={tw`flex-row items-center justify-center w-full my-2 px-2 py-3 rounded-full bg-olive-dark`}
          onPress={handleLogin}
        >
          <Text style={tw`font-poppins text-sm text-white`}>Log in</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex-col items-center w-full my-3`}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => console.log('Forgot Password')}
        >
          <Text style={tw`font-poppins text-xs text-olive`}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={tw`flex-row items-center justify-center w-full my-5 px-2 py-3 rounded-full bg-olive`}
          onPress={() => useNavigate('CreateAccountScreen')}
        >
          <Text style={tw`font-poppins text-sm text-white`}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  )
}

export default LoginScreen