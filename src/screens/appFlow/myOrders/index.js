import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import React, { Component, useCallback, useEffect, useState } from 'react';
import { Pressable, View, } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Buttons, Common, Headers, ScrollViews, Spacer, Wrapper, Text, Lines, Loaders } from '../../../components';
import { navigate } from '../../../navigation/rootNavigation';
import { Api, appStyles, colors, Hooks, order_statuses, routes, sizes } from '../../../services';

const topTabs = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: order_statuses.pending, },
    { label: 'Active', value: order_statuses.active, },
    { label: 'Delivered', value: order_statuses.delivered, },
    { label: 'Cancelled', value: order_statuses.cancelled, },
    { label: 'Completed', value: order_statuses.completed, }
]

const dummyOrders = [
    {
        order_no: '568',
        date: '23/04/2022',
        items: '3',
        status: order_statuses.pending,
        price: '1,120.00'
    },
    {
        order_no: '459',
        date: '23/04/2022',
        items: '5',
        status: order_statuses.delivered,
        price: '355.00'
    },
    {
        order_no: '775',
        date: '23/04/2022',
        items: '2',
        status: order_statuses.cancelled,
        price: '2,430.00'
    }
]
export default function Index() {
    const [selectedTopTabIndex, setTopTabIndex] = useState(0)
    const [orders, setOrders] = useState([...dummyOrders.slice(), ...dummyOrders.slice()])
    const [allOrders, setAllOrders] = useState(null)


    // useEffect(() => {
    //     handleGetAllOrders()
    // }, [])
    useFocusEffect(useCallback(() => {
        handleGetAllOrders()
    }, []))

    const handleGetAllOrders = () => {
        Api.getAllOrders()
            .then(res => {
                if (res) {
                    setAllOrders(res.data)
                }
            })
    }
    const getFilteredOrders = () => {
        let tempOrders = allOrders?.slice()
        if (selectedTopTabIndex > 0) {
            const currentStatus = topTabs[selectedTopTabIndex].value
            tempOrders = allOrders.filter(item=>item.status===currentStatus)
        }
        return tempOrders
    }
    const filteredOrders = getFilteredOrders()
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'My Orders'}
                showBackArrow
            />
            {
                allOrders ?
                    allOrders?.length ?
                        <>
                            <Spacer isBasic />
                            <Wrapper flexDirectionRow >
                                <Wrapper flex={1}>
                                    <Common.ButtonsGroupPrimary
                                        data={topTabs}
                                        initalIndex={selectedTopTabIndex}
                                        onPressButton={(item, index) => setTopTabIndex(index)}
                                    />
                                </Wrapper>
                            </Wrapper>
                            <Spacer isSmall />
                            <ScrollViews.WithKeyboardAvoidingView>
                                <Orders
                                    data={filteredOrders}
                                    onPress={(item, index) => navigate(routes.myOrderDetail, { data: item })}
                                />
                                <Spacer isBasic />
                            </ScrollViews.WithKeyboardAvoidingView>
                        </>

                        :
                        <Common.NoDataViewPrimary
                            containerStyle={[appStyles.mainContainer, appStyles.center]}
                            iconName='cart-variant'
                            iconType='material-community'
                            text='No orders yet'
                        />
                    :
                    <Loaders.Boxes
                        size={totalSize(8)}
                    />
            }

        </Wrapper>
    )
}

const Orders = ({ data, onPress }) => {
    return (
        <>
            {
                data.map((item, index) => {
                    const { orderNumber,  createdAt, quantity, status,product } = item
                    const order_number = index + 1
                    const date = moment(createdAt).format('DD/MM/YYYY')
                    const totalPrice=quantity*product?.price
                    return (
                        <Pressable
                        key={index}
                            onPress={() => onPress(item, index)}
                        >
                            <Wrapper
                                isColored
                                background1
                                paddingVerticalSmall
                                style={[{ borderWidth: 1, borderColor: colors.appBgColor3 }, appStyles.marginVerticalSmall, appStyles.shadowExtraLight]}
                            >
                                <Text isRegular isBoldFont>#{orderNumber || order_number}</Text>
                                <Spacer isTiny />
                                <Text isSmall isLightGray>Date: <Text isSmall>{date}</Text></Text>
                                <Spacer isSmall />
                                <Text isSmall isLightGray>Quantity: <Text isSmall>{quantity}</Text></Text>
                                <Spacer isSmall />
                                <Lines.Horizontal />
                                <Spacer isSmall />
                                <Wrapper flexDirectionRow justifyContentSpaceBetween>
                                    <Common.OrderStatusButton
                                        status={status}
                                    />
                                    <Text isMedium isBoldFont isPrimaryColor>${totalPrice || 0}</Text>
                                </Wrapper>
                            </Wrapper>
                        </Pressable>
                    )
                })
            }
        </>
    )
}