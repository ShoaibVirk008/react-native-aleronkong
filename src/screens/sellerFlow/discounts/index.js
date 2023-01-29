import React, { Component, useState } from 'react';
import { View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Common, Spacer, Wrapper, Text, Buttons, Icons } from '../../../components';
import { appStyles, colors, DummyData, routes, sizes } from '../../../services';

const topTabs = [{ label: 'All' }, { label: 'Active' }, { label: 'Scheduled' }, { label: 'Expired' }]

const temp_transfers = [
    {
        transfer_number: 'T2123',
        from: 'House 5 Street 30, Islamabad',
        to: 'H # 50, Haider Road, Islamabad, Islamabad',
        reference_no: '01233',
        expected_date: '23/04/2022',
        status: 'completed'
    },
    {
        transfer_number: 'T45623',
        from: 'House 5 Street 30, Islamabad',
        to: 'H # 50, Haider Road, Islamabad, Islamabad',
        reference_no: '01233',
        expected_date: '23/04/2022',
        status: 'pending'
    },
    {
        transfer_number: 'T5532',
        from: 'House 5 Street 30, Islamabad',
        to: 'H # 50, Haider Road, Islamabad, Islamabad',
        reference_no: '01233',
        expected_date: '23/04/2022',
        status: 'partial'
    }
]
const temp_discounts = [
    {
        title: 'EIDSALE',
        validity: '27 Apr - 27 May',
        used: '5 Orders',
        value: '50% off on all products',
        limit: 'One use per customer',
        status: 'active'
    },
    {
        title: 'EIDSALE',
        validity: '27 Apr - 27 May',
        used: '5 Orders',
        value: '50% off on all products',
        limit: 'One use per customer',
        status: 'scheduled'
    },
    {
        title: 'EIDSALE',
        validity: '27 Apr - 27 May',
        used: '5 Orders',
        value: '50% off on all products',
        limit: 'One use per customer',
        status: 'expired'
    }
]
export default function Index({ navigation, route }) {
    const [selectedTopTabIndex, setTopTabIndex] = useState(0)
    const all_transfers = [...temp_transfers, ...temp_transfers, ...temp_transfers]
    const discounts = [...temp_discounts, ...temp_discounts, ...temp_discounts]
    return (
        <Wrapper isMain>
            <Spacer isBasic />
            <Wrapper flexDirectionRow>
                <Wrapper flex={1}>
                    <Common.ButtonsGroupPrimary
                        data={topTabs}
                        initalIndex={selectedTopTabIndex}
                        onPressButton={(item, index) => setTopTabIndex(index)}
                    />
                </Wrapper>
                <Wrapper style={{ marginRight: sizes.marginHorizontal }}>
                    <Common.IconButtonBadge
                        iconName='filter'
                        iconType='feather'
                        onPress={() => { }}
                    />
                </Wrapper>
            </Wrapper>
            <Spacer isBasic />
            <Discounts
                data={discounts}
            />
        </Wrapper>
    )
}

const Discounts = ({ data }) => {
    return (
        <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={() => <Spacer height={sizes.marginVertical} />}
            ListHeaderComponent={() => <Spacer height={sizes.marginVertical / 4} />}
            ItemSeparatorComponent={() => <Spacer height={sizes.marginVertical * 1.25} />}
            renderItem={({ item, index }) => {
                const { title, validity, used, value, limit, status } = item
                return (
                    <Wrapper
                    key={index}
                        animation={index <= 3 && 'fadeInUp'}
                        duration={500 + (index * 100)}
                    >
                        <Transfer
                            title={title}
                            validity={validity}
                            used={used}
                            value={value}
                            limit={limit}
                            status={status}
                        />
                    </Wrapper>
                )
            }}
        />
    )
}

const Transfer = ({ title, validity, used, value, limit, status }) => {
    const status_text = status.slice(0, 1).toUpperCase() + status.slice(1)
    const is_active = status === 'active'
    const is_scheduled = status === 'scheduled'
    const is_expired = status === 'expired'
    const status_bg_color = is_active ? colors.appStatus3 : is_scheduled ? colors.appStatus2 : colors.error + '30'
    return (
        <Common.WrapperColoredBorderedShadow>
            <Wrapper flexDirectionRow justifyContentSpaceBetween>
                <Text isRegular isMediumFont>{title}</Text>
                <Icons.DotsHorizonal/>
            </Wrapper>
            <Spacer isTiny />
            <Common.TitleInfo
                title={'Validity'}
                info={validity}
            />
            <Spacer isSmall />
            <Common.TitleInfo
                title={'Used'}
                info={used}
            />
            <Spacer isSmall />
            <Common.TitleInfo
                title={'Value'}
                info={value}
            />
            <Wrapper flexDirectionRow alignItemsFlexEnd>
                <Wrapper flex={1}>
                    <Common.TitleInfo
                        title={'Limit'}
                        info={limit}
                    />
                </Wrapper>
                <Buttons.ColoredSmallSecondary
                    text={status_text}
                    backgroundColor={status_bg_color}
                />
            </Wrapper>
        </Common.WrapperColoredBorderedShadow>
    )
}