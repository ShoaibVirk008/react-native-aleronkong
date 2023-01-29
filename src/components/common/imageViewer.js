import React, { Component } from "react";
import { Image, ScrollView } from "react-native";
import { height, totalSize, width } from "react-native-dimension";
import { colors, sizes } from "../../services";
import * as Icons from "../icons";
import Wrapper from "../wrapper";

export default function ImageViewer({ navigation, route }) {
    const { goBack } = navigation;
    const { imageUri, fullScreen } = route.params;
    return (
        <Wrapper
            style={{
                backgroundColor: fullScreen ? colors.appBgColor1 : colors.appBgColor6,
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                maximumZoomScale={5}
                minimumZoomScale={1}
                zoomScale={1}
            >
                <Image
                    source={{ uri: imageUri }}
                    style={{ height: height(100), width: width(100) }}
                    resizeMode={!fullScreen ? "contain" : "cover"}
                />
            </ScrollView>
            {fullScreen ? (
                <Icons.Button
                    iconName="fullscreen-exit"
                    buttonSize={totalSize(5)}
                    buttonColor={colors.black + '20'}
                    iconColor={colors.appTextColor6}
                    buttonStyle={{
                        position: "absolute",
                        right: sizes.marginHorizontal,
                        bottom: sizes.doubleBaseMargin,
                    }}
                    onPress={goBack}
                    isRound
                />
            ) : (
                <Icons.Button
                    iconName="chevron-left"
                    buttonSize={totalSize(5)}
                    buttonColor={colors.black + '20'}
                    iconColor={colors.appTextColor6}
                    buttonStyle={{
                        position: "absolute",
                        left: sizes.marginHorizontal,
                        top: sizes.statusBarHeight + sizes.smallMargin,
                    }}
                    onPress={goBack}
                    isRound
                />
            )}
        </Wrapper>
    );
}
