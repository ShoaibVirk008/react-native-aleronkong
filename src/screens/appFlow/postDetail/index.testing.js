import React, { useCallback, useRef, useState } from 'react'
import { FlatList, Image, Pressable } from 'react-native'
import { height, width } from 'react-native-dimension'
import { Spacer, Wrapper } from '../../../components'
import { appImages, colors, sizes } from '../../../services'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

export default function Index() {

    const listRef = useRef(null)

    const [activeIndex, setActiveIndex] = useState(3)

    function onSwipeUp(gestureState) {
        console.log('You swiped up!')
        listRef?.current?.scrollToIndex({ index: activeIndex + 1, animated: true })

    }

    function onSwipeDown(gestureState) {
        console.log('You swiped down!')
        listRef?.current?.scrollToIndex({ index: activeIndex - 1, animated: true })
    }

    function onSwipeLeft(gestureState) {
        console.log('You swiped left!')
    }

    function onSwipeRight(gestureState) {
        console.log('You swiped right!')
    }

    const config = {
        velocityThreshold: 0.05,
        directionalOffsetThreshold: 10
    };

    function onSwipe(gestureName, gestureState) {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        //this.setState({ gestureName: gestureName });
        switch (gestureName) {
            case SWIPE_UP:
                listRef?.current?.scrollToIndex({ index: activeIndex + 1, animated: true })
                //this.setState({backgroundColor: 'red'});
                break;
            case SWIPE_DOWN:
                listRef?.current?.scrollToIndex({ index: activeIndex - 1, animated: true })
                break;
            case SWIPE_LEFT:
                //this.setState({ backgroundColor: 'blue' });
                break;
            case SWIPE_RIGHT:
                //this.setState({ backgroundColor: 'yellow' });
                break;
        }
    }

    const _onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
        const currentIndex = viewableItems[0].index
        // setActiveVideoIndex(currentIndex)
        setActiveIndex(currentIndex)
    }, []);

    const _viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    };

    return (
        <Wrapper isMain>
            <FlatList
                ref={listRef}
                data={[1, 2, 4, 5, 6, 7, 7]}
                ItemSeparatorComponent={() => <Spacer height={height(2.5)} />}
                renderItem={({ item, index }) => {
                    return (
                        <Wrapper key={index} marginHorizontalMedium>
                            <Image
                                source={{ uri: appImages.product4 }}
                                style={{ height: height(28), width: null }}
                            />
                        </Wrapper>
                    )
                }}
                onViewableItemsChanged={_onViewableItemsChanged}
                viewabilityConfig={_viewabilityConfig}
            />
            <Wrapper isAbsoluteFill style={{}}>
                <GestureRecognizer
                    onSwipe={(direction, state) => onSwipe(direction, state)}
                    onSwipeUp={(state) => onSwipeUp(state)}
                    onSwipeDown={(state) => onSwipeDown(state)}
                    onSwipeLeft={(state) => onSwipeLeft(state)}
                    onSwipeRight={(state) => onSwipeRight(state)}
                    config={config}
                    style={{
                        flex: 1,

                    }}
                >
                    <Wrapper flex={1}>
                        <Wrapper style={{ height: height(35), backgroundColor: colors.appBgColor6 + '30' }}>

                        </Wrapper>
                        <Wrapper style={{ height: height(30), overflow: 'hidden', borderRadius: 50, borderRadius: sizes.cardRadius * 2 }}>

                        </Wrapper>
                        <Wrapper flex={3} style={{ height: height(35), backgroundColor: colors.appBgColor6 + '30' }}>

                        </Wrapper>
                    </Wrapper>
                </GestureRecognizer>
            </Wrapper>
        </Wrapper>
    )
}