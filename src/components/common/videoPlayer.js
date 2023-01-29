import React, { Component, useState } from "react";
import { Image, Pressable, ScrollView } from "react-native";
import { height, totalSize, width } from "react-native-dimension";
import Video from "react-native-video";
import { appStyles, colors, sizes } from "../../services";
import * as Icons from "../icons";
import Wrapper from "../wrapper";

export default function ImageViewer({ navigation, route }) {
    const { goBack } = navigation;
    const { videoUrl } = route.params;

    const [isPlaying, setPlaying] = useState(true)
    return (
        <Wrapper
            isMain
            backgroundDark
        >
            <Video
                source={{ uri: videoUrl }}   // Can be a URL or a local file.
                // ref={(ref) => {
                //     videoPlayerRef[index] = ref
                // }}                                      // Store reference
                //onBuffer={this.onBuffer}                // Callback when remote video is buffering
                //onError={this.videoError}   
                paused={!isPlaying}            // Callback when video cannot be loaded
                //onEnd={()=>setPlaying(false)}
                repeat
                resizeMode='contain'
                style={{flex:1, height: null, width: null }} />
            <Wrapper isAbsoluteFill >
                <Pressable style={[{ flex: 1 }, appStyles.center]}  onPress={()=>setPlaying(!isPlaying)}>
                    {
                        !isPlaying ?
                            <Icons.Button
                                iconName="play"
                                isRound
                                buttonSize={totalSize(10)}
                                iconSize={totalSize(7)}
                                buttonColor={colors.appBgColor1 + '40'}
                                iconColor={colors.appTextColor6}
                                onPress={()=>setPlaying(true)}
                            />
                            :
                            null
                    }
                </Pressable>
            </Wrapper>
            <Icons.Button
                iconName="chevron-left"
                isRound
                buttonSize={totalSize(4)}
                buttonColor={colors.black + '40'}
                iconColor={colors.appTextColor6}
                buttonStyle={{
                    position: "absolute",
                    left: sizes.marginHorizontal,
                    top: sizes.statusBarHeight + sizes.smallMargin,
                }}
                onPress={goBack}
            />
        </Wrapper>
    );
}
