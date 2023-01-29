import { useFocusEffect } from '@react-navigation/native';
import React, { Component, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { Buttons, Cards, Common, Headers, Images, ScrollViews, Spacer, Wrapper, Text, Modals, Loaders, Toasts } from '../../../components';
import { navigate } from '../../../navigation/rootNavigation';
import { Api, appStyles, colors, DummyData, HelpingMethods, routes, sizes } from '../../../services';
import { setCurrentUser } from '../../../services/store/actions';

export default function Index({ navigation, route }) {
    const userData = route?.params?.data

    const { _id, avatar, firstName, lastName, isGuildMember, userName } = userData
    const is_friend = HelpingMethods.isUserFriend(_id)
    const subscribedPackageData = HelpingMethods.GetSubscribedPackage(_id)
    const is_supporting = subscribedPackageData ? true : false
    // console.log('subscribedPackageData: ', subscribedPackageData)
    const currentUser = useSelector(state => state.user.currentUser)
    const { supportingPackages } = currentUser
    const isMyProfile = currentUser?._id === _id

    const name = firstName + ' ' + lastName



    const [userDetail, setUserDetail] = useState(null)
    const [isStopSupportingPopupVisible, setStopSupportingPopupVisibility] = useState(false)
    const [loadingGetPosts, setLoadingGetPosts] = useState(false)
    const [loadingAddFriend, setLoadingAddFriend] = useState(false)
    const [loadingUnsubscribe, setLoadingUnsubscribe] = useState(false)
    const [userPosts, setUserPosts] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)

    const toggleStopSupportingPopup = () => setStopSupportingPopupVisibility(!isStopSupportingPopupVisible)



    useFocusEffect(useCallback(() => {
        handleGetUserPosts()
    }, []))

    const handleGetUserPosts = async () => {
        setLoadingGetPosts(true)
        await Api.GetUserPosts({ userId: _id }).
            then(res => {
                if (res) {
                    setUserPosts(res.data.data)
                    setTotalPages(res.data.pages)
                    setCurrentPage(1)
                }
            })
        setLoadingGetPosts(false)
    }


    const handleLoadMore = async ({ nativeEvent }) => {
        const endReached = HelpingMethods.isCloseToBottom(nativeEvent)
        if (endReached && !loadingMore && (currentPage < totalPages) && userPosts?.length) {
            console.log('load more videos')
            setLoadingMore(true)
            await Api.GetUserPosts({ userId: _id, page: currentPage + 1 }).
                then(res => {
                    if (res) {
                        const newPosts = [...userPosts, ...res.data.data]
                        console.log('newPosts: ', newPosts)
                        setUserPosts(newPosts)
                        setCurrentPage(res.data.page)
                    }
                })
            setLoadingMore(false)
        }
    }
    const handleFriendUnfriend = async () => {
        setLoadingAddFriend(true)
        await HelpingMethods.handleFriendUnfriendUser(userData).
            then(res => {
                if (res) {
                    // const { friends } = res.data
                    // const newCurrentUser = { ...currentUser, friends }
                    setCurrentUser(res.data)
                }
            })
        setLoadingAddFriend(false)
    }

    const handleUnsubscribe = async () => {
        setLoadingUnsubscribe(true)
        //const subscibedPackageId = supportingPackages[0]._id
        const subscibedPackageId = subscribedPackageData._id
        await Api.unsubscribePackage({ packageId: subscibedPackageId })
            .then(res => {
                if (res) {
                    let newSupportingPackages = currentUser.supportingPackages.filter(item => item._id != subscibedPackageId)
                    setCurrentUser({ ...currentUser, supportingPackages: newSupportingPackages })
                    toggleStopSupportingPopup()
                    Toasts.Success('Package has been unsubscribed')
                }
            })
        setLoadingUnsubscribe(false)
    }
    const handleLikeDislikePost = async (item, index) => {
        await HelpingMethods.handleLikeDislikePost(item, index).
            then(res => {
                if (res) {
                    let tempPosts = userPosts.slice()
                    tempPosts[index] = res.data
                    setUserPosts(tempPosts)
                }
            })
    }
    const handlePressCommentInput = (item, index) => {
        navigate(routes.postDetail, { data: item, writeComment: true })
    }
    const handleOnPressEditComment = (data) => {
        const { post, comment } = data
        navigate(routes.postDetail, { data: post, comment, writeComment: true, lastScreen: routes.home })
    }
    const handleCommentDeleted = (data) => {
        const { post, comment } = data
        let tempPostNewComments = post?.comments?.filter(item => item != comment)
        let tempNewPost = { ...post, comments: tempPostNewComments }
        let tempPosts = userPosts.slice()
        let tempPostIndex = userPosts.indexOf(post)
        if (tempPostIndex >= 0) {
            tempPosts[tempPostIndex] = tempNewPost
            setUserPosts(tempPosts)
        }
    }
    const handlePostDeleted = (data) => {
        const post = data
        let tempPosts = userPosts.filter(item => item != post)
        setUserPosts(tempPosts)
    }
    return (
        <Wrapper isMain>
            <Headers.Primary
                containerStyle={{ borderBottomWidth: 0 }}
                showBackArrow
                right={
                    !isMyProfile ?
                        <Wrapper flexDirectionRow marginHorizontalBase>
                            {
                                is_friend ?
                                    <>
                                        <Common.IconButtonBadge
                                            iconName='phone'
                                            iconType='feather'
                                        />
                                        <Spacer isSmall horizontal />
                                        <Common.IconButtonBadge
                                            iconName='message-circle'
                                            iconType='feather'
                                            onPress={() => navigate(
                                                routes.chat,
                                                {
                                                    userData: userData,
                                                    checkChat: true
                                                }
                                            )}
                                        />
                                        <Spacer isSmall horizontal />
                                    </>
                                    :
                                    null
                            }
                            <Common.IconButtonBadge
                                iconName='dots-vertical'
                                onPress={() => {
                                    navigate(routes.userMenu,
                                        {
                                            data: userData,
                                            handleAddFriend: handleFriendUnfriend
                                        }
                                    )
                                }}
                            />
                        </Wrapper>
                        :
                        null
                }
                rightContainerStyle={{ flex: 0 }}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={handleLoadMore}
                scrollEventThrottle={16}
            >
                <Cards.UserPrimary
                    image={
                        <Wrapper style={{ marginRight: sizes.marginHorizontal }}>
                            <Images.Profile
                                source={{ uri: avatar }}
                                size={totalSize(10)}
                                showBadge={isGuildMember}
                                shadow
                            />
                        </Wrapper>
                    }
                    subContainerStyle={[appStyles.paddingVerticalZero, appStyles.alignItemsCenter]}
                    subRowContainerStyle={[appStyles.alignItemsCenter]}
                    title={name}
                    subTitle={`@${userName || name.replace(' ', '')}`}
                    titleStyle={[appStyles.h6, appStyles.textColor2, appStyles.fontBold]}
                    subTitleStyle={[appStyles.textSmall, appStyles.textLightGray]}
                />
                <Spacer isBasic />
                {
                    !isMyProfile ?
                        <>
                            <Wrapper flexDirectionRow marginHorizontalMedium>
                                <Wrapper flex={1}>
                                    {
                                        is_friend ?
                                            <Buttons.Colored
                                                text={
                                                    !is_supporting ?
                                                        'Support' :
                                                        <Text isButtonMedium isWhite alignTextCenter>Supporting
                                                            {'\n'}
                                                            <Text isSmall isWhite>${subscribedPackageData?.price || '15'} per month</Text>
                                                        </Text>
                                                }
                                                buttonStyle={[appStyles.marginHorizontalZero]}
                                                onPress={!is_supporting ?
                                                    () => {
                                                        navigate(routes.supportUser, { data: userData })
                                                        // const tempUserData = { ...userData, is_supporting: true }
                                                        // setUserData(tempUserData)
                                                    } :
                                                    () => toggleStopSupportingPopup()
                                                }
                                                isLoading={loadingAddFriend}
                                            />
                                            :
                                            <Buttons.Colored
                                                text={'Add Friend'}
                                                buttonStyle={[appStyles.marginHorizontalZero]}
                                                iconName='user-plus'
                                                iconType={'feather'}
                                                iconSize={totalSize(2)}
                                                onPress={
                                                    () => {
                                                        // const tempUserData = { ...userData, is_friend: true }
                                                        // HelpingMethods.handleAnimation()
                                                        // setUserData(tempUserData)
                                                        handleFriendUnfriend()
                                                    }
                                                }
                                                isLoading={loadingAddFriend}
                                            //iconStyle={{marginRight:sizes.marginHorizontal/2}}
                                            />
                                    }
                                </Wrapper>
                                <Wrapper flex={0.1} />
                                <Wrapper flex={1}>
                                    <Buttons.Bordered
                                        text={'Visit Store'}
                                        buttonStyle={[appStyles.marginHorizontalZero]}
                                        onPress={() => navigate(routes.storeDetail, { data: userData })}
                                    />
                                </Wrapper>
                            </Wrapper>
                            <Spacer isBasic />
                        </>
                        :
                        null
                }

                {
                    userPosts ?
                        userPosts?.length ?
                            <>
                                <Common.PostsPrimary
                                    data={userPosts}
                                    onPressItem={(item, index) => navigate(routes.postDetail, { data: item })}
                                    //onPressUser={(item, index) => navigate(routes.userDetail, { data: item.user })}
                                    onPressUser={(item, index) => navigate(routes.postDetail, { data: item })}
                                    onPressLike={handleLikeDislikePost}
                                    handlePostDeleted={handlePostDeleted}
                                    onPressCommentInput={handlePressCommentInput}
                                    onPressComment={handlePressCommentInput}
                                    onPressFund={(item, index) => {
                                        navigate(
                                            routes.fundRaisingProjectDetail,
                                            {
                                                data: item,
                                                lastScreen: routes.userDetail
                                            }
                                        )
                                    }}
                                    onPressEditComment={handleOnPressEditComment}
                                    handleCommentDeleted={handleCommentDeleted}
                                />
                                <Wrapper alignItemsCenter>
                                    <Spacer isBasic />
                                    {
                                        // loadingMore ?
                                        currentPage < totalPages ?
                                            <Loaders.BoxSmall
                                            />
                                            :
                                            <Text isRegular isGray>No More Posts</Text>
                                    }
                                    <Spacer isDoubleBase />
                                </Wrapper>
                            </>
                            :
                            <Wrapper alignItemsCenter>
                                <Spacer height={height(20)} />
                                <Common.NoDataViewPrimary
                                    //title='No Posts Found'
                                    text='No Posts Found'
                                />
                            </Wrapper>
                        :
                        <Wrapper alignItemsCenter>
                            <Spacer height={height(20)} />
                            <Loaders.Boxes
                                size={totalSize(8)}
                            />
                        </Wrapper>
                    // <Wrapper alignItemsCenter>
                    //     <Spacer height={height(20)} />
                    //     {
                    //         !loadingGetPosts ?
                    //             <Common.NoDataViewPrimary
                    //                 //title='No Posts Found'
                    //                 text='No Posts Found'
                    //             />
                    //             :
                    //             <Loaders.Boxes
                    //                 size={totalSize(7)}
                    //             />
                    //     }
                    // </Wrapper>
                }
            </ScrollView>

            <Modals.PopupPrimary
                topMargin={height(70)}
                visible={isStopSupportingPopupVisible}
                toggle={toggleStopSupportingPopup}
                title={'Stop supporting\nthis author?'}
                buttonText1='No'
                buttonText2={'Yes'}
                onPressButton1={() => {
                    toggleStopSupportingPopup()
                }}
                onPressButton2={handleUnsubscribe}
                loadingButton2={loadingUnsubscribe}
            //buttonsDirection='row'
            />
        </Wrapper>
    )
}
