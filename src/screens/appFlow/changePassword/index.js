import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { Buttons, ScrollViews, Spacer, TextInputs, Wrapper, Toasts, Headers, StatusBars } from '../../../components';
import { Api, appStyles, async_consts, colors, HelpingMethods, sizes } from '../../../services';

export default function Index(props) {
    const { goBack } = props.navigation
    //local states
    const [CurrentPassowrd, setCurrentPassword] = useState('')
    const [NewPassowrd, setNewPassword] = useState('')
    const [ConfirmNewPassowrd, setConfirmNewPassword] = useState('')
    const [CurrentPassowrdError, setCurrentPasswordError] = useState('')
    const [NewPassowrdError, setNewPasswordError] = useState('')
    const [ConfirmNewPassowrdError, setConfirmNewPasswordError] = useState('')
    const [loading, setLoading] = useState(false)

    const [isCurrentPassowrdVisible, setCurrentPasswordVisibility] = useState(false)
    const [isNewPassowrdVisible, setNewPasswordVisibility] = useState(false)
    const [isConfirmNewPassowrdVisible, setConfirmNewPasswordVisibility] = useState(false)

    const handleOnChangeCurrentPasswordText = (text) => {
        HelpingMethods.handleAnimation()
        !text ? setCurrentPasswordError('') : text.length < 6 ? setCurrentPasswordError('Atleast 6 characters') : setCurrentPasswordError('')
        setCurrentPassword(text)
    }
    const handleOnChangeNewPasswordText = (text) => {
        HelpingMethods.handleAnimation()
        !text ? setNewPasswordError('') : text.length < 6 ? setNewPasswordError('Atleast 6 characters') : setNewPasswordError('')
        setNewPassword(text)
    }
    const handleOnChangeConfirmNewPasswordText = (text) => {
        HelpingMethods.handleAnimation()
        !text ? setConfirmNewPasswordError('') : text.length < 6 ? setConfirmNewPasswordError('Atleast 6 characters') : text != NewPassowrd ? setConfirmNewPasswordError('Not matching with New Passowrd') : setConfirmNewPasswordError('')
        setConfirmNewPassword(text)
    }
    const validations = () => {
        HelpingMethods.handleAnimation()
        !CurrentPassowrd ? setCurrentPasswordError('Enter your Current Passowrd') : CurrentPassowrd.length < 6 ? setCurrentPasswordError('Atleast 6 characters') : setCurrentPasswordError('')
        !NewPassowrd ? setNewPasswordError('Enter your New Passowrd') : NewPassowrd.length < 6 ? setNewPasswordError('Atleast 6 characters') : setNewPasswordError('')
        !ConfirmNewPassowrd ? setConfirmNewPasswordError('Confirm your New Password') : ConfirmNewPassowrd.length < 6 ? setConfirmNewPasswordError('Atleast 6 characters') : ConfirmNewPassowrd != NewPassowrd ? setConfirmNewPasswordError('Not matching with New Password') : setConfirmNewPasswordError('')
        if (CurrentPassowrd.length >= 6 && NewPassowrd.length >= 6 && ConfirmNewPassowrd.length >= 6 && NewPassowrd === ConfirmNewPassowrd) {
            return true
        } else {
            return false
        }
    }

    const handleSaveChanges = async () => {
        if (validations()) {
            setLoading(true);
            await Api.changePassword({ newPassword: NewPassowrd, oldPassword: CurrentPassowrd }).
                then(async res => {
                    if (res) {
                        const user_credentials = await AsyncStorage.getItem(async_consts.user_credentials)
                        if (user_credentials) {
                            let user_credentials_parsed = JSON.parse(user_credentials)
                            user_credentials_parsed = { ...user_credentials_parsed, password: NewPassowrd }
                            await AsyncStorage.setItem(async_consts.user_credentials, JSON.stringify(user_credentials_parsed))
                        }
                        goBack()
                        Toasts.Success('Password Changed successfuly')
                    }
                })
            setLoading(false)
            // setTimeout(() => {
            //     goBack()
            //     Toasts.Success('Password Changed')
            //     setLoading(false)
            // }, 1000);
        }
    }

    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'Change Password'}
                showBackArrow
            />

            <ScrollViews.WithKeyboardAvoidingView
                footer={
                    <Wrapper>
                        <Spacer isBasic />
                        <Wrapper marginHorizontalSmall>
                            <Buttons.Colored
                                text="Save Changes"
                                shadow
                                onPress={handleSaveChanges}
                                isLoading={loading}
                            />
                        </Wrapper>
                        <Spacer isBasic />
                    </Wrapper>
                }
            >
                <Spacer isBasic />
                <Spacer isBasic />
                <Wrapper >
                    <TextInputs.Underlined
                        title="Current Password"
                        value={CurrentPassowrd}
                        onChangeText={handleOnChangeCurrentPasswordText}
                        error={CurrentPassowrdError}
                        inputStyle={{ letterSpacing: totalSize(1) }}
                        secureTextEntry={!isCurrentPassowrdVisible}
                        iconNameRight={"eye-outline"}
                        iconTypeRight="ionicon"
                        iconColorRight={isCurrentPassowrdVisible ? colors.appColor1 : colors.appTextColor5}
                        onPressIconRight={() => setCurrentPasswordVisibility(!isCurrentPassowrdVisible)}
                    />
                    <Spacer isBasic />
                    <TextInputs.Underlined
                        title="New Password"
                        value={NewPassowrd}
                        onChangeText={handleOnChangeNewPasswordText}
                        error={NewPassowrdError}
                        inputStyle={{ letterSpacing: totalSize(1) }}
                        secureTextEntry={!isNewPassowrdVisible}
                        iconNameRight={"eye-outline"}
                        iconTypeRight="ionicon"
                        iconColorRight={isNewPassowrdVisible ? colors.appColor1 : colors.appTextColor5}
                        onPressIconRight={() => setNewPasswordVisibility(!isNewPassowrdVisible)}
                    />
                    <Spacer isBasic />
                    <TextInputs.Underlined
                        title="Confirm New Password"
                        value={ConfirmNewPassowrd}
                        onChangeText={handleOnChangeConfirmNewPasswordText}
                        error={ConfirmNewPassowrdError}
                        inputStyle={{ letterSpacing: totalSize(1) }}
                        secureTextEntry={!isConfirmNewPassowrdVisible}
                        iconNameRight={"eye-outline"}
                        iconTypeRight="ionicon"
                        iconColorRight={isConfirmNewPassowrdVisible ? colors.appColor1 : colors.appTextColor5}
                        onPressIconRight={() => setConfirmNewPasswordVisibility(!isConfirmNewPassowrdVisible)}
                    />
                </Wrapper>
            </ScrollViews.WithKeyboardAvoidingView>

        </Wrapper>
    );
}

