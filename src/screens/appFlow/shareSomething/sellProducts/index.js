import React, { Component, useCallback, useEffect, useState } from 'react';
import { View, Alert, FlatList, ActivityIndicator } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { Icon, SearchBar } from 'react-native-elements';
import { Headers, ScrollViews, Spacer, TextInputs, Wrapper, Text, Pickers, Lines, Switches, Buttons, Modals, Images, Icons, Toasts, Common, Chips } from '../../../../components';
import { Api, appImages, appStyles, colors, HelpingMethods, imagePickerOptions, routes, sizes } from '../../../../services';
import * as ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import { goBack, navigate } from '../../../../navigation/rootNavigation';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

const tempTypes = [{ label: 'Physical', value: 'physical' }, { label: 'Digital', value: 'digital' }]
const tempStatuses = [{ label: 'Active', value: 'active' }, { label: 'Draft', value: 'draft' }, { label: 'Inactive', value: 'inactive' }]
const tempSimultaneousDeviceUsageOptions = [{ label: 'Unlimited', value: 'unlimited' }, { label: 'Limited', value: 'limited' }]
export default function Index() {

    //title
    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState('')
    //description
    const [description, setDescription] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    //media/images
    const [media, setMedia] = useState([])
    const [mediaError, setMediaError] = useState('')
    //type
    const [type, setType] = useState('physical')
    const [types, setTypes] = useState(tempTypes)
    const [typeError, setTypeError] = useState('')
    //status
    const [status, setStatus] = useState('')
    const [statuses, setStatuses] = useState(tempStatuses)
    const [statusError, setStatusError] = useState('')
    //more detail about physical product
    const [colorText, setColorText] = useState('')
    const [availableColors, setAvailableColors] = useState([])
    const [availableColorsError, setAvailableColorsError] = useState('')
    const [sizeText, setSizeText] = useState('')
    const [availableSizes, setAvailableSizes] = useState([])
    const [availableSizesError, setAvailableSizesError] = useState('')
    //more detail about digital product
    const [productFile, setProductFile] = useState(null)
    const [productFileError, setProductFileError] = useState(null)
    const [productSampleFile, setProductSampleFile] = useState(null)
    const [sampleProductFileError, setSampleProductFileError] = useState(null)
    const [productFileSize, setProductFileSize] = useState(null)
    const [asin, setAsin] = useState('')
    const [publicationDate, setPublicationDate] = useState(null)
    const [publicationDateError, setPublicationDateError] = useState(null)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [language, setLanguage] = useState('')
    const [simultaneousDeviceUsage, setSimultaneousDeviceUsage] = useState('unlimited')
    const [simultaneousDeviceUsageOptions, setSimultaneousDeviceUsageOptions] = useState(tempSimultaneousDeviceUsageOptions)
    const [textToSpeech, setTextToSpeech] = useState(false)
    const [enhancedTypeSetting, setEnhancedTypeSetting] = useState(false)
    const [xRay, setXRay] = useState(false)
    const [wordWise, setWordWise] = useState(false)
    const [printLength, setPrintLength] = useState('1')
    const [lending, setLending] = useState(false)
    //price
    const [price, setPrice] = useState('')
    const [priceError, setPriceError] = useState('')
    //categories
    const [categories, setCategories] = useState([])
    const [loadingGetCategories, setLoadingGetCategories] = useState(false)
    const [category, setCategory] = useState('')
    const [categoryLabel, setCategoryLabel] = useState('')
    const [categoryError, setCategoryError] = useState('')
    //quantity
    const [quantity, setQuantity] = useState('1')
    //sync with amazone
    const [sync, setSync] = useState(true)
    //loading
    const [loadingAddProduct, setLoadingAddProduct] = useState(false)

    const isPhysicalProduct = type === types[0].value
    const isDigitalProduct = type === types[1].value
    const isAudioBookCategorySelected = categoryLabel === 'AudioBook'

    useEffect(() => {
        handleGetCategories()
    }, [type])

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // console.warn("A date has been picked: ", date);
        // console.warn("date string: ", moment(date).toISOString());
        hideDatePicker();
        setPublicationDate(moment(date).toISOString())
        publicationDateError && setPublicationDateError('')
    };

    const launchMediaPicker = () => {
        ImagePicker.launchImageLibrary({ ...imagePickerOptions, selectionLimit: 0, mediaType: 'photo' }, (response) => {
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
                    const isVideo = type.includes('video')
                    let tempObj = {
                        uri: item.uri,
                        type: item.type,
                        name: item.fileName
                    }
                    photos.push(tempObj);
                }
                setMedia([...media, ...photos])
            }
        });
    }
    const handleDocumentSelection = useCallback(async () => {
        const file = await DocumentPicker.pick({
            presentationStyle: 'fullScreen',
            //type: !isAudioBookCategorySelected ? DocumentPicker.types.pdf : DocumentPicker.types.audio
        });
        if (file) {
            const { name, uri, type, size } = file[0]
            console.log('DocumentPicker.pick response: ', file)
            const tempFile = {
                name,
                uri,
                type
            }
            console.log('tempFile: ', tempFile)

            setProductFile(tempFile)
            setProductFileSize(size)
            productFileError && [HelpingMethods.handleAnimation(), setProductFileError(''),]
        }
        console.log('file: ', file)

        // Send file via WebRTC
    }, []);

    const handleAudioSampleSelection = useCallback(async () => {
        const file = await DocumentPicker.pick({
            presentationStyle: 'fullScreen',
            type: DocumentPicker.types.audio
        });
        if (file) {
            const { name, uri, type, size } = file[0]
            console.log('handleAudioSampleSelection response: ', file)
            const tempFile = {
                name,
                uri,
                type
            }
            console.log('tempFile: ', tempFile)

            setProductSampleFile(tempFile)
            sampleProductFileError && [HelpingMethods.handleAnimation(), setSampleProductFileError(''),]
        }
        console.log('file: ', file)

        // Send file via WebRTC
    }, []);

    const handleGetCategories = async () => {
        setLoadingGetCategories(true)
        await Api.getProductCategories(type).
            then(res => {
                if (res) {
                    const tempCategories = res.data.map((item, index) => {
                        const tempCategoryObj = {
                            label: item.title,
                            value: item._id
                        }
                        return tempCategoryObj
                    })
                    setCategories(tempCategories)
                    setCategory('')
                    setCategoryLabel('')
                    setProductFile(null)
                    setProductFileSize(null)
                }
            })
        setLoadingGetCategories(false)
    }


    const validateAddProduct = () => {
        HelpingMethods.handleAnimation()
        !title ? setTitleError('Enter title') : setTitleError('')
        !description ? setDescriptionError('Enter description') : setDescriptionError('')
        !media.length ? setMediaError('Add product photos') : setMediaError('')
        !type || type === 'placeholder' ? setTypeError('Select type') : setTypeError('')
        !category || category === 'placeholder' ? setCategoryError('Select category') : setCategoryError('')
        !status || status === 'placeholder' ? setStatusError('Select status') : setStatusError('')
        !availableSizes.length && isPhysicalProduct ? setAvailableSizesError('Add available sizes') : setAvailableSizesError('')
        !availableColors.length && isPhysicalProduct ? setAvailableColorsError('Add available colors') : setAvailableColorsError('')
        !productFile && isDigitalProduct ? setProductFileError('Add product file') : setProductFileError('')
        !productSampleFile && isDigitalProduct && isAudioBookCategorySelected ? setSampleProductFileError('Add product sample file') : setSampleProductFileError('')
        !price ? setPriceError('Enter price') : setPriceError('')
        if (title && description &&
            media.length &&
            (type && type != 'placeholder') &&
            price &&
            (category && category != 'placeholder') &&
            (status && status != 'placeholder')
        ) {
            if (isPhysicalProduct) {
                if (availableColors && availableSizes) {
                    return true
                } else {
                    return false
                }
            } else if (isDigitalProduct && productFile) {
                if (!isAudioBookCategorySelected) {
                    return true
                } else if (productSampleFile) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        } else {
            return false
        }
    }

    const handleAddProduct = async () => {
        if (validateAddProduct()) {
            setLoadingAddProduct(true)
            let tempProductFile = ''
            let tempProductSmapleFile = ''
            let tempMedia = []
            if (media) {
                for (const mediaObj of media) {
                    await Api.uploadFile(mediaObj).
                        then(res => {
                            if (res) {
                                tempMedia.push(res.data.file)
                            }
                        })
                }
            }
            if (isDigitalProduct && productFile) {
                await Api.uploadFile(productFile).
                    then(res => {
                        if (res) {
                            tempProductFile = res.data.file
                        }
                    })
            }
            if (isAudioBookCategorySelected && productSampleFile) {
                await Api.uploadFile(productSampleFile).
                    then(res => {
                        if (res) {
                            tempProductSmapleFile = res.data.file
                        }
                    })
            }

            //physical products params
            let params = {}
            const physicalProductParams = {
                availableColors,
                availableSizes,
                quantity:Number(quantity),
            }
            const digitalProductParams = {
                productFile: tempProductFile,
                productSampleFile: tempProductSmapleFile,
                fileSize: Number(productFileSize),
                asin,
                publicationDate: publicationDate ? HelpingMethods.dateFormateBackend(publicationDate) : '',
                language,
                simultaneousDeviceUsage,
                textToSpeech,
                enhancedTypeSetting,
                xRay,
                wordWise,
                printLength: Number(printLength),
                lending,
            }
            params = isPhysicalProduct ? physicalProductParams : digitalProductParams
            await Api.AddProduct({
                title,
                description,
                media: tempMedia,
                type,
                price: Number(price),
                category,
                status,
                ...params,
                //physical products params
                // availableColors,
                // availableSizes,
                // quantity,

                //digital product params
                // productFile: tempProductFile,
                // productSampleFile: tempProductSmapleFile,
                // asin,
                // publicationDate: publicationDate ? HelpingMethods.dateFormateBackend(publicationDate) : '',
                // language,
                // simultaneousDeviceUsage,
                // textToSpeech,
                // enhancedTypeSetting,
                // xRay,
                // wordWise,
                // printLength,
                // lending,
                //sync with amazone
                syncWithAmazon: sync
            }).
                then(res => {
                    if (res) {
                        Toasts.Success('Product has been added successfully')
                        goBack()
                    }
                })
            setLoadingAddProduct(false)
        }
    }

    const handleDiscard = () => {

    }

    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'Add Product'}
                showBackArrow
            />
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer />
                <Spacer isSmall />
                <TextInputs.Underlined
                    title={'Title'}
                    value={title}
                    onChangeText={(t) => {
                        setTitle(t)
                        titleError && setTitleError('')
                    }}
                    error={titleError}
                />
                <Spacer />
                <Spacer isSmall />
                <TextInputs.Underlined
                    title={'Description'}
                    value={description}
                    // onChangeText={(t) => {
                    //     setDescription(t)
                    //     descriptionError && setDescriptionError('')
                    // }}
                    onPress={() => {
                        navigate(routes.shareSomethingRoutes.productDescription,
                            {
                                description,
                                handleChangeText: (t) => {
                                    setDescription(t)
                                    descriptionError && [HelpingMethods.handleAnimation(),setDescriptionError('')]
                                }
                            }
                        )
                    }}
                    error={descriptionError}
                    iconNameRight={'paragraph'}
                    iconTypeRight='font-awesome-5'
                />
                <Spacer />
                <Spacer isSmall />
                <Wrapper marginHorizontalBase>
                    <Text isInput style={{ color: colors.appTextColor1 + '60' }}>Media</Text>
                    <Spacer isSmall />
                    <Wrapper isBorderedWrapper marginHorizontalZero>
                        <FlatList
                            horizontal
                            data={media}
                            showsHorizontalScrollIndicator={false}
                            ItemSeparatorComponent={() => <Spacer isSmall horizontal />}
                            renderItem={({ item, index }) => {
                                return (
                                    <Wrapper key={index}>
                                        <Images.SqareRound
                                            source={{ uri: item.uri }}
                                            size={width(30)}
                                        />
                                        <Icons.Button
                                            iconName={'x'}
                                            iconType={"feather"}
                                            buttonColor={colors.error}
                                            iconColor={colors.appTextColor6}
                                            iconSize={totalSize(1.5)}
                                            buttonSize={totalSize(2.5)}
                                            onPress={() => {
                                                const newMedia = media.filter(it => it != item)
                                                setMedia(newMedia)
                                            }}
                                            buttonStyle={{
                                                position: 'absolute',
                                                top: sizes.smallMargin,
                                                left: sizes.smallMargin,
                                            }}
                                            isRound
                                        />
                                    </Wrapper>
                                )
                            }}
                            ListFooterComponent={() =>
                                <Wrapper flexDirectionRow>
                                    {
                                        media.length ?
                                            <Spacer isSmall horizontal /> : null
                                    }
                                    <Icons.Button
                                        iconName={'plus'}
                                        buttonStyle={{ borderWidth: 1, borderColor: colors.appBgColor4, borderStyle: 'dashed' }}
                                        buttonSize={width(30)}
                                        iconColor={colors.appTextColor1 + '40'}
                                        //onPress={toggleImagePicker}
                                        onPress={launchMediaPicker}
                                    />
                                </Wrapper>}
                        />
                    </Wrapper>
                    <Common.ErrorText
                        errorText={mediaError}
                        containerStyle={{ marginTop: sizes.TinyMargin }}
                    />
                </Wrapper>

                <Spacer />
                <Spacer isSmall />
                <Pickers.Underlined
                    title={'Physical / Digital'}
                    data={types}
                    value={type}
                    onChange={(value, index) => {
                        HelpingMethods.handleAnimation()
                        setType(value)
                        typeError && setTypeError('')
                    }}
                    error={typeError}
                />
                <Spacer />
                <Spacer isSmall />
                <Pickers.Underlined
                    title={'Category'}
                    data={categories}
                    value={category}
                    onChange={(value, index) => {
                        setCategory(value)

                        if (value != 'placeholder') {
                            const tempCategory = categories.find(item => item.value === value)
                            if (tempCategory) {
                                setCategoryLabel(tempCategory.label)
                            }
                        }
                        productFile && setProductFile(null)
                        productSampleFile && setProductSampleFile(null)
                        categoryError && [HelpingMethods.handleAnimation(), setCategoryError('')]
                    }}
                    error={categoryError}
                    right={
                        loadingGetCategories ?
                            <ActivityIndicator
                                size={totalSize(2)}
                                color={colors.appTextColor4}
                            />
                            :
                            null
                    }
                />
                <Spacer />
                <Spacer isSmall />
                <Pickers.Underlined
                    title={'Status'}
                    data={statuses}
                    value={status}
                    onChange={(value, index) => {
                        setStatus(value)
                        statusError && [HelpingMethods.handleAnimation(), setStatusError('')]
                    }}
                    error={statusError}
                />
                {
                    isPhysicalProduct ?
                        <>
                            <Spacer isDoubleBase />
                            <Wrapper marginHorizontalBase>
                                <Text isMedium isTextColor2 isBoldFont>Please add more detail about your physical product</Text>
                            </Wrapper>
                            <Spacer />
                            <TextInputs.Underlined
                                titleStatic={'Available Colors'}
                                placeholder={'Enter color to add'}
                                value={colorText}
                                onChangeText={t => setColorText(t)}
                                error={availableColorsError}
                                right={
                                    <Icons.Button
                                        iconName={'plus'}
                                        iconSize={height(3)}
                                        buttonSize={height(4)}
                                        buttonColor={colors.appColor1 + '20'}
                                        isRound
                                        onPress={() => {
                                            if (colorText) {
                                                let tempColors = availableColors.slice()
                                                tempColors.push(colorText)
                                                console.log('tempSizes: ', tempColors)
                                                setAvailableColors(tempColors)
                                                setColorText('')
                                                availableColorsError && [HelpingMethods.handleAnimation(), setAvailableColorsError('')]

                                            } else {
                                                Toasts.Error('Please enter a color to add')
                                            }
                                        }}
                                    />
                                }
                            />
                            {
                                availableColors?.length ?
                                    <>
                                        <Spacer isSmall />
                                        <Chips.Primary
                                            containerStyle={[appStyles.marginHorizontalBase, { flexWrap: 'wrap' }]}
                                            data={availableColors}
                                            onPress={(item, index) => {
                                                let tempSizes = availableColors.filter(ite => ite != item)
                                                setAvailableColors(tempSizes)
                                            }}
                                            chipStyle={{ backgroundColor: colors.appColor1 + '20' }}
                                        />
                                    </>
                                    :
                                    null
                            }
                            <Spacer />
                            <Spacer isSmall />
                            <TextInputs.Underlined
                                titleStatic={'Available Sizes'}
                                placeholder={'Enter size to add'}
                                value={sizeText}
                                onChangeText={t => setSizeText(t)}
                                error={availableSizesError}
                                right={
                                    <Icons.Button
                                        iconName={'plus'}
                                        iconSize={height(3)}
                                        buttonSize={height(4)}
                                        buttonColor={colors.appColor1 + '20'}
                                        isRound
                                        onPress={() => {
                                            if (sizeText) {
                                                let tempSizes = availableSizes.slice()
                                                tempSizes.push(sizeText)
                                                console.log('tempSizes: ', tempSizes)
                                                setAvailableSizes(tempSizes)
                                                setSizeText('')
                                                availableSizesError && [HelpingMethods.handleAnimation(), setAvailableSizesError('')]
                                            } else {
                                                Toasts.Error('Please enter a size to add')
                                            }
                                        }}
                                    />
                                }
                            />
                            {
                                availableSizes?.length ?
                                    <>
                                        <Spacer isSmall />
                                        <Chips.Primary
                                            containerStyle={[appStyles.marginHorizontalBase, { flexWrap: 'wrap' }]}
                                            data={availableSizes}
                                            onPress={(item, index) => {
                                                let tempSizes = availableSizes.filter(ite => ite != item)
                                                setAvailableSizes(tempSizes)
                                            }}
                                            chipStyle={{ backgroundColor: colors.appColor1 + '20' }}
                                        />
                                    </>
                                    :
                                    null
                            }

                        </>
                        :
                        null
                }
                {
                    isDigitalProduct ?
                        <>
                            <Spacer isDoubleBase />
                            <Wrapper marginHorizontalBase>
                                <Text isMedium isTextColor2 isBoldFont>Please add more detail about your digital product</Text>
                            </Wrapper>
                            <Spacer isSmall />
                            <TextInputs.Underlined
                                title={!isAudioBookCategorySelected ? 'Upload PDF File' : 'Upload Audio File'}
                                value={productFile ? productFile.name : ''}
                                onPress={() => handleDocumentSelection()}
                                error={productFileError}
                            />
                            {
                                isAudioBookCategorySelected ?
                                    <>
                                        <Spacer />
                                        <Spacer isSmall />
                                        <TextInputs.Underlined
                                            title={'Upload Sample Audio File'}
                                            value={productSampleFile ? productSampleFile.name : ''}
                                            onPress={handleAudioSampleSelection}
                                            error={sampleProductFileError}
                                        />
                                    </>
                                    :
                                    null
                            }
                            <Spacer />
                            <Spacer isSmall />
                            <TextInputs.Underlined
                                title={'ASIN'}
                                value={asin}
                                onChangeText={t => setAsin(t)}
                            />
                            <Spacer />
                            <Spacer isSmall />
                            <TextInputs.Underlined
                                title={'Publication Date'}
                                value={publicationDate ? HelpingMethods.dateFormat_DDMMYYYY(publicationDate) : ''}
                                // onChangeText={t=>setPu(t)}
                                onPress={showDatePicker}
                            />
                            <Spacer />
                            <Spacer isSmall />
                            <TextInputs.Underlined
                                title={'Language'}
                                value={language}
                                onChangeText={t => setLanguage(t)}
                            />
                            <Spacer />
                            <Spacer isSmall />
                            <Pickers.Underlined
                                title={'Simultaneous Device Usage'}
                                data={simultaneousDeviceUsageOptions}
                                value={simultaneousDeviceUsage}
                                onChange={(value, index) => {
                                    setSimultaneousDeviceUsage(value)
                                }}
                            />
                            <Spacer />
                            <Spacer isSmall />
                            <TextinputSwitch
                                title={'Text-to-Speech'}
                                value={textToSpeech}
                                onPress={() => setTextToSpeech(!textToSpeech)}
                            />
                            <Spacer />
                            <Spacer isSmall />
                            <TextinputSwitch
                                title={'Enahnce typesetting'}
                                value={enhancedTypeSetting}
                                onPress={() => setEnhancedTypeSetting(!enhancedTypeSetting)}
                            />
                            <Spacer />
                            <Spacer isSmall />
                            <TextinputSwitch
                                title={'X-Ray'}
                                value={xRay}
                                onPress={() => setXRay(!xRay)}
                            />
                            <Spacer />
                            <Spacer isSmall />
                            <TextinputSwitch
                                title={'Word Wise'}
                                value={wordWise}
                                onPress={() => setWordWise(!wordWise)}
                            />
                            <Spacer />
                            <Spacer isSmall />
                            <TextInputs.Underlined
                                title={'Print length'}
                                value={printLength}
                                onChangeText={t => setPrintLength(t)}
                                keyboardType='number-pad'
                                right={<Text isMedium>Pages</Text>}
                            />
                            <Spacer />
                            <Spacer isSmall />
                            <TextinputSwitch
                                title={'Lending'}
                                value={lending}
                                onPress={() => setLending(!lending)}
                            />
                        </>
                        :
                        null
                }


                {
                    isPhysicalProduct ?
                        <>
                            <Spacer />
                            <Spacer isSmall />
                            <TextInputs.Underlined
                                titleStatic={'Quantity'}
                                value={quantity}
                                onChangeText={(t) => { 
                                    setQuantity(t)
                                    // if(t){
                                    //     setQuantity(t)
                                    // }else{
                                    //     setQuantity('0')
                                    // }
                                }}
                                keyboardType={'number-pad'}
                                inputContainerStyle={{ flex: 0, ...appStyles.marginHorizontalSmall, height: sizes.inputHeight - height(1) }}
                                left={
                                    <Wrapper>
                                        <Icon
                                            name='leftcircleo'
                                            type='antdesign'
                                            color={colors.appTextColor5}
                                            size={totalSize(2.5)}
                                            onPress={() => {
                                                const tempQuantity = Number(quantity)
                                                //console.log('tempQuantity: ',tempQuantity)
                                              tempQuantity > 1 && setQuantity(JSON.stringify(tempQuantity - 1))
                                            }}
                                        />
                                    </Wrapper>
                                }
                                right={
                                    <Wrapper flex={1} alignItemsFlexStart>
                                        <Icon
                                            name='rightcircleo'
                                            type='antdesign'
                                            color={colors.appTextColor5}
                                            size={totalSize(2.5)}
                                            onPress={() => {
                                                const tempQuantity = Number(quantity)
                                                //console.log('tempQuantity: ',tempQuantity)
                                                setQuantity(JSON.stringify(tempQuantity + 1))
                                            }}
                                        />
                                    </Wrapper>
                                }
                            />
                        </>
                        :
                        null
                }
                <Spacer />
                <Spacer isSmall />
                <TextInputs.Underlined
                    title={'Price'}
                    value={price ? `$ ${price}` : ''}
                    onChangeText={(t) => {
                        const tempT = t.replace('$ ', '')
                        setPrice(tempT)
                        priceError && setPriceError('')
                    }}
                    error={priceError}
                />
                <Spacer />
                <Lines.Horizontal />
                <Spacer />
                <Wrapper flexDirectionRow marginHorizontalBase>
                    <Wrapper flex={1}>
                        <Text isMedium>Sync with Amazon Marketplace</Text>
                    </Wrapper>
                    <Wrapper>
                        <Switches.Primary
                            value={sync}
                            onPress={() => setSync(!sync)}
                        />
                    </Wrapper>
                </Wrapper>
                <Spacer />
                <Lines.Horizontal />
                <Spacer />
                <Wrapper marginHorizontalBase flexDirectionRow style={{}}>
                    <Wrapper flex={1}>
                        <Buttons.ColoredSmall
                            text={'Save'}
                            buttonStyle={[{ borderRadius: 5 }, appStyles.center, appStyles.paddingVerticalSmall]}
                            onPress={handleAddProduct}
                            isLoading={loadingAddProduct}
                        />
                    </Wrapper>
                    <Wrapper flex={0.1} />
                    <Wrapper flex={1}>
                        <Buttons.BorderedSmall
                            text={'Discard'}
                            buttonStyle={[{ borderRadius: 5 }, appStyles.center, appStyles.paddingVerticalSmall]}
                            tintColor={colors.error + 'BF'}
                            onPress={handleDiscard}
                        />
                    </Wrapper>
                </Wrapper>
                <Spacer isDoubleBase />
            </ScrollViews.WithKeyboardAvoidingView>
            <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </Wrapper>
    )
}


const TextinputSwitch = ({ title, value, onPress }) => {
    return (
        <TextInputs.Underlined
            title={title}
            value={value ? 'Enabled' : 'Disabled'}
            //onChangeText={t => setLanguage(t)}
            onPress={onPress}
            right={<Switches.Primary
                value={value}
                onPress={onPress}
            />}
        />
    )
}