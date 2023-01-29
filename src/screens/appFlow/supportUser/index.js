import React, { Component, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Buttons, Headers, Images, Spacer, Wrapper, Text, ScrollViews, Modals, Common, Loaders } from '../../../components';
import { navigate } from '../../../navigation/rootNavigation';
import { Api, appImages, appStyles, routes } from '../../../services';

const defaultSupports = [
    {
        title: 'APPLICANT',
        image: appImages.product2,
        amount: '1',
        interval: 'PER MONTH',
        description: 'You are greatly appreciated! In fact, you rock! *All rewards come with lifelong appreciation'
    },
    {
        title: 'PATCH',
        image: appImages.product4,
        amount: '2',
        interval: 'PER MONTH',
        description: 'High fiving you in spirit! *All rewards come with lifelong appreciation'
    },
    {
        title: 'Member',
        image: appImages.product5,
        amount: '5',
        interval: 'PER MONTH',
        description: 'We do a RUNNING high five... (also in spirit) *All rewards come with lifelong appreciation'
    }
]
export default function Index({ route }) {
    const user_data = route?.params?.data
    const { _id, avatar, firstName, lastName, } = user_data
    const name = firstName + ' ' + lastName

    const [packages, setPackges] = useState(null)


    useEffect(() => {
        getPackages()
    }, [])

    const getPackages = async () => {
        Api.getUserPackages({ userId: _id }).
            then(res => {
                if (res) {
                    setPackges(res.data)
                } else {
                    setPackges([])
                }
            })
    }

    return (
        <Wrapper isMain background2>
            <Headers.Primary
                title={'Support ' + name}
                showBackArrow
            />


            {
                packages ?
                    packages?.length ?
                        <ScrollViews.WithKeyboardAvoidingView
                            showsVerticalScrollIndicator={false}
                        >
                            <Spacer isSmall />
                            <Common.SupportsPrimary
                                data={packages}
                                onPressSupport={
                                    (item, index) => {
                                        navigate(routes.supportConfirmation, {
                                            userData: user_data,
                                            packageData: item,
                                            onPressContinue: () => { }
                                        })
                                    }}
                            />
                        </ScrollViews.WithKeyboardAvoidingView>
                        :
                        <Common.NoDataViewPrimary
                            containerStyle={[appStyles.mainContainer, appStyles.center]}
                            // iconName='hand-holding-usd'
                            // iconType='font-awesome-5'
                            //title='No Packages Found'
                            text='No Packages Available'
                        //onPress={() => navigate(routes.AddSuppportPackage)}
                        />
                    :
                    <Loaders.Boxes
                        size={totalSize(5)}
                    />
            }
        </Wrapper>
    )
}



