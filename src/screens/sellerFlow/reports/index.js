import React, { Component, useState } from 'react';
import { View, } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Common, ScrollViews, Spacer, TextInputs, Wrapper, Text, Lines, Buttons, Icons } from '../../../components';
import { appStyles, colors, HelpingMethods, sizes } from '../../../services';

export default function Index() {
    const options_all = [
        {
            title: 'Total Sales',
            description: 'Make business decisions by comparing sales across products, staff, channels, and more.',
            subtitle: 'Total sales in last 30 days',
            value: '$0',
            reports: ['Sales over time', 'Sales by product', 'Sales over time', 'Sales by product'],
            show_all: false
        },
        {
            title: 'Orders',
            description: 'Make business decisions by comparing sales across products, staff, channels, and more.',
            subtitle: 'Orders Last 30 Days',
            value: '0',
            reports: ['Orders over time', 'Product orders and returns', 'Orders over time', 'Product orders and returns',],
            show_all: false
        },
        {
            title: 'Customers',
            description: 'Gain insights into who your customers are and how they interact with your business.',
            subtitle: 'Customers in last 30 days',
            value: '0',
            reports: ['Customers over time', 'First-time vs returning customer sales', 'Customers over time', 'First-time vs returning customer sales',],
            show_all: false
        },
        {
            title: 'Finances',
            description: "View your store's finances including sales, returns, taxes, payments, and more.",
            subtitle: 'Total sales this month to date',
            value: '$0',
            reports: ['Summary', 'Total Sales', 'Summary', 'Total Sales',],
            show_all: false
        },
        {
            title: 'Inventory',
            description: 'Track and understand the movement of our products for more efficient inventory management',
            subtitle: 'Total Records',
            value: '0',
            reports: ['Sell-through rate by product', 'Days of inventory remaining', 'Sell-through rate by product', 'Days of inventory remaining',],
            show_all: false
        },
        {
            title: 'Acquisition',
            description: 'Make business decisions by comparing sales across products, staff, channels, and more.',
            subtitle: 'Sessions last 30 days',
            value: '0',
            reports: ['Sales over time', 'Sessions by referrer', 'Sales over time', 'Sessions by referrer',],
            show_all: false
        },
        {
            title: 'Behavior',
            description: 'Improve your store by understanding how visitors move through your site.',
            subtitle: 'Reached checkouts last 30 days',
            value: '$0',
            reports: ['Online store conversion over time', 'Top online store searches', 'Online store conversion over time', 'Top online store searches',],
            show_all: false
        },
        {
            title: 'Marketing',
            description: 'Gain insights into where your online store customers are converting from.',
            subtitle: 'Sales attributed to marketing last 30 days',
            value: '$0',
            reports: ['Sessions attributed to marketing', 'Sales attributed to marketing', 'Sessions attributed to marketing', 'Sales attributed to marketing',],
            show_all: false
        }
    ]
    const [optionsAll, setOptionsAll] = useState(options_all)
    return (
        <Wrapper isMain>
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer isBasic />
                <Spacer isSmall />
                <TextInputs.SearchBar
                    placeholder={'Search Report'}
                    inputContainerStyle={{ borderRadius: 100 }}
                />
                <Spacer isBasic />
                {
                    optionsAll.map((item, index) => {
                        const { title, description, subtitle, value, reports, show_all } = item
                        const visible_reports = show_all ? reports : reports.slice(0, 2)
                        return (
                            <Common.WrapperColoredShadow
                            key={index}
                                animation={index <= 1 && 'fadeInUp'}
                                duration={500 + (index * 100)}
                                containerStyle={{ marginBottom: sizes.marginVertical }}>
                                <Text isRegular isBoldFont>{title}</Text>
                                <Spacer isSmall />
                                <Text isSmall>{description}</Text>
                                <Spacer isBasic />
                                <Text isSmall>{subtitle}</Text>
                                <Spacer isSmall />
                                <Text isTinyTitle isPrimaryColor>{value}</Text>
                                <Spacer isBasic />
                                <Text isSmall isMediumFont>Reports</Text>
                                {
                                    visible_reports.map((item, index) => {
                                        return (
                                            <Wrapper key={index}>
                                                <Wrapper paddingVerticalSmall>
                                                    <Text isSmall isPrimaryColor>{item}</Text>
                                                </Wrapper>
                                                <Lines.Horizontal />
                                            </Wrapper>
                                        )
                                    })
                                }
                                <Spacer height={sizes.marginVertical / 2} />
                                <Wrapper alignItemsCenter>
                                    <Icons.WithText
                                        text={!show_all ? 'Show All ' : 'Show Less '}
                                        iconName='caret-down-sharp'
                                        iconType='ionicon'
                                        direction='row-reverse'
                                        iconSize={totalSize(2)}
                                        tintColor={colors.appTextColor5}
                                        textStyle={[appStyles.textLightGray]}
                                        //buttonStyle={{ backgroundColor: colors.appBgColor1 }}
                                        onPress={() => {
                                            let tempOptions = optionsAll.slice()
                                            tempOptions[index].show_all = !tempOptions[index].show_all
                                            HelpingMethods.handleAnimation()
                                            setOptionsAll(tempOptions)
                                        }}
                                    />
                                </Wrapper>
                            </Common.WrapperColoredShadow>
                        )
                    })
                }
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}
