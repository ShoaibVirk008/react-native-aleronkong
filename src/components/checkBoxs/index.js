import React from 'react'
import { View, Text, Image, StyleSheet, } from 'react-native'
import { colors, sizes, appStyles } from '../../services';
import * as Icons from '../icons';

export const Primary = ({
    textStyle, containerStyle, text, checked,
    onPress, checkedIconName, uncheckedIconName,
    checkIconType, uncheckIconType, checkIconsize,
    checkedIconColor, uncheckedIconColor,
    ...props
}) => {
    const defaultCheckedIconName = checkedIconName ? checkedIconName : 'check-circle'
    const defaultUncheckedIconName = uncheckedIconName ? uncheckedIconName : 'checkbox-blank-circle-outline'
    const defaultcheckIconType = checkIconType ? checkIconType : 'material-community'
    const defaultUncheckIconType = uncheckIconType ? uncheckIconType : 'material-community'
    const defaultCheckIconsize = checkIconsize ? checkIconsize : sizes.icons.medium
    const defaultCheckedIconColor = checkedIconColor ? checkedIconColor : colors.appColor1
    const defaultUncheckedIconColor = uncheckedIconColor ? uncheckedIconColor : colors.appColor1
    return (
        <Icons.WithText
            text={text}
            iconName={checked ? defaultCheckedIconName : defaultUncheckedIconName}
            iconType={checked ? defaultcheckIconType : defaultUncheckIconType}
            iconSize={defaultCheckIconsize}
            tintColor={checked ? defaultCheckedIconColor : defaultUncheckedIconColor}
            onPress={onPress}
            textStyle={[styles.checkboxText, textStyle]}
            containerStyle={containerStyle}
            {...props}
        />
    );
}

export const Secondary = ({ ...props }) => {
    return (
        <Primary
            //checked={true}
            //text={'Fixed Amount'}
            checkedIconName={'radiobox-marked'}
            checkedIconColor={colors.appTextColor1}
            uncheckedIconColor={colors.appTextColor1}
            textStyle={[appStyles.textSmall]}
            //onPress={() => { }}
            {...props}
        />
    )
}
export const Square = ({ ...props }) => {
    return (
        <Primary
            //checked={true}
            //text={'Fixed Amount'}
            uncheckedIconName={'checkbox-blank-outline'}
            checkedIconName={'checkbox-intermediate'}
            checkedIconColor={colors.appTextColor1}
            uncheckedIconColor={colors.appTextColor1}
            textStyle={[appStyles.textSmall]}
            //onPress={() => { }}
            {...props}
        />
    )
}
const styles = StyleSheet.create({
    checkboxText: {
        ...appStyles.textRegular,
        // ...appStyles.textGray
    }
})
