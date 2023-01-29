import React, { Component, useEffect } from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { Icon, SearchBar } from 'react-native-elements';
import { Headers, Spacer, Wrapper, Text, Buttons } from '../../../../components';
import { navigate } from '../../../../navigation/rootNavigation';
import { colors, routes, sizes } from '../../../../services';

const giftCards = [
    {
        title: '40% OFF',
        discount: '40%',
        validity: '23/12/2022',
        code: 'EID2022'
    },
    {
        title: 'AstorexKong',
        discount: '20%',
        validity: '25/12/2022',
        code: 'ASTOREX'
    },
    {
        title: '10% OFF',
        discount: '10%',
        validity: '11/12/2022',
        code: 'ALERONT'
    },
    {
        title: '50% OFF',
        discount: '50%',
        validity: '12/12/2022',
        code: 'ALERONF'
    }
]
export default function Index({ navigation }) {

    useEffect(() => {
        navigation.setOptions({
            //headerShown:false,
            header: () => {
                return (
                    <Headers.Primary
                        title={'Gift Cards'}
                        showBackArrow
                        rightContainerStyle={{ flex: 0 }}
                        right={
                            <Wrapper flexDirectionRow alignItemsCenter>
                                <Icon
                                    name='search'
                                    type='material'
                                    color={colors.appTextColor1}
                                    size={totalSize(3)}
                                    onPress={() => { }}

                                />
                                <Spacer isSmall horizontal />
                                <Icon
                                    name='add'
                                    type='material'
                                    color={colors.appTextColor1}
                                    size={totalSize(3)}
                                    onPress={() => navigate(routes.seller.addGiftCards)}
                                />
                                <Spacer isSmall horizontal />
                            </Wrapper>

                        }
                    />
                )
            }
        })
    }, [])

    return (
        <Wrapper isMain>
            <GiftCards
                data={giftCards}
                onPressEdit={(item, index) => navigate(routes.seller.addGiftCards, { data: item })}
                onPressItem={() => { }}
            />
        </Wrapper>
    )
}

const GiftCards = ({ data, onPressItem, onPressEdit }) => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={() => <Spacer height={sizes.marginVertical} />}
            ListHeaderComponent={() => <Spacer height={sizes.marginVertical} />}
            ItemSeparatorComponent={() => <Spacer height={sizes.marginVertical / 2} />}
            renderItem={({ item, index }) => {
                const { title, discount, validity, code } = item

                return (
                    <GiftCard
                    key={index}
                        title={title}
                        discount={discount}
                        validity={validity}
                        code={code}
                        onPress={() => onPressItem(item, index)}
                        onPressEdit={() => onPressEdit(item, index)}
                    />
                )
            }}
        />
    )
}
const GiftCard = ({ title, discount, validity, code, onPressEdit, onPress }) => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    function getDarkColor() {
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += Math.floor(Math.random() * 10);
        }
        return color;
    }
    return (
        <Pressable onPress={onPress}>
            <Wrapper isColored style={{ backgroundColor: getDarkColor(), paddingTop: sizes.marginVertical * 1.25 }}>
                <Wrapper flex={1} flexDirectionRow>
                    <Wrapper flex={1} alignItemsFlexStart>
                        <Text isXTiny isLightGray style={{ color: colors.appTextColor7 }}>A little something, just for you</Text>
                        <Spacer isSmall />
                        <Text isLargeTitle style={{ color: colors.appColor6 }}>{title}</Text>
                        <Spacer isTiny />
                        <Text isXTiny isWhite >
                            <Text isMediumFont style={{ color: colors.appTextColor7 }}>On your entire purchase. Enter</Text>
                            {' '}
                            <Text isBoldFont style={{ color: colors.appColor6 }}>{code}</Text>
                        </Text>
                        <Spacer isSmall />
                        <Buttons.ColoredSmallSecondary
                            text={'Edit'}
                            iconName='pencil'
                            buttonStyle={{ backgroundColor: colors.appBgColor1 }}
                            iconColor={colors.appColor1}
                            textColor={colors.appColor1}
                            iconSize={totalSize(1.25)}
                            onPress={onPressEdit}
                        />
                    </Wrapper>
                    <Wrapper marginHorizontalSmall justifyContentCenter alignItemsCenter>
                        <Icon
                            name='gift'
                            type='font-awesome-5'
                            color={colors.appTextColor6}
                            size={totalSize(10)}
                        />
                        <Spacer isSmall />
                        <Text isXTiny style={{ color: colors.appTextColor7 }}>Valid till: {validity}</Text>
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        </Pressable>
    )
}