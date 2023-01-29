import React, { Component, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Buttons, Headers, Images, Spacer, Wrapper, Text, ScrollViews, Modals, Common, Icons, Loaders } from '../../../components';
import { navigate } from '../../../navigation/rootNavigation';
import { Api, appImages, appStyles, colors, DummyData, routes, sizes } from '../../../services';


export default function Index({ route }) {
    const supports = [...DummyData.supportPackages, ...DummyData.supportPackages]
    const [guildPackages, setGuildPackges] = useState(null)

    useEffect(() => {
        getPackages()
    }, [])
    const getPackages = async () => {
        Api.getUserPackages({guildPackages:true}).
            then(res => {
                if (res) {
                    setGuildPackges(res.data)
                } else {
                    setGuildPackges([])
                }
            })
    }
    return (
        <Wrapper isMain background2>
            <Headers.Primary
                title={'Become a Guild Member'}
                showBackArrow
            />

            {
                guildPackages ?
                    guildPackages?.length ?
                        <ScrollViews.WithKeyboardAvoidingView
                            showsVerticalScrollIndicator={false}
                        >
                            <Spacer isSmall />
                            <Common.SupportsPrimary
                                data={guildPackages}
                                onPressJoin={(item, index) => navigate(routes.becomeGuildMemberDetail, { data: item })}
                                type='guild'
                            />
                            <Spacer isBasic />
                        </ScrollViews.WithKeyboardAvoidingView>
                        :
                        <Common.NoDataViewPrimary
                            containerStyle={[appStyles.mainContainer, appStyles.center]}
                            iconName='hand-holding-usd'
                            iconType='font-awesome-5'
                            text='No Guild Packages Available'
                        />
                    :
                    <Loaders.Boxes
                        size={totalSize(5)}
                    />
            }
        </Wrapper>
    )
}



