import React, { Component, useEffect, useState } from 'react';
import { FlatList, Image, View, Pressable, ScrollView } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Common, Spacer, Wrapper, Text, ScrollViews, Loaders } from '../../../components';
import { navigate } from '../../../navigation/rootNavigation';
import { Api, appImages, appStyles, colors, DummyData, HelpingMethods, product_categories_labels, product_typees, product_types, routes, sizes } from '../../../services';
//const topTabs = [{ label: 'All Items' }, { label: 'Signed Books' }, { label: 'Hoddies' }, { label: 'Posters' }, { label: 'Masks' }, { label: 'Posters' }]
const tempShowCaseProducts = DummyData.audio_books.slice()
// const allProducts = [
//     {
//         category: 'Signed Books',
//         products: [...DummyData.e_books.slice()],
//     },
//     {
//         category: 'Hoddies',
//         products: [...DummyData.products.slice(), ...DummyData.products.slice()],
//     },
//     {
//         category: 'Designs',
//         products: [...DummyData.products.slice(), ...DummyData.products.slice()],
//     },
//     {
//         category: 'Posters',
//         products: [...DummyData.products.slice(), ...DummyData.products.slice()],
//     },
//     {
//         category: 'Masks',
//         products: [...DummyData.products.slice(), ...DummyData.products.slice()],
//     },
// ]
export default function Index({ navigation, route }) {
    const eBooks = [...DummyData.e_books.slice(), ...DummyData.e_books.slice(), ...DummyData.e_books.slice()]

    const [showCaseProducts, setShowCaseProducts] = useState(null)
    const [topTabs, setTopTabs] = useState(null)
    const [selectedTopTabIndex, setTopTabIndex] = useState(0)
    const [allProducts, setAllProducts] = useState(null)
    const [productsByCategory, setProductsByCategory] = useState(null)
    const [loadingAllData, setLoadingAllData] = useState(true)
    const [loadingProductsByCategory, setLoadingProductsByCategory] = useState(false)
    const [productsByCategoryCurrentPage, setProductsByCategoryCurrentPage] = useState(1)
    const [productsByCategoryPages, setProductsByCategoryPages] = useState(1)
    const [loadingMoreProductsByCategory, setLoadingMoreProductsByCategory] = useState(false)

    const selectedTab = topTabs ? topTabs[selectedTopTabIndex] : null
    const isAudioBook = selectedTab?.label === product_categories_labels.AudioBook
    const isComic = selectedTab?.label === product_categories_labels.Comic
    const isEBook = selectedTab?.label === product_categories_labels.Ebook

    useEffect(() => {
        getAllData()
    }, [])

    useEffect(() => {
        (selectedTopTabIndex > 0) && handleGetProductsByCategory()
    }, [selectedTopTabIndex])

    const getAllData = async () => {
        await handleShowCaseProducts()
        await handleGetCategories()
        await handleGetAllItems()
        setLoadingAllData(false)
    }
    const handleShowCaseProducts = async () => {
        await Api.getAllShowcaseProducts()
            .then(res => {
                if (res) {
                    setShowCaseProducts(res.data)
                }
            })
    }
    const handleGetCategories = async () => {
        await Api.getProductCategories()
            .then(res => {
                if (res) {
                    let tempTopTabs = [{ label: 'All Items', value: 'all' }]
                    for (const category of res.data) {
                        const categoryItem = {
                            label: category.title,
                            value: category._id
                        }
                        tempTopTabs.push(categoryItem)
                    }
                    setTopTabs(tempTopTabs)
                }
            })
    }
    const handleGetAllItems = async () => {
        await Api.getStoreProducts({})
            .then(res => {
                if (res) {
                    setAllProducts(res.data)
                }
            })
    }
    const handleGetProductsByCategory = async () => {
        if (selectedTab) {
            setLoadingProductsByCategory(true)
            await Api.getAlLProducts({ category: selectedTab.value, page: 1 })
                .then(res => {
                    if (res) {
                        const tempProducts = res?.data?.data
                        setProductsByCategory(tempProducts)
                        setProductsByCategoryCurrentPage(1)
                        setProductsByCategoryPages(res?.data?.pages)
                        //setProductsByCategoryPages(2)
                    }
                })
            setLoadingProductsByCategory(false)
        }
    }
    const handleLoadMoreProductsByCategory = async ({ nativeEvent }) => {
        if ((selectedTopTabIndex > 0)) {
            const endReached = HelpingMethods.isCloseToBottom(nativeEvent)
            if (
                endReached &&
                !loadingMoreProductsByCategory &&
                (productsByCategoryCurrentPage < productsByCategoryPages) &&
                productsByCategory?.length
            ) {
                setLoadingMoreProductsByCategory(true)
                await Api.getAlLProducts({
                    category: selectedTab.value,
                    page: productsByCategoryCurrentPage + 1
                }).
                    then(res => {
                        if (res) {
                            const newProducts = [...productsByCategory, ...res.data.data]
                            console.log('newProducts: ', newProducts)
                            setProductsByCategory(newProducts)
                            setProductsByCategoryCurrentPage(res.data.page)
                        }
                    })
                setLoadingMoreProductsByCategory(false)
            }
        }
    }

    if (loadingAllData) {
        return (
            <Loaders.Boxes />
        )
    }
    return (
        <Wrapper isMain>
            <Spacer isStatusBarHeigt />
            <ScrollView
                stickyHeaderIndices={[1]}
                onScroll={handleLoadMoreProductsByCategory}
                scrollEventThrottle={16}
            >
                <Wrapper>
                    <Spacer isSmall />
                    <ShowCaseProducts
                        data={showCaseProducts}
                        onPressItem={(item, index) => {
                            const isDigital = item.type === product_types.digital
                            isDigital ?
                                navigate(routes.digitalProductsFlow.productDetail, { data: item, })
                                :
                                navigate(routes.productDetail, { data: item, })
                        }}
                    />
                    <Spacer isBasic />
                </Wrapper>
                <Common.ButtonsGroupPrimary
                    data={topTabs}
                    initalIndex={selectedTopTabIndex}
                    onPressButton={(item, index) => setTopTabIndex(index)}
                    activeTextStyle={[appStyles.textRegular, appStyles.textWhite]}
                    inActiveTextStyle={[appStyles.textRegular, appStyles.textPrimaryColor]}
                    inActiveButtonStyle={[{ borderRadius: sizes.cardRadius, backgroundColor: colors.transparent, borderWidth: 1, borderColor: colors.appColor1 }, appStyles.paddingHorizontalSmall, appStyles.paddingVerticalSmall]}
                    activeButtonStyle={{ borderRadius: sizes.cardRadius }}
                    containerStyle={[{ backgroundColor: colors.appBgColor1 }, appStyles.paddingVerticalSmall]}
                />
                {
                    selectedTopTabIndex === 0 ?
                        <>
                            {
                                allProducts.map((item, index) => {
                                    const isAudioBook = item.category === product_categories_labels.AudioBook
                                    const isComic = item.category === product_categories_labels.Comic
                                    const isEBook = item.category === product_categories_labels.Ebook
                                    return (
                                        <Wrapper key={index} marginVerticalBase>
                                            <Wrapper marginHorizontalBase>
                                                <Text isTinyTitle isBoldFont>{item.category}</Text>
                                            </Wrapper>
                                            <Spacer isBasic />
                                            <Common.ProductsPrimaryHorizontal
                                                data={item.products}
                                                onPressItem={(item, index) => {
                                                    const isDigitalProduct = item.type === product_types.digital
                                                    isDigitalProduct ?
                                                        navigate(routes.digitalProductsFlow.productDetail, { data: item, })
                                                        :
                                                        navigate(routes.productDetail, { data: item })

                                                }}
                                                imageStyle={[(isComic || isEBook) && { height: height(25) }]}
                                            />
                                        </Wrapper>
                                    )
                                })
                            }
                        </>
                        :
                        <>
                            {
                                !loadingProductsByCategory ?
                                    productsByCategory?.length ?
                                        <>
                                            <Common.ProductsPrimaryVertical2
                                                data={productsByCategory}
                                                onPressItem={(item, index) => {
                                                    const isDigitalProduct = item.type === product_types.digital
                                                    isDigitalProduct ?
                                                        navigate(routes.digitalProductsFlow.productDetail, { data: item, })
                                                        :
                                                        navigate(routes.productDetail, { data: item, })
                                                }}
                                                imageStyle={[(isComic || isEBook) && { height: height(25) }]}
                                            />
                                            <Wrapper alignItemsCenter>
                                                <Spacer isBasic />
                                                {
                                                    productsByCategoryCurrentPage < productsByCategoryPages ?
                                                        <Loaders.BoxSmall
                                                        />
                                                        :
                                                        // <Text isRegular isGray>No More Products</Text>
                                                        null
                                                }
                                                <Spacer isDoubleBase />
                                            </Wrapper>
                                        </>
                                        :
                                        <Common.NoDataViewPrimary
                                            containerStyle={{ paddingTop: height(12) }}
                                            text={'No ' + selectedTab?.label + 's Found'}
                                        />
                                    :
                                    <Loaders.Boxes
                                        containerStyle={{ paddingTop: height(15) }}
                                        size={totalSize(8)}
                                    />

                            }
                        </>
                }
            </ScrollView>
        </Wrapper>
    )
}

const ShowCaseProducts = ({ data, onPressItem }) => {
    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={() => <Spacer width={sizes.marginHorizontal} />}
            ListHeaderComponent={() => <Spacer width={sizes.marginHorizontal} />}
            ItemSeparatorComponent={() => <Spacer width={sizes.marginHorizontal / 2} />}
            renderItem={({ item, index }) => {
                const {
                    media
                } = item
                const image = media?.length ? media[0] : appImages.noImageAvailable
                return (
                    <Pressable
                    key={index}
                        onPress={() => onPressItem(item, index)}
                    >
                        <Image
                            source={{ uri: image }}
                            style={{ height: height(30), width: width(90), borderRadius: sizes.cardRadius }}
                        />
                    </Pressable>
                )
            }}
        />
    )
}