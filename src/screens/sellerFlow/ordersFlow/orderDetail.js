import React, { Component, useEffect } from 'react';
import { View, } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { Icon, SearchBar } from 'react-native-elements';
import { Headers, Spacer, Wrapper, Text, Buttons, ScrollViews, Common, Images, Lines } from '../../../components';
import { appImages, appStyles, colors, sizes } from '../../../services';

export default function Index({ navigation, route }) {
    const orderData = route?.params?.data
    console.log('orderData: ', orderData)

    useEffect(() => {
        navigation.setOptions({
            //headerShown:false,
            header: () => {
                return (
                    <Headers.Primary
                        title={'#' + orderData?.order_no}
                        showBackArrow
                    />
                )
            }
        })
    }, [])
    return (
        <Wrapper isMain>
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer isBasic />
                <Wrapper marginHorizontalBase flexDirectionRow justifyContentSpaceBetween>
                    <Text isLarge isMediumFont>John Doe</Text>
                    <Buttons.BorderedSmallSecondary
                        text={'Delete'}
                        iconStyle={[appStyles.marginHorizontalZero, { marginRight: width(1) }]}
                        textColor={colors.error2}
                        borderColor={colors.error2}
                        iconName='delete'
                        iconSize={totalSize(1.5)}
                        tintColor={colors.error2}
                    />
                </Wrapper>
                <Wrapper marginHorizontalBase>
                    <Text isSmall isLightGray>Customer For 1 Day</Text>
                </Wrapper>
                <Spacer isBasic />
                <Common.TitleInfoSecondary
                    title={'Customer Note'}
                    titleStyle={[appStyles.fontMedium]}
                />
                <Spacer isSmall />
                <Wrapper isBorderedWrapper paddingVerticalSmall >
                    <Text isSmall lineHeight={totalSize(2.5)}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                </Wrapper>
                <Spacer isBasic />
                <Common.TitleInfoSecondary
                    title={'Last Order Placed'}
                    titleStyle={[appStyles.fontMedium]}
                />
                <Spacer isSmall />
                <Wrapper isBorderedWrapper paddingVerticalSmall background1 style={[appStyles.shadowExtraLight]}>
                    <Wrapper flexDirectionRow justifyContentSpaceBetween alignItemsCenter>
                        <Wrapper flex={8} flexDirectionRow>
                            <Images.SqareRound
                                source={{ uri: appImages.product3 }}
                                size={totalSize(3.75)}
                                style={{ borderRadius: sizes.cardRadius / 2 }}
                            />
                            <Spacer isSmall horizontal />
                            <Wrapper justifyContentSpaceBetween>
                                <Text isRegular isMediumFont isTextColor2>T-shirt</Text>
                                <Text isSmall isGray>$200</Text>
                            </Wrapper>
                        </Wrapper>
                        <Wrapper flex={2} alignItemsCenter>
                            <Text isSmall isGray>01</Text>
                        </Wrapper>
                    </Wrapper>
                    <Spacer isSmall />
                    <Lines.Horizontal />
                    <Spacer isSmall />
                    <Common.TitleInfoSecondary
                        title={'Subtotal'}
                        info={'$200.00'}
                        style={[appStyles.marginHorizontalZero]}
                    />
                    <Spacer isSmall />
                    <Common.TitleInfoSecondary
                        title={'Discount'}
                        info={'$000.00'}
                        style={[appStyles.marginHorizontalZero]}
                    />
                    <Spacer isSmall />
                    <Common.TitleInfoSecondary
                        title={'Shipping'}
                        info={'$000.00'}
                        style={[appStyles.marginHorizontalZero]}
                    />
                    <Spacer isSmall />
                    <Common.TitleInfoSecondary
                        title={'GST (16%)'}
                        info={'$060.00'}
                        style={[appStyles.marginHorizontalZero]}
                    />
                    <Spacer isSmall />
                    <Lines.Horizontal />
                    <Spacer isSmall />
                    <Common.TitleInfoSecondary
                        title={'Total'}
                        info={'$260.00'}
                        titleStyle={[appStyles.fontBold]}
                        infoStyle={[appStyles.fontBold]}
                        style={[appStyles.marginHorizontalZero]}
                    />
                </Wrapper>
                <Spacer isBasic />
                <Common.TitleInfoSecondary
                    title={'Customer Details'}
                    titleStyle={[appStyles.fontMedium]}
                />
                <Spacer isSmall />
                <Common.CustomerDetailCard
                    name='John Doe'
                    phone='+123 456 789'
                    email='john44@gmail.com'
                    shipping='House # 23, Street 1, Zia Road'
                    billing='House # 23, Street 1, Zia Road'
                />
                {/* <Spacer isSmall />
                <Wrapper isBorderedWrapper paddingVerticalSmall background1 style={[appStyles.shadowExtraLight]}>
                    <Text isSmall isMediumFont>Contact Info</Text>
                    <Spacer isSmall />
                    <Common.TitleInfo
                        title={'Name'}
                        info='John Doe'
                    />
                    <Spacer isSmall />
                    <Common.TitleInfo
                        title={'Ph#'}
                        info='+123 456 789'
                    />
                    <Spacer isSmall />
                    <Common.TitleInfo
                        title={'Email'}
                        info='john44@gmail.com'
                    />
                    <Spacer isSmall />
                    <Lines.Horizontal />
                    <Spacer isSmall />
                    <Text isSmall isMediumFont>Address</Text>
                    <Spacer isSmall />
                    <Common.TitleInfo
                        title={'Shipping'}
                        info='House # 23, Street 1, Zia Road'
                    />
                    <Spacer isSmall />
                    <Common.TitleInfo
                        title={'Billing'}
                        info='House # 23, Street 1, Zia Road'
                    />
                </Wrapper> */}
                <Spacer isDoubleBase />
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}
