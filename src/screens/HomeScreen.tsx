import React from 'react'
import MainLayout from '../layouts/MainLayout'
import LoadingScreen from '../components/SplashScreens/LoadingScreen'
import ProfileImageUpload from '../components/Uploads/ProfileImageUpload'
import tw from '../styles/tailwind'
import { FeatherIcon } from '../utils/Icons'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { useNavigate } from '../config/RootNavigation'
import { links } from '../config/Paths'
import { useGetAccount } from '../helpers/tanstack/queries/account'

const HomeScreen = (): JSX.Element => {

  const { data: account, isLoading: isLoadingAccount } = useGetAccount()

  // getting the selected photo for upload
  const [photo, setPhoto] = React.useState<any>(null)
  const [isPhotoModal, setIsPhotoModal] = React.useState<boolean>(false)

  const handleChoosePhoto = () => {
    let options: any = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false
    }

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        setPhoto(null)
        setIsPhotoModal(false)
        return
      }
      if (response) {
        setPhoto(response.assets)
        setIsPhotoModal(true)
      }
    })
  }

  if (isLoadingAccount) return <LoadingScreen />

  return (
    <MainLayout title="Profile">
      <View style={tw`flex-1 flex-col w-full p-3`}>
        <View style={tw`flex-col items-center w-full p-3`}>
          <View style={tw`relative my-1`}>
            {account?.image
              ? <Image
                  style={tw`rounded-full w-[10rem] h-[10rem] bg-olive bg-opacity-50`}
                  resizeMode="cover"
                  source={{ uri: account.image }}
                />
              : <View style={tw`relative flex-row items-center justify-center w-[10rem] h-[10rem] p-2 overflow-hidden rounded-full bg-olive bg-opacity-50`}>
                  <FeatherIcon
                    name="user"
                    size={90}
                    color="#8EB6AD"
                  />
                </View>
            }
            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`absolute bottom-2 right-2 z-10 rounded-full p-2 bg-white bg-opacity-50`}
              onPress={handleChoosePhoto}
            >
              <FeatherIcon size={15} name="camera" color="#333333" />
            </TouchableOpacity>
          </View>
          <View style={tw`flex-col items-center w-full my-1`}>
            <Text style={tw`font-poppins-bold text-xl text-olive-dark uppercase`}>{ account.first_name + ' ' + account.last_name }</Text>
            <Text style={tw`font-poppins-bold text-base text-olive`}>{ account.account_type?.replace(/_/g, "/") }</Text>
            <Text style={tw`font-poppins text-sm text-olive`}>{ account.address }</Text>
            <Text style={tw`font-poppins text-sm text-olive`}>{ account.contact_num }</Text>
          </View>
        </View>
        <View style={tw`flex-col items-center justify-center w-full`}>
          <View style={tw`flex-row flex-wrap w-[18rem] my-2`}>
            {links.map((module: { access: any[], name: string, icon: string, route: string }, i: number) => (
              <React.Fragment key={i}>
                {(module.access.some((screenAccess: string) => screenAccess === account.account_type)) && (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={tw`flex-col items-center justify-center w-[8rem] h-[8rem] m-2 p-5 rounded-xl shadow-md border border-olive-semi-light bg-olive-light`}
                    onPress={() => useNavigate(module.route)}
                  >
                    <FeatherIcon size={50} name={module.icon} color="#425951" />
                    <Text style={tw`mt-1 font-poppins text-xs text-center text-olive`}>{ module.name }</Text>
                  </TouchableOpacity>
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      </View>
      <ProfileImageUpload
        userId={account.id}
        modalVisible={isPhotoModal}
        setModalVisible={setIsPhotoModal}
        photo={photo}
        setPhoto={setPhoto}
      />
    </MainLayout>
  )
}

export default HomeScreen