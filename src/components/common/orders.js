import React from 'react'
import { Image, Pressable } from 'react-native'
import { FlatList } from 'react-native'
import { height, totalSize, width } from 'react-native-dimension'
import { Icon } from 'react-native-elements'
import { Wrapper, Text, Ratings, Spacer, Images, Buttons, Common, Lines, Switches } from '..'
import { appStyles, sizes, colors } from '../../services'

export const OrderPrimary = ({
    orderNo, price, date, items, status,
    isPaid, isFulFilled, isDraft, customerName, isSeller,
    onPress, containerStyle,
    onPressDots, onPressTurnOnToActiveOrder
}) => {


    return (
        <Pressable
            onPress={onPress}
        >
            <Wrapper
                isBorderedWrapper
                background1
                paddingVerticalSmall
                style={[{}, appStyles.marginHorizontalZero, appStyles.shadowExtraLight, containerStyle]}
            >
                <Wrapper flexDirectionRow justifyContentSpaceBetween>
                    <Text isRegular isBoldFont>#{orderNo}</Text>
                    {
                        onPressDots ?
                            <Icon
                                name='dots-horizontal'
                                type='material-community'
                                size={totalSize(2.75)}
                                color={colors.appTextColor4}
                                iconStyle={{ marginTop: -totalSize(0.9) }}
                            />
                            :
                            null
                    }
                </Wrapper>
                {
                    (isSeller && customerName) ?
                        <>
                            <Spacer isTiny />
                            <Common.TitleInfo
                                title={'Customer'}
                                info={customerName}
                            />
                        </>
                        : null
                }
                {
                    date ?
                        <>
                            <Spacer isTiny />
                            <Common.TitleInfo
                                title={'Date'}
                                info={date}
                            />
                        </>
                        : null
                }
                {
                    (!isSeller && items) ?
                        <>
                            <Spacer isSmall />
                            <Common.TitleInfo
                                title={'Items'}
                                info={items}
                            />
                        </>
                        : null
                }

                <Spacer isSmall />
                <Lines.Horizontal />
                <Spacer isSmall />
                <Wrapper flexDirectionRow justifyContentSpaceBetween>
                    <Wrapper flexDirectionRow alignItemsCenter>
                        {
                            (!isSeller && status) ?
                                <Common.OrderStatusButton
                                    status={status}
                                />
                                :
                                null
                        }
                        {
                            (isSeller && isDraft) ?
                                <>
                                    <Common.ButtonSmallPrimary
                                        text={'Draft'}
                                        backgroundColor={colors.appStatus1}
                                    />
                                </>
                                :
                                null
                        }
                        {
                            (isSeller && !isDraft && isPaid) ?
                                <Common.ButtonSmallPrimary
                                    text={'paid'}
                                    backgroundColor={colors.success + 60}
                                />
                                :
                                null
                        }
                        {
                            (isSeller && !isDraft && isFulFilled) ?
                                <>
                                    <Spacer isBasic horizontal />
                                    <Common.ButtonSmallPrimary
                                        text={'Fulfilled'}
                                        backgroundColor={colors.success + 60}
                                    />
                                </>
                                :
                                null
                        }

                    </Wrapper>


                    {
                        isSeller && isDraft ?
                            <Wrapper flexDirectionRow alignItemsCenter>
                                <Text isTiny isLightGray>Turn on to active order</Text>
                                <Spacer isSmall horizontal />
                                <Switches.Primary
                                    value={false}
                                    onPress={onPressTurnOnToActiveOrder}
                                />
                            </Wrapper>
                            :
                            <Text isMedium isBoldFont isPrimaryColor>${price}</Text>
                    }
                </Wrapper>
            </Wrapper>
        </Pressable>
    )
}
export const OrdersPrimaryHorizontal1 = ({ data, onPressItem, isSeller, onPressDots,onPressTurnOnToActiveOrder, ...flatListProps }) => {
    return (
        <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={() => <Spacer width={sizes.marginHorizontal} />}
            ListHeaderComponent={() => <Spacer width={sizes.marginHorizontal} />}
            ItemSeparatorComponent={() => <Spacer width={sizes.marginHorizontal / 2} />}
            renderItem={({ item, index }) => {
                const { order_no, price, date, items, status, is_paid, is_fulfilled, is_draft, customer_name } = item
                return (
                    <OrderPrimary
                    key={index}
                        onPress={() => onPressItem(item, index)}
                        containerStyle={[{ width: width(85) }, appStyles.marginVerticalSmall]}
                        orderNo={order_no}
                        price={price}
                        date={date}
                        items={items}
                        status={status}
                        isPaid={is_paid}
                        isFulFilled={is_fulfilled}
                        isDraft={is_draft}
                        customerName={customer_name}
                        isSeller={isSeller}
                        onPressDots={onPressDots ? () => onPressDots(item, index) : null}
                        onPressTurnOnToActiveOrder={onPressTurnOnToActiveOrder?()=>onPressTurnOnToActiveOrder(item,index):null}
                    />
                )
            }}
            {...flatListProps}
        />
    )
}

export const OrdersPrimaryVertical1 = ({ data, onPressItem, isSeller, onPressDots,onPressTurnOnToActiveOrder, ...flatListProps }) => {
    return (
        <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => <Spacer height={sizes.marginVertical} />}
            // ListHeaderComponent={() => <Spacer height={sizes.marginVertical} />}
            ItemSeparatorComponent={() => <Spacer height={sizes.marginVertical / 2} />}
            renderItem={({ item, index }) => {
                const { order_no, price, date, items, status, is_paid, is_fulfilled, is_draft, customer_name } = item
                return (
                    <OrderPrimary
                    key={index}
                        onPress={() => onPressItem(item, index)}
                        containerStyle={[{}, appStyles.marginHorizontalBase]}
                        orderNo={order_no}
                        price={price}
                        date={date}
                        items={items}
                        status={status}
                        isPaid={is_paid}
                        isFulFilled={is_fulfilled}
                        isDraft={is_draft}
                        customerName={customer_name}
                        isSeller={isSeller}
                        onPressDots={onPressDots ? () => onPressDots(item, index) : null}
                        onPressTurnOnToActiveOrder={onPressTurnOnToActiveOrder?()=>onPressTurnOnToActiveOrder(item,index):null}
                    />
                )
            }}
            {...flatListProps}
        />
    )
}
