import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import DeleteAccountModal from '../../components/Modals/DeleteAccountModal'
import tw from '../../styles/tailwind'
import { Toast } from '../../utils/Toast'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useNavigate } from '../../config/RootNavigation'
import { useBackHandler } from '../../helpers/hooks/useBackHandler'
import { editAccountStore } from '../../helpers/zustand/store'
import { useGetUserAccount } from '../../helpers/hooks/useGetUserAccount'
import { useUpdateAccountInfoMutation, useChangePasswordMutation } from '../../helpers/tanstack/mutations/user'

const EditAccountScreen = () => {

  const account = useGetUserAccount()

  const [isDeleteAccountModal, setIsDeleteAccountModal] = React.useState<boolean>(false)

  const {
    isLoading,
    first_name,
    last_name,
    address,
    contact_num,
    email,
    old_password,
    new_password,
    repassword,

    first_name_error,
    last_name_error,
    address_error,
    contact_num_error,
    email_error,
    old_password_error,
    new_password_error,
    repassword_error,

    setFirstName,
    setLastName,
    setAddress,
    setContactNum,
    setEmail,
    setOldPassword,
    setNewPassword,
    setRePassword,

    setFirstNameError,
    setLastNameError,
    setAddressError,
    setContactNumError,
    setEmailError,
    setOldPasswordError,
    setNewPasswordError,
    setRePasswordError,

    setIsLoading,
    setDefaultAccountInfo,
    setDefaultChangePassword
  } = editAccountStore()

  React.useEffect(() => {
    setFirstName(account.first_name)
    setLastName(account.last_name)
    setAddress(account.address)
    setContactNum(account.contact_num)
    setEmail(account.email)
  }, [account])

  useBackHandler(() => {
    setDefaultAccountInfo()
    setDefaultChangePassword()
    useNavigate('HomeScreen')
  })

  const updateAccountInfoMutation = useUpdateAccountInfoMutation()
  const changePasswordMutation = useChangePasswordMutation()

  const handleUpdateAccountInfo = async () => {
    if (first_name === '') return setFirstNameError('First name is required')
    if (last_name === '') return setLastNameError('Last name is required')
    if (address === '') return setAddressError('Address is required')
    if (contact_num === '') return setContactNumError('Contact number is required')
    if (email === '') return setEmailError('Email is required')

    setIsLoading(true)

    await updateAccountInfoMutation.mutateAsync({
      userId: account.id,
      first_name,
      last_name,
      address,
      contact_num,
      email
    },
    {
      onError: (error: any) => {
        Toast(`${error.response?.data?.message}`)
        setIsLoading(false)
      },
      onSuccess: () => {
        Toast('Account created successfully')
        setIsLoading(false)
      }
    })
  }

  const handleChangePassword = async () => {
    if (old_password === '') return setOldPasswordError('Old password is required')
    if (new_password === '') return setNewPasswordError('New password is required')
    if (repassword === '') return setRePasswordError('Re-enter password is required')
    if (new_password !== repassword) return setRePasswordError('New password not match')

    setIsLoading(true)

    await changePasswordMutation.mutateAsync({
      userId: account.id,
      old_password,
      new_password
    },
    {
      onError: (error: any) => {
        Toast(`${error.response?.data?.message}`)
        setIsLoading(false)
      },
      onSuccess: () => {
        Toast('Password updated successfully')
        setIsLoading(false)
        setDefaultChangePassword()
      }
    })
  }

  return (
    <MainLayout title="Edit Account">
      <View style={tw`flex-col w-full my-2 px-5`}>
        <View style={tw`flex-col w-full my-2`}>
          <Text style={tw`font-poppins-bold text-xl`}>Account Information</Text>
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
          <TouchableOpacity
            disabled={isLoading}
            activeOpacity={0.7}
            style={tw`flex-row items-center justify-center w-full my-2 px-2 py-3 rounded-full bg-olive-dark ${isLoading ? 'opacity-50' : 'opacity-100'}`}
            onPress={handleUpdateAccountInfo}
          >
            <Text style={tw`font-poppins text-sm text-white`}>{ isLoading ? 'Updating...' : 'Update' }</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`flex-col w-full my-2`}>
          <Text style={tw`font-poppins-bold text-xl`}>Change Password</Text>
          <View style={tw`flex-col w-full my-2`}>
            <TextInput
              style={tw`font-poppins text-sm text-olive border-b border-olive`}
              placeholder="Old password"
              secureTextEntry={true}
              value={old_password}
              onChangeText={(value: string) => {
                setOldPassword(value)
                setOldPasswordError('')
              }}
            />
            {old_password_error && (<Text style={tw`mt-1 font-poppins-light text-xs text-red-600`}>{old_password_error}</Text>)}
          </View>
          <View style={tw`flex-col w-full my-2`}>
            <TextInput
              style={tw`font-poppins text-sm text-olive border-b border-olive`}
              placeholder="New password"
              secureTextEntry={true}
              value={new_password}
              onChangeText={(value: string) => {
                setNewPassword(value)
                setNewPasswordError('')
              }}
            />
            {new_password_error && (<Text style={tw`mt-1 font-poppins-light text-xs text-red-600`}>{new_password_error}</Text>)}
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
            style={tw`flex-row items-center justify-center w-full my-1 px-2 py-3 rounded-full bg-olive-dark ${isLoading ? 'opacity-50' : 'opacity-100'}`}
            onPress={handleChangePassword}
          >
            <Text style={tw`font-poppins text-sm text-white`}>{ isLoading ? 'Changing...' : 'Change' }</Text>
          </TouchableOpacity>
          {account.account_type !== 'ADMIN' && (
            <>
              <Text style={tw`my-2 font-poppins-light text-xs text-center text-black`}>This is danger area</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={tw`flex-row items-center justify-center w-full my-1 px-2 py-3 rounded-full bg-red-700`}
                onPress={() => setIsDeleteAccountModal(true)}
              >
                <Text style={tw`font-poppins text-sm text-white`}>Delete Account</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      <DeleteAccountModal
        accountId={account.id}
        modalVisible={isDeleteAccountModal}
        setModalVisible={setIsDeleteAccountModal}
      />
    </MainLayout>
  )
}

export default EditAccountScreen