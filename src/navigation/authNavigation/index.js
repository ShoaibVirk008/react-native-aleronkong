import React, { Component, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes, headers, Hooks } from '../../services';
import * as Auth from '../../screens/authFlow';
import { StatusBars } from '../../components';

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
    // const handleDeeplink =Hooks.UseDeeplink()
    // const { linkedURL, resetURL } = Hooks.UseDeeplinkUrl();

    // useEffect(() => {
    //     // ... handle deep link
    //     console.log('linkedURL: ',linkedURL)
    //     resetURL();
    // }, [linkedURL, resetURL])
    
    return (
        <>
            <StatusBars.Light />
            <AuthStack.Navigator
                // screenOptions={headers.screenOptions}
                //screenOptions={{headerStyle:{backgroundColor:'gray',borderBottomWidth:5}}}
                screenOptions={{ headerShown: false }}
                initialRouteName={routes.signin}
            >
                <AuthStack.Screen name={routes.signin} component={Auth.Signin} />
                {/* <AuthStack.Screen name={routes.signup} component={Auth.Signup} /> */}
                <AuthStack.Screen name={routes.forgotPassword} component={Auth.ForgotPassword} />
                <AuthStack.Screen name={routes.resetPassword} component={Auth.ResetPassword} />
                <AuthStack.Screen name={routes.createAnAccount} component={Auth.CreateAnAccount} />
                <AuthStack.Screen name={routes.setupProfile} component={Auth.SetupProfile} />
                <AuthStack.Screen name={routes.allowNotifications} component={Auth.AllowNotifications} />
            </AuthStack.Navigator>
        </>
    )
}

export default AuthNavigation