import React from 'react'
import { View, } from 'react-native'
import { colors } from '../../services';

export const Horizontal = ({ style, height, color }) => {
    return (
        <View style={[{ height: height ? height : 1, backgroundColor: color ? color : colors.appBgColor3 }, style]} />
    );
}
export const Vertical = ({ style, height, width, color }) => {
    return (
        <View style={[{ height: height || null, width: width || 1, backgroundColor: color ? color : colors.appBgColor3 }, style]} />
    );
}