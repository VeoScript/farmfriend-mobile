import React from 'react'
import { Keyboard } from 'react-native'

export const useCheckKeyboard = () => {
  const [keyboardIsVisible, setKeyboardIsVisible] = React.useState<any>(null)

  // check if the keyboard is visible
  React.useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsVisible(true)
    })
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsVisible(false)
    })
    return () => {
      showListener.remove()
      hideListener.remove()
    }
  }, [])

  return keyboardIsVisible
}