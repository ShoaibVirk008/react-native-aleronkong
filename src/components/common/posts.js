import React, { useState } from 'react'
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
//import { TouchableOpacity } from 'react-native-gesture-handler'
import { Cards, Icons, Lines, Spacer, TextInputs, Wrapper, Text, Images, Modals, Common, Buttons } from '..'
import { height, totalSize, width } from 'react-native-dimension'
import { Api, appStyles, colors, HelpingMethods, post_types, routes, sizes } from '../../services'
import { navigate } from '../../navigation/rootNavigation'
import moment from 'moment'
import Video from 'react-native-video';


export const PostsPrimary = ({ data,
    //onPress
    onPressItem, onPressUser, onPressGroup, onPressLike, onPressFund,
    onPressComment, onPressShare, onPressCommentInput,
    handlePostDeleted,
    //comments press
    onPressEditComment,
    handleCommentDeleted
}) => {
    return (
        <Wrapper>
            {
                data.map((item, index) => {
                    const {
                        _id, creator, createdAt, content,
                        likes, comments,
                        type, group,
                        images, videos,
                        fundraising
                    } = item
                    media = [...images, ...videos]
                    const show_badge = creator?.isGuildMember || false
                    const name = creator?.firstName + ' ' + creator?.lastName
                    const isLiked = HelpingMethods.isPostLiked(likes)
                    const post_comments = comments?.length ? comments.slice(0, 3) : []
                    // type === post_types.fundraisingProject && console.log('fundraising:', fundraising)
                    return (
                        <PostPrimary
                            key={index}
                            containerStyle={{ paddingVertical: sizes.smallMargin, borderTopWidth: height(0.5), borderBottomWidth: height(0.5), borderColor: colors.appBgColor3 }}
                            postItem={item}
                            userImage={creator?.avatar}
                            userName={name}
                            postId={_id}
                            date={createdAt}
                            description={content}
                            images={images}
                            videos={videos}
                            fundraiserProjectDetail={fundraising}
                            // likesCount={likes_count}
                            // commentsCount={comments_count}
                            likes={likes}
                            comments={post_comments}
                            isLiked={isLiked}
                            showBadge={show_badge}
                            postType={type}
                            group={group}
                            onPress={() => {
                                //navigate(routes.postDetail, { data: item })
                                onPressItem && onPressItem(item, index)
                            }}
                            onPressUser={() => {
                                //navigate(routes.userDetail, { data: item.user })
                                onPressUser && onPressUser(item, index)
                            }}
                            onPressGroup={onPressGroup ? () => onPressGroup(item, index) : null}
                            onPressDots={() => {
                                navigate(routes.postMenu, {
                                    data: item,
                                    handlePostDeleted: (data) => handlePostDeleted(data)
                                })
                            }}
                            onPressFund={onPressFund ? () => onPressFund(item, index) : null}
                            onPressLike={() => {
                                onPressLike && onPressLike(item, index)
                            }}
                            onPressComment={() => {
                                onPressComment && onPressComment(item, index)
                            }}
                            onPressShare={
                                onPressShare ? () => onPressShare(item, index) : null
                            }
                            onPressCommentInput={() => {
                                onPressCommentInput && onPressCommentInput(item, index)
                            }}
                            onPressEditComment={onPressEditComment}
                            handleCommentDeleted={handleCommentDeleted}
                        />
                    )
                })
            }
        </Wrapper>
    )
}

export const PostPrimary = ({
    postItem, postId, userImage, userName, date, description,
    // likesCount, commentsCount,
    likes, comments,
    isLiked, onPress,
    onPressUser, containerStyle, onPressDots, showBadge,
    postType, onPressFund, group,
    //media
    images, videos,

    //onPress
    onPressLike, onPressComment, onPressShare,
    onPressCommentInput,
    //flags/checks
    hideCommentInput, hideComments,
    //fundraiser Project Detail
    fundraiserProjectDetail,
    onPressGroup,
    //comments
    onPressEditComment,
    handleCommentDeleted
}) => {

    const [loadingShare, setLoadingShare] = useState(false)
    let tempImages = []
    let tempVideos = []
    let media = []
    const likesCount = likes?.length || ''
    const commentsCount = comments?.length || ''
    if (images?.length) {
        tempImages = images.map((item, index) => {
            return { url: item, type: 'image' }
        })
        // console.log('tempImages: ', tempImages)
    }
    if (videos?.length) {
        tempVideos = videos.map((item, index) => {
            return { url: item, type: 'video' }
        })
        // console.log('tempVideos: ', tempVideos)
    }


    const isPost = postType === post_types.post
    const isFundraisingProject = postType === post_types.fundraisingProject


    const fundraiserProjectImageMedia =
        fundraiserProjectDetail?.image ?
            [{ url: fundraiserProjectDetail.image, type: 'image' }] :
            []
    const fundraiserProjectVideoMedia =
        fundraiserProjectDetail?.video ?
            [{ url: fundraiserProjectDetail.video, type: 'video' }] :
            []

    media = isPost ? [...tempImages, ...tempVideos] : isFundraisingProject ? [...fundraiserProjectImageMedia, ...fundraiserProjectVideoMedia] : []
    // console.log('media: ', media)

    const styles = StyleSheet.create({
        name: [appStyles.textRegular, appStyles.fontRegular, appStyles.textColor2]
    })
    return (
        <Wrapper
            onPress={onPress}
            activeOpacity={1}
        >
            <Wrapper style={containerStyle}>
                <TouchableOpacity
                    onPress={onPress}
                    activeOpacity={1}
                >
                    <Cards.UserPrimary
                        containerStyle={[appStyles.paddingHorizontalSmall]}
                        subContainerStyle={[appStyles.paddingVerticalZero]}
                        image={
                            <Wrapper style={{ marginRight: sizes.marginHorizontal / 2 }}>
                                <Images.Profile
                                    source={{ uri: userImage }}
                                    showBadge={showBadge}
                                    size={totalSize(4.25)}
                                    imageStyle={{}}
                                />
                            </Wrapper>
                        }
                        imageUri={userImage}
                        title={userName}
                        titleContainerStyle={[appStyles.alignItemsCenter]}
                        titleRight={
                            group ?
                                <Wrapper>
                                    <Icons.WithText
                                        iconName={'triangle-right'}
                                        iconType='entypo'
                                        iconSize={totalSize(2)}
                                        text={group?.name}
                                        tintColor={colors.appTextColor2}
                                        textStyle={[styles.name, group && appStyles.fontBold]}
                                        textContainerStyle={{ marginHorizontal: 0 }}
                                        iconStyle={[{ marginHorizontal: width(0.5) }]}
                                        onPress={onPressGroup}
                                    />
                                </Wrapper>
                                :
                                null
                        }
                        imageSize={totalSize(4.25)}
                        titleStyle={[styles.name, group && appStyles.fontBold]}
                        subTitle={moment(date).fromNow()}
                        subTitleStyle={[appStyles.textTiny, appStyles.textLightGray]}
                        right={
                            <Icons.Button
                                iconName={'dots-horizontal'}
                                iconSize={totalSize(2)}
                                iconColor={colors.appTextColor2}
                                buttonSize={totalSize(3)}
                                onPress={onPressDots}
                            />
                        }
                        onPress={onPressUser}
                    />
                    <Spacer isSmall />
                    <Wrapper marginHorizontalSmall>
                        <Text isRegular numberOfLines={2} isTextColor2>{
                            isPost ? description :
                                isFundraisingProject ? fundraiserProjectDetail?.description :
                                    ''}</Text>
                    </Wrapper>
                </TouchableOpacity>
                <Spacer isBasic />
                {
                    media?.length ?
                        <FlatList
                            data={media}
                            keyExtractor={(item, index) => index.toString()}
                            pagingEnabled
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                const isVideo = item.type === 'video'
                                //let videoPlayerRef = []
                                return (
                                    <Pressable
                                    key={index}
                                        //onPress={onPress}
                                        onPress={() => {
                                            !isVideo ?
                                                navigate(routes.imageViewer, { imageUri: item.url }) :
                                                navigate(routes.videoPlayer, { videoUrl: item.url })

                                        }}
                                    >
                                        <Wrapper style={{ width: width(100) }}>
                                            {
                                                !isVideo ?
                                                    <Image
                                                        source={{ uri: item.url }}
                                                        // style={{ width: null, height: isPost ? height(30) : height(20) }}
                                                        style={{ width: null, height: isPost ? height(30) : height(20) }}
                                                    />
                                                    :
                                                    <>
                                                        <Video
                                                            source={{ uri: (item.url && item.url != 'www.google.com') && item.url }}   // Can be a URL or a local file.
                                                            // ref={(ref) => {
                                                            //     videoPlayerRef[index] = ref
                                                            // }}                                      // Store reference
                                                            //onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                                            //onError={this.videoError}   
                                                            paused={true}            // Callback when video cannot be loaded
                                                            style={{ height: height(30), width: width(100) }} />
                                                        <Wrapper isAbsoluteFill isCenter>

                                                            <Icons.Button
                                                                iconName="play"
                                                                isRound
                                                                buttonSize={totalSize(5)}
                                                                iconSize={totalSize(3.5)}
                                                                buttonColor={colors.appBgColor1 + '40'}
                                                                iconColor={colors.appTextColor6}
                                                            //onPress={() => setPlaying(true)}
                                                            />

                                                        </Wrapper>
                                                    </>
                                            }
                                        </Wrapper>
                                    </Pressable>
                                )
                            }}
                        />
                        :
                        null
                }
                <Spacer isSmall />
                {
                    isFundraisingProject && fundraiserProjectDetail ?
                        <>
                            <Wrapper marginHorizontalSmall>
                                <Common.FundRaisingProjectInfo
                                    backers={fundraiserProjectDetail?.backers || 0}
                                    daysLeft={
                                        fundraiserProjectDetail.compaignDuration
                                        -
                                        HelpingMethods.getDaysDifference({
                                            firstDate: new Date(fundraiserProjectDetail.createdAt),
                                            secondDate: new Date(Date.now()),
                                            //firstDate: new Date(2022, 12, 7),
                                            //secondDate:new Date(2022, 12, 17),
                                        })}
                                    currentAmount={'$ ' + fundraiserProjectDetail?.currentFunding || 0}
                                    goalAmount={'$ ' + fundraiserProjectDetail?.fundingGoal || 0}
                                />
                                <Spacer isSmall />
                                <Buttons.ColoredSmall
                                    text={'Fund this project'}
                                    buttonStyle={[{ height: height(5), borderRadius: 100 }, appStyles.center]}
                                    textStyle={[appStyles.textRegular, appStyles.fontBold, appStyles.textWhite]}
                                    onPress={onPressFund}
                                />
                                <Spacer isSmall />
                            </Wrapper>
                            <Lines.Horizontal />
                            <Spacer isSmall />
                        </>
                        :
                        null
                }

                <Wrapper flexDirectionRow marginHorizontalBase>
                    <Wrapper flex={1} alignItemsCenter >
                        <Icons.WithText
                            iconName={isLiked ? 'thumb-up' : 'thumbs-up'}
                            iconType={isLiked ? 'material-community' : 'feather'}
                            text={likesCount}
                            tintColor={isLiked ? colors.appColor1 : colors.appTextColor3}
                            onPress={onPressLike}
                        />
                    </Wrapper>
                    <Wrapper flex={1} alignItemsCenter>
                        <Icons.WithText
                            iconName={'message-circle'}
                            iconType={'feather'}
                            text={commentsCount}
                            tintColor={colors.appTextColor3}
                            onPress={onPressComment}
                        />
                    </Wrapper>
                    <Wrapper flex={1} alignItemsCenter>
                        {
                            !loadingShare ?
                                <Icons.WithText
                                    iconName={'share'}
                                    iconType={'feather'}
                                    text={'Share'}
                                    tintColor={colors.appTextColor3}
                                    // onPress={onPressShare ? onPressShare : async () => {
                                    //     setLoadingShare(true)
                                    //     await Api.sharePost(postId)
                                    //     setLoadingShare(false)
                                    // }}
                                    onPress={onPressShare ? onPressShare : async () => {
                                        setLoadingShare(true)
                                        await Api.sharePost(postId)
                                        setLoadingShare(false)
                                    }}
                                />
                                :
                                <ActivityIndicator
                                    size={totalSize(2)}
                                    color={colors.appTextColor3}
                                />
                        }
                    </Wrapper>
                </Wrapper>
                <TouchableOpacity
                    onPress={onPress}
                    activeOpacity={1}
                >
                    <Spacer isSmall />
                    <Lines.Horizontal />
                    <Spacer isSmall />
                    {
                        comments && !hideComments ?
                            <>
                                <Common.CommentsPrimary
                                    data={comments}
                                    onLineComment
                                    //onPressItem={onPress}
                                    onPressItem={(item, index) => navigate(routes.userDetail, { data: item.creator })}
                                    onPressDots={(comment, commentIndex) => {
                                        navigate(
                                            routes.commentMenu,
                                            {
                                                post: postItem,
                                                comment: comment,
                                                onPressEdit: (data) => onPressEditComment(data),
                                                handleDelete: (data) => handleCommentDeleted(data)
                                            }
                                        )
                                    }}
                                />
                            </>
                            :
                            null
                    }
                </TouchableOpacity>
                {
                    !hideCommentInput ?
                        <>
                            <Spacer isSmall />
                            <TextInputs.Colored
                                placeholder={'Write a comment'}
                                inputStyle={[appStyles.textSmall, appStyles.paddingHorizontalSmall, { height: height(4) }]}
                                inputTextStyle={[appStyles.textSmall, appStyles.textGray]}
                                containerStyle={[appStyles.marginHorizontalSmall, {}]}
                                inputContainerStyle={{ borderRadius: sizes.inputRadius, borderWidth: 1, borderColor: colors.appBgColor3 }}
                                onPress={onPressCommentInput}
                            />
                        </>
                        :
                        null
                }

                {/* {
                    !hideBottomLine ?
                        <>
                            <Spacer isSmall />
                            <Lines.Horizontal height={height(0.5)} />
                        </>
                        :
                        null
                } */}
            </Wrapper>
        </Wrapper>
    )
}