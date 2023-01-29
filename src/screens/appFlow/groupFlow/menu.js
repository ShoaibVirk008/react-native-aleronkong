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
import { Api, appStyles, colors, routes, sizes } from '../../../services';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { Icon } from 'react-native-elements';


export default function Index({ route, navigation }) {
    const { navigate, replace, goBack } = navigation

    const groupData = route?.params?.data || null

    const MenuOptions = [
        {
            label: `View Members`
        },
        {
            label: `Mute Posts`
        },
        {
            label: `Report Group`
        },
        {
            label: `Leave Group`
        }
    ]
    const reportOptoins = [
        { label: 'Hate or Violence' },
        { label: 'Inappropriate Content' },
        { label: 'Pretending to be someone else' },
        { label: 'Other' },
    ]
    const muteConverationOptions = [
        { label: 'For the next 24 hours' },
        { label: 'For 1 week' },
        { label: 'Custom' },
    ]
    const [isMainMenuPopupVisible, setMainMenuPopupVisibility] = useState(true)
    const [isMutePostsPopupVisible, setMutePostsPopupVisibility] = useState(false)
    const [selectedMuteConverationOption, setSelectedMuteConverationOption] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [isReportPopupVisible, setReportPopupVisibility] = useState(false)
    const [selectedReportOption, setSelectedReportOption] = useState('Other')
    const [isReportConfirmationPopupVisible, setReportConfirmationPopupVisibility] = useState(false)
    const [isLeaveVisible, setLeavePopupVisibility] = useState(false)
    const [loadingReport, setLoadingReport] = useState(false)
    const [loadingLeave, setLoadingLeave] = useState(false)

    const toggleMainMenuPopup = () => setMainMenuPopupVisibility(!isMainMenuPopupVisible)
    const toggleMutePostsPopup = () => setMutePostsPopupVisibility(!isMutePostsPopupVisible)
    const toggleReportPopup = () => setReportPopupVisibility(!isReportPopupVisible)
    const toggleReportConfirmationPopup = () => setReportConfirmationPopupVisibility(!isReportConfirmationPopupVisible)
    const toggleLeavePopup = () => setLeavePopupVisibility(!isLeaveVisible)

    const showDatePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setTimePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        //console.warn("A date has been picked: ", date);
        //console.warn("date string: ", moment(date).toISOString());
        hideDatePicker();
        const tempDate = moment(date).toISOString()
        if (isStartTimePickerVisible) {
            setStartTime(tempDate)
            setStartTimePickerVisibility(false)
        } else {
            setEndTime(tempDate)
            setEndTimePickerVisibility(false)
        }
        setTimeout(() => {
            toggleMutePostsPopup()
        }, 500);
    };

    const handleOnpressOptions = (item, index) => {
        toggleMainMenuPopup()
        setTimeout(() => {
            if (index === 0) {
                replace(routes.groupViewMembers, { data: groupData })
            } else if (index === 1) {
                toggleMutePostsPopup()
            } else if (index === 2) {
                toggleReportPopup()
            } else if (index === 3) {
                toggleLeavePopup()
            }
        }, 500);
    }

    const handleReportGroup = async () => {
        setLoadingReport(true)
        await Api.reportGroup({
            groupId: groupData._id,
            reason: selectedReportOption
        })
        .then(res=>{
            if(res){
                toggleReportConfirmationPopup()
                goBack()
                Toasts.Success('Group has been reported')
            }
        })
        setLoadingReport(true)
    }
    const handleLeaveGroup = async () => {
        setLoadingLeave(true)
        await Api.leaveGroup({
            groupId: groupData._id,
        })
        .then(res=>{
            if(res){
                toggleLeavePopup()
                goBack()
                Toasts.Success('You have left this group')
            }
        })
        setLoadingLeave(true)
    }
    return (
        <>
            <Modals.PopupPrimary
                visible={isMainMenuPopupVisible}
                toggle={() => {
                    toggleMainMenuPopup()
                    goBack()
                }}
                topMargin={height(60)}
            >
                <Wrapper isBorderedWrapper paddingHorizontalZero paddingVerticalZero style={{ borderColor: colors.appBgColor3 }}>
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
                                        titleStyle={[index === 3 && { color: colors.error }]}
                                        onPress={() => handleOnpressOptions(item, index)}
                                    />
                                </Wrapper>
                            )
                        })
                    }
                </Wrapper>
            </Modals.PopupPrimary>
            <Modals.PopupPrimary
                visible={isLeaveVisible}
                // toggle={toggleLeavePopup}
                toggle={goBack}
                topMargin={height(75)}
                title={`Are you sure you want to leave this group?`}
                titleStyle={[appStyles.h6]}
                onPressButton1={() => {
                    toggleLeavePopup()
                    goBack()
                }}
                onPressButton2={handleLeaveGroup}
                buttonText1='No'
                buttonText2='Yes'
                loadingButton2={loadingLeave}
            />
            <Modals.PopupPrimary
                visible={isReportConfirmationPopupVisible}
                //toggle={toggleReportConfirmationPopup}
                toggle={goBack}
                topMargin={height(75)}
                title={`Are you sure you want to report this group?`}
                titleStyle={[appStyles.h6]}
                onPressButton1={() => {
                    toggleReportConfirmationPopup()
                    goBack()
                }}
                onPressButton2={handleReportGroup}
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
                headerTitle={`Report Group`}
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
                visible={isMutePostsPopupVisible}
                //toggle={toggleMutePostsPopup}
                toggle={goBack}
                data={muteConverationOptions}
                textKey={'label'}
                onPressItem={(item, index) => {
                    setSelectedMuteConverationOption(item.label)
                    //toggleReportPopup()
                }}
                isSelected={(item, index) => {
                    return selectedMuteConverationOption === item.label
                }}
                topMargin={height(45)}
                selectionIndicator={'radio'}
                headerTitle={`Mute Conversation`}
                headerTitleStyle={[appStyles.h6]}
                buttonText1='Done'
                onPressButton1={() => {
                    toggleMutePostsPopup()
                    goBack()
                }}
                hideLastItemBottomLine={selectedMuteConverationOption === 'Custom'}
            >
                {
                    selectedMuteConverationOption === 'Custom' ?
                        <Wrapper>
                            <Wrapper flexDirectionRow marginHorizontalBase>
                                <Wrapper flex={1}>
                                    <TextInputs.Underlined
                                        title="Start Time"
                                        value={startTime ? moment(startTime).format('hh:mm a') : ''}
                                        onPress={() => {
                                            toggleMutePostsPopup()
                                            setTimeout(() => {
                                                showDatePicker()
                                                setStartTimePickerVisibility(true)
                                            }, 500);
                                        }}
                                        error={''}
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
                                            toggleMutePostsPopup()
                                            setTimeout(() => {
                                                showDatePicker()
                                                setEndTimePickerVisibility(true)
                                            }, 500);
                                        }}
                                        error={''}
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

