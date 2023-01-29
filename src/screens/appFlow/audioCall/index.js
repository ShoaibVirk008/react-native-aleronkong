import React, { Component, useEffect, useState } from 'react';
import { View } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Headers, Icons, Images, Spacer, Wrapper, Text, StatusBars } from '../../../components';
import { goBack } from '../../../navigation/rootNavigation';
import { appStyles, colors, HelpingMethods } from '../../../services';

export default function Index({ route }) {
    const userData = route?.params?.data


    const [isCalling, setCalling] = useState(false)
    const [isInCall, setInCall] = useState(false)
    const [isCallIncomming, setCallIncomming] = useState(false)

    useEffect(() => handelCallAttended(), [])

    const handelCallAttended = () => {
        setTimeout(() => {
            HelpingMethods.handleAnimation()
            setInCall(true)
        }, 2000);
    }

    return (
        <Wrapper isMain backgroundDark>
            <StatusBars.Light />
            <Headers.Primary
                title={isInCall ? 'In Call' : 'Audio Call'}
                invertColors
                showBackArrow
                containerStyle={{ borderBottomWidth: 0 }}
            />
            <Wrapper flex={1}>
                <Wrapper flex={7} justifyContentFlexend={!isInCall} justifyContentCenter={isInCall}>
                    <Wrapper isCenter>
                        <Wrapper isCenter style={{}}>
                            {/* <Wrapper
                                isAbsoluteFill
                                background1
                                style={[{ borderRadius: 1000, backgrounColor: colors.appColor1 }, appStyles.shadowColored]}

                            >

                            </Wrapper> */}
                            <Images.Round
                                source={{ uri: userData.image }}
                                size={width(60)}
                            />

                        </Wrapper>
                        <Spacer isDoubleBase />
                        <Text isSmallTitle isWhite>{userData.name}</Text>
                        <Spacer isBasic />
                        <Spacer isSmall />
                        {
                            !isInCall ?
                                <Text isRegular isGray >Calling...</Text>
                                :
                                <Text isRegular isWhite >00:00:32</Text>

                        }
                    </Wrapper>
                </Wrapper>
                <Wrapper flex={3} justifyContentCenter>
                    <Wrapper flexDirectionRow alignItemsCenter justifyContentSpaceEvenly marginHorizontalBase>
                        <IconButton
                            iconName='mic-off'
                            iconType='ionicon'
                            isActive={false}
                        />
                        <IconButton
                            iconName='phone'
                            // iconType='ionicon'
                            backgrounColor={colors.error}
                            iconStyle={{ transform: [{ rotate: '135deg' }] }}
                            onPress={goBack}
                        />
                        <IconButton
                            iconName='volume-high'
                            iconType='ionicon'
                            isActive={false}
                        />
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        </Wrapper>
    )
}

const IconButton = ({ backgrounColor, tintColor, isActive, ...props }) => {
    const defaultButtonColor = backgrounColor || (!isActive ? colors.appColor1 : colors.appBgColor1)
    const defaultIconColor = tintColor || (!isActive ? colors.appTextColor6 : colors.appTextColor1)
    return (
        <Icons.Button
            buttonColor={defaultButtonColor}
            iconColor={defaultIconColor}
            isRound
            buttonSize={totalSize(7)}
            iconSize={totalSize(3)}

            {...props}
        />
    )
}
