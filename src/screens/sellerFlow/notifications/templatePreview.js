import React, { Component } from 'react';
import { View, } from 'react-native';
import { height } from 'react-native-dimension';
import { Icon, SearchBar } from 'react-native-elements';
import { Wrapper, Text, Common, Spacer, Buttons, Lines, ScrollViews } from '../../../components';
import { goBack } from '../../../navigation/rootNavigation';
import { appStyles, colors } from '../../../services';

export default function Index() {
    return (
        <Common.PopupWrappers.Main
            toggle={goBack}
            containerStyle={{ ...appStyles.paddingVerticalBase, paddingBottom: 0, height: height(90) }}
        >
            <Wrapper marginHorizontalBase flexDirectionRow alignItemsCenter>
                <Wrapper flex={1} />
                <Wrapper flex={8} alignItemsCenter>
                    <Text isTinyTitle>Preview</Text>
                </Wrapper>
                <Wrapper flex={1}>
                    <Icon
                        name='close'
                        type='font-awesome'
                        color={colors.appBgColor4}
                        onPress={goBack}
                    />
                </Wrapper>
            </Wrapper>
            <Spacer isBasic />
            <ScrollViews.WithKeyboardAvoidingView>
                <Wrapper marginHorizontalSmall >
                    <Common.WrapperColoredBorderedShadow
                        style={[appStyles.paddingHorizontalBase, appStyles.shadowExtraLight]}
                    >
                        <Text isSmallTitle isRegularFont isTextColor2>Aleron Kong</Text>
                        <Spacer isSmall />
                        <Text isSmall isGray>ORDER #9999</Text>
                        <Spacer isBasic />
                        <Spacer isSmall />
                        <Text isRegular isTextColor2>Thank you for your purchase!</Text>
                        <Spacer isSmall />
                        <Text isSmall isGray>Hi John, we're getting your order ready to be shipped. We will notify you when it has been sent.</Text>
                        <Spacer isBasic />
                        <Buttons.ColoredSecondary
                            text='View your order'
                            buttonStyle={[appStyles.marginHorizontalZero]}
                        />
                        <Spacer isBasic />
                        <Spacer isSmall />
                        <Text isRegular isBoldFont>Order summary</Text>
                        <Spacer isBasic />
                        <Common.TitleInfoSecondary
                            title={'Aviator sunglasses × 1'}
                            info='$12'
                            marginHorizontalZero
                        />
                        <Spacer isBasic />
                        <Common.TitleInfoSecondary
                            title={'Mid-century lounger × 1'}
                            info='$20'
                            marginHorizontalZero
                        />
                        <Spacer isBasic />
                        <Lines.Horizontal />
                        <Spacer isBasic />
                        <Common.TitleInfoSecondary
                            title={'Sub-total'}
                            info='$22'
                            marginHorizontalZero
                        />
                        <Spacer isBasic />
                        <Common.TitleInfoSecondary
                            title={'Shipping'}
                            info='$01'
                            marginHorizontalZero
                        />
                        <Spacer isBasic />
                        <Common.TitleInfoSecondary
                            title={'Tax'}
                            info='$0'
                            marginHorizontalZero
                        />
                        <Spacer isBasic />
                        <Spacer isSmall />
                        <Common.TitleInfoSecondary
                            title={'Total'}
                            info='$023'
                            titleStyle={[appStyles.fontBold]}
                            infoStyle={[appStyles.fontBold]}
                            marginHorizontalZero
                        />
                    </Common.WrapperColoredBorderedShadow>
                    <Spacer isBasic />
                    <Wrapper marginHorizontalBase>
                        <Wrapper >
                            <Text isRegular isBoldFont>Shipping address</Text>
                            <Spacer isTiny />
                            <Text isSmall >Steve Shipper</Text>
                            <Spacer isTiny />
                            <Text isSmall >Shipping Company</Text>
                            <Spacer isTiny />
                            <Text isSmall >123 Shipping Street</Text>
                            <Spacer isTiny />
                            <Text isSmall >Shippington KY 40003</Text>
                            <Spacer isTiny />
                            <Text isSmall >United States</Text>
                        </Wrapper> 
                        <Spacer isBasic />
                        <Wrapper >
                            <Text isRegular isBoldFont>Billing address</Text>
                            <Spacer isTiny />
                            <Text isSmall >Bob Biller</Text>
                            <Spacer isTiny />
                            <Text isSmall >My Company</Text>
                            <Spacer isTiny />
                            <Text isSmall >123 Shipping Street</Text>
                            <Spacer isTiny />
                            <Text isSmall >Shippington KY 40003</Text>
                            <Spacer isTiny />
                            <Text isSmall >United States</Text>
                        </Wrapper>
                        <Spacer isDoubleBase />
                    </Wrapper>
                </Wrapper>
            </ScrollViews.WithKeyboardAvoidingView>
        </Common.PopupWrappers.Main>

    )
}
