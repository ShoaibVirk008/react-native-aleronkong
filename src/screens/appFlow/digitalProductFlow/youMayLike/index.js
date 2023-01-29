import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Buttons, Common, Headers, Loaders, Wrapper } from '../../../../components';
import { navigate } from '../../../../navigation/rootNavigation';
import { Api, appStyles, DummyData, product_categories, product_categories_labels, routes, sizes } from '../../../../services';

export default function Index({ navigation, route }) {
    const { replace } = navigation
    const productDetail = route?.params?.data || null
    const { type, category, image, title, available_colors,
        available_sizes, price, rating, reviews_count } = productDetail

    const isAudioBook = category.title === product_categories_labels.AudioBook
    const isComic = category.title === product_categories_labels.Comic
    const isEBook = category.title === product_categories_labels.Ebook
    const audioBooks = [...DummyData.audio_books.slice(), ...DummyData.audio_books.slice(), ...DummyData.audio_books.slice()]
    const comics = [...DummyData.comics.slice(), ...DummyData.comics.slice(), ...DummyData.comics.slice()]
    const eBooks = [...DummyData.e_books.slice(), ...DummyData.e_books.slice(), ...DummyData.e_books.slice()]

    const products = isAudioBook ? audioBooks : isComic ? comics : eBooks

    //local states
    const [trendingProducts, setTrendingProducts] = useState(null)

    useEffect(() => {
        handleGetTrendingProducts()
    }, [])

    const handleGetTrendingProducts = async () => {
        await Api.getTrendingProducts({ category: category?._id })
            .then(res => {
                if (res) {
                    setTrendingProducts(res.data)
                }
            })
    }
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'You May Also Like'}
                containerStyle={{ borderBottomWidth: 0 }}
            />
            {
                trendingProducts ?
                    trendingProducts?.length ?
                        <Common.ProductsPrimaryVertical2
                            data={trendingProducts}
                            onPressItem={(item, index) => navigate(routes.digitalProductsFlow.productDetail, { data: item, })}
                            imageStyle={[(isComic || isEBook) && { height: height(25) }]}
                        />
                        :
                        <Common.NoDataViewPrimary
                            text='No Related Products Found'
                        />
                    :
                    <Loaders.Boxes />
            }
            <Wrapper background1 paddingVerticalSmall style={[appStyles.shadowExtraDark, { paddingBottom: sizes.marginVertical / 1.5 }]} >
                <Buttons.Colored
                    text={'Continue'}
                    onPress={() => navigate(routes.store)}
                />
            </Wrapper>
        </Wrapper>
    )
}
