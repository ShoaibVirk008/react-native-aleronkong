import React, { Component, useState } from 'react';
import { View, Image } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Headers, Icons, Wrapper, Text, Spacer, Buttons, ScrollViews, Lines } from '..';
import { DummyData, sizes, colors, appStyles, appImages } from '../../services';


export const CartProducts = ({ data, onPressMinus, onPressPlus, onPressRemove, showQuantity }) => {

    return (
        <Wrapper>
            {
                data.map((item, index) => {
                    const { selectedColor, selectedSize, quantity } = item
                    const product = item.item
                    const { media, title, price } = product
                    const product_image = media?.[0] || appImages.noImageAvailable
                    return (
                        <CartProduct
                            key={index}
                            image={product_image}
                            title={title}
                            color={selectedColor}
                            size={selectedSize}
                            quantity={quantity}
                            price={price}
                            showQuantity={showQuantity}
                            onPressRemove={onPressRemove ? () => onPressRemove(item, index) : null}
                            onPressMinus={onPressMinus ? () => onPressMinus(item, index) : null}
                            onPressPlus={onPressPlus ? () => onPressPlus(item, index) : null}
                            containerStyle={{ marginTop: sizes.marginVertical / 2 }}
                        />
                    )
                })
            }
        </Wrapper>
    )
}

export const CartProduct = ({ image, title, color, size, price, quantity, showQuantity, onPressRemove, onPressMinus, onPressPlus, containerStyle }) => {

    const IconButton = ({ isDisabled, ...props }) => {
        return (
            <Icons.Button
                //iconName={'minus'}
                buttonColor={colors.appColor1}
                isRound
                buttonSize={totalSize(4)}
                iconSize={totalSize(2.5)}
                iconColor={colors.appTextColor6}
                buttonStyle={{ opacity: isDisabled ? 0.5 : 1 }}
                disabled={isDisabled}
                {...props}
            />
        )
    }
    const _quantity = parseInt(quantity)


    return (
        <Wrapper isBorderedWrapper marginHorizontalSmall style={[{ borderColor: colors.appBgColor3 }, containerStyle]}>
            <Wrapper flexDirectionRow alignItemsFlexStart>
                <Wrapper
                    isBorderedWrapper
                    paddingHorizontalTiny
                    paddingVerticalTiny
                    marginHorizontalZero
                    style={{ borderColor: colors.appBgColor3 }}
                >
                    <Icons.Custom
                        icon={{ uri: image }}
                        size={width(20)}
                        imageStyle={{ borderRadius: sizes.buttonRadius }}
                    />
                </Wrapper>
                <Spacer isSmall horizontal />
                <Wrapper
                    flex={1}
                    paddingVerticalTiny
                >
                    <Wrapper flex={4.5} >
                        <Text isTinyTitle isBoldFont>{title}</Text>
                    </Wrapper>
                    <Wrapper flex={5.5} flexDirectionRow >
                        <Wrapper flex={1} >
                            <>
                                <Spacer isSmall />
                                <Text isSmall>Color: {color}</Text>
                            </>
                            <>
                                <Spacer isSmall />
                                <Text isSmall>Size: {size}</Text>
                            </>
                            {
                                showQuantity ?
                                    <>
                                        <Spacer isSmall />
                                        <Text isSmall>Quantity: {quantity}</Text>
                                    </>
                                    :
                                    null
                            }
                        </Wrapper>
                        <Wrapper justifyContentCenter justifyContentFlexend={showQuantity}>
                            <Text isMediumTitle isRegularFont isPrimaryColor>${price}</Text>
                        </Wrapper>
                    </Wrapper>
                </Wrapper>
            </Wrapper>
            {
                onPressRemove || onPressMinus || onPressPlus ?
                    <>
                        <Spacer isBasic />
                        <Wrapper flexDirectionRow justifyContentSpaceBetween alignItemsCenter>
                            {
                                onPressRemove ?
                                    <Buttons.ColoredSmall
                                        text={'Remove'}
                                        buttonStyle={[{ backgroundColor: colors.error + '20', borderRadius: 100, width: width(20) + sizes.marginHorizontal / 2 }, appStyles.paddingHorizontalZero, appStyles.alignItemsCenter]}
                                        textStyle={[appStyles.textSmall, appStyles.textError,]}
                                        onPress={onPressRemove}
                                    />
                                    :
                                    null
                            }
                            <Wrapper flexDirectionRow alignItemsCenter>
                                {
                                    onPressMinus && onPressPlus ?
                                        <>
                                            <IconButton
                                                iconName={'minus'}
                                                onPress={onPressMinus}
                                                isDisabled={_quantity <= 1}
                                            />
                                            <Wrapper paddingHorizontalSmall>
                                                <Text
                                                    isMedium
                                                >{quantity}</Text>
                                            </Wrapper>
                                            <IconButton
                                                iconName={'plus'}
                                                onPress={onPressPlus}
                                                isDisabled={_quantity >= 10}
                                            />
                                        </>
                                        :
                                        null
                                }
                            </Wrapper>
                        </Wrapper>
                    </>
                    :
                    null
            }
        </Wrapper>
    )
}