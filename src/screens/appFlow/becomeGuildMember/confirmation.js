import React, { Component } from 'react';
import { View, } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Spacer, Wrapper, Text, Images, Buttons } from '../../../components';
import { applotties, routes } from '../../../services';
import Lottie from 'lottie-react-native'
import { goBack, navigate } from '../../../navigation/rootNavigation';
export default function Index({ route }) {
    const guildPackageData = route?.params?.data
    const {title, image, price, description } = guildPackageData
    const info = 'You can now access all the premium content and Phasellus egestas et risus sit amet hendrerit. Nulla facilisi. Cras urna sem, vulputate sed condimentum a, posuere vel enim.'
    return (
        <Wrapper isMain>
            <Spacer isStatusBarHeigt />
            <Spacer isBasic />
            <Wrapper alignItemsCenter>
                <Text isMediumTitle>Congratulations!</Text>
            </Wrapper>
            <Spacer isDoubleBase />
            <Wrapper alignItemsCenter>
                <Lottie
                    source={applotties.notification_bell}
                    style={{ height: width(50), width: width(50) }}
                    autoPlay
                //loop
                />
                <Spacer isDoubleBase />
                <Images.SqareRound
                    source={{ uri: image }}
                    size={totalSize(10)}

                />
                <Spacer isBasic />
                <Text isMediumTitle isPrimaryColor>{title}</Text>
                <Spacer isBasic />
                <Wrapper marginHorizontalLarge>
                    <Text isRegular alignTextCenter>{info}</Text>
                </Wrapper>
            </Wrapper>
            <Spacer isDoubleBase />
            <Wrapper marginHorizontalSmall>
                <Buttons.Colored
                    text={'Continue'}
                    onPress={()=>navigate(routes.profile)}
                />
            </Wrapper>
        </Wrapper>
    )
}
