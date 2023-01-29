import { useFocusEffect, } from '@react-navigation/native';
import React, { Component, useCallback, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Buttons, Headers, Images, Spacer, Wrapper, Text, ScrollViews, Modals, Common, Icons, Loaders } from '../../../components';
import { navigate } from '../../../navigation/rootNavigation';
import { Api, appImages, appStyles, colors, DummyData, routes, sizes } from '../../../services';


export default function Index({ route }) {
    const [packages, setPackges] = useState(null)

    useFocusEffect(useCallback(() => {
        getPackages()
    }, []))
    const getPackages = async () => {
        Api.getUserPackages({}).
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
                title={'Get Support From Fans'}
                showBackArrow
                right={
                    <Icons.Button
                        iconName={'plus'}
                        buttonColor={colors.appColor1 + '20'}
                        iconColor={colors.appColor1}
                        buttonSize={totalSize(3.5)}
                        iconSize={totalSize(2.5)}
                        isRound
                        buttonStyle={{ marginRight: sizes.marginHorizontal }}
                        onPress={() => navigate(routes.AddSuppportPackage)}
                    />
                }
                rightContainerStyle={{ flex: 0 }}
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
                                onPressEdit={(item, index) => navigate(routes.AddSuppportPackage, { data: item })}
                            />
                            <Spacer isBasic />
                        </ScrollViews.WithKeyboardAvoidingView>
                        :
                        <Common.NoDataViewPrimary
                            containerStyle={[appStyles.mainContainer, appStyles.center]}
                            iconName='hand-holding-usd'
                            iconType='font-awesome-5'
                            title='No Packages Yet'
                            text='Tap to create a new package now'
                            onPress={() => navigate(routes.AddSuppportPackage)}
                        />
                    :
                    <Loaders.Boxes
                        size={totalSize(5)}
                    />
            }

        </Wrapper>
    )
}



