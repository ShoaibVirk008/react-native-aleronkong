import React, { Component, useEffect, useState } from 'react';
import { View, } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Headers, ScrollViews, Spacer, Wrapper, Text, Common, Loaders } from '../../../components';
import { navigate } from '../../../navigation/rootNavigation';
import { Api, appStyles, DummyData, product_typees, product_types, routes } from '../../../services';

export default function Index({ route }) {
    const user_data = route?.params?.data
    const { _id, avatar, firstName, lastName, is_supporting } = user_data
    const name = firstName + ' ' + lastName
    const tempProducts = [...DummyData.products.slice(), ...DummyData.products.slice()]

    const allProducts = [
        {
            category: 'Signed Books',
            products: tempProducts,
        },
        {
            category: 'Hoodies',
            products: tempProducts,
        },
        {
            category: 'Designs',
            products: tempProducts,
        },
        {
            category: 'Posters',
            products: tempProducts,
        },
        {
            category: 'Masks',
            products: tempProducts,
        }
    ]

    const [products, setProducts] = useState(null)

    useEffect(() => {
        getPackages()
    }, [])
    const getPackages = async () => {
        Api.getStoreProducts({ userId: _id,userStore:true }).
            then(res => {
                if (res) {
                    setProducts(res.data)
                } else {
                    setProducts([])
                }
            })
    }
    return (
        <Wrapper isMain>
            <Headers.Primary
                showBackArrow
                title={name + "'s Store"}
            />

            {
                products ?
                    products?.length ?
                        <ScrollViews.WithKeyboardAvoidingView>
                            <Spacer isSmall />
                            {
                                products.map((item, index) => {
                                    return (
                                        <Wrapper key={index} marginVerticalSmall>
                                            <Wrapper marginHorizontalBase>
                                                <Text isTinyTitle isBoldFont>{item.category}</Text>
                                            </Wrapper>
                                            <Spacer isBasic />
                                            <Common.ProductsPrimaryHorizontal
                                                data={item.products}
                                                onPressItem={(item, index) => {
                                                    const isPhysicalProduct = item.type === product_types.physical
                                                    isPhysicalProduct ?
                                                        navigate(routes.productDetail, { data: item })
                                                        :
                                                        navigate(routes.digitalProductsFlow.productDetail, { data: item })
                                                }}
                                            />
                                        </Wrapper>
                                    )
                                })
                            }
                        </ScrollViews.WithKeyboardAvoidingView>
                        :
                        <Common.NoDataViewPrimary
                            containerStyle={[appStyles.mainContainer, appStyles.center]}
                            iconName='boxes'
                            iconType='font-awesome-5'
                            //title='No Product'
                            text='No Products Found'
                            onPress={() => navigate(routes.AddSuppportPackage)}
                        />
                    :
                    <Loaders.Boxes
                        size={totalSize(7)}
                    />
            }
        </Wrapper>
    )
}
