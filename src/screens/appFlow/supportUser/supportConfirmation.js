import React, { useState } from 'react'
import {
    Animated,
    View,
    Pressable,
    Button,
    StyleSheet,
    Platform,
} from 'react-native';
import { height, width } from 'react-native-dimension';
import { useSelector } from 'react-redux';
// import { useTheme } from '@react-navigation/native';
// import { useCardAnimation } from '@react-navigation/stack';
import { Cards, Common, Images, Lines, Wrapper, Text, Spacer, Toasts } from '../../../components'
import { goBack, navigate } from '../../../navigation/rootNavigation';
import { Api, appStyles, colors, routes, sizes } from '../../../services';
import { setCurrentUser } from '../../../services/store/actions';


export default function Index({ route }) {
    const userData = route?.params?.userData || null
    const packageData = route?.params?.packageData || null
    const onPressContinue = route?.params?.onPressContinue || null
    const { _id, avatar, firstName, lastName, } = userData
    const { title, media, price, description } = packageData
    const name = firstName + ' ' + lastName
    console.log('userData -> ', userData)

    const [loading, setLoading] = useState(false)

    const currentUser = useSelector(state => state.user.currentUser)
    const { defaultPaymentMethod } = currentUser
    const cardNumber = defaultPaymentMethod?.card?.last4 ? '**** **** **** ' + defaultPaymentMethod?.card?.last4 :'Not selected'

    const handleSubscribe = async () => {
        if(defaultPaymentMethod){
            setLoading(true)
            await Api.subscribePackage({ packageId: packageData._id })
                .then(res => {
                    if (res) {
                        //const { _id, creator } = res.data
                        const newSubscribedPackage = res.data
                        const oldSubscribedPackages = currentUser?.supportingPackages || []
                        setCurrentUser({ ...currentUser, supportingPackages: [...oldSubscribedPackages, newSubscribedPackage] })
                        navigate(routes.userDetail, { data: userData })
                        Toasts.Success('Package has been subscribed')
                    }
                })
            setLoading(false)
        }else{
            Toasts.Error('Please add / select a payment method')
        }
    }
    return (

        <Common.PopupWrappers.Primary
            //onPressButton1={() => { navigate(routes.userDetail) }}
            onPressButton1={handleSubscribe}
            buttonText1='Continue'
            hideHeader
            toggle={goBack}
            icon={
                <Images.Profile
                    source={{ uri: avatar }}
                    size={width(25)}
                    shadow
                />
            }
            loadingButton1={loading}
        // title={
        //     <Text isSmallTitle>{`Support Stacey Graham`}
        //         {'\n'}
        //         <Text isTinyTitle style={{ marginTop: sizes.marginVertical }}>{`for $15 per month`}</Text>
        //     </Text>
        // }
        // info={'asdadasasd'}
        >
            <Wrapper>
                <Wrapper marginHorizontalLarge>
                    <Text isSmallTitle alignTextCenter isBoldFont>Support {name}</Text>
                    <Spacer isSmall />

                    <Text isTinyTitle alignTextCenter isBoldFont>for ${price} per month</Text>
                    <Spacer isBasic />
                    <Text isRegular alignTextCenter>You will be charged ${price} per month from your payment method selected below. Please continue to start supporting Stacey Graham.</Text>

                </Wrapper>
                <Spacer isDoubleBase />
                <Common.DefaultPaymentMethod/>
                <Spacer isBasic />
            </Wrapper>
        </Common.PopupWrappers.Primary>
    );
}

const styles = StyleSheet.create({
    menuOptionContainer: {
        paddingVertical: height(2)
    }
})