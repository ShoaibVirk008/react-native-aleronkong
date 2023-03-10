import React from 'react'
import { View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, fontSize, sizes } from '../../services';
import { Icons, Wrapper, Text } from '..';
import ButtonGroupAnimated from './buttonGroupAnimated'
export const Colored = ({
    text, isLoading, activityColor, animation, onPress, disabled, buttonStyle,
    customIcon, textStyle, iconName, iconType, iconSize, buttonColor, iconStyle,
    tintColor, direction
}) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={isLoading ? true : disabled}>
            <Wrapper animation={animation} style={[appStyles.buttonColord, { borderRadius: sizes.buttonRadius, height: sizes.buttonHeight, backgroundColor: disabled ? colors.appColor1 + '80' : buttonColor ? buttonColor : colors.appColor1 }, buttonStyle]}>
                <Wrapper style={{ flexDirection: direction ? direction : 'row', alignItems: 'center' }}>
                    {
                        customIcon ?
                            <Icons.Custom
                                icon={customIcon}
                                size={iconSize ? iconSize : totalSize(3)}
                                color={tintColor && tintColor}
                                containerStyle={[{ marginRight: sizes.marginHorizontal / 4 }, iconStyle]}

                            />
                            :
                            iconName ?
                                <Icon
                                    name={iconName ? iconName : "email-outline"}
                                    type={iconType ? iconType : "material-community"}
                                    size={iconSize ? iconSize : totalSize(3)}
                                    color={tintColor ? tintColor : colors.appTextColor6}
                                    iconStyle={[{ marginRight: sizes.marginHorizontal / 4 }, iconStyle]}
                                />
                                :
                                null
                    }
                    {
                        isLoading ?
                            <ActivityIndicator
                                color={activityColor ? activityColor : colors.appBgColor1}
                                size={"small"}
                            />
                            :
                            <Text isButtonMedium style={[{ color: tintColor ? tintColor : colors.appTextColor6, }, textStyle]}>{text}</Text>
                    }
                </Wrapper>
            </Wrapper>
        </TouchableOpacity>
    );
}

export const ColoredSmall = ({ text, onPress, buttonStyle, customIcon, direction, textStyle, iconName, iconType, iconSize, iconColor, iconStyle, isLoading }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={!onPress || isLoading}
            style={[{ borderRadius: 15, paddingHorizontal: width(5), paddingVertical: height(1), backgroundColor: colors.appColor1 }, buttonStyle]}>
            {
                !isLoading ?
                    <Wrapper style={{ flexDirection: direction ? direction : 'row', alignItems: 'center' }}>
                        {
                            customIcon ?
                                <Icons.Custom
                                    icon={customIcon}
                                    size={iconSize ? iconSize : totalSize(2)}
                                    color={iconColor ? iconColor : colors.appTextColor6}
                                />
                                :
                                iconName ?
                                    <Icon
                                        name={iconName ? iconName : "email-outline"}
                                        type={iconType ? iconType : "material-community"}
                                        size={iconSize ? iconSize : totalSize(2)}
                                        color={iconColor ? iconColor : colors.appTextColor6}
                                        iconStyle={[{}, iconStyle]}
                                    />
                                    :
                                    null
                        }
                        <Text isButtonRegular style={[{ color: colors.appTextColor6, }, textStyle]}>  {text}  </Text>
                    </Wrapper>
                    :
                    <Wrapper isCenter style={{height:height(2),width:width(10)}}>
                        <ActivityIndicator
                            color={iconColor || colors.appBgColor1}
                            size={totalSize(2)}
                        />
                    </Wrapper>
            }
        </TouchableOpacity>
    );
}

export const Bordered = ({
     text, onPress, buttonStyle, textStyle,
      iconName, customIcon, iconType, iconSize, 
      iconColor, iconStyle, tintColor,isLoading,loaderColor }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[appStyles.buttonBorderd, { borderRadius: sizes.buttonRadius, height: sizes.buttonHeight, borderColor: tintColor ? tintColor : colors.appColor1 }, buttonStyle]}>
            <Wrapper style={{ flexDirection: 'row', alignItems: 'center' }}>
                {
                    customIcon ?
                        <Icons.Custom
                            icon={customIcon}
                            size={iconSize ? iconSize : totalSize(3)}
                            color={iconColor ? iconColor : null}
                            style={[{ marginRight: width(5) }, iconStyle]}
                        />
                        :
                        iconName ?
                            <Icon
                                name={iconName ? iconName : "email-outline"}
                                type={iconType ? iconType : "material-community"}
                                size={iconSize ? iconSize : totalSize(3)}
                                color={iconColor ? iconColor : tintColor ? tintColor : colors.appColor1}
                                iconStyle={[{ marginRight: width(5) }, iconStyle]}

                            />
                            :
                            null
                }
               
                {
                        isLoading ?
                            <ActivityIndicator
                                color={loaderColor ? loaderColor : colors.appColor1}
                                size={"small"}
                            />
                            :
                            <Text isButtonMedium style={[{ color: tintColor ? tintColor : colors.appColor1, }, textStyle]}>{text}</Text>
                    }
            </Wrapper>
        </TouchableOpacity>
    );
}

export const BorderedSmall = ({ text, onPress, buttonStyle, rowReverse, textStyle, iconName, iconType, iconSize, iconColor, iconStyle, tintColor }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[{ borderRadius: 15, paddingHorizontal: width(5), paddingVertical: height(1), borderColor: tintColor ? tintColor : colors.appColor1, borderWidth: 1 }, buttonStyle]}>
            <Wrapper style={{ flexDirection: rowReverse ? 'row-reverse' : 'row', alignItems: 'center' }}>
                {
                    iconName ?
                        <Icon
                            name={iconName ? iconName : "email-outline"}
                            type={iconType ? iconType : "material-community"}
                            size={iconSize ? iconSize : totalSize(2)}
                            color={tintColor ? tintColor : colors.appColor1}
                            iconStyle={[{ marginHorizontal: width(2) }, iconStyle]}
                        />
                        :
                        null
                }
                <Text isButtonRegular style={[{ color: tintColor ? tintColor : colors.appColor1, fontSize: fontSize.regular }, textStyle]}>{text}</Text>
            </Wrapper>
        </TouchableOpacity>
    );
}

export const ColoredSecondary = ({ buttonStyle, textStyle, ...buttonProps }) => {
    return (
        <Colored
            buttonStyle={[{ height: sizes.buttonHeight - height(2), borderRadius: sizes.buttonRadius / 2 }, buttonStyle]}
            textStyle={[appStyles.textSmall, appStyles.textWhite, appStyles.fontBold, textStyle]}
            {...buttonProps}
        />
    )
}
export const BorderedSecondary = ({ buttonStyle, textStyle, ...buttonProps }) => {
    return (
        <Bordered
            buttonStyle={[{ height: sizes.buttonHeight - height(2), borderRadius: sizes.buttonRadius / 2 }, buttonStyle]}
            textStyle={[appStyles.textSmall, appStyles.textPrimaryColor, appStyles.fontMedium, textStyle]}
            {...buttonProps}
        />
    )
}
export const ColoredSmallSecondary = ({ text, textColor, backgroundColor, textStyle, buttonStyle, ...props }) => {
    return (
        <ColoredSmall
            text={text}
            textStyle={[appStyles.textTiny, { color: textColor || colors.appTextColor3 }, textStyle]}
            buttonStyle={[appStyles.paddingVerticalTiny, appStyles.paddingHorizontalTiny, { backgroundColor: backgroundColor || colors.appColor1 }, buttonStyle]}
            {...props}
        />
    )
}

export const BorderedSmallSecondary = ({ text, textColor, borderColor, textStyle, buttonStyle, ...props }) => {
    return (
        <BorderedSmall
            text={text}
            textStyle={[appStyles.textTiny, { color: textColor || colors.appColor1 }, textStyle]}
            buttonStyle={[appStyles.paddingVerticalTiny, appStyles.paddingHorizontalSmall, { borderColor: borderColor || colors.appColor1 }, buttonStyle]}
            {...props}
        />
    )
}


export { ButtonGroupAnimated }