import React from 'react'
import tw from '../../styles/tailwind'
import { OcticonIcon } from '../../utils/Icons'
import { Modal, Pressable, View, Text, TouchableOpacity } from 'react-native'
import { useNavigate } from '../../config/RootNavigation'
import { settingsLinks } from '../../config/Paths'

interface IProps {
  modalVisible: boolean
  setModalVisible: (value: boolean) => void
}

type SettingsProps = (props: IProps) => JSX.Element

const SettingsModal: SettingsProps = ({ modalVisible, setModalVisible }) => {
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
        style={tw`absolute inset-0 w-full h-full bg-black bg-opacity-30`}
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
          {settingsLinks.map((setting: { name: string, icon: string, route: string }, i: number) => (
            <TouchableOpacity
              key={i}
              activeOpacity={0.5}
              style={tw`flex-row items-center justify-start w-full border-t border-olive-semi-light p-3`}
              onPress={() => useNavigate(setting.route)}
            >
              <OcticonIcon size={20} name={setting.icon} color="#333333" />
              <Text style={tw`ml-2 font-poppins text-sm text-olive`}>{ setting.name }</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  )
}

export default SettingsModal