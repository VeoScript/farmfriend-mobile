import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import tw from '../../styles/tailwind'
import { Toast } from '../../utils/Toast'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigate, useGoBack } from '../../config/RootNavigation'
import { useBackHandler } from '../../helpers/hooks/useBackHandler'
import { useGetUserAccount } from '../../helpers/hooks/useGetUserAccount'
import { useCreateReportMutations } from '../../helpers/tanstack/mutations/reports'

const ReportHereScreen = () => {

  const account = useGetUserAccount()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [reportDescription, setReportDescription] = React.useState<string>('')
  const [reportDescriptionError, setReportDescriptionError] = React.useState<string>('')

  const createReportMutations = useCreateReportMutations()

  useBackHandler(() => {
    useNavigate('HomeScreen')
  })

  const handleCreateReport = async () => {
    if (reportDescription === '') return setReportDescriptionError('Report description is required')

    setIsLoading(false)

    await createReportMutations.mutateAsync({
      type: account.account_type,
      description: reportDescription,
      user_id: account.id
    },
    {
      onError: (error: any) => {
        Toast(`${error.response?.data?.message}`)
        setIsLoading(false)
      },
      onSuccess: () => {
        Toast('Report created successfully')
        setIsLoading(false)
        useGoBack()
      }
    })
  }

  return (
    <MainLayout title="Report Here">
      <View style={tw`flex-col w-full my-2 px-5`}>
        <View style={tw`flex-col w-full my-2`}>
          <Text style={tw`font-poppins-bold text-xl`}>Create Report</Text>
          <View style={tw`flex-col w-full my-2`}>
            <TextInput
              multiline
              style={tw`font-poppins text-sm text-olive border-b border-olive`}
              placeholder="Description"
              value={reportDescription}
              onChangeText={(value: string) => {
                setReportDescription(value)
              }}
            />
            {reportDescriptionError && (<Text style={tw`mt-1 font-poppins-light text-xs text-red-600`}>{reportDescriptionError}</Text>)}
          </View>
          <TouchableOpacity
            disabled={isLoading}
            activeOpacity={0.7}
            style={tw`flex-row items-center justify-center w-full my-1 px-2 py-3 rounded-full bg-olive-dark ${isLoading ? 'opacity-50' : 'opacity-100'}`}
            onPress={handleCreateReport}
          >
            <Text style={tw`font-poppins text-sm text-white`}>{ isLoading ? 'Submitting...' : 'Submit' }</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MainLayout>
  )
}

export default ReportHereScreen