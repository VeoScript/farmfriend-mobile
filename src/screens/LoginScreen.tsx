import React from 'react'
import AuthLayout from '../layouts/AuthLayout'
import tw from '../styles/tailwind'
import { Toast } from '../utils/Toast'
import { BackHandler, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useNavigate } from '../config/RootNavigation'
import { useBackHandler } from '../helpers/hooks/useBackHandler'
import { loginStore } from '../helpers/zustand/store'
import { useLoginMutation } from '../helpers/tanstack/mutations/auth'

const LoginScreen = (): JSX.Element => {

  const {
    isLoading,
    email,
    password,
    email_error,
    password_error,
    setEmail,
    setPassword,
    setEmailError,
    setPasswordError,
    setIsLoading,
    setDefault
  } = loginStore()

  const loginMutation = useLoginMutation()

  const handleLogin = async () => {
    if (email === '') return setEmailError('Email is required')
    if (password === '') return setPasswordError('Password is required')

    setIsLoading(true)

    await loginMutation.mutateAsync({
      email,
      password
    },
    {
      onError: (error: any) => {
        Toast(`${error.response?.data?.message}`)
        setIsLoading(false)
      },
      onSuccess: () => {
        setDefault()
      }
    })
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
            onChangeText={(value: string) => {
              setEmail(value)
              setEmailError('')
            }}
          />
          {email_error && (<Text style={tw`mt-1 font-poppins-light text-xs text-red-600`}>{email_error}</Text>)}
        </View>
        <View style={tw`flex-col w-full my-2`}>
          <TextInput
            style={tw`font-poppins text-sm text-olive border-b border-olive`}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(value: string) => {
              setPassword(value)
              setPasswordError('')
            }}
          />
          {password_error && (<Text style={tw`mt-1 font-poppins-light text-xs text-red-600`}>{password_error}</Text>)}
        </View>
        <TouchableOpacity
          disabled={isLoading}
          activeOpacity={0.7}
          style={tw`flex-row items-center justify-center w-full my-2 px-2 py-3 rounded-full bg-olive-dark ${isLoading ? 'opacity-50' : 'opacity-100'}`}
          onPress={handleLogin}
        >
          <Text style={tw`font-poppins text-sm text-white`}>{ isLoading ? 'Loading...' : 'Log in' }</Text>
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
          onPress={() => {
            setDefault()
            useNavigate('CreateAccountScreen')
          }}
        >
          <Text style={tw`font-poppins text-sm text-white`}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  )
}

export default LoginScreen