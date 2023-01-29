import React, { Component } from 'react';
import { View, } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Common, ScrollViews, Spacer, Wrapper, Text, Buttons } from '../../../components';
import { appStyles, colors } from '../../../services';

export default function Index() {
    const options = [
        {
            title: 'Payment providers',
            info: 'Providers that enable you to accept payment methods at a rate set by the third-party. An additional fee will apply to new orders once you ',
            button_text: 'Choose a provider'
        },
        {
            title: 'Supported payment methods',
            info: "Payment methods that are available with one of Aleron Kong's approved payment providers.",
            button_text: 'Add payment method'
        },
        {
            title: 'Manual payment methods',
            info: "Payments that are made outside your online store. When a customer selects a manual payment method such as cash on delivery, you'll need to approve their order before it can be fulfilled.",
            button_text: 'Add manual payment method'
        },
        {
            title: 'Payment capture',
            info: 'The customer’s payment method is authorized and charged automatically.',
            button_text: 'Manage'
        }
    ]
    return (
        <Wrapper isMain>
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer isBasic />
                <Spacer isSmall />
                {
                    options.map((item, index) => {
                        const { title, info, button_text } = item
                        return (
                            <>
                                <Common.WrapperColoredBorderedShadow key={index} containerStyle={[appStyles.marginVerticalSmall]}>
                                    <Wrapper flexDirectionRow justifyContentSpaceBetween>
                                        <Text isSmall isTextColor2>{title}</Text>
                                        {
                                            index === 3 ?
                                                <Buttons.ColoredSmallSecondary
                                                    text='Automatic'
                                                    buttonStyle={[{paddingVertical: height(0.3)}]}
                                                    backgroundColor={colors.appBgColor3}
                                                    onPress={()=>{}}
                                                   // textStyle={[appStyles.textTiny]}
                                                />
                                                :
                                                null
                                        }
                                    </Wrapper>
                                    <Spacer isSmall />
                                    <Text isSmall isGray lineHeight={totalSize(2.25)}>{info}
                                        {
                                            index === 0 ?
                                                <Text
                                                onPress={()=>{}}
                                                isSmall isPrimaryColor isUnderlined >select a plan.</Text>
                                                :
                                                null
                                        }
                                    </Text>
                                    <Spacer isBasic />
                                    <Buttons.BorderedSecondary
                                        text={button_text}
                                        buttonStyle={[appStyles.marginHorizontalZero]}
                                    />
                                </Common.WrapperColoredBorderedShadow>
                            </>
                        )
                    })
                }
                  <Spacer isDoubleBase />
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}
