import React, { Component, useState } from 'react';
import { Pressable, View, } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import { ScrollViews, Spacer, Wrapper, Text, TextInputs, Common, CheckBoxes, Icons, Buttons } from '../../../components';
import { appStyles, colors, sizes } from '../../../services';
import CountryPicker from 'react-native-country-picker-modal'
import { totalSize } from 'react-native-dimension';

export default function Index() {

    const [countryCode, setCountryCode] = useState('US')
    const [countryPhoneCode, setCountryPhoneCode] = useState('1')
    const [selectedWithdrawOption, setSelectedWithdrawOption] = useState('Master Card')

    const onSelect = (country) => {
        setCountryCode(country.cca2)
        setCountryPhoneCode(country.callingCode[0])
        // console.log('Phone Code==',country.callingCode[0])
    }

    const withdrawOptions = [
        {
            label: 'Master Card',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/2560px-Mastercard-logo.svg.png'
        },
        {
            label: 'Visa',
            logo: 'https://financefeeds.com/wp-content/uploads/2021/07/Visa_Inc._logo.svg.png'
        },
        {
            label: 'Paypal',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png'
        }
    ]
    return (
        <Wrapper isMain>
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer isBasic />
                <Spacer isSmall />
                <Wrapper isColored flexDirectionRow paddingVerticalBase alignItemsCenter justifyContentSpaceBetween style={[appStyles.shadow, { borderRadius: 5, backgroundColor: colors.appColor1 }]}>
                    <Text isRegular isWhite>Balance</Text>
                    <Text isSmallTitle isWhite>$34,430.00</Text>
                </Wrapper>
                <Spacer isBasic />
                <Spacer isSmall />
                <TextInputs.UnderlinedSecondary
                    titleStatic='Amount'
                    value='$4,000'
                    right={
                        <Wrapper isColored marginHorizontalZero marginVerticalTiny paddingVerticalZero paddingHorizontalTiny style={{ borderRadius: 5, }}>
                            <Wrapper flexDirectionRow alignItemsCenter>
                                <CountryPicker
                                    {...{
                                        countryCode,
                                        withFilter: true,
                                        withFlag: true,
                                        withCountryNameButton: false,
                                        withCallingCodeButton: false,
                                        withAlphaFilter: true,
                                        withCallingCode: true,
                                        withEmoji: true,
                                        onSelect,
                                    }}
                                // visible
                                />
                                <Wrapper>
                                    <Icon
                                        name='caret-up-sharp'
                                        type='ionicon'
                                        color={colors.appTextColor4}
                                        size={totalSize(1.5)}
                                    />
                                    <Icon
                                        name='caret-down-sharp'
                                        type='ionicon'
                                        color={colors.appTextColor4}
                                        size={totalSize(1.5)}
                                    />
                                </Wrapper>
                            </Wrapper>
                        </Wrapper>
                    }
                />
                <Spacer isBasic />
                <Spacer isSmall />
                {
                    withdrawOptions.map((item, index) => {
                        const is_selected = item.label === selectedWithdrawOption
                        return (
                            <Pressable
                            key={index}
                                onPress={() => setSelectedWithdrawOption(item.label)}
                            >
                                <Common.WrapperColoredShadow paddingVerticalTiny containerStyle={{ marginBottom: sizes.marginVertical }}>
                                    <Wrapper flexDirectionRow alignItemsCenter justifyContentSpaceBetween>
                                        <CheckBoxes.Primary
                                            text={item.label}
                                            checked={is_selected}
                                            uncheckedIconColor={colors.appTextColor1}
                                            checkedIconName='radiobox-marked'
                                        />
                                        <Icons.Custom
                                            icon={{ uri: item.logo }}
                                        />
                                    </Wrapper>
                                </Common.WrapperColoredShadow>
                            </Pressable>
                        )
                    })
                }
                <Spacer isBasic />
                <Spacer isSmall />
                <TextInputs.UnderlinedSecondary
                    title='Card Holder Name'
                    value='John Doe'
                />
                <Spacer isBasic />
                <TextInputs.UnderlinedSecondary
                    title='Card Number'
                    value='1234 5678 8912 3456'
                />
                <Spacer isBasic />
                <TextInputs.UnderlinedSecondary
                    title='CVC'
                    value='xxx'
                />
                <Spacer isBasic />
                <Spacer isSmall />
                <Buttons.ColoredSecondary
                    text='Withdraw'
                />
                <Spacer isDoubleBase />
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}
