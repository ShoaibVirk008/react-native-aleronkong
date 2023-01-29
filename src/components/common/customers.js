import React from 'react'
import { Image, Pressable } from 'react-native'
import { FlatList } from 'react-native'
import { height, totalSize, width } from 'react-native-dimension'
import { Icon } from 'react-native-elements'
import { Wrapper, Text, Ratings, Spacer, Images,Buttons, Common,Lines } from '..'
import { appStyles, sizes,colors } from '../../services'

export const CustomerPrimary = ({
    name, spent, email, phoneNumber, status, isSeller,
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
                paddingVerticalSmall
                style={[{}, appStyles.marginHorizontalZero, appStyles.shadowExtraLight, containerStyle]}
            >
                <Wrapper flexDirectionRow justifyContentSpaceBetween>
                    <Text isRegular isBoldFont>{name}</Text>
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
                <Spacer isTiny />
                <Common.TitleInfo
                    title={'Spent'}
                    info={`$${spent}`}
                    infoStyle={[appStyles.textPrimaryColor, appStyles.fontMedium]}
                />
                <Spacer isSmall />
                <Lines.Horizontal />
                <Spacer isSmall />
                <Wrapper flexDirectionRow justifyContentSpaceBetween>
                    <Wrapper flexDirectionRow alignItemsCenter>
                        <Text isSmall isTextColor3>{email}</Text>
                        <Lines.Vertical
                            height={height(1.5)}
                            color={colors.appTextColor3}
                            style={[appStyles.marginHorizontalTiny]}
                        />
                        <Text isSmall isTextColor3>{phoneNumber}</Text>
                    </Wrapper>
                    <Wrapper >
                        <Common.ButtonSmallPrimary
                            text={'Active'}
                            backgroundColor={colors.success + 60}
                        />
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        </Pressable>
    )
}
export const CustomerPrimaryHorizontal1 = ({ data, onPressItem, isSeller, ...flatListProps }) => {
    return (
        <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={() => <Spacer width={sizes.marginHorizontal} />}
            ListHeaderComponent={() => <Spacer width={sizes.marginHorizontal} />}
            ItemSeparatorComponent={() => <Spacer width={sizes.marginHorizontal / 2} />}
            renderItem={({ item, index }) => {
                const { name, spent, email, phone_number, status } = item
                return (
                    <CustomerPrimary
                    key={index}
                        onPress={() => onPressItem(item, index)}
                        containerStyle={[{ width: width(85) }, appStyles.marginVerticalSmall]}
                        name={name}
                        spent={spent}
                        email={email}
                        phoneNumber={phone_number}
                        status={status}
                        isSeller={isSeller}
                    />
                )
            }}
            {...flatListProps}
        />
    )
}
