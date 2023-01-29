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
import { Api, appStyles, colors, routes, sizes } from '../../services';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import { setPosts } from '../../services/store/actions';
import { useSelector } from 'react-redux';


export default function Index({ route, navigation }) {
    const { navigate, replace, goBack } = navigation

    const post = route?.params?.post || null
    const comment = route?.params?.comment || null
    const onPressEdit = route?.params?.onPressEdit || null
    const handleDelete = route?.params?.handleDelete || null
    const currentUser = useSelector(state => state.user.currentUser)


    const menuOptions = [
        {
            label: 'Edit'
        },
        {
            label: 'Delete'
        }
    ]

    const [isMainMenuPopupVisible, setMainMenuPopupVisibility] = useState(true)
    const [isDeletePopupVisible, setDeletePopupVisibility] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)

    const toggleMainMenuPopup = () => setMainMenuPopupVisibility(!isMainMenuPopupVisible)
    const toggleDeletePopup = () => setDeletePopupVisibility(!isDeletePopupVisible)





    const handleOnpressOptions = (item, index) => {
        toggleMainMenuPopup()
        // goBack()
        if (index === 0) {
            goBack()
            setTimeout(() => {
                onPressEdit({ post, comment })
            }, 500);
        } else if (index === 1) {
            setTimeout(() => {
                toggleDeletePopup()
            }, 500);
        }
    }

    const onPressDeleteComment = async () => {
        setLoadingDelete(true)
        await Api.deletePostComment({ postId: post?._id, commentId: comment?._id })
            .then(res => {
                if (res) {
                    toggleDeletePopup()
                    goBack()
                    handleDelete({ post, comment })
                }
            })
        setLoadingDelete(true)
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
                                        titleStyle={[(index === 1) && { color: colors.error }]}
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
                visible={isDeletePopupVisible}
                //toggle={toggleDeletePopup}
                toggle={goBack}
                topMargin={height(75)}
                title={`Are you sure you want to delete this comment?`}
                titleStyle={[appStyles.h6]}
                onPressButton1={() => {
                    toggleDeletePopup()
                    goBack()
                }}
                onPressButton2={onPressDeleteComment}
                buttonText1='No'
                buttonText2='Yes'
                loadingButton2={loadingDelete}
            />

        </>
    );
}

