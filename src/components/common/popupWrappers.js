import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ViewPropTypes, FlatList, KeyboardAvoidingView, Keyboard, Platform } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, sizes, appStyles, HelpingMethods } from '../../services';
import Modal from 'react-native-modal'
import { styles } from './styles';
import { Buttons, Cards, Icons, Lines, ScrollViews, Spacers, TextInputs, Wrapper, Text, Spacer } from '..';
import LinearGradient from 'react-native-linear-gradient';

export function Main({
    toggle, disableBackdropPress, topMargin, containerStyle, mainContainerStyle,
    children, }) {

    // manage keyboard
    const [keyboardVisible, setKeyboardVisible] = useState(false)
    let keyboardDidShowListener
    let keyboardDidHideListener
    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => { HelpingMethods.handleAnimation(); setKeyboardVisible(true) });
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => { HelpingMethods.handleAnimation(); setKeyboardVisible(false) });
    })

    const defaultTopMargin = keyboardVisible ? height(12) : topMargin ? (Platform.OS === 'ios' ? topMargin : topMargin + height(5)) : height(12)
    return (

        <Wrapper flex={1} justifyContentFlexend={!keyboardVisible} style={[{ paddingTop: sizes.headerHeight }, mainContainerStyle]}>
            <Wrapper isAbsoluteFill>
                <TouchableOpacity
                    onPress={disableBackdropPress ? null : toggle}
                    activeOpacity={1}
                    style={{ flex: 1 }}>
                    <Wrapper
                        isGradient
                        colors={['#00000000', '#000000BF']}
                    />
                </TouchableOpacity>
            </Wrapper>
            <Wrapper
                animation={'slideInUp'}
                duration={250}
                background1
                style={[{
                    // marginTop: defaultTopMargin,
                    borderTopRightRadius: sizes.ModalRadius,
                    borderTopLeftRadius: sizes.ModalRadius,
                    //...appStyles.shadowExtraDark
                }, containerStyle]}>
                {children}
            </Wrapper>
            {/* </LinearGradient> */}
        </Wrapper>
    )
}

export function Primary({ title, toggle, info, iconName, iconType,
    customIcon, buttonText1, buttonText2, onPressButton1,
    onPressButton2, topMargin, children, scrollEnabled,
    hideHeader, headerLeft, isVerticalButtons,
    backdropColor, backdropOpacity, onPressClose, loadingButton1, loadingButton2,
    button1Style, button2Style, keyboardShouldPersistTaps,
    headerTitle, topImage, headerRight, closeIconColor, disableSwipe, icon,
    headerTitleStyle, preBottom, headerStyle, closeIconSize, rightContainerStyle, closeIconContainerSize,
    buttonWrapperShadow, headerBottom, titleStyle, buttonText1Style, buttonText2Style, headerSubtitleStyle, headerSubtitle,
    buttonsDirection, showCrossIcon, headerComponent, ...MainProps }) {

    // manage keyboard
    // const [keyboardVisible, setKeyboardVisible] = useState(false)
    // let keyboardDidShowListener
    // let keyboardDidHideListener
    // useEffect(() => {
    //     keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => { HelpingMethods.handleAnimation(); setKeyboardVisible(true) });
    //     keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => { HelpingMethods.handleAnimation(); setKeyboardVisible(false) });
    // })

    // const defaultTopMargin = keyboardVisible ? height(12) : topMargin ? (Platform.OS === 'ios' ? topMargin : topMargin + height(5)) : height(12)

    return (


        <Main
            toggle={toggle}
            {...MainProps}
        >
            <Wrapper >
                {
                    headerComponent ? headerComponent :
                        headerTitle ?
                            <Wrapper style={{}}>
                                <Wrapper style={[{ paddingHorizontal: sizes.marginHorizontal, backgroundColor: 'transparent', paddingBottom: sizes.marginVertical, paddingTop: sizes.marginVertical * 2, justifyContent: 'center', }, headerStyle]}>
                                    <Text isSmallTitle style={[appStyles.textCenter, headerTitleStyle]}>{headerTitle}</Text>
                                    {
                                        headerSubtitle ?
                                            <Text isRegular style={[appStyles.textCenter, { marginTop: sizes.smallMargin }, headerSubtitleStyle]}>{headerSubtitle}</Text>
                                            :
                                            null
                                    }
                                    <Wrapper isAbsolute style={[{ right: sizes.marginHorizontal, top: 0 }, rightContainerStyle]}>
                                        {
                                            headerRight ? headerRight :
                                                onPressClose ?
                                                    <Icons.Button
                                                        iconName="close"
                                                        iconColor={closeIconColor ? closeIconColor : colors.appTextColor1}
                                                        onPress={onPressClose}
                                                        iconSize={closeIconSize ? closeIconSize : totalSize(3)}
                                                        buttonSize={closeIconContainerSize ? closeIconContainerSize : totalSize(5)}
                                                    //buttonColor={'red'}
                                                    />
                                                    :
                                                    null
                                        }
                                    </Wrapper>
                                </Wrapper>
                                {headerBottom && headerBottom}
                            </Wrapper>
                            :
                            <Spacer height={sizes.baseMargin * 1.5} />
                }

                <KeyboardAvoidingView
                    //style={{ flex: 1 }}
                    behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}
                    keyboardVerticalOffset={Platform.OS == 'ios' ? height(12.5) : 0}
                    enabled={Platform.OS === 'ios' ? true : false}
                >
                    <ScrollViews.KeyboardAvoiding
                    //keyboardShouldPersistTaps={keyboardShouldPersistTaps}
                    // keyboardShouldPersistTaps={'always'}
                    // showsVerticalScrollIndicator={false}
                    // scrollEnabled={scrollEnabled}
                    >

                        <Wrapper style={[appStyles.center]}>
                            {

                                (icon || iconName || customIcon) ?

                                    <>
                                        {icon ? icon :
                                            <Icons.Button
                                                iconName={iconName}
                                                iconType={iconType}
                                                customIcon={customIcon}
                                                iconColor={colors.appTextColor6}
                                                buttonColor={colors.appColor1}
                                                buttonSize={totalSize(10)}
                                                iconSize={totalSize(4)}
                                                buttonStyle={{ borderRadius: 100, }}
                                            />
                                        }
                                        <Spacer height={sizes.baseMargin * 1.5} />
                                    </>
                                    :
                                    null
                            }
                        </Wrapper>
                        {
                            title ?
                                <>
                                    <Wrapper marginHorizontalLarge style={{ backgroundColor: 'transparent' }}>
                                        <Text isMediumTitle style={[appStyles.textCenter, titleStyle]}>{title}</Text>
                                    </Wrapper>
                                    <Spacer height={sizes.baseMargin} />
                                </>
                                :
                                null
                        }
                        {
                            info ?
                                <>
                                    <Wrapper marginHorizontalLarge style={{ backgroundColor: 'transparent', }}>
                                        <Text isMedium style={[appStyles.textCenter]}>{info}</Text>
                                    </Wrapper>
                                    <Spacer isBasic />
                                </>
                                :
                                null
                        }
                        {children}
                    </ScrollViews.KeyboardAvoiding>
                    {preBottom}
                </KeyboardAvoidingView>
                {/* <Spacers.Spacer height={sizes.baseMargin} /> */}

                {
                    onPressButton1 || onPressButton2 ?
                        <Wrapper style={[{ backgroundColor: colors.appBgColor1, }, buttonWrapperShadow && appStyles.shadowDark]}>
                            <Spacer isBasic />
                            <Wrapper style={{ flexDirection: buttonsDirection || 'row', marginHorizontal: sizes.marginHorizontal * 1.5 }}>
                                {
                                    onPressButton2 ?
                                        <Wrapper style={[!isVerticalButtons && { flex: 1 }]}>
                                            <Buttons.Colored
                                                text={buttonText2}
                                                onPress={onPressButton2}
                                                buttonColor={colors.appBgColor3}
                                                tintColor={colors.appTextColor1}
                                                buttonStyle={[{ marginHorizontal: 0, backgroundColor: colors.appBgColor3, }, button2Style]}
                                                textStyle={[appStyles.textPrimaryColor, buttonText2Style]}
                                                isLoading={loadingButton2}
                                            />
                                        </Wrapper>
                                        :
                                        null
                                }
                                {
                                    onPressButton2 && onPressButton1 ?
                                        isVerticalButtons ?
                                            <Spacer height={sizes.marginVertical} />
                                            :
                                            <Spacer width={sizes.marginHorizontal} />
                                        : null
                                }
                                {
                                    onPressButton1 ?
                                        <Wrapper style={[!isVerticalButtons && { flex: 1 }]}>
                                            <Buttons.Colored
                                                text={buttonText1}
                                                onPress={onPressButton1}
                                                shadow
                                                buttonStyle={[{ marginHorizontal: 0, }, button1Style]}
                                                textStyle={[buttonText1Style]}
                                                isLoading={loadingButton1}
                                            />
                                        </Wrapper>
                                        :
                                        null
                                }
                            </Wrapper>
                            <Spacer height={sizes.baseMargin * 1.5} />
                        </Wrapper>
                        :
                        null
                }
                {/* <Spacers.Spacer height={sizes.baseMargin} /> */}

            </Wrapper>
        </Main>
    )
}