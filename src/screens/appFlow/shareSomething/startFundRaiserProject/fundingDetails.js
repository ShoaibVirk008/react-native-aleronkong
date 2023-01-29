import React, { Component, useState } from 'react';
import { View, } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Buttons, Headers, ScrollViews, Spacer, TextInputs, Wrapper, Text } from '../../../../components';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { navigate } from '../../../../navigation/rootNavigation';
import { HelpingMethods, routes } from '../../../../services';

export default function Index({ route }) {

    const data = route?.params?.data || null
    console.log('funding details data: ' + data)

    const [targetLaunchDate, setTargetLaunchDate] = useState('')
    const [launchDateError, setLaunchDateError] = useState('')
    const [endDate, setEndDate] = useState('');
    const [endDateError, setEndDateError] = useState('');
    const [campaignDuration, setCampaignDuration] = useState('')
    const [campaignDurationError, setCampaignDurationError] = useState('')
    const [fundingGoal, setFundingGoal] = useState('')
    const [fundingGoalError, setFundingGoalError] = useState('')


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [pickingDate, setPickingDate] = useState('targetLaunchDate');

    const isPickingLunchDate = pickingDate === 'targetLaunchDate'
    const isPickingEndDate = pickingDate === 'endDate'

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        console.warn("date string: ", moment(date).toISOString());
        hideDatePicker();
        setTargetLaunchDate(moment(date).toISOString())
        launchDateError && setLaunchDateError('')
        // if (isPickingLunchDate) {
        //     setTargetLaunchDate(moment(date).toISOString())
        //     launchDateError && setLaunchDateError('')
        // } else if (isPickingEndDate) {
        //     setEndDate(moment(date).toISOString())
        //     endDate && setLaunchDateError('')
        // }
    };


    const validateNext = () => {
        HelpingMethods.handleAnimation()
        !targetLaunchDate ? setLaunchDateError('Select launch date') : setLaunchDateError('')
        !campaignDuration ? setCampaignDurationError('Enter compaign duration') : setCampaignDurationError('')
        !fundingGoal ? setFundingGoalError('Enter funding goal') : setFundingGoalError('')
        if (targetLaunchDate && campaignDuration && fundingGoal) {
            return true
        } else {
            return false
        }
    }

    const handleNext = () => {
        if (validateNext()) {
            // navigate(
            //     routes.shareSomethingRoutes.startFundRaiserProjectRoutes.verifyBankAccount,
            //     {
            //         data: { ...data, targetLaunchDate, campaignDuration, fundingGoal }
            //     }
            // )
            navigate(
                routes.shareSomethingRoutes.startFundRaiserProjectRoutes.reviewProject,
                {
                    data: { ...data, targetLaunchDate, campaignDuration, fundingGoal }
                }
            )
        }
    }

    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'Funding Details'}
                showBackArrow
                alignTitleLeft
            />
            <ScrollViews.WithKeyboardAvoidingView
                footer={
                    <Wrapper marginHorizontalSmall>
                        <Spacer isBasic />
                        <Buttons.Colored
                            text={'Next'}
                            //onPress={() => navigate(routes.shareSomethingRoutes.startFundRaiserProjectRoutes.verifyBankAccount)}
                            onPress={handleNext}
                        />
                        <Spacer isBasic />
                    </Wrapper>
                }
            >
                <Spacer isBasic />
                <Spacer isSmall />
                <TextInputs.Underlined
                    // inputRef={BirthdayInputRef}
                    title="Target launch date"
                    value={targetLaunchDate ? moment(targetLaunchDate).format('DD/MM/YYYY') : ''}
                    //value={'asdasdad'}
                    // onChangeText={(text) => setTargetLaunchDate(text)}
                    onPress={showDatePicker}
                    // onFocus={showDatePicker}
                    error={launchDateError}
                    iconNameRight="calendar"
                    iconTypeRight="feather"
                    isTitleSolidColor
                />
                <Spacer isBasic />
                <Spacer isSmall />
                <TextInputs.Underlined
                    // inputRef={BirthdayInputRef}
                    titleStatic="Campaign duration"
                    placeholder={'10'}
                    value={campaignDuration}
                    onChangeText={(text) => {
                        setCampaignDuration(text)
                        campaignDurationError && setCampaignDurationError('')
                    }}
                    keyboardType='number-pad'
                    error={campaignDurationError}
                    isTitleSolidColor
                    // iconNameRight="calendar-minus-o"
                    // iconTypeRight="font-awesome"
                    right={
                        <Wrapper>
                            <Text>Days</Text>
                        </Wrapper>
                    }
                />
                <Spacer isBasic />
                <Spacer isSmall />
                <TextInputs.Underlined
                    // inputRef={BirthdayInputRef}
                    titleStatic="Funding goal"
                    placeholder={'$ 1000'}
                    value={fundingGoal ? `$ ${fundingGoal}` : ''}
                    keyboardType='number-pad'
                    onChangeText={(text) => {
                        const tempText = text.replace('$ ', '')
                        setFundingGoal(tempText)
                        fundingGoalError && setFundingGoalError('')
                    }}
                    error={fundingGoalError}
                    isTitleSolidColor

                />
            </ScrollViews.WithKeyboardAvoidingView>
            <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </Wrapper>
    )
}
