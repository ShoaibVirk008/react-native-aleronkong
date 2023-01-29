import React, { Component, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Headers, Images, ScrollViews, Spacer, Wrapper, Text, Common } from '../../../../components';
import { navigate } from '../../../../navigation/rootNavigation';
import { appStyles, DummyData, routes, sizes } from '../../../../services';

export default function Index({ navigation, route }) {
    const productDetail = route?.params?.data || null
    const { media, file, audioSample, category, title,} = productDetail
    const trending_audioBooks = [...DummyData.audio_books.slice(), ...DummyData.audio_books.slice()]
    const [isPlaying, setPlaying] = useState(true)
    return (
        <Wrapper isMain background1>
            <Headers.Primary
                title={'Now Playing'}
                showBackArrow
                containerStyle={{ borderBottomWidth: 0, height: sizes.headerHeight - height(2) }}
                titleStyle={[appStyles.textMedium, appStyles.fontLight]}
            />
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer isBasic />
                <Wrapper isCenter>
                    <Wrapper style={[{ borderRadius: sizes.cardRadius }, appStyles.shadowDark]} background1>
                        <Images.SqareRound
                            source={{ uri: media?.[0] }}
                            size={width(70)}
                            style={[{ borderRadius: sizes.cardRadius }, styles.audioBookImage]}
                        />
                    </Wrapper>
                </Wrapper>
                <Spacer isBasic />
                <Wrapper marginHorizontalBase alignItemsCenter>
                    <Text isSmallTitle alignTextCenter>{title}</Text>
                    <Spacer isSmall />
                    <Text isMedium isLightGray>Aleron Kong</Text>
                </Wrapper>
                <Spacer isBasic />
                <Spacer isBasic />
                <Wrapper alignItemsCenter>
                    <Common.AudioProgressBar
                        progress={6}
                        width={width(90)}
                        minimumValue={0}
                        maximumValue={10}
                    />
                </Wrapper>
                <Wrapper flexDirectionRow marginHorizontalBase justifyContentSpaceBetween>
                    <Text isTiny isLightGray>01:49</Text>
                    <Text isTiny isLightGray>04:37</Text>
                </Wrapper>
                <Spacer isDoubleBase />
                <Wrapper flexDirectionRow justifyContentSpaceEvenly alignItemsCenter>
                    <Common.IconButtonBadge
                        iconName='skip-back'
                        size={totalSize(5)}
                        iconType='feather'
                        iconSize={totalSize(2.25)}
                    />
                    <Common.IconButtonBadge
                        iconName={isPlaying ? 'pause' : 'play'}
                        size={totalSize(5.75)}
                        onPress={() => setPlaying(!isPlaying)}
                    />
                    <Common.IconButtonBadge
                        iconName='skip-forward'
                        size={totalSize(5)}
                        iconType='feather'
                        iconSize={totalSize(2.25)}
                    />
                </Wrapper>
                <Spacer isDoubleBase />
                <Wrapper marginHorizontalBase>
                    <Text isTinyTitle>Trending Audiobooks</Text>
                </Wrapper>
                <Spacer isSmall />
                <Common.ProductsPrimaryHorizontal
                    data={trending_audioBooks}
                    onPressItem={(item, index) => navigate(routes.digitalProductsFlow.productDetail, { data: item, isBought: false })}
                //imageStyle={[(index === 1 || index === 2) && { height: height(22.5) }]}
                />
                <Spacer isDoubleBase />
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}


const styles = StyleSheet.create({
    audioBookImage: {
        // height: width(70),
        // width: width(70),

    },

})