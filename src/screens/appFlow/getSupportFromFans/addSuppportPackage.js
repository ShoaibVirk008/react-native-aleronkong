import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Buttons, Common, Headers, Images, Modals, ScrollViews, Spacer, TextInputs, Toasts, Wrapper } from '../../../components';
import { goBack } from '../../../navigation/rootNavigation';
import { Api, appImages, colors, HelpingMethods, imagePickerOptions, sizes, Validations } from '../../../services';
import * as ImagePicker from 'react-native-image-picker';


export default function Index({ route }) {
    const packageData = route?.params?.data
    const is_edit = route?.params?.data
    const temp_description = 'We do a RUNNING high five… (also in spirit) *All rewards come with lifelong appreciation'

    const [image, setImage] = useState(null)
    const [imageError, setImageError] = useState('')
    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState('')
    const [price, setPrice] = useState('')
    const [priceError, setPriceError] = useState('')
    const [description, setDescription] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [loadingAdd, setLoadingAdd] = useState(false)
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const [loadingDelete, setLoadinDelete] = useState(false)
    const [isDeletePopupVisible, setDeletePopupVisibility] = useState(false)

    const toggleDeletePopup = () => setDeletePopupVisibility(!isDeletePopupVisible)

    useEffect(() => {
        if (packageData) {
            setTitle(packageData.title)
            setPrice(packageData.price)
            setDescription(packageData.description)
        }
    }, [])

    const launchImagePicker = () => {
        ImagePicker.launchImageLibrary({ ...imagePickerOptions, mediaType: 'photo' }, (response) => {
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
                setImage(mediaObj)
                imageError && [HelpingMethods.handleAnimation(), setImageError('')]

            }
        });
    }

    const handleValidation = () => {
        HelpingMethods.handleAnimation()
        !image && !is_edit ? setImageError('Add image') : setImageError('')
        !title ? setTitleError('Enter title') : setTitleError('')
        !price ? setPriceError('Enter price') : setPriceError('')
        !description ? setDescriptionError('Enter description') : setDescriptionError('')
        if (title && price && description) {
            if (is_edit) {
                return true
            } else {
                if (image) {
                    return true
                } else {
                    return false
                }
            }
        } else {
            return false
        }
    }
    const handleAddPackage = async () => {
        if (handleValidation()) {
            setLoadingAdd(true)
            let imageUrl = ''
            if (image) {
                await Api.uploadFile(image)
                    .then(res => {
                        if (res) {
                            imageUrl = res.data.file
                        }
                    })
            }
            await Api.createPackage({ media: imageUrl, title, price: Number(price), description })
                .then(res => {
                    if (res) {
                        Toasts.Success('Package has been added')
                        goBack()
                    }
                })
            setLoadingAdd(false)
        }
    }
    const handleUpdatePackage = async () => {
        if (handleValidation()) {
            setLoadingUpdate(true)
            let imageUrl = ''
            if (image) {
                await Api.uploadFile(image)
                    .then(res => {
                        if (res) {
                            imageUrl = res.data.file
                        }
                    })
            }
            await Api.updatePackage({ packageId:packageData._id,media: imageUrl || packageData.media, title, price: Number(price), description })
                .then(res => {
                    if (res) {
                        Toasts.Success('Package has been updated')
                        goBack()
                    }
                })
            setLoadingUpdate(false)
        }
    }

    const handleDeletePackage = async () => {
        setLoadinDelete(true)
        await Api.deletePackage({ packageId: packageData._id })
            .then(res => {
                if (res) {
                    toggleDeletePopup()
                    Toasts.Success('Package has been deleted')
                    goBack()
                }
            })
        setLoadinDelete(false)
    }
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={!is_edit ? 'Add Support Package' : 'Edit Support Package'}
                showBackArrow
            />
            <ScrollViews.WithKeyboardAvoidingView
                footer={
                    <Wrapper marginHorizontalSmall>
                        <Spacer isSmall />
                        {
                            !is_edit ?
                                <Buttons.Colored
                                    text={'Add'}
                                    onPress={handleAddPackage}
                                    isLoading={loadingAdd}
                                />
                                :
                                <>
                                    <Buttons.Colored
                                        text={'Save Changes'}
                                        onPress={handleUpdatePackage}
                                        isLoading={loadingUpdate}
                                    />
                                    <Spacer isSmall />
                                    <Buttons.Bordered
                                        text={'Delete'}
                                        tintColor={colors.error}
                                        onPress={toggleDeletePopup}
                                        isLoading={loadingDelete}
                                    />
                                </>
                        }
                        <Spacer isBasic />
                    </Wrapper>
                }
            >
                <Spacer isBasic />
                <Spacer isSmall />
                <Wrapper alignItemsCenter>
                    <Images.Profile
                        source={{ uri: image ? image.uri : packageData ? packageData.media : null }}
                        size={totalSize(17.5)}
                        imageStyle={[{ borderRadius: sizes.cardRadius }]}
                        overlayStyle={[{ borderRadius: sizes.cardRadius }]}
                        onPressCamera={launchImagePicker}
                        onPress={launchImagePicker}
                    />
                    <Common.ErrorText
                        errorText={imageError}
                        containerStyle={{ marginTop: sizes.TinyMargin }}
                    />
                </Wrapper>
                <Spacer isBasic />
                <Spacer isBasic />
                <TextInputs.Underlined
                    title={'Title'}
                    value={title}
                    onChangeText={t => {
                        setTitle(t)
                        titleError && [HelpingMethods.handleAnimation(), setTitleError('')]
                    }}
                    error={titleError}
                    isTitleSolidColor
                />
                <Spacer isBasic />
                <Spacer isSmall />
                <TextInputs.Underlined
                    title={'Price per month'}
                    value={price ? `$ ${price}` : ''}
                    onChangeText={t => {
                        const tempPrice = t.replace('$ ', '')
                        setPrice(tempPrice)
                        priceError && [HelpingMethods.handleAnimation(), setPriceError('')]
                    }}
                    error={priceError}
                    keyboardType='number-pad'
                    isTitleSolidColor
                />
                <Spacer isBasic />
                <Spacer isSmall />
                <TextInputs.Underlined
                    titleStatic={'Description'}
                    multiline
                    value={description}
                    onChangeText={t => {
                        setDescription(t)
                        descriptionError && [HelpingMethods.handleAnimation(), setDescriptionError('')]
                    }}
                    error={descriptionError}
                    isTitleSolidColor
                    inputStyle={{ height: height(12.5), marginVertical: height(1), textAlignVertical: 'top' }}
                />
            </ScrollViews.WithKeyboardAvoidingView>
            <Modals.PopupPrimary
                visible={isDeletePopupVisible}
                toggle={toggleDeletePopup}
                title={'Are you sure you want to delete this package? '}
                info={'You will lose the support from people who are supporting you on this package.'}
                buttonText1='No'
                buttonText2={'Yes'}
                onPressButton1={toggleDeletePopup}
                onPressButton2={() => {
                    handleDeletePackage()
                }}
                loadingButton2={loadingDelete}
                topMargin={height(65)}
            />
        </Wrapper>
    )
}
