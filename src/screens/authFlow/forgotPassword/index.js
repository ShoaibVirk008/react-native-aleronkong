import React, { Component, useState } from 'react';
import { View, } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { Buttons, Text, Headers, Icons, Modals, ScrollViews, Spacer, Spacers, TextInputs, Texts, Wrapper, Wrappers } from '../../../components';
import { Api, appIcons, colors, HelpingMethods, routes, Validations } from '../../../services';



export default function Index({ navigation }) {

    const { goBack,replace } = navigation
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [loadingSendLink, setloadingSendLink] = useState(false)
    const [isConfirmationPopupVisible, setConfirmationPopupVisibility] = useState(false)

    const toggleConfirmationPopup = () => setConfirmationPopupVisibility(!isConfirmationPopupVisible)

    const handleOnChangeEmailText = (text) => {
        if (emailError) {
            HelpingMethods.handleAnimation()
            !text ? setEmailError('') : setEmailError('')
        }
        setEmail(text)
    }

    const validations = () => {
        HelpingMethods.handleAnimation()
        !email ? setEmailError('Enter your email') : !Validations.validateEmail(email) ? setEmailError('Format is invalid') : setEmailError('')
        if (Validations.validateEmail(email)) {
            return true
        } else {
            return false
        }
    }
    const handleSendPasswordResetLink = async () => {
        if (validations()) {
            setloadingSendLink(true)
            await Api.SendForgotPasswordLink({ email }).
                then(res => {
                    if (res) {
                        toggleConfirmationPopup()
                    }
                })
            setTimeout(() => {
                setloadingSendLink(false)
            }, 250);
        }
    }
    return (
        <Wrapper isMain backgroundDark>
            <Headers.Primary
                title={'Forgot Password'}
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
                <Spacer isDoubleBase />
                <TextInputs.Underlined
                    title={'Email'}
                    value={email}
                    onChangeText={v => handleOnChangeEmailText(v)}
                    error={emailError}
                    invertColors
                />
                <Spacer isBasic />
                <Spacer isBasic />
                <Wrapper marginHorizontalBase>
                    <Text isMedium isGray >An email will be sent to you with the otp code with that you can reset your password.</Text>
                </Wrapper>
                <Spacer isDoubleBase />
                <Buttons.Colored
                    text={'Submit'}
                    onPress={handleSendPasswordResetLink}
                    isLoading={loadingSendLink}
                />
            </ScrollViews.KeyboardAvoiding>
            <Modals.PopupPrimary
                visible={isConfirmationPopupVisible}
                toggle={toggleConfirmationPopup}
                //customIcon={appIcons.checkmark}
                iconName='check'
                //icon={<Icons.Custom icon={appIcons.checkmark} size={totalSize(10)} />}
                title={`A code has been sent to your email ${email} for reset your password`}
                onPressButton1={() => {
                    toggleConfirmationPopup()
                    replace(routes.resetPassword,{email})
                    //goBack()
                }}
                buttonText1={'Continue'}
                disableSwipe
                disableBackdropPress
            />
        </Wrapper>
    )
}
