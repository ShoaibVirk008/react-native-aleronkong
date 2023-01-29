import React, { Component, useEffect } from 'react';
import { View, FlatList, Image } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Buttons, Headers, ScrollViews, Spacer, Wrapper, Text, Common, Lines } from '../../../components';
import { appImages, appStyles, colors, routes, sizes } from '../../../services';
import SeeMore from 'react-native-see-more-inline';

export default function Index({ navigation, route }) {
    const productData = route?.params?.data || null

    const temp_description = "Lorem Ipsum is simply dummy text of the printing and types etting industry. Lorem Ipsum has been the industry's stand ard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.\n\n - Lorem Ipsum is simply dummy text of the prints - ettingindustry. Lorem Ipsum has been - Lorem Ipsum is simply dummy text of the prints - Lorem Ipsum is simply dummy text of the prints - ettingindustry. Lorem Ipsum has been - Lorem Ipsum is simply dummy text of the prints - the industry's standard dummy text evern"
    useEffect(() => {
        navigation.setOptions({
            header: () => {
                return (
                    <Headers.Primary
                        showBackArrow
                        title={'Short Sleeve T-Shirt'}
                    />
                )
            }
        })
    }, [])
    return (
        <Wrapper isMain>
            <ScrollViews.WithKeyboardAvoidingView
                footer={
                    <Wrapper background1>
                        <Lines.Horizontal style={[appStyles.marginHorizontalBase]}/>
                        <Wrapper flexDirectionRow marginHorizontalBase paddingVerticalBase>
                            <Wrapper flex={1}>
                                <Buttons.BorderedSecondary
                                    text='Archive Product'
                                    buttonStyle={[appStyles.marginHorizontalZero]}
                                />
                            </Wrapper>
                            <Wrapper flex={0.1}/>
                            <Wrapper flex={1}>
                                <Buttons.BorderedSecondary
                                    text='Delete Product'
                                    buttonStyle={[appStyles.marginHorizontalZero,{borderColor:colors.error}]}
                                    textStyle={[{color:colors.error}]}
                                    
                                />
                            </Wrapper>
                        </Wrapper>
                    </Wrapper>
                }
            >
                <Spacer isBasic />
                <Wrapper marginHorizontalBase flexDirectionRow alignItemsCenter>
                    <Buttons.ColoredSmallSecondary
                        text={'Active'}
                        buttonStyle={{ backgroundColor: colors.success + '40' }}
                    />
                    <Spacer isSmall horizontal />
                    <Buttons.BorderedSmallSecondary
                        text={' Edit'}
                        buttonStyle={{}}
                        iconName='pencil'
                        iconSize={totalSize(1.25)}
                        iconStyle={{ marginHorizontal: 0 }}
                        onPress={() => {
                            navigate(routes.app,
                                {
                                    screen: routes.shareSomethingRoutes.SellProducts,
                                    params: { isSeller: true, data: productData }
                                })
                        }}
                    />
                </Wrapper>
                <Spacer isBasic />
                <ImagesSlider
                    data={[appImages.product3, appImages.product4, appImages.product5]}
                />
                <Spacer isBasic />
                <Wrapper marginHorizontalBase>
                    <Text isLarge isMediumFont>Short Sleeve T-Shirt</Text>
                    <Spacer isSmall />
                    <Text isMedium isMediumFont isPrimaryColor>$1,120.00</Text>
                    <Spacer isSmall />
                    <Common.TitleInfo
                        title={'Inventory'}
                        info={'10 in Stock'}
                    />
                    <Spacer isTiny />
                    <Common.TitleInfo
                        title={'Type'}
                        info={'Apparel & Accessories'}
                    />
                    <Spacer isTiny />
                    <Common.TitleInfo
                        title={'Vendor'}
                        info={'Astore'}
                    />
                    <Spacer isBasic />
                    <SeeMore numberOfLines={10}>{temp_description.repeat(3)}</SeeMore>
                </Wrapper>
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}

const ImagesSlider = ({ data }) => {
    return (
        <Wrapper>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString}
                ListFooterComponent={() => <Spacer width={sizes.marginHorizontal} />}
                ListHeaderComponent={() => <Spacer width={sizes.marginHorizontal} />}
                ItemSeparatorComponent={() => <Spacer width={sizes.marginHorizontal / 2} />}
                renderItem={({ item, index }) => {
                    return (
                        <Wrapper key={index}>
                            <Image
                                source={{ uri: item }}
                                style={{ height: width(43), width: width(43), borderRadius: sizes.cardRadius / 2 }}
                            />
                        </Wrapper>
                    )
                }}
            />
        </Wrapper>
    )
}