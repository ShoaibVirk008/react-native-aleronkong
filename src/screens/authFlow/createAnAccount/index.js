import React, { Component, useEffect, useState } from 'react';
import { View } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { Buttons, CheckBoxes, Headers, Icons, Modals, ScrollViews, Spacer, TextInputs, Wrapper, Text, Toasts } from '../../../components';
import { navigate } from '../../../navigation/rootNavigation';
import { Api, appIcons, appStyles, colors, HelpingMethods, routes, Validations } from '../../../services';



export default function Index({ navigation }) {

    const { goBack } = navigation
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isPasswordVisible, setPasswordVisibility] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isConfirmPasswordVisible, setConfirmPasswordVisibility] = useState(false)
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [loadingSignup, setloadingSignup] = useState(false)
    const [acceptTermCon, setAcceptTermCon] = useState(false)
    // const [isConfirmationPopupVisible, setConfirmationPopupVisibility] = useState(false)

    // const toggleConfirmationPopup = () => setConfirmationPopupVisibility(!isConfirmationPopupVisible)

    useEffect(() => {
        //HelpingMethods.checkNotificationPermission()
    }, [])
    const handleOnChangeEmailText = (text) => {
        if (emailError) {
            HelpingMethods.handleAnimation()
            !text ? setEmailError('') : setEmailError('')
        }
        setEmail(text)
    }

    const handleOnChangePasswordText = (text) => {
        if (passwordError) {
            HelpingMethods.handleAnimation()
            !text ? setPasswordError('') : setPasswordError('')
        }
        setPassword(text)
    }

    const handleOnChangeConfirmPasswordText = (text) => {
        if (confirmPasswordError) {
            HelpingMethods.handleAnimation()
            !text ? setConfirmPasswordError('') : setConfirmPasswordError('')
        }
        setConfirmPassword(text)
    }

    const validations = () => {
        HelpingMethods.handleAnimation()
        !email ? setEmailError('Enter your email') : !Validations.validateEmail(email) ? setEmailError('Format is invalid') : setEmailError('')
        !password ? setPasswordError('Enter your password') : password.length < 6 ? setPasswordError('Password should be atleast 6 characters') : setPasswordError('')
        !confirmPassword ? setConfirmPasswordError('Enter confirm password') : confirmPassword != password ? setConfirmPasswordError('Password not matched') : setConfirmPasswordError('')
        if (password.length >= 6 && password === confirmPassword && Validations.validateEmail(email)) {
            if (acceptTermCon) {
                return true
            } else {
                Toasts.Error('Please accept terms and conditions')
            }
        } else {
            return false
        }
    }

    const handleSignup = async () => {
        if (validations()) {
            setloadingSignup(true)
            await Api.CheckEmail({ email }).
                then(res => {
                    if (res) {
                        navigate(routes.setupProfile, { data: { email, password } })
                    }
                })
            setloadingSignup(false)
        }
    }

    return (
        <Wrapper isMain backgroundDark>
            <Headers.Primary
                title={'Create an account'}
                showBackArrow
                invertColors
            />
            <ScrollViews.WithKeyboardAvoidingView
                footer={
                    <>
                        <Spacer isSmall />
                        <Buttons.Colored
                            text={'Register'}
                            onPress={handleSignup}
                            isLoading={loadingSignup}
                        />
                        <Spacer isBasic />
                    </>
                }
            >
                <Spacer isDoubleBase />
                <TextInputs.Underlined
                    title={'Email'}
                    value={email}
                    onChangeText={v => handleOnChangeEmailText(v)}
                    error={emailError}
                    invertColors
                    keyboardType='email-address'
                />
                <Spacer isBasic />
                <TextInputs.Underlined
                    title={'Password'}
                    value={password}
                    onChangeText={v => handleOnChangePasswordText(v)}
                    error={passwordError}
                    iconNameRight='eye'
                    iconTypeRight={'feather'}
                    iconColorRight={isPasswordVisible ? colors.appColor1 : colors.appTextColor4}
                    secureTextEntry={!isPasswordVisible}
                    onPressIconRight={() => setPasswordVisibility(!isPasswordVisible)}
                    invertColors
                />
                <Spacer isBasic />
                <TextInputs.Underlined
                    title={'Confirm Password'}
                    value={confirmPassword}
                    onChangeText={v => handleOnChangeConfirmPasswordText(v)}
                    error={confirmPasswordError}
                    iconNameRight='eye'
                    iconTypeRight={'feather'}
                    iconColorRight={isConfirmPasswordVisible ? colors.appColor1 : colors.appTextColor4}
                    secureTextEntry={!isConfirmPasswordVisible}
                    onPressIconRight={() => setConfirmPasswordVisibility(!isConfirmPasswordVisible)}
                    invertColors
                />
                <Spacer isBasic />
                <Wrapper marginHorizontalBase>
                    <CheckBoxes.Primary
                        text={
                            <Text
                                isRegular isWhite>Accept
                                {' '}
                                <Text
                                    isRegular
                                    isBoldFont
                                    isWhite
                                    onPress={() => navigate(routes.app, { screen: routes.termsConditions, params: { theme: 'dark' } })}
                                >Terms and Conditions</Text>
                            </Text>}
                        checked={acceptTermCon}
                        onPress={() => setAcceptTermCon(!acceptTermCon)}
                    />
                </Wrapper>

            </ScrollViews.WithKeyboardAvoidingView>
            {/* <Modals.PopupPrimary
                visible={isConfirmationPopupVisible}
                toggle={toggleConfirmationPopup}
                //customIcon={appIcons.checkmark}
                icon={<Icons.Custom icon={appIcons.checkmark} size={totalSize(10)} />}
                title="A link has been sent to your email to reset your password"
                onPressButton1={() => {
                    toggleConfirmationPopup()
                    goBack()
                }}
                buttonText1={'Continue'}
                disableSwipe
                disableBackdropPress
            /> */}
        </Wrapper>
    )
}
