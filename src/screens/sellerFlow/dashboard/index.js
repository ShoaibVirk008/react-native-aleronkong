import React, { Component } from 'react';
import { FlatList, Pressable } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { Icon, SearchBar } from 'react-native-elements';
import { Buttons, Common, Headers, Icons, Images, ScrollViews, Spacer, Wrapper, Text, Lines } from '../../../components';
import { navigate, toggleDrawer } from '../../../navigation/rootNavigation';
import { appImages, appStyles, colors, DummyData, order_statuses, product_categories, product_typees, routes, sizes } from '../../../services';


export default function Index() {
    const recentProducts = DummyData.products_seller.slice()
    const recentOrders = DummyData.orders_seller.slice().filter(item => !item.is_draft)
    const recentCustomer = DummyData.customers_seller.slice()
    return (
        <Wrapper isMain>
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer isBasic />
                <TopCards
                    products='1,243'
                    orders='7,432'
                    customers='5,122'
                />
                <Spacer isBasic />
                <MainOptions />
                <Spacer isBasic />
                <TitlePrimary
                    title={'Recent Products'}
                    onPressRightText={() => navigate(routes.seller.allProducts)}
                />
                <Common.ProductsSecondaryHorizontal1
                    data={recentProducts}
                    onPressItem={(item, index) => navigate(routes.seller.productDetail, { data: item })}
                    isSeller={true}
                    onPressDots={(item, index) => { }}
                />
                <Spacer isBasic />
                <TitlePrimary
                    title={'Recent Orders'}
                    onPressRightText={() => navigate(routes.seller.allOrders)}
                />
                <Common.OrdersPrimaryHorizontal1
                    data={recentOrders}
                    onPressItem={(item, index) => navigate(routes.seller.orderDetail, { data: item })}
                    isSeller={true}
                    onPressDots={(item, index) => { }}
                />
                <Spacer isBasic />
                <TitlePrimary
                    title={'Recent Customers'}
                    onPressRightText={() => navigate(routes.seller.allCustomers)}
                />
                <Common.CustomerPrimaryHorizontal1
                    data={recentCustomer}
                    onPressItem={(item, index) => { }}
                    isSeller={true}
                    onPressDots={(item, index) => { }}
                />
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}
const TopCards = ({ products, orders, customers }) => {
    const options = [
        { label: 'Products', value: products, iconName: 'weight-hanging', iconType: 'font-awesome-5', iconColor: '#4E20EA' },
        { label: 'Orders', value: orders, iconName: 'shopping-cart', iconType: 'font-awesome', iconColor: '#CF1D1D' },
        { label: 'Customers', value: customers, iconName: 'users', iconType: 'entypo', iconColor: '#257525' },
    ]
    return (
        <Wrapper flexDirectionRow justifyContentSpaceBetween marginHorizontalBase>
            {
                options.map((item, index) => {
                    const { label, value, iconName, iconType, iconColor } = item
                    return (
                        <Wrapper key={index} isColored marginHorizontalZero background1 style={[{ width: width(27) }, appStyles.shadowExtraLight]}>
                            <Icons.WithText
                                iconName={iconName}
                                iconType={iconType}
                                text={label}
                                title={value}
                                tintColor={iconColor}
                                iconSize={totalSize(3)}
                                direction={'column'}
                                textContainerStyle={[appStyles.marginVerticalZero, appStyles.alignItemsCenter, { marginTop: sizes.smallMargin }]}
                                textStyle={[appStyles.textSmall]}
                                titleStyle={[appStyles.textMedium, appStyles.fontBold]}
                            />
                        </Wrapper>
                    )
                })
            }
        </Wrapper>
    )
}
const MainOptions = ({ }) => {
    const options = [
        { label: 'Orders', route: routes.seller.orders },
        { label: 'Products', route: routes.seller.products },
        { label: 'Customer', route: routes.seller.customers },
        { label: 'Discounts', route: routes.seller.discounts },
        { label: 'Earnings', route: routes.seller.earnings },
    ]
    return (
        <Common.OptionsBordered
            options={options}
            onPressOption={(item, index) => navigate(item.route)}
        />
    )
}
const TitlePrimary = ({ title, rightText, onPressRightText }) => (
    <Wrapper flexDirectionRow marginHorizontalBase justifyContentSpaceBetween>
        <Text isRegular isBoldFont>{title}</Text>
        <Text isRegular isGray onPress={onPressRightText}>{rightText || 'View All'}</Text>
    </Wrapper>
)

