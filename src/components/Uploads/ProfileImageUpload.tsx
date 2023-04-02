import React from 'react'
import tw from '../../styles/tailwind'
import { Modal, View, Text, Image, Pressable, TouchableOpacity } from 'react-native'
import { useChangeProfileMutation } from '../../helpers/tanstack/mutations/user'
import { IMGBB_API_SECRET } from '@env'

interface IProps {
  userId: string
  modalVisible: any
  setModalVisible: any
  photo: any
  setPhoto: any
}

type ProfileImageUploadProps = (props: IProps) => JSX.Element

const ProfileImageUpload: ProfileImageUploadProps = ({ userId, photo, setPhoto, modalVisible, setModalVisible }) => {

  const changeProfile = useChangeProfileMutation()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  
  const closeModal = () => {
    setPhoto(null)
    setIsLoading(false)
    setModalVisible(false)
  }

  const onUploadProfilePhoto = async () => {
    try {
      setIsLoading(true)

      const image: any = photo[0]
      const data = new FormData()
      
      data.append('image', {
        uri: image.uri,
        name: image.fileName,
        type: image.type,
        size: image.fileSize
      })

      await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_SECRET}`, {
        method: 'POST',
        body: data
      })
      .then((response) => response.json())
      .then(async (result) => {
        await changeProfile.mutateAsync({
          id: userId,
          imageURL: String(result.data.url)
        },
        {
          onError: (error) => {
            setIsLoading(false)
            console.error(error)
          },
          onSuccess: () => {
            closeModal()
          }
        })
      })
      .catch((error) => {
        console.error(error)
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      visible={modalVisible}
      onRequestClose={closeModal}      
    >
      <Pressable
        style={tw`absolute inset-0 w-full h-full bg-black bg-opacity-30`}
        disabled={isLoading}
        onPress={() => {
          if (!isLoading) {
            setModalVisible(false)
          }
        }}
      />
      <View style={tw`absolute top-1/2 -mt-[10rem] w-full px-5`}>
        <View style={tw`flex-col items-center justify-center w-full p-5 rounded-xl overflow-hidden bg-olive-light`}>
          <Text style={tw`font-poppins-bold text-base text-center text-olive-dark`}>Change Profile</Text>
          {photo && (
            <Image
              style={tw`flex rounded-full my-3 w-[10rem] h-[10rem]`}
              resizeMode="cover"
              source={{
                uri: `${ photo[0].uri }`
              }}
            />
          )}
          <Text style={tw`font-poppins-light text-xs text-center text-olive`}>This will be the actual size of your profile.</Text>
          <View style={tw`flex-row items-center justify-center w-full mt-3`}>
            {isLoading && (
              <View style={tw`w-full`}>
                <Text style={tw`font-poppins w-full mx-0.5 text-sm text-center text-white bg-olive opacity-50 px-3 py-2 rounded-xl`}>Uploading...</Text>
              </View>
            )}
            {!isLoading && (
              <React.Fragment>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={onUploadProfilePhoto}
                >
                  <Text style={tw`w-[7rem] mx-0.5 font-poppins text-sm text-center text-white bg-olive px-3 py-2 rounded-xl`}>Upload</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={closeModal}
                >
                  <Text style={tw`w-[7rem] mx-0.5 font-poppins text-sm text-center text-neutral-600 bg-neutral-200 px-3 py-2 rounded-xl`}>Cancel</Text>
                </TouchableOpacity>
              </React.Fragment>
            )}
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ProfileImageUpload