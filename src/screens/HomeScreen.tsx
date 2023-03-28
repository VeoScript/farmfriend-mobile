import React from 'react'
import MainLayout from '../layouts/MainLayout'
import tw from '../styles/tailwind'
import { FeatherIcon } from '../utils/Icons'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigate } from '../config/RootNavigation'
import { links } from '../config/Paths'
import { useGetUserAccount } from '../helpers/hooks/useGetUserAccount'

const HomeScreen = (): JSX.Element => {

  const account = useGetUserAccount()

  return (
    <MainLayout title="Profile">
      <View style={tw`flex-1 flex-col w-full p-3`}>
        <View style={tw`flex-col items-center w-full p-3`}>
          <View style={tw`relative my-1`}>
            {account.image
              ? <Image
                  style={tw`rounded-full w-[10rem] h-[10rem] bg-olive-semi-light`}
                  resizeMode="cover"
                  source={require('../assets/images/aesthetics2.jpg')}
                />
              : <View style={tw`flex-row items-center justify-center w-[10rem] h-[10rem] p-2 overflow-hidden rounded-full bg-olive-semi-light`}>
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
              onPress={() => console.log('Change Profile Photo')}
            >
              <FeatherIcon size={15} name="camera" color="#333333" />
            </TouchableOpacity>
          </View>
          <View style={tw`flex-col items-center w-full my-1`}>
            <Text style={tw`font-poppins-bold text-xl text-olive-dark uppercase`}>{ account.first_name + ' ' + account.last_name }</Text>
            <Text style={tw`font-poppins text-base text-olive`}>{ account.account_type }</Text>
            <Text style={tw`font-poppins text-sm text-olive`}>{ account.address }</Text>
            <Text style={tw`font-poppins text-sm text-olive`}>{ account.contact_num }</Text>
          </View>
        </View>
        <View style={tw`flex-row flex-wrap justify-center w-full my-2`}>
          {links.map((module: { name: string, icon: string, route: string }, i: number) => (
            <TouchableOpacity
              key={i}
              activeOpacity={0.5}
              style={tw`flex-col items-center justify-center w-[8rem] h-[8rem] m-2 p-5 rounded-xl shadow-md border border-olive-semi-light bg-olive-light`}
              onPress={() => useNavigate(module.route)}
            >
              <FeatherIcon size={50} name={module.icon} color="#425951" />
              <Text style={tw`mt-1 font-poppins text-xs text-center text-olive`}>{ module.name }</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </MainLayout>
  )
}

export default HomeScreen