import React, { Component, useState, useRef } from 'react';
import { View, } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import { Wrapper, Text, Common, Spacer, TextInputs, ScrollViews, Buttons, Icons } from '../../../components';
import { colors, fontSize, HelpingMethods, routes, sizes } from '../../../services';
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { height, totalSize } from 'react-native-dimension';
import { navigate } from '../../../navigation/rootNavigation';

const topTabs = [{ label: 'Email Template' }, { label: 'SMS Template' },]

export default function Index() {
    const [selectedTopTabIndex, setTopTabIndex] = useState(0)
    const isEmailTemplate = selectedTopTabIndex === 0
    const isSmsTemplate = selectedTopTabIndex === 1
    const richText = useRef();
    const liquid_variables = ['shop.email_logo_url', 'shop.email_logo_width', 'shop.email_logo_width']
    return (
        <Wrapper isMain>
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer isBasic />
                <Wrapper flexDirectionRow>
                    <Wrapper flex={1}>
                        <Common.ButtonsGroupPrimary
                            data={topTabs}
                            initalIndex={selectedTopTabIndex}
                            onPressButton={(item, index) => {
                                HelpingMethods.handleAnimation()
                                setTopTabIndex(index)
                            }}
                        />
                    </Wrapper>
                    <Spacer width={sizes.marginHorizontal / 2} />
                    <Common.IconButtonBadge
                        iconName='eye'
                        onPress={() => navigate(routes.seller.notificationsTemplatePreview)}
                    />
                    <Spacer isSmall horizontal />
                    <Common.IconButtonBadge
                        iconName='save'
                        iconType='ionicon'
                        onPress={() => { }}
                    />
                    <Spacer width={sizes.marginHorizontal} />
                </Wrapper>
                <Spacer isBasic />
                <Spacer isSmall />
                {
                    isEmailTemplate ?
                        <>
                            <TextInputs.UnderlinedSecondary
                                title='Email Subject'
                                value='Order {{name}} confirmed'
                            />
                            <Spacer isBasic />
                            <Wrapper marginHorizontalBase>
                                <Text isInput isGray>Email body (HTML)</Text>
                            </Wrapper>
                            <Spacer isSmall />
                            <Wrapper isBorderedWrapper style={{ borderRadius: 5 }}>
                                <RichEditor
                                    ref={richText}
                                    onChange={descriptionText => {
                                        console.log("descriptionText:", descriptionText);
                                    }}
                                    style={{}}
                                    editorStyle={{}}
                                />
                            </Wrapper>
                            <Spacer isBasic />
                        </>
                        :
                        <>
                            <Wrapper marginHorizontalBase>
                                <Text isInput isGray>Content</Text>
                            </Wrapper>
                            <Spacer isSmall />
                            <TextInputs.Bordered
                                placeholder={'Write here...'}
                                multiline
                                inputStyle={{ height: height(50), fontSize: fontSize.small, textAlignVertical: 'top', marginVertical: sizes.marginVertical / 2 }}
                            />
                            <Spacer isBasic />
                            <Wrapper marginHorizontalBase>
                                <Text isSmall isGray>SMS templates cannot be edited. Learn more about</Text>
                                <Spacer isSmall />
                                <Text isSmall isPrimaryColor isUnderlined>SMS Notification</Text>
                            </Wrapper>
                            <Spacer isBasic />
                        </>
                }

                <Buttons.BorderedSecondary
                    text={'Revert to default'}
                />
                <Spacer isBasic />
                <Spacer isSmall />
                {
                    isEmailTemplate ?
                        <Wrapper marginHorizontalBase>
                            <Text isSmall isBoldFont>Liquid variable</Text>
                            <Spacer isSmall />
                            <Text isTiny isGray>You can use liquid variables to output an accent colour and logo image in your templates. The available variables are:</Text>
                            <Spacer isBasic />
                            {
                                liquid_variables.map((item, index) => {
                                    return (
                                        <Wrapper key={index} flexDirectionRow alignItemsCenter style={{ marginBottom: sizes.marginVertical / 2 }}>
                                            <Icon
                                                name='circle'
                                                size={totalSize(1)}
                                                color={colors.appTextColor4}
                                            />
                                            <Wrapper
                                                isBorderedWrapper
                                                paddingHorizontalSmall
                                                paddingVerticalTiny
                                                background2
                                                marginHorizontalSmall
                                                style={{ borderRadius: 5 }}>
                                                <Text>{item}</Text>
                                            </Wrapper>
                                        </Wrapper>
                                    )
                                })
                            }

                        </Wrapper>
                        :
                        <Wrapper marginHorizontalBase>
                            <Text isRegular isMediumFont isTextColor2>SMS notifications</Text>
                            <Spacer isSmall />
                            <Text isSmall isGray lineHeight={totalSize(2.25)}>Transactional SMS notifications can't be edited. Customer
                                name, order number, and other specific details will
                                automatically update with the correct information.</Text>
                        </Wrapper>
                }
                <Spacer isBasic />
                <Wrapper marginHorizontalBase>
                    <Text isSmall isPrimaryColor isUnderlined>Read more about using liquid variables in notification templates</Text>
                </Wrapper>
                <Spacer isDoubleBase />
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}
