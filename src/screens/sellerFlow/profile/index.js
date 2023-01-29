import React, { Component } from 'react';
import { View } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Cards, Common, Spacer, Wrapper, Text, Images, ScrollViews } from '../../../components';
import { OptionsBordered } from '../../../components/common';
import { appImages, appStyles, routes, seller_drawer_screens, sizes } from '../../../services';

export default function Index({ navigation, route }) {
    const { replace, navigate } = navigation

    const topOptions = seller_drawer_screens.slice(0, 2)
    const mainOptions = seller_drawer_screens.slice(2)
    return (
        <Wrapper isMain>
            <Common.SwitchModeButton
                mode={'seller'}
                onPress={() => {
                    replace(routes.app);
                    setTimeout(() => {
                        navigate(routes.profile)
                    }, 250);
                }}
            />
            <ScrollViews.WithKeyboardAvoidingView>
            <Spacer isSmall />
                <Cards.UserPrimary
                    containerStyle={{}}
                    imageUri={appImages.user2}
                    imageSize={totalSize(10)}
                    title='John Doe'
                    subTitle='john@gmail.com'
                    subRowContainerStyle={[appStyles.alignItemsCenter]}
                    titleStyle={[appStyles.h6]}
                    subTitleStyle={[appStyles.textSmall, appStyles.textLightGray]}
                />
                <Spacer isSmall />
                <OptionsBordered
                    options={topOptions}
                    onPressOption={(item,index)=>navigate(item.route)}
                />
                 <Spacer isBasic />
                <OptionsBordered
                    options={mainOptions}
                    onPressOption={(item,index)=>navigate(item.route)}
                />
                 <Spacer isBasic />
            </ScrollViews.WithKeyboardAvoidingView>

        </Wrapper>
    )
}
