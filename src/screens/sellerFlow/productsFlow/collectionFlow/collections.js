import React, { Component, useState } from 'react';
import { View, FlatList } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { Icon, SearchBar } from 'react-native-elements';
import { Common, Images, Wrapper, Text, Lines } from '../../../../components';
import { navigate } from '../../../../navigation/rootNavigation';
import { appImages, appStyles, colors, DummyData, routes, sizes } from '../../../../services';

const topTabs = [{ label: 'All Collections' }, { label: 'Automated' }, { label: 'Manual' }]

const temp_collections = [
    {
        image: appImages.product3,
        title: 'T-shirt',
        active_products: '08',
        draft_products: '02'
    },
    {
        image: appImages.product4,
        title: 'Shoes',
        active_products: '12',
        draft_products: '03'
    },
    {
        image: appImages.product5,
        title: 'Masks',
        active_products: '43',
        draft_products: '12'
    }
]
export default function Index({ navigation, route }) {
    const [selectedTopTabIndex, setTopTabIndex] = useState(0)
    const collections = [...temp_collections.slice(), ...temp_collections.slice(), ...temp_collections.slice()]
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
                        onPress={() => navigate(routes.seller.ordersFilter)}
                    />
                </Wrapper>
            </Wrapper>
            <Spacer isBasic />
            <Collections
                data={collections}
            />
        </Wrapper>
    )
}

const Collections = ({ data }) => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => <Spacer height={sizes.marginVertical} />}
            ListHeaderComponent={() => <Spacer height={sizes.marginVertical / 4} />}
            ItemSeparatorComponent={() => <Spacer height={sizes.marginVertical * 1.25} />}
            renderItem={({ item, index }) => {
                const { image, title, active_products, draft_products } = item
                return (
                    <Collection
                    key={index}
                        image={image}
                        title={title}
                        active={active_products}
                        draft={draft_products}
                    />
                )
            }}
        />
    )
}

const Collection = ({ image, title, active, draft, onPress, onPressDots }) => {
    return (
        <Common.WrapperColoredBorderedShadow
            containerStyle={{}}
        >
            <Wrapper flexDirectionRow >
                <Images.SqareRound
                    source={{ uri: image }}
                    style={{ borderRadius: sizes.cardRadius / 2 }}
                    size={totalSize(5.5)}
                />
                <Wrapper flex={0.05} />
                <Wrapper flex={1} justifyContentSpaceEvenly>
                    <Wrapper flexDirectionRow justifyContentSpaceBetween alignItemsCenter>
                        <Text isRegular isMediumFont>{title}</Text>
                        <Icon
                            name='dots-horizontal'
                            type='material-community'
                            color={colors.appTextColor5}
                        />
                    </Wrapper>
                    <Wrapper flexDirectionRow alignItemsCenter>
                        <Text style={{ color: colors.success }}>{active} Active</Text>
                        <Lines.Vertical
                            style={[{ height: height(1.5) }, appStyles.marginHorizontalTiny]}
                            color={colors.appBgColor3}

                        />
                        <Text style={{ color: colors.appColor3 }}>{draft} Draft</Text>
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        </Common.WrapperColoredBorderedShadow>
    )
}
