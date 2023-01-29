import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, TextInput, View } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { Buttons, Cards, Headers, Icons, Images, Lines, Modals, ScrollViews, Spacer, TextInputs, Wrapper, Text, Toasts, Common } from '../../../../components';
import { Api, appIcons, appImages, appStyles, colors, HelpingMethods, imagePickerOptions, post_privacy_options, post_types, routes, sizes } from '../../../../services';
import * as ImagePicker from 'react-native-image-picker';
import { goBack, navigate } from '../../../../navigation/rootNavigation';
//import RNThumbnail from 'react-native-thumbnail';
import Video from 'react-native-video';
import { useSelector } from 'react-redux';
import { setPosts } from '../../../../services/store/actions';

export default function Index({ navigation, route }) {
    const { setParams } = navigation
    const groupData = route?.params?.group || null
    const postData = route?.params?.data || null
    const onPostUpdate = route?.params?.onPostUpdate || null
    const isEditing = postData ? true : false

    const tempImages = [
        {
            type: 'video/mp4',
            uri: appImages.product1,
        },
        {
            type: 'image/jpg',
            uri: appImages.product4,
        },
        {
            type: 'image/jpg',
            uri: appImages.product5,
        }
    ]
    const tempShareWithOptions = [
        {
            label: 'Guild Member',
            custom_icon: appIcons.crown,
            value: post_privacy_options.guildMember
        },
        {
            label: 'Followers',
            iconName: 'users',
            iconType: 'feather',
            value: post_privacy_options.followers

        },
        {
            label: 'Public',
            iconName: 'globe',
            iconType: 'feather',
            value: post_privacy_options.public
        },

    ]
    const shareWithGroupOption = {
        label: groupData?.name || '',
        iconName: 'users',
        iconType: 'feather',
        value: post_privacy_options.group
    }
    const shareWithOptions = !groupData ?
        tempShareWithOptions :
        [...tempShareWithOptions.slice(0, 1), shareWithGroupOption, ...tempShareWithOptions.slice(1)]

    //Redux states
    const app = useSelector(state => state.app)
    const user = useSelector(state => state.user)
    const { posts } = app
    const { currentUser } = user

    const [selectedShareWithOptionIndex, setSelectedShareWithOptionIndex] = useState(!groupData ? 0 : 1)
    const [description, setDescription] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [media, setMedia] = useState([])
    const [mediaError, setMediaError] = useState('')
    const [isShareWithpopupVisible, setShareWithpopupVisible] = useState(false)
    const [addingMedia, setAddingMedia] = useState('image')
    const [isImagePickerVisible, setImagePickerVisibility] = useState(false)
    const [loadingCreatePost, setLoadingCreatePost] = useState(false)

    const toggleShareWithPopup = () => setShareWithpopupVisible(!isShareWithpopupVisible)

    useEffect(() => {
        getSetPostData()
    }, [])

    const getSetPostData = () => {
        if (postData) {
            const { privacy, content, images, videos, type, group } = postData
             //group
             group && setParams({ group })
            //set privacy
           if(!group){
            const tempSelectedOption = shareWithOptions.find(item => item.value === privacy)
            if (tempSelectedOption) {
                const tempSelectedOptionIndex = shareWithOptions.indexOf(tempSelectedOption)
                if (tempSelectedOptionIndex >= 0) {
                    setSelectedShareWithOptionIndex(tempSelectedOptionIndex)
                }
            }
           }else{
            setSelectedShareWithOptionIndex(1)
           }
            //set desctiption
            setDescription(content)
            //set images/videos
            let tempImages = []
            let tempVideos = []
            if (images?.length) {
                tempImages = images?.map((item, index) => {
                    return (
                        {
                            uri: item,
                            type: 'image',
                            file: null
                        }
                    )
                })
                console.log('tempImages: ', tempImages)
            }
            if (videos?.length) {
                tempVideos = videos?.map((item, index) => {
                    return (
                        {
                            uri: item,
                            type: 'video',
                            file: null
                        }
                    )
                })
                console.log('tempVideos: ', tempVideos)
            }
            const tempMedia = [...tempImages, ...tempVideos]
            setMedia(tempMedia)
           
        }
    }


    const launchMediaPicker = () => {
        ImagePicker.launchImageLibrary({ ...imagePickerOptions, selectionLimit: 0, mediaType: 'mixed' }, (response) => {
            if (response.didCancel) {
                //console.log('User cancelled image picker');
            } else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                //console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log('ImagePicker.launchImageLibrary response: ', response)
                let photos = []
                const imagesArray = response?.assets
                if (mediaError) { setMediaError('') }
                for (const item of imagesArray) {
                    const { uri, type, fileName } = item
                    // const isVideo = type.includes('video')
                    let tempObj = {
                        uri: item.uri,
                        type: item.type,
                        file: {
                            uri: item.uri,
                            type: item.type,
                            name: item.fileName
                        }
                    }
                    photos.push(tempObj);
                }
                setMedia([...media, ...photos])
            }
        });
    }

    const validateCreatePost = () => {
        HelpingMethods.handleAnimation()
        !description ? setDescriptionError('Write description') : setDescriptionError('')
        !media.length ? setMediaError('Add photo/video') : setMediaError('')
        if (description && media.length) {
            return true
        } else {
            return false
        }

    }
    const handleCreatePost = async ({ }) => {
        if (validateCreatePost()) {
            setLoadingCreatePost(true)
            let tempImages = []
            let tempVideos = []
            //uploading media
            if (media.length) {
                for (const item of media) {
                    const { uri, type, } = item
                    const isVideo = type.includes('video')
                    await Api.uploadFile(item.file).
                        then(res => {
                            if (res) {
                                const fileUrl = res.data.file
                                // const temoMediaObj = {
                                //     url: res.data.file,
                                //     type: !isVideo ? 'image' : 'video'
                                // }
                                !isVideo ?
                                    tempImages.push(fileUrl) :
                                    tempVideos.push(fileUrl)
                            }
                        })
                }
            }
            await Api.CreatePost({
                description,
                //media: tempImages,
                images: tempImages,
                videos: tempVideos,
                privacy: !groupData ? shareWithOptions[selectedShareWithOptionIndex].value : post_privacy_options.public,
                group: groupData?._id || null
                //type: post_types.post
            }).
                then(res => {
                    if (res) {
                        setPosts([res.data, ...posts])
                        !groupData ?
                            navigate(routes.home)
                            :
                            goBack()
                        Toasts.Success('Your post has been submitted')
                    }
                })
            setLoadingCreatePost(false)
        }
    }
    const handleUpdatePost = async ({ }) => {
        if (validateCreatePost()) {
            setLoadingCreatePost(true)
            let tempImages = []
            let tempVideos = []
            //uploading media
            if (media.length) {
                for (const item of media) {
                    const { uri, type } = item
                    const isVideo = type.includes('video')
                    let tempFileUrl = uri
                    if (item.file) {
                        await Api.uploadFile(item.file).
                            then(res => {
                                if (res) {
                                    const fileUrl = res.data.file
                                    tempFileUrl = fileUrl

                                }
                            })
                    }
                    !isVideo ?
                        tempImages.push(tempFileUrl) :
                        tempVideos.push(tempFileUrl)

                }
            }
            const isGroupSelected = shareWithOptions[selectedShareWithOptionIndex].value === post_privacy_options.group
            await Api.UpdatePost({
                postId: postData?._id,
                description,
                //media: tempImages,
                images: tempImages,
                videos: tempVideos,
                privacy: !isGroupSelected ? shareWithOptions[selectedShareWithOptionIndex].value : post_privacy_options.public,
                group: isGroupSelected ? groupData?._id : null
                //type: post_types.post
            }).
                then(res => {
                    if (res) {
                        const tempPosts = posts.slice()
                        const tempPost = posts.find(item => item._id === postData?._id)
                        if (tempPost) {
                            const tempPostIndex = posts.indexOf(tempPost)
                            if (tempPostIndex >= 0) {
                                tempPosts[tempPostIndex] = res.data
                                setPosts(tempPosts)
                            }
                        }
                        onPostUpdate && onPostUpdate(res.data)
                        goBack()
                        Toasts.Success('Your post has been updated')
                    }
                })
            setLoadingCreatePost(false)
        }
    }
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={!isEditing ? 'Share a Post' : 'Edit Post'}
                showBackArrow
                alignTitleLeft
                //containerStyle={[appStyles.alignItemsCenter]}
                right={

                    <Buttons.ColoredSmall
                        text={!isEditing ? 'Post' : 'Update'}
                        onPress={!isEditing ? handleCreatePost : handleUpdatePost}
                        buttonStyle={[appStyles.paddingHorizontalTiny,
                        {
                            marginRight: sizes.marginHorizontal,
                            borderRadius: 100
                        }]}
                        isLoading={loadingCreatePost}
                    />

                }
                rightContainerStyle={{ flex: 0 }}
            />
            <ScrollViews.WithKeyboardAvoidingView
                footer={
                    <Wrapper>
                        <Media
                            data={media}
                            onPressCross={(item, index) => {
                                const newImages = media.filter(ite => ite != item)
                                setMedia(newImages)
                            }}
                        />
                        <Spacer isSmall />
                        {/* {
                            mediaError ?
                                <Wrapper animation={'shake'}>
                                    <Text isSmall alignTextCenter style={{ color: colors.error }}>{mediaError}</Text>
                                    <Spacer isSmall />
                                </Wrapper>
                                :
                                null
                        } */}
                        <Wrapper isCenter>
                            <Common.ErrorText
                                errorText={mediaError}
                            />
                            <Spacer isTiny />
                        </Wrapper>
                        <Wrapper marginHorizontalSmall>
                            <Lines.Horizontal />
                        </Wrapper>
                        <Spacer isBasic />
                        {/* <Wrapper flexDirectionRow >
                            <Wrapper
                                flex={1}
                                alignItemsCenter
                            >
                                <Icons.WithText
                                    iconName={'media-outline'}
                                    iconType='ionicon'
                                    text={'Photos'}
                                    tintColor={colors.appTextColor4}
                                    //onPress={toggleImagePicker}
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
                                    //onPress={toggleImagePicker}
                                />
                            </Wrapper>
                        </Wrapper> */}
                        <Pressable
                            onPress={launchMediaPicker}
                        >
                            <Wrapper flexDirectionRow alignItemsCenter justifyContentCenter>
                                <Icons.WithText
                                    iconName={'image-outline'}
                                    iconType='ionicon'
                                    text={'Photos'}
                                    tintColor={colors.appTextColor4}
                                //onPress={toggleImagePicker}
                                />
                                <Text isMedium isGray>/  </Text>
                                <Icons.WithText
                                    iconName={'videocam-outline'}
                                    iconType='ionicon'
                                    text={'Videos'}
                                    tintColor={colors.appTextColor4}
                                //onPress={toggleImagePicker}
                                />
                            </Wrapper>
                        </Pressable>
                        <Spacer isBasic />
                        <Spacer isTiny />
                    </Wrapper>
                }
            >
                <Spacer isBasic />
                <Wrapper flexDirectionRow marginHorizontalBase alignItemsCenter>
                    <Images.Round
                        source={{ uri: currentUser.avatar || appImages.noUser }}
                    />
                    <Spacer isBasic horizontal />
                    <Buttons.ColoredSmall
                        // text={!groupData ?
                        //     `Share with: ${shareWithOptions[selectedShareWithOptionIndex].label}`
                        //     :
                        //     `Share in group: ${groupData?.name || ''}`
                        // }
                        text={
                            `Share with: ${shareWithOptions[selectedShareWithOptionIndex].label}`
                        }
                        buttonStyle={[{ borderRadius: 100, backgroundColor: colors.appColor1 + '20' }, appStyles.paddingHorizontalSmall]}
                        iconName={'chevron-down'}
                        iconType={'ionicon'}
                        direction={'row-reverse'}
                        textStyle={[appStyles.textRegular]}
                        iconColor={colors.appTextColor1}
                        onPress={toggleShareWithPopup}
                    />
                </Wrapper>
                <Spacer isBasic />
                <Wrapper marginHorizontalBase>
                    <TextInput
                        placeholder='Write Post Description'
                        multiline
                        value={description}
                        onChangeText={t => {
                            setDescription(t)
                            descriptionError && setDescriptionError('')
                        }}
                        style={[appStyles.inputField, { height: height(15), textAlignVertical: 'top' }]}
                    />
                    {/* {
                        descriptionError ?
                            <Wrapper animation={'shake'}>
                                <Text isSmall style={{ color: colors.error }}>{descriptionError}</Text>
                                <Spacer isSmall />
                            </Wrapper>
                            :
                            null
                    } */}
                    <Wrapper >
                        <Common.ErrorText
                            errorText={descriptionError}
                        />
                        <Spacer isTiny />
                    </Wrapper>
                </Wrapper>

            </ScrollViews.WithKeyboardAvoidingView>
            <ShareWithPopup
                visible={isShareWithpopupVisible}
                toggle={toggleShareWithPopup}
                options={shareWithOptions}
                selectedOptionLabel={shareWithOptions[selectedShareWithOptionIndex].label}
                handleOnpressOption={(item, index) => {
                    setSelectedShareWithOptionIndex(index)
                    toggleShareWithPopup()
                }}
            />
            {/* <Modals.ImagePickerPopup
                visible={isImagePickerVisible}
                toggle={toggleImagePicker}
                onPressButton1={launchCamera}
                onPressButton2={launchMediaPicker}
            //onPressButton1={toggleImagePicker}
            /> */}
        </Wrapper>
    )
}



function Media({ data, onPressCross, imageSize, isFile }) {
    const defaultSize = imageSize ? imageSize : width(25)
    return (
        <Wrapper>
            <FlatList
                horizontal
                // scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <Spacer isSmall horizontal />}
                ListHeaderComponent={() => <Spacer isSmall horizontal />}
                ListFooterComponent={() => <Spacer isSmall horizontal />}
                data={data}
                renderItem={({ item, index }) => {
                    const { uri, type, name } = item
                    const isVideo = item.type.includes('video')
                    let videoPlayerRef = null
                    return (
                        <Wrapper
                        key={index}
                            animation="fadeInLeft"
                            duration={250 + (index + 1) * 25}>

                            {
                                !isVideo ?
                                    <Images.SqareRound
                                        source={{ uri: item.uri }}
                                        size={defaultSize}
                                        style={{ borderWidth: 1, borderColor: colors.appBgColor3 }}
                                    />
                                    :
                                    <Video
                                        source={{ uri }}   // Can be a URL or a local file.
                                        // ref={(ref) => {
                                        //     videoPlayerRef[index] = ref
                                        // }}                                      // Store reference
                                        //onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                        //onError={this.videoError}   
                                        paused={true}            // Callback when video cannot be loaded
                                        style={{ height: defaultSize, width: defaultSize }} />
                            }

                            <Icons.Button
                                iconName={'x'}
                                iconType={"feather"}
                                buttonColor={colors.error}
                                iconColor={colors.appTextColor6}
                                iconSize={totalSize(1.5)}
                                buttonSize={totalSize(2.5)}
                                onPress={() => onPressCross(item, index)}
                                buttonStyle={{
                                    position: 'absolute',
                                    top: sizes.smallMargin,
                                    left: sizes.smallMargin,
                                }}
                                isRound
                            />
                            {
                                //item.type === 'video' ?
                                isVideo ?
                                    <Wrapper isAbsolute
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: sizes.smallMargin,
                                        }}
                                    >
                                        <Icon
                                            name='videocam'
                                            type='ionicon'
                                            color={colors.appTextColor6}
                                            size={totalSize(3)}
                                        />
                                    </Wrapper>
                                    :
                                    null
                            }
                        </Wrapper>
                    );
                }}
            />
        </Wrapper>
    );
};

function ShareWithPopup({ visible, toggle, options, selectedOptionLabel, handleOnpressOption }) {
    return (
        <Modals.PopupPrimary
            visible={visible}
            toggle={toggle}
            topMargin={height(65)}
        >
            <Wrapper isBorderedWrapper paddingHorizontalZero paddingVerticalZero>

                {
                    options.map((item, index) => {
                        const is_selected = selectedOptionLabel === item.label
                        return (
                            <Wrapper key={index}>
                                <Cards.IconTitleArrow
                                    title={item.label}
                                    iconImage={item?.custom_icon || null}
                                    iconName={item?.iconName || null}
                                    disableIconColor={index === 0}
                                    iconType={item?.iconType || null}
                                    containerStyle={[{ paddingVertical: height(1.5) }]}
                                    //titleStyle={[index === 4 && { color: colors.error }]}
                                    onPress={() => handleOnpressOption(item, index)}
                                    right={
                                        is_selected ?
                                            <Icons.Button
                                                iconName={'check'}
                                                iconColor={colors.appTextColor6}
                                                buttonColor={colors.appColor1}
                                                isRound
                                                iconSize={totalSize(1.5)}
                                                buttonSize={totalSize(2.5)}
                                            />
                                            :
                                            <></>
                                    }
                                />
                                {
                                    index != options.length - 1 ?
                                        <Lines.Horizontal />
                                        :
                                        null
                                }
                            </Wrapper>
                        )
                    })
                }
            </Wrapper>
        </Modals.PopupPrimary>
    )
}