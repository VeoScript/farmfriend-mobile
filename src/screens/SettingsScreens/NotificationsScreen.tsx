import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import moment from 'moment'
import tw from '../../styles/tailwind'
import { OcticonIcon } from '../../utils/Icons'
import { Toast } from '../../utils/Toast'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useNavigate } from '../../config/RootNavigation'
import { useBackHandler } from '../../helpers/hooks/useBackHandler'
import { useGetUserAccount } from '../../helpers/hooks/useGetUserAccount'
import { useGetNotifications } from '../../helpers/tanstack/queries/notifications'
import { useReadNotificationMutation } from '../../helpers/tanstack/mutations/notifications'

const NotificationsScreen = () => {

  const account = useGetUserAccount()

  const readNotificationMutation = useReadNotificationMutation()

  useBackHandler(() => {
    useNavigate('HomeScreen')
  })

  const handleReadNotification = async (item: any) => {
    await readNotificationMutation.mutateAsync({
      id: item.id
    },
    {
      onError: () => {
        Toast('There is some error reading notification')
      }, 
      onSuccess: () => {
        switch(item.type) {
          case 'ADD_CROPS':
            useNavigate('ViewCropsScreen', {
              id: item.routeId
            })
          break
          case 'ADD_PROGRAMS':
            useNavigate('ViewProgramsScreen', {
              id: item.routeId
            })
          break
          case 'ADD_REPORTS':
            useNavigate('ViewReportsScreen', {
              previousRoute: 'NotificationScreen'
            })
          break
          default: {
            Toast(item.message)
          }
        }
      }
    })
  }

  const {
    data: notifications,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  }: any = useGetNotifications(account.account_type)

  const itemKeyExtractor = (item: any, index: { toString: () => any }) => {
    return index.toString()
  }

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  const renderSpinner = () => {
    return <ActivityIndicator style={tw`pb-3`} color='#425951' size={40} />
  }

  const listIsEmpty = () => {
    return (
      <View style={tw`flex-1 flex-col items-center justify-center w-full my-3 `}>
        <View style={tw`flex-1 w-full max-w-xs h-full`}>
          <Text style={tw`font-poppins text-sm text-olive`}>There's no notifications as of now.</Text>
        </View>
      </View>
    )
  }

  const renderData = (item: any) => {
    return (
      <View style={tw`flex-col w-full`}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={tw`flex-row w-full p-3 border-b border-olive border-opacity-40 ${item.item.read ? 'bg-transparent' : 'bg-olive bg-opacity-30'}`}
          onPress={() => {
            handleReadNotification(item.item)
          }}
        >
          <View style={tw`flex-col ml-3`}>
            <View style={tw`flex-row items-center w-full`}>
              {item.item.read
                ? <OcticonIcon size={15} name="bell" color="#425951" />
                : <OcticonIcon size={15} name="bell-fill" color="#F1C30F" />
              }
              <Text style={tw`ml-2 my-0.5 font-poppins-bold text-sm text-olive-dark`}>{ item.item.type.substring(4) }</Text>
            </View>
            <View style={tw`my-2`}>
              <Text style={tw`font-poppins text-sm text-olive-dark`}>{ item.item.message }</Text>
            </View>
            <Text style={tw`my-0.5 font-poppins text-xs text-olive`}>{ moment(item.item.created_at).fromNow() }</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <MainLayout title="Notifications">
      <View style={tw`flex-1 flex-col w-full`}>
        {isLoading
          ? <View style={tw`flex-col items-center w-full my-10`}>
              <ActivityIndicator style={tw`pb-3`} color='#425951' size={40} />
              <Text style={tw`font-poppins text-base`}>Loading...</Text>
            </View>
          : <FlatList
              ListEmptyComponent={listIsEmpty}
              data={notifications.pages.map((page: any) => page.notifications).flat()}
              renderItem={renderData}
              keyExtractor={itemKeyExtractor}
              onEndReached={loadMore}
              onEndReachedThreshold={0.3}
              ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
            />
        }
      </View>
    </MainLayout>
  )
}

export default NotificationsScreen