import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Common, Spacer, Wrapper } from '../../../components';
import { navigate } from '../../../navigation/rootNavigation';
import { DummyData, routes, sizes } from '../../../services';

const topTabs = [{ label: 'All' }, { label: 'Active' }, { label: 'Draft' }, { label: 'Archived' }]

export default function Index({ navigation, route }) {
    const [selectedTopTabIndex, setTopTabIndex] = useState(0)
    const temppPoducts =  DummyData.products_seller.slice() 
    const allProducts = [...temppPoducts, ...temppPoducts, ...temppPoducts]
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
            <Common.ProductsSecondaryVertical1
                data={allProducts}
                onPressItem={(item, index) => navigate(routes.seller.productDetail, { data: item })}
                //onPressDots={(item, index) => { }}
                ListHeaderComponent={()=><></>}
            /> 
        </Wrapper>
    )
}
