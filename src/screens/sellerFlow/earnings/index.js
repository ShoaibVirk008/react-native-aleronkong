import React, { Component, useRef } from 'react';
import { Pressable, View } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { Icon, SearchBar } from 'react-native-elements';
import { Buttons, ScrollViews, Spacer, Wrapper, Text, Icons, Common, Pickers, Lines } from '../../../components';
import { appStyles, colors, DummyData, routes, sizes } from '../../../services';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { navigate } from '../../../navigation/rootNavigation';

export default function Index() {
    const TypeMenuRef = useRef(null)
    const hideTypeMenu = () => TypeMenuRef?.current?.hide()
    const showTypeMenu = () => TypeMenuRef?.current?.show()
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0,
        //color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        color: (opacity = 1) => colors.appBgColor4,
        // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        //labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
        propsForDots: {
            r: "5",
            fill: colors.appBgColor1,
            strokeWidth: "5",
            stroke: colors.appColor1
        }
    };
    const data = {
        labels: ["1D", "4W", "3M", "5M", "8M", "1Y"],
        datasets: [
            {
                data: [5000, 7000, 6000, 8000, 9900, 4300],
                //color: (opacity = 1) => colors.appColor1+((opacity)*100), // optional
                color: (opacity = 1) => colors.appColor1, // optional
                //color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        //legend: ["Rainy Days"] // optional
    };
    return (
        <Wrapper isMain>
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer height={height(5)} />
                <Wrapper marginHorizontalBase alignItemsFlexEnd>
                    <Buttons.BorderedSmall
                        text={'Withdraw'}
                        buttonStyle={[{ borderRadius: 5 }]}
                        onPress={()=>navigate(routes.seller.withdraw)}
                    />
                </Wrapper>
                <Spacer isSmall />
                <Wrapper alignItemsCenter>
                    <Wrapper isColored background1 style={[{ height: width(60), width: width(60), borderRadius: 300 }, appStyles.shadowLight]}>
                        <Wrapper flex={2} />
                        <Wrapper flex={1} isCenter>
                            <Text isLargeTitle isPrimaryColor alignTextCenter>$34,430.00</Text>
                        </Wrapper>
                        <Wrapper flex={2}>
                            <Spacer isSmall />
                            <Text isRegular alignTextCenter>$5,000.00</Text>
                            <Spacer isSmall />
                            <Text isRegular alignTextCenter style={{ color: colors.appStatus4 }}>+5.8%</Text>
                        </Wrapper>
                    </Wrapper>
                </Wrapper>
                <Spacer isBasic />
                <Spacer isBasic />
                <Common.WrapperColoredShadow paddingVerticalBase>
                    <Wrapper flexDirectionRow alignItemsCenter justifyContentSpaceBetween>
                        <Text isRegular>12,450 Products Sold</Text>
                        <Icons.WithText
                            text={'+10.8%'}
                            iconName='long-arrow-up'
                            iconType={'font-awesome'}
                            direction='row-reverse'
                            textStyle={[appStyles.textRegular, { color: colors.appStatus4 }]}
                            tintColor={colors.appStatus4}
                        />
                    </Wrapper>
                </Common.WrapperColoredShadow>
                <Spacer isBasic />
                <Common.WrapperColoredShadow>
                    <Menu
                        //visible={visible}
                        ref={TypeMenuRef}
                        anchor={
                            <Pressable
                                onPress={() => {
                                    showTypeMenu()
                                }}
                            >
                                <Wrapper isBorderedWrapper marginHorizontalZero flexDirectionRow alignItemsCenter justifyContentSpaceBetween style={{ borderRadius: 5 }}>
                                    <Text isRegular>1 Month, 27 May - 27 June</Text>
                                    <Icon
                                        name='caret-down-sharp'
                                        type='ionicon'
                                        size={totalSize(2)}
                                        color={colors.appTextColor4}
                                    />
                                </Wrapper>
                            </Pressable>
                        }
                        onRequestClose={hideTypeMenu}
                        style={{ backgroundColor: colors.appBgColor2, borderRadius: 5 }}

                    >
                        <Wrapper style={{ width: width(82.5) }}>
                            {
                                [1, 2, 3, 4].map((item, index) => {
                                    return (
                                        <Pressable
                                        key={index}
                                            onPress={() => {
                                                hideTypeMenu()
                                            }}

                                        >
                                            {
                                                index != 0 ?
                                                    <Lines.Horizontal color={colors.appBgColor3} />
                                                    :
                                                    null
                                            }
                                            <Wrapper paddingVerticalSmall paddingHorizontalSmall>
                                                <Text isSmall>1 Month, 27 May - 27 June</Text>
                                            </Wrapper>
                                        </Pressable>
                                    )
                                })
                            }
                        </Wrapper>
                    </Menu>
                    <Spacer isBasic />
                    <Common.LineChartPrimary
                        data={[5000, 7000, 6000, 8000, 9900, 10000, 12000, 11000, 8000, 9000, 9900, 6000]}
                        labels={["1D", "4W", "3M", "5M", "8M", "1Y"]}
                        width={width(80)}
                        height={height(25)}
                        yAxisLabel="$"
                        yAxisInterval={2}
                        withHorizontalLines={false}
                    />
                </Common.WrapperColoredShadow>
                <Spacer isDoubleBase />
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}
