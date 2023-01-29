import React, { Component, useEffect, useState } from 'react';
import { View, Pressable, Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Common, Images, Spacer, Wrapper, Text, Buttons, Loaders } from '../../../../components';
import { BlurView } from '@react-native-community/blur'
import { appStyles, colors, routes, sizes } from '../../../../services';
import { totalSize, width } from 'react-native-dimension';
import { goBack, navigate } from '../../../../navigation/rootNavigation';
import TrackPlayer, { useProgress, Event, useTrackPlayerEvents, State, usePlaybackState } from 'react-native-track-player';

export default function Index({ navigation, route }) {
    const { replace } = navigation
    const productData = route?.params?.data || null

    const { media, file, audioSample, category, title,
        description, price, asin, publicationDate, language, fileSize,
        textToSpeech, enhancedTypeSetting, xRay, wordWise,
        printLength, lending, simultaneousDeviceUsage
    } = productData
    //const [isPlaying, setPlaying] = useState(true)
    const [loading, setLoading] = useState(true)
    const progress = useProgress();
    const playerState = usePlaybackState();
    const isPlaying = playerState === State.Playing;
    const isBuffering = playerState === State.Buffering;
    console.log('progress: ',progress)
    console.log('playerState: ',playerState)
    useTrackPlayerEvents([Event.PlaybackQueueEnded], async event => {
        if (event.type === Event.PlaybackQueueEnded) {
            console.log('event: ', event)
            //await TrackPlayer.reset()
            await TrackPlayer.seekTo(0)
            await TrackPlayer.play()
        }
    });

    useEffect(() => {
        startAudio()
        return () => {
            TrackPlayer.reset()
                .then(res => {

                })
                .catch(err => {
                    console.log('TrackPlayer.reset error: ', err)
                })
        }
    }, [])



    const startAudio = async () => {
        // Set up the player
        await TrackPlayer.setupPlayer()
            .then(res => {
                console.log('TrackPlayer.setupPlayer res: ', res)
            })
            .catch(err => {
                console.log('TrackPlayer.setupPlayer error: ', err)
            })

        // Add a track to the queue
        await TrackPlayer.add({
            id: 'trackId',
            url: file,
            // title: 'Track Title',
            // artist: 'Track Artist',
            // artwork: require('track.png')
        })
            .then(res => {
                console.log('TrackPlayer.add res: ', res)
            })
            .catch(err => {
                console.log('TrackPlayer.add error: ', err)
            })

        // Start playing it
        await TrackPlayer.play()
            .then(res => {
                console.log('TrackPlayer.play res: ', res)

            })
            .catch(err => {
                console.log('TrackPlayer.play error: ', err)
            })
        setLoading(false)
        // const state = await TrackPlayer.getState()
        // console.log('state:', state)
    };
    function fancyTimeFormat(duration) {
        // Hours, minutes and seconds
        var hrs = ~~(duration / 3600);
        var mins = ~~((duration % 3600) / 60);
        var secs = ~~duration % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }
    const handlePausePlayAudio = (play) => {
        const is_playing = play != undefined ? play : isPlaying
        if (!is_playing) {
            //setPlaying(true)
            TrackPlayer.play()
        } else {
            //setPlaying(false)
            TrackPlayer.pause()
        }
    }

    const currentDuration = fancyTimeFormat(progress.position)
    const totalDuration = fancyTimeFormat(progress.duration)

    return (
        <Wrapper flex={1} style={{ backgroundColor: colors.appBgColor6 + '40' }}>
            {/* <BlurView
                        blurType='light'
                        blurAmount={15}
                        //reducedTransparencyFallbackColor="white"
                        style={[
                            { flex: 1 }
                        ]}
                    > */}


            <Wrapper flex={1}>
                <Wrapper flex={4}>
                    <Pressable
                        style={{ flex: 1 }}
                        onPress={goBack}
                    />
                </Wrapper>
                <Wrapper flex={6} background1
                    style={[{ borderTopRightRadius: sizes.cardRadius * 2, borderTopLeftRadius: sizes.cardRadius * 2 }, appStyles.shadowExtraDark]}
                >
                    <Wrapper flex={1}>
                        <Wrapper alignItemsCenter style={{ marginTop: -width(35) }}>
                            <Wrapper style={[{ borderRadius: sizes.cardRadius }, appStyles.shadowDark]} background1>
                                <Images.SqareRound
                                    source={{ uri: media?.[0] }}
                                    size={width(70)}
                                    style={[{ borderRadius: sizes.cardRadius }]}
                                />
                            </Wrapper>
                        </Wrapper>
                        <Spacer isBasic />
                        <Wrapper marginHorizontalBase alignItemsCenter>
                            <Text isSmallTitle alignTextCenter>{title}</Text>
                        </Wrapper>
                        <Spacer isBasic />
                        <Spacer isBasic />
                        <Wrapper marginHorizontalMedium alignItemsCenter flexDirectionRow justifyContentSpaceBetween>
                            <Text isSmall isTextColor3>{currentDuration}</Text>
                            <Common.AudioProgressBar
                                progress={Math.round(progress.position)}
                                width={width(50)}
                                minimumValue={0}
                                maximumValue={Math.round(progress.duration)}
                                onSlidingStart={() => handlePausePlayAudio(true)}
                                onSeek={(value) => {
                                    console.log('onSeek: ', value)
                                    TrackPlayer.seekTo(value);
                                    handlePausePlayAudio(false)
                                }}
                            />
                            <Text isSmall isTextColor3>{totalDuration}</Text>
                        </Wrapper>
                        <Spacer isDoubleBase />
                        <Wrapper alignItemsCenter>
                            {
                                (!isBuffering && !loading) ?
                                    <Common.IconButtonBadge
                                        iconName={isPlaying ? 'pause' : 'play'}
                                        size={totalSize(5.75)}
                                        onPress={() => handlePausePlayAudio()}
                                    />
                                    :
                                    <Loaders.BoxSmall />
                            }
                        </Wrapper>
                    </Wrapper>
                    <Wrapper background1 paddingVerticalSmall style={[appStyles.shadowExtraDark, { paddingBottom: sizes.marginVertical / 1.5 }]} >
                        <Wrapper flexDirectionRow alignItemsCenter justifyContentSpaceBetween marginHorizontalBase>
                            <Text isMediumTitle>${price}</Text>
                            <Buttons.Colored
                                onPress={() => replace(routes.digitalProductsFlow.buyProduct, { data: productData })}
                                text={'Buy Now'}
                                buttonStyle={[appStyles.marginHorizontalZero, { paddingHorizontal: sizes.marginHorizontal * 2.5 }]}
                            />
                        </Wrapper>
                    </Wrapper>
                </Wrapper>
            </Wrapper>
            {/* </BlurView> */}
        </Wrapper>
    )
}
