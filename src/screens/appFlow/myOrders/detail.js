import React, { Component, useEffect, useState } from 'react';
import { View, Image, Pressable } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Headers, Icons, Wrapper, Text, Spacer, Buttons, ScrollViews, Lines, Common, Modals, Loaders } from '../../../components';
import { navigate } from '../../../navigation/rootNavigation';
import { DummyData, sizes, colors, appStyles, routes, Hooks, Api, order_statuses } from '../../../services';

const order_products = [
    {
        product: DummyData.products[0],
        color: 'Navy Blue',
        size: 'Small',
        quantity: '1',
    }
]

export default function Index({ route }) {
    const order_data = route?.params?.data




    const {
        isModalVisible, toggleModal,
        isModal2Visible, toggleModal2
    } = Hooks.UseModal()
    const [products, setProducts] = useState(order_products)
    const [orderDetail, setOrderDetail] = useState(null)
    const [loadingUpdateStatus, setLoadingUpdateStatus] = useState(false)
    const orderStatus = orderDetail?.status || ''
    //const orderStatus = order_statuses.completed
    const { is_pending_order, is_active_order, is_cancelRequested_order, is_cancelled_order, is_delivered_order, is_completed_order } = Hooks.UseHelp({ order_status: orderStatus })
    const orderProducts = orderDetail ? [
        {
            item: orderDetail.product,
            quantity: orderDetail?.quantity,
            selectedColor: orderDetail?.selectedColor,
            selectedSize: orderDetail?.selectedSize
        }
    ]
        : null

    const orderCardNumber = orderDetail?.paymentMethod?.card?.last4 ? '**** **** **** ' + orderDetail?.paymentMethod?.card?.last4 : 'Not Selected'
    const orderAddress = orderDetail?.address ?
        orderDetail?.address?.line1 + ', ' + orderDetail?.address?.line2 + ', ' + orderDetail?.address?.city :
        'Not selected'

    useEffect(() => {
        handleGetOrderDetail()
    }, [])

    const handleGetOrderDetail = () => {
        Api.getOrderDetail({ orderId: order_data?._id })
            .then(res => {
                if (res) {
                    setOrderDetail(res.data)
                }
            })
    }


    const handleUpdateOrderStatus = async ({ status }) => {
        setLoadingUpdateStatus(true)
        await Api.updateOrder({ orderId: order_data?._id, status })
            .then(res => {
                if (res) {
                    const newOrderDetail = { ...orderDetail, status }
                    setOrderDetail(newOrderDetail)
                }
            })
        setLoadingUpdateStatus(false)
    }


    if (!orderDetail) {
        return (
            <Loaders.Boxes
                size={totalSize(8)}
            />
        )
    }
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={`Order #${orderDetail.orderNumber || 0}`}
                showBackArrow
                right={
                    <Wrapper style={{ marginRight: sizes.marginHorizontal / 1.5 }}>
                        <Common.OrderStatusButton
                            status={orderStatus}
                        />
                    </Wrapper>
                }
                rightContainerStyle={{ flex: 0 }}
            />
            <ScrollViews.WithKeyboardAvoidingView
                footer={
                    is_pending_order || is_active_order ?
                        <Wrapper marginHorizontalBase marginVerticalBase>
                            <Buttons.Bordered
                                text={'Cancel Order'}
                                onPress={toggleModal}
                                tintColor={colors.error}

                            />
                            <Spacer isBasic />
                        </Wrapper>
                        :
                        is_cancelRequested_order ?
                            <Wrapper marginHorizontalBase marginVerticalBase>
                                <Buttons.Bordered
                                    text={'Remove Cancel Request'}
                                    onPress={() => handleUpdateOrderStatus({ status: order_statuses.active })}
                                    tintColor={colors.appTextColor5}
                                />
                                <Spacer isBasic />
                            </Wrapper>
                            :
                            is_delivered_order ?
                                <Wrapper marginHorizontalBase marginVerticalBase>
                                    <Buttons.Colored
                                        text={'Order Received'}
                                        onPress={toggleModal2}
                                    // tintColor={colors.success}

                                    />
                                    <Spacer isBasic />
                                </Wrapper>
                                :
                               ( is_completed_order && !orderDetail?.review) ?
                                    <Wrapper marginHorizontalBase marginVerticalBase>
                                        <Buttons.Bordered
                                            text={'Wrtie a Review'}
                                            onPress={() => navigate(routes.writeReview, { orderData: orderDetail })}
                                        //tintColor={colors.success}
                                        />
                                        <Spacer isBasic />
                                    </Wrapper>
                                    :
                                    null
                }
            >
                {
                    orderProducts ?
                        <Common.CartProducts
                            data={orderProducts}
                            showQuantity
                        />
                        :
                        null
                }
                <Spacer isBasic />
                <Lines.Horizontal style={[appStyles.marginHorizontalSmall]} />
                <Spacer isBasic />
                <Common.OrderPriceInfo
                    subtotal={orderDetail?.subTotal}
                    tax={orderDetail?.tax}
                    total={orderDetail?.total}
                />
                <Spacer isBasic />
                <Lines.Horizontal style={[appStyles.marginHorizontalSmall]} />
                <Spacer isBasic />
                <Common.ButtonTitleInfo
                    title={'Delivery Address'}
                    info={orderAddress}
                    //rightText='Change'
                    //onPress={() => navigate(routes.deliveryAddresses,{change:true})}
                    containerStyle={{ backgroundColor: colors.appBgColor3 }}

                />
                <Spacer isBasic />
                <Common.ButtonTitleInfo
                    title={'Payment Method'}
                    info={orderCardNumber}
                    // rightText='Change'
                    // onPress={() => navigate(routes.paymentMethods,{change:true})}
                    containerStyle={{ backgroundColor: colors.appBgColor3 }}
                />
                <Spacer isBasic />
            </ScrollViews.WithKeyboardAvoidingView>

            <Modals.PopupPrimary
                visible={isModalVisible}
                toggle={toggleModal}
                topMargin={height(60)}
                title={`Are you sure you want to cancel this order?`}
                info={'A cancel request will be sent to seller, once he will accept your cancel request then your order will be cancelled'}
                titleStyle={[appStyles.h6]}
                onPressButton1={toggleModal}
                onPressButton2={() => {
                    toggleModal()
                    handleUpdateOrderStatus({ status: order_statuses.cancelRequested })
                }}
                buttonText1='No'
                buttonText2='Yes'
            />
            <Modals.PopupPrimary
                visible={isModal2Visible}
                toggle={toggleModal2}
                topMargin={height(65)}
                title={`Have you received this order?`}
                info={'After confirming this order will be marked as completed'}
                titleStyle={[appStyles.h6]}
                onPressButton1={toggleModal2}
                onPressButton2={() => {
                    toggleModal2()
                    handleUpdateOrderStatus({ status: order_statuses.completed })
                }}
                buttonText1='No'
                buttonText2='Yes'
            />
            <Loaders.BoxesAbsolute
                isVisible={loadingUpdateStatus}
                backgroundColor={colors.appBgColor1 + '60'}
            />
        </Wrapper >
    )
}



