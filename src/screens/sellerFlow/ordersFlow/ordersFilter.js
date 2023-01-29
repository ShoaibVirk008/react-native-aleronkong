import React, { Component, useState } from 'react';
import { Pressable, View, } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { Icon, SearchBar } from 'react-native-elements';
import { Common, Wrapper, Text, Spacer, TextInputs, Lines, Icons, CheckBoxes, ScrollViews, Buttons } from '../../../components';
import { goBack } from '../../../navigation/rootNavigation';
import { appStyles, colors, sizes } from '../../../services';
import Collapsible from 'react-native-collapsible';

const status_options = [{ label: 'Open' }, { label: 'Invoice Sent' }, { label: 'Completed' }]
const updatedat_options = [{ label: 'Today' }, { label: 'Yesterday' }, { label: 'Custom' }]
const createdat_options = [{ label: 'Today' }, { label: 'Yesterday' }, { label: 'Custom' }]
const customers_options = [{ label: 'Zack Will' }, { label: 'Alex Jam' }, { label: 'Tina Shaw' }]

const main_options = [
    {
        label: 'Status',
        is_collapsed: true,
        optoins: status_options
    },
    {
        label: 'Updated at',
        is_collapsed: true,
        optoins: updatedat_options
    },
    {
        label: 'Created at',
        is_collapsed: true,
        optoins: createdat_options
    },
    {
        label: 'Customer',
        is_collapsed: true,
        optoins: customers_options
    }
]
export default function Index() {

    const [filters, setFilters] = useState(main_options)

    const handleFilterOption = (optoin_item, option_item_index, filter_item, filter_item_index) => {
        let tempFilters = filters.slice()
        let tempOptions = filter_item.optoins.slice()
        const tempOption = {
            ...optoin_item,
            is_selected: (optoin_item?.is_selected) ? false : true
        }
        tempOptions[option_item_index] = tempOption
        tempFilters[filter_item_index].optoins = tempOptions
        setFilters(tempFilters)
    }
    const handleFilterCollapse = (item, index) => {
        let tempFilters = filters.slice()
        tempFilters[index].is_collapsed = !tempFilters[index].is_collapsed
        setFilters(tempFilters)
    }
    return (
        <Common.PopupWrappers.Main
            toggle={goBack}
            containerStyle={{ flex: 1, paddingTop: sizes.marginVertical }}
            mainContainerStyle={{ paddingTop: sizes.statusBarHeight * 1.25 }}
        >

            <Wrapper marginHorizontalBase justifyContentCenter>
                <Text alignTextCenter style={[appStyles.headerTitleStyle]}>Filters</Text>
                <Wrapper isAbsolute style={{ right: 0 }}>
                    <Icon
                        name='close'
                        type='font-awesome'
                        size={sizes.icons.medium}
                        color={colors.appTextColor5}
                        onPress={goBack}
                    />
                </Wrapper>
            </Wrapper>
            <Spacer isBasic />
            <TextInputs.SearchBar
                placeholder={'Search Orders'}
                inputContainerStyle={{ backgroundColor: colors.appBgColor2 + '80' }}
            />
            <Spacer isTiny />
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer isTiny />
                {
                    filters.map((filter_item, filter_item_index) => {
                        const { is_collapsed, label, optoins } = filter_item
                        return (
                            <CardCollapsiblePrimary
                            key={index}
                                isCollaped={is_collapsed}
                                title={label}
                                options={optoins}
                                onPressOptionItem={(item, index) => handleFilterOption(item, index, filter_item, filter_item_index)}
                                onPress={() => handleFilterCollapse(filter_item, filter_item_index)}
                                containerStyle={[appStyles.marginVerticalSmall]}
                            />
                        )
                    })
                }
                <Spacer isBasic />
                <Buttons.ColoredSecondary
                    text={'Apply Filters'}
                    onPress={goBack}
                />
            </ScrollViews.WithKeyboardAvoidingView>
        </Common.PopupWrappers.Main>
    )
}

const CardCollapsiblePrimary = ({ isCollaped, onPress, title, options, onPressOptionItem, containerStyle }) => {
    return (

        <Wrapper isColored background1 paddingVerticalZero style={[appStyles.shadowExtraLight, { borderRadius: 5 }, containerStyle]}>
            <Pressable
                onPress={onPress}
            >
                <Wrapper flexDirectionRow justifyContentSpaceBetween alignItemsCenter style={{ paddingVertical: sizes.marginVertical / 1.5 }}>
                    <Text isRegular>{title}</Text>
                    <Icon
                        name={!isCollaped ? 'caretdown' : 'caretup'}
                        type='antdesign'
                        color={colors.appBgColor4}
                        size={sizes.icons.tiny}
                    />
                </Wrapper>
            </Pressable>
            <Collapsible collapsed={isCollaped}>
                <Lines.Horizontal />
                <Spacer height={sizes.marginVertical / 2} />
                {
                    options.map((item, index) => {
                        const is_checked = item.is_selected
                        return (
                            <Wrapper key={index} style={{ marginBottom: sizes.marginVertical / 2 }}>
                                <CheckBoxes.Primary
                                    checked={is_checked}
                                    text={item.label}
                                    onPress={() => onPressOptionItem(item, index)}
                                    uncheckedIconColor={colors.appBgColor3}
                                    uncheckedIconName='checkbox-blank-outline'
                                    checkedIconName={'checkbox-intermediate'}
                                    textStyle={[appStyles.textSmall]}
                                    checkIconsize={sizes.icons.small}
                                />
                            </Wrapper>
                        )
                    })
                }</Collapsible>
        </Wrapper>
    )
}