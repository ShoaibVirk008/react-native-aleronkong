import React, { useEffect, Component, useState } from 'react';
import { View, Image } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { Headers, Icons, Wrapper, Text, Spacer, Buttons, ScrollViews, Lines, Common, Loaders } from '../../../components';
import { navigate } from '../../../navigation/rootNavigation';
import { DummyData, sizes, colors, appStyles, routes, Api } from '../../../services';
import { setCartDetail, setCurrentUser } from '../../../services/store/actions';

const cartProducts = [
    {
        product: DummyData.products[0],
        color: 'Navy Blue',
        size: 'Small',
        quantity: '1',
    }
]

export default function Index() {
    // const [products, setProducts] = useState(cartProducts)
    const [loadingQuantity, setLoadingQuantity] = useState(false)
    const [loadingRemove, setLoadingRemove] = useState(false)

    //redux
    const app = useSelector(state => state.app)
    const user = useSelector(state => state.user)
    const { cartDetail } = app
    const { currentUser } = user

    const cartItems = cartDetail ? cartDetail?.items || [] : null
    useEffect(() => {
        handleGetCart()
    }, [])
    const handleGetCart = () => {
        Api.getCartDetail()
            .then(res => {
                if (res) {
                    if (res?.data) {
                        setCartDetail(res?.data)
                    } else {
                        setCartDetail({})
                    }
                }
            })
    }
    const handleIncreaseDecreaseQuantity = async ({ item, index, increase, decrease }) => {
        setLoadingQuantity(true)
        const product_id = item.item._id
        await Api.increaseDecreaseCartItemQuantity({
            productId: product_id,
            increase,
            decrease
        }).then(res => {
            if (res) {
                setCartDetail(res.data)
            }
        })
        setLoadingQuantity(false)
    }
    const handleRemoveItem = async ({ item, index }) => {
        setLoadingRemove(true)
        const product_id = item.item._id
        await Api.removeFromCart({
            productId: product_id,
        }).then(res => {
            if (res) {
                setCartDetail(res.data)
                const tempCartItems=res.data.items.length
                setCurrentUser({...currentUser,cartItems:tempCartItems})
            }
        })
        setLoadingRemove(false)
    }
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'Cart'}
                showBackArrow
            />
            {
                cartItems ?
                    cartItems?.length ?
                        <ScrollViews.WithKeyboardAvoidingView
                            footer={
                                <Wrapper marginHorizontalBase marginVerticalBase>
                                    <Buttons.Colored
                                        text={'Proceed to Checkout'}
                                        onPress={() => navigate(routes.checkout)}
                                    />
                                    <Spacer isBasic />
                                </Wrapper>
                            }
                        >
                            <Common.CartProducts
                                data={cartItems}
                                onPressMinus={(item, index) => handleIncreaseDecreaseQuantity({ item, index, decrease: true })}
                                onPressPlus={(item, index) => handleIncreaseDecreaseQuantity({ item, index, increase: true })}
                                onPressRemove={(item, index) => { handleRemoveItem({ item, index }) }}
                            />
                            <Spacer isBasic />
                            <Wrapper marginHorizontalSmall>
                                <Lines.Horizontal />
                            </Wrapper>
                            <Spacer isBasic />
                            <Common.OrderPriceInfo
                                subtotal={cartDetail?.subTotal || 0}
                                tax={cartDetail?.tax || 0}
                                total={cartDetail?.total || 0}
                            />
                        </ScrollViews.WithKeyboardAvoidingView>
                        :
                        <Common.NoDataViewPrimary
                            containerStyle={[appStyles.mainContainer, appStyles.center]}
                            iconName='cart-remove'
                            iconType='material-community'
                            text='Your cart is empty'
                        />
                    :
                    <Loaders.Boxes
                        size={totalSize(8)}
                    />
            }
            <Loaders.BoxesAbsolute
                isVisible={loadingQuantity || loadingRemove}
                backgroundColor={colors.appBgColor1 + '40'}
            />
        </Wrapper>
    )
}

