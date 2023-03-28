import React from 'react'
import SettingsModal from './Modals/SettingsModal'
import tw from '../styles/tailwind'
import { OcticonIcon } from '../utils/Icons'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { useLogoutMutation } from '../helpers/tanstack/mutations/auth'
import { editAccountStore } from '../helpers/zustand/store'

interface IProps {
  title: string
}

type TopBarProps = (props: IProps) => JSX.Element

const TopBar: TopBarProps = ({ title }) => {

  const { setDefaultAccountInfo, setDefaultChangePassword } = editAccountStore()

  const [settingsModalVisible, setSettingsModalVisible] = React.useState<boolean>(false)

  const logoutMutation = useLogoutMutation()

  const handleLogout = async () => {
    setDefaultAccountInfo()
    setDefaultChangePassword()
    await logoutMutation.mutateAsync()
  }

  return (
    <>
      <View style={tw`flex-row items-center justify-between w-full px-4 py-5 border-b border-olive-semi-light`}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setSettingsModalVisible(true)}
        >
          <OcticonIcon size={25} name="gear" color="#333333" />
        </TouchableOpacity>
        <Text style={tw`font-poppins-bold text-base text-olive-dark`}>{ title }</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            Alert.alert(
              '',
              'Are you sure you want to logout?',
              [
                {
                  text: 'No',
                  style: "cancel"
                },
                {
                  text: 'Yes',
                  style: "default",
                  onPress: handleLogout
                }
              ],
              {
                cancelable: true
              }
            )
          }}
        >
          <OcticonIcon size={25} name="sign-out" color="#333333" />
        </TouchableOpacity>
      </View>
      <SettingsModal
        modalVisible={settingsModalVisible}
        setModalVisible={setSettingsModalVisible}
      />
    </>
  )
}

export default TopBar