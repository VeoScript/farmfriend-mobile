import React from 'react'
import tw from '../../styles/tailwind'
import { OcticonIcon } from '../../utils/Icons'
import { Modal, Pressable, View, Text, TouchableOpacity, TextInput } from 'react-native'
import { useDeleteAccountMutation } from '../../helpers/tanstack/mutations/user'

interface IProps {
  accountId: string
  modalVisible: boolean
  setModalVisible: (value: boolean) => void
}

type DeleteAccountModalProps = (props: IProps) => JSX.Element

const DeleteAccountModal: DeleteAccountModalProps = ({ accountId, modalVisible, setModalVisible }) => {

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [userPassword, setUserPassword] = React.useState<string>('')
  const [userPasswordError, setUserPasswordError] = React.useState<string>('')

  const deleteAccountMutation = useDeleteAccountMutation()

  const handleDeleteAccount = async () => {
    if (userPassword === '') return setUserPasswordError('Password is required')

    setIsLoading(true)

    await deleteAccountMutation.mutateAsync({
      userId: accountId,
      user_password: userPassword
    },
    {
      onError: (error: any) => {
        setUserPasswordError(`${error.response?.data?.message}`)
        setIsLoading(false)
      },
      onSuccess: () => {
        setIsLoading(false)
        setUserPassword('')
        setUserPasswordError('')
      }
    })
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false)
      }}      
    >
      <Pressable
        style={tw`absolute inset-0 w-full h-full bg-black bg-opacity-50`}
        disabled={false}
        onPress={() => {
          setModalVisible(false)
        }}
      />
      <View style={tw`absolute top-1/2 -mt-[10rem] w-full px-5`}>
        <View style={tw`flex-col w-full rounded-xl overflow-hidden bg-olive-light`}>
          <View style={tw`flex-row items-center justify-between w-full p-3`}>
            <Text style={tw`font-poppins-bold text-sm text-olive`}>Delete Account</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setModalVisible(false)}
            >
              <OcticonIcon size={18} name="x" color="#333333" />
            </TouchableOpacity>
          </View>
          <View style={tw`flex-col w-full px-3 pb-3`}>
            <Text style={tw`font-poppins text-xs text-olive`}>Are you sure you want to permanently delete your account? This cannot be undone.</Text>
            <View style={tw`flex-col w-full my-2`}>
              <TextInput
                style={tw`font-poppins text-sm text-olive border-b border-olive`}
                placeholder="Enter your password"
                secureTextEntry={true}
                value={userPassword}
                onChangeText={(value: string) => {
                  setUserPassword(value)
                  setUserPasswordError('')
                }}
              />
              {userPasswordError && (<Text style={tw`mt-1 font-poppins-light text-xs text-red-600`}>{userPasswordError}</Text>)}
            </View>
            <TouchableOpacity
              disabled={isLoading}
              activeOpacity={0.7}
              style={tw`flex-row items-center justify-center w-full my-1 px-2 py-3 rounded-full bg-red-700 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
              onPress={handleDeleteAccount}
            >
              <Text style={tw`font-poppins text-sm text-white`}>{ isLoading ? 'Deleting...' : 'Delete Permanently' }</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default DeleteAccountModal