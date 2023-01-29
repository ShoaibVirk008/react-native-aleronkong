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
        { label: 'All Customers', route: routes.seller.allCustomers},
        { label: 'Email Subscribers', route: routes.seller.allCustomers},
        { label: 'Abandoned Checkouts in last 30 days', route: routes.seller.allCustomers},
        { label: 'Customer with multiple purchases', route: routes.seller.allCustomers },
        { label: 'Customers with no purchases', route: routes.seller.allCustomers },
    ]
    return (
        <Common.OptionsBordered
            options={options}
            onPressOption={(item, index) => {
                navigate(item.route,{typeIndex:index})
            }}
        />
    )
}