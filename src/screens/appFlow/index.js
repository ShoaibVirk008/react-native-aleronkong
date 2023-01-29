//appscreens
import Home from './home'
import Cart from './cart'
import Checkout from './cart/checkout'
import Chat from './chat'
import GifKeyboard from './chat/gifKeyboard'
import ChatMenu from './chat/menu'
import Messages from './messages'
import Notifications from './notifications'
import PostDetail from './postDetail'

//profile tab screens
import Profile from './profile'
import ProfileMenu from './profile/menu'
import BecomeGuildMember from './becomeGuildMember'
import BecomeGuildMemberDetail from './becomeGuildMember/detail'
import BecomeGuildMemberConfirmation from './becomeGuildMember/confirmation'
import GetSupportFromFans from './getSupportFromFans'
import AddSuppportPackage from './getSupportFromFans/addSuppportPackage'
import AuthorsYouSupport from './authorsYouSupport'
import EditProfile from './editProfile'
import ChangePassword from './changePassword'
import NotificationSettings from './notificationSettings'
import CallSettings from './callSettings'
import Membership from './membership'
import MyOrders from './myOrders'
import MyOrderDetail from './myOrders/detail'


//search tab screens
import Search from './search'
import SearchResults from './search/searchResults'

//social tab screens
import Social from './social'
//group flow
import CreateGroup from './groupFlow/createGroup'
import GroupDetail from './groupFlow/groupDetail'
import GroupDetailManage from './groupFlow/manage'
import GroupDetailMenu from './groupFlow/menu'
import GroupMemberRequests from './groupFlow/memberRequests'
import GroupViewMember from './groupFlow/viewMember'

//Store tab screens
import Store from './store'

import UserDetail from './userDetail'
import SupportUser from './supportUser'
import SupportConfirmation from './supportUser/supportConfirmation'
import StoreDetail from './storeDetail'
import ProductDetail from './productDetail'
import FundRaisingProjectDetail from './fundRaisingProjectDetail'


import AudioCall from './audioCall'
//sharesomthing 
import * as ShareSomethingScreens from './shareSomething'
//payment methods
import PaymentMethods from './paymentMethods'
import AddPaymentMethod from './paymentMethods/addPaymentMethod'
//delivery addresses
import DeliveryAddresses from './deliveryAddresses'
import AddDeliveryAddress from './deliveryAddresses/addDeliveryAddress'
//digitalProductFlow
import * as DigitalProductFlow from './digitalProductFlow'
//Music Player
// import MusicPlayer from './musicPlayer'
import ShareFeedback from './shareFeedback'

import WriteReview from './writeReview'

//docs screens
import TermsConditions from './termsConditions'
import PrivacyPolicy from './privacyPolicy'
import AboutUs from './aboutUs'


export {
    //Home tab screens
    Home, Cart, Checkout, Chat, Messages, Notifications, PostDetail,
    //Profile tab screens
    Profile, ProfileMenu,
    BecomeGuildMember, BecomeGuildMemberDetail, BecomeGuildMemberConfirmation,
    GetSupportFromFans, AddSuppportPackage, AuthorsYouSupport, EditProfile,
    ChangePassword, NotificationSettings, CallSettings, Membership,
    MyOrders,MyOrderDetail,

    Search,SearchResults, 
    
    Social,
    CreateGroup,GroupDetail,GroupDetailManage,
    GroupDetailMenu,GroupMemberRequests,GroupViewMember,
    
    Store, 
    
    UserDetail,
    SupportUser, SupportConfirmation,
    StoreDetail, ProductDetail, FundRaisingProjectDetail,
    ShareSomethingScreens, GifKeyboard, ChatMenu, AudioCall,

    DigitalProductFlow,
    
    ShareFeedback,

    PaymentMethods, AddPaymentMethod,
    DeliveryAddresses, AddDeliveryAddress,

    WriteReview,

    //Docs screens
    TermsConditions, PrivacyPolicy, AboutUs,

}