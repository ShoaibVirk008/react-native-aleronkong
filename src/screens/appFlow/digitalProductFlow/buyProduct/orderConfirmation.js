import React, { Component, useEffect } from 'react';
import { View, } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Wrapper, Text } from '../../../../components';
import Lottie from 'lottie-react-native'
import { applotties, routes } from '../../../../services';
import { width } from 'react-native-dimension';

export default function Index({ navigation, route }) {
    const { replace } = navigation
    const productDetail = route?.params?.data || null
    const { type, category, image, title, available_colors,
        available_sizes, price, rating, reviews_count } = productDetail

    useEffect(() => {
        setTimeout(() => {
            replace(routes.digitalProductsFlow.youMayLike, { data: productDetail })
        }, 2000);
    }, [])
    return (
        <Wrapper isMain justifyContentCenter>
            <Wrapper isCenter>
                <Lottie
                    source={applotties.done}
                    style={{ height: width(50), width: width(50) }}
                    autoPlay
                    loop={false}
                />
                <Text isMediumTitle>Thank you for your order</Text>
            </Wrapper>
            <Wrapper>
            </Wrapper>
        </Wrapper>
    )
}
