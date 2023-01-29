import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import React, { Component, useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { Icons, Images, ScrollViews, Spacer, Wrapper, Text, Ratings, Buttons, Cards, Common, Loaders, TextInputs } from '../../../../components';
import { navigate } from '../../../../navigation/rootNavigation';
import { Api, appImages, appStyles, colors, DummyData, HelpingMethods, product_categories, product_categories_labels, routes, sizes } from '../../../../services';
import { setNowPlaying, setNowPlayingStatus } from '../../../../services/store/actions';
const topTabs = [
    {
        label: 'Description'
    },
    {
        label: 'Reviews'
    },
    {
        label: 'More Details'
    }
]
export default function Index({ navigation, route }) {

    //redux
    const currentUser = useSelector(state => state.user.currentUser)
    const { boughtDigitalProducts } = currentUser
    const productData = route?.params?.data || null
    const isProductBought = HelpingMethods.IsProductBought(productData?._id)
    console.log('isProductBought: ', isProductBought)
    const { _id, media, category, title, description, price,
        avgRating, reviews,
        asin, publicationDate, language, fileSize,
        textToSpeech, enhancedTypeSetting, xRay, wordWise,
        printLength, lending, simultaneousDeviceUsage
    } = productData
    const isAudioBook = category.title === product_categories_labels.AudioBook
    const isComic = category.title === product_categories_labels.Comic
    const isEBook = category.title === product_categories_labels.Ebook
    const rating = avgRating
    const reviews_count = reviews?.length || 0
    //local states
    const [tabs] = useState(topTabs)
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [productReviews, setProductReviews] = useState(null)

    const isProductReviewed = productReviews ? HelpingMethods.isProductReviewed(productReviews) : true
    console.log('isProductReviewed: ', isProductReviewed)
    //const productReviews = [...DummyData.productReviews.slice(), ...DummyData.productReviews.slice()]
    const moreDetails = {
        asin: asin, publicationDate: moment(publicationDate).format('MMMM DD, YYYY'),
        language, fileSize: Math.round((fileSize / 1024)) + ' KB',
        simualtanousDeviceUsage: simultaneousDeviceUsage,
        textToSpeach: textToSpeech ? 'Enabled' : 'Disabled',
        enhancedTypesetting: enhancedTypeSetting ? 'Enabled' : 'Disabled',
        xRay: xRay ? 'Enabled' : 'Disabled',
        wordWise: wordWise ? 'Enabled' : 'Disabled',
        printLength: printLength + ' Pages',
        lending: lending ? 'Enabled' : 'Disabled',
    }

    useEffect(() => {
        (selectedTabIndex === 1 && productReviews === null) && getReviews()
    }, [selectedTabIndex, productReviews])

    // useFocusEffect(useCallback(() => {
    //     (selectedTabIndex === 1 && productReviews === null) && getReviews()
    // }, [selectedTabIndex, productReviews]))

    const getReviews = () => {
        Api.getProductReviews({ productId: _id })
            .then(res => {
                if (res) {
                    setProductReviews(res.data)
                } else {
                    setProductReviews([])
                }
            })
    }


    return (
        <Wrapper isMain background2={selectedTabIndex === 1}>
            <Wrapper background1>
                <Spacer isStatusBarHeigt />
            </Wrapper>
            <ScrollViews.WithKeyboardAvoidingView
                bounces={false}
                footer={
                    <Wrapper background1 paddingVerticalSmall style={[appStyles.shadowExtraDark, { paddingBottom: sizes.marginVertical / 1.5 }]} >
                        {
                            isProductBought ?
                                <Wrapper marginHorizontalSmall>
                                    <Buttons.Colored
                                        text={isAudioBook ? 'Start Listening' : 'Start Reading'}
                                        onPress={() => {
                                            if (isAudioBook) {
                                                // navigate(routes.digitalProductsFlow.listenAudioBook, { data: productData })
                                                setNowPlaying(productData)
                                                setNowPlayingStatus(true)
                                            } else {
                                                navigate(routes.digitalProductsFlow.readBook, { data: productData })
                                            }
                                        }}
                                    />
                                </Wrapper>
                                :
                                <Wrapper flexDirectionRow alignItemsCenter justifyContentSpaceBetween marginHorizontalBase>
                                    <Text isMediumTitle>${price}</Text>
                                    <Buttons.Colored
                                        onPress={() => navigate(routes.digitalProductsFlow.buyProduct, { data: productData })}
                                        //onPress={() => navigate(routes.digitalProductsFlow.youMayLike, { data: productData })}
                                        text={'Buy Now'}
                                        buttonStyle={[appStyles.marginHorizontalZero, { paddingHorizontal: sizes.marginHorizontal * 2.5 }]}
                                    />
                                </Wrapper>
                        }
                    </Wrapper>
                }
            >
                <Wrapper background1 style={[appStyles.shadow]}>

                    <Spacer isBasic />
                    <Wrapper alignItemsCenter>
                        <Images.SqareRound
                            source={{ uri: media?.[0] }}
                            //size={width(70)}
                            style={[{ borderRadius: 0, }, isAudioBook ? styles.audioBookImage : isComic ? styles.comicImage : styles.eBookImage]}
                        />
                        {
                            isAudioBook && !isProductBought ?
                                <>
                                    <Spacer isSmall />
                                    <Buttons.ColoredSmall
                                        text={'Listen to Sample'}
                                        iconName='play'
                                        iconType={'evilicon'}
                                        textStyle={[appStyles.textSmall, appStyles.textPrimaryColor, appStyles.fontBold]}
                                        buttonStyle={[{ backgroundColor: colors.appColor1 + '20' }, appStyles.paddingVerticalTiny, appStyles.paddingHorizontalSmall]}
                                        iconColor={colors.appColor1}
                                        onPress={() => navigate(routes.digitalProductsFlow.listenSample, { data: productData })}

                                    />
                                </>
                                :
                                null
                        }
                    </Wrapper>
                    <Spacer isBasic />
                    <Wrapper marginHorizontalBase>
                        <Text isSmallTitle isTextColor3>{title}</Text>
                        <Spacer isSmall />
                        <Wrapper flexDirectionRow alignItemsCenter>
                            <Ratings.Primary
                                value={rating}
                                iconSize={totalSize(2)}
                            />
                            <Spacer isTiny horizontal />
                            <Text isSmall isTextColor3>{`${rating}(${reviews_count})`}</Text>
                        </Wrapper>
                    </Wrapper>
                    <Spacer isBasic />
                    <Buttons.ButtonGroupAnimated
                        initalIndex={selectedTabIndex}
                        data={tabs}
                        indentifier='label'
                        onPressButton={(item, index) => {
                            setSelectedTabIndex(index)
                            //navigationHandler(item.route)
                            //this.handleOnPress(item, key)
                        }}
                        //scrollEnabled={false}
                        //iconSize={totalSize(2.5)}
                        containerStyle={[{}]}
                        //inActiveButtonStyle={[{ width: (width(100) / 3), backgroundColor: colors.transparent, borderRadius: 0, marginRight: sizes.marginHorizontal, marginLeft: 0, marginRight: 0 }, appStyles.paddingHorizontalZero]}
                        //activeButtonForceStyle={[{ position: 'absolute', bottom: 0, height: height(0.75), backgroundColor: colors.appColor2, borderRadius: sizes.cardRadius, width: (width(100) / 3) - width(10), left: width(5) }, appStyles.center,]}
                        inActiveButtonStyle={[{ backgroundColor: colors.transparent, borderRadius: 0, marginRight: sizes.marginHorizontal / 2, marginLeft: sizes.marginHorizontal / 2, }, appStyles.paddingHorizontalSmall]}
                        activeButtonForceStyle={[{ position: 'absolute', bottom: 0, height: height(0.4), backgroundColor: colors.appColor1, borderTopRightRadius: sizes.cardRadius, borderTopLeftRadius: sizes.cardRadius, },]}
                        activeButtonContent={<Wrapper>
                        </Wrapper>}
                        //activeButtonStyle={[{ borderRadius: sizes.cardRadius, backgroundColor: colors.appColor2 }]}
                        //activeTextStyle={[appStyles.textMedium, appStyles.fontBold]}
                        inActiveTextStyle={[appStyles.textRegular, appStyles.textGray, appStyles.fontMedium, {}]}
                        activeTintColor={colors.appTextColor1}
                        inActiveTintColor={colors.appColor1}
                        activeTextStyle={[appStyles.textRegular, appStyles.fontMedium, {}]}
                    />
                </Wrapper>
                <Info
                    index={selectedTabIndex}
                    description={description}
                    productReviews={productReviews}
                    moreDetails={moreDetails}
                    onPressWriteReview={
                        (isProductBought && !isProductReviewed) ?
                            () => {
                                navigate(routes.writeReview, {
                                    productData: productData,
                                    handleRefresh: getReviews
                                })
                            } :
                            null}
                />
                <Spacer isDoubleBase />
            </ScrollViews.WithKeyboardAvoidingView>
            <Icons.BackFloating />
        </Wrapper>
    )
}

const Info = ({ index, description, productReviews, moreDetails, onPressWriteReview }) => {
    const isDescription = index === 0
    const isReviews = index === 1
    const isMoreDetails = index === 2
    return (
        <>
            {
                isDescription ?
                    <Wrapper flex={1}>
                        <Spacer />
                        <Wrapper marginHorizontalBase>
                            <Text isRegular>{description}</Text>
                        </Wrapper>
                    </Wrapper>
                    : isReviews ?
                        <Wrapper flex={1}>
                            <Spacer isTiny />
                            {
                                productReviews ?
                                    <>
                                        {
                                            onPressWriteReview ?
                                                <>
                                                    <Spacer isSmall />
                                                    <TextInputs.Colored
                                                        placeholder={'Write a review'}
                                                        inputStyle={[appStyles.textSmall, { height: height(5) }]}
                                                        inputTextStyle={[appStyles.textSmall, appStyles.textGray]}
                                                        //containerStyle={[ {backgroundColor:colors.appBgColor1}]}

                                                        inputContainerStyle={{ backgroundColor: colors.appBgColor1, borderRadius: sizes.inputRadius, borderWidth: 1, borderColor: colors.appBgColor3 }}
                                                        onPress={onPressWriteReview}
                                                    />
                                                </>
                                                :
                                                null
                                        }

                                        {
                                            productReviews?.length ?
                                                <ReviewsPrimary
                                                    data={productReviews}
                                                />
                                                :
                                                <Wrapper>
                                                    <Common.NoDataViewPrimary
                                                        iconName='message-star'
                                                        iconType='material-community'
                                                        text='No Review Yet'
                                                        containerStyle={[appStyles.alignItemsCenter, appStyles.paddingVerticalLarge]}
                                                    />
                                                </Wrapper>
                                        }
                                    </>
                                    :
                                    <Wrapper alignItemsCenter style={{ paddingTop: height(12.5) }}>
                                        <Loaders.BoxSmall />
                                    </Wrapper>
                            }
                        </Wrapper>
                        :
                        <Wrapper flex={1}>
                            <Spacer isSmall />
                            {
                                Object.keys(moreDetails).map((key, index) => {
                                    const subTheme = moreDetails[key]
                                    const result = key.replace(/([A-Z])/g, " $1");
                                    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
                                    return (
                                        <Wrapper key={index} marginHorizontalBase paddingVerticalSmall>
                                            <Text isSmall isBoldFont>{finalResult}</Text>
                                            <Spacer isSmall />
                                            <Text isMedium>{subTheme}</Text>
                                        </Wrapper>
                                    )
                                })
                            }
                        </Wrapper>
            }
        </>
    )
}
const styles = StyleSheet.create({
    audioBookImage: {
        height: width(70),
        width: width(70)
    },
    comicImage: {
        height: height(35),
        width: width(45)
    },
    eBookImage: {
        height: height(30),
        width: width(50)
    }
})

const ReviewsPrimary = ({ data }) => {
    return (
        <>
            {
                data.map((item, index) => {
                    const { creator, rating, createdAt, review } = item
                    const image = creator?.avatar || appImages.noUser
                    const name = (creator?.firstName || 'User') + ' ' + (creator?.lastName || 'Name')
                    return (
                        <ReviewPrimary
                            key={index}
                            animation={index <= 3 && 'fadeInUp'}
                            duration={300 + (index * 100)}
                            userImage={image}
                            userName={name}
                            rating={rating}
                            date={moment(createdAt).fromNow()}
                            comment={review}
                            containerStyle={{ marginTop: sizes.marginVertical / 2 }}
                        />
                    )
                })
            }
        </>
    )
}

const ReviewPrimary = ({ userImage, userName, rating, date, comment, containerStyle, ...props }) => {
    return (
        <Wrapper isColored background1 style={containerStyle} {...props}>
            <Cards.UserPrimary
                imageUri={userImage}
                imageSize={totalSize(4.25)}
                title={userName}
                containerStyle={[appStyles.paddingHorizontalZero]}
                subContainerStyle={[appStyles.paddingVerticalZero]}
                rowContainerStyle={[appStyles.alignItemsCenter]}
                subRowContainerStyle={[appStyles.alignItemsCenter]}
                titleStyle={[appStyles.textRegular, appStyles.fontBold, appStyles.textColor3]}
                rightBottom={
                    <>
                        <Spacer isTiny />
                        <Wrapper flexDirectionRow alignItemsCenter>
                            <Ratings.Primary
                                value={rating}
                                iconSize={totalSize(1)}
                            />
                            <Spacer isTiny horizontal />
                            <Text isTiny isTextColor2>{`${rating}`}</Text>
                        </Wrapper>
                    </>
                }
                right={
                    <Text isSmall isTextColor2>{date}</Text>
                }
                bottom={
                    <>
                        <Spacer isSmall />
                        <Text isRegular isTextColor2>{comment}</Text>
                    </>
                }
            />
        </Wrapper>
    )
}

