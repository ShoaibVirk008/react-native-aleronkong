import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Buttons, Headers, Images, Spacer, Wrapper, Text, ScrollViews, Modals, Common } from '../../components';
import { appImages, appStyles, routes } from '../../services';


export const SupportsPrimary = ({ data, onPressSupport, onPressEdit, onPressJoin, type }) => {
    const isGuild = type === 'guild'
    return (
        <Wrapper>
            {
                data.map((item, index) => {
                    const { title, media, image, price, description } = item
                    const interval = 'PER MONTH'
                    //const package_image = isGuild ? image || appImages.noImageAvailable : media || appImages.noImageAvailable
                    const package_image = media || appImages.noImageAvailable
                    return (
                        <SupportPrimary
                            key={index}
                            title={title}
                            image={package_image}
                            amount={price}
                            interval={interval}
                            description={description}
                            onPressJoin={onPressJoin ? () => onPressJoin(item, index) : null}
                            onPressEdit={onPressEdit ? () => onPressEdit(item, index) : null}
                            onPressSupport={onPressSupport ? () => onPressSupport(item, index) : null}
                            animation={index <= 5 && 'fadeInUp'}
                            duration={500 + (index * 100)}
                        />
                    )
                })
            }
        </Wrapper>
    )
}

export const SupportPrimary = ({ index, title, image, amount, interval, description, onPressSupport, onPressEdit, onPressJoin, descriptionStyle, ...props }) => {
    return (
        <Wrapper
            isColored
            background1
            marginVerticalTiny
            {...props}
        //style={[appStyles.shadowExtraLight]}
        >
            <Wrapper flexDirectionRow>
                <Images.SqareRound
                    size={width(22.5)}
                    source={{ uri: image }}
                />
                <Wrapper flex={1} justifyContentSpaceBetween paddingVerticalTiny paddingHorizontalSmall>
                    <Text isSmall isBoldFont>{title}</Text>
                    <Text isLargeTitle isPrimaryColor>${amount}</Text>
                    <Text isXTiny isLightGray>{interval}</Text>
                </Wrapper>
                <Wrapper justifyContentCenter>
                    {
                        onPressSupport ?
                            <Buttons.ColoredSmall
                                text={'Support'}
                                onPress={onPressSupport}
                                buttonStyle={[appStyles.paddingHorizontalSmall, { borderRadius: 100 }]}
                                textStyle={[appStyles.textRegular, appStyles.fontBold, appStyles.textWhite]}
                            />
                            : onPressEdit ?
                                <Buttons.ColoredSmall
                                    text={'Edit'}
                                    onPress={onPressEdit}
                                    buttonStyle={[appStyles.paddingHorizontalSmall, { borderRadius: 100 }]}
                                    textStyle={[appStyles.textRegular, appStyles.fontBold, appStyles.textWhite]}
                                />
                                : onPressJoin ?
                                    <Buttons.ColoredSmall
                                        text={'Join'}
                                        onPress={onPressJoin}
                                        buttonStyle={[appStyles.paddingHorizontalSmall, { borderRadius: 100 }]}
                                        textStyle={[appStyles.textRegular, appStyles.fontBold, appStyles.textWhite]}
                                    />
                                    :
                                    null
                    }
                </Wrapper>
            </Wrapper>
            <Spacer isSmall />
            <Text isRegular isTextColor2 style={descriptionStyle}>{description}</Text>
        </Wrapper>
    )
}