import React, { Component } from 'react';
import { View, } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { ScrollViews, Wrapper, Text, Spacer, Common, Buttons, Icons, CheckBoxes } from '../../../components';
import { appStyles } from '../../../services';

export default function Index() {
    return (
        <Wrapper isMain>
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer isBasic />
                <Common.TitleInfoTertiary
                    title='Store Owner'
                    info='Transfer Ownership'
                    onPressInfo={() => { }}
                />
                <Spacer isSmall />
                <Spacer isTiny />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray lineHeight={totalSize(2)}>Store owners have some permissions that can't be assig to staff.</Text>
                    <Spacer isSmall />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isSmall />
                    <Wrapper flexDirectionRow alignItemsCenter>
                        <Icons.Button
                            text={'JD'}
                            buttonColor={'#EDF8F9'}
                            isRound
                            textStyle={[appStyles.textRegular, appStyles.fontMedium]}
                            buttonSize={totalSize(4.25)}
                        />
                        <Wrapper flex={0.03} />
                        <Wrapper flex={1}>
                            <Text isXTiny isGray>Last login was Thursday, 12 May 2022 11:14 pm GMT+5</Text>
                            <Spacer isTiny />
                            <Text isSmall isTextColor3>John Doe</Text>
                        </Wrapper>
                    </Wrapper>
                </Common.WrapperColoredBorderedShadow>
                <Spacer isBasic />
                <Spacer isTiny />
                <Common.TitleInfoTertiary
                    title='Staff (0 of 2)'
                />
                <Spacer isSmall />
                <Spacer isTiny />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray lineHeight={totalSize(2)}>Customize what your staff members can edit and access. You can add up to 2 staff members on this plan.</Text>
                    <Spacer isBasic />
                    <Buttons.BorderedSecondary
                        text='Add Staff'
                        buttonStyle={[appStyles.marginHorizontalZero]}
                    />
                </Common.WrapperColoredBorderedShadow>


                <Spacer isBasic />
                <Spacer isTiny />
                <Common.TitleInfoTertiary
                    title='Collaborators'
                />
                <Spacer isSmall />
                <Spacer isTiny />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray lineHeight={totalSize(2)}>These give designers, developers, and marketers access to your Aleron Kong admin. They don't count toward your staff limit.</Text>
                    <Spacer isSmall />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isSmall />
                    <CheckBoxes.Secondary
                        checked={true}
                        text={'Anyone can send a collaborator request'}
                        onPress={() => { }}
                        containerStyle={[appStyles.alignItemsFlexStart]}
                    />
                    <Spacer isSmall />
                    <CheckBoxes.Secondary
                        checked={false}
                        text={'Only people with a collaborator request code can send a collaborator request'}
                        onPress={() => { }}
                        textContainerStyle={{ flex: 1 }}
                        containerStyle={[appStyles.alignItemsFlexStart]}
                    />
                </Common.WrapperColoredBorderedShadow>

                <Spacer isBasic />
                <Spacer isTiny />
                <Common.TitleInfoTertiary
                    title='Login services'
                />
                <Spacer isSmall />
                <Spacer isTiny />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray lineHeight={totalSize(2)}>Allow staff to use external services to log in to App.</Text>
                    <Spacer isSmall />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isSmall />
                    <Common.TitleInfoTertiary
                        title='Google Apps'
                        info='Edit'
                        onPressInfo={() => { }}
                        titleStyle={[appStyles.textSmall]}
                        marginHorizontalZero
                    />
                    <Spacer isSmall />
                    <Text isSmall isGray>Disabled: Staff can't use Google Apps to log in</Text>
                </Common.WrapperColoredBorderedShadow>


                <Spacer isDoubleBase />
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}
