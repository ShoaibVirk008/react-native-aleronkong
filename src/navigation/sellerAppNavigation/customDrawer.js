import React, { Component } from 'react';
import { Pressable, View } from 'react-native';
import { Spacer, Wrapper, Text, Icons, Images, Lines } from '../../components';
import { createDrawerNavigator, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { appIcons, appImages, appStyles, colors, routes, seller_drawer_screens, sizes } from '../../services';
import { height, totalSize } from 'react-native-dimension';
import { navigate } from '../rootNavigation';
const drawer_screens = seller_drawer_screens.slice().filter(item => item.label != 'Amazon Marketplaces')

export default function Index(props) {
    const { navigation } = props
    const app = props?.params?.app
    const isSellerApp = app === 'seller'
    const isDriverApp = app === 'driver'

    const Drawer_item = ({ onPress, title }) => (
        <Pressable onPress={onPress} style={{ paddingVertical: height(1.5) }}>
            <Text isRegular isWhite>{title}</Text>
        </Pressable>
    )
    return (
        <Wrapper isMain style={{ backgroundColor: colors.appColor1, }}>
            <Spacer isStatusBarHeigt />
            <Spacer height={height(5)} />
            <Wrapper marginHorizontalMedium>
                <Wrapper alignItemsCenter >
                    <Images.Profile
                        source={{ uri: appImages.user2 }}
                        size={totalSize(10)}
                        shadow
                    />
                    <Spacer isBasic />
                    <Text isSmallTitle isWhite>John Doe</Text>
                    <Spacer isSmall />
                    <Text isSmall isWhite>johndoe@gmail.com</Text>
                </Wrapper>
                <Spacer isBasic />
                <Lines.Horizontal

                />
                <Spacer isBasic />
                {
                    drawer_screens.map((item, index) => {
                        return (
                            <Drawer_item
                                key={index}
                                title={item.label}
                                onPress={() => {
                                    navigation.toggleDrawer();
                                    navigate(item.route)
                                }}
                            />
                        )
                    })
                }
                <Spacer isBasic />
                <Lines.Horizontal />
                <Spacer isBasic />
                <Drawer_item
                    title={'Logout'}
                    onPress={() => { }}
                />
                <Spacer isBasic />
            </Wrapper>
            {/* <DrawerItemList {...props} />
            <Spacer height={height(20)} />
            <DrawerItem
                label={'Log out'}
                labelStyle={{ ...appStyles.textLarge, ...appStyles.fontMedium, ...appStyles.textWhite }}
            /> */}
        </Wrapper>
    )
}
