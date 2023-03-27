import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import tw from '../styles/tailwind'
import { OcticonIcon } from '../utils/Icons'
import { View, Text } from 'react-native'

interface DropdownPropsTypes {
  defaultButtonText: string
  defaultValue: string
  data: any
  onSelect: any
  buttonTextAfterSelection: any
  rowTextForSelection: any
  disabled: boolean
  isSearch?: boolean
  isNotCapitalize?: boolean
  emptyDataTextDisplay?: string
}

const Dropdown: React.FC<DropdownPropsTypes> = ({ data, defaultValue, defaultButtonText, buttonTextAfterSelection, rowTextForSelection, onSelect, disabled, isSearch, isNotCapitalize, emptyDataTextDisplay }) => {
  return (
    <React.Fragment>
      {data?.length > 0
        ? <SelectDropdown
            statusBarTranslucent={true}
            disabled={disabled}
            buttonStyle={tw`font-poppins text-sm text-olive border-b border-olive bg-transparent w-full`}
            dropdownStyle={tw`rounded-xl bg-olive-light`}
            dropdownIconPosition="right"
            buttonTextStyle={{
              textAlign: 'left',
              fontSize: 14,
              marginLeft: -5,
              fontFamily: 'Poppins-Regular',
              color: '#425951'
            }}
            rowTextStyle={{
              textAlign: 'left',
              fontFamily: 'Poppins-Regular',
              fontSize: 12
            }}
            renderDropdownIcon={() => (
              <OcticonIcon size={20} name="chevron-down" color="#425951" />
            )}
            search={isSearch}
            defaultButtonText={defaultButtonText}
            defaultValue={defaultValue}
            data={data}
            onSelect={onSelect}
            buttonTextAfterSelection={buttonTextAfterSelection}
            rowTextForSelection={rowTextForSelection}
          />
        : <View style={tw`border-b border-olive bg-transparent w-full p-3`}>
            <Text style={tw`-ml-2 font-poppins text-olive`}>{ emptyDataTextDisplay ? emptyDataTextDisplay : 'No data' }</Text>
          </View>
      }
    </React.Fragment>
  )
}

export default Dropdown