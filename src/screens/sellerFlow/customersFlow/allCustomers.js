import React, { Component, useRef, useState } from 'react';
import { FlatList, Pressable, View, } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Buttons, Common, Spacer, Wrapper, Text, Lines, Icons } from '../../../components';
import { appStyles, colors, sizes } from '../../../services';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { height, width } from 'react-native-dimension';


const temp_customers = [
    {
        name: 'John Doe',
        spent: '580',
        email: 'john@gmail.com',
        phone: '+123 456 789',
        status: 'active',
        orders: '10',
        type: 'normal'
    },
    {
        name: 'Alex Will',
        spent: '400',
        email: 'john@gmail.com',
        phone: '+123 456 789',
        orders: '12',
        status: 'active',
        type: 'email'
    },
    {
        name: 'Nelson Mandela',
        spent: '0',
        email: 'nelme22@gmail.com',
        phone: '+993 234 23423',
        orders: '',
        status: 'in-active',
        type: 'normal'
    },
]

const checkouts_seller = [
    {
        checkout_no: '234112',
        placed_by: 'Alex Will',
        date: '23/04/22',
        email_status: false,
        recovery_status: false,
        price: '1,120.00'
    },
    {
        checkout_no: '45212',
        placed_by: 'Nelson Mandela',
        date: '11/05/22',
        email_status: false,
        recovery_status: false,
        price: '2,442.00'
    }, {
        checkout_no: '78867',
        placed_by: 'William Joe',
        date: '23/04/22',
        email_status: true,
        recovery_status: true,
        price: '940.00'
    }
]

export default function Index({ route }) {
    const typeIndex = route?.params?.typeIndex || null
    const TypeMenuRef = useRef(null)
    const SortMenuRef = useRef(null)
    const hideTypeMenu = () => TypeMenuRef?.current?.hide()
    const showTypeMenu = () => TypeMenuRef?.current?.show()
    const hideSortMenu = () => SortMenuRef?.current?.hide()
    const showSortMenu = () => SortMenuRef?.current?.show()
    const type_menu_options = ['All Customers', 'Email Subscribers', 'Abandoned Checkouts in last 30 days', 'Customer with multiple purchases', 'Customers with no purchases']
    const sort_menu_options = ['Date created (newest first)', 'Date created (oldest first)', 'Customer last name (Z-A)', 'Customer last name (A-Z)', 'Date edited (newest first)', 'Date edited (oldest first)', 'Date edited (oldest first)']

    const [selectedType, setSelectedType] = useState(type_menu_options[typeIndex||0])
    const customers = [...temp_customers, ...temp_customers, ...temp_customers]
    const checkouts = [...checkouts_seller, ...checkouts_seller, ...checkouts_seller]
    const filteredCustomers = () => {
        let tempData = customers.slice()
        if (selectedType === type_menu_options[1]) {
            tempData = tempData.filter(item => {
                return (
                    item.type === 'email'
                )
            })
        } else if (selectedType === type_menu_options[3]) {
            tempData = tempData.filter(item => {
                return (
                    item.orders
                )
            })
        } else if (selectedType === type_menu_options[4]) {
            tempData = tempData.filter(item => {
                return (
                    !item.orders
                )
            })
        }
        return tempData
    }
    return (
        <Wrapper isMain>
            <Spacer isBasic />
            <Wrapper marginHorizontalBase flexDirectionRow justifyContentSpaceBetween alignItemsCenter>

                <Menu
                    //visible={visible}
                    ref={TypeMenuRef}
                    anchor={
                        <Buttons.ColoredSmall
                            text={selectedType}
                            buttonStyle={[{ borderRadius: 100, backgroundColor: colors.appBgColor2, paddingLeft: sizes.marginHorizontal / 2 }, appStyles.shadowExtraLight, appStyles.paddingVerticalTiny]}
                            textStyle={[appStyles.textSmall, appStyles.textPrimaryColor, appStyles.fontMedium]}
                            iconName='caret-down-sharp'
                            iconType={'ionicon'}
                            iconColor={colors.appTextColor4}
                            direction="row-reverse"
                            onPress={showTypeMenu}
                        />
                    }
                    onRequestClose={hideTypeMenu}
                    style={{ backgroundColor: colors.appBgColor2, borderRadius: sizes.cardRadius }}

                >
                    <Wrapper style={{ width: width(80) }}>
                        {
                            type_menu_options.map((item, index) => {
                                return (
                                    <Pressable
                                    key={index}
                                        onPress={() => {
                                            setSelectedType(item)
                                            hideTypeMenu()
                                        }}

                                    >
                                        {
                                            index != 0 ?
                                                <Lines.Horizontal color={colors.appBgColor3} />
                                                :
                                                null
                                        }
                                        <Wrapper paddingVerticalSmall paddingHorizontalSmall>
                                            <Text isSmall>{item}</Text>
                                        </Wrapper>
                                    </Pressable>
                                )
                            })
                        }
                    </Wrapper>
                </Menu>

                <Menu
                    //visible={visible}
                    ref={SortMenuRef}
                    anchor={
                        <Common.IconButtonBadge
                            iconName='sort-amount-down'
                            iconType='font-awesome-5'
                            buttonStyle={{ backgroundColor: colors.appBgColor2 }}
                            onPress={showSortMenu}
                        />
                    }
                    onRequestClose={hideSortMenu}
                    style={{
                        backgroundColor: colors.appBgColor2,
                        borderRadius: sizes.cardRadius,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        marginTop: height(5)
                    }}

                >
                    <Wrapper style={{}}>
                        {
                            sort_menu_options.map((item, index) => {
                                return (
                                    <Pressable
                                    key={index}
                                        onPress={() => {
                                            //setSelectedType(item)
                                            hideSortMenu()
                                        }}

                                    >
                                        {
                                            index != 0 ?
                                                <Lines.Horizontal color={colors.appBgColor3} />
                                                :
                                                null
                                        }
                                        <Wrapper paddingVerticalSmall paddingHorizontalSmall>
                                            <Text isSmall>{item}</Text>
                                        </Wrapper>
                                    </Pressable>
                                )
                            })
                        }
                    </Wrapper>
                </Menu>
            </Wrapper>
            <Spacer isBasic />
            {
                selectedType != type_menu_options[2] ?
                    <Customers
                        data={filteredCustomers()}
                    />
                    :
                    <Common.CheckoutPrimaryVertical1
                        data={checkouts}
                        onPressDots
                        ListHeaderComponent={() => <Spacer height={sizes.marginVertical / 4} />}
                    />
            }
        </Wrapper>
    )
}

const Customers = ({ data }) => {
    return (
        <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={() => <Spacer height={sizes.marginVertical} />}
            ListHeaderComponent={() => <Spacer height={sizes.marginVertical / 4} />}
            ItemSeparatorComponent={() => <Spacer height={sizes.marginVertical} />}
            renderItem={({ item, index }) => {
                const { name, spent, email, phone, status, orders, type } = item
                return (
                    <Wrapper
                    key={index}
                        animation={index <= 7 && 'fadeInUp'}
                        duration={500 + (index * 100)}
                    >
                        <Customer
                            name={name}
                            spent={spent}
                            email={email}
                            phone={phone}
                            orders={orders}
                            status={status}
                            type={type}
                        />
                    </Wrapper>
                )
            }}
        />
    )
}

const Customer = ({ name, spent, email, phone, status, orders, type }) => {
    const is_active = status === 'active'
    const is_inactive = status === 'in-active'
    const is_email_subscribed = type === 'email'
    const is_normal_user = type === 'normal'
    const status_text = is_normal_user ? status.slice(0, 1).toUpperCase() + status.slice(1) : 'Subscribed'
    const status_bg_color = is_active ? colors.appStatus3 : is_inactive ? colors.error + '40' : colors.appBgColor2
    return (
        <Common.WrapperColoredBorderedShadow>
            <Wrapper flexDirectionRow justifyContentSpaceBetween>
                <Text isRegular isMediumFont>{name}</Text>
                <Icons.DotsVertical
                />
            </Wrapper>
            <Common.TitleInfo
                title={'Spent'}
                info={`$${spent}`}
                infoStyle={[appStyles.textPrimaryColor, appStyles.fontMedium]}
            />
            <Wrapper flexDirectionRow alignItemsFlexEnd>
                <Wrapper flex={1}>
                    {/* <Common.TitleInfo
                        title={email}
                        info={phone}
                    /> */}
                    {
                        is_email_subscribed ?
                            <Common.TitleInfo
                                title={'Orders'}
                                info={orders}
                            />
                            :
                            <Wrapper flexDirectionRow alignItemsCenter>
                                <Text isSmall isTextColor3>{email}</Text>
                                <Lines.Vertical
                                    height={height(1.5)}
                                    color={colors.appTextColor3}
                                    style={[appStyles.marginHorizontalTiny]}
                                />
                                <Text>{phone}</Text>
                            </Wrapper>
                    }
                </Wrapper>
                <Buttons.ColoredSmallSecondary
                    text={status_text}
                    backgroundColor={status_bg_color}
                />
            </Wrapper>
        </Common.WrapperColoredBorderedShadow>
    )
}