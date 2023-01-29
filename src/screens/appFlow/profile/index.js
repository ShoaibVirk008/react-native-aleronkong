import React, { Component, useCallback, useEffect, useState } from 'react';
import { Pressable, View, } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Buttons, Spacer, Wrapper, Text, ScrollViews, Images, Icons, Common, Cards, Loaders } from '../../../components';
import { navigate } from '../../../navigation/rootNavigation';
import { Api, appIcons, appImages, appStyles, colors, DummyData, HelpingMethods, routes } from '../../../services';
import { MusicPlayer } from '..'
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';

export default function Index({ navigation, route }) {
    const { replace } = navigation

    //redux state
    const user = useSelector(state => state.user)
    const { firstName, lastName, userName, avatar, isGuildMember } = user.currentUser
    console.log('currentUser: ', user.currentUser)
    console.log('userToken: ', user.userToken)

    //local states
    const [subscribedGuildPackageDetail, setSubscribedGuildPackageDetail] = useState(null)
    const [myAllProducts, setMyAllProducts] = useState(null)

    const subscribedGuildPackage = HelpingMethods.GetSubscribedGuildPackage()
    console.log('subscribedGuildPackage: ', subscribedGuildPackage)
    const hasMembership = subscribedGuildPackage ? true : false
    const nextPaymentDate = subscribedGuildPackageDetail?.nextPaymentDuo && moment.unix((subscribedGuildPackageDetail?.nextPaymentDuo)).format('MMMM DD, YYYY') || null

    // const allProducts = [
    //     {
    //         category: 'My AudioBooks',
    //         products: [...DummyData.audio_books.slice()],
    //     },
    //     {
    //         category: 'My Comics',
    //         products: [...DummyData.comics.slice()],
    //     },
    //     {
    //         category: 'My E-Books',
    //         products: [...DummyData.e_books.slice()],
    //     },
    // ]

    useFocusEffect(useCallback(() => {
        handleGetAllMyProducts()
    }, []))

    useEffect(() => {
        subscribedGuildPackage && getGuilPackagePaymentHistory()
    }, [subscribedGuildPackage])

    const getGuilPackagePaymentHistory = () => {
        Api.getPackagePaymentHistory({ packageId: subscribedGuildPackage._id })
            .then(res => {
                if (res) {
                    setSubscribedGuildPackageDetail(res.data)
                }
            })
    }

    const handleGetAllMyProducts = async () => {
        await Api.getStoreProducts({ showBoughtProducts: true })
            .then(res => {
                if (res) {
                    setMyAllProducts(res.data)
                }
            })
    }

    return (
        <Wrapper isMain>
            <Spacer isStatusBarHeigt />
            <Common.SwitchModeButton
                mode={'customer'}
                onPress={() => {
                    replace(routes.sellerApp)
                    setTimeout(() => {
                        navigate(routes.seller.profile)
                    }, 250);
                }}
            />
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer isBasic />

                <Wrapper flexDirectionRow marginHorizontalBase>
                    <Wrapper flexDirectionRow alignItemsCenter flex={1}>
                        <Images.Profile
                            source={{ uri: avatar }}
                            shadow
                            size={totalSize(10)}
                        />
                        <Spacer isBasic horizontal />
                        <Wrapper>
                            <Text isSmallTitle isTextColor2 isBoldFont>{firstName} {lastName}</Text>
                            <Spacer isTiny />
                            <Text isSmall isLightGray >@{userName}</Text>
                        </Wrapper>
                    </Wrapper>
                    <Icons.Button
                        iconName={'dots-vertical'}
                        iconSize={totalSize(2.5)}
                        buttonSize={totalSize(3.5)}
                        buttonColor={colors.appColor1 + '20'}
                        iconColor={colors.appTextColor2}
                        isRound
                        onPress={() => navigate(routes.profileMenu)}
                    />
                </Wrapper>
                <Spacer isBasic />
                <MemberShipCard
                    hasMembership={hasMembership}
                    onPressJoinNow={() => { navigate(routes.becomeGuildMember) }}
                    onPress={() => {
                        hasMembership ?
                            [navigate(routes.membership,
                                // { data: subscribedGuildPackageDetail }
                            )
                            ] :
                            null
                    }}
                    packageImage={subscribedGuildPackage?.media || null}
                    packageTitle={subscribedGuildPackage?.title || null}
                    packageNextPaymentDate={nextPaymentDate}
                />
                <Spacer isSmall />
                {
                    myAllProducts ?
                        myAllProducts?.length ?
                            myAllProducts.map((item, index) => {
                                return (
                                    <Wrapper key={index} marginVerticalBase>
                                        <Wrapper marginHorizontalBase>
                                            <Text isTinyTitle isBoldFont>{item.category}</Text>
                                        </Wrapper>
                                        <Spacer isBasic />
                                        <Common.ProductsPrimaryHorizontal
                                            data={item.products}
                                            onPressItem={(item, index) => navigate(routes.digitalProductsFlow.productDetail, { data: item, isBought: true })}
                                            imageStyle={[(index === 1 || index === 2) && { height: height(22.5) }]}
                                        />
                                    </Wrapper>
                                )
                            })
                            :
                            <Common.NoDataViewPrimary
                                containerStyle={{ paddingTop: height(12) }}
                                text={'No Products Yet'}
                            />
                        :
                        <Loaders.Boxes
                            containerStyle={{ paddingTop: height(15) }}
                            size={totalSize(8)}
                        />

                }

                <Spacer isDoubleBase />
            </ScrollViews.WithKeyboardAvoidingView>
            {/* <MusicPlayer /> */}
        </Wrapper>
    )
}

const MemberShipCard = ({ onPress, hasMembership, onPressJoinNow, packageImage, packageTitle, packageNextPaymentDate }) => {
    return (
        <Pressable onPress={onPress}>
            <Wrapper isColored paddingVerticalSmall paddingHorizontalSmall style={{ backgroundColor: colors.appColor5 }}>
                <Wrapper flexDirectionRow>
                    {
                        !hasMembership ?
                            <Icons.Button
                                customIcon={appIcons.crown}
                                buttonSize={totalSize(8.5)}
                                iconSize={totalSize(6)}
                            />
                            :
                            <Images.SqareRound
                                source={{ uri: packageImage || appImages.noImageAvailable }}
                                size={totalSize(8.5)}
                            />
                    }
                    <Spacer isSmall horizontal />
                    <Wrapper flex={1} justifyContentSpaceBetween>
                        {
                            !hasMembership ?
                                <Wrapper>
                                    <Spacer isTiny />
                                    <Text isTinyTitle isTextColor2>Become a Guild Member</Text>
                                </Wrapper>
                                :
                                <Wrapper>
                                    <Spacer isTiny />
                                    <Text isTinyTitle isTextColor2>You're a Guild Member</Text>
                                    <Spacer isSmall />
                                    <Text isSmall isPrimaryColor isBoldFont>{packageTitle}</Text>

                                </Wrapper>
                        }
                        <Wrapper alignItemsFlexEnd={!hasMembership}>
                            {
                                !hasMembership ?
                                    <Buttons.ColoredSmall
                                        text={'Join Now'}
                                        onPress={onPressJoinNow}
                                        buttonStyle={[appStyles.paddingHorizontalSmall, { borderRadius: 100 }]}
                                        textStyle={[appStyles.textRegular, appStyles.fontBold, appStyles.textWhite]}
                                    />
                                    :
                                    <Text isTiny isTextColor2>Next Payment Due: {packageNextPaymentDate}</Text>
                            }
                        </Wrapper>
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        </Pressable>
    )
}