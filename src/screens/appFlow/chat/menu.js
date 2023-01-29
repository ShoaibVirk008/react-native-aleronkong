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
import { Cards, Common, Lines, Modals, Spacer, TextInputs, Toasts, Wrapper } from '../../../components'
import { Api, appStyles, chat_mute_intervals, colors, HelpingMethods, routes, sizes } from '../../../services';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { Icon } from 'react-native-elements';


export default function Index({ route, navigation }) {
    const { navigate, replace, goBack } = navigation

    const chatData = route?.params?.data || null
    const userData = chatData?.members[0]
    const { _id, avatar, firstName, lastName, } = userData
    const name = firstName + ' ' + lastName
    //console.log('userData -> ', userData)

    const MenuOptions = [
        {
            label: `View ${name} Profile`
        },
        {
            label: `Mute Conversation`
        },
        {
            label: `Block ${name}`
        },
        {
            label: `Report ${name}`
        },
        {
            label: `Delete Conversation`
        }
    ]
    const reportOptoins = [
        { label: 'Hate or Violence' },
        { label: 'Inappropriate Content' },
        { label: 'Pretending to be someone else' },
        { label: 'Other' },
    ]
    const muteConverationOptions = [
        { label: 'For the next 24 hours', value: chat_mute_intervals.day },
        { label: 'For 1 week', value: chat_mute_intervals.week },
        { label: 'Custom', value: chat_mute_intervals.custom },
    ]
    const [isMainMenuPopupVisible, setMainMenuPopupVisibility] = useState(true)
    const [isMuteConverationPopupVisible, setMuteConverationPopupVisibility] = useState(false)
    const [selectedMuteConverationOption, setSelectedMuteConverationOption] = useState(0)
    const [startTime, setStartTime] = useState('')
    const [startTimeError, setStartTimeError] = useState('')
    const [endTime, setEndTime] = useState('')
    const [endTimeError, setEndTimeError] = useState('')
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [isBlockPopupVisible, setBlockPopupVisibility] = useState(false)
    const [isReportPopupVisible, setReportPopupVisibility] = useState(false)
    const [selectedReportOption, setSelectedReportOption] = useState(0)
    const [isReportConfirmationPopupVisible, setReportConfirmationPopupVisibility] = useState(false)
    const [isDeleteVisible, setDeletePopupVisibility] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [loadingBlock, setLoadingBlock] = useState(false)
    const [loadingReport, setLoadingReport] = useState(false)
    const [loadingMute, setLoadingMute] = useState(false)

    const toggleMainMenuPopup = () => setMainMenuPopupVisibility(!isMainMenuPopupVisible)
    const toggleMuteConverationPopup = () => setMuteConverationPopupVisibility(!isMuteConverationPopupVisible)
    const toggleBlockPopup = () => setBlockPopupVisibility(!isBlockPopupVisible)
    const toggleReportPopup = () => setReportPopupVisibility(!isReportPopupVisible)
    const toggleReportConfirmationPopup = () => setReportConfirmationPopupVisibility(!isReportConfirmationPopupVisible)
    const toggleDeletePopup = () => setDeletePopupVisibility(!isDeleteVisible)

    const showDatePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setTimePickerVisibility(false);
        goBack()
    };
    const handleConfirm = (date) => {
        //console.warn("A date has been picked: ", date);
        //console.warn("date string: ", moment(date).toISOString());
        setTimePickerVisibility(false);
        const tempDate = moment(date).toISOString()
        if (isStartTimePickerVisible) {
            setStartTime(tempDate)
            setStartTimeError('')
            setStartTimePickerVisibility(false)
        } else {
            setEndTime(tempDate)
            setEndTimeError('')
            setEndTimePickerVisibility(false)
        }
        setTimeout(() => {
            toggleMuteConverationPopup()
        }, 500);
    };

    const toggleMainMenu = () => {
        setTimeout(() => {
            toggleMainMenuPopup()
        }, 500);
    }
    const handleOnpressOptions = (item, index) => {
        //goBack()
        toggleMainMenuPopup()
        setTimeout(() => {
            if (index === 0) {
                replace(routes.userDetail, { data: userData })
            } else if (index === 1) {
                toggleMuteConverationPopup()
            } else if (index === 2) {
                toggleBlockPopup()
            } else if (index === 3) {
                toggleReportPopup()
            } else if (index === 4) {
                toggleDeletePopup()
                //handleDeleteConveration()
            }
        }, 500);
    }

    const handleDeleteConveration = async () => {
        setLoadingDelete(true)
        await Api.DeleteChat({ chatId: chatData._id }).
            then(res => {
                if (res) {
                    navigate(routes.messages)
                }
            })
        toggleDeletePopup()
        setLoadingDelete(false)

    }
    const handleBlockUser = async () => {
        setLoadingBlock(true)
        await Api.blockUser({ userId: _id }).
            then(async res => {
                if (res) {
                    Toasts.Success(res?.message)
                    //await handleGetHomePosts()
                }
            })
        toggleBlockPopup()
        goBack()
        setLoadingBlock(false)
    }

    const handleReportUser = async () => {
        setLoadingReport(true)
        await Api.reportUser({ userId: _id, reason: reportOptoins[selectedReportOption].label }).
            then(async res => {
                if (res) {
                    Toasts.Success(res?.message)
                    //await handleGetHomePosts()
                }
            })
        toggleReportConfirmationPopup()
        goBack()
        setLoadingReport(false)
    }

    const muteChatValidations = () => {
        HelpingMethods.handleAnimation()
        if (selectedMuteConverationOption === 2) {
            !startTime ? setStartTimeError('Select start time') : setStartTimeError('')
            !endTime ? setEndTimeError('Select end time') : setEndTimeError('')
        }
        if (selectedMuteConverationOption != 2) {
            return true
        } else {
            if (startTime && endTime) {
                return true
            } else {
                return false
            }
        }
    }
    const handleMuteChat = async () => {
        if (muteChatValidations()) {
            setLoadingMute(true)
            await Api.MuteChat({
                chatId: chatData._id,
                interval: muteConverationOptions[selectedMuteConverationOption].value,
                startTime: selectedMuteConverationOption === 2 ? startTime : '',
                endTime: selectedMuteConverationOption === 2 ? endTime : ''
            }).then(res => {
                if (res) {
                    toggleMuteConverationPopup()
                    goBack()
                }
            })
            setLoadingMute(false)
        }
    }
    return (
        <>
            <Modals.PopupPrimary
                visible={isMainMenuPopupVisible}
                toggle={() => {
                    toggleMainMenuPopup()
                    goBack()
                }}
                topMargin={height(55)}
            >
                <Wrapper isBorderedWrapper paddingHorizontalZero paddingVerticalZero>
                    {
                        MenuOptions.map((item, index) => {
                            return (
                                <Wrapper key={index}>
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
                                </Wrapper>
                            )
                        })
                    }
                </Wrapper>
            </Modals.PopupPrimary>
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
                onPressButton2={handleBlockUser}
                buttonText1='No'
                buttonText2='Yes'
                loadingButton2={loadingBlock}
            />
            <Modals.PopupPrimary
                visible={isDeleteVisible}
                // toggle={toggleDeletePopup}
                toggle={goBack}
                topMargin={height(75)}
                title={`Are you sure you want to delete this conversation?`}
                titleStyle={[appStyles.h6]}
                onPressButton1={() => {
                    toggleDeletePopup()
                    goBack()
                }}
                onPressButton2={() => {
                    //toggleDeletePopup()
                    //goBack()
                    handleDeleteConveration()
                }}
                buttonText1='No'
                buttonText2='Yes'
                loadingButton2={loadingDelete}
            />
            <Modals.PopupPrimary
                visible={isReportConfirmationPopupVisible}
                //toggle={toggleReportConfirmationPopup}
                toggle={goBack}
                topMargin={height(75)}
                title={`Are you sure you want to report\n${name}?`}
                titleStyle={[appStyles.h6]}
                onPressButton1={() => {
                    toggleDeletePopup()
                    goBack()
                }}
                onPressButton2={handleReportUser}
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
                    setSelectedReportOption(index)
                    //toggleReportPopup()
                }}
                isSelected={(item, index) => {
                    return selectedReportOption === index
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
            <Modals.PickerPopup
                visible={isMuteConverationPopupVisible}
                //toggle={toggleMuteConverationPopup}
                toggle={goBack}
                data={muteConverationOptions}
                textKey={'label'}
                onPressItem={(item, index) => {
                    setSelectedMuteConverationOption(index)
                }}
                isSelected={(item, index) => {
                    return selectedMuteConverationOption === index
                }}
                topMargin={height(45)}
                selectionIndicator={'radio'}
                headerTitle={`Mute Conversation`}
                headerTitleStyle={[appStyles.h6]}
                buttonText1='Done'
                onPressButton1={handleMuteChat}
                loadingButton1={loadingMute}
                hideLastItemBottomLine={selectedMuteConverationOption === 2}
            >
                {
                    selectedMuteConverationOption === 2 ?
                        <Wrapper>
                            <Wrapper flexDirectionRow marginHorizontalBase>
                                <Wrapper flex={1}>
                                    <TextInputs.Underlined
                                        title="Start Time"
                                        value={startTime ? moment(startTime).format('hh:mm a') : ''}
                                        onPress={() => {
                                            toggleMuteConverationPopup()
                                            setTimeout(() => {
                                                showDatePicker()
                                                setStartTimePickerVisibility(true)
                                            }, 500);
                                        }}
                                        error={startTimeError}
                                        right={
                                            <Icon
                                                name="clock"
                                                type="feather"
                                                size={totalSize(2.5)}
                                            />
                                        }
                                        containerStyle={{ marginHorizontal: 0 }}
                                    />
                                </Wrapper>
                                <Wrapper flex={0.1} />
                                <Wrapper flex={1}>
                                    <TextInputs.Underlined
                                        title="End Time"
                                        value={endTime ? moment(endTime).format('hh:mm a') : ''}
                                        onPress={() => {
                                            toggleMuteConverationPopup()
                                            setTimeout(() => {
                                                showDatePicker()
                                                setEndTimePickerVisibility(true)
                                            }, 500);
                                        }}
                                        error={endTimeError}
                                        right={
                                            <Icon
                                                name="clock"
                                                type="feather"
                                                size={totalSize(2.5)}
                                            />
                                        }
                                        containerStyle={{ marginHorizontal: 0 }}
                                    />
                                </Wrapper>
                            </Wrapper>
                            <Spacer isBasic />
                            <Lines.Horizontal />
                        </Wrapper>
                        :
                        null
                }
            </Modals.PickerPopup>

            <DateTimePicker
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

        </>
    );
}

