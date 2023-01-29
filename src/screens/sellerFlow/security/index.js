import React, { Component } from 'react';
import { View, } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { Icon, SearchBar } from 'react-native-elements';
import { Common, ScrollViews, Spacer, Wrapper, Text, Buttons, Lines, Icons } from '../../../components';
import { appStyles, colors, sizes } from '../../../services';

export default function Index() {
    const devices = [1, 2]
    return (
        <Wrapper isMain >
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer isBasic />
                <Common.WrapperColoredBorderedShadow containerStyle={{ paddingBottom: sizes.marginVertical }}>
                    <Text isSmall isTextColor2>Password</Text>
                    <Spacer isSmall />
                    <Text isSmall isGray>You have never change your password.</Text>
                    <Spacer isBasic />
                    <Buttons.BorderedSecondary
                        text='Change your password'
                        buttonStyle={[appStyles.marginHorizontalZero]}
                    />
                </Common.WrapperColoredBorderedShadow>
                <Spacer isBasic />
                <Spacer isSmall />
                <Common.WrapperColoredBorderedShadow containerStyle={{ paddingBottom: sizes.marginVertical }}>
                    <Text isSmall isTextColor2>Secondary Email</Text>
                    <Spacer isSmall />
                    <Text isSmall isGray>You don't have secondary Email.</Text>
                    <Spacer isBasic />
                    <Buttons.BorderedSecondary
                        text='Add secondary email'
                        buttonStyle={[appStyles.marginHorizontalZero]}
                    />
                </Common.WrapperColoredBorderedShadow>
                <Spacer isBasic />
                <Spacer isSmall />
                <Common.WrapperColoredBorderedShadow containerStyle={{ paddingBottom: sizes.marginVertical }}>
                    <Text isSmall isTextColor2>Two-step Authentication</Text>
                    <Spacer isSmall />
                    <Text isSmall isGray>After entering your password, verify your identity with a authentication method.</Text>
                    <Spacer isBasic />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isBasic />
                    <Text isSmall isGray>After entering your password, verify your identity with a authentication method.</Text>
                    <Spacer isBasic />
                    <Text isSmall isTextColor2>How It Works</Text>
                    <Spacer isSmall />
                    <Spacer isTiny />
                    <Text isSmall isGray>1- Enter your email and password</Text>
                    <Spacer isSmall />
                    <Text isSmall isGray lineHeight={totalSize(2)}>2- Complete a second step to prove that it's you logging
                        in. You can enter a verification code, use a security key, or
                        confirm your login on a trusted device.</Text>
                    <Spacer isBasic />
                    <Buttons.BorderedSecondary
                        text='Turn on two step'
                        buttonStyle={[appStyles.marginHorizontalZero]}
                    />
                </Common.WrapperColoredBorderedShadow>
                <Spacer isBasic />
                <Spacer isSmall />
                <Devices
                    data={devices}
                    onPressLogout={() => { }}
                />
                <Spacer isBasic />
                <Spacer isSmall />
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}

const Devices = ({ data, onPressLogout }) => {
    return (
        <Common.WrapperColoredBorderedShadow containerStyle={{ paddingBottom: sizes.marginVertical }}>
            <Text isSmall isTextColor2>Devices</Text>
            <Spacer isSmall />
            <Text isSmall isGray>You're currently logged in to Shopify on these devices. If
                you don't recognize a device, log out to keep your account
                secure.</Text>
            <Spacer isBasic />
            {
                data.map((item, index) => {
                    return (
                        <Wrapper key={index}>
                            <Common.LineHorizontalInvertMargin />
                            <Wrapper flexDirectionRow paddingVerticalSmall>
                                <Icon
                                    name='laptop'
                                    color={colors.appColor1}
                                    size={totalSize(2.25)}
                                />
                                <Spacer isSmall horizontal />
                                <Wrapper flex={1}>
                                    <Spacer height={height(0.4)} />
                                    <Text isSmall isTextColor2>Chrome on Windows</Text>
                                    <Spacer isSmall />
                                    <Text isSmall isGray>May 9, 4:32 pm</Text>
                                    <Spacer isSmall />
                                    <Text isSmall isGray>California, USA</Text>
                                </Wrapper>
                                <Text isSmall isPrimaryColor isUnderlined>Logout</Text>
                            </Wrapper>
                        </Wrapper>
                    )
                })
            }
        </Common.WrapperColoredBorderedShadow>
    )
}