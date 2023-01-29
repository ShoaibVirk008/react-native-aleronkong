import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Cards, Icons, Lines, Spacer, TextInputs, Wrapper, Text, Images, Modals } from '..'
import { height, totalSize } from 'react-native-dimension'
import { appStyles, colors, routes, sizes } from '../../services'
import { navigate, replace } from '../../navigation/rootNavigation'
import moment from 'moment'
import { useSelector } from 'react-redux'

export const CommentsPrimary = ({ data, onPressItem, onLineComment, onPressDots }) => {
    const currentUser = useSelector(state => state.user.currentUser)

    return (
        <Wrapper>
            {
                data.map((item, index) => {
                    const { creator, content, createdAt, replies } = item
                    const name = creator?.firstName + ' ' + creator?.lastName
                    const isMyComment = creator?._id === currentUser._id
                    return (
                        <CommentPrimary
                            key={index}
                            onPress={onPressItem ? () => onPressItem(item, index) : null}
                            userImage={creator?.avatar}
                            userName={name}
                            date={moment(createdAt).fromNow()}
                            comment={content}
                            onLineComment={onLineComment}
                            onPressDots={
                                isMyComment ? () => onPressDots(item, index) : null}
                        />
                    )
                })
            }
        </Wrapper>
    )
}

export const CommentPrimary = ({ userImage, userName, comment, date, onPress, onLineComment, onPressDots }) => {
    return (
        <Wrapper>
            <Cards.UserPrimary
                onPress={onPress}
                containerStyle={[appStyles.paddingHorizontalSmall]}
                imageUri={userImage}
                title={userName}
                imageSize={totalSize(4.25)}
                titleStyle={[appStyles.textSmall, appStyles.fontBold, appStyles.textColor2]}
                subTitle={comment}
                subTitleStyle={[appStyles.textSmall, appStyles.textColor2]}
                // titleRight={<Text isXTiny isLightGray>{date}</Text>}
                // titleContainerStyle={[appStyles.justifyContentSpaceBetween]}
                subTitleProps={onLineComment && { numberOfLines: 1 }}
                right={
                    <Wrapper flex={1} justifyContentSpaceBetween alignItemsFlexEnd>
                        {
                            onPressDots ?
                                <Icons.Button
                                    iconName={'dots-horizontal'}
                                    iconSize={totalSize(1.5)}
                                    iconColor={colors.appTextColor2}
                                    buttonSize={totalSize(2.5)}
                                    onPress={onPressDots}
                                />
                                :
                                <Wrapper></Wrapper>
                        }
                        <Text isXTiny isLightGray>{date}</Text>
                    </Wrapper>
                }
            />
        </Wrapper>
    )
}
