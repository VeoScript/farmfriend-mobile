import React from 'react'
import tw from '../../styles/tailwind'
import { FeatherIcon, OcticonIcon } from '../../utils/Icons'
import { Modal, Pressable, View, Text, TouchableOpacity, Image } from 'react-native'
import { useNavigate } from '../../config/RootNavigation'

interface IProps {
  id: string
  image: string
  name: string
  description: string
  temperature: string
  modalVisible: boolean
  setModalVisible: (value: boolean) => void
}

type CropsModalProps = (props: IProps) => JSX.Element

const CropsModal: CropsModalProps = ({ id, image, name, description, temperature, modalVisible, setModalVisible }) => {
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
      <View style={tw`absolute top-5 w-full px-5`}>
        <View style={tw`flex-col w-full rounded-xl overflow-hidden bg-olive-light`}>
          <View style={tw`flex-row items-center justify-between w-full p-3`}>
            <Text style={tw`font-poppins-bold text-sm text-olive`}>Crop Details</Text>
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
                  style={tw`rounded-xl w-[10rem] h-[10rem] bg-olive bg-opacity-50`}
                  resizeMode="cover"
                  source={{ uri: image }}
                />
              : <View style={tw`flex-row items-center justify-center w-[10rem] h-[10rem] p-2 overflow-hidden rounded-full bg-olive bg-opacity-50`}>
                  <FeatherIcon
                    name="user"
                    size={90}
                    color="#8EB6AD"
                  />
                </View>
            }
            <View style={tw`flex-col items-center w-full mt-3`}>
              <Text style={tw`my-0.5 font-poppins-bold text-base text-olive-dark`}>{ name }</Text>
              <Text style={tw`my-0.5 font-poppins text-xs text-olive`}>Required Temperature - <Text style={tw`font-poppins-bold text-sm`}>{ temperature }°</Text></Text>
              <Text style={tw`my-0.5 font-poppins text-sm text-olive`}>{ description }</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={tw`flex-row items-center justify-center w-full my-1 px-2 py-3 rounded-full bg-olive-semi-light`}
              onPress={() => {
                setModalVisible(false)
                useNavigate('EditCropsScreen', {
                  cropId: id,
                  cropPhoto: image,
                  cropName: name,
                  cropDescription: description,
                  cropTemperature: temperature
                })
              }}
            >
              <Text style={tw`font-poppins text-sm text-white`}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default CropsModal