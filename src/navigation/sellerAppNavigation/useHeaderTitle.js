import React from 'react'
import { routes } from "../../services"

export default UseHeaderTitle = () => {

    const { bottomTab, drawer, amazonMarketplaces, analytics, billing,
        checkouts, dashboard, discounts, addDiscount,
        earnings, withdraw, liveView, notifications, notificationsTemplate,
        payments, plan,
        profile, reports, security, shippingDelivery,
        storeDetails, usersPermissions,
        //customers
        customers, allCustomers, addCustomer,
        //orders
        orders, allOrders, orderDetail, addOrder, abandonedCheckouts,
        //products
        products, allProducts, productDetail, addProduct,
        collections, addCollection,
        giftCards, addGiftCards, inventory,
        transfers, addTransfer
    } = routes.seller

    const getHeaderTitle = (route) => {
        //console.log('route: ', route)
        // console.log('route name: ', route.name)
        const routeName = route?.name || dashboard;
        //console.log('routeName: ', routeName)
        switch (routeName) {
            case analytics: {
                return 'Analytics';
            }
            case security: {
                return 'Security';
            }
            case reports: {
                return 'Reports'
            }
            case liveView: {
                return 'Live View'
            }
            case profile: {
                return 'Profile'
            }
            case usersPermissions: {
                return 'User and Permissions'
            }
            case storeDetails: {
                return 'Store Details'
            }
            case shippingDelivery: {
                return 'Shipping and Delivery'
            }
            case plan: {
                return 'Plan'
            }
            case payments: {
                return 'Payments'
            }
            case earnings: {
                return 'Earnings'
            }
            case withdraw: {
                return 'Withdraw'
            }
            case discounts: {
                return 'Discounts'
            }
            case addDiscount: {
                return 'Add New Discount'
            }
            case checkouts: {
                return 'Checkouts'
            }
            case billing: {
                return 'Billing'
            }
            case amazonMarketplaces: {
                return 'Amazon Marketplaces'
            }
            case notifications: {
                return 'Notifications'
            }
            case notificationsTemplate: {
                //return 'Notifications Template'
                return (route?.params?.headerTitle || 'Notifications Template')
            }
            //customers
            case customers: {
                return 'Customers'
            }
            case allCustomers: {
                return 'Customers'
            }
            case addCustomer: {
                return 'Add Customer'
            }
            //orders
            case orders: {
                return 'Orders'
            }
            case orderDetail: {
                return 'Order Detail'
            }
            case allOrders: {
                return 'Orders'
            }
            case addOrder: {
                return 'Add New Order'
            }
            case abandonedCheckouts: {
                return 'Abandoned Checkouts'
            }
            //products
            case productDetail: {
                return 'Product Detail'
            }
            case products: {
                return 'Products'
            }
            case allProducts: {
                return 'All Products'
            }
            case addProduct: {
                return 'Add New products'
            }
            case collections: {
                return 'Collections'
            }
            case addCollection: {
                return 'Add New Collection'
            }
            case giftCards: {
                return 'Gift Cards'
            }
            case addGiftCards: {
                return 'Gift Card'
            }
            case inventory: {
                return 'Inventory'
            }
            case transfers: {
                return 'Transfers'
            }
            case addTransfer: {
                return 'Add New Transfers'
            }
            case dashboard: {
                return 'Dashboard'
            }
            default: {
                return 'Dashboard'
            }
        }
    }

    return {
        getHeaderTitle: (route) => getHeaderTitle(route)
    }
}