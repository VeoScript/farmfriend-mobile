import React from 'react'
import tw from '../styles/tailwind'
import { View, Text } from 'react-native'
import { useCheckKeyboard } from '../helpers/hooks/useCheckKeyboard'

const Copyright = () => {

  const checkKeyboard = useCheckKeyboard()

  return (
    <React.Fragment>
      {!checkKeyboard && (
        <View style={tw`absolute bottom-0 flex-col items-center justify-center w-full py-3`}>
          <Text style={tw`font-poppins text-[11px] text-olive`}>FarmFriend ©{new Date().getFullYear()}</Text>
        </View>
      )}
    </React.Fragment>
  )
}

export default Copyright