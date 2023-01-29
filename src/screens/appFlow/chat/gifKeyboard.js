import React, { Component } from 'react';
import { FlatList, Pressable, View, Image } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { Common, Wrapper, Text, TextInputs, Spacer, Icons, Buttons } from '../../../components';
import { goBack, navigate } from '../../../navigation/rootNavigation';
import { appImages, appStyles, colors, sizes } from '../../../services';

const categories = ['fake smile', 'evil smile', 'big smile', 'anime smile']
const gifs_categories = [
    {
        //gif: appImages.gif1,
        gif: 'https://media2.giphy.com/media/8TIbelFjFXjIJ0Zg1l/giphy.gif?cid=e1ce6930cweagheps3lpgyzu1lu4i4z014mstt23lslt417m&rid=giphy.gif&ct=g',
        label: 'whatever',
    },
    {
        gif: appImages.gif2,
        label: 'dance',
    },
    {
        gif: appImages.gif3,
        label: 'annoyed',
    }
]
export default function GifKeyboard() {

    const gifs = [...gifs_categories, ...gifs_categories, ...gifs_categories, ...gifs_categories]
    const splitToChunks = (array, parts) => {
        const tempData = array.slice();
        let result = [];
        for (let i = parts; i > 0; i--) {
            result.push(tempData.splice(0, Math.ceil(tempData.length / i)));
        }
        return result;
    };
    const chunk1 = splitToChunks(gifs, 2)[0]
    const chunk2 = splitToChunks(gifs, 2)[1]

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    const RenderGifs = ({ data, onPressItem, isLeft, isRight }) => {
        return (
            <>
                {
                    data.map((item, index) => {
                        const imageHeight = isLeft ? index % 2 ? height(10) : height(15) : isRight ? index % 2 ? height(12) : height(25) : height(12)
                        return (
                            <Pressable
                                key={index}
                                onPress={() => onPressItem(item, index)}
                                style={{
                                    // width: width(35),
                                    //height: height(12),
                                    height: imageHeight,
                                    // marginLeft: index === 0 ? sizes.smallMargin : 0,
                                    marginBottom: sizes.smallMargin
                                }}>
                                <Image
                                    source={{ uri: item.gif }}
                                    style={{ flex: 1, height: null, width: null, borderRadius: 5, }}
                                />
                                {/* <Wrapper isAbsoluteFill isCenter style={{ backgroundColor: colors.appBgColor6 + '10', borderRadius: 5 }}>
                                    <Text isSmall isWhite isBoldFont>{item.label}</Text>
                                </Wrapper> */}
                            </Pressable>
                        )
                    })
                }
            </>
        )
    }
    return (
        <Common.PopupWrappers.Primary
            // onPressButton1={goBack}
            // buttonText1='Continue'
            hideHeader
            toggle={goBack}
            containerStyle={{ backgroundColor: colors.appColor1 }}
            mainContainerStyle={{ paddingTop: height(20) }}
            headerComponent={
                <Wrapper>
                    <Spacer isBasic />
                    <Text isLarge isWhite isBoldFont alignTextCenter>GIF Keyboard</Text>
                    <Spacer isBasic />
                    <Wrapper flexDirectionRow alignItemsCenter>
                        <Icons.Button
                            iconName={'chevron-left'}
                            iconType='font-awesome'
                            iconColor={colors.appTextColor6}
                            buttonColor={colors.transparent}
                            iconSize={totalSize(2)}
                            buttonSize={width(10)}
                            onPress={goBack}
                        />
                        <Wrapper flex={1}>
                            <TextInputs.Colored
                                placeholder={'Search'}
                                value='Smile'
                                // iconNameLeft='search'
                                inputStyle={[appStyles.paddingHorizontalSmall, appStyles.textWhite, appStyles.fontBold, { height: sizes.inputHeight - height(2) }]}
                                //inputTextStyle={[, appStyles.fontBold,]}
                                iconContainerStyle={{ marginLeft: sizes.smallMargin, marginRight: sizes.smallMargin }}
                                placeholderTextColor={colors.appTextColor6}
                                iconColorLeft={colors.appTextColor6}
                                inputContainerStyle={{ backgroundColor: colors.appBgColor1 + '20', borderRadius: 5 }}
                                containerStyle={[appStyles.marginHorizontalSmall, { marginLeft: 0 }]}
                            //onPress={() => navigate(routes.gifKeyboard)}
                            />
                        </Wrapper>
                    </Wrapper>
                    <Spacer isSmall />
                </Wrapper>
            }
        >
            <Wrapper>
                <Wrapper background1>
                    <Spacer isSmall />
                    <FlatList
                        data={categories}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={({ item, index }) => {
                            return (
                                <Buttons.ColoredSmall
                                key={index}
                                    text={item}
                                    buttonStyle={[appStyles.paddingHorizontalTiny, { backgroundColor: getRandomColor(), borderRadius: 5, marginLeft: index === 0 ? sizes.marginHorizontal / 2 : 0, marginRight: sizes.marginHorizontal / 1.5 }]}
                                />
                            )
                        }}
                    />
                    <Spacer isBasic />
                    <Wrapper style={{ height: height(1200) }}>
                        <Wrapper flexDirectionRow style={{ marginHorizontal: sizes.smallMargin }}>
                            <Wrapper flex={1}>
                                <RenderGifs
                                    data={chunk1}
                                    onPressItem={(item, index) => { }}
                                    isLeft
                                />
                            </Wrapper>
                            <Spacer isSmall horizontal />
                            <Wrapper flex={1}>
                                <RenderGifs
                                    data={chunk1}
                                    onPressItem={(item, index) => { }}
                                    isRight
                                />
                            </Wrapper>
                        </Wrapper>
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        </Common.PopupWrappers.Primary>
    )
}
