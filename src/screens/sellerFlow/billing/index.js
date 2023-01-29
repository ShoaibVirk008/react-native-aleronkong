import React, { Component } from 'react';
import { View } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Common, ScrollViews, Wrapper, Text, Lines, Spacer, Buttons, Icons } from '../../../components';
import { appImages, appStyles, sizes } from '../../../services';

export default function Index() {
    return (
        <Wrapper isMain>
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer isBasic />
                <Spacer isTiny />
                <Common.TitleInfoTertiary
                    title={'Payment methods'}
                />
                <Spacer isBasic />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray>Manage how you pay your bills in Shopify.</Text>
                    <Spacer isSmall />
                    <Spacer isTiny />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isSmall />
                    <Spacer isTiny />
                    <Text isSmall isTextColor2>Default payment methods</Text>
                    <Spacer isSmall />
                    <Text isSmall isGray>Add a payment method for purchases and bills in Shopify.</Text>
                    <Spacer isBasic />
                    <Buttons.BorderedSecondary
                        text='Add Payment Method'
                        buttonStyle={[appStyles.marginHorizontalZero]}
                    />
                    <Spacer isSmall />
                </Common.WrapperColoredBorderedShadow>

                <Spacer isBasic />
                <Spacer isTiny />
                <Common.TitleInfoTertiary
                    title={'Billing currency'}
                />
                <Spacer isBasic />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray>Your current billing currency is set to
                        {' '}
                        <Text isMediumFont>USD (US Dollar)</Text>
                        .</Text>
                </Common.WrapperColoredBorderedShadow>

                <Spacer isBasic />
                <Spacer isTiny />
                <Common.TitleInfoTertiary
                    title={'Subscriptions'}
                    info='View All'
                    onPressInfo={() => { }}
                />
                <Spacer isBasic />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray>An overview of items that you’re billed for regularly, like your subscription and apps with recurring charges.</Text>
                    <Spacer isSmall />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isBasic />
                    <Text isSmall isTextColor2 >Recent subscriptions</Text>
                    <Icons.WithText
                        customIcon={appImages.logo_invert}
                        title='Your trial ends on 23 May 2022'
                        text={'Trial'}
                        iconSize={totalSize(2.5)}
                        containerStyle={[appStyles.alignItemsFlexStart]}
                        titleStyle={[appStyles.textTiny, appStyles.textGray]}
                        textStyle={[appStyles.textSmall, appStyles.textColor3]}
                        textContainerStyle={{ marginTop: totalSize(0.5) }}
                    />
                </Common.WrapperColoredBorderedShadow>

                <Spacer isBasic />
                <Spacer isTiny />
                <Common.TitleInfoTertiary
                    title={'Bills'}
                />
                <Spacer isBasic />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray>Your monthly bill is on a 30-day cycle. It includes your Shopify subscription, app charges, shipping labels, and transaction fees.</Text>
                    <Spacer isSmall />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isBasic />
                    <Text isSmall isTextColor2>Current billing cycle: Billed on 23 May 2022</Text>
                    <Spacer isSmall />
                    <Text isTiny isGray>If you reach $60.00 USD in fees before the end of your billing cycle, a fee threshold bill will be issued automatically.</Text>
                    <Spacer isBasic />
                    <Common.TitleInfoSecondary
                        title={'Subscription Charges'}
                        info='$0.00'
                        titleStyle={[appStyles.textTiny, appStyles.textColor3]}
                        infoStyle={[appStyles.textTiny, appStyles.textGray]}
                        marginHorizontalZero
                    />
                    <Spacer isSmall />
                    <Lines.Horizontal />
                    <Spacer isSmall />
                    <Common.TitleInfoSecondary
                        title={'Running Total'}
                        info='S0.00 USD'
                        titleStyle={[appStyles.textTiny, appStyles.textColor3]}
                        infoStyle={[appStyles.textTiny, appStyles.textGray]}
                        marginHorizontalZero
                    />
                    <Spacer isBasic />
                    <Buttons.BorderedSecondary
                        text='View Details'
                        buttonStyle={[appStyles.marginHorizontalZero]}
                    />
                    <Spacer isSmall />
                </Common.WrapperColoredBorderedShadow>

                <Spacer isBasic />
                <Spacer isTiny />
                <Common.TitleInfoTertiary
                    title={'Statement of charges'}
                // info='View All'
                // onPressInfo={() => { }}
                />
                <Spacer isBasic />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray lineHeight={totalSize(2)}>View summaries of your Shopify charges, which include your Shopify subscription, app charges, shipping labels, and transaction fees.</Text>
                    <Spacer isSmall />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isBasic />
                    <Text isSmall isTextColor2>Statement of charges</Text>
                    <Spacer isSmall />
                    <Text isSmall isGray>View summaries of your charges.</Text>
                    <Spacer isBasic />
                    <Buttons.BorderedSecondary
                        text='View Statement of Charges'
                        buttonStyle={[appStyles.marginHorizontalZero]}
                    />
                    <Spacer isSmall />
                </Common.WrapperColoredBorderedShadow>

                <Spacer isDoubleBase />
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}



