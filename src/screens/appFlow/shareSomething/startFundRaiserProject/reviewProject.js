import moment from 'moment';
import React, { Component, useState } from 'react';
import { View, Image } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { Headers, Spacer, Wrapper, Text, Icons, Cards, Images, ScrollViews, Buttons, Modals, Common, TextInputs } from '../../../../components';
import { goBack, navigate } from '../../../../navigation/rootNavigation';
import { Api, appImages, appStyles, colors, HelpingMethods, post_types, routes, sizes } from '../../../../services';
import { UseModal } from '../../../../services/hooks';
import { setPosts } from '../../../../services/store/actions';
const amounts = ['$10', '$20', '$50', '$100', '$200', 'Custom']
export default function Index({ route }) {
    const flow = route?.params?.flow
    const data = route?.params?.data
    console.log('fundraising detail data: ' + data)
    const {
        media, title, projectDescription, description,
        category,categoryLabel, 
        subCategory,subCategoryLabel,
         location,
        targetLaunchDate, campaignDuration, fundingGoal,
        bankName, bankAccountNumber
    } = data



    const isFundProject = flow === 'fund'

    //redux
    const user = useSelector(state => state.user)
    const app = useSelector(state => state.app)
    const { currentUser } = user
    const { posts } = app
    const fullName = currentUser.firstName + ' ' + currentUser.lastName


    const { isModalVisible, toggleModal } = UseModal()

    const [loadingSubmitForReview, setLoadingSubmitForReview] = useState(false)

    const handleSubmitForReview = async () => {
        setLoadingSubmitForReview(true)

        const isVideo = media?.type.includes('video')
        let imageUrl = ''
        let videoUrl = ''
        if (media) {
            await Api.uploadFile(media).
                then(res => {
                    if (res) {
                        const url = res.data.file
                        !isVideo ?
                            imageUrl = url :
                            videoUrl = url
                    }
                })
        }
        await Api.AddFundraiserProject({
            type: post_types.fundraisingProject,
            image: imageUrl,
            video: videoUrl,
            title,
            subtitle: projectDescription,
            description,
            category,
            subCategory,
            launchDate: HelpingMethods.dateFormateBackend(targetLaunchDate),
            compaignDuration: Number(campaignDuration),
            location,
            bankName,
            bankAccountNumber,
            fundingGoal: Number(fundingGoal)
        }).
            then(res => {
                if (res) {
                    // setPosts([res.data, ...posts])
                    toggleModal()
                }
            })
        setLoadingSubmitForReview(false)
    }
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'Review Project'}
                showBackArrow
                alignTitleLeft
            />
            <ScrollViews.WithKeyboardAvoidingView
                footer={
                    <Wrapper paddingHorizontalSmall background1 style={[appStyles.shadowExtraDark]}>
                        <Spacer isBasic />
                        <Buttons.Colored
                            text={'Submit for Review'}
                            onPress={() => {
                                handleSubmitForReview()
                            }}
                            isLoading={loadingSubmitForReview}
                        />
                        <Spacer isBasic />
                    </Wrapper>
                }
            >
                <Image
                    source={{ uri: media?.uri || appImages.product4 }}
                    style={{ height: height(20), width: null }}
                />
                <Wrapper paddingHorizontalBase background1 style={[]}>
                    <Spacer isBasic />
                    <Text isSmallTitle>{title || 'Title'}</Text>
                    <Spacer isSmall />
                    <Text isMedium isBoldFont>{projectDescription || 'Project Description'}</Text>
                    <Spacer isSmall />
                    <Icons.WithText
                        iconName={'book'}
                        iconType='feather'
                        text={`${categoryLabel || 'Category'} > ${subCategoryLabel || 'SubCategory'}`}
                        iconSize={totalSize(1.5)}
                        tintColor={colors.appColor1}
                    />
                    <Spacer isSmall />
                    <Icons.WithText
                        iconName={'map-pin'}
                        iconType='feather'
                        text={location || 'Location'}
                        iconSize={totalSize(1.5)}
                        tintColor={colors.appColor1}
                    />
                    <Spacer isBasic />
                    <Common.FundRaisingProjectInfo
                        backers={'0'}
                        daysLeft={campaignDuration || '0'}
                        currentAmount={`$ 0`}
                        goalAmount={`$ ${fundingGoal || 0}`}
                    />
                    <Spacer isBasic />
                </Wrapper>
                <Cards.UserPrimary
                    left={
                        <Images.Profile
                            source={{ uri: currentUser.avatar }}
                            showBadge={currentUser.isGuildMember}
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
                    <Text isMedium>{description || 'Description'}</Text>
                </Wrapper>

                <Spacer isBasic />
            </ScrollViews.WithKeyboardAvoidingView>
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
                title={'Your project has been submitted for review' }
                buttonText1='Continue'
                onPressButton1={() => navigate(routes.home)}
            />
        </Wrapper>
    )
}

