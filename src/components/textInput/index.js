import React, { useState } from 'react'
import { View, Image, StyleSheet, ActivityIndicator,TouchableOpacity, TextInput, Animated, Platform } from 'react-native'
//import {TouchableOpacity} from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, sizes, fontSize } from '../../services';
import { Icons, Wrapper, Text, Spacer } from '..';
const Colored = ({
    iconNameRight, inputRef, iconTypeRight, returnKeyLabel,
    returnKeyType, onSubmitEditing, onPress,
    maxLength, autoFocus, title, isButton,
    duration, titleStyle, placeholder, editable,
    animation, multiline, onFocus, onBlur,
    onChangeText, secureTextEntry, value,
    iconColorRight, iconSizeRight, containerStyle,
    inputContainerStyle, onPressIconRight, inputStyle,
    right, keyboardType, iconStyleRight, error,
    left, customIconLeft, iconNameLeft, iconTypeLeft, iconSizeLeft,
    iconColorLeft, iconStyleLeft, onPressIconLeft, iconContainerStyle, placeholderTextColor, inputTextStyle
}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            disabled={!onPress}
            style={[{ marginHorizontal: sizes.marginHorizontal }, containerStyle]}>
            {
                title ?
                    <Wrapper style={{ marginHorizontal: 0 }}>
                        <Text isInput style={[{}, titleStyle]}>{title}</Text>
                        <Spacer isTiny />
                    </Wrapper>
                    :
                    null
            }
            <Wrapper style={[appStyles.inputContainerColored, {
                borderRadius: sizes.inputRadius,
                backgroundColor: colors.appBgColor2,
                marginHorizontal: 0
            }, inputContainerStyle]}>
                {
                    left ?
                        left
                        :
                        customIconLeft ?
                            <Wrapper style={[{ alignItems: 'center', marginLeft: sizes.marginHorizontal }, iconContainerStyle]}>
                                <Icons.Custom icon={customIconLeft} size={iconSizeLeft ? iconSizeLeft : sizes.icons.medium} color={iconColorLeft ? iconColorLeft : colors.appTextColor1} containerStyle={iconStyleLeft} />
                            </Wrapper>
                            :
                            iconNameLeft ?
                                <Wrapper style={[{ alignItems: 'center', marginLeft: sizes.marginHorizontal }, iconContainerStyle]}>
                                    <Icon name={iconNameLeft} type={iconTypeLeft} size={iconSizeLeft ? iconSizeLeft : sizes.icons.medium} color={iconColorLeft ? iconColorLeft : colors.appTextColor4} iconStyle={iconStyleLeft} onPress={onPressIconLeft} />
                                </Wrapper>
                                :
                                null
                }
                <View style={{ flex: 1 }}>
                    {
                        onPress ?
                            <Wrapper paddingHorizontalBase style={[{ height: sizes.inputHeight, justifyContent: 'center', }, inputStyle]}>
                                <Text isMedium style={[value ? null : appStyles.textGray, { color: placeholderTextColor || colors.appTextColor4 }, inputTextStyle]}>{value ? value : placeholder}</Text>
                            </Wrapper>
                            :
                            <TextInput
                                ref={inputRef}
                                onChangeText={onChangeText}
                                value={value}
                                placeholder={placeholder}
                                editable={editable}
                                autoFocus={autoFocus}
                                returnKeyLabel={returnKeyLabel}
                                returnKeyType={returnKeyType}
                                onSubmitEditing={onSubmitEditing}
                                multiline={multiline}
                                placeholderTextColor={placeholderTextColor || colors.appTextColor4}
                                keyboardType={keyboardType}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                secureTextEntry={secureTextEntry}
                                maxLength={maxLength}
                                style={[appStyles.inputField, { width: null, height: sizes.inputHeight, paddingHorizontal: sizes.marginHorizontal }, inputStyle]}
                            />
                    }
                </View>
                <View style={{}}>
                    {
                        right ?
                            right
                            :
                            iconNameRight ?
                                <Wrapper style={{ alignItems: 'center', marginRight: sizes.marginHorizontal }}>
                                    <Icon name={iconNameRight} type={iconTypeRight} size={iconSizeRight ? iconSizeRight : sizes.icons.medium} color={iconColorRight ? iconColorRight : colors.appTextColor5} iconStyle={iconStyleRight} onPress={onPressIconRight} />
                                </Wrapper>
                                :
                                null
                    }
                </View>
            </Wrapper>
            {
                error ?
                    <Wrapper animation="shake">
                        <Spacer isTiny />
                        <Text isSmall style={[{ color: colors.error, }]}>{error}</Text>
                    </Wrapper>
                    :
                    null
            }
        </TouchableOpacity>
    );
}
const Bordered = ({
    onPress, iconContainerStyle, autoFocus,
    //right params
    right, iconNameRight, iconTypeRight, iconSizeRight, iconColorRight, iconStyleRight, onPressIconRight,
    //left params
    left, customIconLeft, iconNameLeft, iconTypeLeft, iconColorLeft, iconSizeLeft, iconStyleLeft, onPressIconLeft,
    //input params
    placeholder, placeholderTextColor, onFocus, onChangeText, secureTextEntry, value, containerStyle, inputStyle,
    multiline
}) => {
    return (
        <TouchableOpacity
            disabled={!onPress}
            onPress={onPress}
            activeOpacity={1}
            style={[appStyles.inputContainerBorderd, {
                borderRadius: sizes.inputRadius,
                borderWidth: 1,
                borderColor: colors.appBgColor3
            }, containerStyle]}>
            {
                left ?
                    left
                    :
                    customIconLeft ?
                        <Wrapper style={[{ alignItems: 'center', marginLeft: sizes.marginHorizontal }, iconContainerStyle]}>
                            <Icons.Custom icon={customIconLeft} size={iconSizeLeft ? iconSizeLeft : sizes.icons.medium} color={iconColorLeft ? iconColorLeft : colors.appTextColor1} containerStyle={iconStyleLeft} />
                        </Wrapper>
                        :
                        iconNameLeft ?
                            <Wrapper style={[{ alignItems: 'center', marginLeft: sizes.marginHorizontal }, iconContainerStyle]}>
                                <Icon name={iconNameLeft} type={iconTypeLeft} size={iconSizeLeft ? iconSizeLeft : sizes.icons.medium} color={iconColorLeft ? iconColorLeft : colors.appBgColor3} iconStyle={iconStyleLeft} onPress={onPressIconLeft} />
                            </Wrapper>
                            :
                            null
            }
            <View style={{ flex: 1 }}>
                {
                    onPress ?
                        <Wrapper marginHorizontalBase style={[{ height: sizes.inputHeight, justifyContent: 'center', }, inputStyle]}>
                            <Text isMedium style={value ? null : appStyles.textLightGray}>{value ? value : placeholder}</Text>
                        </Wrapper>
                        :
                        <TextInput
                            onChangeText={onChangeText}
                            value={value}
                            placeholder={placeholder}
                            onFocus={onFocus}
                            autoFocus={autoFocus}
                            multiline={multiline}
                            placeholderTextColor={placeholderTextColor ? placeholderTextColor : colors.appTextColor5}
                            secureTextEntry={secureTextEntry}
                            style={[appStyles.inputField, { width: null, height: sizes.inputHeight, paddingHorizontal: sizes.marginHorizontal / 2 }, inputStyle]}
                        />
                }
            </View>
            <View style={{}}>
                {
                    right ?
                        right
                        :
                        iconNameRight ?
                            <Wrapper style={{ alignItems: 'center', marginRight: sizes.marginHorizontal }}>
                                <Icon name={iconNameRight} type={iconTypeRight} size={iconSizeRight ? iconSizeRight : sizes.icons.medium} color={iconColorRight ? iconColorRight : colors.appTextColor5} iconStyle={iconStyleRight} onPress={onPressIconRight} />
                            </Wrapper>
                            :
                            null
                }
            </View>
        </TouchableOpacity>
    );
}
const Underlined = ({
    onPress, inputRef, autoFocus, left, keyboardType, right, error,
    editable, titleStyle, title, maxLength, customIconLeft,
    iconNameLeft, multiline, iconNameRight, placeholderTextColor,
    iconTypeLeft, iconTypeRight, iconSizeLeft, iconSizeRight,
    iconColorLeft, iconColorRight, iconStyleLeft, iconStyleRight,
    onPressIconLeft, onPressIconRight, placeholder, onFocus, onBlur,
    onChangeText, secureTextEntry, value, containerStyle, inputContainerStyle,
    inputStyle, titleStatic, autoCapitalize, children, inputBorderStyle,
    invertColors, isTitleSolidColor,iconContainerRightStyle,inputTextStyle
}) => {

    const [titleMarginBottom] = useState(new Animated.Value(0))
    //const [titleSize] = useState(new Animated.Value(fontSize.regular))
    const FocusedTitleMarginBottom = Platform.OS === 'ios' ? height(5) : height(5)
    //const [titleMarginBottom, setTitleMarginBottom] = useState(0)
    //const [titleSize, setTitleSize] = useState(fontSize.input)
    const moveTitleUp = () => {
        Animated.timing(titleMarginBottom, {
            toValue: height(5),
            duration: 250,
            speed: 50,
            useNativeDriver: false
        }).start();
        // Animated.spring(titleSize, {
        //     toValue: fontSize.small,
        //     duration: 250,
        //    // useNativeDriver: true
        // }).start();
    };
    const moveTitleDown = () => {
        Animated.timing(titleMarginBottom, {
            toValue: 0,
            duration: 250,
            speed: 50,
            useNativeDriver: false
        }).start();
        // Animated.spring(titleSize, {
        //     toValue: fontSize.regular,
        //     duration: 250,
        //   //  useNativeDriver: true
        // }).start();
    };
    const onFocusInput = () => {
        moveTitleUp()
    }
    const onBlurInput = () => {
        moveTitleDown()
    }
    const defaultTintColor = !invertColors ? colors.appTextColor1 : colors.appTextColor6
    const defaultTitleColor = defaultTintColor + (!isTitleSolidColor ? '60' : '')
    const defaultTopMargin = title ? height(1.5) : null
    return (
        <TouchableOpacity disabled={!onPress} activeOpacity={1} onPress={onPress}>
            <Wrapper marginHorizontalBase style={[containerStyle]}>
                {
                    titleStatic ?
                        <>
                            <Text isInput style={[{ color: defaultTitleColor }, titleStyle]}>{titleStatic}</Text>
                        </>

                        :
                        null
                }
                <Wrapper style={[appStyles.inputContainerUnderLined, {
                    //borderRadius: sizes.b,
                    borderBottomWidth: 0.5,
                    borderBottomColor: defaultTintColor,
                    marginHorizontal: 0
                }, inputBorderStyle]}>
                    {
                        left ?
                            left
                            :
                            customIconLeft ?
                                <Wrapper style={{ flex: 1, alignItems: 'flex-end', marginTop: defaultTopMargin }}>
                                    <Icons.Custom icon={customIconLeft} size={iconSizeLeft ? iconSizeLeft : sizes.icons.medium} color={iconColorLeft ? iconColorLeft : colors.appTextColor1} containerStyle={iconStyleLeft} />
                                </Wrapper>
                                :
                                iconNameLeft ?
                                    <Wrapper style={{ flex: 1, alignItems: 'flex-end', marginTop: defaultTopMargin }}>
                                        <Icon name={iconNameLeft} type={iconTypeLeft} size={iconSizeLeft ? iconSizeLeft : sizes.icons.medium} color={iconColorLeft ? iconColorLeft : colors.appTextColor1} iconStyle={iconStyleLeft} onPress={onPressIconLeft} />
                                    </Wrapper>
                                    :
                                    null
                    }
                    <View style={[{ flex: 7, justifyContent: 'center' }, inputContainerStyle]}>
                        <Wrapper isAbsolute style={{ top: 0, bottom: 0, ...appStyles.center, backgroundColor: 'transparent', }}>
                            <Wrapper style={{ marginBottom: value ? FocusedTitleMarginBottom : titleMarginBottom }}>
                                <Text isInput style={[{ color: defaultTitleColor, lineHeight: 16 }, titleStyle,]}>{title}</Text>
                            </Wrapper>
                        </Wrapper>
                        {
                            children ? children :
                                onPress ?
                                    <Wrapper style={[{ height: sizes.inputHeight, justifyContent: 'center' },inputStyle]}>
                                        {
                                            value ||placeholder ?
                                                <Wrapper>
                                                    <Text isMedium numberOfLines={1} isWhite={invertColors} style={inputTextStyle}>{value||placeholder}</Text>
                                                </Wrapper>
                                                :
                                                null
                                        }
                                    </Wrapper>
                                    :
                                    <TextInput
                                        ref={inputRef}
                                        onChangeText={onChangeText}
                                        value={value}
                                        keyboardType={keyboardType}
                                        placeholder={placeholder}
                                        autoFocus={autoFocus}
                                        autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
                                        onFocus={() => {
                                            onFocusInput();
                                            onFocus ? onFocus() : null
                                        }}
                                        onBlur={() => {
                                            onBlurInput(),
                                                onBlur ? onBlur() : null
                                        }}
                                        editable={editable}
                                        underlineColorAndroid="transparent"
                                        maxLength={maxLength}
                                        multiline={multiline}
                                        placeholderTextColor={placeholderTextColor ? placeholderTextColor : colors.appTextColor4}
                                        secureTextEntry={secureTextEntry}
                                        style={[appStyles.inputField, { color: defaultTintColor, width: null, height: sizes.inputHeight, paddingTop: defaultTopMargin, paddingHorizontal: 0 }, inputStyle]}
                                    />
                        }
                    </View>

                    {
                        right ?
                            right
                            :
                            iconNameRight ?
                                <Wrapper flex={1} alignItemsFlexEnd style={[{ marginTop: defaultTopMargin },iconContainerRightStyle]}>
                                    <Icon name={iconNameRight} type={iconTypeRight} size={iconSizeRight ? iconSizeRight : sizes.icons.medium} color={iconColorRight ? iconColorRight : defaultTintColor} iconStyle={iconStyleRight} onPress={onPressIconRight} />
                                </Wrapper>
                                :
                                null
                    }
                </Wrapper>
                {
                    error ?
                        <Wrapper style={{}} animation="shake">
                            <Spacer isTiny />
                            <Icons.WithText
                                iconName="alert-circle-outline"
                                //title="New"
                                text={error}

                                tintColor={colors.error}
                                iconSize={sizes.icons.tiny}
                                textStyle={[{ fontSize: fontSize.small }]}
                            />
                        </Wrapper>
                        :
                        null
                }
            </Wrapper>
        </TouchableOpacity>
    );
}


const SearchBar = ({ value, placeholder, inputContainerStyle, onChangeText, right, onPressCross, inputStyle, ...props }) => {
    return (
        <Colored
            value={value}
            onChangeText={onChangeText}
            iconNameLeft="search"
            iconTypeLeft="feather"
            placeholder={placeholder ? placeholder : "Search"}
            //inputContainerStyle={inputContainerStyle}
            iconNameRight={(value && onPressCross) && 'close-circle'}
            iconTypeRight="ionicon"
            onPressIconRight={onPressCross}
            right={right}
            inputStyle={[{ height: sizes.inputHeight - height(1), paddingHorizontal: 0 }, inputStyle]}
            iconContainerStyle={{ marginLeft: sizes.marginHorizontal / 1.5, ...appStyles.marginHorizontalSmall }}
            inputContainerStyle={[{ borderWidth: 1, borderColor: colors.appBgColor3 }, inputContainerStyle]}
            {...props}
        />
    )
}

const UnderlinedSecondary = ({ ...props }) => {
    return (
        <Underlined
            titleStyle={[appStyles.textSmallPlus, appStyles.textGray]}
            //inputStyle={[{ height: height(5) }, appStyles.textRegular]}
            inputTextStyle={[appStyles.textRegular]}
            placeholderTextColor={colors.appTextColor1}
            {...props}
        />
    )
}

export { Colored, Bordered, Underlined, SearchBar, UnderlinedSecondary }