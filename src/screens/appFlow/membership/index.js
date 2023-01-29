import moment from 'moment';
import React, { Component, useEffect, useState } from 'react';
import { Alert, Pressable, View, } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { Buttons, Spacer, Wrapper, Text, ScrollViews, Images, Icons, Common, Headers, Toasts, Loaders, Modals } from '../../../components';
import { goBack, navigate } from '../../../navigation/rootNavigation';
import { Api, appIcons, appImages, appStyles, colors, DummyData, HelpingMethods, routes } from '../../../services';
import { UseModal } from '../../../services/hooks';
import { setCurrentUser } from '../../../services/store/actions';

const payment_history = [1, 2, 3, 4, 5, 6]
export default function Index({ route }) {
    //const subscribedGuildPackage = route?.params?.data || null

    //redux state
    const user = useSelector(state => state.user)
    const { currentUser } = user

    //local states
    const { isModalVisible, toggleModal } = UseModal()
    const [subscribedGuildPackageDetail, setSubscribedGuildPackageDetail] = useState(null)
    const [loadingCancelMembership, setLoadingCancelMembership] = useState(false)

    // const subscribedGuildPackage = HelpingMethods.GetSubscribedGuildPackage()
    // console.log('subscribedGuildPackage: ', subscribedGuildPackage)
    // const hasMembership = subscribedGuildPackage ? true : false

    // const paymentHistory = subscribedGuildPackage?.invoices || []
    // const nextPaymentDate = subscribedGuildPackage?.nextPaymentDuo && moment.unix((subscribedGuildPackage?.nextPaymentDuo)).format('MMMM DD, YYYY') || null
    const subscribedGuildPackage = HelpingMethods.GetSubscribedGuildPackage()
    console.log('subscribedGuildPackage: ', subscribedGuildPackage)
    const hasMembership = subscribedGuildPackage ? true : false
    const nextPaymentDate = subscribedGuildPackageDetail?.nextPaymentDuo && moment.unix((subscribedGuildPackageDetail?.nextPaymentDuo)).format('MMMM DD, YYYY') || null
    const paymentHistory = subscribedGuildPackageDetail?.invoices || []
    useEffect(() => {
        subscribedGuildPackage && getGuilPackagePaymentHistory()
    }, [subscribedGuildPackage])

    const getGuilPackagePaymentHistory = () => {
        Api.getPackagePaymentHistory({ packageId: subscribedGuildPackage._id })
            .then(res => {
                if (res) {
                    setSubscribedGuildPackageDetail(res.data)
                } else {
                    setSubscribedGuildPackageDetail({})
                }
            })
    }
    // const handleCancelMembership = () => {
    //     Alert.alert(
    //         "Cancel Membership!",
    //         "Are you sure you want to cancel membership",
    //         [
    //             {
    //                 text: "No",
    //                 onPress: () => console.log("No Pressed"),
    //                 style: "cancel",
    //             },
    //             {
    //                 text: "Yes",
    //                 onPress: () => {
    //                     unsubscribeGuildPackage()
    //                 }
    //             },
    //         ]
    //     );
    // }
    const unsubscribeGuildPackage = async () => {
        setLoadingCancelMembership(true)
        await Api.unsubscribePackage({ packageId: subscribedGuildPackage._id })
            .then(res => {
                if (res) {
                    let newSupportingPackages = currentUser.supportingPackages.filter(item => item._id != subscribedGuildPackage._id)
                    setCurrentUser({
                        ...currentUser,
                        supportingPackages: newSupportingPackages,
                        isGuildMember: false,
                    })
                    toggleModal()
                    goBack()
                    Toasts.Success('Membership has been cancelled')
                }
            })
        setLoadingCancelMembership(false)
    }
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'Membership'}
                showBackArrow
            />
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer isBasic />
                <MemberShipCard
                    packageImage={subscribedGuildPackage?.media || null}
                    packageTitle={subscribedGuildPackage?.title || null}
                    packageNextPaymentDate={nextPaymentDate}
                />
                <Spacer isBasic />
                <Buttons.Colored
                    text={'Cancel Membership'}
                    onPress={toggleModal}
                    buttonColor={colors.error}
                    buttonStyle={[appStyles.marginHorizontalMedium]}
                    isLoading={loadingCancelMembership}
                />
                <Spacer isBasic />
                {
                    subscribedGuildPackageDetail ?
                        paymentHistory?.length ?
                            <PaymentsHistory
                                data={paymentHistory}
                            />
                            :
                            <Common.NoDataViewPrimary
                                text='No Payment History Found'
                                containerStyle={[appStyles.paddingVerticalLarge]}
                            />
                        :
                        <Wrapper alignItemsCenter paddingVerticalLarge>
                            <Loaders.BoxSmall

                            />
                        </Wrapper>
                }
                <Spacer isBasic />
            </ScrollViews.WithKeyboardAvoidingView>
            <Modals.PopupPrimary
                visible={isModalVisible}
                toggle={toggleModal}
                topMargin={height(70)}
                title={`Cancel Membership!`}
                info={'Are you sure you want to cancel membership?'}
                titleStyle={[appStyles.h6]}
                onPressButton1={() => {
                    toggleModal()
                }}
                onPressButton2={unsubscribeGuildPackage}
                buttonText1='No'
                buttonText2='Yes'
                loadingButton2={loadingCancelMembership}
            />
        </Wrapper>
    )
}

const MemberShipCard = ({ packageImage, packageTitle, packageNextPaymentDate }) => {
    return (
        <Wrapper isColored paddingVerticalSmall paddingHorizontalSmall style={{ backgroundColor: colors.appColor5 }}>
            <Wrapper isCenter>
                <Images.SqareRound
                    source={{ uri: packageImage || appImages.noImageAvailable }}
                    size={totalSize(12)}
                />
                <Spacer isBasic />
                <Wrapper justifyContentSpaceBetween isCenter>
                    <Text isMedium isPrimaryColor isBoldFont>{packageTitle}</Text>
                    <Spacer isBasic />
                    <Text isTiny isTextColor2>Next Payment Due </Text>
                    <Spacer isSmall />
                    <Text isSmall isTextColor2 isBoldFont>{packageNextPaymentDate}</Text>
                </Wrapper>
            </Wrapper>
        </Wrapper>
    )
}

const PaymentsHistory = ({ data }) => {
    return (
        <Wrapper>
            <Wrapper marginHorizontalBase>
                <Text isRegular isBoldFont isTextColor2>Payment History</Text>
            </Wrapper>
            <Spacer isSmall />
            {
                data.map((item, index) => {
                    const { created, amountPaid } = item
                    const dateTime = moment.unix((created)).format('DD / MM / YYYY') + ' at ' + moment.unix((created)).format('hh:mm')
                    const amount = amountPaid / 100
                    return (
                        <Wrapper key={index} isBorderedWrapper marginVerticalTiny style={{ borderColor: colors.appBgColor3 }}>
                            <Wrapper flexDirectionRow alignItemsCenter>
                                <Wrapper flex={1}>
                                    <Text isSmall isTextColor2>Date / Time</Text>
                                    <Spacer isSmall />
                                    {/* <Text isRegular isTextColor2>31 / 08 / 2021 at 18:32</Text> */}
                                    <Text isRegular isTextColor2>{dateTime}</Text>
                                </Wrapper>
                                <Text isMediumTitle isPrimaryColor>${amount}</Text>
                            </Wrapper>
                        </Wrapper>
                    )
                })
            }
        </Wrapper>
    )
}
