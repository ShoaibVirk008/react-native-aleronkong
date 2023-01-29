import React, { Component } from 'react';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { routes, headers, tabs, colors, appImages, appStyles, sizes } from '../../services';
import * as SellerApp from '../../screens/sellerFlow';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Common, Headers, Icons, Images, StatusBars, Wrapper } from '../../components';
import { totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './customDrawer'
import { navigate, toggleDrawer } from '../rootNavigation';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import useHeaderTitle from './useHeaderTitle';
const DrawerStack = createDrawerNavigator();

const { AmazonMarketplaces, Analytics, FilterAnalytics, Billing,
    Checkouts, Dashboard, Discounts, AddDiscount,
    Earnings, Withdraw, LiveView, Notifications, NotificationsTemplate,
    NotificationsTemplatePreview,
    Payments, Plan,
    Profile, Reports, Security, ShippingDelivery,
    StoreDetails, UsersPermissions,
    //customers
    Customers, AllCustomers, AddCustomer,
    //orders
    Orders, AllOrders, OrdersFilter, OrderDetail, AddOrder, AbandonedCheckouts,
    //products
    Products, AllProducts, ProductDetail, AddProduct,
    Collections, AddCollection,
    GiftCards, AddGiftCards,
    Inventory,
    Transfers, AddTransfer
} = SellerApp
const { bottomTab, drawer, amazonMarketplaces,
    analytics, filterAnalytics, billing,
    checkouts, dashboard, discounts, addDiscount,
    earnings, withdraw, liveView, notifications, notificationsTemplate,
    notificationsTemplatePreview,
    payments, plan,
    profile, reports, security, shippingDelivery,
    storeDetails, usersPermissions,
    //customers
    customers, allCustomers, addCustomer,
    //orders
    orders, allOrders, ordersFilter, orderDetail, addOrder, abandonedCheckouts,
    //products
    products, allProducts, productDetail, addProduct,
    collections, addCollection,
    giftCards, addGiftCards,
    inventory,
    transfers, addTransfer
} = routes.seller

const SellerAppStack = createStackNavigator();
const BottomTabStack = createBottomTabNavigator();

const BottomTabNavigation = ({ navigation }) => {

    const { getHeaderTitle } = useHeaderTitle()
    const tabIconSize = totalSize(2.5)

    const TabIcon = ({ color, iconName, iconType, size, focused, image }) => {
        return (
            <Wrapper alignItemsCenter style={{ flex: 1, borderTopWidth: 3, borderTopColor: focused ? colors.appColor1 : colors.appBgColor1, width: width(15), justifyContent: 'center', marginTop: 3 }}>
                {
                    !image ?
                        <Icon name={iconName} type={iconType} size={tabIconSize} color={color} focused={focused} />
                        :
                        <Images.Round source={{ uri: image }} size={tabIconSize} style={{ opacity: focused ? 1 : 0.5 }} />
                }
            </Wrapper>
        )
    }

    return (
        <BottomTabStack.Navigator
            screenOptions={({ route }) => ({
                //headerShown: false,
                header: (() => {
                    const headerTitle = getHeaderTitle(route)
                    return (
                        <Headers.Primary
                            title={headerTitle}
                            left={
                                <Icon
                                    name='menu'
                                    type='entypo'
                                    size={totalSize(3)}
                                    color={colors.appTextColor1}
                                    onPress={() => navigation.toggleDrawer()}
                                />
                            }
                            right={
                                route.name === routes.seller.analytics ?
                                    <Icon
                                        name='ios-calendar-sharp'
                                        type='ionicon'
                                        size={totalSize(2.5)}
                                        color={colors.appTextColor1}
                                        onPress={() => navigate(routes.seller.filterAnalytics)}
                                    />
                                    :
                                    null
                            }
                            leftContainerStyle={[{}, appStyles.alignItemsFlexEnd]}
                            titleStyle={[{ color: colors.appTextColor1 }]}
                        />
                    )
                }),

                ...tabs.tabBarOptions,
            })}
        >
            <BottomTabStack.Screen
                name={dashboard}
                component={Dashboard}
                options={() => ({
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size, focused }) => {
                        return <TabIcon iconName='home' iconType='feather' size={tabIconSize} color={color} focused={focused} />
                    },
                })}
            />
            <BottomTabStack.Screen
                name={analytics}
                component={Analytics}
                options={() => ({
                    tabBarLabel: "Analytics",
                    tabBarIcon: ({ color, size, focused }) => {
                        return <TabIcon iconName='stats-chart' iconType='ionicon' size={tabIconSize} color={color} focused={focused} />
                    },
                })}
            />
            <BottomTabStack.Screen
                name={reports}
                component={Reports}
                options={() => ({
                    tabBarLabel: "Reports",
                    tabBarIcon: ({ color, size, focused }) => {
                        return <TabIcon iconName='document' iconType='ionicon' size={tabIconSize} color={color} focused={focused} />
                    },
                })}
            />
            <BottomTabStack.Screen
                name={liveView}
                component={LiveView}
                options={() => ({
                    tabBarLabel: "Live View",
                    tabBarIcon: ({ color, size, focused }) => {
                        return <TabIcon iconName='eye' iconType='ionicon' size={tabIconSize} color={color} focused={focused} />
                    },
                })}
            />
            <BottomTabStack.Screen
                name={profile}
                component={Profile}
                options={() => ({
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size, focused }) => {
                        return <TabIcon image={appImages.user2} focused={focused} />
                    },
                })}
            />
        </BottomTabStack.Navigator >
    )
}
DrawerNavigation = () => {
    const IconSize = totalSize(2.5)
    const IconColor = colors.appTextColor6
    return (
        <DrawerStack.Navigator
            drawerContent={(props) =>
                <CustomDrawer {...props} />
            }
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: colors.appBgColor6,
                drawerActiveTintColor: colors.appTextColor6,
                drawerStyle: { backgroundColor: colors.appBgColor4, width: width(60) },
                drawerInactiveTintColor: colors.appTextColor6,
                drawerLabelStyle: { ...appStyles.textLarge, ...appStyles.fontMedium, ...appStyles.textWhite },

            }}
            initialRouteName={bottomTab}

        >
            <DrawerStack.Screen
                name={bottomTab}
                component={BottomTabNavigation}
            />
        </DrawerStack.Navigator>
    )
}
export default SellerAppNavigation = () => {
    const { getHeaderTitle } = useHeaderTitle()


    const RenderRight = ({ route }) => {
        console.log('route ', route)
        console.log('route name: ', route.name)
        const isOrders = route.name === routes.seller.orders
        const isAllOrders = route.name === routes.seller.allOrders
        const isProducts = route.name === routes.seller.products
        const isAllProducts = route.name === routes.seller.allProducts
        const isCollections = route.name === routes.seller.collections
        const isTransfers = route.name === routes.seller.transfers
        const isDiscounts = route.name === routes.seller.discounts
        const isAnalytics = route.name === routes.seller.analytics
        const showAddIcon = isOrders || isAllOrders || isProducts ||
            isAllProducts || isCollections || isTransfers || isDiscounts

        if (showAddIcon) {
            return (
                <Icon
                    name='add'
                    color={colors.appTextColor1}
                    size={totalSize(3)}
                    onPress={() => {
                        (isOrders || isAllOrders) ?
                            navigate(routes.seller.addOrder)
                            :
                            (isProducts || isAllProducts) ?
                                navigate(routes.app,
                                    {
                                        screen: routes.shareSomethingRoutes.SellProducts,
                                        params: { isSeller: true }
                                    })
                                : (isCollections) ?
                                    navigate(routes.seller.addCollection)
                                    : (isTransfers) ?
                                        navigate(routes.seller.addTransfer)
                                        : (isDiscounts) ?
                                            navigate(routes.seller.addDiscount)
                                            : null

                    }}
                />
            )
        }
        return (
            null
        )
    }
    return (
        <>
            <StatusBars.Dark />
            <SellerAppStack.Navigator
                // screenOptions={{ 
                //     headerShown: false,
                // }}
                screenOptions={({ route }) => ({
                    //headerShown: false,
                    header: (() => {
                        const headerTitle = getHeaderTitle(route)
                        return (
                            <Headers.Primary
                                title={headerTitle}
                                showBackArrow
                                titleStyle={[{ color: colors.appTextColor1 }]}
                                right={
                                    <RenderRight
                                        route={route}
                                    />
                                }
                            />
                        )
                    }),
                    ...tabs.tabBarOptions,
                })}
                initialRouteName={drawer}
            >
                <SellerAppStack.Screen name={drawer} component={DrawerNavigation} options={{ headerShown: false }} />
                <SellerAppStack.Screen name={usersPermissions} component={UsersPermissions} />
                <SellerAppStack.Screen name={storeDetails} component={StoreDetails} />
                <SellerAppStack.Screen name={shippingDelivery} component={ShippingDelivery} />
                <SellerAppStack.Screen name={security} component={Security} />
                <SellerAppStack.Screen name={reports} component={Reports} />
                <SellerAppStack.Screen name={profile} component={Profile} />
                <SellerAppStack.Screen name={plan} component={Plan} />
                <SellerAppStack.Screen name={payments} component={Payments} />
                <SellerAppStack.Screen name={notifications} component={Notifications} />
                <SellerAppStack.Screen name={notificationsTemplate} component={NotificationsTemplate} />
                <SellerAppStack.Screen name={notificationsTemplatePreview} component={NotificationsTemplatePreview} options={{ headerShown: false, presentation: 'transparentModal' }}/>
                <SellerAppStack.Screen name={liveView} component={LiveView} />
                <SellerAppStack.Screen name={earnings} component={Earnings} />
                <SellerAppStack.Screen name={withdraw} component={Withdraw} />
                <SellerAppStack.Screen name={discounts} component={Discounts} />
                <SellerAppStack.Screen name={addDiscount} component={AddDiscount} />
                <SellerAppStack.Screen name={dashboard} component={Dashboard} />
                <SellerAppStack.Screen name={checkouts} component={Checkouts} />
                <SellerAppStack.Screen name={billing} component={Billing} />
                <SellerAppStack.Screen name={analytics} component={Analytics} />
                <SellerAppStack.Screen name={filterAnalytics} component={FilterAnalytics} options={{ headerShown: false, presentation: 'transparentModal' }} />
                <SellerAppStack.Screen name={amazonMarketplaces} component={AmazonMarketplaces} />
                {/* Customer flow screens */}
                <SellerAppStack.Group>
                    <SellerAppStack.Screen name={customers} component={Customers} />
                    <SellerAppStack.Screen name={allCustomers} component={AllCustomers} />
                    <SellerAppStack.Screen name={addCustomer} component={AddCustomer} />
                </SellerAppStack.Group>
                {/* Orders flow screens */}
                <SellerAppStack.Group>
                    <SellerAppStack.Screen name={orders} component={Orders} />
                    <SellerAppStack.Screen name={allOrders} component={AllOrders} />
                    <SellerAppStack.Screen name={ordersFilter} component={OrdersFilter} options={{ headerShown: false, presentation: 'transparentModal' }} />
                    <SellerAppStack.Screen name={orderDetail} component={OrderDetail} />
                    <SellerAppStack.Screen name={addOrder} component={AddOrder} />
                    <SellerAppStack.Screen name={abandonedCheckouts} component={AbandonedCheckouts} />
                </SellerAppStack.Group>
                {/* Products flow screens */}
                <SellerAppStack.Group>
                    <SellerAppStack.Screen name={products} component={Products} />
                    <SellerAppStack.Screen name={allProducts} component={AllProducts} />
                    <SellerAppStack.Screen name={productDetail} component={ProductDetail} />
                    <SellerAppStack.Screen name={inventory} component={Inventory} />
                    <SellerAppStack.Screen name={collections} component={Collections} />
                    <SellerAppStack.Screen name={addCollection} component={AddCollection} />
                    <SellerAppStack.Screen name={giftCards} component={GiftCards} />
                    <SellerAppStack.Screen name={addGiftCards} component={AddGiftCards} />
                    <SellerAppStack.Screen name={transfers} component={Transfers} />
                    <SellerAppStack.Screen name={addTransfer} component={AddTransfer} />
                    <SellerAppStack.Screen name={addProduct} component={AddProduct} />
                </SellerAppStack.Group>

            </SellerAppStack.Navigator>
        </>
    )
}
