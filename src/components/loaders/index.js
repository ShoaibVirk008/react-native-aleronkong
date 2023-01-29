import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, sizes, applotties } from '../../services';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
import { Wrapper, Text, Spacer } from '..';
import Lottie from 'lottie-react-native';

export const Primary = ({ }) => {
    return (
        <Wrapper isMain>
            <Wrapper flex={1} style={[{ justifyContent: 'center', backgroundColor: 'transparent' }]}>
                <Wrapper style={[appStyles.center, { backgroundColor: 'transparent' }]}>
                    <WaveIndicator color={colors.appColor1} size={sizes.icons.xxl} />
                    <Spacer isBasic />
                    <Text isRegular isLightGray style={[appStyles.textLightGray]}>Loading</Text>
                </Wrapper>
            </Wrapper>
        </Wrapper>
    );
}


export const Secondary = ({ isVisible }) => {
    return (
        <>
            {
                isVisible ?
                    <Wrapper isAbsoluteFill animation="fadeIn" style={[{ justifyContent: 'center', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: colors.appBgColor1 + 'BF' }]}>
                        <Wrapper style={[appStyles.center, { backgroundColor: 'transparent' }]}>
                            <BallIndicator color={colors.appColor1} size={sizes.icons.xxl} />
                            <Spacer isBasic />
                            <Text isRegular >Loading</Text>
                        </Wrapper>
                    </Wrapper>
                    :
                    null
            }
        </>
    );
}

export const SmileAbsolute = ({ isVisible }) => {
    return (
        <>
            {
                isVisible ?
                    <Wrapper isAbsoluteFill background1 isCenter>
                        <Lottie
                            source={applotties.loading_smile}
                            autoPlay
                            loop
                        />
                    </Wrapper>
                    :
                    null
            }
        </>
    );
}

export const BoxesAbsolute = ({ isVisible, size,backgroundColor }) => {
    const defaultSize = size || width(30)
    return (
        <>
            {
                isVisible ?
                    <Wrapper isAbsoluteFill background1 isCenter style={[backgroundColor&&{backgroundColor:backgroundColor}]}>
                        <Lottie source={applotties.loading_boxes}
                            autoPlay
                            loop
                            style={{ height: defaultSize, width: defaultSize }}
                        />
                    </Wrapper>
                    :
                    null
            }
        </>
    );
}

export const Boxes = ({ size,containerStyle }) => {
    const defaultSize = size || width(30)
    return (
        <>
            <Wrapper isMain isCenter style={containerStyle}>
                <Lottie source={applotties.loading_boxes}
                    autoPlay
                    loop
                    style={{ height: defaultSize, width: defaultSize }}
                />
            </Wrapper>
        </>
    );
}

export const SmallPrimary = ({ size }) => {
    const defaultSize = size || width(5)
    return (
        <ActivityIndicator
            size={defaultSize}
            color={colors.appTextColor4}
        />
    )
}

export const BoxSmall = ({ size }) => {
    const defaultSize = size || width(10)
    return (
        <Lottie source={applotties.loading_boxes}
            autoPlay
            loop
            style={{ height: defaultSize, width: defaultSize }}
        />
    )
}