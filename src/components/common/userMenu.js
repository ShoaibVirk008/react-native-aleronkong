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
import { Cards, Common, Lines, Modals, Spacer, TextInputs, Wrapper } from '../../components'
import { Api, appStyles, colors, HelpingMethods, routes, sizes } from '../../services';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import { setCurrentUser, setPosts } from '../../services/store/actions';
import { useSelector } from 'react-redux';


export default function Index({ route, navigation }) {
    const { navigate, replace, goBack } = navigation

    const userData = route?.params?.data || null
    const { _id, firstName, lastName } = userData
    const handleAddFriend = route?.params?.handleAddFriend || null
    const currentUser = useSelector(state => state.user.currentUser)
    const name = firstName + ' ' + lastName
    const isFriend = HelpingMethods.isUserFriend(_id)
    const isBlocked = HelpingMethods.isUserBlocked(_id)


    const menuOptions = [
        {
            label: `${!isFriend ? 'Add Friend' : 'Un-Friend'}`
        },
        {
            label: `${!isBlocked ? 'Block' : 'Un-Block'} ${name}`
        }
    ]

    const [isMainMenuPopupVisible, setMainMenuPopupVisibility] = useState(true)
    const [isBlockPopupVisible, setBlockPopupVisibility] = useState(false)
    const [loadingBlock, setLoadingBlock] = useState(false)

    const toggleMainMenuPopup = () => setMainMenuPopupVisibility(!isMainMenuPopupVisible)
    const toggleBlockPopup = () => setBlockPopupVisibility(!isBlockPopupVisible)





    const handleOnpressOptions = (item, index) => {
        toggleMainMenuPopup()
        // goBack()
        if (index === 0) {
            goBack()
            handleAddFriend && handleAddFriend()
        } else if (index === 1) {
            setTimeout(() => {
                toggleBlockPopup()
            }, 500);
        }
    }

    const handleBlockUnblockUser = async () => {
        setLoadingBlock(true)
        await HelpingMethods.handleBlockUnblockUser(userData)
            .then(res => {
                if (res) {
                    toggleBlockPopup()
                    goBack()
                    setCurrentUser(res.data)
                }
            })
        setLoadingBlock(true)
    }
    return (
        <>
            <Modals.PopupPrimary
                visible={isMainMenuPopupVisible}
                toggle={() => {
                    toggleMainMenuPopup()
                    goBack()
                }}
                topMargin={height(75)}
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
                                        key={index}
                                        title={item.label}
                                        containerStyle={[{ paddingVertical: height(2) }]}
                                        //titleStyle={[(index === 1) && { color: colors.error }]}
                                        onPress={() => {
                                            handleOnpressOptions(item, index)
                                        }}
                                    />
                                </>
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
                title={`Are you sure you want to ${!isBlocked ? 'block' : 'un-block'} ${name}?`}
                titleStyle={[appStyles.h6]}
                onPressButton1={() => {
                    toggleBlockPopup()
                    goBack()
                }}
                onPressButton2={handleBlockUnblockUser}
                buttonText1='No'
                buttonText2='Yes'
                loadingButton2={loadingBlock}
            />

        </>
    );
}

