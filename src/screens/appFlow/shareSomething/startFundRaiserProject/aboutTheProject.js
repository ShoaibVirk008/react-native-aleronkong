import React, { Component, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { Icon, SearchBar } from 'react-native-elements';
import { Buttons, Headers, Pickers, ScrollViews, Spacer, TextInputs, Wrapper } from '../../../../components';
import { navigate } from '../../../../navigation/rootNavigation';
import { Api, appStyles, colors, HelpingMethods, routes } from '../../../../services';

const tempCategories = [
    {
        label: 'Comics',
        value: 'Comics',
    },
    {
        label: 'Others',
        value: 'Others',
    }
]
const tempSubCategories = [
    {
        label: 'Events',
        value: 'Events',
    },
    {
        label: 'Others',
        value: 'Others',
    }
]
export default function Index({ route }) {
    const data = route?.params?.data || null
    console.log('About the project data: ' + data)

    //category
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    const [categoryLabel, setCategoryLabel] = useState('')
    const [categoryError, setCategoryError] = useState('')
    const [loadingGetCategories, setLoadingGetCategories] = useState(true)
    //sub category
    const [subCategories, setSubCategories] = useState([])
    const [subCategory, setSubCategory] = useState('')
    const [subCategoryLabel, setSubCategoryLabel] = useState('')
    const [subCategoryError, setSubCategoryError] = useState('')
    const [loadingGetSubCategories, setLoadingGetSubCategories] = useState(false)
    //location
    const [location, setLocation] = useState('')
    const [locationError, setLocationError] = useState('')


    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        await getCategories()
        setLoadingGetCategories(false)
    }
    const getCategories = async () => {
        await Api.getFundraiserProjectCategories().
            then(res => {
                if (res) {
                    const tempCategories = res.data.map((item, index) => {
                        const tempItem = { label: item.title, value: item._id }
                        return tempItem
                    })
                    setCategories(tempCategories)
                    //setSubCategories([])
                    //setSubCategory('')
                }
            })
    }

    const getSubCategories = async (categoryId) => {
        setLoadingGetSubCategories(true)
        await Api.getFundraiserProjectSubcategories({ categoryId }).
            then(res => {
                if (res) {
                    const tempCategories = res.data.map((item, index) => {
                        const tempItem = { label: item.title, value: item._id }
                        return tempItem
                    })
                    setSubCategories(tempCategories)
                }
            })
        setLoadingGetSubCategories(false)
    }

    const validateNext = () => {
        HelpingMethods.handleAnimation()
        !category || category === 'placeholder' ? setCategoryError('Select category') : setCategoryError('')
        !subCategory || subCategory === 'placeholder' ? setSubCategoryError('Select subcategory') : setSubCategoryError('')
        !location ? setLocationError('Enter location') : setLocationError('')
        if (category && subCategory && location) {
            return true
        } else {
            return false
        }
    }

    const handleNext = () => {
        if (validateNext()) {
            navigate(
                routes.shareSomethingRoutes.startFundRaiserProjectRoutes.fundingDetails,
                {
                    data: {
                        ...data,
                        category, categoryLabel,
                        subCategory, subCategoryLabel,
                        location
                    }
                }
            )
            // const tempData= {
            //     ...data,
            //     category, categoryLabel,
            //     subCategory, subCategoryLabel,
            //     location
            // }
            // console.log('tempData: ',tempData)
        }
    }
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'About the project'}
                showBackArrow
                alignTitleLeft
            />
            <ScrollViews.WithKeyboardAvoidingView
                footer={
                    <Wrapper marginHorizontalSmall>
                        <Spacer isBasic />
                        <Buttons.Colored
                            text={'Next'}
                            //onPress={() => navigate(routes.shareSomethingRoutes.startFundRaiserProjectRoutes.fundingDetails)}
                            onPress={handleNext}
                        />
                        <Spacer isBasic />
                    </Wrapper>
                }
            >
                <Spacer isBasic />
                <Pickers.Underlined
                    title={'Category'}
                    data={categories}
                    value={category}
                    onChange={(value, index) => {
                        //console.log('onChange: ',value)
                        setCategory(value)
                        if (value != 'placeholder') {
                            let tempItem = categories.find(item => item.value === value)
                            if (tempItem) {
                                setCategoryLabel(tempItem.label)
                            }
                        }

                        categoryError && setCategoryError('')
                        if (value != 'placeholder') {
                            setSubCategory('')
                            setSubCategoryLabel('')
                            getSubCategories(value)
                        }
                    }}
                    titleStyle={[appStyles.textRegular]}
                    isTitleSolidColor
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
                {
                    category && category != 'placeholder' ?
                        <>
                            <Spacer isBasic />
                            <Pickers.Underlined
                                title={'Subcategory'}
                                data={subCategories}
                                value={subCategory}
                                onChange={(value, index) => {
                                    setSubCategory(value)
                                    if (value != 'placeholder') {
                                        let tempItem = subCategories.find(item => item.value === value)
                                        if (tempItem) {
                                            setSubCategoryLabel(tempItem.label)
                                        }
                                    }
                                    subCategoryError && setSubCategoryError('')

                                }}
                                titleStyle={[appStyles.textRegular]}
                                isTitleSolidColor
                                error={subCategoryError}
                                right={
                                    loadingGetSubCategories ?
                                        <ActivityIndicator
                                            size={totalSize(2)}
                                            color={colors.appTextColor4}
                                        />
                                        :
                                        null
                                }
                            />
                        </>
                        :
                        null
                }
                <Spacer isBasic />
                <TextInputs.Underlined
                    title={'Project Location'}
                    value={location}
                    onChangeText={(t) => {
                        setLocation(t)
                        locationError && setLocationError('')
                    }}
                    titleStyle={[appStyles.textRegular]}
                    // right={
                    //     <Icon name="caret-down-sharp" type="ionicon" size={totalSize(1.5)} color={colors.appTextColor1} />
                    // }
                    isTitleSolidColor
                    error={locationError}
                />
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}
