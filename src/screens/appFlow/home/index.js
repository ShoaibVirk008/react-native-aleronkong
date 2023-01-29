import React, { Component, useEffect, useState } from 'react';
import { View, Image, ScrollView, Pressable, RefreshControl } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { useSelector } from 'react-redux';
import { Loaders, Wrapper, Text, Spacer, Icons, Logos, Images, Lines, Cards, ScrollViews, TextInputs, Common } from '../../../components';
import { navigate } from '../../../navigation/rootNavigation';
import { Api, appIcons, appImages, appStyles, colors, DummyData, HelpingMethods, post_types, routes, sizes } from '../../../services';
import { setPosts } from '../../../services/store/actions';

export default function Home({ navigation }) {
  const { replace } = navigation
  const tempPosts = DummyData.posts.slice()

  //local states
  const [isLoadingGetData, setLoadingGetData] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [loadingRefresh, setLoadingRefresh] = useState(false)
  //const [posts, setPosts] = useState([])

  //Redux states
  const user = useSelector(state => state.user)
  const app = useSelector(state => state.app)
  const { currentUser } = user
  const { posts } = app
  const { unReadNotifications, unReadMessages, cartItems, isGuildMember } = currentUser
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    await Api.GetHomePosts({}).
      then(res => {
        if (res) {
          setPosts(res.data.data)
          //setPosts([])
          setTotalPages(res.data.pages)
          setCurrentPage(1)
        }
      })
  }

  const handleLoadMore = async ({ nativeEvent }) => {
    const endReached = HelpingMethods.isCloseToBottom(nativeEvent)
    if (endReached && !loadingMore && (currentPage < totalPages) && posts?.length) {
      console.log('load more videos')
      setLoadingMore(true)
      await Api.GetHomePosts({ page: currentPage + 1 }).
        then(res => {
          if (res) {
            const newPosts = [...posts, ...res.data.data]
            console.log('newPosts: ', newPosts)
            setPosts(newPosts)
            setCurrentPage(res.data.page)
          }
        })
      setLoadingMore(false)
    }
  }
  const handleLikeDislikePost = async (item, index) => {
    await HelpingMethods.handleLikeDislikePost(item, index).
      then(res => {
        if (res) {
          let tempPosts = posts.slice()
          tempPosts[index] = res.data
          setPosts(tempPosts)
        }
      })
  }
  const handlePressCommentInput = (item, index) => {
    navigate(routes.postDetail, { data: item, writeComment: true, lastScreen: routes.home })
  }
  const handleOnPressEditComment = (data) => {
    const { post, comment } = data
    navigate(routes.postDetail, { data: post, comment, writeComment: true, lastScreen: routes.home })
  }
  const handleCommentDeleted = (data) => {
    const { post, comment } = data
    let tempPostNewComments = post?.comments?.filter(item => item != comment)
    let tempNewPost = { ...post, comments: tempPostNewComments }
    let tempPosts = posts.slice()
    let tempPostIndex = posts.indexOf(post)
    if (tempPostIndex >= 0) {
      tempPosts[tempPostIndex] = tempNewPost
      setPosts(tempPosts)
    }
  }
  const handlePostDeleted = (data) => {
    const post = data
    let tempPosts = posts.filter(item => item != post)
    setPosts(tempPosts)
  }
  const handleRefresh = async () => {
    setLoadingRefresh(true)
    await getData()
    setLoadingRefresh(false)

  }
  return (
    <Wrapper isMain >
      <Header
        isGuildMember={isGuildMember}
        unReadNotifications={unReadNotifications}
        unReadMessages={unReadMessages}
        cartItems={cartItems}
      />
      <Lines.Horizontal />
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleLoadMore}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={loadingRefresh}
            onRefresh={handleRefresh}
          />
        }
      >
        <Spacer isSmall />
        <Common.ShareSomething
          onPress={() => navigate(routes.shareSomethingRoutes.shareSomething)}
          imageUrl={currentUser.avatar}
        />
        <Spacer isBasic />
        {

          posts?.length ?
            <>
              <Common.PostsPrimary
                data={posts}
                onPressItem={(item, index) => {
                  navigate(routes.postDetail, { data: item, lastScreen: routes.home })
                }}
                // onPressUser={(item, index) => navigate(routes.userDetail, { data: item.creator })}
                onPressUser={(item, index) => {
                  navigate(routes.postDetail, { data: item, lastScreen: routes.home })
                }}
                onPressFund={(item, index) => {
                  navigate(
                    routes.fundRaisingProjectDetail,
                    {
                      data: item,
                      lastScreen: routes.home
                    }
                  )
                }}
                onPressLike={handleLikeDislikePost}
                handlePostDeleted={handlePostDeleted}
                //comments
                onPressCommentInput={handlePressCommentInput}
                onPressComment={handlePressCommentInput}
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
            <Wrapper style={{}}>
              <Spacer height={height(20)} />
              <Common.NoDataViewPrimary
                iconName='post-outline'
                iconType='material-community'
                text='No Posts to Show yet'
              //text='Explore the app to see the posts'
              />
            </Wrapper>
        }



      </ScrollView>
      <Loaders.BoxesAbsolute
        isVisible={!posts}
      />
    </Wrapper>
  );
}



const Header = ({ isGuildMember, unReadNotifications, unReadMessages, cartItems, }) => {
  return (
    <Wrapper>
      <Spacer height={sizes.statusBarHeight / 1.5} />
      <Wrapper alignItemsCenter marginHorizontalSmall flexDirectionRow >
        <Wrapper flexDirectionRow alignItemsCenter>
          {
            isGuildMember ?
              <>
                <Icons.Button
                  customIcon={appIcons.crown}
                  buttonColor={colors.appColor5}
                  buttonSize={totalSize(3.5)}
                  iconSize={totalSize(2)}
                  isRound
                />
                <Spacer isBasic horizontal />
              </>
              :
              null
          }
          <Logos.Primary
            size={width(15)}
            invertColors
          />
        </Wrapper>
        <Wrapper flex={1} />
        <Wrapper flexDirectionRow alignItemsCenter>
          <Common.IconButtonBadge
            iconName={'shopping-cart'}
            iconType='feather'
            badgeValue={cartItems || ''}
            onPress={() => navigate(routes.cart)}
          />
          <Spacer isSmall horizontal />
          <Common.IconButtonBadge
            iconName={'bell'}
            iconType='feather'
            badgeValue={unReadNotifications || ''}
            onPress={() => navigate(routes.notifications)}
          />
          <Spacer isSmall horizontal />
          <Common.IconButtonBadge
            iconName={'message-circle'}
            iconType='feather'
            badgeValue={unReadMessages || ''}
            onPress={() => navigate(routes.messages)}
          />
        </Wrapper>
      </Wrapper>
    </Wrapper >
  )
}





