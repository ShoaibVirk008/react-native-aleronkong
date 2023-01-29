import React, { useState } from 'react'
import { FlatList, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView } from 'react-native'
import { height, totalSize, width } from 'react-native-dimension'
import { Cards, Common, Headers, Icons, Images, Modals, Spacer, TextInputs, Text, Wrapper, ScrollViews, Loaders } from '../../../components'
import { appImages, appStyles, colors, HelpingMethods, imagePickerOptions, routes, sizes } from '../../../services'
import * as ImagePicker from 'react-native-image-picker';
import { Icon } from 'react-native-elements'
import { navigate } from '../../../navigation/rootNavigation'
import Video from 'react-native-video'

export default function Input({ onSend, isLoading }) {
    const gifs_categories = [
        {
            gif: appImages.gif1,
            label: 'whatever',
        },
        {
            gif: appImages.gif2,
            label: 'dance',
        },
        {
            gif: appImages.gif3,
            label: 'annoyed',
        }
    ]
    const [messageText, setMessageText] = useState('')
    const [image, setImage] = useState(null)
    const [video, setVideo] = useState(null)
    const [gif, setGif] = useState(null)
    const [media, setMedia] = useState(null)
    const [isAddingPhoto, setAddingPhoto] = useState(true)
    const [imageFile, setImageFile] = useState(null)
    const [isImagePickerVisible, setImagePickerVisibility] = useState(false)
    const [isGifSelected, setGifSelected] = useState(false)
    const [isAddMenuVisible, setAddMenuVisibility] = useState(false)

    const isMediaImage = media?.type?.includes('image')
    const isMediaVideo = media?.type?.includes('video')

    const gifs = [...gifs_categories, ...gifs_categories, ...gifs_categories, ...gifs_categories]
    const toggleImagePicker = () => setImagePickerVisibility(!isImagePickerVisible)

    const launchVideoPicker = () => {
        ImagePicker.launchImageLibrary({ ...imagePickerOptions, mediaType: 'video' }, (response) => {
            if (response.didCancel) {
                //console.log('User cancelled image picker');
            } else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                //console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log('launchVideoPicker response: ', response)
                const assetObj = response?.assets[0]
                let mediaObj = {
                    uri: assetObj.uri,
                    type: assetObj.type,
                    name: assetObj.fileName
                }
                console.log('mediaObj : ', mediaObj)
                if (image) {
                    setImage(null)
                }
                setMedia(mediaObj)
            }
        });
    }
    const launchVideoRecorder = () => {
        ImagePicker.launchCamera({ ...imagePickerOptions, mediaType: 'video' }, (response) => {
            if (response.didCancel) {
                //console.log('User cancelled image picker');
            } else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                //console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log('launchVideoRecorder response: ', response)
                const assetObj = response?.assets[0]
                let mediaObj = {
                    uri: assetObj.uri,
                    type: assetObj.type,
                    name: assetObj.fileName
                }
                console.log('mediaObj : ', mediaObj)
                if (image) {
                    setImage(null)
                }
                setMedia(mediaObj)
            }
        });
    }
    const launchImagePicker = () => {
        ImagePicker.launchImageLibrary({ ...imagePickerOptions, }, (response) => {
            if (response.didCancel) {
                //console.log('User cancelled image picker');
            } else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                //console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log('launchImageLibrary response: ', response)
                const assetObj = response?.assets[0]
                let mediaObj = {
                    uri: assetObj.uri,
                    type: assetObj.type,
                    name: assetObj.fileName
                }
                console.log('mediaObj : ', mediaObj)
                if (video) {
                    setVideo(null)
                }
                setMedia(mediaObj)
            }
        });
    }
    const launchCamera = () => {
        ImagePicker.launchCamera({ ...imagePickerOptions, }, (response) => {
            if (response.didCancel) {
                //console.log('User cancelled image picker');
            } else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                //console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log('launchCamera response: ', response)
                const assetObj = response?.assets[0]
                let mediaObj = {
                    uri: assetObj.uri,
                    type: assetObj.type,
                    name: assetObj.fileName
                }
                console.log('mediaObj : ', mediaObj)
                if (video) {
                    setVideo(null)
                }
                setMedia(mediaObj)
            }
        });
    }
    const MenuButton = ({ isSelected, ...props }) => {
        return (
            <Icons.Button
                //iconName={'camera'}
                buttonStyle={{ borderWidth: 1, backgroundColor: isSelected ? colors.appColor1 + '20' : colors.transparent, borderColor: colors.appColor1, height: totalSize(3.5), width: totalSize(4.5), borderRadius: 100 }}
                iconSize={totalSize(2.25)}
                {...props}
            />
        )
    }
    const splitToChunks = (array, parts) => {
        const tempData = array.slice();
        let result = [];
        for (let i = parts; i > 0; i--) {
            result.push(tempData.splice(0, Math.ceil(tempData.length / i)));
        }
        return result;
    };
    const chunk1 = splitToChunks(gifs, 2)[0]
    const chunk2 = splitToChunks(gifs, 2)[1]

    const RenderGifs = ({ data, onPressItem }) => {
        return (
            <>
                {
                    data.map((item, index) => {
                        return (
                            <Pressable
                                key={index}
                                onPress={() => onPressItem(item, index)}
                                style={{
                                    width: width(35),
                                    height: height(12),
                                    marginLeft: index === 0 ? sizes.smallMargin : 0,
                                    marginRight: sizes.smallMargin
                                }}>
                                <Image
                                    source={{ uri: item.gif }}
                                    style={{ flex: 1, height: null, width: null, borderRadius: 5, }}
                                />
                                <Wrapper isAbsoluteFill isCenter style={{ backgroundColor: colors.appBgColor6 + '10', borderRadius: 5 }}>
                                    <Text isSmall isWhite isBoldFont>{item.label}</Text>
                                </Wrapper>
                            </Pressable>
                        )
                    })
                }
            </>
        )
    }
    const mediaSize = width(30)
    return (
        <>
            {
                media ?
                    <Wrapper paddingVerticalSmall
                        alignItemsFlexStart
                        paddingHorizontalBase
                        justifyContentSpaceBetween
                        background2
                        style={{}}>
                        <Wrapper>
                            {isMediaImage ?
                                <Image
                                    source={{ uri: media.uri }}
                                    style={{ height: mediaSize, width: mediaSize, borderRadius: sizes.cardRadius }}
                                />
                                :
                                isMediaVideo ?
                                    <Video
                                        source={{ uri: media.uri }}   // Can be a URL or a local file.
                                        // ref={(ref) => {
                                        //     videoPlayerRef[index] = ref
                                        // }}                                      // Store reference
                                        //onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                        //onError={this.videoError}   
                                        paused={true}            // Callback when video cannot be loaded
                                        style={{ height: mediaSize, width: mediaSize }} />
                                    :
                                    null
                            }
                            <Icons.Button
                                iconName={'close'}
                                buttonColor={colors.appBgColor2}
                                iconColor={colors.appTextColor4}
                                isRound
                                buttonSize={totalSize(3)}
                                iconSize={totalSize(2)}
                                onPress={() => {
                                    setMedia(null)
                                }}
                                buttonStyle={{ position: 'absolute', bottom: 5, right: 5 }}
                            />
                        </Wrapper>

                    </Wrapper>
                    :
                    null
            }
            <TextInputs.Colored
                placeholder={!isAddMenuVisible ? 'Write a message...' : ''}
                editable={!isAddMenuVisible}
                onChangeText={text => setMessageText(text)}
                value={messageText}
                multiline
                containerStyle={{ marginHorizontal: 0, paddingLeft: sizes.marginHorizontal, paddingRight: sizes.marginHorizontal / 2, paddingBottom: height(1.5), paddingTop: height(1), borderTopWidth: 1, borderTopColor: colors.appBgColor4 }}
                inputContainerStyle={{ borderRadius: 0, backgroundColor: colors.transparent, alignItems: Platform.OS === 'ios' ? 'flex-end' : 'center', }}
                inputStyle={{ height: null, marginVertical: height(1) }}
                //onPress={isAddMenuVisible}
                left={
                    <Wrapper flexDirectionRow>
                        <Icons.Button
                            iconName='plus'
                            buttonSize={totalSize(3.5)}
                            iconColor={!isAddMenuVisible ? colors.appTextColor5 : colors.appColor1}
                            buttonColor={!isAddMenuVisible ? colors.appBgColor2 : colors.appColor1 + '20'}
                            // onPress={toggleImagePicker}
                            iconSize={totalSize(3)}
                            isRound
                            iconStyle={[isAddMenuVisible && {
                                transform: [{ rotate: '-45deg' }]
                            }]}
                            onPress={() => {
                                HelpingMethods.handleAnimation()
                                setAddMenuVisibility(!isAddMenuVisible)
                                setGifSelected(false)
                            }}
                        />
                        {
                            isAddMenuVisible ?
                                <>
                                    <Spacer isSmall horizontal />
                                    <MenuButton
                                        iconName={'camera'}
                                        onPress={() => {
                                            setAddingPhoto(true)
                                            toggleImagePicker()
                                        }}
                                    />
                                    <Spacer isSmall horizontal />
                                    <MenuButton
                                        iconName={'video'}
                                        onPress={() => {
                                            setAddingPhoto(false)
                                            toggleImagePicker()
                                        }}
                                    />
                                    <Spacer isSmall horizontal />
                                    <MenuButton
                                        iconName={'file-gif-box'}
                                        onPress={() => {
                                            HelpingMethods.handleAnimation()
                                            setGifSelected(!isGifSelected)
                                        }}
                                        isSelected={isGifSelected}
                                    />
                                </>
                                :
                                null
                        }
                    </Wrapper>
                }
                right={
                    !isLoading ?
                        <Icons.Button
                            iconName='send'
                            buttonSize={totalSize(4)}
                            iconSize={totalSize(2.25)}
                            iconColor={colors.appColor1}
                            onPress={() => {
                                onSend({ messageText, media, gif });
                                setMessageText('')
                                setMedia(null)
                            }}
                            buttonColor={colors.appColor1 + '20'}
                            isRound
                            iconStyle={{
                                transform: [{ rotate: '-45deg' }]
                            }}
                        />
                        :
                        <Loaders.SmallPrimary
                            size={totalSize(4)}
                        />
                }
            />
            {
                isGifSelected ?
                    <Wrapper>
                        <Wrapper
                            isGradient
                            start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                            locations={[0.5, 1]}
                            gradiantColors={[colors.appColor1 + '80', colors.appColor1 + 'BF']}
                            style={{ flex: 0 }}>
                            <Wrapper flexDirectionRow paddingVerticalSmall alignItemsCenter marginHorizontalSmall>
                                <Wrapper flex={1}>
                                    <TextInputs.Colored
                                        placeholder={'Search Tenor'}
                                        iconNameLeft='search'
                                        inputStyle={[appStyles.paddingHorizontalZero, { height: sizes.inputHeight - height(2) }]}
                                        inputTextStyle={[, appStyles.fontBold,]}
                                        iconContainerStyle={{ marginLeft: sizes.smallMargin, marginRight: sizes.smallMargin }}
                                        placeholderTextColor={colors.appTextColor6}
                                        iconColorLeft={colors.appTextColor6}
                                        inputContainerStyle={{ backgroundColor: colors.appBgColor1 + '40', borderRadius: 5 }}
                                        containerStyle={[appStyles.marginHorizontalZero]}
                                        onPress={() => navigate(routes.gifKeyboard)}
                                    />
                                </Wrapper>
                                <Spacer width={sizes.TinyMargin} />
                                <Icon
                                    name={'dots-grid'}
                                    type='material-community'
                                    color={colors.appTextColor6}
                                    size={totalSize(3)}
                                />
                            </Wrapper>
                        </Wrapper>
                        <Spacer isSmall />
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}>
                            <Wrapper>
                                <Wrapper flexDirectionRow>
                                    <RenderGifs
                                        data={chunk1}
                                        onPressItem={(item, index) => navigate(routes.gifKeyboard, { data: item })}
                                    />
                                </Wrapper>
                                <Spacer isSmall />
                                <Wrapper flexDirectionRow>
                                    <RenderGifs
                                        data={chunk1}
                                        onPressItem={(item, index) => navigate(routes.gifKeyboard, { data: item })}
                                    />
                                </Wrapper>
                            </Wrapper>
                        </ScrollView>
                        <Spacer isSmall />
                    </Wrapper>
                    :
                    null
            }
            <Modals.ImagePickerPopup
                visible={isImagePickerVisible}
                toggle={toggleImagePicker}
                onPressButton1={isAddingPhoto ? launchCamera : launchVideoRecorder}
                onPressButton2={isAddingPhoto ? launchImagePicker : launchVideoPicker}
                title={isAddingPhoto ? 'Choose a Photo' : 'Choose Video'}
                button1Text={isAddingPhoto ? 'Take Photo' : 'Record Video'}
            //button2Text={isAddingPhoto?'Take Photo':'Record Video'}
            />
        </>
    )
}