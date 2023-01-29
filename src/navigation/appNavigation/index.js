import React, { Component, useEffect } from 'react';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { routes, headers, tabs, colors, appImages } from '../../services';
import * as App from '../../screens/appFlow';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Common, Images, StatusBars, Wrapper } from '../../components';
import { totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { ImageViewer, VideoPlayer } from '../../components/common';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { navigate } from '../rootNavigation';
import { setNowPlaying } from '../../services/store/actions';

//const AppStack = createNativeStackNavigator();
const AppStack = createStackNavigator();
const BottomTabStack = createBottomTabNavigator();

const BottomTabNavigation = () => {
    const tabIconSize = totalSize(2.5)

    const user = useSelector(state => state.user)
    const { currentUser } = user

   

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
       <>
        <BottomTabStack.Navigator
            screenOptions={{
                headerShown: false,
                ...tabs.tabBarOptions,
            }}
        >
            <BottomTabStack.Screen
                name={routes.home}
                component={App.Home}
                options={() => ({
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size, focused }) => {
                        return <TabIcon iconName='home' iconType='feather' size={tabIconSize} color={color} focused={focused} />
                    },
                })}
            />
            <BottomTabStack.Screen
                name={routes.search}
                component={App.Search}
                options={() => ({
                    tabBarLabel: "Search",
                    tabBarIcon: ({ color, size, focused }) => {
                        return <TabIcon iconName='search' iconType='feather' size={tabIconSize} color={color} focused={focused} />
                    },
                })}
            />
            <BottomTabStack.Screen
                name={routes.social}
                component={App.Social}
                options={() => ({
                    tabBarLabel: "Social",
                    tabBarIcon: ({ color, size, focused }) => {
                        return <TabIcon iconName='users' iconType='feather' size={tabIconSize} color={color} focused={focused} />
                    },
                })}
            />
            <BottomTabStack.Screen
                name={routes.store}
                component={App.Store}
                options={() => ({
                    tabBarLabel: "Store",
                    tabBarIcon: ({ color, size, focused }) => {
                        return <TabIcon iconName='shopping-bag' iconType='feather' size={tabIconSize} color={color} focused={focused} />
                    },
                })}
            />
            <BottomTabStack.Screen
                name={routes.profile}
                component={App.Profile}
                options={() => ({
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size, focused }) => {
                        return <TabIcon image={currentUser.avatar || appImages.noUser} focused={focused} />
                    },
                })}
            />
             
        </BottomTabStack.Navigator>
         {/* <App.MusicPlayer />  */}
       </>
    )
}

const AppNavigation = () => {
   
    useEffect(() => {
        const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
        //setNowPlaying(null)
        // When the component is unmounted, remove the listener
        return () => unsubscribe();
    }, []);
   
    useEffect(() => {
        dynamicLinks()
          .getInitialLink()
          .then(link => {
            console.log('getInitialLink link: ', link)
            if (link?.url) {
                const postId = /[^/]*$/.exec(link.url)[0];
                console.log('postId ', postId)
                navigate(routes.postDetail,{postId})
            }
            
          });
      }, []);
      const handleDynamicLink = link => {
        // Handle dynamic link inside your own application
        console.log('onLink link: ', link)
        if (link?.url) {
            const postId = /[^/]*$/.exec(link.url)[0];
            console.log('postId ', postId)
            navigate(routes.postDetail,{postId})
        }
       
    };
    return (
        <>
            <StatusBars.Dark />
            <AppStack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={routes.bottomTab}
            >
                <AppStack.Screen name={routes.bottomTab} component={BottomTabNavigation} />

                {/* Cart */}
                <AppStack.Group>
                    <AppStack.Screen name={routes.cart} component={App.Cart} />
                    <AppStack.Screen name={routes.checkout} component={App.Checkout} />
                </AppStack.Group>

                {/* Messaging */}
                <AppStack.Group>
                    <AppStack.Screen name={routes.messages} component={App.Messages} />
                    <AppStack.Screen name={routes.chat} component={App.Chat} />
                    <AppStack.Screen name={routes.chatMenu} component={App.ChatMenu} options={{ presentation: 'transparentModal' }} />
                </AppStack.Group>

                <AppStack.Screen name={routes.notifications} component={App.Notifications} />
                <AppStack.Screen name={routes.audioCall} component={App.AudioCall} />

                <AppStack.Screen name={routes.paymentMethods} component={App.PaymentMethods} />
                <AppStack.Screen name={routes.addPaymentMethod} component={App.AddPaymentMethod} />
                <AppStack.Screen name={routes.deliveryAddresses} component={App.DeliveryAddresses} />
                <AppStack.Screen name={routes.addDeliveryAddress} component={App.AddDeliveryAddress} />

                {/* Add Post Screens */}
                <AppStack.Group>
                    <AppStack.Screen name={routes.shareSomethingRoutes.shareSomething} component={App.ShareSomethingScreens.ShareSomething} />
                    <AppStack.Screen name={routes.shareSomethingRoutes.sharePost} component={App.ShareSomethingScreens.SharePost} />
                    <AppStack.Screen name={routes.shareSomethingRoutes.SellProducts} component={App.ShareSomethingScreens.SellProducts} />
                    <AppStack.Screen name={routes.shareSomethingRoutes.productDescription} component={App.ShareSomethingScreens.ProductDescription} />
                    <AppStack.Group>
                        <AppStack.Screen name={routes.shareSomethingRoutes.startFundRaiserProjectRoutes.startFundRaiserProject} component={App.ShareSomethingScreens.StartFundRaiserProjectScreens.StartFundRaiserProject} />
                        <AppStack.Screen name={routes.shareSomethingRoutes.startFundRaiserProjectRoutes.aboutTheProject} component={App.ShareSomethingScreens.StartFundRaiserProjectScreens.AboutTheProject} />
                        <AppStack.Screen name={routes.shareSomethingRoutes.startFundRaiserProjectRoutes.fundingDetails} component={App.ShareSomethingScreens.StartFundRaiserProjectScreens.FundingDetails} />
                        <AppStack.Screen name={routes.shareSomethingRoutes.startFundRaiserProjectRoutes.verifyBankAccount} component={App.ShareSomethingScreens.StartFundRaiserProjectScreens.VerifyBankAccount} />
                        <AppStack.Screen name={routes.shareSomethingRoutes.startFundRaiserProjectRoutes.reviewProject} component={App.ShareSomethingScreens.StartFundRaiserProjectScreens.ReviewProject} />
                    </AppStack.Group>
                </AppStack.Group>

                <AppStack.Screen name={routes.postDetail} component={App.PostDetail} />
                <AppStack.Screen name={routes.fundRaisingProjectDetail} component={App.FundRaisingProjectDetail} />
                <AppStack.Screen name={routes.userDetail} component={App.UserDetail} />

                {/* Search Tab */}
                <AppStack.Screen name={routes.searchResults} component={App.SearchResults} />

                {/* Social Tab */}
                <AppStack.Screen name={routes.createGroup} component={App.CreateGroup} />
                <AppStack.Screen name={routes.groupDetail} component={App.GroupDetail} />
                <AppStack.Screen name={routes.groupDetailManage} component={App.GroupDetailManage} options={{ presentation: 'transparentModal' }} />
                <AppStack.Screen name={routes.groupDetailMenu} component={App.GroupDetailMenu} options={{ presentation: 'transparentModal' }} />
                <AppStack.Screen name={routes.groupMemberRequests} component={App.GroupMemberRequests} />
                <AppStack.Screen name={routes.groupViewMembers} component={App.GroupViewMember} />

                {/* Support A User */}
                <AppStack.Screen name={routes.supportUser} component={App.SupportUser} />
                <AppStack.Screen name={routes.supportConfirmation} component={App.SupportConfirmation} options={{ presentation: 'transparentModal' }} />

                <AppStack.Screen name={routes.storeDetail} component={App.StoreDetail} />
                <AppStack.Screen name={routes.productDetail} component={App.ProductDetail} />

                {/* Profile tab screens */}
                <AppStack.Screen name={routes.profileMenu} component={App.ProfileMenu} options={{ presentation: 'transparentModal' }} />
                <AppStack.Screen name={routes.becomeGuildMember} component={App.BecomeGuildMember} />
                <AppStack.Screen name={routes.becomeGuildMemberDetail} component={App.BecomeGuildMemberDetail} />
                <AppStack.Screen name={routes.becomeGuildMemberConfirmation} component={App.BecomeGuildMemberConfirmation} />
                <AppStack.Screen name={routes.getSupportFromFans} component={App.GetSupportFromFans} />
                <AppStack.Screen name={routes.AddSuppportPackage} component={App.AddSuppportPackage} />
                <AppStack.Screen name={routes.authorsYouSupport} component={App.AuthorsYouSupport} />
                <AppStack.Screen name={routes.editProfile} component={App.EditProfile} />
                <AppStack.Screen name={routes.changePassword} component={App.ChangePassword} />
                <AppStack.Screen name={routes.notificationSettings} component={App.NotificationSettings} />
                <AppStack.Screen name={routes.callSettings} component={App.CallSettings} />
                <AppStack.Screen name={routes.membership} component={App.Membership} />
                <AppStack.Screen name={routes.myOrders} component={App.MyOrders} />
                <AppStack.Screen name={routes.myOrderDetail} component={App.MyOrderDetail} />
                <AppStack.Screen name={routes.shareFeedback} component={App.ShareFeedback} />

                {/* Digital Products Flow */}
                <AppStack.Screen name={routes.digitalProductsFlow.productDetail} component={App.DigitalProductFlow.ProductDetail} />
                <AppStack.Screen name={routes.digitalProductsFlow.buyProduct} component={App.DigitalProductFlow.BuyProduct} />
                <AppStack.Screen name={routes.digitalProductsFlow.orderConfirmation} component={App.DigitalProductFlow.OrderConfirmation} />
                <AppStack.Screen name={routes.digitalProductsFlow.youMayLike} component={App.DigitalProductFlow.YouMayLike} />
                <AppStack.Screen name={routes.digitalProductsFlow.listenAudioBook} component={App.DigitalProductFlow.ListenAudioBook} />
                <AppStack.Screen name={routes.digitalProductsFlow.nowPlaying} component={App.DigitalProductFlow.NowPlaying} />
                <AppStack.Screen name={routes.digitalProductsFlow.listenSample} component={App.DigitalProductFlow.ListenSample} options={{ presentation: 'transparentModal' }} />
                <AppStack.Screen name={routes.digitalProductsFlow.readBook} component={App.DigitalProductFlow.ReadBook} />
                <AppStack.Screen name={routes.digitalProductsFlow.readBookMenu} component={App.DigitalProductFlow.ReadBookMenu} options={{ presentation: 'transparentModal' }} />

                <AppStack.Screen name={routes.writeReview} component={App.WriteReview} options={{ presentation: 'transparentModal' }} />

                {/* Docs Screens */}
                <AppStack.Group>
                    <AppStack.Screen name={routes.termsConditions} component={App.TermsConditions} />
                    <AppStack.Screen name={routes.privacyPolicy} component={App.PrivacyPolicy} />
                    <AppStack.Screen name={routes.aboutUs} component={App.AboutUs} />
                </AppStack.Group>

                {/* Menu/popups screens */}
                <AppStack.Group screenOptions={{ presentation: 'transparentModal' }}>
                    <AppStack.Screen name={routes.postMenu} component={Common.PostMenu} />
                    <AppStack.Screen name={routes.commentMenu} component={Common.CommentMenu} />
                    <AppStack.Screen name={routes.userMenu} component={Common.UserMenu} />
                    {/* <AppStack.Screen name={routes.supportConfirmation} component={App.SupportConfirmation} /> */}
                    <AppStack.Screen name={routes.gifKeyboard} component={App.GifKeyboard} />
                    {/* <AppStack.Screen name={routes.chatMenu} component={App.ChatMenu} /> */}
                </AppStack.Group>
                {/* Image Viewer */}
                <AppStack.Screen name={routes.imageViewer} component={ImageViewer} />
                <AppStack.Screen name={routes.videoPlayer} component={VideoPlayer} />

            </AppStack.Navigator>
            <App.DigitalProductFlow.MusicPlayer />
        </>
    )
}

export default AppNavigation