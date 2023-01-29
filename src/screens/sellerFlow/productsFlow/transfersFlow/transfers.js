import React, { Component, useState } from 'react';
import { View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Common, Spacer, Wrapper, Text, Buttons, Icons } from '../../../../components';
import { navigate } from '../../../../navigation/rootNavigation';
import { appStyles, colors, DummyData, routes, sizes } from '../../../../services';

const topTabs = [{ label: 'All' }, { label: 'Pending' }, { label: 'Partial' }, { label: 'Completed' }]

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
export default function Index({ navigation, route }) {
    const [selectedTopTabIndex, setTopTabIndex] = useState(0)
    const all_transfers = [...temp_transfers, ...temp_transfers, ...temp_transfers]
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
            <Transfers
                data={all_transfers}
            />
        </Wrapper>
    )
}

const Transfers = ({ data }) => {
    return (
        <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={() => <Spacer height={sizes.marginVertical} />}
            ListHeaderComponent={() => <Spacer height={sizes.marginVertical / 4} />}
            ItemSeparatorComponent={() => <Spacer height={sizes.marginVertical * 1.25} />}
            renderItem={({ item, index }) => {
                const { transfer_number, to, from, reference_no, expected_date, status } = item
                return (
                    <Wrapper
                    key={index}
                        animation={index <= 3 && 'fadeInUp'}
                        duration={500 + (index * 100)}
                    >
                        <Transfer
                            transfer_number={transfer_number}
                            to={to}
                            from={from}
                            reference_no={reference_no}
                            expected_date={expected_date}
                            status={status}
                        />
                    </Wrapper>
                )
            }}
        />
    )
}

const Transfer = ({ transfer_number, to, from, reference_no, expected_date, status }) => {
    const status_text = status.slice(0, 1).toUpperCase() + status.slice(1)
    const is_completed = status === 'completed'
    const is_pending = status === 'pending'
    const is_partial = status === 'partial'
    const status_bg_color = is_completed ? colors.appStatus3 : is_pending ? colors.appStatus2 : colors.appBgColor2
    return (
        <Common.WrapperColoredBorderedShadow>
            <Wrapper flexDirectionRow justifyContentSpaceBetween>
                <Text isRegular isMediumFont>{transfer_number}</Text>
                <Icons.DotsVertical
                />
            </Wrapper>
            <Spacer isSmall />
            <Common.TitleInfo
                title={'From'}
                info={from}
            />
            <Spacer isSmall />
            <Common.TitleInfo
                title={'TO'}
                info={to}
            />
            <Spacer isSmall />
            <Common.TitleInfo
                title={'Reference no'}
                info={reference_no}
                infoStyle={[appStyles.textPrimaryColor]}
            />
            <Wrapper flexDirectionRow alignItemsFlexEnd>
                <Wrapper flex={1}>
                    <Common.TitleInfo
                        title={'Expected Date'}
                        info={expected_date}
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