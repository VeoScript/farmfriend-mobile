import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import moment from 'moment'
import tw from '../../styles/tailwind'
import { FeatherIcon } from '../../utils/Icons'
import { ActivityIndicator, FlatList, Image, Text, TextInput, View } from 'react-native'
import { useNavigate } from '../../config/RootNavigation'
import { useBackHandler } from '../../helpers/hooks/useBackHandler'
import { useGetRates } from '../../helpers/tanstack/queries/rates'

const ViewRatesScreen = () => {

  const [search, setSearch] = React.useState<string>('')

  useBackHandler(() => {
    useNavigate('HomeScreen')
  })
  const {
    data: rates,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  }: any = useGetRates(search)

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
              : `There's no rates as of now.`
            }
          </Text>
        </View>
      </View>
    )
  }

  const renderData = (item: any) => {
    return (
      <View style={tw`flex-col w-full`}>
        <View style={tw`flex-row w-full border-b border-olive border-opacity-40`}>
          <View style={tw`flex-col w-full p-3`}>
            <View style={tw`flex-row items-center justify-between w-full mb-2`}>
              <View style={tw`flex-1 flex-row items-center mr-2`}>
                {item.item.user.image
                ? <Image
                    style={tw`rounded-full w-[3rem] h-[3rem] bg-olive`}
                    resizeMode="cover"
                    source={{ uri: item.item.user.image }}
                  />
                : <View style={tw`flex-row items-center justify-center w-[3rem] h-[3rem] p-2 overflow-hidden rounded-full bg-olive`}>
                    <FeatherIcon
                      name="user"
                      size={20}
                      color="#8EB6AD"
                    />
                  </View>
                }
                <View style={tw`flex-col w-full`}>
                  <Text style={tw`ml-2 font-poppins-bold text-sm text-olive-dark`}>{ item.item.user.first_name + ' ' + item.item.user.last_name }</Text>
                  <Text style={tw`ml-2 font-poppins text-xs text-olive`}>{ item.item.user.account_type?.replace(/_/g, "/") }</Text>
                </View>
              </View>
              <View style={tw`flex-1 flex-col items-end ml-2`}>
                <Text style={tw`font-poppins-bold text-base text-yellow-300`}>{ item.item.rate }/5</Text>
                <Text style={tw`font-poppins text-xs text-olive`}>Rating</Text>
              </View>
            </View>
            <View style={tw`flex-col w-full ml-2`}>
              <View style={tw`flex-col w-full my-1`}>
                <Text style={tw`font-poppins-bold text-sm text-olive-dark`}>{ item.item.feedback === '' ? 'N/A' : item.item.feedback }</Text>
                <Text style={tw`my-0.5 font-poppins text-xs text-olive`}>Feedback</Text>
              </View>
              <Text style={tw`my-0.5 font-poppins text-xs text-olive`}>{ moment(item.item.created_at).format('LLL') }</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <MainLayout title="Rates">
      <View style={tw`flex-1 flex-col w-full`}>
        <View style={tw`flex-col w-full px-3 mb-1`}>
          <View style={tw`flex-row items-center w-full border-b border-olive`}>
            <FeatherIcon size={20} name="search" color="#425951" />
            <TextInput
              style={tw`w-full ml-2 font-poppins text-sm text-olive`}
              keyboardType="decimal-pad"
              placeholder="Search Rate No."
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
              ListEmptyComponent={listIsEmpty}
              data={rates.pages.map((page: any) => page.rates).flat()}
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

export default ViewRatesScreen