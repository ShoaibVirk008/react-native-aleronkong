import React, { Component, useState } from 'react';
import { View } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { Buttons, Icons, Loaders, Spacer, StatusBars, Text, Wrapper } from '../../../components';
import { navigate } from '../../../navigation/rootNavigation';
import { Api, appIcons, applotties, appStyles, async_consts, backend, fontSize, HelpingMethods, routes, sizes } from '../../../services';
import Lottie from 'lottie-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Index({ navigation, route }) {
    const { navigate, replace } = navigation
    const data = route?.params?.data || null
    console.log('data: ', data)


    const [loading, setLoading] = useState(false)

    const handleDontAllow = () => {
        replace(routes.app)
    }

   
    const handleAllow = async () => {
        const { token } = data
        await HelpingMethods.requestNotificationPermission()
        await HelpingMethods.checkNotificationPermission()
        setLoading(true)
        setTimeout(async () => {
            const fcmToken = await AsyncStorage.getItem(async_consts.fcm_token)
            if (fcmToken) {
                await Api.UpdateUser({ userToken: token, fcmToken: fcmToken })
            }
            //await handleLogin()
            replace(routes.app)
            setLoading(false)
        }, 500);
    }
    return (
        <Wrapper isMain>
            <StatusBars.Dark />
            {/* <Lottie source={applotties.loading_smile} autoPlay loop /> */}
            <Wrapper flex={3.75} >
                {/* <Wrapper animation={'bounceIn'} duration={2000} style={[appStyles.center]}>
                    <Icon
                    name='bell'
                    type='font-awesome'
                    size={width(40)}
                    color={}
                    /> 
                </Wrapper>
            */}
                <Wrapper flex={2} isCenter>
                    <Lottie
                        source={applotties.notification_bell}
                        style={{ height: width(50), width: width(50) }}
                        autoPlay
                        loop />
                </Wrapper>
                <Wrapper flex={1}>
                    <Wrapper marginHorizontalBase>
                        <Wrapper marginHorizontalBase>
                            <Text isSmallTitle alignTextCenter style={[]}>Aleron Kong would like to send you notifications</Text>
                        </Wrapper>
                    </Wrapper>
                </Wrapper>
            </Wrapper>
            <Wrapper flex={1.25} >
                <Wrapper marginHorizontalBase style={{ flex: 1, justifyContent: 'space-evenly', }}>
                    <Buttons.Colored
                        text={'Allow'}
                        onPress={handleAllow}
                        isLoading={loading}
                    />
                    <Buttons.Bordered
                        text={"Don't Allow"}
                        onPress={handleDontAllow}
                    />
                </Wrapper>
            </Wrapper>
            <Loaders.SmileAbsolute
                isVisible={loading}
            />
        </Wrapper >
    )
}
