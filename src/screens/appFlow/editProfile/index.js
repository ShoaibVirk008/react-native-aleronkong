import moment from 'moment';
import React, { Component, useRef, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Buttons, Common, Headers, Loaders, ScrollViews, Spacer, Text, Toasts, Wrapper } from '../../../components';
import { goBack } from '../../../navigation/rootNavigation';
import { Api, appImages, routes, sizes, userTypes } from '../../../services';

export default function Index({ navigation, route }) {
    const { navigate } = navigation
    const params = route?.params || null

    //redux state
    const user = useSelector(state => state.user)
    const { firstName, lastName, userName, avatar, birthDate } = user.currentUser
    console.log('currentUser: ', user.currentUser)
    console.log('userToken: ', user.userToken)

    const profileData = {
        profileImage: avatar,
        firstName: firstName, lastName: lastName,
        userName: userName,
        birthday: birthDate,
    }
    const SetupProfileRef = useRef(null)
    const [isLoading, setLoading] = useState(false)

    const handleSave = async () => {
        const profileDetails = SetupProfileRef.current.getAllData()
        const validateProfileData = SetupProfileRef.current.validate()
        console.log('Profile Data:   ', profileDetails)
        if (
            validateProfileData
        ) {
            setLoading(true)
            const { firstName, lastName, userName, birthday, imageFile } = profileDetails
            let avatar = ''
            let birthDate = moment(birthday).format('YYYY-MM-DD')
            if (imageFile) {
                await Api.uploadFile(imageFile).
                    then(res => {
                        if (res) {
                            avatar = res.data.file
                        }
                    })
            }
            await Api.UpdateUser({
                firstName, lastName, userName, birthDate, avatar
            }).
                then(res => {
                    if (res) {
                        goBack()
                        Toasts.Success('Profile Updated')
                    }
                })

            setLoading(false)
            //navigate(routes.tellUsAboutYourself, { ...params, ...profileDetails })
        }
    }

    return (
        <Wrapper isMain >
            <Headers.Primary
                title={'Setup your Profile'}
                showBackArrow
            />
            <ScrollViews.WithKeyboardAvoidingView
                footer={
                    <>
                        <Spacer isBasic />
                        <Buttons.Colored
                            text={'Save Changes'}
                            onPress={handleSave}
                            isLoading={isLoading}
                        />
                        <Spacer isDoubleBase />
                    </>

                }>

                <Spacer isBasic />
                <Common.SetupProfileCom
                    ref={SetupProfileRef}
                    data={profileData}
                />

            </ScrollViews.WithKeyboardAvoidingView>
            {/* <Loaders.SmileAbsolute
                isVisible={isLoading}
            /> */}
        </Wrapper>
    )
}
