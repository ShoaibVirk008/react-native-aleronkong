import React from 'react'
import { appStyles, sizes, colors } from '../../services'
import { Icons, Wrapper, Text } from '..'
import { goBack } from '../../navigation/rootNavigation'
import { height, width } from 'react-native-dimension'
import { Pressable } from 'react-native'



// export const Primary = ({ onBackPress, title, right, left, showBackArrow }) => {
//     return (
//         <Wrapper style={[appStyles.headerStyle, { justifyContent: 'center', paddingTop: sizes.statusBarHeight }]}>
//             <Wrapper flexDirectionRow >
//                 <Wrapper isAbsolute style={[appStyles.center, { right: 0, left: 0 }]}>
//                     <Text style={[appStyles.headerTitleStyle]}>{title}</Text>
//                 </Wrapper>
//                 {
//                     left ? left :
//                         showBackArrow ?
//                             <Icons.Back
//                                 onPress={onBackPress ?onBackPress : goBack}
//                             />
//                             :
//                             null
//                 }
//                 {right ? right : null}
//             </Wrapper>
//         </Wrapper>
//     )
// }

export const Primary = ({
    onBackPress, search, title, right, searchPress,
    left, titleContainerStyle, centerTitle, tintColor,
    containerStyle, headerTitle, alignTitleLeft, showBackArrow,
    invertColors, titleStyle, leftContainerStyle, rightContainerStyle }) => {

    const defaultTintColor = !invertColors ? colors.appTextColor3 : colors.appTextColor6
    const defaultBackgroundColor = !invertColors ? colors.appBgColor1 : colors.appBgColor6
    return (
        <Wrapper style={[appStyles.headerStyle, { backgroundColor: defaultBackgroundColor, borderBottomColor: defaultTintColor + '20', paddingTop: sizes.statusBarHeight * 1, paddingBottom: height(1) }, containerStyle]}>
            <Wrapper flex={1} flexDirectionRow alignItemsCenter style={{  }}>
                {/* <Wrapper isAbsolute
                    style={[
                        { right: 0, left: 0, backgroundColor: 'green', },
                        alignTitleLeft ?
                            {
                                paddingLeft: width(17.5),
                                paddingRight: sizes.marginHorizontal
                            }
                            :
                            appStyles.center,
                        titleContainerStyle]}>
                    {
                        headerTitle ? headerTitle :
                            <Text isTinyTitle numberOfLines={1} style={{ color: tintColor ? tintColor : defaultTintColor }}>{title}</Text>
                    }
                </Wrapper> */}
                <Wrapper flex={1.5}  style={[
                    // { backgroundColor: 'red' },
                    leftContainerStyle]}>
                    {
                        left ? left :
                            showBackArrow ?
                                <Pressable
                                    style={[{ flex: 1},appStyles.center]}
                                    onPress={onBackPress ? onBackPress : goBack}
                                >
                                    <Icons.Back
                                        //onPress={onBackPress}
                                        //onPress={onBackPress ? onBackPress : goBack}
                                       // style={{ marginLeft: sizes.marginHorizontal }}
                                        color={tintColor ? tintColor : defaultTintColor}
                                    />
                                </Pressable>
                                :
                                null
                    }
                </Wrapper>
                <Wrapper flex={7}
                    style={[
                        // { backgroundColor: 'green', },
                        alignTitleLeft ?
                            appStyles.alignItemsFlexStart
                            :
                            appStyles.alignItemsCenter,
                        titleContainerStyle]}>
                    {
                        headerTitle ? headerTitle :
                            <Text isTinyTitle isBoldFont numberOfLines={1} style={[{ color: tintColor ? tintColor : defaultTintColor }, titleStyle]}>{title}</Text>
                    }
                </Wrapper>

                {/* {right ?
                    right
                    :
                    <Wrapper flex={1.5}></Wrapper>
                } */}
                <Wrapper flex={1.5} style={rightContainerStyle}>
                    {right ?
                        right
                        :
                        <></>
                    }
                </Wrapper>

            </Wrapper>
        </Wrapper>
    )
}