import React, { useState } from 'react'
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Pressable,
} from 'react-native'
import { BlurView } from '@react-native-community/blur'
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
import { Api, appImages, colors, DummyData, HelpingMethods, routes, sizes } from '../../../../services'
import { height, totalSize, width } from 'react-native-dimension'
import { Common, Spacer, Wrapper, Text, Loaders } from '../../../../components'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import TrackPlayer, { useProgress, Event, useTrackPlayerEvents, State, usePlaybackState } from 'react-native-track-player';
import { setNowPlaying, setNowPlayingStatus } from '../../../../services/store/actions'
import { navigate } from '../../../../navigation/rootNavigation'

const AnimatedView = Animated.View
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

const songCoverSizes = [50, Dimensions.get('window').width - width(20)]
const songCoverTopPositions = [
    10,
    Dimensions.get('window').width / 1.5 - songCoverSizes[1] / 2,
]
const songCoverLeftPositions = [
    20,
    Dimensions.get('window').width / 2 - songCoverSizes[1] / 2,
]
const snapPoints = [
    height(8),
    // sizes.headerHeight,
    height(100)
]

const selectedSong = DummyData.audio_books[0]


function MusicPlayer() {
    let bottomSheetRef = React.createRef<BottomSheet>()
    // let fall = new Animated.Value(1)
    // console.log('fall-->',fall)

    //redux states
    const app = useSelector(state => state.app)
    const { nowPlaying, nowPlayingStatus } = app
    const image = nowPlaying?.media?.[0] || appImages.noImageAvailable
    const title = nowPlaying?.title || ''
    const creatorName = (nowPlaying?.creator?.firstName || 'Creator') + ' ' + (nowPlaying?.creator?.lastName || 'Name')
    const file = nowPlaying?.file

    //local States
    // const [isPlaying, setPlaying] = useState(true)
    const [loading, setLoading] = useState(true)
    const [trendingProducts, setTrendingProducts] = useState(null)

    const [fall, setFall] = useState(new Animated.Value(1))
    const progress = useProgress();
    const playerState = usePlaybackState();
    const isPlaying = playerState === State.Playing;
    const isBuffering = playerState === State.Buffering;

    useTrackPlayerEvents([Event.PlaybackQueueEnded], async event => {
        if (event.type === Event.PlaybackQueueEnded) {
            console.log('event: ', event)
            //await TrackPlayer.reset()
            await TrackPlayer.seekTo(0)
            await TrackPlayer.play()
        }
    });

    useEffect(() => {
        if (nowPlaying) {
            handleGetSetData()
        } else {
            TrackPlayer.reset()
                .then(res => {

                })
                .catch(err => {
                    console.log('TrackPlayer.reset error: ', err)
                })
            setTrendingProducts(null)
            setLoading(true)
        }
    }, [nowPlaying])

    const handleGetSetData = async () => {
        bottomSheetRef?.current?.snapTo(1)
        await startAudio()
        await handleGetTrendingProducts()
    }
    const startAudio = async () => {
        // Set up the player
        await TrackPlayer.setupPlayer()
            .then(res => {
                console.log('TrackPlayer.setupPlayer res: ', res)
            })
            .catch(err => {
                console.log('TrackPlayer.setupPlayer error: ', err)
            })

        //Add a track to the queue
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
            });

        // Start playing it
        await TrackPlayer.play()
            .then(res => {
                console.log('TrackPlayer.play res: ', res)

            })
            .catch(err => {
                console.log('TrackPlayer.play error: ', err)
            });;
        setLoading(false)
        // const state = await TrackPlayer.getState()
        // console.log('state:', state)
    };

    const handleGetTrendingProducts = async () => {
        await Api.getTrendingProducts({ category: nowPlaying?.category?._id })
            .then(res => {
                if (res) {
                    setTrendingProducts(res.data)
                }
            })
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
    const handleClosePlayer = () => {
        setNowPlaying(null)
        TrackPlayer.reset()
    }
    const currentDuration = HelpingMethods.fancyTimeFormat(progress.position)
    const totalDuration = HelpingMethods.fancyTimeFormat(progress.duration)

    const animatedSongCoverTopPosition = Animated.interpolateNode(fall, {
        inputRange: [0, 1],
        outputRange: songCoverTopPositions.slice().reverse(),
        extrapolate: Animated.Extrapolate.CLAMP,
    })

    const animatedSongCoverSize = Animated.interpolateNode(fall, {
        inputRange: [0, 1],
        outputRange: [songCoverSizes[0], songCoverSizes[1]].slice().reverse(),
        extrapolate: Animated.Extrapolate.CLAMP,
    })

    const animatedHeaderContentOpacity = Animated.interpolateNode(fall, {
        inputRange: [0.75, 1],
        outputRange: [0, 1],
        extrapolate: Animated.Extrapolate.CLAMP,
    })
    const animatedHeaderContentHieht = Animated.interpolateNode(fall, {
        inputRange: [0, 1],
        outputRange: [0, snapPoints[0]].slice(),
        extrapolate: Animated.Extrapolate.CLAMP,
    })
    const onHeaderPress = () => {
        bottomSheetRef.current!.snapTo(1)
    }

    const renderContent = () => {
        const animatedBackgroundOpacity = Animated.sub(
            1,
            animatedHeaderContentOpacity
        )
        const animatedContentOpacity = Animated.interpolateNode(fall, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Animated.Extrapolate.CLAMP,
        })

        return (
            <AnimatedView style={[styles.contentContainer]}>
                <AnimatedView
                    style={[
                        styles.contentBackground,
                        { opacity: animatedBackgroundOpacity },
                    ]}
                />

                <AnimatedView style={{ opacity: animatedContentOpacity }}>
                    <AnimatedView
                        style={{
                            height: Animated.add(
                                Animated.sub(animatedSongCoverSize, snapPoints[0]),
                                animatedSongCoverTopPosition
                            ),
                        }}
                    />

                    {/* <View style={styles.seekBarContainer}>
                         <View style={styles.seekBarTrack} />
                        <View style={styles.seekBarThumb} /> 
                        <View style={styles.seekBarTimingContainer}>
                            <Text style={styles.seekBarTimingText}>0:00</Text>
                            <Text style={styles.seekBarTimingText}>{`-${song.length}`}</Text>
                        </View>
                    </View> */}
                    <Spacer isBasic />
                    <Text isMediumTitle alignTextCenter>{title}</Text>
                    <Spacer isSmall />
                    <Text isMedium isGray alignTextCenter>{creatorName}</Text>
                    <Spacer isBasic />
                    <Wrapper alignItemsCenter>
                        {/* <Common.AudioProgressBar
                            progress={6}
                            width={width(90)}
                            minimumValue={0}
                            maximumValue={10}
                        /> */}
                        <Common.AudioProgressBar
                            progress={Math.round(progress.position)}
                            width={width(90)}
                            minimumValue={0}
                            maximumValue={Math.round(progress.duration)}
                            onSlidingStart={() => handlePausePlayAudio(true)}
                            onSeek={(value) => {
                                console.log('onSeek: ', value)
                                TrackPlayer.seekTo(value);
                                handlePausePlayAudio(false)
                            }}
                        />
                    </Wrapper>
                    <Wrapper flexDirectionRow justifyContentSpaceBetween>
                        <Text isTiny isLightGray>{currentDuration}</Text>
                        <Text isTiny isLightGray>{totalDuration}</Text>
                    </Wrapper>
                    <Spacer isBasic />
                    <Wrapper flexDirectionRow justifyContentSpaceEvenly alignItemsCenter>
                        <Common.IconButtonBadge
                            iconName='skip-back'
                            size={totalSize(5)}
                            iconType='feather'
                            iconSize={totalSize(2.25)}
                        />
                        {
                            (!isBuffering && !loading) ?
                                <Common.IconButtonBadge
                                    iconName={isPlaying ? 'pause' : 'play'}
                                    size={totalSize(5.75)}
                                    // onPress={() => setPlaying(!isPlaying)}
                                    onPress={() => handlePausePlayAudio()}
                                // onPress={() => setNowPlayingStatus(!nowPlayingStatus)}
                                />
                                :
                                <Loaders.BoxSmall
                                    size={totalSize(5)}
                                />
                        }
                        <Common.IconButtonBadge
                            iconName='skip-forward'
                            size={totalSize(5)}
                            iconType='feather'
                            iconSize={totalSize(2.25)}
                        />
                    </Wrapper>
                    <Spacer isBasic />
                    {
                        trendingProducts ?
                            trendingProducts?.length ?
                                <>
                                    <Wrapper marginHorizontalBase>
                                        <Text isTinyTitle>Trending Audiobooks</Text>
                                    </Wrapper>
                                    <Spacer isSmall />
                                    <Common.ProductsPrimaryHorizontal
                                        data={trendingProducts}
                                        onPressItem={(item, index) => {
                                            bottomSheetRef?.current?.snapTo(0)
                                            navigate(routes.digitalProductsFlow.productDetail, { data: item, })
                                        }}
                                    />
                                </>
                                :
                                <></>
                            :
                            <Wrapper paddingVerticalLarge alignItemsCenter>
                                <Loaders.BoxSmall />
                            </Wrapper>
                    }
                </AnimatedView>
            </AnimatedView>
        )
    }

    const renderSongCover = () => {
        const animatedSongCoverLeftPosition = Animated.interpolateNode(fall, {
            inputRange: [0, 1],
            outputRange: songCoverLeftPositions.slice().reverse(),
            extrapolate: Animated.Extrapolate.CLAMP,
        })

        return (
            <AnimatedView
                key={'song-cover-container'}
                style={[
                    styles.songCoverContainer,
                    {
                        height: animatedSongCoverSize,
                        width: animatedSongCoverSize,
                        left: animatedSongCoverLeftPosition,
                        top: animatedSongCoverTopPosition,
                    },
                ]}
            >
                <Image
                    key={'song-cover'}
                    style={styles.songCoverImage}
                    source={{ uri: image }}
                />
            </AnimatedView>
        )
    }

    const renderHeader = () => {
        const animatedBackgroundOpacity = Animated.sub(
            1,
            animatedHeaderContentOpacity
        )
        //console.log('animatedHeaderContentOpacity: ', animatedHeaderContentOpacity)
        return [
            <Pressable
                //key={'header-container'}
                onPress={onHeaderPress}
            //style={{ backgroundColor: 'red' }}
            >
                <AnimatedView style={styles.headerContainer}>
                    <AnimatedView
                        style={[
                            styles.headerBackground,
                            {
                                opacity: animatedBackgroundOpacity,
                                // backgroundColor: 'red'
                            },
                        ]}
                    >
                        {/* {renderHandler()} */}
                        <Wrapper marginHorizontalBase
                            flexDirectionRow alignItemsCenter justifyContentSpaceBetween
                        >
                            <Common.IconButtonBadge
                                iconName={'close'}
                                buttonSize={totalSize(3.5)}
                                iconSize={totalSize(2)}
                                // onPress={() => setPlaying(!isPlaying)}
                                onPress={handleClosePlayer}
                                buttonColor={colors.appBgColor3 + '00'}
                            />
                            <Text isMedium isTextColor3 >Now Playing</Text>
                            <Common.IconButtonBadge
                                iconName={'chevron-down'}
                                buttonSize={totalSize(3.5)}
                                iconSize={totalSize(2.5)}
                                // onPress={() => setPlaying(!isPlaying)}
                                onPress={() => {
                                    bottomSheetRef?.current?.snapTo(0)
                                }}
                                buttonColor={colors.appBgColor3 + '00'}
                            />
                        </Wrapper>
                    </AnimatedView>
                    {/* <AnimatedBlurView
                        blurType="light"
                        blurAmount={10}
                        reducedTransparencyFallbackColor="white"
                        style={[
                            styles.headerContentContainer,
                            {
                                opacity: animatedHeaderContentOpacity,
                            },
                        ]}
                    > */}
                    <AnimatedView
                        style={[
                            styles.headerContentContainer,
                            {
                                opacity: animatedHeaderContentOpacity,
                                //height:animatedHeaderContentOpacity
                                height: animatedHeaderContentHieht
                            },
                        ]}
                    >
                        {/* <AnimatedBlurView
                            blurType="light"
                            blurAmount={10}
                            reducedTransparencyFallbackColor="white"
                            style={[
                                styles.headerContentContainer,
                                {
                                    opacity: animatedHeaderContentOpacity,
                                },
                            ]}
                        > */}
                        {/* <View style={styles.headerTopBorder} /> */}
                        <Wrapper flex={1}>
                            <Wrapper>
                                <Text isRegular isBoldFont isTextColor3 numberOfLines={1}>{title}</Text>
                                <Spacer isSmall />
                                <Text isSmall isGray >{creatorName}</Text>
                            </Wrapper>
                        </Wrapper>
                        <Common.IconButtonBadge
                            iconName={isPlaying ? 'pause' : 'play'}
                            buttonSize={totalSize(4)}
                            iconSize={totalSize(3)}
                            // onPress={() => setPlaying(!isPlaying)}
                            onPress={() => handlePausePlayAudio()}
                            buttonColor={colors.appColor1 + '10'}
                        />
                    </AnimatedView>
                    {/* </AnimatedBlurView> */}
                </AnimatedView>
            </Pressable>,
            renderSongCover(),
        ]
    }

    return (
        <>
            {
                nowPlaying ?
                    <BottomSheet
                        ref={bottomSheetRef}
                        initialSnap={0}
                        callbackNode={fall}
                        snapPoints={snapPoints}
                        renderHeader={renderHeader}
                        renderContent={renderContent}
                    />
                    :
                    null
            }
        </>

    )
}

const styles = StyleSheet.create({
    // Screen
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    // Shadow
    shadowContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    },

    // Content
    contentContainer: {
        alignItems: 'center',
        height: snapPoints[1] - snapPoints[0],
        overflow: 'visible',
    },

    contentBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#fff',
    },

    // Header
    headerContainer: {
        height: snapPoints[0],
    },

    headerBackground: {
        ...StyleSheet.absoluteFillObject,
        //borderTopLeftRadius: 10,
        //borderTopRightRadius: 10,
        // overflow: 'hidden',
        backgroundColor: '#ffffff',
        paddingTop: (sizes.statusBarHeight)
    },

    headerContentContainer: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingRight: 20,
        paddingLeft: 20 + songCoverSizes[0] + 20,
        backgroundColor: '#EDE8FD'
    },

    headerTopBorder: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        opacity: 0.5,
        height: 0.25,
        backgroundColor: '#9B9B9B',
    },

    headerActionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 50,
        minWidth: 50,
    },

    // Handler
    handlerContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: 10,
        height: 20,
        width: 20,
    },

    handlerBar: {
        position: 'absolute',
        backgroundColor: '#D1D1D6',
        top: 5,
        borderRadius: 3,
        height: 5,
        width: 20,
    },

    // Song
    songCoverContainer: {
        position: 'absolute',
        top: 10,
        left: 20,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 15,
        },
        shadowOpacity: 0.25,
        shadowRadius: 15.0,
    },

    songTitleLarge: {
        marginTop: 10,
        textAlign: 'center',
        color: '#333',
        fontWeight: 'bold',
        fontSize: 30,
        lineHeight: 30,
    },

    songTitleSmall: {
        flexGrow: 1,
        color: '#333',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 16,
    },

    songInfoText: {
        textAlign: 'center',
        color: '#FE2D55',
        fontSize: 24,
        lineHeight: 28,
    },

    songCoverImage: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
        backgroundColor: '#333',
    },

    // Seek Bar
    seekBarContainer: {
        height: 24,
        marginTop: 15,
        width: songCoverSizes[1],
    },

    seekBarThumb: {
        position: 'absolute',
        backgroundColor: '#8E8E93',
        top: -2,
        borderRadius: 6,
        width: 6,
        height: 6,
    },

    seekBarTrack: {
        backgroundColor: '#DDDEDD',
        height: 2,
        borderRadius: 4,
    },

    seekBarTimingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    seekBarTimingText: {
        marginTop: 5,
        fontSize: 13,
        lineHeight: 13,
        fontWeight: '500',
        color: '#8E8E93',
    },

    // Song List Item
    songListItemContainer: {
        flexDirection: 'row',
    },

    songListItemCover: {
        marginLeft: 20,
        marginRight: 15,
        marginVertical: 5,
        width: songCoverSizes[0],
        height: songCoverSizes[0],
        borderRadius: 4,
    },

    songListItemInfoContainer: {
        flexGrow: 1,
        borderBottomColor: '#CAC9CE',
        borderBottomWidth: 0.5,
        justifyContent: 'center',
    },

    songListItemSecondaryText: {
        fontSize: 12,
        color: '#8E8D92',
    },
})

export default MusicPlayer
