import React from 'react'
import { appStyles, colors } from "../../services/utilities"
import { BackIcon } from "../../components"


//export const liveUrl = 'https://aleron-kong.herokuapp.com'
//export const liveUrl = 'http://44.212.120.165'
//export const liveUrl = 'http://52.72.125.223'
export const liveUrl = 'http://3.229.224.13'
export const liverUrlVersion = '/v1/'
export const baseURL = liveUrl + liverUrlVersion
export const endPoints = {
    //auth
    register: 'auth/register',
    login: 'auth/login',
    social_login: 'auth/social-login',
    forgot_password: 'auth/forget-password',
    reset_password: 'auth/reset-password',
    check_email: 'auth/check-email',
    send_forgot_password_link: 'auth/forget-password',
    //posts
    post: {
        group:'group',
        post: 'post',
        findOne: 'find-one',
        comment:'comment',
        update:'update',
        delete:'delete',
    },
    create_post: 'group/post/create',
    get_all_posts: 'post/find-all',
    get_home_posts: 'post/home',
    unlike_post: 'post/un-like',
    like_post: 'post/like',
    comment_post: 'post/comment',
    get_all_my_posts: 'post/find-all/mine',
    block_post: 'post/block',
    report_post: 'post/report',
    user_posts: 'post/find-all/user',
    get_fundraisinproject_categories: 'post/fundraisingproject/categories',
    get_fundraisinproject_subcategories: 'post/fundraisingproject/subcategories',

    //banks
    get_banks: 'getbanks',

    //user
    updateUser: 'user/update',

    //product
    addProduct: 'product/create',
    getProductCategory: 'product/category/find-all',
    product: {
        product: 'product',
        create: 'create',
        getAllCategories: 'category/find-all',
        update: 'update',
        delete: 'delete',
        cart: 'cart',
        addToCart: 'add-to-cart',
        removeFromCart: 'remove-from-cart',
        incDec: 'inc-dec',
        store: 'store',
        checkout: 'checkout',
        buy: 'buy',
        getAllShowcase:'showcase/find-all',
        writeReview:'review/create',
        getReviews:'review/find-all',
        getTrending:'trending/find-all',
        findAll:'find-all',
        getAllReviews:'review/find-all'
    },

    //group
    create_group: 'group/create',
    update_group: 'group/update',
    get_group_detail: 'group/find-one',
    get_group_members: 'group/all-members',
    leave_group: 'group/leave',
    join_group: 'group/join',
    get_groups: 'group/find-all',
    get_group_join_requests: 'group/all-requests',
    approve_reject_group_join_request: 'group/request',
    report_group: 'report/create',
    delete_group: 'group/delete',
    getAllJoinedGroupsPosts: 'group/feed',

    //upload file
    uploadFile: 'file/create',

    //chat
    chatOfTwoUsers: 'chat/find-one',
    sendMessage: 'chat/message/create',
    createChat: 'chat/create',
    recentChats: 'chat/recent-chat',
    getMessagesOfChat: 'chat/message/find-all',
    deleteChat: 'chat/delete',
    muteChat: 'chat/mute',

    addFriend: 'user/friend',
    //user
    user: {
        user: 'user',
        findOne: 'find-one',
        friend:'friend',
        create:'create',
        remove:'remove',
        block:'block',
        unblock:'unblock',
    },

    block: 'block',
    unblock: 'unblock',
    reportUser: 'report/create',

    changePassword: 'user/change-password',

    //fundraising project
    addFundraisingProject: 'fundraising/create',
    getFundraiserCategories: 'fundraising/category/find-all',
    getFundraiserSubcategories: 'fundraising/sub-category/find-all',
    fundFundraisingProject: 'fundraising/fund',

    //package
    package: {
        package: 'package',
        findAll: 'find-all',
        paymentHistory: 'payment-history'
    },
    createPackage: 'package/create',
    getUserPackages: 'package/user',
    updatePackage: 'package/update',
    deletePackage: 'package/delete',
    subscribePackage: 'package/subscribe',
    unsubscribePackage: 'package/unsubscribe',
    getAllAuthorsYouSupport: 'package/author/find-all',
    guildPackage: {
        guildPackage: 'guild-package',
        getAll: 'find-all',
        subscribe: 'subscribe',
        unsubscribe: 'unsubscribe'
    },
    paymentMethod: {
        paymentMethod: 'payment-method',
        create: 'create',
        findAll: 'find-all',
        default: 'default',
        delete: 'delete',
        update: 'update'
    },
    address: {
        address: 'address',
        create: 'create',
        findAll: 'find-all',
        default: 'default',
        delete: 'delete',
        update: 'update'
    },
    //search
    search: 'search',

    //order
    order: {
        order: 'order',
        findAll: 'find-all',
        findOne: 'find-one',
        update: 'update'
    }
}
export const routes = {
    //auth stack routes
    auth: 'auth',
    splash: 'splash',
    signin: 'signin',
    signup: 'signup',
    forgotPassword: 'forgotPassword',
    resetPassword: 'resetPassword',
    setupProfile: 'setupProfile',
    createAnAccount: 'createAnAccount',
    allowNotifications: 'allowNotifications',
    //customer app stack routes
    app: 'app',
    bottomTab: 'bottomTab',
    postMenu: 'postMenu',
    commentMenu: 'commentMenu',
    userMenu:'userMenu',
    home: 'home',
    cart: 'cart',
    checkout: 'checkout',
    chat: 'chat',
    chatMenu: 'chatMenu',
    gifKeyboard: 'gifKeyboard',
    messages: 'messages',
    notifications: 'notifications',
    postDetail: 'postDetail',
    //profile tab routes
    profile: 'profile',
    profileMenu: 'profileMenu',
    becomeGuildMember: 'becomeGuildMember',
    becomeGuildMemberDetail: 'becomeGuildMemberDetail',
    becomeGuildMemberConfirmation: 'becomeGuildMemberConfirmation',
    getSupportFromFans: 'getSupportFromFans',
    AddSuppportPackage: 'AddSuppportPackage',
    authorsYouSupport: 'authorsYouSupport',
    editProfile: 'editProfile',
    changePassword: 'changePassword',
    notificationSettings: 'notificationSettings',
    callSettings: 'callSettings',
    membership: 'membership',
    myOrders: 'myOrders',
    myOrderDetail: 'myOrderDetail',
    shareFeedback: 'shareFeedback',

    search: 'search',
    searchResults: 'searchResults',

    social: 'social',
    createGroup: 'createGroup',
    groupDetail: 'groupDetail',
    groupDetailManage: 'groupDetailManage',
    groupDetailMenu: 'groupDetailMenu',
    groupMemberRequests: 'groupMemberRequests',
    groupViewMembers: 'groupViewMembers',

    store: 'store',

    userDetail: 'userDetail',
    supportUser: 'supportUser',
    supportConfirmation: 'supportConfirmation',
    storeDetail: 'storeDetail',
    productDetail: 'productDetail',
    fundRaisingProjectDetail: 'fundRaisingProjectDetail',
    audioCall: 'audioCall',
    paymentMethods: 'paymentMethods',
    addPaymentMethod: 'addPaymentMethod',
    deliveryAddresses: 'deliveryAddresses',
    addDeliveryAddress: 'addDeliveryAddress',
    shareSomethingRoutes: {
        shareSomething: 'shareSomething',
        sharePost: 'sharePost',
        SellProducts: 'SellProducts',
        productDescription: 'productDescription',
        startFundRaiserProjectRoutes: {
            startFundRaiserProject: 'startFundRaiserProject',
            aboutTheProject: 'aboutTheProject',
            fundingDetails: 'fundingDetails',
            reviewProject: 'reviewProject',
            verifyBankAccount: 'verifyBankAccount'
        },
    },
    digitalProductsFlow: {
        productDetail: 'digitalProductDetail',
        buyProduct: 'buyDigitalProduct',
        orderConfirmation: 'digitalOrderConfirmation',
        youMayLike: 'youMayLike',
        listenAudioBook: 'listenAudioBook',
        nowPlaying: 'nowPlaying',
        listenSample: 'listenSample',
        readBook: 'readBook',
        readBookMenu: 'readBookMenu'
    },
    //docs routes
    termsConditions: 'termsConditions',
    privacyPolicy: 'privacyPolicy',
    aboutUs: 'aboutUs',

    //seller app routes
    sellerApp: 'sellerApp',
    seller: {
        app: 'sellerApp',
        bottomTab: 'sellerBottomTab',
        drawer: 'sellerDrawer',
        amazonMarketplaces: 'amazonMarketplaces',
        analytics: 'analytics',
        filterAnalytics: 'filterAnalytics',
        billing: 'billing',
        checkouts: 'checkouts',
        dashboard: 'dashboard',
        discounts: 'discounts',
        addDiscount: 'addDiscount',
        earnings: 'earnings',
        withdraw: 'withdraw',
        liveView: 'liveView',
        notifications: 'sellerNotifications',
        notificationsTemplate: 'sellerNotificationsTemplate',
        notificationsTemplatePreview: 'sellerNotificationsTemplatePreview',

        payments: 'payments',
        plan: 'plan',

        profile: 'sellerProfile',
        reports: 'reports',
        security: 'security',
        shippingDelivery: 'shippingDelivery',
        storeDetails: 'storeDetails',
        usersPermissions: 'usersPermissions',

        //customers
        customers: 'customers',
        allCustomers: 'allCustomers',
        addCustomer: 'addCustomer',
        //orders
        orders: 'orders',
        allOrders: 'allOrders',
        ordersFilter: 'ordersFilter',
        orderDetail: 'orderDetail',
        addOrder: 'addOrder',
        abandonedCheckouts: 'abandonedCheckouts',
        //products
        products: 'products',
        productDetail: 'sellerProductDetail',
        allProducts: 'allProducts',
        addProduct: 'addProduct',
        collections: 'collections',
        addCollection: 'addCollection',
        giftCards: 'giftCards',
        addGiftCards: 'addGiftCards',
        inventory: 'inventory',
        transfers: 'transfers',
        addTransfer: 'addTransfer'

    },

    imageViewer: 'imageViewer',
    videoPlayer: 'videoPlayer',
    writeReview: 'writeReview',
}
export const headers = {
    screenOptions: {
        // headerShown: false,
        title: 'Title',
        headerTitleAlign: 'left',
        headerStyle: [appStyles.headerStyle],
        headerTitleStyle: appStyles.headerTitleStyle,
        headerTintColor: colors.appTextColor4,
        headerBackImage: () => <BackIcon />,
        headerBackTitle: ' '

    }
}
export const tabs = {
    // tabBarOptions: {
    //     showLabel: false,
    //     tabBarActiveTintColor: colors.appColor1,
    //     tabBarInactiveTintColor: colors.appBgColor3,
    //     allowFontScaling: true,
    //     tabBarStyle: appStyles.tabBarStyle,
    //     activeBackgroundColor: '#FFFFFF40',
    //     tabStyle: { borderRadius: 20, marginHorizontal: 7.5, marginVertical: 2 }
    // },
    tabBarOptions: {
        showLabel: false,
        tabBarActiveTintColor: colors.appColor1,
        tabBarInactiveTintColor: colors.appTextColor5,
        allowFontScaling: true,
        tabBarStyle: appStyles.tabBarStyle,
        // tabBarItemStyle: { backgroundColor: 'green', justifyContent: 'flex-start', paddingTop: 0 },
        tabBarActiveBackgroundColor: 'transparent',
        // tabBarStyle:{ paddingTop: 0 }
        // tabBarStyle: { borderRadius: 20, marginHorizontal: 7.5, marginVertical: 2 }
    },
}
export const order_statuses = {
    pending: 'pending',
    active: 'active',
    cancelled: 'canceled',
    cancelRequested: 'cancelRequested',
    delivered: 'delivered',
    completed: 'completed'
}
export const product_categories = [
    {
        label: 'Hoddies',
        value: 'hoddies',
        type: 'physical'
    },
    {
        label: 'AudioBook',
        value: 'audioBook',
        type: 'digital'
    },
    {
        label: 'Comic',
        value: 'comic',
        type: 'digital'
    },
    {
        label: 'Ebook',
        value: 'eBook',
        type: 'digital'
    }
]
export const product_categories_labels={
    Ebook:'Ebook',
    Comic:'Comic',
    AudioBook:'AudioBook'
}
export const product_types = {
    digital: 'digital',
    physical: 'physical'
}
export const product_typees = {
    active: 'Active',
    draft: 'Draft'
}
export const seller_drawer_screens = [
    {
        label: 'Notifications',
        route: routes.seller.notifications
    },
    {
        label: 'Security',
        route: routes.seller.security
    },
    {
        label: 'Store Details',
        route: routes.seller.storeDetails
    },
    {
        label: 'Plan',
        route: routes.seller.plan
    },
    {
        label: 'Billing',
        route: routes.seller.billing
    },
    {
        label: 'Users and permissions',
        route: routes.seller.usersPermissions
    },
    {
        label: 'Payments',
        route: routes.seller.payments
    },
    {
        label: 'Checkouts',
        route: routes.seller.checkouts
    },
    {
        label: 'Amazon Marketplaces',
        route: routes.seller.amazonMarketplaces
    },
    {
        label: 'Shipping and Delivery',
        route: routes.seller.shippingDelivery
    },
]

export const async_consts = {
    user_credentials: 'USER_CREDENTIALS',
    user_credentials_social: 'USER_CREDENTIALS_SOCIAL',
    fcm_token: 'FCM_TOKEN',
    recently_searched: 'RECENTLY_SEARCHED'
}

export const social_auth_types = {
    google: 'google',
    facebook: 'facebook',
    local: 'local',
    instagram: 'instagram',
    twitter: 'twitter'
}

export const post_privacy_options = {
    guildMember: 'guildMembers',
    followers: 'followers',
    public: 'public',
    group: 'group',
}

export const post_types = {
    post: 'post',
    fundraisingProject: 'fundraising',
}

export const imagePickerOptions = {
    title: 'Select Photo',
    quality: 1,
    maxWidth: 500,
    maxHeight: 500,
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export const group_privacy_options = {
    private: 'private',
    public: 'public'
}

export const chat_mute_intervals = {
    day: "day",
    week: "week",
    custom: "custom"
}

export const get_groups_types = {
    forYou: "forYou", discover: "discover", yourGroups: "yourGroups"
}

export const search_filter_options = {
    product: "products", group: "groups", people: "people"
}
export const search_sort_options = {
    name: "name", rating: "rating"
}