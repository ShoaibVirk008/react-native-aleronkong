import moment from 'moment';
import React, { Component, useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { Headers, Spacer, Wrapper, Text, Icons, Cards, Images, ScrollViews, Buttons, Modals, Common, TextInputs, Loaders, Toasts } from '../../../components';
import { goBack, navigate } from '../../../navigation/rootNavigation';
import { Api, appImages, appStyles, colors, HelpingMethods, post_types, routes, sizes } from '../../../services';
import { UseModal } from '../../../services/hooks';
import { setPosts } from '../../../services/store/actions';
const amounts = ['$10', '$20', '$50', '$100', '$200', 'Custom']
export default function Index({ navigation, route }) {
    const { setParams } = navigation
    const postData = route?.params?.data
    const { creator, fundraising } = postData
    const lastScreen = route?.params?.lastScreen || null
    const isHomeScreensPost = lastScreen === routes.home
    // console.log('Post data: ' + postData)
    // console.log('fundraising detail data: ' + fundraising)
    //redux
    const user = useSelector(state => state.user)
    const app = useSelector(state => state.app)
    const { currentUser } = user
    const { defaultPaymentMethod } = currentUser
    const { posts } = app
    const fullName = postData?.creator?.firstName + ' ' + postData?.creator?.lastName
    const cardNumber = defaultPaymentMethod?.card?.last4 ? '**** **** **** ' + defaultPaymentMethod?.card?.last4 : 'Not selected'
    const { isModalVisible, toggleModal } = UseModal()

    const [fundingProject, setFundingProject] = useState(false)
    const [selectedAmount, setSelectedAmount] = useState('')
    const [customAmount, setCustomAmount] = useState('')
    const [customAmountError, setCustomAmountError] = useState('')
    const [loadingFund, setLoadingFund] = useState(false)


    const handleValidation = () => {
        HelpingMethods.handleAnimation()
        selectedAmount === 'Custom' && !customAmount ? setCustomAmountError('Please enter amount') : setCustomAmountError('')
        if (selectedAmount) {
            if (selectedAmount === 'Custom') {
                if (customAmount) {
                    return true
                } else {
                    return false
                }
            } else {
                return true
            }
        } else {
            return false
        }
    }
    const handleFundProject = async () => {
        if (defaultPaymentMethod) {
            if (handleValidation()) {
                setLoadingFund(true)
                const amount = selectedAmount != 'Custom' ? Number(selectedAmount.replace('$', '')) : Number(customAmount)
                await Api.fundFundraisingProject({
                    projectId: fundraising?._id,
                    amount,
                    paymentMethod: defaultPaymentMethod.id
                })
                    .then(res => {
                        if (res) {
                            console.log('----------->', res)
                            const oldPost = postData
                            const newPost=res.data
                            // const newPost = {
                            //     ...postData,
                            //     fundraising:
                            //     {
                            //         ...fundraising,
                            //         currentFunding: fundraising.currentFunding + amount,
                            //         supporters: [...fundraising.supporters, currentUser._id]
                            //     }
                            // }
                            setParams({ data: newPost })
                            if (isHomeScreensPost) {
                                let tempPosts = posts.slice()
                                let tempPostIndex = posts.indexOf(oldPost)
                                if (tempPostIndex >= 0) {
                                    tempPosts[tempPostIndex] = newPost
                                    setPosts(tempPosts)
                                }
                            }
                            toggleModal()
                        }
                    })
                setLoadingFund(false)
            }
        } else {
            Toasts.Error('Please Add / Select a default payment method')
        }
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
            <Spacer isStatusBarHeigt />
            <ScrollViews.WithKeyboardAvoidingView
                footer={
                    fundingProject && !selectedAmount ?
                        null :
                        <Wrapper paddingHorizontalSmall background1 style={[!fundingProject && appStyles.shadowExtraDark]}>
                            <Spacer isBasic />
                            <Buttons.Colored
                                text={'Fund this Project'}
                                onPress={() => {
                                    !fundingProject ?
                                        [
                                            HelpingMethods.handleAnimation(),
                                            setFundingProject(true)
                                        ]
                                        :
                                        handleFundProject()

                                }}
                                isLoading={loadingFund}
                            />
                            <Spacer isBasic />
                        </Wrapper>
                }
            >
                <Image
                    source={{ uri: postData?.fundraising?.image || appImages.noImageAvailable }}
                    style={{ height: height(20), width: null }}
                />
                <Wrapper paddingHorizontalBase background1 style={[fundingProject && appStyles.shadow]}>
                    <Spacer isBasic />
                    <Text isSmallTitle>{postData?.fundraising?.title || 'Title'}</Text>
                    <Spacer isSmall />
                    <Text isMedium isBoldFont>{postData?.fundraising?.subtitle || 'Project Description'}</Text>
                    <Spacer isSmall />
                    {
                        !fundingProject ?
                            <>
                                <Icons.WithText
                                    iconName={'book'}
                                    iconType='feather'
                                    text={`${postData?.fundraising?.category?.title || 'Category'} > ${postData?.fundraising?.subCategory?.title || 'SubCategory'}`}
                                    iconSize={totalSize(1.5)}
                                    tintColor={colors.appColor1}
                                />
                                <Spacer isSmall />
                                <Icons.WithText
                                    iconName={'map-pin'}
                                    iconType='feather'
                                    text={postData?.fundraising?.location || 'Location'}
                                    iconSize={totalSize(1.5)}
                                    tintColor={colors.appColor1}
                                />
                                <Spacer isBasic />
                            </>
                            :
                            null
                    }
                    <Common.FundRaisingProjectInfo
                        //backers={postData?.fundraising?.supporters?.length || 0}
                        backers={postData?.fundraising?.backers || 0}
                        daysLeft={
                            postData?.fundraising?.compaignDuration
                            -
                            HelpingMethods.getDaysDifference({
                                firstDate: new Date(postData?.fundraising?.createdAt),
                                secondDate: new Date(Date.now()),
                                //firstDate: new Date(2022, 12, 7),
                                //secondDate:new Date(2022, 12, 17),
                            })}
                        currentAmount={`$ ${postData?.fundraising?.currentFunding || 0}`}
                        goalAmount={`$ ${postData?.fundraising?.fundingGoal || 0}`}
                    />
                    <Spacer isBasic />
                </Wrapper>
                {
                    !fundingProject ?
                        <>
                            <Cards.UserPrimary
                                left={
                                    <Images.Profile
                                        source={{ uri: creator.avatar || appImages.noUser }}
                                        showBadge={creator.isGuildMember}
                                        containerStyle={{ marginRight: sizes.marginHorizontal / 2 }}
                                        size={totalSize(4)}
                                    />
                                }
                                title={fullName}
                                subTitle={'Creator of this project'}
                                titleStyle={[appStyles.textMedium, appStyles.fontBold]}
                                //rowContainerStyle={[appStyles.alignItemsCenter]}
                                subTitleStyle={[appStyles.textTiny]}
                                textContainerStyle={[appStyles.justifyContentSpaceBetween, {}]}
                            />
                            <Spacer isBasic />
                            <Wrapper marginHorizontalBase>
                                <Text isMedium>{postData?.fundraising?.description || 'Description'}</Text>
                            </Wrapper>
                        </>
                        :
                        <>
                            <Wrapper>
                                <Spacer isBasic />
                                <Wrapper marginHorizontalBase>
                                    <Text isMedium isBoldFont>Select an amount</Text>
                                    <Spacer isBasic />
                                    <Wrapper flexDirectionRow justifyContentSpaceBetween style={{ flexWrap: 'wrap', }}>
                                        {
                                            amounts.map((item, index) => {
                                                const is_selected = item === selectedAmount
                                                const defaultTintColor = is_selected ? colors.appTextColor6 : colors.appColor1
                                                const defaultBackgroundColor = is_selected ? colors.appColor1 : colors.appBgColor1
                                                return (
                                                    <Buttons.BorderedSmall
                                                    key={index}
                                                        text={item}
                                                        buttonStyle={[{ backgroundColor: defaultBackgroundColor, width: width(28), marginBottom: sizes.smallMargin }, appStyles.center]}
                                                        tintColor={defaultTintColor}
                                                        onPress={() => setSelectedAmount(item)}
                                                    />
                                                )
                                            })
                                        }
                                    </Wrapper>
                                </Wrapper>
                                {
                                    selectedAmount ?
                                        <>
                                            {
                                                selectedAmount === 'Custom' ?
                                                    <>
                                                        <Spacer isSmall />
                                                        <TextInputs.Underlined
                                                            // inputRef={BirthdayInputRef}
                                                            title="Enter amount"
                                                            value={customAmount ? '$ ' + customAmount : ''}
                                                            onChangeText={(text) => {
                                                                const tempText = text.replace('$ ', '')
                                                                setCustomAmount(tempText)
                                                                customAmountError && [
                                                                    HelpingMethods.handleAnimation(),
                                                                    setCustomAmountError('')
                                                                ]
                                                            }}
                                                            error={customAmountError}
                                                            isTitleSolidColor
                                                        />
                                                        <Spacer isSmall />
                                                    </>
                                                    :
                                                    null
                                            }
                                            <Spacer isSmall />
                                            <Common.DefaultPaymentMethod/>
                                        </>
                                        :
                                        null
                                }
                            </Wrapper>
                        </>
                }
                <Spacer isBasic />
            </ScrollViews.WithKeyboardAvoidingView>
            <Wrapper isAbsolute style={{ top: sizes.statusBarHeight + sizes.baseMargin, left: sizes.marginHorizontal }}>
                <Icons.Button
                    iconName={'chevron-back'}
                    iconType='ionicon'
                    isRound
                    iconColor={colors.appTextColor3}
                    buttonSize={totalSize(3.25)}
                    iconSize={totalSize(2.5)}
                    shadow
                    onPress={
                        () => {
                            !fundingProject ? goBack() :
                                [setFundingProject(false),
                                HelpingMethods.handleAnimation()]
                        }
                    }
                />
            </Wrapper>
            <Modals.PopupPrimary
                visible={isModalVisible}
                toggle={toggleModal}
                topMargin={height(65)}
                disableSwipe
                disableBackdropPress
                icon={
                    <Icons.Button
                        iconName={'check'}
                        iconType={'feather'}
                        buttonColor={colors.appColor1}
                        iconColor={colors.appTextColor6}
                        isRound
                        iconSize={totalSize(4.5)}
                        buttonSize={totalSize(5.5)}
                    />
                }
                title={'Thank you for funding this project'}
                buttonText1='Continue'
                //onPressButton1={() => navigate(routes.home)}
                onPressButton1={goBack}

            />
        </Wrapper>
    )
}

