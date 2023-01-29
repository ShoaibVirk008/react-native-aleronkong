import React, { useState } from 'react'
import {
    Animated,
    View,
    Text,
    Pressable,
    Button,
    StyleSheet,
    Platform,
} from 'react-native';
import { height, totalSize } from 'react-native-dimension';
// import { useTheme } from '@react-navigation/native';
// import { useCardAnimation } from '@react-navigation/stack';
import { Cards, Common, Lines, Modals, Spacer, TextInputs, Toasts, Wrapper } from '../../components'
import { Api, appStyles, colors, post_types, routes, sizes } from '../../services';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import { setPosts } from '../../services/store/actions';
import { useSelector } from 'react-redux';


export default function Index({ route, navigation }) {
    const { navigate, replace, goBack } = navigation

    const postData = route?.params?.data || null
    const handlePostDeleted = route?.params?.handlePostDeleted || null
    const onPostUpdate = route?.params?.onPostUpdate || null

    const currentUser = useSelector(state => state.user.currentUser)

    const {
        _id, creator, type
    } = postData
    // console.log('postData -> ', postData)
    const name = creator?.firstName + ' ' + creator?.lastName
    const isMyPost = currentUser?._id === creator._id
    const isFundraisingPost = type === post_types.fundraisingProject
    const menuOptions = [
        {
            label: `View ${name} Profile`
        },
        {
            label: `Block ${name}`
        },
        {
            label: `Report ${name}`
        },
    ]
    const myPostMenuOptions = [
        {
            label: 'Edit'
        },
        {
            label: 'Delete'
        }
    ]
    const reportOptoins = [
        { label: 'Hate or Violence' },
        { label: 'Inappropriate Content' },
        { label: 'Pretending to be someone else' },
        { label: 'Other' },
    ]
    const [isMainMenuPopupVisible, setMainMenuPopupVisibility] = useState(true)
    const [isBlockPopupVisible, setBlockPopupVisibility] = useState(false)
    const [isDeletePopupVisible, setDeletePopupVisibility] = useState(false)
    const [isReportPopupVisible, setReportPopupVisibility] = useState(false)
    const [selectedReportOption, setSelectedReportOption] = useState('')
    const [isReportConfirmationPopupVisible, setReportConfirmationPopupVisibility] = useState(false)
    const [loadingBlock, setLoadingBlock] = useState(false)
    const [loadingReport, setLoadingReport] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)

    const toggleMainMenuPopup = () => setMainMenuPopupVisibility(!isMainMenuPopupVisible)
    const toggleBlockPopup = () => setBlockPopupVisibility(!isBlockPopupVisible)
    const toggleDeletePopup = () => setDeletePopupVisibility(!isDeletePopupVisible)
    const toggleReportPopup = () => setReportPopupVisibility(!isReportPopupVisible)
    const toggleReportConfirmationPopup = () => setReportConfirmationPopupVisibility(!isReportConfirmationPopupVisible)





    const handleOnpressOptions = (item, index) => {
        //goBack()
        toggleMainMenuPopup()

        if (index === 0) {
            replace(routes.userDetail, { data: creator })
        } else {
            setTimeout(() => {
                if (index === 1) {
                    toggleBlockPopup()
                } else if (index === 2) {
                    toggleReportPopup()
                }
            }, 500);
        }
    }

    const handleOnpressMyPostOptions = (item, index) => {
        // goBack()
        toggleMainMenuPopup()

        if (item.label === 'Edit') {
            replace(routes.shareSomethingRoutes.sharePost, {
                data: postData,
                onPostUpdate: onPostUpdate || null
            })
        } else if (item.label === 'Delete') {
            setTimeout(() => {
                toggleDeletePopup()
            }, 500);
        }
    }

    const handleGetHomePosts = async () => {
        await Api.GetHomePosts().
            then(res => {
                if (res) {
                    setPosts(res.data)
                }
            })
    }

    const handleBlockPost = async () => {
        setLoadingBlock(true)
        // await Api.BlockPost({ postId: _id }).
        //     then(async res => {
        //         if (res) {
        //             await handleGetHomePosts()

        //         }
        //     })
        await Api.blockUser({ userId: creator._id }).
            then(async res => {
                if (res) {
                    await handleGetHomePosts()
                }
            })
        toggleBlockPopup()
        goBack()
        setLoadingBlock(false)
    }

    const handleReportPost = async () => {
        setLoadingReport(true)
        // await Api.ReportPost({ postId: _id, reason: selectedReportOption }).
        //     then(async res => {
        //         if (res) {
        //             await handleGetHomePosts()

        //         }
        //     })
        await Api.reportUser({ userId: creator._id, reason: selectedReportOption }).
            then(async res => {
                if (res) {
                    await handleGetHomePosts()
                }
            })
        toggleReportConfirmationPopup()
        goBack()
        setLoadingReport(false)
    }

    const handleDeletePost = async () => {
        setLoadingDelete(true)
        await Api.deletePost({ postId: postData?._id })
            .then(res => {
                if (res) {
                    toggleDeletePopup()
                    goBack()
                    Toasts.Success('Post has been deleted')
                    handlePostDeleted(postData)
                }
            })
        setLoadingDelete(false)
    }

    const main_menu_options = !isMyPost ? menuOptions : !isFundraisingPost ? myPostMenuOptions : myPostMenuOptions.slice(1)
    return (
        <>
            {/* {
                !isMuteConverationPopupVisible && !isBlockPopupVisible && !isReportPopupVisible && !isReportConfirmationPopupVisible && !isDeleteVisible ?
                    <Common.PopupWrappers.Main
                        toggle={goBack}
                        containerStyle={{ ...appStyles.paddingVerticalBase, paddingBottom: height(7) }}
                    >
                        <Wrapper isBorderedWrapper paddingHorizontalZero paddingVerticalZero>

                            {
                                menuOptions.map((item, index) => {
                                    return (
                                        <>
                                            {
                                                index != 0 ?
                                                    <Lines.Horizontal />
                                                    :
                                                    null
                                            }
                                            <Cards.IconTitleArrow
                                                title={item.label}
                                                containerStyle={[{ paddingVertical: height(2) }]}
                                                titleStyle={[index === 4 && { color: colors.error }]}
                                                onPress={() => handleOnpressOptions(item, index)}
                                            />
                                        </>
                                    )
                                })
                            }
                        </Wrapper>
                    </Common.PopupWrappers.Main>
                    :
                    null
            } */}
            <Modals.PopupPrimary
                visible={isMainMenuPopupVisible}
                toggle={() => {
                    toggleMainMenuPopup()
                    goBack()
                }}
                topMargin={!isMyPost ? height(70) : !isFundraisingPost ? height(75) : height(80)}
            >
                <Wrapper isBorderedWrapper paddingHorizontalZero paddingVerticalZero>
                    {
                        main_menu_options.map((item, index) => {
                            return (
                                <>
                                    {
                                        index != 0 ?
                                            <Lines.Horizontal />
                                            :
                                            null
                                    }
                                    <Cards.IconTitleArrow
                                        key={index}
                                        title={item.label}
                                        containerStyle={[{ paddingVertical: height(2) }]}
                                        titleStyle={[(isMyPost && item.label === 'Delete') && { color: colors.error }]}
                                        onPress={() => {
                                            !isMyPost ?
                                                handleOnpressOptions(item, index)
                                                :
                                                handleOnpressMyPostOptions(item, index)
                                        }}
                                    />
                                </>
                            )
                        })
                    }
                </Wrapper>
            </Modals.PopupPrimary>
            <Modals.PopupPrimary
                visible={isDeletePopupVisible}
                //toggle={toggleBlockPopup}
                toggle={goBack}
                topMargin={height(75)}
                title={`Are you sure you want to delete this ${!isFundraisingPost ? 'post' : 'fundraising project'}?`}
                titleStyle={[appStyles.h6]}
                onPressButton1={() => {
                    toggleDeletePopup()
                    goBack()
                }}
                onPressButton2={handleDeletePost}
                buttonText1='No'
                buttonText2='Yes'
                loadingButton2={loadingDelete}
            />
            <Modals.PopupPrimary
                visible={isBlockPopupVisible}
                //toggle={toggleBlockPopup}
                toggle={goBack}
                topMargin={height(75)}
                title={`Are you sure you want to block\n${name}?`}
                titleStyle={[appStyles.h6]}
                onPressButton1={() => {
                    toggleBlockPopup()
                    goBack()
                }}
                onPressButton2={handleBlockPost}
                buttonText1='No'
                buttonText2='Yes'
                loadingButton2={loadingBlock}
            />
            <Modals.PopupPrimary
                visible={isReportConfirmationPopupVisible}
                //toggle={toggleReportConfirmationPopup}
                toggle={goBack}
                topMargin={height(75)}
                title={`Are you sure you want to report\n${name}?`}
                titleStyle={[appStyles.h6]}
                onPressButton1={() => {
                    toggleReportConfirmationPopup()
                    goBack()
                }}
                onPressButton2={handleReportPost}
                buttonText1='No'
                buttonText2='Yes'
                loadingButton2={loadingReport}
            />
            <Modals.PickerPopup
                visible={isReportPopupVisible}
                //toggle={toggleReportPopup}
                toggle={goBack}
                data={reportOptoins}
                textKey={'label'}
                onPressItem={(item, index) => {
                    setSelectedReportOption(item.label)
                    //toggleReportPopup()
                }}
                isSelected={(item, index) => {
                    return selectedReportOption === item.label
                }}
                topMargin={height(45)}
                selectionIndicator={'radio'}
                headerTitle={`Report ${name}`}
                headerTitleStyle={[appStyles.h6]}
                buttonText1='Report'
                onPressButton1={() => {
                    toggleReportPopup()
                    setTimeout(() => {
                        toggleReportConfirmationPopup()
                    }, 500);
                }}
            />
        </>
    );
}

