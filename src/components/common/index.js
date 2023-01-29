import React from 'react'
import SetupProfileCom from './setupProfileCom'
import PostMenu from './postMenu'

import { Image, Pressable, TouchableOpacity } from 'react-native'
import { Cards, Icons, Lines, Spacer, TextInputs, Wrapper, Text, Images, Modals, Buttons } from '..'
import { height, totalSize, width } from 'react-native-dimension'
import { appImages, appStyles, colors, fontSize, Hooks, routes, sizes } from '../../services'
import { navigate, replace } from '../../navigation/rootNavigation'
import Slider from '@react-native-community/slider';
import * as PopupWrappers from './popupWrappers'
import { Icon } from 'react-native-elements'
export * from './cartProducts'
export * from './posts'
export * from './comments'
export * from './products'
export * from './chat'
export * from './supports'
export * from './orders'
export * from './customers'
export * from './checkouts'
export * from './groups'
import LineChartPrimary from './lineChart'
import ImageViewer from './imageViewer'
import VideoPlayer from './videoPlayer'
import CommentMenu from './commentMenu'
import UserMenu from './userMenu'
import { useSelector } from 'react-redux'



export const IconButtonBadge = ({ badgeValue, size, ...props }) => {
    const defaulButtonSize = size || totalSize(3.5)
    const defaulIconSize = (defaulButtonSize * 0.5)
    const defaulBadgeSize = (defaulButtonSize * 0.35)
    const defaulBadgeTextSize = (defaulButtonSize * 0.2)
    return (
        <Wrapper>
            <Icons.Button
                // iconName={'shopping-cart'}
                // iconType='feather'
                iconColor={colors.appTextColor1}
                buttonColor={colors.appColor1 + '20'}
                buttonSize={defaulButtonSize}
                iconSize={defaulIconSize}
                isRound
                {...props}
            />
            {
                badgeValue ?
                    <Wrapper
                        style={{ position: 'absolute', top: totalSize(0.3), right: totalSize(0.3), }}
                    >
                        <Icons.Button
                            text={badgeValue}
                            textColor={colors.appTextColor6}
                            textStyle={[appStyles.xxTinyText, appStyles.textWhite, appStyles.fontMedium, { fontSize: defaulBadgeTextSize }]}
                            buttonColor={colors.appColor1}
                            buttonSize={defaulBadgeSize}
                            //iconSize={totalSize(0.5)}
                            isRound
                            buttonStyle={[{
                                // position: 'absolute', top: totalSize(0.3), right: totalSize(0.3),
                                borderWidth: 1, borderColor: colors.appBgColor1,
                            }]}
                            shadow
                        />
                    </Wrapper>
                    :
                    null
            }

        </Wrapper>
    )
}
export const SuccessPopup = ({ ...props }) => {
    return (
        <Modals.PopupPrimary
            topMargin={height(57)}
            //visible={isConfirmationPopupVisible}
            //toggle={toggleConfirmationPopup}
            //customIcon={appIcons.checkmark}
            //iconName='check'
            //iconType='font-awesome'
            icon={
                <Icons.Button
                    iconName={'check'}
                    iconType='octicon'
                    iconColor={colors.appTextColor6}
                    buttonColor={colors.appColor1}
                    isRound
                    iconSize={totalSize(4)}
                    buttonSize={totalSize(6)}
                />
            }
            //icon={<Icons.Custom icon={appIcons.checkmark} size={totalSize(10)} />}
            //title="A link has been sent to your email to reset your password"
            // onPressButton1={() => {
            //     toggleConfirmationPopup()
            //     goBack()
            // }}
            //buttonText1={'Continue'}
            disableSwipe
            disableBackdropPress
            {...props}
        />
    )
}
export const ButtonTitleInfo = ({ title, info, rightText, onPressRightText, containerStyle, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
        >
            <Wrapper
                isColored
                //marginHorizontalSmall
                paddingVerticalSmall
                flexDirectionRow
                style={[{ backgroundColor: colors.appColor1 + '20' }, containerStyle]}
                alignItemsCenter

            >
                <Wrapper flex={1}>
                    <Text isTiny isGray>{title}</Text>
                    <Spacer isSmall />
                    <Text isMedium >{info}</Text>
                </Wrapper>
                <Wrapper>
                    {/* <Text isSmall isBoldFont isPrimaryColor>{rightText}</Text> */}
                    <Buttons.ColoredSmall
                        //onPress={onPressRightText}
                        text={rightText}
                        buttonStyle={[{ backgroundColor: colors.transparent }, appStyles.paddingHorizontalTiny]}
                        textStyle={[appStyles.textSmall, appStyles.fontBold, appStyles.textPrimaryColor]}
                    />
                </Wrapper>
            </Wrapper>
        </Pressable>
    )
}
export const FundRaisingProjectInfo = ({ backers, daysLeft, currentAmount, goalAmount }) => {
    return (
        <Wrapper flexDirectionRow>
            <Wrapper isColored marginHorizontalZero paddingVerticalSmall isCenter style={{ backgroundColor: colors.appColor1 + '20' }}>
                <Text isRegular isBoldFont>{backers}</Text>
                <Spacer isTiny />
                <Text isTiny isGray>Backers</Text>
            </Wrapper>
            <Spacer isSmall horizontal />
            <Wrapper isColored marginHorizontalZero paddingVerticalSmall isCenter style={{ backgroundColor: colors.appColor1 + '20' }}>
                <Text isRegular isBoldFont>{daysLeft}</Text>
                <Spacer isTiny />
                <Text isTiny isGray>days left</Text>
            </Wrapper>
            <Spacer isSmall horizontal />
            <Wrapper flex={1} alignItemsFlexEnd>
                <Text isMediumTitle isPrimaryColor>{currentAmount}</Text>
                <Spacer isTiny />
                <Text isSmall>{`pledged of ${goalAmount} goal`}</Text>
            </Wrapper>
        </Wrapper>
    )
}
export const InfoCardPrimary = ({ title, subTitle, onPressRemove, onPressEdit, onPressSelect, isDefault, containerStyle, index, isLoadingSelect }) => {
    const hasIndex = index >= 0
    return (
        <Pressable style={containerStyle}>
            <Wrapper
                animation={hasIndex && (index <= 10 && 'fadeInUp')}
                duration={hasIndex && (300 + (index * 100))}
                isBorderedWrapper style={{ borderColor: colors.appBgColor3 }}>
                <Text isMedium isBoldFont>{title}</Text>
                <Spacer isBasic />
                <Text isMedium >{subTitle}</Text>
                <Spacer isBasic />
                <Wrapper flexDirectionRow justifyContentSpaceBetween>
                    <Wrapper flexDirectionRow>
                        <Buttons.ColoredSmall
                            text={'Remove'}
                            buttonStyle={[{ borderRadius: 100, backgroundColor: colors.error + '20' }, appStyles.paddingHorizontalSmall]}
                            textStyle={[appStyles.textSmall, appStyles.textError]}
                            onPress={onPressRemove}
                        />
                        {
                            onPressEdit ?
                                <>
                                    <Spacer isSmall horizontal />
                                    <Buttons.ColoredSmall
                                        text={'Edit'}
                                        buttonStyle={[{ borderRadius: 100, backgroundColor: colors.appColor1 + '20' }, appStyles.paddingHorizontalSmall]}
                                        textStyle={[appStyles.textSmall, appStyles.textPrimaryColor]}
                                        onPress={onPressEdit}

                                    />
                                </>
                                :
                                null
                        }
                    </Wrapper>
                    <Buttons.ColoredSmall
                        text={isDefault ? 'Default' : 'Select'}
                        buttonStyle={[{ borderRadius: 100, backgroundColor: isDefault ? colors.appBgColor4 : colors.appColor1 }, appStyles.paddingHorizontalSmall]}
                        textStyle={[appStyles.textSmall, appStyles.textWhite]}
                        onPress={onPressSelect}
                        isLoading={isLoadingSelect}

                    />
                </Wrapper>
            </Wrapper>
        </Pressable>
    )
}
export const ButtonsGroupPrimary = ({ data, initalIndex, onPressButton, ...props }) => {
    return (
        <Buttons.ButtonGroupAnimated
            data={data}
            initalIndex={initalIndex}
            indentifier={'label'}
            onPressButton={onPressButton}
            inActiveButtonStyle={[{ borderRadius: 100, backgroundColor: colors.transparent, borderWidth: 1, borderColor: colors.appColor1, paddingHorizontal: width(4), paddingVertical: height(0.75) },]}
            activeButtonStyle={{ borderRadius: 100 }}
            activeTextStyle={[appStyles.textSmall, appStyles.textWhite]}
            inActiveTextStyle={[appStyles.textSmall, appStyles.textPrimaryColor]}

            {...props}
        />
    )
}
export const OrderStatusButton = ({ status }) => {
    const { is_pending_order, is_active_order, is_cancelRequested_order, is_cancelled_order, is_delivered_order, is_completed_order } = Hooks.UseHelp({ order_status: status })
    const status_text = !is_cancelRequested_order ? status.slice(0, 1).toUpperCase() + status.slice(1) : 'Cancel Request Sent'
    const status_button_background_color = is_pending_order ?
        colors.appBgColor4 :
        is_active_order ?
            colors.success :
            is_delivered_order ?
                colors.success :
                is_cancelled_order ?
                    colors.error :
                    is_cancelRequested_order ?
                        colors.error :
                        is_completed_order ?
                            colors.appColor1 :
                            colors.appColor1
    return (
        <Buttons.ColoredSmall
            text={status_text}
            textStyle={[
                appStyles.textTiny,
                appStyles.fontMedium,
                appStyles.textGray,
            ]}
            buttonStyle={[
                {
                    backgroundColor: status_button_background_color + '20',
                    borderRadius: 100
                },
                appStyles.marginHorizontalTiny,
                appStyles.paddingHorizontalSmall,
                appStyles.paddingVerticalTiny
            ]}
        />
    )
}
export const OrderPriceInfo = ({ subtotal, tax, total }) => {
    return (
        <Wrapper>
            <Wrapper flexDirectionRow marginHorizontalSmall justifyContentSpaceBetween>
                <Text isSmall isTextColor3>Subtotal</Text>
                <Text isSmall isTextColor3>$ {subtotal}</Text>
            </Wrapper>
            <Spacer isSmall />
            <Wrapper flexDirectionRow marginHorizontalSmall justifyContentSpaceBetween>
                <Text isSmall isTextColor3>Tax</Text>
                <Text isSmall isTextColor3>$ {tax}</Text>
            </Wrapper>
            <Spacer isBasic />
            <Wrapper flexDirectionRow marginHorizontalSmall justifyContentSpaceBetween>
                <Text isTinyTitle isTextColor3 isBoldFont>Total Cost</Text>
                <Text isTinyTitle isTextColor3 isBoldFont>$ {total}</Text>
            </Wrapper>
        </Wrapper>
    )
}
export const AudioProgressBar = ({
    progress, width, height, minimumValue,
    maximumValue, filledColor, unfilledColor,
    onSlidingStart, onSeek, tapToSeek }) => {
    //const { getHeight, getWidth, getFontSize } = useDimensions()
    return (
        <Slider
            value={progress}
            style={{ width: width ? width : width(50), height: height ? height : totalSize(2) }}
            minimumValue={minimumValue ? minimumValue : 0}
            maximumValue={maximumValue ? maximumValue : 1}
            maximumTrackTintColor={unfilledColor ? unfilledColor : (colors.appBgColor2)}
            minimumTrackTintColor={filledColor ? filledColor : colors.appColor1}
            onSlidingStart={onSlidingStart}
            onSlidingComplete={onSeek}
            tapToSeek={tapToSeek}
            thumbTintColor='transparent'
        />
    )
}

export const ShareSomething = ({ onPress, imageUrl }) => {
    return (
        <Pressable
            onPress={onPress}
        >
            <Wrapper isBorderedWrapper marginHorizontalSmall>
                <Wrapper flexDirectionRow alignItemsCenter>
                    <Images.Round
                        source={{ uri: imageUrl || appImages.noUser }}
                    />
                    <Spacer isSmall horizontal />
                    <Text isTinyTitle isRegularFont isLightGray>Share something</Text>
                </Wrapper>
                <Spacer isSmall />
                <Lines.Horizontal />
                <Spacer isSmall />
                <Wrapper flexDirectionRow >
                    <Wrapper
                        flex={1}
                        alignItemsCenter
                    >
                        <Icons.WithText
                            iconName={'images-outline'}
                            iconType='ionicon'
                            text={'Photos'}
                            tintColor={colors.appTextColor4}
                        />
                    </Wrapper>
                    <Wrapper
                        flex={1}
                        alignItemsCenter
                    >
                        <Icons.WithText
                            iconName={'videocam-outline'}
                            iconType='ionicon'
                            text={'Videos'}
                            tintColor={colors.appTextColor4}
                        />
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        </Pressable>
    )
}

export const OptionsBordered = ({ options, onPressOption, titleStyle }) => {
    return (
        <Wrapper isBorderedWrapper paddingHorizontalZero paddingVerticalZero style={{ borderColor: colors.appBgColor3 }}>
            {
                options.map((item, index) => {
                    return (
                        <>
                            {
                                index != 0 ?
                                    <Lines.Horizontal />
                                    :
                                    null
                            }
                            <Cards.IconTitleArrow
                                key={index}
                                title={item.label}
                                containerStyle={[{ paddingVertical: height(1.75) }]}
                                titleStyle={[appStyles.textRegular, titleStyle && titleStyle(item, index)]}
                                onPress={() => onPressOption(item, index)}
                            />
                        </>
                    )
                })
            }
        </Wrapper>
    )
}
export const SwitchModeButton = ({ mode, onPress }) => {
    const isCustomer = mode === 'customer'
    const isSeller = mode === 'seller'
    return (
        <Buttons.ColoredSmall
            buttonStyle={[{ borderRadius: 0 }, appStyles.center, appStyles.paddingVerticalTiny]}
            text={
                <Text isTiny isWhite>You are in {mode} mode.
                    {' '}
                    <Text isTiny isWhite isMediumFont isUnderlined>Switch Mode</Text>
                </Text>
            }
            onPress={onPress}
        />
    )
}
export const ButtonSmallPrimary = ({ text, textColor, backgroundColor }) => {
    return (
        <Buttons.ColoredSmall
            text={text}
            textStyle={[appStyles.textTiny, { color: textColor || colors.appTextColor3 }]}
            buttonStyle={[appStyles.paddingVerticalTiny, appStyles.paddingHorizontalTiny, { backgroundColor: backgroundColor || colors.appColor1 }]}
        />
    )
}
export const TitleInfo = ({ title, info, infoStyle, titleStyle }) => (
    <Text isSmall style={[infoStyle]}>
        <Text isSmall isLightGray style={[titleStyle]}>{title}: </Text>
        {info}
    </Text>
)
export const TitleInfoSecondary = ({
    title, info, infoStyle, titleStyle,
    onPressTitle, onPressInfo,
    ...containerProps }) => (
    <Wrapper
        flexDirectionRow
        justifyContentSpaceBetween
        marginHorizontalBase
        {...containerProps}
    >
        <Text
            isSmallPlus
            style={[{}, titleStyle]}
            onPress={onPressTitle}
        >{title}</Text>
        <Text
            isSmallPlus
            style={[{}, infoStyle]}
            onPress={onPressInfo}
        >{info}</Text>
    </Wrapper>
)

export const WrapperColoredBorderedShadow = ({ children, containerStyle, ...props }) => {
    return (
        <Wrapper isBorderedWrapper background1 style={[{ borderRadius: sizes.cardRadius / 2, paddingVertical: height(1.5), paddingHorizontal: width(2.5) }, appStyles.shadowExtraLight, containerStyle]} {...props}>
            {children}
        </Wrapper>
    )
}

export const CustomerDetailCard = ({ name, phone, email, shipping, billing, onPressDelete }) => {
    return (
        <Wrapper isBorderedWrapper background1 style={[appStyles.shadowExtraLight]}>
            <Text isSmall isMediumFont>Contact Info</Text>
            <Spacer isSmall />
            <TitleInfo
                title={'Name'}
                info={name}
            />
            <Spacer isSmall />
            <TitleInfo
                title={'Ph#'}
                info={phone}
            />
            <Spacer isSmall />
            <TitleInfo
                title={'Email'}
                info={email}
            />
            <Spacer isSmall />
            <Lines.Horizontal />
            <Spacer isSmall />
            <Text isSmall isMediumFont>Address</Text>
            <Spacer isSmall />
            <TitleInfo
                title={'Shipping'}
                info={shipping}
            />
            <Spacer isSmall />
            <TitleInfo
                title={'Billing'}
                info={billing}
            />
            {
                onPressDelete ?
                    <Wrapper isAbsolute style={{ right: sizes.marginHorizontal, top: sizes.marginVertical / 2 }}>
                        <Icon
                            name='delete'
                            size={totalSize(2)}
                            color={colors.appColor7}
                            onPress={onPressDelete}
                        />
                    </Wrapper>
                    :
                    null
            }

        </Wrapper>
    )
}

export const WrapperColoredShadow = ({ children, containerStyle, ...props }) => {
    return (
        <Wrapper isColored background1 style={[{ borderRadius: 5, }, appStyles.shadowLight, containerStyle]} {...props}>
            {children}
        </Wrapper>
    )
}

export const TitleInfoTertiary = ({ ...props }) => {
    return (
        <TitleInfoSecondary
            titleStyle={[appStyles.textRegular, appStyles.fontMedium]}
            infoStyle={[appStyles.textTiny, appStyles.textPrimaryColor, appStyles.textUnderlined]}
            {...props}
        />
    )
}

export const LineHorizontalInvertMargin = ({ ...props }) => {
    return (
        <Lines.Horizontal
            style={{ marginHorizontal: -(sizes.marginHorizontal / 2) }}
            {...props}
        />
    )
}

export const IconTitleInfoCard = ({ iconName, iconType, title, info }) => {
    return (
        <Wrapper flexDirectionRow alignItemsCenter>
            <Icons.Button
                iconName={iconName}
                iconType={iconType}
                //shadow
                isRound
                buttonColor={colors.appBgColor3}
                iconColor={colors.appTextColor3}
                iconSize={totalSize(1.75)}
                buttonSize={totalSize(4.25)}
            />
            <Wrapper flex={0.03} />
            <Wrapper flex={1}>
                {
                    title ?
                        <Text isTiny isGray>{title}</Text>
                        :
                        null
                }
                {title && info ?
                    <Spacer height={height(0.25)} />
                    :
                    null
                }
                {
                    info ?
                        <Text isSmall isTextColor2 lineHeight={totalSize(2)}>{info}</Text>
                        :
                        null
                }
            </Wrapper>
        </Wrapper>
    )
}

export const ErrorText = ({ errorText, containerStyle }) => {
    return (
        <>
            {
                errorText ?
                    <Wrapper style={containerStyle} animation="shake">
                        <Icons.WithText
                            iconName="alert-circle-outline"
                            //title="New"
                            text={errorText}

                            tintColor={colors.error}
                            iconSize={sizes.icons.tiny}
                            textStyle={[{ fontSize: fontSize.small }]}
                        />
                    </Wrapper>
                    :
                    null
            }
        </>
    )
}

export const NoDataViewPrimary = ({ containerStyle, ...props }) => {
    return (
        <Wrapper style={containerStyle}>
            <Icons.WithText
                iconName={'search-off'}
                iconType='material'
                text={'No Data Found'}
                direction='column'
                iconSize={height(15)}
                tintColor={colors.appTextColor3}
                textStyle={[appStyles.textRegular, appStyles.textGray]}
                titleStyle={[appStyles.textMedium, appStyles.textDarkGray]}
                textContainerStyle={[appStyles.alignItemsCenter]}
                {...props}
            />
        </Wrapper>
    )
}

export const DefaultPaymentMethod = ({ onPress }) => {
    const user = useSelector(state => state.user)
    const { currentUser } = user
    const { defaultPaymentMethod } = currentUser
    const cardNumber = defaultPaymentMethod?.card?.last4 ? '**** **** **** ' + defaultPaymentMethod?.card?.last4 : 'Not selected'

    return (
        <ButtonTitleInfo
            title={'Payment Method'}
            info={cardNumber}
            rightText={defaultPaymentMethod ? 'Change' : 'Add/Select'}
            onPress={onPress ? onPress : () => navigate(routes.paymentMethods, { change: true })}
        />
    )
}
export const DefaultDeliveryAddress = ({ onPress }) => {
    const user = useSelector(state => state.user)
    const { currentUser } = user
    const { defaultAddress } = currentUser
    const address = defaultAddress ?
        defaultAddress?.line1 + ', ' + defaultAddress?.line2 + ', ' + defaultAddress?.city :
        'Not selected'

    return (
        <ButtonTitleInfo
            title={'Delivery Address'}
            info={address}
            rightText={defaultAddress ? 'Change' : 'Add/Select'}
            onPress={onPress ? onPress : () => navigate(routes.deliveryAddresses, { change: true })}
        />
    )
}
export {
    SetupProfileCom,
    PostMenu,
    PopupWrappers,
    LineChartPrimary,
    ImageViewer,
    VideoPlayer,
    CommentMenu,
    UserMenu
    //SupportsPrimary
}