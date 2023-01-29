import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { Icon, SearchBar } from 'react-native-elements';
import { Cards, Headers, Icons, Lines, Wrapper } from '../../../components';
import { navigate } from '../../../navigation/rootNavigation';
import { appIcons, appImages, appStyles, colors, routes, sizes } from '../../../services';

export default function Index() {
    const options = [
        {
            icon: appIcons.sticky_notes,
            title: 'Share a post',
            subtitle: 'Share something, add photos, videos and links to your posts',
            route: routes.shareSomethingRoutes.sharePost
        },
        {
            icon: appIcons.fundraising,
            title: 'Start a fundraiser project',
            subtitle: 'Get the support of your fans to help fund your special projects',
            route: routes.shareSomethingRoutes.startFundRaiserProjectRoutes.startFundRaiserProject
        },
        {
            icon: appIcons.shopping_bag,
            title: 'Sell products',
            subtitle: 'Sell your ebooks, audiobooks and other products to your fans',
            route: routes.shareSomethingRoutes.SellProducts
        }
    ]

    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'Share Something'}
                showBackArrow
                alignTitleLeft
            />
            {
                options.map((item, index) => {
                    return (
                        <Wrapper key={index}>
                            <Cards.UserPrimary
                                onPress={() => navigate(item.route)}
                                left={
                                    <Icons.Button
                                        customIcon={item.icon}
                                        buttonColor={colors.appColor1}
                                        isRound
                                        iconSize={totalSize(2.5)}
                                        buttonStyle={{ marginRight: sizes.marginHorizontal / 2, borderWidth: 2, borderColor: colors.appBgColor1 }}
                                        shadow
                                    />
                                }

                                title={item.title}
                                subTitle={item.subtitle}
                                titleStyle={[appStyles.textRegular, appStyles.fontBold]}
                                subTitleStyle={[appStyles.textSmall]}
                                rowContainerStyle={[appStyles.alignItemsCenter]}
                                right={<Wrapper flex={1} style={{ marginLeft: sizes.marginHorizontal }} justifyContentCenter>
                                    <Icon
                                        name='chevron-thin-right'
                                        type='entypo'
                                        color={colors.appTextColor4}
                                        size={totalSize(1.5)}
                                    />
                                </Wrapper>}
                            />
                            <Lines.Horizontal />
                        </Wrapper>
                    )
                })
            }
        </Wrapper>
    )
}
