import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Common, Spacer, Wrapper } from '../../../components';
import { navigate } from '../../../navigation/rootNavigation';
import { routes } from '../../../services';

export default function Index() {
    return (
        <Wrapper isMain>
            <Spacer isBasic />
            <MainOptions />
        </Wrapper>
    )
}

const MainOptions = ({ }) => {
    const options = [
        { label: 'All Products', route: routes.seller.allProducts },
        { label: 'Inventory', route: routes.seller.inventory },
        { label: 'Collections', route: routes.seller.collections },
        { label: 'Gift Cards', route: routes.seller.giftCards },
        { label: 'Transfers', route: routes.seller.transfers },
    ]
    return (
        <Common.OptionsBordered
            options={options}
            onPressOption={(item, index) => {
                navigate(item.route)
            }}
        />
    )
}