import React, { Component } from 'react';
import { View, } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { ScrollViews, Spacer, Wrapper, Text, Common, Lines, Buttons } from '../../../components';
import { TitleInfoSecondary } from '../../../components/common';
import { appStyles, colors } from '../../../services';

export default function Index() {
    return (
        <Wrapper isMain>
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer isBasic />
                <Spacer isTiny />
                <Common.TitleInfoTertiary
                    title={'Plan Details'}
                />
                <Spacer isBasic />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray lineHeight={totalSize(2)}>Manage or change your Aleron Kong plan. View our terms of service and privacy policy.</Text>
                    <Spacer isSmall />
                    <Spacer isTiny />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isBasic />
                    <Text isSmall isTextColor2>Trial</Text>
                    <Spacer isSmall />
                    <Text isSmall isGray>You are in a trial store.</Text>
                    <Spacer isBasic />
                    <Text isSmall isTextColor2>Next Billing Date</Text>
                    <Spacer isSmall />
                    <Text isSmall isGray>Your trial has 9 days remaining</Text>
                    <Spacer isBasic />
                    <Wrapper flexDirectionRow justifyContentSpaceBetween>
                        <Text isSmall isTextColor2>Payment Method</Text>
                        <Text isTiny isPrimaryColor isUnderlined>Update</Text>
                    </Wrapper>
                    <Spacer isSmall />
                    <Text isSmall isGray>No payment method added</Text>
                    <Spacer isSmall />
                </Common.WrapperColoredBorderedShadow>
                <Spacer isBasic />
                <Spacer isTiny />
                <Wrapper flexDirectionRow marginHorizontalBase>
                    <Wrapper flex={1}>
                        <Buttons.BorderedSecondary
                            text='Choose Plan'
                            buttonStyle={[appStyles.marginHorizontalZero]}
                        />
                    </Wrapper>
                    <Wrapper flex={0.1} />
                    <Wrapper flex={1}>
                        <Buttons.BorderedSecondary
                            text='Deactivate Trial'
                            buttonStyle={[appStyles.marginHorizontalZero]}
                            tintColor={colors.error2}
                            textStyle={{ color: colors.error2 }}
                        />
                    </Wrapper>
                </Wrapper>
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}
