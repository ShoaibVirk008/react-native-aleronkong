import moment from 'moment';
import React, { Component, useState } from 'react';
import { View, } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { Buttons, Common, Modals, Pickers, Spacer, TextInputs, Wrapper, Text } from '../../../components';
import { goBack } from '../../../navigation/rootNavigation';
import { appStyles, colors, DummyData, Hooks } from '../../../services';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Icon } from 'react-native-elements';

export default function Index() {
    const isKeyboardVisible = Hooks.UseKeyboard()
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

    const showDatePicker = ({ start, end }) => {
        start && setStartDatePickerVisibility(true);
        end && setEndDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setStartDatePickerVisibility(false);
        setEndDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        //console.warn("A date has been picked: ", date);
        //console.warn("date string: ", moment(date).toISOString());
        hideDatePicker();
        const tempDate = moment(date).toISOString()
        if (isStartDatePickerVisible) {
            setStartDate(tempDate)
            setStartDatePickerVisibility(false)
        } else {
            setEndDate(tempDate)
            setEndDatePickerVisibility(false)
        }
    };
    return (
        <>
            <Common.PopupWrappers.Main
                toggle={goBack}
                containerStyle={{ ...appStyles.paddingVerticalBase, paddingBottom: height(7) }}
                mainContainerStyle={[isKeyboardVisible && appStyles.justifyContentFlexstart]}
            >
                <Spacer isSmall />
                <Wrapper marginHorizontalBase flexDirectionRow alignItemsCenter>
                    <Wrapper flex={1} />
                    <Wrapper flex={8} alignItemsCenter>
                        <Text isTinyTitle>Set Date</Text>
                    </Wrapper>
                    <Wrapper flex={1}>
                        <Icon
                            name='close'
                            type='font-awesome'
                            color={colors.appBgColor4}
                            onPress={goBack}
                        />
                    </Wrapper>
                </Wrapper>
                <Spacer isBasic />
                <Wrapper marginHorizontalBase>
                    <Text isInput isGray>Date Range</Text>
                </Wrapper>
                <Pickers.Underlined
                    titleStatic='Date Range'
                    data={[{ label: 'Today', value: 'today' }, ...DummyData.picker_options]}
                    value='today'
                />
                <Spacer isBasic />
                <Wrapper flexDirectionRow marginHorizontalBase>
                    <Wrapper flex={1}>
                        <TextInputs.UnderlinedSecondary
                            titleStatic="Starting"
                            value={startDate ? moment(startDate).format('DD/MM/YYYY') : ''}
                            onPress={() => {
                                showDatePicker({ start: true })
                            }}
                            error={''}
                            right={
                                <Icon
                                    name='ios-calendar-sharp'
                                    type='ionicon'
                                    size={totalSize(2)}
                                    color={colors.appColor1}
                                />
                            }
                            containerStyle={{ marginHorizontal: 0 }}
                        />
                    </Wrapper>
                    <Wrapper flex={0.1} />
                    <Wrapper flex={1}>
                        <TextInputs.UnderlinedSecondary
                            titleStatic="Ending"
                            value={endDate ? moment(endDate).format('DD/MM/YYYY') : ''}
                            onPress={() => {
                                showDatePicker({ end: true })
                            }}
                            error={''}
                            right={
                                <Icon
                                    name='ios-calendar-sharp'
                                    type='ionicon'
                                    size={totalSize(2)}
                                    color={colors.appColor1}
                                />
                            }
                            containerStyle={{ marginHorizontal: 0 }}
                        />
                    </Wrapper>
                </Wrapper>
                <Spacer isBasic />
                <Spacer isSmall />
                <Buttons.ColoredSecondary
                    text='Apple Filters'
                    onPress={goBack}
                />
            </Common.PopupWrappers.Main>
            <DateTimePicker
                isVisible={isStartDatePickerVisible || isEndDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </>
    )
}
