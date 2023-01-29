import React, { Component, useEffect, useState } from 'react';
import { View, ActivityIndicator, Pressable } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { useSelector } from 'react-redux';
import { Common, Headers, Loaders, ScrollViews, Spacer, TextInputs, Wrapper, Text, Buttons } from '../../../components';
import { goBack, navigate } from '../../../navigation/rootNavigation';
import { Api, appStyles, colors, DummyData, HelpingMethods, routes, sizes } from '../../../services';
import { setPosts } from '../../../services/store/actions';

export default function Index({ navigation, route }) {
    const { setParams } = navigation
    const postData = route?.params?.data || null
    const postId = route?.params?.postId || null
    const isWritingComment = route?.params?.writeComment || false
    const selectedComment = route?.params?.comment || null
    const lastScreen = route?.params?.lastScreen || null
    // const {
    //     _id,
    //     creator, createdAt, content,
    //     likes, comments, isLiked,
    //     type, group,
    //     images, videos
    // } = postData

    //const name = creator?.firstName + ' ' + creator?.lastName
    const isHomeScreensPost = lastScreen === routes.home

    //Redux states
    const app = useSelector(state => state.app)
    const { posts } = app

    //local states
    const [commentText, setCommentText] = useState('')
    const [loadingAddComment, setLoadingAddComment] = useState(false)


    // const postComments = [...DummyData.comments.slice(), ...DummyData.comments.slice()]
    useEffect(() => {
        handleGetPostDetail()

    }, [])

    useEffect(() => {
        handleGetSetEditComment()
    }, [selectedComment])

    const handleGetSetEditComment = () => {
        if (selectedComment) {
            setCommentText(selectedComment?.content)
            setParams({ writeComment: true })
        }
    }

    const handleGetPostDetail = async () => {
        if (postId) {
            await Api.GetPostDetail({ postId })
                .then(res => {
                    if (res) {
                        setParams({ data: res.data })
                    }
                })
        }
    }
    const handleUpdatePost = (updatedPost) => {
        const tempPost = posts.find(item => item._id === postData?._id)
        const tempPosts = posts.slice()
        if (tempPost) {
            const tempPostIndex = posts.indexOf(tempPost)
            if (tempPostIndex >= 0) {
                tempPosts[tempPostIndex] = updatedPost
                setPosts(tempPosts)
            }
        }
    }
    const handleLikeDislikePost = async () => {
        await HelpingMethods.handleLikeDislikePost(postData).
            then(res => {
                if (res) {
                    const updatedPost = res.data
                    setParams({ data: updatedPost })
                    handleUpdatePost(updatedPost)
                }
            })
    }

    const handleAddComment = async () => {
        console.log('handleAddComment')
        if (commentText) {
            setLoadingAddComment(true)
            await Api.CommentPost({ postId: postData?._id, comment: commentText }).
                then(res => {
                    if (res) {
                        const updatedPost = res.data
                        setCommentText('')
                        setParams({ writeComment: false, data: updatedPost })
                        handleUpdatePost(updatedPost)
                    }
                })
            setLoadingAddComment(false)
        }
    }

    const handleCommentInput = () => {
        if (!isWritingComment) {
            setParams({ writeComment: true })
        } else {
            setParams({ writeComment: false })
            setCommentText('')
            if (selectedComment) {
                setParams({ comment: null })
            }
        }
    }
    const onPressEditComment = (data) => {
        const { post, comment } = data
        setParams({ comment: comment })
    }
    const handleUpdateComment = async () => {
        console.log('handleUpdateComment')
        if (commentText && selectedComment) {
            setLoadingAddComment(true)
            await Api.updatePostComment({ postId: postData?._id, commentId: selectedComment?._id, comment: commentText }).
                then(res => {
                    if (res) {
                        const updatedPost = res.data
                        setCommentText('')
                        setParams({ writeComment: false, data: updatedPost })
                        handleUpdatePost(updatedPost)
                    }
                })
            setLoadingAddComment(false)
        }

    }

    const handleCommentDeleted = (data) => {
        const { post, comment } = data
        let updatedPostComments = post?.comments?.filter(item => item != comment)
        let updatedPost = { ...post, comments: updatedPostComments }
        setParams({ data: updatedPost })
        handleUpdatePost(updatedPost)
    }
    const handlePostDeleted = (data) => {
        const post = data
        //updating home posts
        let tempPosts = posts.filter(item => item._id != post._id)
        setPosts(tempPosts)
        goBack()
    }
    const handleOnPostUpdate = (data) => {
        const updatedPost = data
        setParams({ data: updatedPost })
    }
    if (!postData) {
        return (
            <Loaders.Boxes
                size={totalSize(10)}
            />
        )
    }
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'Post By ' + postData ? postData?.creator?.firstName + ' ' + postData?.creator?.lastName : ''}
                showBackArrow
                alignTitleLeft
            />
            <ScrollViews.WithKeyboardAvoidingView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='handled'
                footer={
                    isWritingComment ?
                        <Wrapper background1 paddingVerticalSmall style={[appStyles.shadowLight]}>
                            <TextInputs.Colored
                                placeholder={'Write a comment'}
                                value={commentText}
                                autoFocus
                                onBlur={() => {
                                    setParams({ writeComment: false })
                                }}
                                onChangeText={t => setCommentText(t)}
                                inputStyle={[appStyles.textMedium,
                                appStyles.paddingHorizontalSmall,
                                { height: null }]}
                                // inputTextStyle={[appStyles.textSmall, appStyles.textGray]}
                                containerStyle={[appStyles.marginHorizontalSmall, {}]}
                                inputContainerStyle={[{ borderRadius: sizes.inputRadius, borderWidth: 1, borderColor: colors.appBgColor3, },
                                appStyles.paddingVerticalSmall,
                                appStyles.alignItemsFlexEnd]}
                                //onPress={onPressCommentInput}
                                multiline
                                iconNameRight={'send'}
                                iconColorRight={commentText ? colors.appTextColor1 : colors.appTextColor5}
                                onPressIconRight={handleAddComment}
                                right={
                                    loadingAddComment ?
                                        <Wrapper style={{ marginRight: sizes.marginHorizontal }}>
                                            <ActivityIndicator
                                                size={'small'}
                                                color={colors.appTextColor4}
                                            />
                                        </Wrapper>
                                        :
                                        selectedComment ?
                                            <Wrapper style={{ marginRight: sizes.marginHorizontal / 2 }}>
                                                <Buttons.ColoredSmall
                                                    onPress={handleUpdateComment}
                                                    text={'Update'}
                                                    textStyle={[appStyles.textTiny, appStyles.fontBold, appStyles.textWhite]}
                                                    buttonStyle={[appStyles.paddingHorizontalTiny, appStyles.paddingVerticalTiny, { backgroundColor: colors.appBgColor6, borderRadius: sizes.buttonRadius / 2 }]}
                                                />
                                            </Wrapper>
                                            :
                                            null
                                }
                            />
                        </Wrapper>
                        :
                        null
                }
            >
                <Spacer isBasic />
                <Common.PostPrimary
                    userImage={postData?.creator?.avatar}
                    userName={postData ? postData?.creator?.firstName + ' ' + postData?.creator?.lastName : ''}
                    date={postData?.createdAt}
                    description={postData?.content}
                    images={postData?.images}
                    videos={postData?.videos}
                    postId={postData?._id}
                    // likesCount={likes_count}
                    // commentsCount={comments_count}
                    likes={postData?.likes}
                    comments={postData?.comments}
                    isLiked={HelpingMethods.isPostLiked(postData?.likes)}
                    fundraiserProjectDetail={postData?.fundraising}
                    showBadge
                    //onPress={() => { }}
                    postType={postData?.type}
                    group={postData?.group}
                    onPressUser={() => navigate(routes.userDetail, { data: postData?.creator })}
                    onPressGroup={() => navigate(routes.groupDetail, { data: postData?.group })}
                    onPressDots={() => navigate(routes.postMenu, {
                        data: postData,
                        handlePostDeleted: data => handlePostDeleted(data),
                        onPostUpdate: handleOnPostUpdate
                    })}
                    onPressLike={handleLikeDislikePost}
                    handleCommentDeleted={handlePostDeleted}
                    onPressCommentInput={handleCommentInput}
                    hideCommentInput={isWritingComment}
                    hideComments={true}
                    onPressFund={() =>
                        navigate(
                            routes.fundRaisingProjectDetail,
                            { data: postData, }
                        )}
                />
                <Spacer isBasic />
                <Common.CommentsPrimary
                    data={postData?.comments}
                    onPressItem={(item, index) => navigate(routes.userDetail, { data: item.creator })}
                    onPressDots={(commentItem, commentIndex) => {
                        navigate(
                            routes.commentMenu,
                            {
                                post: postData,
                                comment: commentItem,
                                onPressEdit: (data) => onPressEditComment(data),
                                handleDelete: (data) => handleCommentDeleted(data)
                            }
                        )
                    }}
                />
                <Spacer isDoubleBase />
                {
                    isWritingComment ?
                        <Wrapper isAbsoluteFill style={{ backgroundColor: colors.appBgColor6 + '40' }}>
                            <Pressable
                                style={{ flex: 1 }}
                                onPress={handleCommentInput}
                            />
                        </Wrapper>
                        :
                        null
                }
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}
