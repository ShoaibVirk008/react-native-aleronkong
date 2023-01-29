import React, { Component } from 'react';
import { View, } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Common, ScrollViews, Spacer, Wrapper, Text, Lines, Buttons } from '../../../components';
import { appStyles, colors, fontSize } from '../../../services';

export default function Index() {
    return (
        <Wrapper isMain>
            <ScrollViews.WithKeyboardAvoidingView>

                <Spacer isBasic />
                <Spacer isTiny />
                <Common.TitleInfoTertiary
                    title={'Shipping'}
                />
                <Spacer isBasic />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray>Choose where you ship and how much you charge for shipping at checkout.</Text>
                    <Spacer isSmall />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isSmall />
                    <Spacer isTiny />
                    <Text isSmall>General Shipping Rates</Text>
                    <Spacer isSmall />
                    <Wrapper background2 isBorderedWrapper marginHorizontalZero style={{ borderRadius: 5 }}>
                        <Common.TitleInfoTertiary
                            title='General'
                            info='Manage'
                            titleStyle={[appStyles.textSmall]}
                            marginHorizontalZero
                        />
                        <Spacer isTiny />
                        <Text isTiny isGray>0 Products</Text>
                        <Spacer isSmall />
                        <Lines.Horizontal />
                        <Spacer isSmall />
                        <Text isSmall >Rates for</Text>
                        <Spacer isTiny />
                        <Text isTiny isGray>Domestic</Text>
                        <Spacer isTiny />
                        <Text isTiny isGray>Rest of World</Text>
                    </Wrapper>
                    <Spacer isBasic />
                    <Text isSmall>Custom Shipping Rates</Text>
                    <Spacer isSmall />
                    <Wrapper background2 isBorderedWrapper marginHorizontalZero paddingHorizontalMedium paddingVerticalMedium style={{ borderRadius: 5, borderStyle: 'dashed' }}>
                        <Text isTiny isGray alignTextCenter lineHeight={totalSize(2.25)}>Add custom rates or destination restrictions for groups of products.</Text>
                        <Spacer isSmall />
                        <Text isTiny isPrimaryColor isUnderlined alignTextCenter>Create new profile</Text>
                    </Wrapper>
                    <Spacer isSmall />
                </Common.WrapperColoredBorderedShadow>

                <Spacer isBasic />
                <Spacer isTiny />
                <Common.TitleInfoTertiary
                    title={'Shipping'}
                />
                <Spacer isSmall />
                <Spacer isTiny />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray>Deliver orders directly to local customers.</Text>
                    <Spacer isSmall />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isSmall />
                    <Spacer isTiny />
                    <Text isSmall isTextColor2>Manage Delivery by Location</Text>
                    <Spacer isSmall />
                    <Common.IconTitleInfoCard
                        iconName='map-marker-alt'
                        iconType='font-awesome-5'
                        //title='Name'
                        info='H # 50, Haider Road, Islamabad, Apartment, Islamabad 44000, Pakistan'
                    />
                </Common.WrapperColoredBorderedShadow>

                <Spacer isBasic />
                <Spacer isTiny />
                <Common.TitleInfoTertiary
                    title={'Local pickup'}
                />
                <Spacer isSmall />
                <Spacer isTiny />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray>Allow local customers to pick up their orders.</Text>
                    <Spacer isSmall />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isSmall />
                    <Spacer isTiny />
                    <Text isSmall isTextColor2>Manage Delivery by Location</Text>
                    <Spacer isSmall />
                    <Common.IconTitleInfoCard
                        iconName='map-marker-alt'
                        iconType='font-awesome-5'
                        //title='Name'
                        info='H # 50, Haider Road, Islamabad, Apartment, Islamabad 44000, Pakistan'
                    />
                </Common.WrapperColoredBorderedShadow>

                <Spacer isBasic />
                <Spacer isTiny />
                <Common.TitleInfoTertiary
                    title={'Packages'}
                />
                <Spacer isSmall />
                <Spacer isTiny />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray>The package sizes you use to ship your products.</Text>
                    <Spacer isSmall />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isSmall />
                    <Spacer isTiny />
                    <Text isSmall isTextColor2>Saved packages</Text>
                    <Spacer isSmall />
                    <Wrapper background2 isBorderedWrapper marginHorizontalZero paddingHorizontalMedium paddingVerticalMedium style={{ borderRadius: 5, borderStyle: 'dashed' }}>
                        <Text isTiny isGray alignTextCenter lineHeight={totalSize(2.25)}>Add a package to show accurate shipping rates{`\n`}at checkout</Text>
                        <Spacer isSmall />
                        <Text isTiny isPrimaryColor isUnderlined alignTextCenter>Add Package</Text>
                    </Wrapper>
                </Common.WrapperColoredBorderedShadow>

                <Spacer isBasic />
                <Spacer isTiny />
                <Common.TitleInfoTertiary
                    title={'Packing slips'}
                    info='Edit'
                    onPressInfo={() => { }}
                />
                <Spacer isSmall />
                <Spacer isTiny />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray>A printed list of items in a shipment that often goes inside</Text>
                    <Spacer isSmall />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isSmall />
                    <Spacer isTiny />
                    <Text isSmall isTextColor2>Packing slip template</Text>
                    <Spacer isSmall />
                    <Text isSmall isGray>Customize the packing slips you can print when you're fulfilling orders.</Text>
                </Common.WrapperColoredBorderedShadow>


                <Spacer isBasic />
                <Spacer isTiny />
                <Common.TitleInfoTertiary
                    title={'Carrier accounts'}
                />
                <Spacer isSmall />
                <Spacer isTiny />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isTextColor2>Enable third-party calculated rates at checkout</Text>
                    <Spacer isSmall />
                    <Text isSmall isGray>Your current plan doesn't offer this feature. Upgrade your plan to enable calculated shipping rates using accounts from FedEx, UPS® and apps.</Text>
                    <Spacer isBasic />
                    <Buttons.BorderedSecondary
                        text='Upgrade your plan'
                        buttonStyle={[appStyles.marginHorizontalZero]}
                    />
                </Common.WrapperColoredBorderedShadow>



                <Spacer isBasic />
                <Spacer isTiny />
                <Common.TitleInfoTertiary
                    title={'Custom order fulfillment'}
                />
                <Spacer isSmall />
                <Spacer isTiny />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isTextColor2>Custom order fulfillment</Text>
                    <Spacer isSmall />
                    <Text isSmall isGray>Add an email for a custom fulfillment service that fulfills orders for you.</Text>
                    <Spacer isBasic />
                    <Buttons.BorderedSecondary
                        text='Add fulfillment service'
                        buttonStyle={[appStyles.marginHorizontalZero]}
                    />
                </Common.WrapperColoredBorderedShadow>

                <Spacer isDoubleBase />
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}
