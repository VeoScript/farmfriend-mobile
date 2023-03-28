import React from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Dropdown from '../components/Dropdown'
import tw from '../styles/tailwind'
import { Toast } from '../utils/Toast'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useGoBack, useNavigate } from '../config/RootNavigation'
import { useBackHandler } from '../helpers/hooks/useBackHandler'
import { createAccountStore } from '../helpers/zustand/store'
import { useCreateAccountMutation } from '../helpers/tanstack/mutations/create-account'

const CreateAccountScreen = (): JSX.Element => {

  const {
    isLoading,

    account_type,
    first_name,
    last_name,
    address,
    contact_num,
    email,
    password,
    repassword,

    account_type_error,
    first_name_error,
    last_name_error,
    address_error,
    contact_num_error,
    email_error,
    password_error,
    repassword_error,

    setAccountType,
    setFirstName,
    setLastName,
    setAddress,
    setContactNum,
    setEmail,
    setPassword,
    setRePassword,

    setAccountTypeError,
    setFirstNameError,
    setLastNameError,
    setAddressError,
    setContactNumError,
    setEmailError,
    setPasswordError,
    setRePasswordError,
    
    setIsLoading,
    setDefault,
  } = createAccountStore()

  const createAccountMutation = useCreateAccountMutation()

  const clearAll = () => {
    setDefault()
    useGoBack()
  }

  const accountTypes = [
    {
      name: 'Administrator',
      slug: 'ADMIN'
    },
    {
      name: 'Farmer',
      slug: 'FARMERS'
    },
    {
      name: 'LGU/NGO',
      slug: 'LGU_NGO'
    },
  ]

  const handleCreateAccount = async () => {
    if (account_type === '') return setAccountTypeError('Account type is required')
    if (first_name === '') return setFirstNameError('First name is required')
    if (last_name === '') return setLastNameError('Last name is required')
    if (address === '') return setAddressError('Address is required')
    if (contact_num === '') return setContactNumError('Contact number is required')
    if (email === '') return setEmailError('Email is required')
    if (password === '') return setPasswordError('Password is required')
    if (repassword === '') return setRePasswordError('Re-enter password is required')

    if (password !== repassword) return setRePasswordError('Password not match')

    setIsLoading(true)

    await createAccountMutation.mutateAsync({
      account_type,
      first_name,
      last_name,
      address,
      contact_num,
      email,
      password,
    },
    {
      onError: (error: any) => {
        Toast(`${error.response?.data?.message}`)
        setIsLoading(false)
      },
      onSuccess: () => {
        Toast('Account created successfully')
        clearAll()
      }
    })
  }

  // nig back sa app, ma clear ang states sa tanang inputs
  useBackHandler(clearAll)

  return (
    <AuthLayout>
      <View style={tw`flex-col w-full`}>
        <View style={tw`flex-col w-full my-2`}>
          <Dropdown
            defaultButtonText={'Account Type'}
            defaultValue={account_type}
            data={accountTypes}
            onSelect={(selectedItem: { slug: string }) => {
              setAccountType(selectedItem.slug)
              setAccountTypeError('')
            }}
            buttonTextAfterSelection={(selectedItem: { name: string }) => {
              return selectedItem.name
            }}
            rowTextForSelection={(item: { name: string }) => {
              return item.name
            }}
            disabled={false}
          />
          {account_type_error && (<Text style={tw`mt-1 font-poppins-light text-xs text-red-600`}>{account_type_error}</Text>)}
        </View>
        <View style={tw`flex-col w-full my-2`}>
          <TextInput
            style={tw`font-poppins text-sm text-olive border-b border-olive`}
            placeholder="First name"
            value={first_name}
            onChangeText={(value: string) => {
              setFirstName(value)
              setFirstNameError('')
            }}
          />
          {first_name_error && (<Text style={tw`mt-1 font-poppins-light text-xs text-red-600`}>{first_name_error}</Text>)}
        </View>
        <View style={tw`flex-col w-full my-2`}>
          <TextInput
            style={tw`font-poppins text-sm text-olive border-b border-olive`}
            placeholder="Last name"
            value={last_name}
            onChangeText={(value: string) => {
              setLastName(value)
              setLastNameError('')
            }}
          />
          {last_name_error && (<Text style={tw`mt-1 font-poppins-light text-xs text-red-600`}>{last_name_error}</Text>)}
        </View>
        <View style={tw`flex-col w-full my-2`}>
          <TextInput
            style={tw`font-poppins text-sm text-olive border-b border-olive`}
            placeholder="Address"
            multiline
            value={address}
            onChangeText={(value: string) => {
              setAddress(value)
              setAddressError('')
            }}
          />
          {address_error && (<Text style={tw`mt-1 font-poppins-light text-xs text-red-600`}>{address_error}</Text>)}
        </View>
        <View style={tw`flex-col w-full my-2`}>
          <TextInput
            style={tw`font-poppins text-sm text-olive border-b border-olive`}
            placeholder="Contact no."
            value={contact_num}
            onChangeText={(value: string) => {
              setContactNum(value)
              setContactNumError('')
            }}
          />
          {contact_num_error && (<Text style={tw`mt-1 font-poppins-light text-xs text-red-600`}>{contact_num_error}</Text>)}
        </View>
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
        <View style={tw`flex-col w-full my-2`}>
          <TextInput
            style={tw`font-poppins text-sm text-olive border-b border-olive`}
            placeholder="Re-enter password"
            secureTextEntry={true}
            value={repassword}
            onChangeText={(value: string) => {
              setRePassword(value)
              setRePasswordError('')
            }}
          />
          {repassword_error && (<Text style={tw`mt-1 font-poppins-light text-xs text-red-600`}>{repassword_error}</Text>)}
        </View>
        <TouchableOpacity
          disabled={isLoading}
          activeOpacity={0.7}
          style={tw`flex-row items-center justify-center w-full my-2 px-2 py-3 rounded-full bg-olive-dark ${isLoading ? 'opacity-50' : 'opacity-100'}`}
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