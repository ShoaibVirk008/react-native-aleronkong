import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Common, Wrapper } from '../../../components';
import { navigate } from '../../../navigation/rootNavigation';
import { DummyData, routes, sizes } from '../../../services';

const topTabs = [{ label: 'All' }, { label: 'Open' }, { label: 'Unfulfilled' }, { label: 'Unpaid' }]

export default function Index({ navigation, route }) {
    const draft = route?.params?.draft || false
    const [selectedTopTabIndex, setTopTabIndex] = useState(0)
    const tempOrders = !draft ? DummyData.orders_seller.slice() : DummyData.orders_seller.slice().filter(item => item.is_draft)
    const allOrders = [...tempOrders, ...tempOrders, ...tempOrders]
    return (
        <Wrapper isMain>
            <Spacer isBasic />
            <Wrapper flexDirectionRow>
                <Wrapper flex={1}>
                    <Common.ButtonsGroupPrimary
                        data={topTabs}
                        initalIndex={selectedTopTabIndex}
                        onPressButton={(item, index) => setTopTabIndex(index)}
                    />
                </Wrapper>
                <Wrapper style={{ marginRight: sizes.marginHorizontal }}>
                    <Common.IconButtonBadge
                        iconName='filter'
                        iconType='feather'
                        onPress={()=>navigate(routes.seller.ordersFilter)}
                    />
                </Wrapper>
            </Wrapper>
            <Spacer isBasic />
            <Common.OrdersPrimaryVertical1
                data={allOrders}
                onPressItem={(item, index) => navigate(routes.seller.orderDetail, { data: item })}
                isSeller={true}
                onPressDots={(item, index) => { }}
            />
        </Wrapper>
    )
}
