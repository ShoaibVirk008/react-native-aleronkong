import React, { Component, useEffect, useState } from 'react';
import { View, } from 'react-native';
import { height } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Wrapper, Text, Common, ScrollViews, Spacer, TextInputs, Loaders } from '../../../components';
import { navigate } from '../../../navigation/rootNavigation';
import { Api, DummyData, fontSize, product_categories, product_categories_labels, product_types, routes, sizes } from '../../../services';
const allProducts = [
    {
        label: 'Trending AudioBooks',
        type: 'digital',
        category: 'audioBook',
        products: [...DummyData.audio_books.slice()],
    },
    {
        label: 'Trending Comics',
        type: 'digital',
        category: 'comic',
        products: [...DummyData.comics.slice(),],
    },
    {
        label: 'Trending E-Book',
        type: 'digital',
        category: 'eBook',
        products: [...DummyData.e_books.slice()],
    },
    {
        label: 'Most Popular AudioBooks',
        type: 'digital',
        category: 'audioBook',
        products: [...DummyData.audio_books.slice().reverse()],
    },
    {
        label: 'Most Popular Comics',
        type: 'digital',
        category: 'comic',
        products: [...DummyData.comics.slice().reverse()],
    },
    {
        label: 'Most Popular E-Book',
        type: 'digital',
        category: 'eBook',
        products: [...DummyData.e_books.slice().reverse()],
    },
    {
        label: 'Latest AudioBooks',
        type: 'digital',
        category: 'audioBook',
        products: [...DummyData.audio_books.slice()],
    },
    {
        label: 'Latest Comics',
        type: 'digital',
        category: 'comic',
        products: [...DummyData.comics.slice(),],
    },
    {
        label: 'Latest E-Book',
        type: 'digital',
        category: 'eBook',
        products: [...DummyData.e_books.slice()],
    },
]
export default function Index() {
    const [products, setProducts] = useState(null)

    useEffect(() => {
        handleGetProducts()
    }, [])
    const handleGetProducts = () => {
        Api.search({})
            .then(res => {
                if (res) {
                    setProducts(res.data)
                }
            })
    }
    return (
        <Wrapper isMain>
            <Spacer isStatusBarHeigt />
            <TextInputs.SearchBar
                placeholder={'Search audiobooks, comics, e-books'}
                onPress={() => { navigate(routes.searchResults) }}
                inputTextStyle={{ fontSize: fontSize.regular }}
            />
            <Spacer isSmall />
            {
                products ?
                    <ScrollViews.WithKeyboardAvoidingView>
                        {
                            products.map((item, index) => {
                                const isDigital = item.type === product_types.digital
                                const isPhysical = item.type === product_types.physical
                                const isComic = item.category === product_categories_labels.Comic
                                const isEbook = item.category === product_categories_labels.Ebook
                                const isAudioBook = item.category === product_categories_labels.AudioBook

                                return (
                                    <Wrapper key={index} marginVerticalBase>
                                        <Wrapper marginHorizontalBase>
                                            <Text isTinyTitle isBoldFont>{item.category||''}</Text>
                                        </Wrapper>
                                        <Spacer isSmall />
                                        <Common.ProductsPrimaryHorizontal
                                            data={item?.products || []}
                                            onPressItem={(item, index) => {
                                                isDigital ?
                                                    navigate(routes.digitalProductsFlow.productDetail, { data: item, })
                                                    :
                                                    navigate(routes.productDetail, { data: item })

                                            }}
                                            imageStyle={[(isComic || isEbook) && { height: height(22.5) }]}
                                        />
                                    </Wrapper>
                                )
                            })
                        }
                    </ScrollViews.WithKeyboardAvoidingView>
                    :
                    <Loaders.Boxes />
            }
        </Wrapper>
    )
}
