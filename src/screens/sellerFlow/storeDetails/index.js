import React, { Component } from 'react';
import { View, } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Cards, Common, Icons, ScrollViews, Spacer, Wrapper, Text, Lines, TextInputs, Pickers, Buttons } from '../../../components';
import { appStyles, colors, DummyData, sizes } from '../../../services';

export default function Index() {
    return (
        <Wrapper isMain>
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer isBasic />
                <TitlePrimary
                    title={'Basic Information'}
                    onPressEdit={() => { }}
                />
                <Spacer isSmall />
                <Common.WrapperColoredBorderedShadow>
                    <Wrapper paddingVerticalTiny paddingHorizontalTiny>
                        <Common.IconTitleInfoCard
                            iconName='store'
                            iconType='font-awesome-5'
                            title='Name'
                            info='Applestore'
                        />
                        <Spacer isBasic />
                        <Common.IconTitleInfoCard
                            iconName='industry'
                            iconType='font-awesome'
                            title='Industry'
                            info="I haven't decided yet."
                        />
                    </Wrapper>
                </Common.WrapperColoredBorderedShadow>
                <Spacer isBasic />
                <TitlePrimary
                    title={'Address'}
                    onPressEdit={() => { }}
                />
                <Spacer isSmall />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray>It will Use on customer order confirmations and your Aleron Kong bill.</Text>
                    <Spacer isBasic />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isBasic />
                    <Common.IconTitleInfoCard
                        iconName='map-marker-alt'
                        iconType='font-awesome-5'
                        //title='Name'
                        info='H # 50, Haider Road, Islamabad, Apartment, Islamabad 44000, Pakistan'
                    />
                </Common.WrapperColoredBorderedShadow>
                <Spacer isBasic />
                <TitlePrimary
                    title={'Contact Information'}
                    onPressEdit={() => { }}
                />
                <Spacer isSmall />
                <Common.WrapperColoredBorderedShadow>
                    <Wrapper paddingVerticalTiny paddingHorizontalTiny>
                        <Common.IconTitleInfoCard
                            iconName='phone'
                            iconType='font-awesome'
                            title='Phone'
                            info='+92 345 6786243'
                        />
                        <Spacer isBasic />
                        <Common.IconTitleInfoCard
                            iconName='email'
                            iconType='material'
                            title='Email'
                            info="johndoe@gmail.com"
                        />
                    </Wrapper>
                </Common.WrapperColoredBorderedShadow>


                <Spacer isBasic />
                <TitlePrimary
                    title={'Store Currency'}
                    onPressEdit={() => { }}
                />
                <Spacer isSmall />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray>The currency your products are sold in. To change your payout currency, go to
                        {' '}
                        <Text isPrimaryColor isUnderlined>payments settings.</Text>
                    </Text>
                    <Spacer isBasic />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isBasic />
                    <Pickers.SearchableSecondary
                        title='Store Currency'
                        data={[...DummyData.picker_options]}
                        value='United States Dollar (USD)'
                        containerStyle={[appStyles.marginHorizontalZero]}
                        onPressItem={(item, index) => { }}
                        onChangeText={text => { }}
                    />
                    <Spacer isSmall />
                </Common.WrapperColoredBorderedShadow>


                <Spacer isBasic />
                <TitlePrimary
                    title={'Standards & Formats'}
                // onPressEdit={() => { }}
                />
                <Spacer isSmall />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray>Used to calculate product prices, shipping weights, and order times.</Text>
                    <Spacer isBasic />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isBasic />
                    <Pickers.SearchableSecondary
                        title='Time zone'
                        data={[...DummyData.picker_options]}
                        value='(GMT - 04:00) Atlantic Time (Canada)'
                        containerStyle={[appStyles.marginHorizontalZero]}
                        onPressItem={(item, index) => { }}
                        onChangeText={text => { }}
                    />
                    <Spacer isBasic />
                    <Pickers.SearchableSecondary
                        title='Unit system'
                        data={[...DummyData.picker_options]}
                        value='Metric system'
                        containerStyle={[appStyles.marginHorizontalZero]}
                        onPressItem={(item, index) => { }}
                        onChangeText={text => { }}
                    />
                    <Spacer isBasic />
                    <Pickers.SearchableSecondary
                        title='Default weight unit'
                        data={[...DummyData.picker_options]}
                        value='Kilogram (kg)'
                        containerStyle={[appStyles.marginHorizontalZero]}
                        onPressItem={(item, index) => { }}
                        onChangeText={text => { }}
                    />
                    <Spacer isSmall />
                </Common.WrapperColoredBorderedShadow>


                <Spacer isBasic />
                <TitlePrimary
                    title={'Edit Order ID'}
                // onPressEdit={() => { }}
                />
                <Spacer isSmall />
                <Common.WrapperColoredBorderedShadow>
                    <Text isSmall isGray>Order numbers start at #1001 by default. While you can't change the order number itself, you can add a prefix or suffix to create IDs like "EN1001" or "1001-A"</Text>
                    <Spacer isBasic />
                    <Common.LineHorizontalInvertMargin />
                    <Spacer isBasic />
                    <TextInputs.UnderlinedSecondary
                        title='Prefix'
                        value='#'
                        containerStyle={[appStyles.marginHorizontalZero]}
                        onPressItem={(item, index) => { }}
                        onChangeText={text => { }}
                    />
                    <Spacer isBasic />
                    <TextInputs.UnderlinedSecondary
                        title='Suffix'
                        value=''
                        containerStyle={[appStyles.marginHorizontalZero]}
                        onPressItem={(item, index) => { }}
                        onChangeText={text => { }}
                    />
                    <Spacer isSmall />
                </Common.WrapperColoredBorderedShadow>
                <Spacer isBasic />
                <Spacer isSmall />
                <Buttons.ColoredSecondary
                    text='Save'
                />
                <Spacer isDoubleBase />
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}

const TitlePrimary = ({ title, onPressEdit }) => {
    return (
        <Common.TitleInfoTertiary
            title={title}
            info={onPressEdit ? 'Edit' : ''}
            onPressInfo={onPressEdit}
        />
    )
}

