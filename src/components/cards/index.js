import React from 'react'
import { TouchableOpacity } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { Icons, Images, Spacer, Text, Wrapper } from '..';
import { appImages, appStyles, colors, sizes } from '../../services';

export const Primary = ({ style, width, height }) => {
    return (
        <Wrapper isCardView>

        </Wrapper>
    );
}

export const UserPrimary = ({
    containerStyle, imageSize, imageUri, title, subTitle,
    onPress, left, shadow, subContainerStyle, right, top,
    bottom, rightBottom, titleStyle, subTitleStyle, image,
    imageResizeMode, imageStyle, rowContainerStyle,
    titleProps, subTitleProps, subRowContainerStyle, titleRight,
    titleContainerStyle,contentContainerStyle,textContainerStyle
}) => {
    return (
        <TouchableOpacity disabled={!onPress} activeOpacity={1} onPress={onPress} style={[{ paddingHorizontal: sizes.marginHorizontal, }, shadow && appStyles.shadow, containerStyle]}>
            <Wrapper style={[{ paddingVertical: sizes.smallMargin }, subContainerStyle]}>
                {top ? top : null}
                <Wrapper  flexDirectionRow style={[{ }, rowContainerStyle]}>
                    {
                        left ? left : null
                    }
                    <Wrapper flex={1} style={[{},contentContainerStyle]}>
                        <Wrapper  flexDirectionRow style={[{}, subRowContainerStyle]}>
                            {
                                image || imageUri ?
                                    <>
                                        <Wrapper flexDirectionRow>
                                            {
                                                image ? image :
                                                    imageUri ?
                                                        <Images.Round
                                                            source={{ uri: imageUri ? imageUri : appImages.noUser }}
                                                            size={imageSize}
                                                            resizeMode={imageResizeMode && imageResizeMode}
                                                            style={[{ marginRight: sizes.marginHorizontal / 2 }, imageStyle]}
                                                        />
                                                        :
                                                        null
                                            }
                                        </Wrapper>
                                    </>
                                    :
                                    null

                            }

                            <Wrapper  style={textContainerStyle}>
                                <Wrapper flexDirectionRow style={[titleContainerStyle]}>
                                    <Text isMedium {...titleProps}  style={titleStyle}>{title}</Text>
                                    {titleRight}
                                </Wrapper>
                                {
                                    subTitle ?
                                        <>
                                            <Spacer isTiny />
                                            <Text isSmall  {...subTitleProps} style={[subTitleStyle]}>{subTitle}</Text>
                                        </>
                                        :
                                        null
                                }
                                {rightBottom ? rightBottom : null}
                            </Wrapper>
                        </Wrapper>
                    </Wrapper>
                    <Wrapper style={{}}>
                        {
                            right ? right :
                                null
                        }
                    </Wrapper>
                </Wrapper>
                {bottom ? bottom : null}
            </Wrapper>
        </TouchableOpacity>
    )
}

export const IconTitleArrow = ({ iconImage, iconName, iconType, title, onPress, left, right,invertColors,titleStyle, containerStyle,disableIconColor, ...props }) => {
    const defaulTintColor=!invertColors?colors.appTextColor2:colors.appTextColor6
    const defaulArrowColor=!invertColors?colors.appTextColor4:colors.appTextColor6
    const defaulBackgroundColor=!invertColors?colors.appBgColor1:colors.appBgColor6
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
        >
            <Wrapper flexDirectionRow justifyContentSpaceBetween marginHorizontalBase alignItemsCenter style={containerStyle} {...props}>
                <Wrapper flexDirectionRow alignItemsCenter>
                    {
                        left ? left :
                            iconImage || iconName ?
                                <Icons.Button
                                    customIcon={iconImage}
                                    iconName={iconName}
                                    iconType={iconType}
                                    iconColor={!disableIconColor&&defaulTintColor}
                                    iconSize={totalSize(2.5)}
                                    buttonColor={defaulBackgroundColor}
                                    buttonSize={totalSize(3.5)}
                                    isRound
                                    buttonStyle={{ marginRight: sizes.marginHorizontal }}
                                />
                                :
                                null
                    }
                    <Text isMedium style={[{color:defaulTintColor},titleStyle]}>{title}</Text>
                </Wrapper>
                {
                    right ?
                        right :
                        <Icon
                            name='chevron-thin-right'
                            type='entypo'
                            color={defaulArrowColor}
                            size={totalSize(1.5)}
                        />
                }
            </Wrapper>
        </TouchableOpacity>
    )
}

export const ChatBubbule = ({ containerStyle, myMessage, message, time, image }) => {
    return (
        <Wrapper marginHorizontalBase
            // animation={!myMessage ? 'fadeInLeft' : 'fadeInRight'}

            style={[{
                alignItems: !myMessage ? 'flex-start' : 'flex-end',
                //alignItems: 'flex-start',
                //marginTop: 0
            }, containerStyle]}
        >

            <Wrapper >
                <Wrapper flexDirectionRow  style={{ alignItems: 'flex-end', flexDirection: !myMessage ? 'row' : 'row-reverse', }}>
                    {/* {
                        !myMessage && image ?
                            <Images.Round
                                source={{ uri: image }}
                                size={totalSize(3)}
                                style={{ marginRight: sizes.marginHorizontal/2,marginBottom:sizes.TinyMargin*6 }}
                            />
                            :
                            null
                    } */}
                    <Wrapper style={{ alignItems: !myMessage ? 'flex-start' : 'flex-end', }}>
                        <Wrapper style={{ backgroundColor: !myMessage ? colors.appBgColor2 : colors.appColor1, paddingVertical: sizes.smallMargin, paddingHorizontal: sizes.marginHorizontal / 1.5, borderRadius: 100, }}>
                            <Text isMedium style={[myMessage && appStyles.textWhite, myMessage && appStyles.fontMedium]}>{message}</Text>
                        </Wrapper>
                        <Text isRegular style={[appStyles.textLightGray, { marginVertical: sizes.TinyMargin }]}>{time}</Text>
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        </Wrapper>
    );
}