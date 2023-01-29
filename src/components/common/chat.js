import React, { useState } from 'react'
import { FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import { height, totalSize } from 'react-native-dimension'
import { Cards, Icons, Images, Modals, Spacer, TextInputs, Wrapper, } from '..'
import { appStyles, colors, HelpingMethods, imagePickerOptions, sizes } from '../../services'
import * as ImagePicker from 'react-native-image-picker';

// export default function ChatComp({ chatMessages, myId, keyboardVerticalOffset, onSend }) {
//     console.log('chatMessages', chatMessages);
//     const [messageText, setMessageText] = useState('')
//     const [imageFile, setImageFile] = useState(null)
//     const [isImagePickerVisible, setImagePickerVisibility] = useState(false)

//     const toggleImagePicker = () => setImagePickerVisibility(!isImagePickerVisible)

//     const launchImagePicker = () => {
//         ImagePicker.launchImageLibrary(imagePickerOptions, (response) => {
//             if (response.didCancel) {
//                 //console.log('User cancelled image picker');
//             } else if (response.error) {
//                 //console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 //console.log('User tapped custom button: ', response.customButton);
//             } else {
//                 if (!response.fileName) response.fileName = 'profile_image';
//                 const tempFile = {
//                     uri: response.uri,
//                     name: response.fileName,
//                     type: response.type
//                 }
//                 setImageFile(tempFile)
//             }
//         });
//     }
//     const launchCamera = () => {
//         ImagePicker.launchCamera(imagePickerOptions, (response) => {
//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//             } else {
//                 if (!response.fileName) response.fileName = 'profile_image';
//                 const tempFile = {
//                     uri: response.uri,
//                     name: response.fileName,
//                     type: response.type
//                 }
//                 setImageFile(tempFile)
//             }
//         });
//     }

//     return (
//         <KeyboardAvoidingView
//             style={{ flex: 1 }}
//             behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}
//             keyboardVerticalOffset={keyboardVerticalOffset ? Platform.OS == 'ios' ? height(17) : 0 : null}
//             enabled={Platform.OS === 'ios' ? true : false}>
//             <FlatList
//                 showsVerticalScrollIndicator={false}
//                 data={chatMessages}
//                 ListHeaderComponent={() => <Spacer isBasic />}
//                 ListFooterComponent={() => <Spacer isBasic height={sizes.doubleBaseMargin * 4} />}
//                 ItemSeparatorComponent={() => <Spacer />}
//                 keyExtractor={(item, index) => index + ''}
//                 renderItem={({ item, index }) => {
//                     return (
//                         <Cards.ChatBubbule
//                             message={item.message}
//                             time={item.time}
//                             myMessage={item.user.id === myId}
//                         />
//                     );
//                 }}
//             />
//             <TextInputs.Colored
//                 placeholder={'Write a message...'}
//                 onChangeText={text => setMessageText(text)}
//                 value={messageText}
//                 multiline
//                 containerStyle={{ marginHorizontal: 0, paddingLeft: sizes.marginHorizontal, paddingRight: sizes.marginHorizontal / 2, paddingBottom: height(1.5), paddingTop: height(1), borderTopWidth: 1, borderTopColor: colors.appBgColor4 }}
//                 inputContainerStyle={{ borderRadius: 0, backgroundColor: colors.transparent, alignItems: Platform.OS === 'ios' ? 'flex-end' : 'center', }}
//                 inputStyle={{ height: null, marginVertical: height(1) }}
//                 left={
//                     <Icons.Button
//                         iconName='plus'
//                         buttonSize={totalSize(4)}
//                         iconColor={colors.appTextColor5}
//                         buttonColor={colors.appBgColor2}
//                         onPress={toggleImagePicker}
//                         isRound
//                     />
//                 }
//                 right={
//                     <Icons.Button
//                         iconName='send'
//                         buttonSize={totalSize(4)}
//                         iconSize={totalSize(2.5)}
//                         iconColor={colors.appColor1}
//                         onPress={() => {
//                             onSend(messageText);
//                             setMessageText('')
//                         }}
//                         buttonColor={colors.appColor1 + '40'}
//                         isRound
//                     //buttonColor={colors.appBgColor2}
//                     />
//                 }
//             />
//             <Modals.ImagePickerPopup
//                 visible={isImagePickerVisible}
//                 toggle={toggleImagePicker}
//                 onPressButton1={launchCamera}
//                 onPressButton2={launchImagePicker}
//             />
//         </KeyboardAvoidingView>
//     )
// }


export const ChatMessages = ({ chatMessages, myId, }) => {
    return (
        <>
            {
                chatMessages.map((item, index) => {
                    return (
                        <Cards.ChatBubbule
                            key={index}
                            message={item.message}
                            time={item.time}
                            myMessage={item.user.id === myId}
                        />
                    )
                })
            }
        </>
    )
}

export const ChatInput = ({ keyboardVerticalOffset, onSend }) => {
    const [messageText, setMessageText] = useState('')
    const [imageFile, setImageFile] = useState(null)
    const [isImagePickerVisible, setImagePickerVisibility] = useState(false)
    const [isGifKeyboardVisible, setGifKeyboardVisibility] = useState(false)
    const [isGifSelected, setGifSelected] = useState(true)
    const [isAddMenuVisible, setAddMenuVisibility] = useState(true)

    const toggleImagePicker = () => setImagePickerVisibility(!isImagePickerVisible)
    const toggleGitKeyboard = () => setGifKeyboardVisibility(!isGifKeyboardVisible)

    const launchImagePicker = () => {
        ImagePicker.launchImageLibrary(imagePickerOptions, (response) => {
            if (response.didCancel) {
                //console.log('User cancelled image picker');
            } else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                //console.log('User tapped custom button: ', response.customButton);
            } else {
                if (!response.fileName) response.fileName = 'profile_image';
                const tempFile = {
                    uri: response.uri,
                    name: response.fileName,
                    type: response.type
                }
                setImageFile(tempFile)
            }
        });
    }
    const launchCamera = () => {
        ImagePicker.launchCamera(imagePickerOptions, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                if (!response.fileName) response.fileName = 'profile_image';
                const tempFile = {
                    uri: response.uri,
                    name: response.fileName,
                    type: response.type
                }
                setImageFile(tempFile)
            }
        });
    }

    const MenuButton = ({ isSelected, ...props }) => {
        return (
            <Icons.Button
                //iconName={'camera'}
                buttonStyle={{ borderWidth: 1, backgroundColor: isSelected ? colors.appColor1 + '20' : colors.transparent, borderColor: colors.appColor1, height: totalSize(3.5), width: totalSize(4.5), borderRadius: 100 }}
                iconSize={totalSize(2.25)}
                {...props}
            />
        )
    }
    return (
        <>
            <TextInputs.Colored
                placeholder={!isAddMenuVisible ? 'Write a message...' : ''}
                editable={!isAddMenuVisible}
                onChangeText={text => setMessageText(text)}
                value={messageText}
                multiline
                containerStyle={{ marginHorizontal: 0, paddingLeft: sizes.marginHorizontal, paddingRight: sizes.marginHorizontal / 2, paddingBottom: height(1.5), paddingTop: height(1), borderTopWidth: 1, borderTopColor: colors.appBgColor4 }}
                inputContainerStyle={{ borderRadius: 0, backgroundColor: colors.transparent, alignItems: Platform.OS === 'ios' ? 'flex-end' : 'center', }}
                inputStyle={{ height: null, marginVertical: height(1) }}
                //onPress={isAddMenuVisible}
                left={
                    <Wrapper flexDirectionRow>
                        <Icons.Button
                            iconName='plus'
                            buttonSize={totalSize(3.5)}
                            iconColor={!isAddMenuVisible ? colors.appTextColor5 : colors.appColor1}
                            buttonColor={!isAddMenuVisible ? colors.appBgColor2 : colors.appColor1 + '20'}
                            // onPress={toggleImagePicker}
                            iconSize={totalSize(3)}
                            isRound
                            iconStyle={[isAddMenuVisible && {
                                transform: [{ rotate: '-45deg' }]
                            }]}
                            onPress={() => {
                                HelpingMethods.handleAnimation()
                                setAddMenuVisibility(!isAddMenuVisible)
                            }}
                        />
                        {
                            isAddMenuVisible ?
                                <>
                                    <Spacer isSmall horizontal />
                                    <MenuButton
                                        iconName={'camera'}
                                        onPress={toggleImagePicker}
                                    />
                                    <Spacer isSmall horizontal />
                                    <MenuButton
                                        iconName={'video'}
                                        onPress={toggleImagePicker}
                                    />
                                    <Spacer isSmall horizontal />
                                    <MenuButton
                                        iconName={'file-gif-box'}
                                        onPress={() => {
                                            HelpingMethods.handleAnimation()
                                            setGifSelected(!isGifSelected)
                                        }}
                                        isSelected={isGifSelected}
                                    />
                                </>
                                :
                                null
                        }
                    </Wrapper>
                }
                right={
                    <Icons.Button
                        iconName='send'
                        buttonSize={totalSize(4)}
                        iconSize={totalSize(2.25)}
                        iconColor={colors.appColor1}
                        onPress={() => {
                            onSend(messageText);
                            setMessageText('')
                        }}
                        buttonColor={colors.appColor1 + '20'}
                        isRound
                        iconStyle={{
                            transform: [{ rotate: '-45deg' }]
                        }}
                    />
                }
            />
            <Wrapper>

            </Wrapper>
            <Modals.ImagePickerPopup
                visible={isImagePickerVisible}
                toggle={toggleImagePicker}
                onPressButton1={launchCamera}
                onPressButton2={launchImagePicker}
            />
        </>
    )
}