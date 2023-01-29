import { useFocusEffect } from '@react-navigation/native';
import React, { Component, useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View, } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { Common, Spacer, TextInputs, Wrapper, Text, Icons, Lines, ScrollViews, Loaders } from '../../../components';
import { navigate } from '../../../navigation/rootNavigation';
import { Api, appStyles, colors, DummyData, fontSize, get_groups_types, HelpingMethods, routes, sizes } from '../../../services';
const topTabs = [{ label: 'For You' }, { label: 'Discover' }, { label: 'Your Groups' }]

export default function Index() {

    //Redux states
    const app = useSelector(state => state.app)
    const { posts } = app




    //local states
    const [selectedTopTabIndex, setTopTabIndex] = useState(0)
    const [forYouGroups, setForYouGroups] = useState(null)
    const [forYouPosts, setForYouPosts] = useState(null)
    const [suggestedGroups, setSuggestedGroups] = useState(null)
    const [yourGroups, setYourGroups] = useState(null)
    const [loadingGetData, setLoadingGetData] = useState(false)
    const [forYouPostsTotalPages, setForYouPostsTotalPages] = useState(1)
    const [forYouPostsCurrentPage, setForYouPostsCurrentPage] = useState(1)
    const [loadingMoreForYouPosts, setLoadingMoreForYouPosts] = useState(false)
    const [loadingRefreshForYouPosts, setLoadingRefreshForYouPosts] = useState(false)


    const isForYouTab = selectedTopTabIndex === 0
    const isDiscoverTab = selectedTopTabIndex === 1
    const isYourGroupsTab = selectedTopTabIndex === 2

    useFocusEffect(useCallback(() => {
        handleGetData()
    }, [selectedTopTabIndex]))

    const handleGetData = async () => {
        setLoadingGetData(true)
        if (isForYouTab) {
            await handleGetForYouGroups()
            await handleGetForYouPosts()
        } else if (isDiscoverTab) {
            await handleGetSuggestedGroups()
        } else if (isYourGroupsTab) {
            await handleGetYourGroups()
        }
        setLoadingGetData(false)
    }

    const handleGetForYouGroups = async () => {
        await Api.getGroups({ type: get_groups_types.forYou }).
            then(res => {
                if (res) {
                    setForYouGroups(res.data)
                }
            })
    }
    const handleGetForYouPosts = async () => {
        await Api.getAllJoinedGroupsPosts({}).
            then(res => {
                if (res) {
                    setForYouPosts(res.data.data)
                    setForYouPostsTotalPages(res.data.pages)
                    setForYouPostsCurrentPage(1)
                }
            })
    }

    const handleLoadMoreForYouPosts = async ({ nativeEvent }) => {
        const endReached = HelpingMethods.isCloseToBottom(nativeEvent)
        if (endReached && !loadingMoreForYouPosts && (forYouPostsCurrentPage < forYouPostsTotalPages) && forYouPosts?.length) {
            console.log('load more videos')
            setLoadingMoreForYouPosts(true)
            await Api.getAllJoinedGroupsPosts({ page: forYouPostsCurrentPage + 1 }).
                then(res => {
                    if (res) {
                        const newPosts = [...forYouPosts, ...res.data.data]
                        console.log('newPosts: ', newPosts)
                        setForYouPosts(newPosts)
                        setForYouPostsCurrentPage(res.data.page)
                    }
                })
            setLoadingMoreForYouPosts(false)
        }
    }
    const handleRefreshForYouPosts = async () => {
        setLoadingRefreshForYouPosts(true)
        await handleGetForYouPosts()
        setLoadingRefreshForYouPosts(false)
    
      }
    const handleGetSuggestedGroups = async () => {
        await Api.getGroups({ type: get_groups_types.discover }).
            then(res => {
                if (res) {
                    setSuggestedGroups(res.data)
                }
            })
    }
    const handleGetYourGroups = async () => {
        await Api.getGroups({ type: get_groups_types.yourGroups }).
            then(res => {
                if (res) {
                    setYourGroups(res.data)
                }
            })
    }

    const handleLikeDislikePost = async (item, index) => {
        await HelpingMethods.handleLikeDislikePost(item, index).
            then(res => {
                if (res) {
                    let tempPosts = forYouPosts.slice()
                    tempPosts[index] = res.data
                    setForYouPosts(tempPosts)
                }
            })
    }
    const handlePressCommentInput = (item, index) => {
        navigate(routes.postDetail, { data: item, writeComment: true, })
    }
    const handleOnPressEditComment = (data) => {
        const { post, comment } = data
        navigate(routes.postDetail, { data: post, comment, writeComment: true, lastScreen: routes.home })
    }
    const handleCommentDeleted = (data) => {
        const { post, comment } = data
        let tempPostNewComments = post?.comments?.filter(item => item != comment)
        let tempNewPost = { ...post, comments: tempPostNewComments }
        let tempPosts = forYouPosts.slice()
        let tempPostIndex = forYouPosts.indexOf(post)
        if (tempPostIndex >= 0) {
            tempPosts[tempPostIndex] = tempNewPost
            setForYouPosts(tempPosts)
        }
    }
    const handlePostDeleted = (data) => {
        const post = data
        let tempPosts = forYouPosts.filter(item => item != post)
        setForYouPosts(tempPosts)
    }
    return (
        <Wrapper isMain>
            <Spacer isStatusBarHeigt />
            <TextInputs.SearchBar
                placeholder={'Search people and groups'}
                onPress={() => {
                    navigate(routes.searchResults, { searchPlaceholder: 'Search people and groups' })
                }}
                inputTextStyle={{ fontSize: fontSize.regular }}
            />
            <Spacer isSmall />
            <Common.ButtonsGroupPrimary
                data={topTabs}
                initalIndex={selectedTopTabIndex}
                onPressButton={(item, index) => setTopTabIndex(index)}
                activeTextStyle={[appStyles.textRegular, appStyles.textWhite]}
                inActiveTextStyle={[appStyles.textRegular, appStyles.textPrimaryColor]}
                inActiveButtonStyle={[{ borderRadius: sizes.cardRadius, backgroundColor: colors.transparent, borderWidth: 1, borderColor: colors.appColor1 }, appStyles.paddingHorizontalSmall, appStyles.paddingVerticalSmall]}
                activeButtonStyle={{ borderRadius: sizes.cardRadius }}
            />
            <Spacer isBasic />
            {
                isForYouTab ?
                    <ForYou
                        groups={forYouGroups}
                        posts={forYouPosts}
                        onPressLike={handleLikeDislikePost}
                        onPressCommentInput={handlePressCommentInput}
                        handleOnPressEditComment={handleOnPressEditComment}
                        handleCommentDeleted={handleCommentDeleted}
                        handlePostDeleted={handlePostDeleted}
                        //
                        currentPage={forYouPostsCurrentPage}
                        totalPages={forYouPostsTotalPages}
                        loadingMore={loadingMoreForYouPosts}
                        handleLoadMore={handleLoadMoreForYouPosts}
                        //
                        handleRefresh={handleRefreshForYouPosts}
                        isRefreshing={loadingRefreshForYouPosts}
                    />
                    :
                    isDiscoverTab ?
                        <Discover
                            suggestedGroups={suggestedGroups}
                        />
                        :
                        isYourGroupsTab ?
                            <YourGroups
                                yourGroups={yourGroups}
                            />
                            :
                            null
            }

        </Wrapper>
    )
}
const ForYou = ({
    groups, posts, onPressLike, handlePostDeleted,
    onPressCommentInput, handleOnPressEditComment, handleCommentDeleted,

    //
    currentPage, totalPages, loadingMore, handleLoadMore,
    //
    handleRefresh,isRefreshing
}) => {
    const Title = ({ title, rightTitle, onPressRightTitle }) => (
        <Wrapper flexDirectionRow justifyContentSpaceBetween marginHorizontalBase>
            <Text isTinyTitle>{title}</Text>
            <Icons.WithText
                iconName={'plus'}
                iconType='font-awesome'
                iconSize={totalSize(1)}
                tintColor={colors.appColor1}
                text={` ${rightTitle}`}
                onPress={onPressRightTitle}
                textContainerStyle={{ marginHorizontal: 0, }}
                textStyle={[appStyles.textSmall, appStyles.fontBold, appStyles.textPrimaryColor]}
            />
        </Wrapper>
    )
    return (
        <Wrapper flex={1}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={handleLoadMore}
                scrollEventThrottle={16}
                refreshControl={
                    <RefreshControl
                      refreshing={isRefreshing}
                      onRefresh={handleRefresh}
                    />
                  }
            >
                {
                    groups ?
                        groups?.length ?
                            <>
                                <Title
                                    title={'Groups'}
                                    rightTitle={'Create Group'}
                                    onPressRightTitle={() => navigate(routes.createGroup)}
                                />
                                <Spacer isSmall />
                                <Wrapper>
                                    <Common.GroupsPrimaryHorizontal
                                        data={groups}
                                        onPressItem={(item, index) => navigate(routes.groupDetail, { data: item })}
                                    />
                                </Wrapper>
                            </>
                            :
                            <Common.NoDataViewPrimary
                                containerStyle={[appStyles.center, appStyles.marginVerticalLarge]}
                                iconName='group-add'
                                iconType='material'
                                title='Create Group'
                                text='Tap to create a new group'
                                onPress={() => navigate(routes.createGroup)}
                            />
                        :
                        <Wrapper style={[appStyles.alignItemsCenter, appStyles.marginVerticalLarge]}>
                            <Loaders.BoxSmall />
                        </Wrapper>
                }

                <Spacer isSmall />
                <Lines.Horizontal height={height(0.5)} color={colors.appBgColor2} />
                {
                    posts ?
                        posts?.length ?
                            <>
                                <Wrapper marginVerticalSmall>
                                    <Title
                                        title={'Posts'}
                                        rightTitle={'Create Post'}
                                        onPressRightTitle={() => navigate(routes.shareSomethingRoutes.sharePost)}
                                    />
                                </Wrapper>
                                <Common.PostsPrimary
                                    data={posts}
                                    onPressItem={(item, index) => navigate(routes.postDetail, { data: item })}
                                    //onPressUser={(item, index) => navigate(routes.postDetail, { data: item.user })}
                                    onPressUser={(item, index) => navigate(routes.postDetail, { data: item })}
                                    onPressLike={onPressLike}
                                    handlePostDeleted={handlePostDeleted}
                                    onPressCommentInput={onPressCommentInput}
                                    // onPressFund={(item, index) => {
                                    //     navigate(
                                    //       routes.fundRaisingProjectDetail,
                                    //       {
                                    //         data: item,
                                    //         lastScreen: routes.social
                                    //       }
                                    //     )
                                    //   }}
                                    onPressComment={onPressCommentInput}
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
                            <Common.NoDataViewPrimary
                                containerStyle={[appStyles.center, appStyles.marginVerticalLarge]}
                                iconName='post-add'
                                iconType='material'
                                title='Create Post'
                                text='Tap to create a new post'
                                onPress={() => navigate(routes.shareSomethingRoutes.sharePost)}
                            />
                        :
                        <Wrapper style={[appStyles.alignItemsCenter, appStyles.marginVerticalLarge]}>
                            <Loaders.BoxSmall />
                        </Wrapper>
                }
            </ScrollView>
        </Wrapper>
    )
}

const Discover = ({ suggestedGroups }) => {
    return (
        <Wrapper flex={1}>


            {
                suggestedGroups ?
                    suggestedGroups?.length ?
                        <ScrollViews.WithKeyboardAvoidingView>
                            <Wrapper marginHorizontalBase>
                                <Text isTinyTitle>Suggested Groups</Text>
                            </Wrapper>
                            <Spacer isSmall />
                            <Common.GroupsPrimaryVertical
                                data={suggestedGroups}
                                onPressItem={(item, index) => navigate(routes.groupDetail, { data: item })}
                            />
                        </ScrollViews.WithKeyboardAvoidingView>
                        :
                        < Common.NoDataViewPrimary
                            containerStyle={[appStyles.mainContainer, appStyles.center]}
                            iconName='account-group-outline'
                            iconType='material-community'
                            title='No Suggested Groups Yet'
                            text='Explore the app to see the suggesions'
                            onPress={() => navigate(routes.AddSuppportPackage)}
                        />
                    :
                    <Loaders.Boxes
                        size={totalSize(5)}
                    />
            }

        </Wrapper>
    )
}

const YourGroups = ({ yourGroups }) => {
    return (
        <Wrapper flex={1}>
            {
                yourGroups ?
                    <ScrollViews.WithKeyboardAvoidingView>
                        <Wrapper marginHorizontalBase>
                            <Text isTinyTitle>Groups You Manage</Text>
                        </Wrapper>
                        <Spacer isSmall />
                        <Common.GroupsPrimaryVertical
                            data={yourGroups}
                            onPressItem={(item, index) => navigate(routes.groupDetail, { data: item, myGroup: true })}
                            onPressCreateNewGroup={() => navigate(routes.createGroup)}
                        />
                    </ScrollViews.WithKeyboardAvoidingView>
                    :
                    <Loaders.Boxes
                        size={totalSize(5)}
                    />
            }
        </Wrapper>
    )
}
