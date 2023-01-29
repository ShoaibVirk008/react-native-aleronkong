import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import React, { Component, useCallback, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { Buttons, Cards, Headers, Wrapper, Text, TextInputs, Lines, Loaders, Common } from '../../../components';
import { appStyles, colors, routes, sizes, dummyData, HelpingMethods, DummyData, Api } from '../../../services';

export default function Index({ navigation, route }) {
    const { navigate } = navigation
    const conversations = DummyData.conversations

    const [chats, setChats] = useState(null)
    const [loadingGetChats, setLoadingGetChats] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    useFocusEffect(useCallback(() => {
        handleGetRecentChats()
    }, []))

    const handleGetRecentChats = async () => {
        await Api.getRecentChats().
            then(res => {
                if (res) {
                    setChats(res)
                }
            })
        setLoadingGetChats(false)
    }

    const handleSearchChat = () => {
        let tempChat = chats
        if (searchQuery) {
            const query = searchQuery.toLocaleLowerCase()
            console.log('query: ', query)

            tempChat = chats.filter(item => {
                const user = item?.members[0]
                const firstName = user?.firstName?.toLocaleLowerCase()
                const lastName = user?.lastName?.toLocaleLowerCase()
                const fullName = firstName + ' ' + lastName
                console.log('fullName: ', fullName)
                return (
                    fullName.includes(query)
                )
            })
        }
        console.log('tempChat: ', tempChat)

        return tempChat

    }

    const searchChats = handleSearchChat()
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'Messages'}
                //alignTitleLeft
                showBackArrow

            />
            {
                chats ?
                    <>
                        {
                            chats?.length ?
                                <>
                                    <Wrapper paddingVerticalSmall>
                                        <TextInputs.SearchBar
                                            placeholder={'Search Messages'}
                                            value={searchQuery}
                                            onChangeText={(text) => setSearchQuery(text)}
                                        />
                                    </Wrapper>
                                    <Lines.Horizontal />
                                    <Wrapper flex={1}>
                                        <RenderConversations
                                            data={searchChats}
                                            onPressItem={(item, index) => {
                                                const user = item?.members[0]
                                                navigate(routes.chat, {
                                                    chatData: item,
                                                    userData: user
                                                })
                                            }
                                            }
                                        />

                                    </Wrapper>
                                </>
                                :
                               <Wrapper isMain isCenter>
                                 <Common.NoDataViewPrimary
                                 iconName='chat-remove-outline'
                                 iconType='material-community'
                                 text='No Chats Yet'
                                 //text='Send message to afriend now'
                                 />
                               </Wrapper>
                        }
                    </>
                    :
                    <Loaders.Boxes
                        size={width(20)}
                    />
            }

        </Wrapper>
    );
}

function RenderConversations({ data, onPressItem }) {
    return (
        <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
                const user = item?.members[0]
                const userImage = user?.avatar
                const userName = user?.firstName + ' ' + user?.lastName
                const lastMessage = item?.lastMessage?.content||''
                const dateTime = moment(item.createdAt).fromNow()

                return (
                    <Wrapper key={index} animation={'fadeInUp'} duration={300 + (index * 50)}>
                        <Cards.UserPrimary
                            onPress={() => onPressItem(item, index)}
                            containerStyle={{ paddingHorizontal: sizes.marginHorizontal / 2, borderBottomWidth: 0.5, borderBottomColor: colors.appBgColor4 }}
                            subContainerStyle={{ paddingVertical: sizes.marginVertical / 2 }}
                            imageUri={userImage}
                            imageSize={totalSize(5)}
                            textContainerStyle={[appStyles.justifyContentSpaceBetween]}
                            title={userName}
                            subTitle={lastMessage}
                            subTitleProps={{ numberOfLines: 1 }}
                            titleStyle={[appStyles.textRegular, appStyles.fontBold]}
                            subTitleStyle={[appStyles.textSmall]}
                            rowContainerStyle={{ alignItems: 'flex-start', }}
                            right={<Text isTiny style={[appStyles.textLightGray, { marginLeft: sizes.marginHorizontal }]}>{dateTime}</Text>}
                        />
                    </Wrapper>
                )
            }}
        />
    )
}