import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, sizes } from '../../services';

const TempSpacer = ({ style, width, height, }) => {
    return (
        <View style={[{ height: height, width: width }, style]} />
    );
}
export default Spacer = ({ horizontal, height, width, style, isBasic, isSmall, isTiny, isXTiny, isDoubleBase, isStatusBarHeigt, isHeaderHeight, isBottomTabBarHeight }) => {
    const tempSize = isXTiny ? sizes.TinyMargin / 2 :
        isTiny ? sizes.TinyMargin :
            isSmall ? sizes.smallMargin :
                isBasic ? sizes.baseMargin :
                    isDoubleBase ? sizes.doubleBaseMargin :
                        isStatusBarHeigt ? sizes.statusBarHeight :
                            isHeaderHeight ? sizes.headerHeight :
                                isBottomTabBarHeight ? sizes.tabBarHeight : sizes.baseMargin
    const defaultHeight = !horizontal ? height || tempSize : 0
    const defaultWidth = (horizontal || width) ? width || tempSize : 0
    return (
        <TempSpacer height={defaultHeight} width={defaultWidth} style={style} />
    );
}
