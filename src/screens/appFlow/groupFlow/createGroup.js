import React, { Component, useEffect, useState } from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Headers, Wrapper, Text, Icons, Spacer, TextInputs, Pickers, ScrollViews, Buttons, Modals, Common } from '../../../components';
import { goBack } from '../../../navigation/rootNavigation';
import { Api, appImages, appStyles, colors, group_privacy_options, HelpingMethods, imagePickerOptions, sizes } from '../../../services';
import * as ImagePicker from 'react-native-image-picker';

const privacyOptions = [{ label: 'Public', value: group_privacy_options.public }, { label: 'Private', value: group_privacy_options.private }]
export default function Index({ navigation, route }) {
    const groupData = route?.params?.data || null
    const isEditingGroup = groupData

    const imageOverlayColor = colors.appBgColor3 + 'BF'
    const tempDescription = 'Phasellus risus turpis, pretium sit amet magna non, molestie ultricies enim. Nullam pulvinar felis at metus malesuada, nec convallis lacus commodo. Duis blandit neque purus, nec auctor mi sollicitudin nec. Duis urna ipsum, tincidunt at euismod ut.'

    const [isConfirmationPopupVisible, setConfirmationPopupVisibility] = useState(false)
    const [coverPhoto, setCoverPhoto] = useState(null)
    const [coverPhotoError, setCoverPhotoError] = useState(null)
    const [profilePhoto, setProfilePhoto] = useState(null)
    const [profilePhotoError, setProfilePhotoError] = useState(null)
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [description, setDescription] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [privacy, setPrivacy] = useState('')
    const [privacyError, setPrivacyError] = useState('')
    const [loadingSubmit, setLoadingSubmit] = useState(false)

    const toggleConfirmationPopup = () => setConfirmationPopupVisibility(!isConfirmationPopupVisible)
    useEffect(() => {
        getSetData()
    }, [])

    const getSetData = () => {
        if (groupData) {
            const { _id,creator, profilePhoto, coverPhoto, name, description,privacy } = groupData
            name&&setName(name)
            description&&setDescription(description)
            privacy&&setPrivacy(privacy)
        }
    }
    const launchMediaPicker = (pickingType) => {
        const isPickingProfile = pickingType === 'profile'
        const isPickingCover = pickingType === 'cover'
        ImagePicker.launchImageLibrary({ ...imagePickerOptions, }, (response) => {
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
                // isPickingProfile ? setProfilePhoto(mediaObj) :
                //     isPickingCover ? setCoverPhoto(mediaObj) : null

                if (isPickingProfile) {
                    setProfilePhoto(mediaObj)
                    setProfilePhotoError('')
                } else if (isPickingCover) {
                    setCoverPhoto(mediaObj)
                    setCoverPhotoError('')
                }
            }
        });
    }


    const handleGroupValidation = () => {
        HelpingMethods.handleAnimation()
        if (!isEditingGroup) {
            !profilePhoto ? setProfilePhotoError('Add profile photo') : setProfilePhotoError('')
            !coverPhoto ? setCoverPhotoError('Add cover photo') : setCoverPhotoError('')
        }
        !name ? setNameError('Enter group name') : setNameError('')
        !description ? setDescriptionError('Enter description') : setDescriptionError('')
        !privacy ? setPrivacyError('select group privacy') : setPrivacyError('')
        if (name && description && privacy) {
            if (!isEditingGroup) {
                if (profilePhoto && coverPhoto) {
                    return true
                } else {
                    return false
                }
            } else {
                return true
            }
        }
        else {
            return false
        }
    }


    const handleUploadPhotos = async () => {
        let coverPhotoUrl = null
        let profilePhotoUrl = null
        if (coverPhoto) {
            await Api.uploadFile(coverPhoto).
                then(res => {
                    if (res) {
                        coverPhotoUrl = res.data.file
                    }
                })
        }
        if (profilePhoto) {
            await Api.uploadFile(profilePhoto).
                then(res => {
                    if (res) {
                        profilePhotoUrl = res.data.file
                    }
                })
        }
        return { coverPhotoUrl, profilePhotoUrl }
    }

    const handleCreateGroup = async () => {
        if (handleGroupValidation()) {
            setLoadingSubmit(true)
            const photos = await handleUploadPhotos()
            await Api.createGroup({
                coverPhoto: photos.coverPhotoUrl,
                profilePhoto: photos.profilePhotoUrl,
                name,
                description,
                privacy
            }).
                then(res => {
                    if (res) {
                        toggleConfirmationPopup()
                    }
                })
            setLoadingSubmit(false)
        }
    }
    const handleUpdateGroup = async () => {
        if (handleGroupValidation()) {
            setLoadingSubmit(true)
            const photos = await handleUploadPhotos()
            await Api.updateGroup({
                groupId: groupData._id,
                coverPhoto: photos.coverPhotoUrl,
                profilePhoto: photos.profilePhotoUrl,
                name,
                description,
                privacy
            }).
                then(res => {
                    if (res) {
                        toggleConfirmationPopup()
                    }
                })
            setLoadingSubmit(false)
        }
    }

    const handleSubmit = () => {
        if (!isEditingGroup) {
            handleCreateGroup()
        } else {
            handleUpdateGroup()
        }
    }
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={!isEditingGroup ? 'Create Group' : 'Edit Group'}
                showBackArrow
                containerStyle={{ borderBottomWidth: 0 }}
            />
            <ScrollViews.WithKeyboardAvoidingView>
                <Wrapper style={{ height: height(20) }}>
                    {
                        coverPhoto?.uri || groupData?.coverPhoto ?
                            <Image
                                source={{ uri: coverPhoto?.uri || groupData?.coverPhoto }}
                                style={{ flex: 1, width: null, height: null }}
                            />
                            :
                            null
                    }
                    <Pressable
                        style={[{
                            backgroundColor: imageOverlayColor,
                        },
                        StyleSheet.absoluteFill
                        ]}
                    >
                        <Wrapper
                            alignItemsCenter
                            marginVerticalBase
                        >
                            <Icons.WithText
                                iconName={'camera'}
                                iconType='feather'
                                text={'Change Cover Photo'}
                                iconSize={totalSize(1.75)}
                                onPress={() => {
                                    launchMediaPicker('cover')
                                }}
                            />
                        </Wrapper>
                    </Pressable>
                </Wrapper>
                <Wrapper background1 style={{ height: width(30), width: width(30), marginLeft: sizes.marginHorizontal, marginTop: -width(20), borderRadius: sizes.cardRadius, borderWidth: 1, borderColor: colors.appBgColor1 }}>
                    {
                        profilePhoto?.uri || groupData?.profilePhoto ?
                            <Image
                                source={{ uri: profilePhoto?.uri || groupData?.profilePhoto }}
                                style={{ flex: 1, width: null, height: null, borderRadius: sizes.cardRadius }}
                            />
                            :
                            null
                    }
                    <Pressable
                        style={[{ backgroundColor: imageOverlayColor, borderRadius: sizes.cardRadius, },
                        appStyles.center,
                        StyleSheet.absoluteFill
                        ]}
                    >
                        <Wrapper
                            alignItemsCenter
                            marginVerticalBase
                        >
                            <Icons.WithText
                                iconName={'camera'}
                                iconType='feather'
                                text={'Add Profile\nPhoto'}
                                iconSize={totalSize(1.75)}
                                textStyle={[appStyles.textCenter]}
                                textContainerStyle={[appStyles.marginVerticalTiny, { marginBottom: 0 }]}
                                direction='column'
                                onPress={() => {
                                    launchMediaPicker('profile')
                                }}
                            />
                        </Wrapper>
                    </Pressable>
                </Wrapper>
                <Common.ErrorText
                    containerStyle={[{ marginTop: sizes.TinyMargin }, appStyles.marginHorizontalBase]}
                    errorText={profilePhotoError || coverPhotoError ? 'Add cover/profile photo' : ''}
                />
                <Spacer isBasic />
                <Spacer isSmall />
                <TextInputs.Underlined
                    title={'Group Name'}
                    isTitleSolidColor
                    //value={!isEditingGroup ? '' : 'Aleron Kong Fan Club'}
                    value={name}
                    onChangeText={(t) => {
                        setName(t)
                        nameError && setNameError('')
                    }}
                    error={nameError}
                />
                <Spacer isBasic />
                <Spacer isSmall />
                <TextInputs.Underlined
                    titleStatic={'Description'}
                    isTitleSolidColor
                    //value={!isEditingGroup ? '' : tempDescription}
                    value={description}
                    onChangeText={(t) => {
                        setDescription(t)
                        descriptionError && setDescriptionError('')
                    }}
                    error={descriptionError}
                    multiline
                    inputStyle={[{ height: height(15), textAlignVertical: 'top', marginTop: sizes.marginVertical / 2 }]}
                />
                <Spacer isBasic />
                <Spacer isSmall />
                <Pickers.Underlined
                    title={'Group Privacy'}
                    data={privacyOptions}
                    value={privacy}
                    onChange={(value, index) => {
                        setPrivacy(value)
                        privacyError && setPrivacyError('')
                    }}
                    error={privacyError}
                    isTitleSolidColor
                />
                <Spacer isDoubleBase />
                <Buttons.Colored
                    text={!isEditingGroup ? 'Create Group' : 'Save Changes'}
                    onPress={handleSubmit}
                    isLoading={loadingSubmit}
                />
                <Spacer isDoubleBase />
                <Common.SuccessPopup
                    visible={isConfirmationPopupVisible}
                    toggle={toggleConfirmationPopup}
                    title={!isEditingGroup ? 'Your group has been created' : 'Your group has been updated'}
                    titleStyle={[appStyles.marginHorizontalLarge]}
                    onPressButton1={goBack}
                    buttonText1='Continue'
                />

            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}
