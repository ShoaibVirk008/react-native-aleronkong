import React, { Component, useCallback, useEffect, useState } from 'react';
import { Image } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { Buttons, Icons, ScrollViews, Spacer, StatusBars, Wrapper, Text, Common, Loaders } from '../../../components';
import { goBack, navigate } from '../../../navigation/rootNavigation';
import { Api, appImages, appStyles, colors, DummyData, HelpingMethods, routes, sizes } from '../../../services';
import SeeMore from 'react-native-see-more-inline';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

export default function Index({ navigation, route }) {
    //const isMyGroup = route?.params?.myGroup || false
    const groupData = route?.params?.data || null

    //Redux states
    const currentUser = useSelector(state => state.user.currentUser)


    const [groupDetail, setGroupDetail] = useState(null)
    const [loadingJoinGroup, setLoadingJoinGroup] = useState(false)

    const isJoined = groupDetail && HelpingMethods.isGroupJoined(groupDetail.members)
    const isJoinRequestSent = groupDetail && HelpingMethods.isGroupJoinRequestSent(groupDetail.requests)
    const isMyGroup = groupDetail?.creator === currentUser._id
    useFocusEffect(useCallback(() => {
        handleGetGroupDetail()
    }, []))

    const handleGetGroupDetail = () => {
        Api.getGroupDetail({ groupId: groupData?._id }).
            then(res => {
                if (res) {
                    setGroupDetail(res.data)
                }
            })
    }

    const handleLikeDislikePost = async (item, index) => {
        await HelpingMethods.handleLikeDislikePost(item, index).
            then(res => {
                if (res) {
                    let tempPosts = groupDetail.posts.slice()
                    tempPosts[index] = res.data
                    setGroupDetail({ ...groupDetail, posts: tempPosts })
                }
            })
    }
    const handlePressCommentInput = (item, index) => {
        navigate(routes.postDetail, { data: item, writeComment: true, lastScreen: routes.home })
    }

    const handleJoinGroup = async () => {
        setLoadingJoinGroup(true)
        await Api.joinGroup({ groupId: groupDetail._id })
            .then(res => {
                if (res) {
                    //setJoinRequestSent(true)
                    setGroupDetail({
                        ...groupDetail,
                        requests: res.data.requests,
                        members: res.data.members
                    })
                }
            })
        setLoadingJoinGroup(false)
    }

    const handleOnPressEditComment = (data) => {
        const { post, comment } = data
        navigate(routes.postDetail, { data: post, comment, writeComment: true, lastScreen: routes.home })
    }
    const handleCommentDeleted = (data) => {
        const { post, comment } = data
        let tempPostNewComments = post?.comments?.filter(item => item != comment)
        let tempNewPost = { ...post, comments: tempPostNewComments }
        let tempPosts = groupDetail?.posts.slice()
        let tempPostIndex = groupDetail?.posts.indexOf(post)
        if (tempPostIndex >= 0) {
            tempPosts[tempPostIndex] = tempNewPost
            setGroupDetail({ ...groupDetail, posts: tempPosts })
        }
    }
    const handlePostDeleted = (data) => {
        const post = data
        let tempPosts = groupDetail?.posts.filter(item => item != post)
        setGroupDetail({ ...groupDetail, posts: tempPosts })
    }
    const JoinButton = () => {
        if (!isJoined) {
            return <></>
        }
        return (
            <Buttons.ColoredSmall
                text={'Joined'}
                buttonStyle={[{ borderRadius: 100, backgroundColor: colors.appBgColor1, borderWidth: 1, borderColor: colors.appColor1 }, appStyles.paddingHorizontalTiny,]}
                textStyle={[appStyles.textRegular, appStyles.fontBold, appStyles.textPrimaryColor]}
            // onPress={() => setJoined(!isJoined)}
            />
        )
    }


    if (!groupDetail) {
        return (
            <Loaders.Boxes />
        )
    }
    return (
        <Wrapper isMain>
            <Spacer isStatusBarHeigt />
            <Wrapper flex={1}>
                <ScrollViews.WithKeyboardAvoidingView>
                    <Wrapper style={{ height: height(20) }}>
                        <Image
                            source={{ uri: groupDetail?.coverPhoto }}
                            style={{ flex: 1, width: null, height: null }}
                        />
                    </Wrapper>
                    <Wrapper marginHorizontalBase flexDirectionRow alignItemsFlexEnd justifyContentSpaceBetween style={{ marginTop: -height(10) }}>
                        <Wrapper background1 style={{ height: height(12), width: height(12), borderRadius: sizes.cardRadius / 2, borderWidth: 1, borderColor: colors.appBgColor1 }}>
                            <Image
                                source={{ uri: groupDetail?.profilePhoto }}
                                style={{ flex: 1, width: null, height: null, borderRadius: sizes.cardRadius / 2 }}
                            />
                        </Wrapper>
                        {
                            isMyGroup ?
                                <Buttons.ColoredSmall
                                    text={'Manage'}
                                    buttonStyle={[{ borderRadius: 100, }, appStyles.paddingHorizontalTiny]}
                                    textStyle={[appStyles.textRegular, appStyles.fontBold, appStyles.textWhite]}
                                    onPress={() => navigate(routes.groupDetailManage, { data: groupDetail })}
                                />
                                :
                                <JoinButton />
                        }
                    </Wrapper>
                    <Spacer isSmall />
                    <Wrapper marginHorizontalBase>
                        <Text isTinyTitle>{groupDetail?.name}</Text>
                        <Spacer isSmall />
                        <SeeMore
                            numberOfLines={3}
                            seeMoreText='See more'
                            seeLessText='See Less'
                        >
                            {groupDetail?.description}
                        </SeeMore>
                    </Wrapper>
                    <Spacer isSmall />
                    {
                        isMyGroup || isJoined ?
                            <>
                                <Common.ShareSomething
                                    onPress={() => navigate(routes.shareSomethingRoutes.sharePost, { group: groupDetail })}
                                    imageUrl={currentUser.avatar}
                                />
                                <Spacer isSmall />
                                {
                                    groupDetail?.posts?.length ?
                                        < Common.PostsPrimary
                                            data={groupDetail?.posts}
                                            onPressItem={(item, index) => navigate(routes.postDetail, { data: item })}
                                            //onPressUser={(item, index) => navigate(routes.userDetail, { data: item.user })}
                                            onPressUser={(item, index) => navigate(routes.postDetail, { data: item })}
                                            // onPressFund={(item, index) => {
                                            //     navigate(
                                            //         routes.fundRaisingProjectDetail,
                                            //         {
                                            //             data: item,
                                            //             lastScreen: routes.groupDetail
                                            //         }
                                            //     )
                                            // }}
                                            onPressLike={handleLikeDislikePost}
                                            handlePostDeleted={handlePostDeleted}
                                            onPressCommentInput={handlePressCommentInput}
                                            onPressComment={handlePressCommentInput}
                                            onPressEditComment={handleOnPressEditComment}
                                            handleCommentDeleted={handleCommentDeleted}
                                        />
                                        :
                                        <Common.NoDataViewPrimary
                                            containerStyle={[appStyles.center, appStyles.marginVerticalLarge]}
                                            iconName='post'
                                            iconType='material-community'
                                            title='No Posts Yet'
                                            text='Tap to create a new post'
                                            onPress={() => navigate(routes.shareSomethingRoutes.sharePost, { group: true })}
                                        />
                                }

                            </>
                            :
                            <JoinGroup
                                onPressJoinGroup={handleJoinGroup}
                                isJoinRequestSent={isJoinRequestSent}
                                loading={loadingJoinGroup}
                            />
                    }
                </ScrollViews.WithKeyboardAvoidingView>
                <Wrapper isAbsolute style={{ top: sizes.baseMargin, left: sizes.marginHorizontal, right: sizes.marginHorizontal }}>
                    <Wrapper flexDirectionRow justifyContentSpaceBetween >
                        <Icons.Button
                            iconName={'chevron-back'}
                            iconType={'ionicon'}
                            isRound
                            buttonSize={sizes.icons.large}
                            iconSize={sizes.icons.medium}
                            shadow
                            onPress={goBack}
                            iconColor={colors.appTextColor1}
                        />
                        {
                            isJoined ?
                                <Icons.Button
                                    iconName={'dots-vertical'}
                                    iconType={'material-community'}
                                    isRound
                                    buttonSize={sizes.icons.large}
                                    iconSize={sizes.icons.medium}
                                    shadow
                                    onPress={() => navigate(routes.groupDetailMenu, { data: groupDetail })}
                                    iconColor={colors.appTextColor1}
                                />
                                :
                                null
                        }
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        </Wrapper>
    )
}

const JoinGroup = ({ onPressJoinGroup, isJoinRequestSent, loading }) => {
    return (
        <Wrapper >
            <Common.NoDataViewPrimary
                containerStyle={[appStyles.center, { marginVertical: height(10) }]}
                iconName='group-add'
                iconType='material'
                title={!isJoinRequestSent ? 'Join Group' : 'Join Request Sent'}
                text={!isJoinRequestSent ? 'Please join the group to see the posts' : 'Please wait until your join request will be approved'}
                onPress={() => navigate(routes.shareSomethingRoutes.sharePost, { group: true })}
            />
            <Spacer height={height(10)} />
            <Buttons.Colored
                text={'Join Group'}
                buttonStyle={[appStyles.marginHorizontalMedium,
                isJoinRequestSent && { backgroundColor: colors.appBgColor4 }]}
                onPress={onPressJoinGroup}
                disabled={isJoinRequestSent}
                isLoading={loading}
            />
            <Spacer isDoubleBase />
        </Wrapper>
    )
}
