import React, { Component, useState } from 'react';
import { View, } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Common, Pickers, ScrollViews, Spacer, TextInputs, Wrapper, Text, Buttons } from '../../../../components';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { appStyles, colors, DummyData } from '../../../../services';
import { totalSize } from 'react-native-dimension';
import moment from 'moment';

export default function Index() {

    const [expiryDate, setExpiryDate] = useState('')
    const [isExpiryDatePickerVisible, setExpiryDatePickerVisibility] = useState(false)
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')
    const [shippingCarrier, setShippingCarrier] = useState('')

    const showDatePicker = () => {
        setExpiryDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setExpiryDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        console.warn("date string: ", moment(date).toISOString());
        hideDatePicker();
        setExpiryDate(moment(date).toISOString())
    };

    return (
        <Wrapper isMain>

            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer isBasic />
                <Spacer isSmall />
                <Pickers.SearchableSecondary
                    titleStatic='Origin'
                    data={DummyData.picker_options}
                    value={origin}
                    onChangeText={v => setOrigin(v)}
                    onPressItem={(item, index) => {
                        console.log('item', item)
                        setOrigin(item.value)
                    }}
                    placeholder='Search Origin'
                    tintColor={colors.appTextColor1}
                />
                <Spacer isBasic />
                <Pickers.SearchableSecondary
                    titleStatic='Destination'
                    data={DummyData.picker_options}
                    value={destination}
                    onChangeText={v => setDestination(v)}
                    onPressItem={(item, index) => {
                        console.log('item', item)
                        setDestination(item.value)
                    }}
                    placeholder='Search destination'
                    tintColor={colors.appTextColor1}
                />
                <Spacer isBasic />
                <TextInputs.UnderlinedSecondary
                    titleStatic='Product'
                    value=''
                    placeholder='Search product'
                />
                <Spacer isBasic />
                <Spacer isSmall />
                <Wrapper marginHorizontalBase>
                    <Text isSmallPlus isMediumFont>Shipment Details</Text>
                </Wrapper>
                <Spacer isBasic />
                <TextInputs.UnderlinedSecondary
                    titleStatic='Estimated Arrival'
                    value={expiryDate ? moment(expiryDate).format('DD/MM/YYYY') : ''}
                    placeholder='DD/MM/YYYY'
                    iconNameRight='calendar-sharp'
                    iconTypeRight={'ionicon'}
                    iconSizeRight={totalSize(2)}
                    onPress={showDatePicker}
                />
                 <Spacer isBasic />
                <TextInputs.UnderlinedSecondary
                    titleStatic='Tracking Number'
                    value=''
                    placeholder='xxxxxxxxx'
                />
                 <Spacer isBasic />
                 <Pickers.SearchableSecondary
                    titleStatic='Shipping Carrier'
                    placeholder='Select shipping carrier'
                    data={DummyData.picker_options}
                    value={shippingCarrier}
                    onChangeText={v => setShippingCarrier(v)}
                    onPressItem={(item, index) => {
                        console.log('item', item)
                        setShippingCarrier(item.value)
                    }}
                    tintColor={colors.appTextColor1}
                />
                 <Spacer isBasic />
                <Spacer isSmall />
                <Wrapper marginHorizontalBase>
                    <Text isSmallPlus isMediumFont>Additional Details</Text>
                </Wrapper>
                <Spacer isBasic />
                <TextInputs.UnderlinedSecondary
                    titleStatic='Estimated Arrival'
                    value=''
                    placeholder='Reference Number'
                />
                 <Spacer isBasic />
                <TextInputs.UnderlinedSecondary
                    titleStatic='Tag'
                    value=''
                    placeholder='Enter tag'
                />
                <Spacer isBasic />
                <Spacer isSmall />
                <Wrapper marginHorizontalBase flexDirectionRow style={{}}>
                    <Wrapper flex={1}>
                        <Buttons.ColoredSmall
                            text={'Save'}
                            buttonStyle={[{ borderRadius: 5 }, appStyles.center, appStyles.paddingVerticalSmall]}
                        />
                    </Wrapper>
                    <Wrapper flex={0.1} />
                    <Wrapper flex={1}>
                        <Buttons.BorderedSmall
                            text={'Discard'}
                            buttonStyle={[{ borderRadius: 5 }, appStyles.center, appStyles.paddingVerticalSmall]}
                            tintColor={colors.appColor8}
                        />
                    </Wrapper>
                </Wrapper>
                <Spacer isDoubleBase />
                <DateTimePicker
                    isVisible={isExpiryDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}
