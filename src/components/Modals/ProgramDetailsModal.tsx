import React from 'react'
import tw from '../../styles/tailwind'
import { OcticonIcon } from '../../utils/Icons'
import { Modal, Pressable, View, Text, TouchableOpacity } from 'react-native'

interface IProps {
  title: string
  description: string
  modalVisible: boolean
  setModalVisible: (value: boolean) => void
}

type SettingsProps = (props: IProps) => JSX.Element

const ProgramDetailsModal: SettingsProps = ({ title, description, modalVisible, setModalVisible }) => {
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
            <Text style={tw`font-poppins-bold text-sm text-olive`}>Program Details</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setModalVisible(false)}
            >
              <OcticonIcon size={18} name="x" color="#333333" />
            </TouchableOpacity>
          </View>
          <View style={tw`flex-col w-full px-3 pb-3`}>
            <Text style={tw`my-0.5 font-poppins-bold text-sm text-olive-dark`}>{ title }</Text>
            <Text style={tw`my-0.5 font-poppins text-xs text-olive`}>{ description }</Text>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ProgramDetailsModal