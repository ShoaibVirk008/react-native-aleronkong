import React, { Component, useState } from 'react';
import { View, } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Common, ScrollViews, Spacer, TextInputs, Wrapper, Text, CheckBoxes, Pickers, Buttons } from '../../../components';
import { appStyles, colors, DummyData, fontSize } from '../../../services';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';


export default function Index() {
    const [productSearchQuery, setProductSearchQuery] = useState('')
    const [customerSearchQuery, setCustomerSearchQuery] = useState('')

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [isPickingStartDate, setPickingStartDate] = useState(true)
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [isPickingStartTime, setPickingStartTime] = useState(true)
    const [isEndDateTimeVisible, setEndDateTimeVisibility] = useState(false)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false)

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirmDate = (date) => {
        console.warn("A date has been picked: ", date);
        console.warn("date string: ", moment(date).toISOString());
        const iosDate = moment(date).toISOString()
        hideDatePicker();
        isPickingStartDate ?
            setStartDate(iosDate)
            :
            setEndDate(iosDate)
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirmTime = (date) => {
        const iosDate = moment(date).toISOString()
        console.warn("A date has been picked: ", date);
        console.warn("date string: ", iosDate);
        hideTimePicker();
        isPickingStartTime ?
            setStartTime(iosDate)
            :
            setEndTime(iosDate)
    };

    return (
        <Wrapper isMain>
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer isBasic />
                <Common.TitleInfoSecondary
                    title={'Discount Code'}
                    info={'Add custom item'}
                    titleStyle={[appStyles.textGray]}
                    infoStyle={{ color: colors.appColor1 + '80' }}
                />
                <TextInputs.UnderlinedSecondary
                    //titleStatic={'Tags'}
                    placeholder='EID2022'
                />
                <Spacer isSmall />
                <Wrapper marginHorizontalBase>
                    <Text isSmall isLightGray>Customers will enter this discount code at checkout</Text>
                </Wrapper>
                <Spacer isBasic />
                <Wrapper marginHorizontalBase>
                    <Text isSmallPlus isMediumFont>Type</Text>
                    {
                        ['Fixed Amount', 'Percentage', 'Fixed Amount', 'Buy X Get Y']
                            .map((item, index) => {
                                return (
                                    <Wrapper key={index}>
                                        <Spacer isSmall />
                                        <CheckBoxes.Secondary
                                            checked={index === 1}
                                            text={item}
                                            onPress={() => { }}
                                        />
                                    </Wrapper>
                                )
                            })
                    }
                </Wrapper>
                <Spacer isBasic />
                <Spacer isSmall />
                <Wrapper marginHorizontalBase>
                    <Text isSmallPlus isMediumFont>Value</Text>
                </Wrapper>
                <Spacer isSmall />
                <TextInputs.UnderlinedSecondary
                    titleStatic={'Discount Value'}
                    value='20'
                    iconNameRight='percent'
                    iconTypeRight='feather'
                    iconSizeRight={totalSize(2)}
                />
                <Spacer isBasic />
                <Spacer isSmall />
                <Wrapper marginHorizontalBase>
                    <Text isSmallPlus isMediumFont>Applies to</Text>
                    {
                        ['All Prducts', 'Specific Products', 'Specific Collections']
                            .map((item, index) => {
                                return (
                                    <Wrapper key={index}>
                                        <Spacer isSmall />
                                        <CheckBoxes.Secondary
                                            checked={index === 1}
                                            text={item}
                                            onPress={() => { }}
                                        />
                                    </Wrapper>
                                )
                            })
                    }
                </Wrapper>
                <Spacer isBasic />
                <Pickers.SearchableSecondary
                    titleStatic={'Product'}
                    data={DummyData.picker_options}
                    value={productSearchQuery}
                    onChangeText={v => setProductSearchQuery(v)}
                    onPressItem={(item, index) => {
                        console.log('item', item)
                        setProductSearchQuery(item.value)
                    }}
                    placeholder='Search product'
                    tintColor={colors.appTextColor1}
                />
                <Spacer isBasic />
                <Spacer isSmall />
                <Wrapper marginHorizontalBase>
                    <Text isSmallPlus isMediumFont>Minimum Requirements</Text>
                    {
                        ['None', 'Specific Customers', 'Specific Customer Segments']
                            .map((item, index) => {
                                return (
                                    <Wrapper key={index}>
                                        <Spacer isSmall />
                                        <CheckBoxes.Secondary
                                            checked={index === 1}
                                            text={item}
                                            onPress={() => { }}
                                        />
                                    </Wrapper>
                                )
                            })
                    }
                </Wrapper>
                <Spacer isBasic />
                <Pickers.SearchableSecondary
                    titleStatic={'Customer'}
                    data={DummyData.picker_options}
                    value={customerSearchQuery}
                    onChangeText={v => setCustomerSearchQuery(v)}
                    onPressItem={(item, index) => {
                        console.log('item', item)
                        setCustomerSearchQuery(item.value)
                    }}
                    placeholder='Search Customer'
                    tintColor={colors.appTextColor1}
                />
                <Spacer isBasic />
                <Spacer isSmall />
                <Wrapper marginHorizontalBase>
                    <Text isSmallPlus isMediumFont>Usage Limits</Text>
                    {
                        [
                            'Limit to one user per customer',
                            'Limit number of times this discount can be used in total',]
                            .map((item, index) => {
                                return (
                                    <Wrapper key={index}>
                                        <Spacer isSmall />
                                        <CheckBoxes.Secondary
                                            checked={index === 1}
                                            text={item}
                                            onPress={() => { }}
                                            uncheckedIconName='checkbox-blank-outline'
                                            checkedIconName='checkbox-marked'
                                        />
                                    </Wrapper>
                                )
                            })
                    }
                </Wrapper>
                <Spacer isBasic />
                <TextInputs.UnderlinedSecondary
                    titleStatic={'No. of customers'}
                    value='Enter Number'
                    iconSizeRight={totalSize(2)}
                />
                <Spacer isBasic />
                <Spacer isSmall />
                <Wrapper marginHorizontalBase>
                    <Text isSmallPlus isMediumFont>Active Dates</Text>
                </Wrapper>
                <Spacer isBasic />
                <TextInputs.UnderlinedSecondary
                    titleStatic='Start date'
                    value={startDate ? moment(startDate).format('DD/MM/YYYY') : ''}
                    placeholder='DD/MM/YYYY'
                    iconNameRight='calendar-sharp'
                    iconTypeRight={'ionicon'}
                    iconSizeRight={totalSize(2)}
                    onPress={() => {
                        setPickingStartDate(true)
                        showDatePicker()
                    }}
                />
                <Spacer isBasic />
                <TextInputs.UnderlinedSecondary
                    titleStatic='Start time(PKT)'
                    value={startTime ? moment(startTime).format('h:m A') : ''}
                    placeholder=''
                    iconNameRight='clock'
                    iconTypeRight={'feather'}
                    iconSizeRight={totalSize(2)}
                    onPress={() => {
                        setPickingStartTime(true)
                        showTimePicker()
                    }}
                />
                <Wrapper marginHorizontalBase>
                    <Spacer isSmall />
                    <CheckBoxes.Secondary
                        text={'Set end time'}
                        checked={isEndDateTimeVisible}
                        onPress={() => setEndDateTimeVisibility(!isEndDateTimeVisible)}
                        uncheckedIconName='checkbox-blank-outline'
                        checkedIconName='checkbox-marked'
                    />
                </Wrapper>
                {
                    isEndDateTimeVisible ?
                        <>
                            <Spacer isBasic />
                            <TextInputs.UnderlinedSecondary
                                titleStatic='End date'
                                value={endDate ? moment(endDate).format('DD/MM/YYYY') : ''}
                                placeholder='DD/MM/YYYY'
                                iconNameRight='calendar-sharp'
                                iconTypeRight={'ionicon'}
                                iconSizeRight={totalSize(2)}
                                onPress={() => {
                                    setPickingStartDate(false)
                                    showDatePicker()
                                }}
                            />
                            <Spacer isBasic />
                            <TextInputs.UnderlinedSecondary
                                titleStatic='End time(PKT)'
                                value={endTime ? moment(endTime).format('h:m A') : ''}
                                placeholder=''
                                iconNameRight='clock'
                                iconTypeRight={'feather'}
                                iconSizeRight={totalSize(2)}
                                onPress={() => {
                                    setPickingStartTime(false)
                                    showTimePicker()
                                }}
                            />
                        </>
                        : null
                }
                <Spacer isBasic />
                <Wrapper marginHorizontalBase>
                    <Text isSmallPlus isMediumFont>Summary</Text>
                </Wrapper>
                <Spacer isSmall />
                <TextInputs.Bordered
                    placeholder={'asda'}
                    value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                    containerStyle={{ borderWidth: 1 }}
                    inputStyle={{ fontSize: fontSize.small, height: height(15), textAlignVertical: 'top', paddingTop: height(1), lineHeight: totalSize(2.25) }}
                    multiline
                />
                <Spacer isBasic />
                <Wrapper marginHorizontalBase>
                    <Text isSmallPlus isMediumFont>Performance</Text>
                    <Spacer isSmall />
                    <Text isSmall isLightGray>Discount is not active yet!</Text>
                </Wrapper>
                <Spacer isBasic />
                <Spacer isBasic />
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
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
            />
            <DateTimePicker
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmTime}
                onCancel={hideTimePicker}
            />
        </Wrapper>
    )
}
