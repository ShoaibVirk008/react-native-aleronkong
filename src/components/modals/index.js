import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ViewPropTypes, FlatList, KeyboardAvoidingView, Keyboard } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, sizes, appStyles, HelpingMethods } from '../../services';
import Modal from 'react-native-modal'
import { styles } from './styles';
import { Buttons, Cards, Icons, Lines, ScrollViews, Spacers, TextInputs, Wrapper, Text, Spacer } from '..';
import LinearGradient from 'react-native-linear-gradient';



export const SwipeablePrimary = ({
    visible, toggle, disableSwipe, disableBackdropPress, topMargin, headerTitle,
    headerRight, headerLeft, hideHeader, children, backdropOpacity, backdropColor }) => {

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
        <Modal
            isVisible={visible} // Comment on video User
            style={{ margin: 0 }}
            onSwipeComplete={toggle}
            swipeDirection={disableSwipe ? null : "down"}
            propagateSwipe
            onBackdropPress={disableBackdropPress ? null : toggle}
            backdropOpacity={backdropOpacity ? backdropOpacity : 0}
            backdropColor={backdropColor && backdropColor}

        >
            <Wrapper flex={1}>
                {/* <LinearGradient style={{ flex: 1 }}
                colors={['#00000000', '#000000']}
            > */}
                <TouchableOpacity onPress={disableBackdropPress ? null : toggle} activeOpacity={1} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, }}>
                    <LinearGradient style={{ flex: 1 }}
                        colors={['#00000000', '#000000BF']}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        flex: 1,
                        marginTop: defaultTopMargin,
                        backgroundColor: colors.appBgColor1,
                        borderTopRightRadius: 25,
                        borderTopLeftRadius: 25,
                        //...appStyles.shadowExtraDark
                    }}>
                    {
                        hideHeader ? null :
                            <View style={appStyles.rowCompContainer}>
                                <Wrapper style={{ alignItems: 'center', right: 0, left: 0 }}>
                                    <Text isTinyTitle style={[appStyles.headerTitleStyle]}>
                                        {/* {data ? data.length + ' People' : 0 + ' People'} */}
                                        {headerTitle ? headerTitle : 'Title'}
                                    </Text>
                                </Wrapper>
                                <View>
                                    {
                                        headerLeft ? headerLeft :
                                            // <BackIcon
                                            //     onPress={toggle}
                                            //     color={colors.appTextColor6}
                                            // />
                                            <Icon
                                                name="x"
                                                type="feather"
                                                size={totalSize(2.5)}
                                                color={colors.appTextColor1}
                                                onPress={toggle}
                                            />
                                    }
                                </View>

                                <View style={{}}>
                                    {headerRight}
                                </View>
                            </View>
                    }
                    {children}
                </View>
                {/* </LinearGradient> */}
            </Wrapper>
        </Modal >
    )
}


export const PopupPrimary = ({
    visible, toggle, title, info, iconName, iconType,
    customIcon, buttonText1, buttonText2, onPressButton1,
    onPressButton2, topMargin, children, scrollEnabled,
    backdropColor, backdropOpacity, onPressClose,
    button1Style, button2Style, keyboardShouldPersistTaps,
    headerTitle, topImage, headerRight, closeIconColor, disableSwipe, icon, disableBackdropPress,
    headerTitleStyle, preBottom, headerStyle, closeIconSize, rightContainerStyle, closeIconContainerSize,
    buttonWrapperShadow, headerBottom, titleStyle, buttonText1Style, buttonText2Style, headerSubtitleStyle, headerSubtitle,
    buttonsDirection,

    //loaders
    loadingButton1, loadingButton2
}) => {


    // manage keyboard
    const [keyboardVisible, setKeyboardVisible] = useState(false)
    let keyboardDidShowListener
    let keyboardDidHideListener
    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => { HelpingMethods.handleAnimation(); setKeyboardVisible(true) });
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => { HelpingMethods.handleAnimation(); setKeyboardVisible(false) });
    })

    const defaultTopMargin = Platform.OS === 'ios' ? height(50) : height(40)
    const customTopMargin = keyboardVisible ? height(10) : topMargin ? Platform.OS === 'ios' ? topMargin : topMargin - height(10) : defaultTopMargin
    const isVerticalButtons = buttonsDirection === 'column' || buttonsDirection === 'column-reverse'
    return (
        <SwipeablePrimary
            visible={visible}
            toggle={toggle}
            hideHeader
            topMargin={customTopMargin}
            backdropColor={backdropColor}
            backdropOpacity={backdropOpacity ? backdropOpacity : 0}
            disableSwipe={disableSwipe}
            disableBackdropPress={disableBackdropPress}
        >
            <Wrapper flex={1}>
                {
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
                    style={{ flex: 1 }}
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
                                        <Text isSmallTitle isBoldFont style={[appStyles.textCenter, titleStyle]}>{title}</Text>
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
                            <Wrapper marginHorizontalMedium style={{ flexDirection: buttonsDirection || 'row', }}>
                                {
                                    onPressButton2 ?
                                        <Wrapper style={[!isVerticalButtons && { flex: 1 }]}>
                                            <Buttons.Bordered
                                                text={buttonText2}
                                                onPress={onPressButton2}
                                                buttonColor={colors.appBgColor3}
                                                //tintColor={colors.appTextColor1}
                                                buttonStyle={[{ marginHorizontal: 0, }, button2Style]}
                                                textStyle={[buttonText2Style]}
                                                isLoading={loadingButton2}

                                            />
                                        </Wrapper>
                                        :
                                        null
                                }
                                {
                                    (onPressButton2 && onPressButton1) ?
                                        !isVerticalButtons ?
                                            <Spacer width={sizes.marginHorizontal} />
                                            :
                                            <Spacer height={sizes.marginVertical} />
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
        </SwipeablePrimary>
    )
}

export const ImagePickerPopup = ({ visible, toggle, onPressButton1, onPressButton2, title, button1Text, button2Text, cancelText }) => {
    return (
        <PopupPrimary
            visible={visible}
            title={title || "Choose Image"}
            // buttonText2="Cancel"
            // onPressButton2={toggle}
            toggle={toggle}
            topMargin={height(60)}
        >
            <Wrapper>
                <Wrapper marginHorizontalBase>
                    {
                        onPressButton1 ?
                            <>
                                <Buttons.Colored
                                    text={button1Text || "Take Photo"}
                                    //  iconName="camera"
                                    buttonStyle={{ backgroundColor: colors.appBgColor2 }}
                                    textStyle={[{ color: colors.appTextColor3 }]}
                                    onPress={() => {
                                        toggle();
                                        setTimeout(() => {
                                            onPressButton1()
                                        }, 500);
                                    }}
                                    disableShadow
                                />
                                <Spacer isBasic />
                            </>
                            :
                            null
                    }

                    <Buttons.Colored
                        text={button2Text || "Select from galary"}
                        //iconName="image"
                        buttonStyle={{ backgroundColor: colors.appBgColor2 }}
                        textStyle={[{ color: colors.appTextColor3 }]}
                        onPress={() => {
                            toggle();
                            setTimeout(() => {
                                onPressButton2()
                            }, 500);
                        }}
                        disableShadow
                    />
                    <Spacer isBasic />
                    <Buttons.Colored
                        text={cancelText || "Cancel"}
                        //iconName="image"
                        buttonStyle={{ backgroundColor: colors.transparent }}
                        textStyle={[{ color: colors.appTextColor1 }]}
                        onPress={() => {
                            toggle();
                        }}
                        disableShadow
                    />
                </Wrapper>
            </Wrapper>
        </PopupPrimary>
    );
}

export function PickerPopup({
    visible, toggle, data, onPressItem,
    isSelected, enableSearch, textKey, topMargin,
    selectionIndicator, headerTitle, onPressDone,
    headerBottom, headerSubtitle, headerSubtitleStyle,
    headerTitleStyle, buttonText1, onPressButton1, loadingButton1,
    hideLastItemBottomLine, children
}) {
    const isCheck = selectionIndicator === 'check' || !selectionIndicator
    const isRadio = selectionIndicator === 'radio'
    const [searchQuery, setSearchQuery] = useState('')

    const getSearchedData = () => {
        let tempData = []
        const query = searchQuery.toLowerCase()
        tempData = data.filter(item => item.label.toLowerCase().includes(query))
        return tempData
    };
    const renderData = searchQuery ? getSearchedData() : data
    return (
        <PopupPrimary
            visible={visible}
            toggle={toggle}
            //onPressClose={toggle}
            headerTitle={headerTitle ? headerTitle : 'Select'}
            headerSubtitle={headerSubtitle}
            headerSubtitleStyle={headerSubtitleStyle}
            headerTitleStyle={headerTitleStyle}
            onPressButton1={() => {
                onPressButton1 ? onPressButton1() : onPressDone ? onPressDone() : toggle()
            }}
            buttonText1={buttonText1 || "Done"}
            loadingButton1={loadingButton1}
            topMargin={topMargin ? topMargin : height(30)}
            disableSwipe
            headerBottom={
                <>
                    {/* {
                        headerSubtitle ?
                            <Texts.Regular>{headerSubtitle}</Texts.Regular>
                            :
                            null
                    } */}
                    {
                        headerBottom && headerBottom

                    }
                    {
                        enableSearch ?
                            <>
                                {/* <Spacers.Tiny /> */}
                                <TextInputs.SearchBar
                                    value={searchQuery}
                                    onChangeText={v => setSearchQuery(v)}
                                    onPressCross={() => setSearchQuery('')}
                                />
                                <Spacer isTiny />
                            </>
                            :
                            null
                    }
                </>

            }
        >
            <Wrapper>

                {
                    renderData?.map((item, index) => {
                        const is_selected = isSelected(item, index);
                        return (
                            <Wrapper key={index}>

                                <Lines.Horizontal />
                                <Cards.IconTitleArrow
                                    containerStyle={{ paddingVertical: sizes.marginVertical / 1.5 }}
                                    title={textKey ? item[textKey] : item}
                                    left={
                                        isCheck ?
                                            <Icon
                                                name={is_selected ? "checkmark-circle" : "radio-button-off"}
                                                type={"ionicon"}
                                                color={colors.appColor1}
                                                size={totalSize(3)}
                                                style={{ marginRight: sizes.marginHorizontal / 2 }}
                                            />
                                            :
                                            isRadio ?
                                                <Icon
                                                    name={is_selected ? "radio-button-on" : "radio-button-off"}
                                                    type={"ionicon"}
                                                    color={colors.appColor1}
                                                    size={totalSize(3)}
                                                    style={{ marginRight: sizes.marginHorizontal / 2 }}
                                                />
                                                :
                                                null
                                    }
                                    right={<></>}
                                    onPress={() => onPressItem(item, index)}
                                />
                                {
                                    !hideLastItemBottomLine ?
                                        index === data.length - 1 ?
                                            <Lines.Horizontal />
                                            :
                                            null
                                        :
                                        null
                                }
                            </Wrapper>
                        )
                    })
                }
                {children}
            </Wrapper>
        </PopupPrimary>
    )
}