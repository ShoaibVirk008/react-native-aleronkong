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
            label: `Edit Group`
        },
        {
            label: `View Members`
        },
        {
            label: `Member Requests`
        },
        {
            label: `Delete Group`
        }
    ]

    const [isMainMenuPopupVisible, setMainMenuPopupVisibility] = useState(true)
    const [isDeleteVisible, setDeletePopupVisibility] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)

    const toggleMainMenuPopup = () => setMainMenuPopupVisibility(!isMainMenuPopupVisible)
    const toggleDeletePopup = () => setDeletePopupVisibility(!isDeleteVisible)

    const handleOnpressOptions = (item, index) => {
        toggleMainMenuPopup()
        setTimeout(() => {
            if (index === 0) {
                replace(routes.createGroup, { data: groupData })
            } else if (index === 1) {
                replace(routes.groupViewMembers, { data: groupData })
            } else if (index === 2) {
                replace(routes.groupMemberRequests, { data: groupData })
            } else if (index === 3) {
                toggleDeletePopup()
            }
        }, 500);
    }

    const handleDeleteGroup = async () => {
        setLoadingDelete(true)
        await Api.deleteGroup({ groupId: groupData._id })
        .then(res=>{
            if(res){
                toggleDeletePopup()
                navigate(routes.social)
                Toasts.Success('Group has been deleted')
            }
        })
        setLoadingDelete(false)
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
                visible={isDeleteVisible}
                // toggle={toggleDeletePopup}
                toggle={goBack}
                topMargin={height(75)}
                title={`Are you sure you want to delete this group?`}
                titleStyle={[appStyles.h6]}
                onPressButton1={() => {
                    toggleDeletePopup()
                    goBack()
                }}
                onPressButton2={handleDeleteGroup}
                buttonText1='No'
                buttonText2='Yes'
                loadingButton2={loadingDelete}
            />
        </>
    );
}

