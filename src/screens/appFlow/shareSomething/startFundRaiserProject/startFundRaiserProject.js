import React, { Component, useState } from 'react';
import { View, Image, Pressable } from 'react-native';
import { height } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Buttons, Common, Headers, Icons, Images, Modals, ScrollViews, Spacer, TextInputs, Wrapper } from '../../../../components';
import * as ImagePicker from 'react-native-image-picker';
import { appImages, appStyles, colors, HelpingMethods, imagePickerOptions, routes, sizes } from '../../../../services';
import { navigate } from '../../../../navigation/rootNavigation';
import Video from 'react-native-video';

export default function Index() {
    const [media, setMedia] = useState(null)
    const [mediaError, setMediaError] = useState(null)
    const [title, setTitle] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [description, setDescription] = useState('')
    const [titleError, setTitleError] = useState('')
    const [projectDescriptionError, setProjectDescriptionError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    //const [isImagePickerVisible, setImagePickerVisibility] = useState(false)
    // const toggleImagePicker = () => setImagePickerVisibility(!isImagePickerVisible)

    const isVideoMedia = media ? media?.type?.includes('video') : null

    const launchMediaPicker = () => {
        ImagePicker.launchImageLibrary({ ...imagePickerOptions, mediaType: 'mixed' }, (response) => {
            if (response.didCancel) {
                //console.log('User cancelled image picker');
            } else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                //console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log('ImagePicker.launchImageLibrary response: ', response)
                const assetObj = response?.assets[0]
                let mediaObj = {
                    uri: assetObj.uri,
                    type: assetObj.type,
                    name: assetObj.fileName
                }
                setMedia(mediaObj)
            }
        });
    } 

    const validateNext = () => {
        HelpingMethods.handleAnimation()
        !media ? setMediaError('Add image/video') : setMediaError('')
        !title ? setTitleError('Enter project title') : setTitleError('')
        !projectDescription ? setProjectDescriptionError('Enter project description') : setProjectDescriptionError('')
        !description ? setDescriptionError('Enter description') : setDescriptionError('')
        if (media && title && projectDescription && description) {
            return true
        } else {
            return false
        }

    }

    const handleNext = () => {
        if (validateNext()) {
            navigate(
                routes.shareSomethingRoutes.startFundRaiserProjectRoutes.aboutTheProject,
                {
                    data: { media, title, projectDescription, description }
                }
            )
        }
    }
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'Start a fundraiser project'}
                showBackArrow
                alignTitleLeft
            />
            <ScrollViews.WithKeyboardAvoidingView
                footer={
                    <Wrapper marginHorizontalSmall>
                        <Spacer isBasic />
                        <Buttons.Colored
                            text={'Next'}
                            //onPress={() => navigate(routes.shareSomethingRoutes.startFundRaiserProjectRoutes.aboutTheProject)}
                            onPress={handleNext}
                        />
                        <Spacer isBasic />
                    </Wrapper>
                }
            >
                <Wrapper style={{ height: height(20) }}>
                    {
                        media ?
                            !isVideoMedia ?
                                <Image
                                    source={{ uri: media.uri }}
                                    style={{ flex: 1, height: null, width: null }}
                                />
                                :
                                <Video
                                    source={{ uri: media.uri }}   // Can be a URL or a local file.
                                    // ref={(ref) => {
                                    //     videoPlayerRef[index] = ref
                                    // }}                                      // Store reference
                                    //onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                    //onError={this.videoError}   
                                    paused={true}            // Callback when video cannot be loaded
                                    style={{ flex: 1, height: null, width: null }} />

                            :
                            null
                    }
                    <Wrapper isAbsoluteFill>
                        <Pressable
                            onPress={() => {
                                //toggleImagePicker()
                                launchMediaPicker()
                                //setMedia(appImages.product3)
                            }}
                            style={[{ flex: 1, backgroundColor: colors.appBgColor6 + (!media ? '10' : '40') }, appStyles.center]}>
                            <Icons.WithText
                                text={'Add project image or video'}
                                iconName='camera'
                                iconType={'feather'}
                                tintColor={media ? colors.appTextColor6 : colors.appTextColor1}
                            />
                        </Pressable>
                    </Wrapper>
                </Wrapper>
                <Wrapper isCenter>
                    <Spacer isTiny />
                    <Common.ErrorText
                        errorText={mediaError}
                    />
                </Wrapper>
                <Spacer isBasic />
                <Spacer isSmall />
                <TextInputs.Underlined
                    title={'Project Title'}
                    value={title}
                    onChangeText={t => {
                        setTitle(t)
                        titleError && setTitleError('')
                    }}
                    error={titleError}
                    titleStyle={{ color: colors.appTextColor1 }}
                    isTitleSolidColor
                />
                <Spacer isBasic />
                <Spacer isSmall />
                <TextInputs.Underlined
                    title={'Project Description'}
                    value={projectDescription}
                    onChangeText={t => {
                        setProjectDescription(t)
                        projectDescriptionError && setProjectDescriptionError('')
                    }}
                    error={projectDescriptionError}
                    titleStyle={{ color: colors.appTextColor1 }}
                    isTitleSolidColor
                />
                <Spacer isBasic />
                <Spacer isSmall />
                <TextInputs.Underlined
                    titleStatic={'Description'}
                    value={description}
                    onChangeText={t => {
                        setDescription(t)
                        descriptionError && setDescriptionError('')
                    }}
                    error={descriptionError}
                    multiline
                    inputStyle={{
                        height: height(15),
                        textAlignVertical: 'top',
                        marginTop: sizes.smallMargin
                    }}
                    titleStyle={{ color: colors.appTextColor1 }}
                    isTitleSolidColor
                />
            </ScrollViews.WithKeyboardAvoidingView>
            {/* <Modals.ImagePickerPopup
                visible={isImagePickerVisible}
                toggle={toggleImagePicker}
                onPressButton1={launchCamera}
                // onPressButton2={launchImagePicker}
                onPressButton1={toggleImagePicker}
            /> */}
        </Wrapper>
    )
}
