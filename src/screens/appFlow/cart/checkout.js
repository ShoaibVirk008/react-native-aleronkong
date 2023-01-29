import React, { Component, useState } from 'react';
import { View, Image, Pressable } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { Headers, Icons, Wrapper, Text, Spacer, Buttons, ScrollViews, Lines, Common, Modals, Loaders, Toasts } from '../../../components';
import { navigate } from '../../../navigation/rootNavigation';
import { DummyData, sizes, colors, appStyles, routes, Api } from '../../../services';
import { setCartDetail } from '../../../services/store/actions';

// const cartProducts = [
//     {
//         product: DummyData.products[0],
//         color: 'Navy Blue',
//         size: 'Small',
//         quantity: '1',
//     }
// ]

export default function Index() {

    const user = useSelector(state => state.user)
    const app = useSelector(state => state.app)
    const { currentUser } = user
    const { cartDetail } = app
    const { defaultPaymentMethod, defaultAddress } = currentUser

    const cartItems = cartDetail ? cartDetail?.items || [] : null
    //const cardNumber = defaultPaymentMethod?.card?.last4 ? '**** **** **** ' + defaultPaymentMethod?.card?.last4 : 'Not selected'

    // const [products, setProducts] = useState(cartProducts)
    const [isSuccessPopupVisible, setSuccessPopupVisibility] = useState(false)
    const [loadingPlaceOrder, setLoadingPlaceOrder] = useState(false)

    const toggleSuccessPopup = () => setSuccessPopupVisibility(!isSuccessPopupVisible)

    const handleValidation = () => {
        if (defaultAddress) {
            if (defaultPaymentMethod) {
                return true
            } else {
                Toasts.Error('Please add/select a payment method')
                return false
            }
        } else {
            Toasts.Error('Please add/select a delivery address')
            return false
        }
    }
    const handlePlaceOrder = async () => {
        if (handleValidation()) {
            setLoadingPlaceOrder(true)
            await Api.checkout({
                paymentMethod: defaultPaymentMethod?.id,
                address: defaultAddress?._id
            }).then(res => {
                if (res) {
                    setCartDetail({})
                    toggleSuccessPopup()
                }
            })
            setLoadingPlaceOrder(false)
        }
    }

    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'Checkout'}
                showBackArrow
            />
            <ScrollViews.WithKeyboardAvoidingView
                footer={
                    <Wrapper marginHorizontalBase marginVerticalBase>
                        <Buttons.Colored
                            text={'Place Order'}
                            onPress={handlePlaceOrder}
                        />
                        <Spacer isBasic />
                    </Wrapper>
                }
            >
                <Common.CartProducts
                    data={cartItems}
                    showQuantity
                // onPressMinus={(item, index) => { }}
                // onPressPlus={(item, index) => { }}
                // onPressRemove={(item, index) => { }}
                />
                <Spacer isBasic />
                <Lines.Horizontal style={[appStyles.marginHorizontalSmall]} />
                <Spacer isBasic />
                <Common.OrderPriceInfo
                    subtotal={cartDetail?.subTotal || 0}
                    tax={cartDetail?.tax || 0}
                    total={cartDetail?.total || 0}
                />
                <Spacer isBasic />
                <Lines.Horizontal style={[appStyles.marginHorizontalSmall]} />
                <Spacer isBasic />
                <Common.DefaultDeliveryAddress />
                <Spacer isBasic />
                <Common.DefaultPaymentMethod />
                <Spacer isBasic />
            </ScrollViews.WithKeyboardAvoidingView>
            <Common.SuccessPopup
                visible={isSuccessPopupVisible}
                toggle={toggleSuccessPopup}
                title="Thank you for placing your order"
                buttonText1="Continue Shopping"
                onPressButton1={() => {
                    toggleSuccessPopup()
                    navigate(routes.store)
                }}
            />
            <Loaders.SmileAbsolute
                isVisible={loadingPlaceOrder}
            />
        </Wrapper>
    )
}



