import React, { Component, useState } from 'react';
import { View, Image } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { Headers, Icons, Wrapper, Text, Spacer, Buttons, ScrollViews, Lines, Common, Cards, Ratings, Loaders } from '../../../../components';
import { navigate } from '../../../../navigation/rootNavigation';
import { DummyData, sizes, colors, appStyles, routes, appImages, Api } from '../../../../services';
import { setCurrentUser } from '../../../../services/store/actions';



export default function Index({ navigation, route }) {
    const { replace } = navigation
    const productData = route?.params?.data || null
    // console.log('productData: ',productData)
    // const { type, category, image, title, available_colors,
    //     available_sizes, price, rating, reviews_count } = productData
    const { media, category, title, description, price,
        asin, publicationDate, language, fileSize,
        textToSpeech, enhancedTypeSetting, xRay, wordWise,
        printLength, lending, simultaneousDeviceUsage
    } = productData
    // console.log('media: ',media)
    const isAudioBook = category.title === 'AudioBook'
    const isComic = category.title === 'Comic'
    const isEBook = category.title === 'Ebook'
    const rating = 4.3
    const reviews_count = '17'
    const subTotal = price
    const tax = Math.round((price / 100) * 2)
    const total = subTotal + tax


    const user = useSelector(state => state.user)
    const { currentUser } = user
    const { defaultPaymentMethod, defaultAddress, boughtDigitalProducts } = currentUser

    const [loadingBuy, setLoadingBuy] = useState(false)



    const handleBuyProduct = async () => {
        setLoadingBuy(true)
        await Api.buyProduct({
            product: productData?._id,
            paymentMethod: defaultPaymentMethod?.id
        }).then(res => {
            if (res) {
                setCurrentUser({ ...currentUser, boughtDigitalProducts: [...boughtDigitalProducts, productData?._id] })
                replace(routes.digitalProductsFlow.orderConfirmation, { data: productData })
            }
        })
        setLoadingBuy(false)
    }
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'Buy a Book'}
                showBackArrow
            />
            <ScrollViews.WithKeyboardAvoidingView
                footer={
                    <Wrapper marginHorizontalBase marginVerticalBase>
                        <Buttons.Colored
                            text={'Buy'}
                            onPress={handleBuyProduct}
                        />
                        <Spacer isBasic />
                    </Wrapper>
                }
            >
                <Spacer isBasic />
                <Cards.UserPrimary
                    imageUri={media?.length ? media[0] : appImages.noImageAvailable}
                    imageSize={width(30)}
                    imageStyle={{ borderRadius: 0 }}
                    title={title}
                    containerStyle={[appStyles.paddingHorizontalSmall]}
                    subContainerStyle={[appStyles.paddingVerticalZero]}
                    //rowContainerStyle={[appStyles.alignItemsCenter]}
                    //subRowContainerStyle={[appStyles.alignItemsCenter]}
                    titleStyle={[appStyles.h6, appStyles.fontBold, appStyles.textColor3]}
                    rightBottom={
                        <>
                            <Spacer isTiny />
                            <Wrapper flexDirectionRow alignItemsCenter>
                                <Ratings.Primary
                                    value={rating}
                                    iconSize={totalSize(2)}
                                />
                                <Spacer isTiny horizontal />
                                <Text isSmall isTextColor2>{`${rating}(${reviews_count})`}</Text>
                            </Wrapper>
                        </>
                    }
                />
                <Spacer isBasic />
                <Wrapper marginHorizontalSmall>
                    <Lines.Horizontal />
                </Wrapper>
                <Spacer isBasic />
                <Common.OrderPriceInfo
                    subtotal={subTotal}
                    tax={tax}
                    total={total}
                />
                <Spacer isBasic />
                <Wrapper marginHorizontalSmall>
                    <Lines.Horizontal />
                </Wrapper>
                <Spacer isBasic />
                <Common.DefaultPaymentMethod />
                <Spacer isBasic />
            </ScrollViews.WithKeyboardAvoidingView>
            <Loaders.SmileAbsolute
                isVisible={loadingBuy}
            />
        </Wrapper>
    )
}

