import { useFocusEffect } from '@react-navigation/native';
import React, { Component, useCallback, useEffect, useState } from 'react';
import { View, Pressable, Alert } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { useSelector } from 'react-redux';
import { Headers, Wrapper, Text, Spacer, Buttons, ScrollViews, Common, Loaders, Modals, Toasts } from '../../../components';
import { goBack, navigate } from '../../../navigation/rootNavigation';
import { Api, appStyles, colors, routes, sizes } from '../../../services';
import { setCurrentUser } from '../../../services/store/actions';

export default function Index({ route }) {
    const is_changing_paymentmethod = route?.params?.change || null
    const [paymentMethods, setPaymentMethods] = useState(null)
    const [isRemovePopupVisible, setRemovePopupVisible] = useState(false)
    const [loadingRemove, setLoadingRemove] = useState(false)
    const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null)
    const [loadingDefault, setLoadingDefault] = useState(false)
    const [loadingDefaultIndex, setLoadingDefaultIndex] = useState(null)

    const toggleRemovePopup = () => setRemovePopupVisible(!isRemovePopupVisible)

    const user = useSelector(state => state.user)
    const { currentUser } = user

    useFocusEffect(useCallback(() => {
        handleGetPaymentMethods()
    }, []))

    const handleGetPaymentMethods = async () => {
        await Api.getAllPaymentMethods()
            .then(res => {
                if (res) {
                    setPaymentMethods(res.data)
                } else {
                    setPaymentMethods([])
                }
            })
    }
    const handleRemovePaymentMethod = () => {
        setLoadingRemove(true)
        Api.removePaymentMethod({ paymentMethodId: selectedPaymentMethodId })
            .then(res => {
                if (res) {
                    Toasts.Success('Payment method deleted')
                    const newPaymentMethods = paymentMethods.filter(item => item.id != selectedPaymentMethodId)
                    setPaymentMethods(newPaymentMethods)
                    toggleRemovePopup()
                    setLoadingRemove(false)
                }
            })
    }

    const handleDefaultPaymentMethod = async (paymentMethod, index) => {
        setLoadingDefaultIndex(index)
        await Api.defaultPaymentMethod({ paymentMethodId: paymentMethod.id })
            .then(res => {
                if (res) {
                    setCurrentUser({ ...currentUser, defaultPaymentMethod: paymentMethod })
                }
            })
        setLoadingDefaultIndex(null)
    }

    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'Payment Methods'}
                showBackArrow
            />

            {
                paymentMethods ?
                    paymentMethods?.length ?
                        <ScrollViews.WithKeyboardAvoidingView
                            footer={
                                is_changing_paymentmethod ?
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
                            <PaymentMethods
                                data={paymentMethods}
                                onPressRemove={(item, index) => {
                                    setSelectedPaymentMethodId(item.id)
                                    toggleRemovePopup()
                                }}
                                onPressSelect={(item, index) => {
                                    handleDefaultPaymentMethod(item, index)
                                }}
                                loadingSelectIndex={loadingDefaultIndex}
                                defaultPaymentMethodId={currentUser?.defaultPaymentMethod?.id}
                            />
                            <Spacer isBasic />
                            <Buttons.Bordered
                                text={'Add Payment Method'}
                                onPress={() => navigate(routes.addPaymentMethod)}
                                buttonStyle={[appStyles.marginHorizontalLarge]}
                            />

                        </ScrollViews.WithKeyboardAvoidingView>
                        :
                        <Common.NoDataViewPrimary
                            containerStyle={[appStyles.mainContainer, appStyles.center]}
                            iconName='credit-card-plus'
                            iconType='material-community'
                            title='No Payment Methods'
                            text='Tap to add a payment method now'
                            onPress={() => navigate(routes.addPaymentMethod)}
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
                title={`Are you sure you want to remove payment method`}
                titleStyle={[appStyles.h6]}
                onPressButton1={() => {
                    toggleRemovePopup()
                }}
                onPressButton2={handleRemovePaymentMethod}
                buttonText1='No'
                buttonText2='Yes'
                loadingButton2={loadingRemove}
            />
        </Wrapper>
    )
}

const PaymentMethods = ({ data, onPressRemove, onPressSelect, loadingSelectIndex, defaultPaymentMethodId }) => {


    return (
        <>
            {
                data.map((item, index) => {
                    const { } = item
                    //const is_default = index === 0
                    const is_default = defaultPaymentMethodId === item.id
                    // console.log('item.card: ', item.card)
                    const card_number = '**** **** **** ' + item.card.last4
                    const brand = item.card.brand
                    const name = item.billing_details.name
                    const isLoadingSelect = loadingSelectIndex === index
                    return (
                        <Common.InfoCardPrimary
                        key={index}
                            containerStyle={{ marginTop: sizes.marginVertical / 2 }}
                            title={name}
                            subTitle={card_number}
                            onPressRemove={() => onPressRemove(item, index)}
                            // onPressEdit={() => navigate(routes.addPaymentMethod, { data: item })}
                            onPressSelect={!is_default ? () => onPressSelect(item, index) : null}
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
