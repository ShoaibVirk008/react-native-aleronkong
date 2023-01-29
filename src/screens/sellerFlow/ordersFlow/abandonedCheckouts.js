import React, { useEffect } from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { Wrapper, Text, Spacer, Common, Headers, } from '../../../components';
import { appStyles, colors, sizes } from '../../../services';
const checkouts_seller = [
    {
        checkout_no: '234112',
        placed_by: 'Alex Will',
        date: '23/04/22',
        email_status: false,
        recovery_status: false,
        price: '1,120.00'
    },
    {
        checkout_no: '45212',
        placed_by: 'Nelson Mandela',
        date: '11/05/22',
        email_status: false,
        recovery_status: false,
        price: '2,442.00'
    }, {
        checkout_no: '78867',
        placed_by: 'William Joe',
        date: '23/04/22',
        email_status: true,
        recovery_status: true,
        price: '940.00'
    }
]
export default function Index({ navigation }) {
    const tempCheckouts = checkouts_seller.slice()
    const checkouts = [...tempCheckouts, ...tempCheckouts, ...tempCheckouts]

    useEffect(() => {
        navigation.setOptions({
            //headerShown:false,
            header: () => {
                return (
                    <Headers.Primary
                        title={'Abandoned Checkouts'}
                        showBackArrow
                        right={
                            <Icon
                                name='upload'
                                type='feather'
                                color={colors.appTextColor1}
                                size={totalSize(3)}
                                onPress={() => { }}
                            />
                        }
                        
                    />
                )
            }
        })
    }, [])

    return (
        <Wrapper isMain>
            <Common.CheckoutPrimaryVertical1
                data={checkouts}
                onPressDots
            />
        </Wrapper>
    )
}


