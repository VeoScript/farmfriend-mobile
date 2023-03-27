import React from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Dropdown from '../components/Dropdown'
import tw from '../styles/tailwind'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useGoBack, useNavigate } from '../config/RootNavigation'
import { useBackHandler } from '../helpers/hooks/useBackHandler'
import { createAccountStore } from '../helpers/zustand/store'

const CreateAccountScreen = (): JSX.Element => {

  const {
    accountType,
    firstName,
    lastName,
    address,
    mobileNo,
    email,
    password,
    repassword,

    setAccountType,
    setFirstName,
    setLastName,
    setAddress,
    setMobileNo,
    setEmail,
    setPassword,
    setRePassword,
    
    setDefault,
  } = createAccountStore()

  const clearAll = () => {
    setDefault()
    useGoBack()
  }

  const handleCreateAccount = async () => {
    console.log('formData', {
      accountType,
      firstName,
      lastName,
      address,
      mobileNo,
      email,
      password,
      repassword,
    })
    clearAll()
  }

  // nig back sa app, ma clear ang states sa tanang inputs
  useBackHandler(clearAll)

  return (
    <AuthLayout>
      <View style={tw`flex-col w-full`}>
        <View style={tw`flex-col w-full my-2`}>
          <Dropdown
            defaultButtonText={'Account Type'}
            defaultValue={accountType}
            data={['Administrator', 'Farmer', 'LGU/NGO']}
            onSelect={(selectedItem: string) => {
              setAccountType(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem: string) => {
              return selectedItem
            }}
            rowTextForSelection={(item: string) => {
              return item
            }}
            disabled={false}
          />
        </View>
        <View style={tw`flex-col w-full my-2`}>
          <TextInput
            style={tw`font-poppins text-sm text-olive border-b border-olive`}
            placeholder="First name"
            value={firstName}
            onChangeText={(value: string) => setFirstName(value)}
          />
        </View>
        <View style={tw`flex-col w-full my-2`}>
          <TextInput
            style={tw`font-poppins text-sm text-olive border-b border-olive`}
            placeholder="Last name"
            value={lastName}
            onChangeText={(value: string) => setLastName(value)}
          />
        </View>
        <View style={tw`flex-col w-full my-2`}>
          <TextInput
            style={tw`font-poppins text-sm text-olive border-b border-olive`}
            placeholder="Address"
            multiline
            value={address}
            onChangeText={(value: string) => setAddress(value)}
          />
        </View>
        <View style={tw`flex-col w-full my-2`}>
          <TextInput
            style={tw`font-poppins text-sm text-olive border-b border-olive`}
            placeholder="Mobile no."
            value={mobileNo}
            onChangeText={(value: string) => setMobileNo(value)}
          />
        </View>
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
        <View style={tw`flex-col w-full my-2`}>
          <TextInput
            style={tw`font-poppins text-sm text-olive border-b border-olive`}
            placeholder="Re-enter password"
            secureTextEntry={true}
            value={repassword}
            onChangeText={(value: string) => setRePassword(value)}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={tw`flex-row items-center justify-center w-full my-2 px-2 py-3 rounded-full bg-olive-dark`}
          onPress={handleCreateAccount}
        >
          <Text style={tw`font-poppins text-sm text-white`}>Create</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex-col items-center w-full my-3`}>
        <Text style={tw`font-poppins text-xs text-olive`}>Already have an account?</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={tw`flex-row items-center justify-center w-full my-5 px-2 py-3 rounded-full bg-olive`}
          onPress={() => {
            setDefault()
            useNavigate('LoginScreen')
          }}
        >
          <Text style={tw`font-poppins text-sm text-white`}>Log in</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  )
}

export default CreateAccountScreen