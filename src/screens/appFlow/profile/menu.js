import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { height } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { Cards, Common, Lines, Spacer, Wrapper } from '../../../components';
import { goBack } from '../../../navigation/rootNavigation';
import { appStyles, async_consts, colors, routes } from '../../../services';
import { actions } from '../../../services/store';
import { setCurrentUser, setUserToken } from '../../../services/store/actions';

export default function Index({ navigation }) {
    const { navigate, replace, goBack } = navigation

    //redux state
    const dispatch = useDispatch()
    const MenuTopOptions = [
        {
            label: `Get Support From Fans`,
            route: routes.getSupportFromFans
        },
        {
            label: `Authors You Support`,
            route: routes.authorsYouSupport
        },
    ]

    const MenuOptions = [
        {
            label: `Edit Profile`,
            route: routes.editProfile
        },
        {
            label: `Change Password`,
            route: routes.changePassword
        },
        {
            label: `Notification Settings`,
            route: routes.notificationSettings
        },
        {
            label: `Call Settings`,
            route: routes.callSettings
        },
        {
            label: `My Orders`,
            route: routes.myOrders
        },
        {
            label: `Membership`,
            route: routes.membership
        },
        {
            label: `Payment Methods`,
            route: routes.paymentMethods
        },
        {
            label: `Terms of Service`,
            route: routes.termsConditions
        },
        {
            label: `Privacy Policy`,
            route: routes.privacyPolicy
        },
        {
            label: `About Us`,
            route: routes.aboutUs
        },
        {
            label: `Logout`,
            route: routes.auth
        },

    ]
    const handleOnpressMenuTopOptions = (item, index) => {
        navigate(item.route)
    }
    const handleOnpressMenuOptions = (item, index) => {

        if (item.label != 'Logout') {
            navigate(item.route)
        } else {
            handleLogout()
        }
    }
    const handleLogout = () => {
        Alert.alert(
            "Logout!",
            "Are you sure you want to logout",
            [
                {
                    text: "No",
                    onPress: () => console.log("No Pressed"),
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => {
                        AsyncStorage.removeItem(async_consts.user_credentials)
                        AsyncStorage.removeItem(async_consts.user_credentials_social)
                        replace(routes.auth, { loggedOut: true })
                        setCurrentUser(null)
                        setUserToken(null)
                    }
                },
            ]
        );
    }
    return (
        <>
            <Common.PopupWrappers.Main
                toggle={goBack}
                containerStyle={{ ...appStyles.paddingVerticalBase, paddingBottom: height(7) }}
            >
                <Wrapper isBorderedWrapper paddingHorizontalZero paddingVerticalZero style={{ borderColor: colors.appBgColor3 }}>
                    {
                        MenuTopOptions.map((item, index) => {
                            return (
                                <Wrapper key={index}>
                                    {
                                        index != 0 ?
                                            <Lines.Horizontal />
                                            :
                                            null
                                    }
                                    <Cards.IconTitleArrow
                                        title={item.label}
                                        containerStyle={[{ paddingVertical: height(2) }]}
                                        titleStyle={[appStyles.textRegular, index === 0 && { ...appStyles.fontBold, ...appStyles.textPrimaryColor }]}
                                        onPress={() => handleOnpressMenuTopOptions(item, index)}
                                    />
                                </Wrapper>
                            )
                        })
                    }
                </Wrapper>
                <Spacer isBasic />
                <Wrapper isBorderedWrapper paddingHorizontalZero paddingVerticalZero style={{ borderColor: colors.appBgColor3 }}>
                    {
                        MenuOptions.map((item, index) => {
                            return (
                                <Wrapper key={index}>
                                    {
                                        index != 0 ?
                                            <Lines.Horizontal />
                                            :
                                            null
                                    }
                                    <Cards.IconTitleArrow
                                        title={item.label}
                                        containerStyle={[{ paddingVertical: height(1.75) }]}
                                        titleStyle={[appStyles.textRegular, index === MenuOptions.length - 1 && { ...appStyles.textError }]}
                                        onPress={() => handleOnpressMenuOptions(item, index)}
                                    />
                                </Wrapper>
                            )
                        })
                    }
                </Wrapper>
            </Common.PopupWrappers.Main>
        </>
    )
}
