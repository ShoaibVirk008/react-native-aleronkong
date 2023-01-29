import React, { Component, useCallback, useEffect, useRef, useState } from 'react';
import { View, FlatList } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { Icons, ScrollViews, Spacer, Wrapper, Text, Buttons, Common } from '../../../components';
import { goBack, navigate } from '../../../navigation/rootNavigation';
import { Api, appImages, appStyles, colors, HelpingMethods, routes, sizes } from '../../../services';
import { setCartDetail, setCurrentUser } from '../../../services/store/actions';
const tempAvailableSizes = [{ label: 'Small' }, { label: 'Medium' }, { label: 'Large' }, { label: 'Extra Large' }]
const tempAvailableColors = [{ label: 'Black' }, { label: 'Red' }, { label: 'Brown' }, { label: 'Silver' }]


export default function Index({ navigation, route }) {
    const { replace } = navigation
    const productData = route?.params?.data
    const {
        _id, media, image, title, availableColors,
        availableSizes, price, rating, reviews_count,
        description,
    } = productData

    //redux
    const user = useSelector(state => state.user)
    const { currentUser } = user

    const productImages = media ? media : [appImages.noImageAvailable]
    //const productAvailableSizes = availableSizes.map((item, index) => { return { label: item } })
    //const productAvailableSizes = tempAvailableSizes
    //const productAvailableColors = availableColors.map((item, index) => { return { label: item } })
    //const productAvailableColors = tempAvailableColors
    //const availableColors = ['#313443', '#2F878B', '#D97DFF', '#000000', '#E6E6E6', '#F4FF60']
    //const _description = 'Duis ut urna commodo, commodo tellus ac, consequat justo. Maecenas nec est ac purus mattis tristique vitae vel leo. Duis ac eros vel nunc aliquet ultricies vel at metus. Praesent a sagittis leo. Maecenas volutpat, justo in egestas mattis, lectus dui venenatis ex, consequat imperdiet velit odio eget dolor. Duis ut urna commodo, commodo tellus ac, consequat justo. Maecenas nec est ac purus mattis tristique vitae vel leo. Duis ac eros vel nunc aliquet ultricies vel at metus. Praesent a sagittis leo. Maecenas volutpat, justo in egestas mattis, lectus dui venenatis ex, consequat imperdiet velit odio eget dolor. Duis ut urna commodo, commodo tellus ac, consequat justo. Maecenas nec est ac purus mattis tristique vitae vel leo. Duis ac eros vel nunc aliquet ultricies vel at metus. Praesent a sagittis leo. Maecenas volutpat, justo in egestas mattis, lectus dui venenatis ex, consequat imperdiet velit odio eget dolor.'
    const [productAvailableSizes, setProductAvailableSizes] = useState(null)
    const [productAvailableColors, setProductAvailableColors] = useState(null)
    const [selectedColorIndex, setSelectedColorIndex] = useState(0)
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)
    const [isAddedToCart, setAddedToCart] = useState(false)
    const [afterAddedCart, setAfterAddedCart] = useState(true)
    const [loadingAddToCart, setLoadingAddRemoveCart] = useState(false)

    const isAddedToCartNow = isAddedToCart && afterAddedCart

    useEffect(() => {
        getSetData()
    }, [])

    const getSetData = () => {
        if (availableColors) {
            const colors = availableColors.map((item, index) => { return { label: item } })
            console.log('colors: ', colors)
            setProductAvailableColors([...colors])
        }
        if (availableSizes) {
            const sizes = availableSizes.map((item, index) => { return { label: item } })
            console.log('sizes: ', sizes)
            setProductAvailableSizes(sizes)
        }
    }

    useEffect(() => {
        isAddedToCart ? [
            setTimeout(() => {
                HelpingMethods.handleAnimation()
                setAfterAddedCart(false)
            }, 2000)
        ]
            :
            [HelpingMethods.handleAnimation(), setAfterAddedCart(true)]
    }, [isAddedToCart])


    const handleAddToCart = async () => {
        setLoadingAddRemoveCart(true)
        await Api.addToCart({
            productId: _id,
            selectedColor: productAvailableColors ? productAvailableColors[selectedColorIndex].label : '',
            selectedSize: productAvailableSizes ? productAvailableSizes[selectedSizeIndex].label : ''
        })
            .then(res => {
                if (res) {
                    const tempCartItems = res.data.items.length
                    setCurrentUser({ ...currentUser, cartItems: tempCartItems })
                    setCartDetail(res.data)
                    !isAddedToCart && setAddedToCart(true)
                }
            })
        setLoadingAddRemoveCart(false)
    }
    const handleRemoveFromCart = async () => {
        setLoadingAddRemoveCart(true)
        await Api.removeFromCart({ productId: _id })
            .then(res => {
                if (res) {
                    setAddedToCart(false)
                }
            })
        setLoadingAddRemoveCart(false)
    }
    return (
        <Wrapper isMain>
            <Spacer isStatusBarHeigt />
            <ScrollViews.WithKeyboardAvoidingView
                footer={
                    <Wrapper background1 style={[appStyles.shadowExtraDark]}>
                        <Wrapper marginHorizontalBase marginVerticalBase flexDirectionRow alignItemsCenter>
                            <Wrapper flex={1}>
                                <Text isMediumTitle>${price}</Text>
                            </Wrapper>
                            {
                                afterAddedCart ?
                                    <Buttons.Colored
                                        text={isAddedToCartNow ? 'Added to Cart' : 'Add to Cart'}
                                        iconName={'shopping-cart'}
                                        iconType={'feather'}
                                        iconSize={totalSize(1.75)}
                                        buttonStyle={[
                                            appStyles.paddingHorizontalBase,
                                            appStyles.marginHorizontalZero,
                                            isAddedToCartNow && { backgroundColor: colors.appBgColor4 }
                                        ]}
                                        iconStyle={{ marginRight: sizes.marginHorizontal / 2 }}
                                        onPress={handleAddToCart}
                                        //onPress={() => { !isAddedToCart && setAddedToCart(true) }}
                                        isLoading={loadingAddToCart}
                                    //tintColor={colors.app}
                                    />
                                    :
                                    <Buttons.Colored
                                        text={'Remove from Cart'}
                                        buttonStyle={[
                                            appStyles.paddingHorizontalBase,
                                            appStyles.marginHorizontalZero,
                                            { backgroundColor: colors.error + '20' }
                                        ]}
                                        tintColor={colors.error}
                                        onPress={handleRemoveFromCart}
                                        isLoading={loadingAddToCart}
                                    // onPress={() => [setAddedToCart(false)]}
                                    />
                            }
                        </Wrapper>
                    </Wrapper>
                }
            >
                <ImageSlider
                    data={productImages}
                />
                <Spacer isBasic />
                <Spacer isBasic />
                <Wrapper marginHorizontalBase>
                    <Text isSmallTitle >{title}</Text>
                </Wrapper>
                {
                    productAvailableColors ?
                        <>
                            <Spacer isBasic />
                            <AvailableColors
                                data={productAvailableColors}
                                selectedItemIndex={selectedColorIndex}
                                onPressItem={(item, index) => setSelectedColorIndex(index)}
                            />
                        </>
                        :
                        null
                }
                {
                    productAvailableSizes ?
                        <>
                            <Spacer isBasic />
                            <AvailableSizes
                                data={productAvailableSizes}
                                selectedItemIndex={selectedSizeIndex}
                                onPressItem={(item, index) => setSelectedSizeIndex(index)}
                            />
                        </>
                        :
                        null
                }
                <Spacer isBasic />
                <Description
                    text={description}
                />
                <Spacer isDoubleBase />
            </ScrollViews.WithKeyboardAvoidingView>
            <Wrapper isAbsolute style={{ top: sizes.statusBarHeight + sizes.baseMargin, left: sizes.marginHorizontal, right: sizes.marginHorizontal }}>
                <Wrapper flexDirectionRow justifyContentSpaceBetween>
                    <Icons.Button
                        iconName="chevron-left"
                        iconType="feather"
                        shadow
                        isRound
                        buttonSize={totalSize(3.5)}
                        iconSize={totalSize(3)}
                        iconColor={colors.appTextColor3}
                        onPress={goBack}
                    />
                    {
                        isAddedToCart ?
                            <Common.IconButtonBadge
                                iconName="shopping-cart"
                                iconType="feather"
                                badgeValue={currentUser?.cartItems || ''}
                                size={isAddedToCartNow && totalSize(5)}
                                buttonColor={colors.appBgColor1}
                                shadow
                                onPress={() => replace(routes.cart)}
                            />
                            :
                            null
                    }
                </Wrapper>
            </Wrapper>
        </Wrapper>
    )
}


const ImageSlider = ({ data }) => {
    //refs
    const swiperRef = useRef(null)

    //local constants
    const [activeSlideIndex, setActiveSlideIndex] = useState(0)

    // useEffect(() => {
    //     swiperRef.current.scrollToIndex({ index: 1, animated: false })
    // }, [])

    const _onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
        setActiveSlideIndex(viewableItems[0].index)
    }, []);
    const _viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    };
    const defaultHeight = height(45)
    return (
        <Wrapper>
            <Wrapper>
                <FlatList
                    ref={swiperRef}
                    data={data}
                    key={(item, index) => index.toString()}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    pagingEnabled
                    decelerationRate={"fast"}
                    onViewableItemsChanged={_onViewableItemsChanged}
                    viewabilityConfig={_viewabilityConfig}
                    renderItem={({ item, index }) => {
                        return (
                            <Wrapper key={index} style={{ height: height(45), width: width(100), backgroundColor: 'transparent' }}>
                                <Wrapper flex={1} style={[appStyles.center, { backgroundColor: 'transparent' }]}>
                                    <Icons.Custom
                                        icon={{ uri: item }}
                                        size={width(90)}
                                    />
                                </Wrapper>
                            </Wrapper>
                        )
                    }}
                />

            </Wrapper>
            <PagginationDots
                data={data}
                activeIndex={activeSlideIndex}
            />
        </Wrapper>
    )
}

const PagginationDots = ({ data, activeIndex }) => {
    return (
        <Wrapper flexDirectionRow justifyContentCenter>
            {
                data.map((item, index) => {
                    const is_active = index === activeIndex
                    const defaultColor = is_active ? colors.appColor1 : colors.appTextColor5
                    return (
                        <Icons.Button
                            key={index}
                            iconSize={totalSize(0.25)}
                            buttonSize={totalSize(0.5)}
                            buttonColor={defaultColor}
                            iconColor={defaultColor}
                            isRound
                            buttonStyle={{ marginHorizontal: width(1) }}
                        />
                    )
                })
            }
        </Wrapper>
    )
}

const AvailableColors = ({ data, selectedItemIndex, onPressItem }) => {
    return (
        <Wrapper >
            <Wrapper marginHorizontalBase>
                <Text isRegular isBoldFont>Available Colors</Text>
            </Wrapper>
            <Spacer isSmall />
            <Buttons.ButtonGroupAnimated
                data={data}
                initalIndex={selectedItemIndex}
                indentifier={'label'}
                onPressButton={onPressItem}
                inActiveButtonStyle={[{ borderRadius: 100, backgroundColor: colors.transparent, borderWidth: 1, borderColor: colors.appColor1 }, appStyles.paddingHorizontalSmall, appStyles.paddingVerticalTiny]}
                activeButtonStyle={{ borderRadius: 100 }}
                activeTextStyle={[appStyles.textSmall, appStyles.textWhite]}
                inActiveTextStyle={[appStyles.textSmall, appStyles.textPrimaryColor]}
            />
            {/* <Wrapper flexDirectionRow>
                <Wrapper flex={1} >
                    <FlatList
                        data={data}
                        horizontal
                        ItemSeparatorComponent={() => <Spacer isTiny horizontal />}
                        ListHeaderComponent={() => <Spacer width={sizes.marginHorizontal} />}
                        ListFooterComponent={() =>
                            <Wrapper
                                marginHorizontalTiny
                                justifyContentCenter
                                style={{ height: totalSize(4) + 4 }}>
                                <Text isRegular>View All</Text>
                            </Wrapper>}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            const isSelected = selectedItem === item
                            return (
                                <Wrapper
                                    style={{ borderRadius: 100, padding: 2, borderWidth: 2, borderColor: isSelected ? colors.appColor1 : colors.transparent }}
                                >
                                    <Icons.Button
                                        iconName={'circle'}
                                        iconColor={'red'}
                                        buttonColor={item}
                                        //buttonStyle={{ borderWidth: 2, borderColor: isSelected ? colors.appColor1 : colors.transparent }}
                                        isRound
                                        buttonSize={totalSize(3.5)}
                                        iconSize={totalSize(3)}
                                        onPress={() => onPressItem(item, index)}
                                    />
                                </Wrapper>
                            )
                        }}
                    />
                </Wrapper>
            </Wrapper> */}
        </Wrapper>
    )
}

const AvailableSizes = ({ data, selectedItemIndex, onPressItem }) => {
    return (
        <Wrapper>
            <Wrapper marginHorizontalBase>
                <Text isRegular isBoldFont>Available Sizes</Text>
                <Spacer isSmall />
            </Wrapper>
            <Buttons.ButtonGroupAnimated
                data={data}
                initalIndex={selectedItemIndex}
                indentifier={'label'}
                onPressButton={onPressItem}
                inActiveButtonStyle={[{ borderRadius: 100, backgroundColor: colors.transparent, borderWidth: 1, borderColor: colors.appColor1 }, appStyles.paddingHorizontalSmall, appStyles.paddingVerticalTiny]}
                activeButtonStyle={{ borderRadius: 100 }}
                activeTextStyle={[appStyles.textSmall, appStyles.textWhite]}
                inActiveTextStyle={[appStyles.textSmall, appStyles.textPrimaryColor]}
            />
        </Wrapper>
    )
}

const Description = ({ text }) => {
    return (
        <Wrapper>
            <Wrapper marginHorizontalBase>
                <Text isRegular isBoldFont>Description</Text>
                <Spacer isSmall />
                <Text isRegular>{text}</Text>
            </Wrapper>
        </Wrapper>
    )
}