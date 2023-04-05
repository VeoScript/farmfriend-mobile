import React from 'react'
import tw from '../../styles/tailwind'
import { FeatherIcon, OcticonIcon } from '../../utils/Icons'
import { Modal, Pressable, View, Text, TouchableOpacity, Image } from 'react-native'

interface IProps {
  image: string
  name: string
  address: string
  contact_num: string
  modalVisible: boolean
  setModalVisible: (value: boolean) => void
}

type UserDetailsModalProps = (props: IProps) => JSX.Element

const UserDetailsModal: UserDetailsModalProps = ({ image, name, address, contact_num, modalVisible, setModalVisible }) => {
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
            <Text style={tw`font-poppins-bold text-sm text-olive`}>User Details</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setModalVisible(false)}
            >
              <OcticonIcon size={18} name="x" color="#333333" />
            </TouchableOpacity>
          </View>
          <View style={tw`flex-col items-center w-full px-3 pb-3`}>
            {image
              ? <Image
                  style={tw`rounded-full w-[10rem] h-[10rem] bg-olive`}
                  resizeMode="cover"
                  source={{ uri: image }}
                />
              : <View style={tw`flex-row items-center justify-center w-[10rem] h-[10rem] p-2 overflow-hidden rounded-full bg-olive`}>
                  <FeatherIcon
                    name="user"
                    size={90}
                    color="#8EB6AD"
                  />
                </View>
            }
            <View style={tw`flex-col items-center w-full mt-3`}>
              <Text style={tw`my-0.5 font-poppins-bold text-base text-olive-dark`}>{ name }</Text>
              <Text style={tw`my-0.5 font-poppins text-sm text-olive`}>{ address }</Text>
              <Text style={tw`my-0.5 font-poppins text-sm text-olive`}>{ contact_num }</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default UserDetailsModal