import React, { Component, useState } from 'react';
import { View } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { Icon, SearchBar } from 'react-native-elements';
import { Spacer, Wrapper, Text, Common, Icons, Lines, Images, ScrollViews } from '../../../components';
import { appImages, appStyles, colors, sizes } from '../../../services';

const temp_inventories = [
    {
        image: appImages.product3,
        label: 'Short Sleeves T-Shirt',
        in_comming: '04',
        commited: '10',
        available: '4',
    },
    {
        image: appImages.product4,
        label: 'Casual Shoes',
        in_comming: '06',
        commited: '12',
        available: '8',
    },
    {
        image: appImages.product5,
        label: 'Maske Jungle Style',
        in_comming: '03',
        commited: '15',
        available: '9',
    }
]
export default function Index() {
    const [isAllSelected, setAllSelected] = useState(false)
    const [inventories, setInventories] = useState([...temp_inventories,...temp_inventories,...temp_inventories,...temp_inventories,...temp_inventories,...temp_inventories])
    return (
        <Wrapper isMain>
            <Spacer isBasic />
            <Wrapper marginHorizontalBase flexDirectionRow alignItemsCenter>
                <Wrapper flex={1}>
                    <Text isRegular>Products Inventory</Text>
                </Wrapper>
                <Wrapper flexDirectionRow>
                    <Common.IconButtonBadge
                        iconName='filter'
                        iconType='feather'
                        buttonColor={colors.appBgColor2}
                    />
                    <Spacer isSmall horizontal />
                    <Common.IconButtonBadge
                        iconName='sort-amount-down'
                        iconType='font-awesome-5'
                        buttonColor={colors.appBgColor2}
                    />
                </Wrapper>
            </Wrapper>
            <Spacer isSmall />
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer isSmall />
                <Inventories
                    data={inventories}
                    isAllSelected={isAllSelected}
                />
                 <Spacer isBasic />
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}

const Inventories = ({ data, isAllSelected }) => {
    const CheckBox = ({ isChecked }) => {
        return (
            <Icons.Button
                iconName={'check'}
                buttonStyle={{ borderWidth: !isChecked ? 1 : 0, borderColor: colors.appTextColor3, borderRadius: 3 }}
                iconColor={colors.appBgColor1}
                buttonColor={!isChecked ? colors.appBgColor1 : colors.appColor1}
                buttonSize={totalSize(1)}
                iconSize={totalSize(0.75)}
            />
        )
    }
    return (
        <Wrapper isColored background1 paddingHorizontalSmall paddingVerticalZero style={[appStyles.shadowExtraLight, { borderRadius: sizes.cardRadius / 2 }]}>
            <Wrapper flexDirectionRow alignItemsCenter marginVerticalSmall>
                <Wrapper flex={4} flexDirectionRow alignItemsCenter>
                    <CheckBox
                        isChecked={false}
                    />
                    <Spacer isTiny horizontal />
                    <Wrapper flex={1}>
                        <Text isXTiny isLightGray>Select All</Text>
                    </Wrapper>
                </Wrapper>
                <Wrapper flex={2}>
                    <Text isXTiny isTextColor3 isMediumFont alignTextCenter>Incomming</Text>
                </Wrapper>
                <Wrapper flex={2}>
                    <Text isXTiny isTextColor3 isMediumFont alignTextCenter>Commited</Text>
                </Wrapper>
                <Wrapper flex={2}>
                    <Text isXTiny isTextColor3 isMediumFont alignTextCenter>Available</Text>
                </Wrapper>
            </Wrapper>
            <Lines.Horizontal />
            {
                data.map((item, index) => {
                    const { image, label, in_comming, commited, available } = item
                    return (
                        <Wrapper key={index} flexDirectionRow alignItemsCenter paddingVerticalTiny>
                            <Wrapper flex={4} flexDirectionRow alignItemsCenter>
                                <CheckBox
                                    isChecked={false}
                                />
                                <Spacer isTiny horizontal />
                                <Wrapper flex={1} flexDirectionRow alignItemsCenter>
                                    <Images.SqareRound
                                        source={{ uri: image }}
                                        size={totalSize(3.75)}
                                        style={{ borderRadius: sizes.cardRadius / 2 }}
                                    />
                                    <Spacer isTiny horizontal />
                                    <Wrapper flex={1}>
                                        <Text isTiny isGray numberOfLines={2}>{label}</Text>
                                    </Wrapper>
                                </Wrapper>
                            </Wrapper>
                            <Wrapper flex={2}>
                                <Text isTiny isGray alignTextCenter>{in_comming}</Text>
                            </Wrapper>
                            <Wrapper flex={2}>
                                <Text isTiny isGray alignTextCenter>{commited}</Text>
                            </Wrapper>
                            <Wrapper flex={2}>
                                <Wrapper alignItemsCenter>
                                    <Icon
                                        name='caret-up-sharp'
                                        type='ionicon'
                                        color={colors.appTextColor5}
                                        size={totalSize(1.5)}
                                    />
                                    <Text isXTiny isGray alignTextCenter lineHeight={totalSize(1)}>{available}</Text>
                                    <Icon
                                        name='caret-down-sharp'
                                        type='ionicon'
                                        color={colors.appTextColor5}
                                        size={totalSize(1.5)}
                                    />
                                </Wrapper>
                            </Wrapper>
                        </Wrapper>
                    )
                })
            }
        </Wrapper>
    )
}