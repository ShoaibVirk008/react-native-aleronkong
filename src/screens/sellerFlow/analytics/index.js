import React, { Component } from 'react';
import { View, } from 'react-native';
import { height, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Common, ScrollViews, Spacer, Wrapper, Text } from '../../../components';
import { colors, sizes } from '../../../services';

export default function Index() {
    const all_reports = [
        {
            title: 'Total Sales',
            value: '$1,120.00',
            subTitle: 'Sales Over Time',
            data: [0, 5, 7, 6, 8, 9, 2, 3, 2.5, 8, 9, 9.9, 6],
            labels: ["12 am", "12 pm"]
        },
        {
            title: 'Online store sessions',
            value: '0',
            subTitle: 'Visitors',
            data: [0, 5, 7, 6, 8, 9, 2, 8, 9, 9.9, 6],
            labels: ["12 am", "12 pm"]
        },
        {
            title: 'Returning customers rate',
            value: '0%',
            subTitle: 'Customers Over Time',
            data: [0, 5, 7, 9, 2, 3, 8, 9, 9.9, 6],
            labels: ["12 am", "12 pm"]
        },
        {
            title: 'Online store conversion rate',
            value: '0%',
            subTitle: 'Customers Over Time',
            data: [0, 5, 7, 6, 8, 9, 2.5, 8, 9,],
            labels: ["12 am", "12 pm"]
        },
        {
            title: 'Average order value',
            value: '$0',
            subTitle: 'Order value over time',
            data: [0, 5, 7, 6, 8, 9, 2, 8, 9, 9.9, 6],
            labels: ["12 am", "12 pm"]
        },
        {
            title: 'Total Orders',
            value: '0',
            subTitle: 'Orders over time',
            data: [0, 5, 8, 9, 2, 3, 2.5, 8, 9, 9.9, 6],
            labels: ["12 am", "12 pm"]
        },
        {
            title: 'Top Products By Units Sold',
            value: '',
            subTitle: '',
            data: null,
            labels: null
        },
        {
            title: 'Online store sessions by location',
            value: '',
            subTitle: '',
            data: null,
            labels: null
        },
        {
            title: 'Online store sessions by device type',
            value: '',
            subTitle: '',
            data: null,
            labels: null
        },
        {
            title: 'Online store sessions by traffic source',
            value: '',
            subTitle: '',
            data: null,
            labels: null
        },
        {
            title: 'Sales by trafic source',
            value: '',
            subTitle: '',
            data: null,
            labels: null
        },
        {
            title: 'Online store sessions by social source',
            value: '',
            subTitle: '',
            data: null,
            labels: null
        },
        {
            title: 'sales by social sources',
            value: '',
            subTitle: '',
            data: null,
            labels: null
        },
        {
            title: 'Top landing pages by sessions',
            value: '',
            subTitle: '',
            data: null,
            labels: null
        },
        {
            title: 'Top referrs by sessions',
            value: '',
            subTitle: '',
            data: null,
            labels: null
        },
        {
            title: 'Sales attributing to marketing',
            value: '$0',
            subTitle: 'Total sales over time',
            data: [0, 5, 7, 6, 2, 3, 2.5, 8, 9, 9.9, 6],
            labels: ["12 am", "12 pm"]
        },
    ]
    return (
        <Wrapper isMain>
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer isBasic />
                {
                    all_reports.map((item, index) => {
                        const { title, value, subTitle, data, labels } = item
                        return (
                            <Wrapper
                            key={index}
                                animation={index <= 1 && 'fadeInUp'}
                                duration={500 + (index * 100)}
                            >
                                <ChartCard
                                    title={title}
                                    value={value}
                                    subTitle={subTitle}
                                    onPressViewReports={() => { }}
                                    data={data}
                                    labels={labels}
                                    containerStyle={{ marginBottom: sizes.marginVertical }}
                                />
                            </Wrapper>

                        )
                    })
                }
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}

const ChartCard = ({ title, value, subTitle, onPressViewReports, data, containerStyle, ...props }) => {
    return (
        <Common.WrapperColoredShadow containerStyle={containerStyle}>
            <Wrapper flexDirectionRow>
                <Wrapper flex={1}>
                    <Text isRegular isSmall={!data} isBoldFont isTextColor3>{title}</Text>
                </Wrapper>
                <Text isTiny isPrimaryColor>View Report</Text>
            </Wrapper>
            <Spacer isBasic />
            {
                data ?
                    <>
                        <Text isLarge isMediumFont isPrimaryColor>{value}</Text>
                        <Spacer isBasic />
                        <Text isSmall isTextColor2>{subTitle}</Text>
                        <Spacer isSmall />
                        <Common.LineChartPrimary
                            data={data}
                            //labels={["1D", "4W", "3M", "5M", "8M", "1Y"]}
                            width={width(80)}
                            height={height(25)}
                            //yAxisLabel="$"
                            xAxisInterval={2}
                            withVerticalLines={false}
                            //style={{backgroundColor: 'red',}}
                            {...props}
                        />
                    </>
                    :
                    <Wrapper isColored marginHorizontalZero paddingVerticalLarge style={{ backgroundColor: colors.appBgColor2, borderRadius: 5 }}>
                        <Text isSmall isGray alignTextCenter>There's no data in this date range</Text>
                    </Wrapper>
            }
        </Common.WrapperColoredShadow>
    )
}