import React from 'react'
import { FlatList, Pressable } from "react-native"
import Wrapper from "../wrapper"
import Text from "../text"
import Spacer from "../spacer"
import { TitleInfo } from "../common"
import { appStyles, colors, sizes } from "../../services"
import { Icon } from "react-native-elements"
import { totalSize } from "react-native-dimension"

export const CheckoutPrimary = ({
    checkoutNo, placedBy, date, emailStatus, recoveryStatus, price, isSeller,
    onPress, containerStyle,
    onPressDots
}) => {


    return (
        <Pressable
            onPress={onPress}
        >
            <Wrapper
                isBorderedWrapper
                background1
                style={[{}, appStyles.marginHorizontalZero, appStyles.shadowExtraLight, containerStyle]}
            >
                <Wrapper flexDirectionRow justifyContentSpaceBetween>
                    <Text isRegular isBoldFont>{`#${checkoutNo}`}</Text>
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
                <Spacer isSmall />
                <TitleInfo
                    title={'Placed By'}
                    info={`${placedBy}`}
                //infoStyle={[appStyles.textPrimaryColor, appStyles.fontMedium]}
                />
                <Spacer isSmall />
                <TitleInfo
                    title={'Date'}
                    info={`${date}`}
                //infoStyle={[appStyles.textPrimaryColor, appStyles.fontMedium]}
                />
                <Spacer isSmall />
                <TitleInfo
                    title={'Email Status'}
                    info={emailStatus ? 'Sent' : 'Not Sent'}
                    infoStyle={[appStyles.textTiny, emailStatus ? appStyles.textSuccess : appStyles.textError]}
                />
                <Spacer isSmall />
                <Wrapper flexDirectionRow alignItemsFlexEnd justifyContentSpaceBetween>
                    <TitleInfo
                        title={'Recovery Status'}
                        info={recoveryStatus ? 'Recovered' : 'Not Recovered'}
                        infoStyle={[appStyles.textTiny, recoveryStatus ? appStyles.textSuccess : appStyles.textError]}
                    />
                    <Text isMedium isPrimaryColor isBoldFont>${price}</Text>
                </Wrapper>
            </Wrapper>
        </Pressable>
    )
}
export const CheckoutPrimaryVertical1 = ({ data, onPressItem, isSeller, onPressDots, ...flatListProps }) => {
    return (
        <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => <Spacer height={sizes.marginVertical} />}
            ListFooterComponent={() => <Spacer height={sizes.marginVertical} />}
            ItemSeparatorComponent={() => <Spacer height={sizes.marginVertical / 2} />}
            renderItem={({ item, index }) => {
                const { checkout_no, placed_by, date, email_status, recovery_status, price } = item
                return (
                    <CheckoutPrimary
                        key={index}
                        onPress={onPressItem ? () => onPressItem(item, index) : null}
                        containerStyle={[{}, appStyles.marginHorizontalBase]}
                        checkoutNo={checkout_no}
                        placedBy={placed_by}
                        date={date}
                        emailStatus={email_status}
                        recoveryStatus={recovery_status}
                        onPressDots={onPressDots ? () => onPressDots(item, index) : null}
                        price={price}
                    />
                )
            }}
            {...flatListProps}
        />
    )
}