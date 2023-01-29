import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, { Component, useRef, useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Buttons, Common, Headers, Loaders, ScrollViews, Spacer, Text, Wrapper } from '../../../components';
import { Api, appImages, routes, sizes, userTypes, async_consts } from '../../../services';
import { setCurrentUser, setUserToken } from '../../../services/store/actions';

export default function Index({ navigation, route }) {
    const { navigate } = navigation
    const data = route?.params?.data || null
    // console.log('data: ', data)
    const SetupProfileRef = useRef(null)
    const [isLoading, setLoading] = useState(false)

    //redux states
    const dispatch = useDispatch()

    const handleContinue = async () => {
        const profileDetails = SetupProfileRef.current.getAllData()
        const validateProfileData = SetupProfileRef.current.validate()
        console.log('Profile Data:   ', profileDetails)
        if (
            validateProfileData
        ) {
            const { email, password } = data
            const { firstName, lastName, userName, birthday, imageFile } = profileDetails
            console.log('imageFile: ',imageFile)
            setLoading(true)
            let avatar = ''
            let birthDate = moment(birthday).format('YYYY-MM-DD')
            // if (imageFile) {
            //     await Api.uploadFile(imageFile).
            //         then(res => {
            //             if (res) {
            //                 avatar = res.data.file
            //             }
            //         })
            // }
            await Api.Register({
                email, password, firstName, lastName, userName, birthDate, avatar: imageFile
            }).
                then(async res => {
                    if (res) {
                        const token = res.data.access_token
                         const tempCredentials = { email, password }
                        // AsyncStorage.setItem(async_consts.user_credentials, JSON.stringify(tempCredentials))
                        // navigate(routes.allowNotifications, { data: { ...tempCredentials, token } })
                        // await Api.Login({ email, password }).
                        //     then(res => {
                        //         if (res) {
                        //              navigate(routes.allowNotifications, { data: { token } })
                        //         }
                        //     })
                        setCurrentUser(res.data.user)
                        setUserToken(res.data.access_token)
                        AsyncStorage.setItem(async_consts.user_credentials, JSON.stringify(tempCredentials))
                        navigate(routes.allowNotifications, { data: { token } })

                    }
                })
            setLoading(false)
        }
    }


    return (
        <Wrapper isMain backgroundDark>
            <Headers.Primary
                title={'Setup your Profile'}
                //showBackArrow
                invertColors
            />
            <ScrollViews.WithKeyboardAvoidingView
                footer={
                    <>
                        <Spacer isBasic />
                        <Buttons.Colored
                            text={'Continue'}
                            onPress={handleContinue}
                            isLoading={isLoading}
                        />
                        <Spacer isDoubleBase />
                    </>

                }>

                <Spacer isBasic />
                <Common.SetupProfileCom
                    ref={SetupProfileRef}
                    //data={params.userSocialData}
                    invertColors
                />

            </ScrollViews.WithKeyboardAvoidingView>
            <Loaders.SmileAbsolute
                isVisible={isLoading}
            />
        </Wrapper>
    )
}
