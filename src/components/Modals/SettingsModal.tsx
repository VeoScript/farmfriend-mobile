import React from 'react'
import tw from '../../styles/tailwind'
import { OcticonIcon } from '../../utils/Icons'
import { Modal, Pressable, View, Text, TouchableOpacity } from 'react-native'
import { useNavigate } from '../../config/RootNavigation'
import { settingsLinks } from '../../config/Paths'
import { useGetUserAccount } from '../../helpers/hooks/useGetUserAccount'
import { useGetUnreadNotifications } from '../../helpers/tanstack/queries/notifications'

interface IProps {
  modalVisible: boolean
  setModalVisible: (value: boolean) => void
}

type SettingsProps = (props: IProps) => JSX.Element

const SettingsModal: SettingsProps = ({ modalVisible, setModalVisible }) => {

  const account: any = useGetUserAccount()

  const { data: unread, isLoading } = useGetUnreadNotifications(account.account_type)

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
            <Text style={tw`font-poppins-bold text-sm text-olive`}>Settings</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setModalVisible(false)}
            >
              <OcticonIcon size={18} name="x" color="#333333" />
            </TouchableOpacity>
          </View>
          {settingsLinks.map((setting: { access: any[], name: string, icon: string, route: string }, i: number) => (
            <React.Fragment key={i}>
              {setting.access.some((settingAccess: string) => settingAccess === account?.account_type) && (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={tw`relative flex-row items-center justify-start w-full border-t border-olive-semi-light p-3`}
                  onPress={() => {
                    setModalVisible(false)
                    useNavigate(setting.route)
                  }}
                >
                  <OcticonIcon size={20} name={setting.icon} color="#333333" />
                  <Text style={tw`ml-2 font-poppins text-sm text-olive`}>{ setting.name }</Text>
                  {(setting.name === 'Notifications' && !isLoading && unread !== 0) && (
                    <View style={tw`absolute right-3 flex-row items-center justify-center w-5 h-5 rounded-full bg-yellow-600`}>
                      <Text style={tw`font-poppins text-xs text-white`}>{ unread }</Text>
                    </View>
                  )}
                </TouchableOpacity>
              )}
            </React.Fragment>
          ))}
        </View>
      </View>
    </Modal>
  )
}

export default SettingsModal