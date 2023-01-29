import React, { Component, useState } from 'react';
import { View, } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { Buttons, Text, Headers, Icons, Modals, ScrollViews, Spacer, Spacers, TextInputs, Texts, Wrapper, Wrappers } from '../../../components';
import { Api, appIcons, colors, HelpingMethods, Validations } from '../../../services';



export default function Index({ navigation, route }) {

    const { goBack } = navigation
    // const code = route?.params?.code || null
    // console.log('code: ' + code)
    const email = route?.params?.email || null
    //console.log('email: ' + email)

    const [password, setpassword] = useState('')
    const [passwordError, setpasswordError] = useState('')
    const [otpCode, setOtpCode] = useState('')
    const [otpCodeError, setOtpCodeError] = useState('')
    const [loadingReset, setloadingReset] = useState(false)
    const [isConfirmationPopupVisible, setConfirmationPopupVisibility] = useState(false)

    const toggleConfirmationPopup = () => setConfirmationPopupVisibility(!isConfirmationPopupVisible)

    const handleOnChangepasswordText = (text) => {
        if (passwordError) {
            HelpingMethods.handleAnimation()
            !text ? setpasswordError('') : setpasswordError('')
        }
        setpassword(text)
    }

    const validations = () => {
        HelpingMethods.handleAnimation()
        !password ? setpasswordError('Enter your new password') : (password.length < 6) ? setpasswordError('Password should be atleast 6 characters') : setpasswordError('')
        !otpCode ? setOtpCodeError('Enter otp code') : (otpCode.length < 4) ? setOtpCodeError('Otp code should be atleast 6 characters') : setOtpCodeError('')
        if (password.length >= 6 && otpCode.length === 4) {
            return true
        } else {
            return false
        }
    }
    const handleResetPassword = async () => {
        if (validations()) {
            setloadingReset(true)
            await Api.ResetPassword({ otp: otpCode, password }).
                then(res => {
                    if (res) {
                        toggleConfirmationPopup()
                    }
                })
            setTimeout(() => {
                setloadingReset(false)
            }, 250);
        }
    }
    return (
        <Wrapper isMain backgroundDark>
            <Headers.Primary
                title={'Reset Password'}
                showBackArrow
                invertColors
            />
            <ScrollViews.KeyboardAvoiding>
                <Spacer isDoubleBase />
                <Wrapper alignItemsCenter animation={'fadeInDown'}>
                    <Icons.Custom
                        icon={appIcons.security}
                        color={colors.appColor1}
                        size={width(50)}
                    />
                </Wrapper>
                <Spacer isBasic />
                <Wrapper marginHorizontalBase>
                    <Text isMedium isGray alignTextCenter>Enter the otp code that you have received on your email
                        <Text isMedium isWhite isBoldFont> {email} </Text>
                        and new password, then press
                        <Text isMedium isWhite isBoldFont> Reset </Text>
                        .</Text>
                </Wrapper>
                <Spacer isDoubleBase />

                <TextInputs.Underlined
                    title={'Otp Code'}
                    value={otpCode}
                    onChangeText={v => setOtpCode(v)}
                    error={otpCodeError}
                    keyboardType='number-pad'
                    invertColors
                />
                <Spacer isBasic />
                <TextInputs.Underlined
                    title={'New Password'}
                    value={password}
                    onChangeText={v => handleOnChangepasswordText(v)}
                    error={passwordError}
                    invertColors
                />

                <Spacer isBasic />

                <Spacer isDoubleBase />
                <Buttons.Colored
                    text={'Reset'}
                    onPress={handleResetPassword}
                    isLoading={loadingReset}
                />
            </ScrollViews.KeyboardAvoiding>
            <Modals.PopupPrimary
                visible={isConfirmationPopupVisible}
                toggle={toggleConfirmationPopup}
                //customIcon={appIcons.checkmark}
                iconName='check'
                //icon={<Icons.Custom icon={appIcons.checkmark} size={totalSize(10)} />}
                title="Your password has been reset successfuly"
                onPressButton1={() => {
                    toggleConfirmationPopup()
                    goBack()
                }}
                buttonText1={'Continue'}
                disableSwipe
                disableBackdropPress
            />
        </Wrapper>
    )
}
