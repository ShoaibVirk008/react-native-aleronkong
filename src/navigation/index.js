import React, { Component, useEffect, useState } from 'react';
import { View, Text, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigation from './authNavigation';
import AppNavigation from './appNavigation';
import SellerAppNavigation from './sellerAppNavigation';
import { Hooks, routes } from '../services';
import { Splash } from '../screens/authFlow';
import { navigationRef } from './rootNavigation';
import messaging from '@react-native-firebase/messaging';
import linking from './linking';


const MainStack = createNativeStackNavigator();

export default function Navigation() {
    const [loading, setLoading] = useState(true)
   
    useEffect(() => {
        // handleBackgroundNotification()
        handleForgroundNotification()
        handleOnOpenNotification()
        setTimeout(() => {
            setLoading(false)
        }, 2500);
    })
   

    

    // const handleBackgroundNotification = () => {
    //     messaging().setBackgroundMessageHandler(async remoteMessage => {
    //         console.log('Message handled in the background!', remoteMessage);
    //     });
    // }
    const handleForgroundNotification = () => {
        messaging()
            .onMessage(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification Has been recieved:',
                        remoteMessage,
                    );
                    //  setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
                    if (remoteMessage.data) {
                        const { data } = remoteMessage
                        console.log('New Notification Has been recieved--->')
                    }
                }
            })
    }

    const handleOnOpenNotification = () => {
        messaging().onNotificationOpenedApp(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from background state:',
                    remoteMessage,
                );
                const { data } = remoteMessage
                handleOnPressNotification(data)
            }
        });
        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage,
                    );
                    //  setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
                    if (remoteMessage.data) {
                        const { data } = remoteMessage
                        handleOnPressNotification(data)
                    }
                }
            });
    }
    const handleOnPressNotification = (item) => {
        console.log('Push notification data---->data', item)
    }

    // if (loading)
    //     return <Splash />
    // else
    return (
        <NavigationContainer
            ref={navigationRef}
            linking={linking}
        >
            <MainStack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={routes.auth}
            >
                <MainStack.Screen
                    name={routes.auth}
                    component={AuthNavigation}
                />
                <MainStack.Screen
                    name={routes.app}
                    component={AppNavigation}
                />
                <MainStack.Screen
                    name={routes.sellerApp}
                    component={SellerAppNavigation}
                />
            </MainStack.Navigator>
        </NavigationContainer>
    );
}

