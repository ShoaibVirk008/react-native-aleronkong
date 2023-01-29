import React, { Component } from 'react';
import { View, } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { CheckBoxes, Common, ScrollViews, Spacer, Wrapper, Text, TextInputs, Buttons } from '../../../components';
import { appStyles } from '../../../services';

export default function Index() {
    return (
        <Wrapper isMain>
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer isBasic />
                <Spacer isSmall />
                <Common.TitleInfoTertiary
                    title='Customer accounts'
                />
                <Spacer isBasic />
                <Common.WrapperColoredBorderedShadow>
                    <CheckBoxRadio
                        checked={true}
                        title="Don't use accounts"
                        text="Customers will only be able to check out as guests."
                    />
                    <Spacer isBasic />
                    <CheckBoxRadio
                        checked={false}
                        title="Accounts are optional"
                        text="Customers can create accounts or checkout as guests."
                    />
                    <Spacer isBasic />
                    <CheckBoxRadio
                        checked={false}
                        title="Accounts are required"
                        text="Customers must create an account when they check out."
                    />
                </Common.WrapperColoredBorderedShadow>

                <Spacer isBasic />
                <Spacer isSmall />
                <Common.TitleInfoTertiary
                    title='Customer contact method'
                />
                <Spacer isBasic />
                <Common.WrapperColoredBorderedShadow>
                    <CheckBoxRadio
                        checked={true}
                        title="Phone number or email"
                        text="Customers who use a phone number will get order updates by SMS and might not leave an email."
                    />
                    <Spacer isBasic />
                    <CheckBoxes.Secondary
                        checked={false}
                        text="Email"
                    //containerStyle={[appStyles.alignItemsCenter]}
                    // text="Customers can create accounts or checkout as guests."
                    />
                    <Spacer isBasic />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isBasic />
                    <Text isSmall isGray>Select how customers can choose to get shipping updates.</Text>
                    <Spacer isSmall />
                    <CheckBoxes.Square
                        checked={false}
                        text="SMS or email"
                    />
                    <Spacer isSmall />
                    <CheckBoxes.Square
                        checked={false}
                        text="Show a link to download the Shop App"
                    />
                </Common.WrapperColoredBorderedShadow>

                <Spacer isBasic />
                <Spacer isSmall />
                <Common.TitleInfoTertiary
                    title='Customer information'
                />
                <Spacer isBasic />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray>Full name</Text>
                    <Spacer isSmall />
                    <CheckBoxes.Secondary
                        checked={false}
                        text="Only require last name"
                    />
                    <Spacer isSmall />
                    <CheckBoxes.Secondary
                        checked={true}
                        text="Require first and last name"
                    />
                    <Spacer isBasic />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isBasic />
                    <Text isSmall isGray>Company name</Text>
                    <Spacer isSmall />
                    <CheckBoxes.Secondary
                        checked={false}
                        text="O Don't include"
                    />
                    <Spacer isSmall />
                    <CheckBoxes.Secondary
                        checked={true}
                        text="Optional"
                    />
                    <Spacer isSmall />
                    <CheckBoxes.Secondary
                        checked={true}
                        text="Required"
                    />
                    <Spacer isBasic />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isBasic />
                    <Text isSmall isGray>Address line 2 (apartment, unit, etc.)</Text>
                    <Spacer isSmall />
                    <CheckBoxes.Secondary
                        checked={false}
                        text="Don't include"
                    />
                    <Spacer isSmall />
                    <CheckBoxes.Secondary
                        checked={false}
                        text="Optional"
                    />
                    <Spacer isSmall />
                    <CheckBoxes.Secondary
                        checked={true}
                        text="Required"
                    />
                    <Spacer isBasic />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isBasic />
                    <Text isSmall isGray>Shipping address phone number</Text>
                    <Spacer isSmall />
                    <CheckBoxes.Secondary
                        checked={false}
                        text="Don't include"
                    />
                    <Spacer isSmall />
                    <CheckBoxes.Secondary
                        checked={false}
                        text="Optional"
                    />
                    <Spacer isSmall />
                    <CheckBoxes.Secondary
                        checked={true}
                        text="Required"
                    />
                </Common.WrapperColoredBorderedShadow>

                <Spacer isBasic />
                <Spacer isSmall />
                <Common.TitleInfoTertiary
                    title='Tipping'
                />
                <Spacer isBasic />
                <Common.WrapperColoredBorderedShadow>
                    <CheckBoxes.Square
                        checked={false}
                        text="Show tipping options at checkout"
                    />
                </Common.WrapperColoredBorderedShadow>

                <Spacer isBasic />
                <Spacer isSmall />
                <Common.TitleInfoTertiary
                    title='Order processing'
                />
                <Spacer isBasic />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray>While the customer is checking out</Text>
                    <Spacer isBasic />
                    <CheckBoxSquare
                        checked={false}
                        title="Use the shipping address as the billing address by default"
                        text="The billing address can still be edited."
                    />
                    <Spacer isBasic />
                    <CheckBoxSquare
                        checked={false}
                        title="Use address autocompletion"
                        text="Offer suggestions when customers enter their address."
                    />
                    <Spacer isBasic />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isBasic />
                    <Text isSmall isGray>After an order has been paid</Text>
                    <Spacer isSmall />
                    <CheckBoxes.Secondary
                        text="Automatically fulfill the order's line items"
                        checked={false}
                    />
                    <Spacer isSmall />
                    <CheckBoxes.Secondary
                        text="Automatically fulfill only the gift cards of the order"
                        checked={false}
                    />
                    <Spacer isSmall />
                    <CheckBoxes.Secondary
                        text="Don't fulfill any of the order's line items automatically"
                        checked={true}
                    />
                    <Spacer isBasic />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isBasic />
                    <Text isSmall isGray>After an order has been fulfilled and paid, or when all items have been refunded</Text>
                    <Spacer isBasic />
                    <CheckBoxSquare
                        checked={false}
                        title="Automatically archive the order"
                        text="The order will be removed from your list of open orders."
                    />
                </Common.WrapperColoredBorderedShadow>

                <Spacer isBasic />
                <Spacer isSmall />
                <Common.TitleInfoTertiary
                    title='Consent for marketing'
                />
                <Spacer isBasic />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray>Let customers subscribe to marketing methods at checkout.</Text>
                    <Spacer isBasic />
                    <CheckBoxes.Square
                        checked={false}
                        text="Email marketing"
                    />
                    <Spacer isSmall />
                    <CheckBoxes.Square
                        checked={false}
                        text="SMS marketing"
                    />
                </Common.WrapperColoredBorderedShadow>

                <Spacer isBasic />
                <Spacer isSmall />
                <Common.TitleInfoTertiary
                    title='Order status page'
                />
                <Spacer isBasic />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray>Add tracking scripts and other customizations.</Text>
                    <Spacer isBasic />
                    <Text isSmallPlus isGray>Additional scripts</Text>
                    <Spacer isSmall />
                    <TextInputs.Bordered
                        containerStyle={[appStyles.marginHorizontalZero, { borderRadius: 5 }]}
                        value="Lore Ipsum is simply dummy text of the printing and
                   typesetting industry. Lorem Ipsum has been the
                   industry's standard dummy text ever since the 1500s,
                   when an unknown printer took a galley of type and
                   scrambled it to make a type specimen book."
                        inputStyle={[{ height: height(12), lineHeight: totalSize(2) }, appStyles.textSmall, appStyles.textColor2, appStyles.marginVerticalTiny]}
                        multiline
                    />
                </Common.WrapperColoredBorderedShadow>

                <Spacer isBasic />
                <Spacer isSmall />
                <Common.TitleInfoTertiary
                    title='Checkout language'
                />
                <Spacer isBasic />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray>Your store's checkout page is displayed in
                        {' '}
                        <Text isMediumFont isDarkGray>English</Text>
                    </Text>
                    <Spacer isBasic />
                    <Buttons.BorderedSecondary
                        text='Manage checkout language'
                        buttonStyle={[appStyles.marginHorizontalZero]}
                    />
                </Common.WrapperColoredBorderedShadow>
                <Spacer isSmall />
                <Spacer isBasic />
                <Buttons.ColoredSecondary
                    text='Save'
                />
                <Spacer isDoubleBase />
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}


const CheckBoxRadio = ({ ...props }) => {
    return (
        <CheckBoxes.Secondary
            titleStyle={[appStyles.textSmall]}
            textStyle={[appStyles.textTiny, appStyles.textGray]}
            containerStyle={[appStyles.alignItemsFlexStart]}
            textContainerStyle={{ flex: 1, }}
            {...props}
        />
    )
}

const CheckBoxSquare = ({ ...props }) => {
    return (
        <CheckBoxes.Square
            titleStyle={[appStyles.textSmall]}
            textStyle={[appStyles.textTiny, appStyles.textGray]}
            containerStyle={[appStyles.alignItemsFlexStart]}
            textContainerStyle={{ flex: 1, }}
            {...props}
        />
    )
}