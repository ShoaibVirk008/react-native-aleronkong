import React, { Component, useState } from 'react';
import { View, } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Headers, Wrapper, Text, Lines, Switches, ScrollViews, Spacer, Buttons, TextInputs } from '../../../components';
import { goBack } from '../../../navigation/rootNavigation';
import { appStyles } from '../../../services';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import { totalSize } from 'react-native-dimension';

export default function Index() {
    const [options, setOptions] = useState([{ title: 'Receive Calls from Friends', value: true }, { title: 'Do Not Disturb Mode', value: true }])
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const onPressOption = (item, index) => {
        let tempOptions = options.slice()
        tempOptions[index].value = !tempOptions[index].value
        setOptions(tempOptions)
    }

    const showDatePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setTimePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        //console.warn("A date has been picked: ", date);
        //console.warn("date string: ", moment(date).toISOString());
        hideDatePicker();
        const tempDate = moment(date).toISOString()
        if (isStartTimePickerVisible) {
            setStartTime(tempDate)
            setStartTimePickerVisibility(false)
        } else {
            setEndTime(tempDate)
            setEndTimePickerVisibility(false)
        }
    };
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'Call Settings'}
                showBackArrow
            />
            <ScrollViews.WithKeyboardAvoidingView
                footer={
                    <Wrapper>
                        <Spacer isBasic />
                        <Buttons.Colored
                            text={'Save Changes'}
                            buttonStyle={[appStyles.marginHorizontalMedium]}
                            onPress={goBack}
                        />
                        <Spacer isDoubleBase />
                    </Wrapper>
                }
            >
                {
                    options.map((item, index) => {
                        return (
                            <Wrapper key={index}>
                                <Wrapper marginHorizontalBase flexDirectionRow alignItemsCenter marginVerticalBase justifyContentSpaceBetween>
                                    <Text isRegular isTextColor2>{item.title}</Text>
                                    <Switches.Primary
                                        value={item.value}
                                        onPress={() => onPressOption(item, index)}
                                    />
                                </Wrapper>
                                {
                                    index===1&&item.value ?
                                        <Wrapper>
                                            <Wrapper flexDirectionRow marginHorizontalBase>
                                                <Wrapper flex={1}>
                                                    <TextInputs.Underlined
                                                        title="Start Time"
                                                        value={startTime ? moment(startTime).format('hh:mm a') : ''}
                                                        onPress={() => {
                                                            showDatePicker()
                                                            setStartTimePickerVisibility(true)
                                                        }}
                                                        error={''}
                                                        right={
                                                            <Icon
                                                                name="clock"
                                                                type="feather"
                                                                size={totalSize(2.5)}
                                                            />
                                                        }
                                                        containerStyle={{ marginHorizontal: 0 }}
                                                    />
                                                </Wrapper>
                                                <Wrapper flex={0.1} />
                                                <Wrapper flex={1}>
                                                    <TextInputs.Underlined
                                                        title="End Time"
                                                        value={endTime ? moment(endTime).format('hh:mm a') : ''}
                                                        onPress={() => {
                                                            showDatePicker()
                                                            setEndTimePickerVisibility(true)
                                                        }}
                                                        error={''}
                                                        right={
                                                            <Icon
                                                                name="clock"
                                                                type="feather"
                                                                size={totalSize(2.5)}
                                                            />
                                                        }
                                                        containerStyle={{ marginHorizontal: 0 }}
                                                    />
                                                </Wrapper>
                                            </Wrapper>
                                            <Spacer isBasic />
                                            <Lines.Horizontal />
                                        </Wrapper>
                                        :
                                        null
                                }
                                <Lines.Horizontal />
                            </Wrapper>
                        )
                    })
                }
            </ScrollViews.WithKeyboardAvoidingView>
            <DateTimePicker
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </Wrapper>
    )
}
