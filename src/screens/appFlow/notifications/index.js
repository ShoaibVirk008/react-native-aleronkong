import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { Cards, Headers, Icons, Text, Wrapper } from '../../../components';
import { appImages, appStyles, sizes, colors, appIcons } from '../../../services';
const notifications = [
    {
        title: 'Your meeting and message notifications will appear here',
        image: null,
        created_at: '10m ago',
        type: 'app',
        is_viewed: false
    },
    {
        title: 'Andress Will liked your post',
        image: appImages.user5,
        created_at: '2h ago',
        type: 'post_like',
        is_viewed: false
    },
    {
        title: 'Jackob Black following you',
        image: appImages.user3,
        created_at: '3d ago',
        type: 'following',
        is_viewed: true
    }
]
export default function Index() {
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'Notifications'}
                showBackArrow
                right={
                    <Wrapper marginHorizontalBase>
                        <Icons.Button
                        customIcon={appIcons.list}
                        iconSize={totalSize(2)}
                        buttonSize={totalSize(3)}
                        />
                    </Wrapper>
                }
                rightContainerStyle={{flex:0}}
            />
            <RenderNotifications
                data={notifications}
                onPressItem={(item, index) => { }}
            />
        </Wrapper>
    )
}

function RenderNotifications({ data, onPressItem }) {
    return (
        <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
                const isAppNotification = item.type === 'app'
                const ItemBgColor = !item.is_viewed ? colors.appColor1 + '10' : colors.transparent
                const showDate = index === 0 && true
                const date = Date.now()
                const isToday = date === Date.now()
                return (
                    <Wrapper key={index}>
                        {
                            showDate ?
                                <Wrapper marginHorizontalBase paddingVerticalSmall style={{paddingTop:sizes.marginVertical}}>
                                    <Text isSmall isBoldFont isTextColor3>{isToday ? 'Today' : date}</Text>
                                </Wrapper>
                                :
                                null
                        }
                        <Wrapper animation={'fadeInUp'} duration={300 + (index * 50)}>
                            <Cards.UserPrimary
                                onPress={() => onPressItem(item, index)}
                                containerStyle={{ backgroundColor: ItemBgColor, paddingHorizontal: sizes.marginHorizontal / 2, borderBottomWidth: 0.5, borderBottomColor: colors.appBgColor4 }}
                                subContainerStyle={{ paddingVertical: sizes.marginVertical / 1.5 }}
                                title={item.title}
                                titleStyle={[appStyles.textRegular]}
                                imageUri={item.image}
                                image={isAppNotification ?
                                    <Icons.Button
                                        iconName={'bell'}
                                        iconType={'feather'}
                                        isRound
                                        buttonColor={colors.appColor1}
                                        iconColor={colors.appTextColor6}
                                        iconSize={totalSize(2.5)}
                                        buttonStyle={{ marginRight: sizes.marginHorizontal / 2 }}
                                    />
                                    :
                                    null
                                }
                                rowContainerStyle={{ alignItems: 'flex-start', }}
                                right={<Text isTiny style={[appStyles.textLightGray, { marginLeft: sizes.marginHorizontal }]}>{item.created_at}</Text>}
                            />
                        </Wrapper>
                    </Wrapper>
                )
            }}
        />
    )
}