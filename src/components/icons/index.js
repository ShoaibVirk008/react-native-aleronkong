import React from 'react'
import { View, Image, StyleSheet, ActivityIndicator,TouchableOpacity } from 'react-native'
//import {TouchableOpacity} from 'react-native-gesture-handler'
import { Badge, Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, sizes } from '../../services';
import { Text, Wrapper } from '..';
import { goBack } from '../../navigation/rootNavigation';

export const Back = ({ style, onPress, size, color }) => {
    return (
        <Icon
            name="chevron-left"
            type="feather"
            size={size ? size : totalSize(3)}
            //raised
            // reverse
            // reverseColor={colors.appTextColor6}
            color={color || colors.appTextColor3}
            iconStyle={style}
            onPress={onPress}
        />
    );
}
export const BackFloating = ({ right, onPressBack, shadow }) => {
    return (
        <Wrapper isAbsolute style={{ top: sizes.statusBarHeight + sizes.baseMargin, left: sizes.marginHorizontal, right: sizes.marginHorizontal }}>
            <Wrapper flexDirectionRow justifyContentSpaceBetween>
                <Button
                    iconName="chevron-left"
                    iconType="feather"
                    shadow={shadow}
                    isRound
                    buttonSize={totalSize(3.5)}
                    iconSize={totalSize(3)}
                    iconColor={colors.appTextColor3}
                    onPress={onPressBack || goBack}
                />
                {right}
            </Wrapper>
        </Wrapper>
    )
}
export const Button = ({
    buttonStyle, onPress, shadow, shadowColored, iconSize, iconColor,
    iconName, iconType, buttonColor, buttonSize,
    customIcon, iconStyle, disabled, isRound, showBadge,
    badgeValue,
    //text props
    text, textStyle, textColor, badgeStyle
}) => {
    const defaultButtonsize = totalSize(5)
    const defaulIconSize = iconSize ? iconSize : sizes.icons.large
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={!onPress || disabled}
            style={
                [styles.IconButtonContainer,
                isRound && { borderRadius: 100 },
                {
                    height: buttonSize ? buttonSize : defaultButtonsize,
                    width: buttonSize ? buttonSize : defaultButtonsize,
                    backgroundColor: buttonColor ? buttonColor : colors.appBgColor1
                },
                shadow ? appStyles.shadow : null,
                shadowColored ? appStyles.shadowColored : null,
                    buttonStyle]
            }
        >
            {
                customIcon ?
                    <Custom
                        icon={customIcon}
                        size={defaulIconSize}
                        color={iconColor}
                        containerStyle={iconStyle}
                    />

                    :
                    text ?
                        <Text isRegular isMediumFont style={[{ color: textColor || colors.appColor1 }, textStyle]}>{text}</Text>
                        :
                        <Icon
                            name={iconName ? iconName : "heart"}
                            type={iconType ? iconType : "material-community"}
                            size={defaulIconSize}
                            color={iconColor ? iconColor : colors.appColor1}
                            style={iconStyle}
                        />
            }
            {
                showBadge ?
                    <Wrapper isAbsolute style={{ top: 0, right: 0 }}>
                        <Badge
                            containerStyle={{}}
                            value={badgeValue}
                            badgeStyle={[{ height: defaulIconSize / 2.5, width: defaulIconSize / 2.5, backgroundColor: iconColor || colors.appColor1, borderWidth: 0, borderRadius: 100 }, badgeStyle]}
                        />
                    </Wrapper>
                    :
                    null
            }
        </TouchableOpacity>
    );
}
export const Custom = ({ icon, size, animation, duration, color, onPress, containerStyle,imageStyle }) => {
    const defaulSize = totalSize(5)
    return (
        <Wrapper animation={animation} duration={duration} style={containerStyle}>
            <TouchableOpacity disabled={!onPress} onPress={onPress}>
                <Image
                    source={icon}
                    resizeMode="contain"
                    style={[{ height: size ? size : defaulSize, width: size ? size : defaulSize, tintColor: color },imageStyle]}
                />
            </TouchableOpacity>
        </Wrapper>
    );
}


export const WithText = ({ text, containerStyle, title, customIcon, onPress, tintColor, iconName, iconType, iconSize, textStyle, titleStyle, direction, iconStyle, textContainerStyle }) => {
    return (
        <TouchableOpacity disabled={!onPress} activeOpacity={1} onPress={onPress} style={[{ flexDirection: direction ? direction : 'row', alignItems: 'center', }, containerStyle]}>
            {
                customIcon ?
                    <Custom icon={customIcon} size={iconSize ? iconSize : totalSize(2)} color={tintColor && tintColor} />
                    :
                    <Icon name={iconName ? iconName : 'email'} type={iconType ? iconType : 'material-community'} size={iconSize ? iconSize : totalSize(2)} color={tintColor ? tintColor : colors.appTextColor1} iconStyle={iconStyle} />
            }
            <Wrapper style={[direction === 'column' ? { marginVertical: height(1.5) } : { marginHorizontal: width(2) }, textContainerStyle]}>
                {
                    title ?
                        <Text isRegular isBoldFont style={[{ color: tintColor ? tintColor : colors.appTextColor1, marginBottom: 5 }, titleStyle]}>{title}</Text>
                        :
                        null
                }
                {
                    text ?
                        <Text isSmall style={[{ color: tintColor ? tintColor : colors.appTextColor1, }, textStyle]}>{text}</Text>
                        :
                        null
                }
            </Wrapper>
        </TouchableOpacity>
    );
}
export const DotsVertical = ({ ...props }) => {
    return (
        <Icon
            name='dots-vertical'
            type='material-community'
            size={totalSize(2.5)}
            color={colors.appTextColor4}

            {...props}
        />
    )
}
export const DotsHorizonal = ({ ...props }) => {
    return (
        <Icon
            name='dots-horizontal'
            type='material-community'
            size={totalSize(2.5)}
            color={colors.appTextColor4}

            {...props}
        />
    )
}

const styles = StyleSheet.create({
    IconButtonContainer: {
        height: totalSize(5),
        width: totalSize(5),
        backgroundColor: colors.appColor1,
        borderRadius: sizes.cardRadius,
        ...appStyles.center,
        //  ...appStyles.shadow
    }
})