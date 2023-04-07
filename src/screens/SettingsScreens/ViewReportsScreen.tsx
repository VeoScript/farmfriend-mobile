import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import moment from 'moment'
import tw from '../../styles/tailwind'
import { FeatherIcon } from '../../utils/Icons'
import { ActivityIndicator, FlatList, Text, TextInput, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useGoBack, useNavigate } from '../../config/RootNavigation'
import { useBackHandler } from '../../helpers/hooks/useBackHandler'
import { useGetReports } from '../../helpers/tanstack/queries/reports'

const ViewReportsScreen = () => {

  const route = useRoute()

  const [search, setSearch] = React.useState<string>('')
  
  if (route.params) {
    useBackHandler(() => {
      useGoBack()
    })
  } else {
    useBackHandler(() => {
      useNavigate('HomeScreen')
    })
  }

  const {
    data: reports,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  }: any = useGetReports(search)

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
          <Text style={tw`font-poppins text-sm text-olive`}>
            {search
              ? `There's no result in keyword of '${search}'.`
              : `There's no reports as of now.`
            }
          </Text>
        </View>
      </View>
    )
  }

  const renderData = (item: any) => {
    return (
      <View style={tw`flex-col w-full`}>
        <View style={tw`flex-row w-full p-3 border-b border-olive border-opacity-40`}>
          <View style={tw`flex-col ml-3`}>
            <View style={tw`flex-row items-center w-full`}>
              <FeatherIcon size={15} name="users" color="#425951" />
              <Text style={tw`ml-1 my-0.5 font-poppins-bold text-sm text-olive`}>{ item.item.type.replace(/_/g, "/") }</Text>
            </View>
            <View style={tw`my-2`}>
              <Text style={tw`font-poppins-bold text-sm text-olive-dark`}>{ item.item.description }</Text>
              <Text style={tw`font-poppins text-xs text-olive`}>Concern/Feedback</Text>
            </View>
            <Text style={tw`my-0.5 font-poppins text-xs text-olive`}>{ moment(item.item.created_at).format('LLL') }</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <MainLayout title="Reports">
      <View style={tw`flex-1 flex-col w-full`}>
        <View style={tw`flex-col w-full px-3 mb-1`}>
          <View style={tw`flex-row items-center w-full border-b border-olive`}>
            <FeatherIcon size={20} name="search" color="#425951" />
            <TextInput
              style={tw`w-full ml-2 font-poppins text-sm text-olive`}
              placeholder="Search"
              value={search}
              onChangeText={(value: string) => setSearch(value)}
            />
          </View>
        </View>
        {isLoading
          ? <View style={tw`flex-col items-center w-full my-10`}>
              <ActivityIndicator style={tw`pb-3`} color='#425951' size={40} />
              <Text style={tw`font-poppins text-base`}>Loading...</Text>
            </View>
          : <FlatList
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={listIsEmpty}
              data={reports.pages.map((page: any) => page.reports).flat()}
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

export default ViewReportsScreen