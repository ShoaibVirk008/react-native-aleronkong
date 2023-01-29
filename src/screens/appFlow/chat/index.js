import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView } from 'react-native'
import { height, totalSize, width } from 'react-native-dimension'
import { Cards, Common, Headers, Icons, Images, Modals, Spacer, TextInputs, Text, Wrapper, ScrollViews, Loaders } from '../../../components'
import { Api, appImages, appStyles, colors, HelpingMethods, imagePickerOptions, liveUrl, routes, sizes } from '../../../services'
import * as ImagePicker from 'react-native-image-picker';
import { Icon } from 'react-native-elements'
import { navigate } from '../../../navigation/rootNavigation'
import Input from './input'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Video from 'react-native-video'
import { io } from "socket.io-client";
//const myId = 1
// const chatMessages = [
//     {
//         id: 56,
//         message: 'Hello',
//         time: '20:00',
//         user: {
//             id: 2,
//         },
//         type: 'text'
//     },
//     {
//         id: 67,
//         message: 'Hello',
//         time: '20:00',
//         user: {
//             id: 1,
//         },
//         type: 'text'
//     },
//     {
//         id: 89,
//         message: 'How are you?',
//         time: '20:00',
//         user: {
//             id: 2,
//         },
//         type: 'text'
//     },
//     {
//         id: 15,
//         message: "I'm good, how are you?",
//         time: '20:00',
//         user: {
//             id: 1,
//         },
//         type: 'text'
//     },
//     {
//         id: 45,
//         message: 'When you will be available?',
//         time: '20:00',
//         user: {
//             id: 1,
//         },
//         type: 'text'
//     },
//     {
//         id: 889,
//         message: '',
//         time: '20:00',
//         user: {
//             id: 2,
//         },
//         type: 'gif',
//         gif_url: appImages.gif2
//     },
//     {
//         id: 459,
//         message: "",
//         time: '20:00',
//         user: {
//             id: 1,
//         },
//         type: 'gif',
//         gif_url: appImages.gif1
//     },

// ]
export default function ChatScreen({ navigation, route }) {
    const { navigate, goBack, setParams } = navigation
    const { userData, chatData, checkChat } = route.params
    console.log('chatData:', chatData)
    const { _id, avatar, firstName, lastName, } = userData
    const name = firstName + ' ' + lastName
    const scrollViewRef = useRef(null)

    //redux states
    const user = useSelector(state => state.user)
    const { currentUser } = user
    const myId = currentUser._id
    //websocket
    // const ws = useRef(null)


    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState(null)
    const [loadingGetData, setLoadingGetData] = useState(true)
    const [loadingSendMessage, setLoadingSendMessage] = useState(false)

    useEffect(() => {
        getSetData()
    }, [])

    useEffect(() => {
        chatData && [
            setSocketIo(),
            getMessages()
        ]
    }, [chatData])

    useEffect(() => {
        if (newMessage) {
            let newMessages = [...messages, newMessage]
            setNewMessage(null)
            setMessages(newMessages)
        }
    }, [newMessage, messages])

    const setSocketIo = () => {
        console.log('Socket initialised')
        //const socket = io("http://3.229.224.13");
        const socket = io(liveUrl);
        socket.on(chatData._id, (message) => {
            setNewMessage(message)
        });
    }


    const getSetData = async () => {
        await handleCheckChat()
        //await getMessages()
        //setLoadingGetData(false)
    }

    const getMessages = async (chatId) => {
        console.log('getMessages: ')
        console.log('chatData: ', chatData)
        console.log('chatId: ', chatId)
        if (chatData || chatId) {
            const chat_id = chatId || chatData?._id
            console.log('chat_id: ', chat_id)

            await Api.GetAllMessagesOfChat({ chatId: chat_id }).
                then(res => {
                    if (res) {
                        setMessages(res)
                    }
                })
            setLoadingGetData(false)
        }
    }

    const handleCheckChat = async () => {
        if (checkChat) {
            await Api.FindChatOfTwoUsers({ receiverId: _id }).
                then(async res => {
                    let tempChat = null
                    if (res) {
                        tempChat = res[0]
                        setParams({ chatData: tempChat })
                    } else {
                        await Api.createChat({ receiverId: _id }).
                            then(res => {
                                tempChat = res
                                if (res) {
                                    setParams({ chatData: res })
                                }
                            })
                    }
                    //await getMessages(tempChat?._id)
                    // await Api.GetAllMessagesOfChat({ chatId: tempChat?._id }).
                    //     then(res => {
                    //         if (res) {
                    //             setMessages(res)
                    //         }
                    //     })
                })
        }
    }

    const handleSendMessage = async ({ messageText, media, gif }) => {
        console.log('message: ', messageText)
        console.log('chatData: ', messageText)
        if (messageText || media || gif) {
            setLoadingSendMessage(true)
            let imageUrl = ''
            let videoUrl = ''
            let gifUrl = gif || ''
            if (media) {
                const isVideoMedia = media?.type?.includes('video')
                await Api.uploadFile(media).
                    then(res => {
                        if (res) {
                            if (!isVideoMedia) {
                                imageUrl = res.data.file
                            } else {
                                videoUrl = res.data.file
                            }
                        }
                    })

            }
            console.log('imageUrl: ', imageUrl)
            console.log('videoUrl: ', videoUrl)
            await Api.sendMessage({
                chatId: chatData?._id,
                message: messageText,
                images: imageUrl ? [imageUrl] : null,
                videos: videoUrl ? [videoUrl] : null,
                gif: gifUrl
            })
            setLoadingSendMessage(false)
        }
    }

    return (
        <Wrapper isMain>
            <Headers.Primary
                //containerStyle={{ paddingTop: sizes.statusBarHeight * 1.5, paddingBottom: sizes.baseMargin * 1.5, backgroundColor: colors.appBgColor1, ...appStyles.shadow }}
                alignTitleLeft
                showBackArrow
                centerTitle
                headerTitle={
                    <Wrapper flexDirectionRow>
                        <Images.Round
                            source={{ uri: avatar }}
                            size={totalSize(4)}
                        />
                        <Spacer isSmall horizontal />
                        <Wrapper justifyContentSpaceBetween>
                            <Text isRegular isBoldFont>{name}</Text>
                            <Icons.WithText
                                iconName={'circle'}
                                text='Active Now'
                                iconSize={totalSize(1.5)}
                                tintColor={colors.success}
                                textStyle={[appStyles.textTiny, appStyles.textGray]}
                            />
                        </Wrapper>
                    </Wrapper>
                }
                right={
                    <Wrapper flexDirectionRow marginHorizontalSmall>
                        <Icons.Button
                            iconName={'phone'}
                            iconType={'feather'}
                            iconSize={totalSize(2)}
                            iconColor={colors.appTextColor1}
                            onPress={() => navigate(routes.audioCall, { data: userData })}
                        />
                        <Icons.Button
                            iconName={'dots-vertical'}
                            //iconType={'feather'}
                            iconSize={totalSize(2.5)}
                            iconColor={colors.appTextColor1}
                            onPress={() => navigate(routes.chatMenu, { data: chatData })}
                        />
                    </Wrapper>
                }
                rightContainerStyle={{ flex: 0 }}
            />
            <ScrollViews.WithKeyboardAvoidingView
                onContentSizeChange={() => scrollViewRef?.current?.scrollToEnd({ animated: true })}
                scrollViewRef={scrollViewRef}
                footer={
                    // <Common.ChatInput
                    <Input
                        onSend={handleSendMessage}
                        isLoading={loadingSendMessage}
                    />
                }
            >
                {/* <Common.ChatMessages */}
                <Spacer isBasic />
                {
                    messages?.length ?
                        <ChatMessages
                            chatMessages={messages}
                            myId={myId}
                        />
                        :
                        <Wrapper alignItemsCenter>
                            <Spacer height={height(30)} />
                            {
                                loadingGetData ?
                                    <Loaders.BoxSmall />
                                    :
                                    <Common.NoDataViewPrimary
                                        iconName='md-chatbubbles-outline'
                                        iconType='ionicon'
                                        text='No messages found'
                                    //text='Send a message to start converation'
                                    />
                            }
                        </Wrapper>
                }

                <Spacer isBasic />
            </ScrollViews.WithKeyboardAvoidingView>

        </Wrapper>
    )
}

export const ChatMessages = ({ chatMessages, myId, }) => {
    let date = "2018-01-30T11:45:32.902996+00:00";
    let anotherDate = moment(); // today
    console.log(moment().subtract(24, 'hours').isBefore(moment(new Date(date))));
    console.log(moment().subtract(24, 'hours').isBefore(moment(new Date(anotherDate))));
    return (
        <>
            {
                chatMessages.map((item, index) => {
                    const message = item.content
                    const time = item.updatedAt
                    const myMessage = item?.sender === myId
                    const hasGif = item.gif
                    const hasImage = item.images?.length
                    const hasVideo = item.videos?.length
                    const isTextMessage = item?.content
                    const image = hasImage && item.images[0]
                    const video = hasVideo && item.videos[0]
                    const gif = hasGif && item.gif
                    const isTodaysDate = moment().subtract(24, 'hours').isBefore(moment(new Date(time)))
                    console.log('isTodaysDate: ', isTodaysDate);
                    return (
                        // <Cards.ChatBubbule
                        //     message={item.message}
                        //     time={item.time}
                        //     myMessage={item.user.id === myId}
                        // />
                        <Wrapper key={index}
                            marginHorizontalBase
                            // animation={!myMessage ? 'fadeInLeft' : 'fadeInRight'}

                            style={[{
                                alignItems: !myMessage ? 'flex-start' : 'flex-end',
                                //alignItems: 'flex-start',
                                marginTop: sizes.smallMargin
                            }]}
                        >

                            <Wrapper >
                                <Wrapper flexDirectionRow style={{ alignItems: 'flex-end', flexDirection: !myMessage ? 'row' : 'row-reverse', }}>
                                    <Wrapper style={{ alignItems: !myMessage ? 'flex-start' : 'flex-end', }}>
                                        <Wrapper style={[{
                                            backgroundColor: !myMessage ? colors.appBgColor2 : colors.appColor1,
                                            paddingVertical: sizes.smallMargin,
                                            paddingHorizontal: sizes.marginHorizontal / 1.5,
                                            borderRadius: sizes.cardRadius,

                                        },
                                        !myMessage ?
                                            { backgroundColor: colors.appBgColor2, borderBottomLeftRadius: 0 } :
                                            { backgroundColor: colors.appColor1, borderBottomRightRadius: 0 }
                                        ]}>
                                            {
                                                isTextMessage ?
                                                    <Text isRegular
                                                        style={[
                                                            myMessage && appStyles.textWhite,
                                                            myMessage && appStyles.fontMedium]
                                                        }>
                                                        {message}
                                                    </Text>
                                                    :
                                                    null
                                            }
                                            {
                                                hasGif || hasImage || hasVideo ?
                                                    <Wrapper >
                                                        <Spacer isSmall />
                                                        {
                                                            hasGif || hasImage ?
                                                                <Pressable
                                                                    onPress={() => navigate(routes.imageViewer, { imageUri: image })}
                                                                >
                                                                    <Image
                                                                        source={{ uri: hasGif ? item.gif_url : hasImage ? item.images[0] : null }}
                                                                        style={{ height: totalSize(20), width: totalSize(20), borderRadius: sizes.cardRadius }}
                                                                    />
                                                                </Pressable>
                                                                :
                                                                hasVideo ?
                                                                    <Pressable
                                                                        onPress={() => navigate(routes.videoPlayer, { videoUrl: video })}
                                                                    >
                                                                        <Video

                                                                            source={{ uri: item.videos[0] }}   // Can be a URL or a local file.
                                                                            //source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}   // Can be a URL or a local file.
                                                                            // ref={(ref) => {
                                                                            //     videoPlayerRef[index] = ref
                                                                            // }}                                      // Store reference
                                                                            //onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                                                            //onError={this.videoError}   
                                                                            paused={true}            // Callback when video cannot be loaded
                                                                            resizeMode='contain'
                                                                            style={{ height: height(20), width: width(40) }} />
                                                                        <Wrapper isAbsoluteFill isCenter>

                                                                            <Icons.Button
                                                                                iconName="play"
                                                                                isRound
                                                                                buttonSize={totalSize(5)}
                                                                                iconSize={totalSize(3.5)}
                                                                                buttonColor={colors.appBgColor1 + '40'}
                                                                                iconColor={colors.appTextColor6}
                                                                            //onPress={() => setPlaying(true)}
                                                                            />

                                                                        </Wrapper>
                                                                    </Pressable>
                                                                    :
                                                                    null
                                                        }
                                                    </Wrapper>
                                                    :
                                                    null
                                            }
                                        </Wrapper>
                                        <Text isSmall style={[appStyles.textLightGray, { marginVertical: sizes.TinyMargin }]}>{isTodaysDate ? moment(time).format('HH:mm') : moment(time).format('DD/MM HH:mm')}</Text>
                                    </Wrapper>
                                </Wrapper>
                            </Wrapper>
                        </Wrapper>
                    )
                })
            }
        </>
    )
}

