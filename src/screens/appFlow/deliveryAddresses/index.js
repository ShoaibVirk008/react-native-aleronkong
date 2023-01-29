import { useFocusEffect } from '@react-navigation/native';
import React, { Component, useCallback, useState } from 'react';
import { View, Pressable } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { useSelector } from 'react-redux';
import { Headers, Wrapper, Text, Spacer, Buttons, ScrollViews, Common, Toasts, Loaders, Modals } from '../../../components';
import { goBack, navigate } from '../../../navigation/rootNavigation';
import { Api, appStyles, colors, routes, sizes } from '../../../services';
import { setCurrentUser } from '../../../services/store/actions';

const addresses = [
    {
        label: 'Home',
        address: '14 Wall Street, Manhattan, NYC',
        is_default: true
    },
    {
        label: 'Work',
        address: '432 Brooklyn Street, Manhattan, NYC',
        is_default: false
    }
]
export default function Index({ route }) {
    const is_changing_address = route?.params?.change || null
    const [deliveryAddresses, setDeliveryAddresses] = useState(null)
    const [isRemovePopupVisible, setRemovePopupVisible] = useState(false)
    const [loadingRemove, setLoadingRemove] = useState(false)
    const [selectedAddressId, setSelectedAddressId] = useState(null)
    const [loadingDefaultIndex, setLoadingDefaultIndex] = useState(null)

    const toggleRemovePopup = () => setRemovePopupVisible(!isRemovePopupVisible)

    const user = useSelector(state => state.user)
    const { currentUser } = user

    useFocusEffect(useCallback(() => {
        handleGetAddresses()
    }, []))

    const handleGetAddresses = async () => {
        await Api.getAllAddresses()
            .then(res => {
                if (res) {
                    setDeliveryAddresses(res.data)
                } else {
                    setDeliveryAddresses([])
                }
            })
    }
    const handleRemoveAddress = () => {
        setLoadingRemove(true)
        Api.deleteAddress({ addressId: selectedAddressId })
            .then(res => {
                if (res) {
                    Toasts.Success('Address deleted')
                    const addresses = deliveryAddresses.filter(item => item._id != selectedAddressId)
                    setDeliveryAddresses(addresses)
                    toggleRemovePopup()
                    setLoadingRemove(false)
                }
            })
    }

    const handleDefaultAddress = async (address, index) => {
        setLoadingDefaultIndex(index)
        await Api.defaultAddress({ addressId: address._id })
            .then(res => {
                if (res) {
                    setCurrentUser({ ...currentUser, defaultAddress: address })
                }
            })
        setLoadingDefaultIndex(null)
    }
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'Delivery Addresses'}
                showBackArrow
            />
            {
                deliveryAddresses ?
                    deliveryAddresses?.length ?
                        <ScrollViews.WithKeyboardAvoidingView
                            footer={
                                is_changing_address ?
                                    <Wrapper>
                                        <Spacer isSmall />
                                        <Buttons.Colored
                                            text={'Save'}
                                            onPress={goBack}
                                            buttonStyle={[appStyles.marginHorizontalLarge]}
                                        />
                                        <Spacer isDoubleBase />
                                    </Wrapper>
                                    :
                                    null
                            }
                        >
                            <Spacer isSmall />
                            <DeliveryAddresses
                                data={deliveryAddresses}
                                onPressRemove={(item, index) => {
                                    setSelectedAddressId(item._id)
                                    toggleRemovePopup()
                                }}
                                onPressSelect={(item, index) => {
                                    handleDefaultAddress(item, index)
                                }}
                                loadingSelectIndex={loadingDefaultIndex}
                                defaultAddressId={currentUser?.defaultAddress?._id}
                            />
                            <Spacer isBasic />
                            <Buttons.Bordered
                                text={'Add New Address'}
                                onPress={() => navigate(routes.addDeliveryAddress)}
                                buttonStyle={[appStyles.marginHorizontalLarge]}
                            />
                        </ScrollViews.WithKeyboardAvoidingView>
                        :
                        <Common.NoDataViewPrimary
                            containerStyle={[appStyles.mainContainer, appStyles.center]}
                            iconName='add-location-alt'
                            iconType='material'
                            title='No delivery address yet'
                            text='Tap to add an address now'
                            onPress={() => navigate(routes.addDeliveryAddress)}
                        />
                    :
                    <Loaders.Boxes
                        size={totalSize(5)}
                    />
            }

            <Modals.PopupPrimary
                visible={isRemovePopupVisible}
                //toggle={toggleReportConfirmationPopup}
                toggle={toggleRemovePopup}
                topMargin={height(75)}
                title={`Are you sure you want to remove address`}
                titleStyle={[appStyles.h6]}
                onPressButton1={() => {
                    toggleRemovePopup()
                }}
                onPressButton2={handleRemoveAddress}
                buttonText1='No'
                buttonText2='Yes'
                loadingButton2={loadingRemove}
            />
        </Wrapper>
    )
}

const DeliveryAddresses = ({ data, onPressRemove, onPressSelect, loadingSelectIndex, defaultAddressId }) => {
    return (
        <>
            {
                data.map((item, index) => {
                    const { label, line1, line2, city, state, country, postalCode } = item
                    const address=`${line1}, ${line2}, ${city}, ${state}`
                    const is_default = defaultAddressId === item._id
                    const isLoadingSelect = loadingSelectIndex === index
                    return (
                        <Common.InfoCardPrimary
                        key={index}
                            containerStyle={{ marginTop: sizes.marginVertical / 2 }}
                            title={label}
                            subTitle={address}
                            onPressRemove={() => onPressRemove(item, index)}
                            onPressEdit={() => navigate(routes.addDeliveryAddress, { data: item })}
                            onPressSelect={() => onPressSelect(item, index)}
                            isDefault={is_default}
                            index={index}
                            isLoadingSelect={isLoadingSelect}
                        />
                    )
                })
            }
        </>
    )
}
