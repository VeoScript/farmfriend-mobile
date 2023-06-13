import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import moment from 'moment'
import tw from '../../styles/tailwind'
import { FeatherIcon } from '../../utils/Icons'
import { View, Text, TextInput, ActivityIndicator, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import { useNavigate } from '../../config/RootNavigation'
import { useBackHandler } from '../../helpers/hooks/useBackHandler'
import { useGetPrograms } from '../../helpers/tanstack/queries/programs'

const SearchProgramsScreen = () => {

  const [search, setSearch] = React.useState<string>('')

  useBackHandler(() => {
    useNavigate('HomeScreen')
  })

  const {
    data: programs,
    isLoading,
    isFetching,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  }: any = useGetPrograms(search)

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
              : `There's no created programs as of now.`
            }
          </Text>
        </View>
      </View>
    )
  }

  const renderData = (item: any) => {
    return (
      <View style={tw`flex-col w-full`}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={tw`flex-col w-full p-3 border-b border-olive border-opacity-40`}
          onPress={() => {
            useNavigate('ViewProgramsScreen', {
              id: item.item.id
            })
          }}
        >
          <Text style={tw`my-0.5 font-poppins-bold text-sm text-olive-dark`}>{ item.item.title }</Text>
          <Text numberOfLines={1} style={tw`my-0.5 font-poppins text-xs text-olive`}>{ item.item.description }</Text>
          <Text style={tw`my-0.5 font-poppins text-xs text-olive`}>Posted by { item.item.user.first_name + " " + item.item.user.last_name }</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <MainLayout title="Search Programs">
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
              refreshControl={
                <RefreshControl
                  colors={['#579F93']}
                  tintColor={'#579F93'}
                  refreshing={isFetching}
                  onRefresh={() => {
                    refetch
                  }}
                />
              }
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={listIsEmpty}
              data={programs.pages.map((page: any) => page.programs).flat()}
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

export default SearchProgramsScreen