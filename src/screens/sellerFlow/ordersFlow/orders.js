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
        { label: 'All Orders', route: routes.seller.allOrders },
        { label: 'Drafts', route: routes.seller.allOrders },
        { label: 'Abandoned Checkouts', route: routes.seller.abandonedCheckouts },
    ]
    return (
        <Common.OptionsBordered
            options={options}
            onPressOption={(item, index) => {
                index != 1 ?
                    navigate(item.route) :
                    navigate(item.route, { draft: true })
            }}
        />
    )
}