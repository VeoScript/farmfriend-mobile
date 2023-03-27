import React from 'react'
import tw from '../styles/tailwind'
import { OcticonIcon } from '../utils/Icons'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigate } from '../config/RootNavigation'

interface IProps {
  title: string
}

type TopBarProps = (props: IProps) => JSX.Element

const TopBar: TopBarProps = ({ title }) => {
  return (
    <View style={tw`flex-row items-center justify-between w-full px-4 py-5 border-b border-olive-semi-light`}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => console.log('Show Settings')}
      >
        <OcticonIcon size={25} name="gear" color="#333333" />
      </TouchableOpacity>
      <Text style={tw`font-poppins-bold text-base text-olive-dark`}>{ title }</Text>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => useNavigate('LoginScreen')}
      >
        <OcticonIcon size={25} name="sign-out" color="#333333" />
      </TouchableOpacity>
    </View>
  )
}

export default TopBar