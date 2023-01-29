import AmazonMarketplaces from './amazonMarketplaces'
import Analytics from './analytics'
import FilterAnalytics from './analytics/filter'
import Billing from './billing'
import Checkouts from './checkouts'
import Dashboard from './dashboard'
import Discounts from './discounts'
import AddDiscount from './discounts/addDiscount'
import Earnings from './earnings'
import Withdraw from './withdraw'
import LiveView from './liveView'
import Notifications from './notifications'
import NotificationsTemplate from './notifications/template'
import NotificationsTemplatePreview from './notifications/templatePreview'
import Payments from './payments'
import Plan from './plan'
import Profile from './profile'
import Reports from './reports'
import Security from './security'
import ShippingDelivery from './shippingDelivery'
import StoreDetails from './storeDetails'
import UsersPermissions from './usersPermissions'

//customers flow screens
import Customers from './customersFlow/customers'
import AllCustomers from './customersFlow/allCustomers'
import AddCustomer from './customersFlow/addCustomer'
//orders flow screens
import Orders from './ordersFlow/orders'
import AllOrders from './ordersFlow/allOrders'
import OrdersFilter from './ordersFlow/ordersFilter'
import OrderDetail from './ordersFlow/orderDetail'
import AddOrder from './ordersFlow/addOrder'
import AbandonedCheckouts from './ordersFlow/abandonedCheckouts'
//products flow screens
import Products from './productsFlow/products'
import ProductDetail from './productsFlow/productDetail'
import AllProducts from './productsFlow/allProducts'
import AddProduct from './productsFlow/addProduct'
import Collections from './productsFlow/collectionFlow/collections'
import AddCollection from './productsFlow/collectionFlow/addCollection'
import GiftCards from './productsFlow/giftCardsFlow/giftCards'
import AddGiftCards from './productsFlow/giftCardsFlow/addGiftCard'
import Inventory from './productsFlow/inventory'
import Transfers from './productsFlow/transfersFlow/transfers'
import AddTransfer from './productsFlow/transfersFlow/addTransfer'

export {
    AmazonMarketplaces, Analytics,FilterAnalytics, Billing,
     Dashboard, Discounts,
    AddDiscount, Checkouts, Earnings, Withdraw,
    LiveView, Notifications,NotificationsTemplate,NotificationsTemplatePreview,
    Payments, Plan,
    Profile, Reports, Security, ShippingDelivery,
    StoreDetails, UsersPermissions,

    //customer flow
    Customers, AllCustomers, AddCustomer,
    //order flow
    Orders, AllOrders, OrdersFilter, OrderDetail, 
    AddOrder, AbandonedCheckouts,
    //product flow
    Products, AllProducts, ProductDetail, AddProduct, 
    Collections, AddCollection,
    GiftCards, AddGiftCards, Inventory, Transfers, AddTransfer
}