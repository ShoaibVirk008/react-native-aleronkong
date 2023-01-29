import React, { Component, useState } from 'react';
import { View, } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { ScrollViews, Spacer, Wrapper, Text, TextInputs, CheckBoxes, Common, Buttons } from '../../../../components';
import { appStyles, colors } from '../../../../services';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default function Index({ route }) {
    const is_editing = route?.params?.data || null
    const [isExpirationDateVisible, setExpirationDateVisibility] = useState(false)
    const [expiryDate, setExpiryDate] = useState(is_editing?Date.now():'')
    const [isExpiryDatePickerVisible, setExpiryDatePickerVisibility] = useState(false)

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
                <Wrapper marginHorizontalBase>
                    <Text isSmallPlus isMediumFont>Gift card details</Text>
                </Wrapper>
                <Spacer isBasic />
                <TextInputs.UnderlinedSecondary
                    titleStatic='Gift Card Code'
                    value={is_editing ? 'EID2022' : ''}
                />
                <Spacer isBasic />
                <TextInputs.UnderlinedSecondary
                    titleStatic='Initial Value'
                    value={is_editing ? '$40' : ''}
                />
                  <Spacer isBasic />
                <Spacer isSmall />
                <Wrapper marginHorizontalBase>
                    <Text isSmallPlus isMediumFont>Expiration Date</Text>
                    <Spacer isBasic />
                    <CheckBoxes.Primary
                        checked={!isExpirationDateVisible}
                        text={'No Expiration Date'}
                        checkedIconName={'radiobox-marked'}
                        checkedIconColor={colors.appTextColor1}
                        uncheckedIconColor={colors.appTextColor1}
                        onPress={() => setExpirationDateVisibility(false)}
                    />
                    <Spacer isSmall />
                    <CheckBoxes.Primary
                        checked={isExpirationDateVisible}
                        text={'Set Expiration Date'}
                        checkedIconName={'radiobox-marked'}
                        checkedIconColor={colors.appTextColor1}
                        uncheckedIconColor={colors.appTextColor1}
                        onPress={() => setExpirationDateVisibility(true)}
                    />
                    {
                        isExpirationDateVisible ?
                            <>
                                <Spacer isSmall />
                                <TextInputs.UnderlinedSecondary
                                    titleStatic='Expires on:'
                                    value={expiryDate ? moment(expiryDate).format('DD/MM/YYYY') : ''}
                                    containerStyle={[appStyles.marginHorizontalMedium, { marginRight: width(45) }]}
                                    iconNameRight='calendar-sharp'
                                    iconTypeRight={'ionicon'}
                                    iconSizeRight={totalSize(2)}
                                    iconContainerRightStyle={{ flex: 0 }}
                                    onPress={showDatePicker}
                                />
                            </>
                            :
                            null
                    }
                </Wrapper>
                  <Spacer isBasic />
                <Spacer isSmall />
                <Wrapper marginHorizontalBase>
                    <Text isSmallPlus isMediumFont>Find or Create a customer</Text>
                    <Spacer isSmall />
                    <Text isSmall>To send the gift card code, add a customer with an email address or phone number.</Text>

                </Wrapper>
                  <Spacer isBasic />
                <Spacer isSmall />
                <Wrapper marginHorizontalBase>
                    <Text isSmallPlus isMediumFont>Customer Details</Text>
                </Wrapper>
                <Spacer isSmall />
                <Common.CustomerDetailCard
                    name='John Doe'
                    phone='+123 456 789'
                    email='john44@gmail.com'
                    shipping='House # 23, Street 1, Zia Road'
                    billing='House # 23, Street 1, Zia Road'
                    onPressDelete={() => { }}
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
            </ScrollViews.WithKeyboardAvoidingView>
            <DateTimePicker
                isVisible={isExpiryDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </Wrapper>
    )
}
