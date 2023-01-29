import React from 'react'
import { appStyles, colors, sizes } from "../../services"
import { totalSize } from "react-native-dimension"
import { Buttons, Wrapper } from '..'
export const Primary = ({ data, onPress, disabled, containerStyle, chipStyle, textStyle, keyName }) => {
    return (

        <Wrapper flexDirectionRow style={[containerStyle]}>
            {
                data.map((item, index) => {
                    return (
                        <Buttons.ColoredSmall
                            key={index}
                            disabled={!onPress || disabled}
                            iconName={onPress && "close"}
                            //iconType="ionicon"
                            iconSize={totalSize(2)}
                            iconColor={colors.appTextColor4}
                            onPress={() => onPress(item, index)}
                            direction="row-reverse"
                            text={keyName ? item[keyName] : item}
                            buttonStyle={[{ paddingHorizontal: sizes.marginHorizontal / 6, marginRight: sizes.marginHorizontal / 4, marginBottom: sizes.marginVertical / 2, paddingVertical: sizes.TinyMargin, backgroundColor: colors.appBgColor2, borderRadius: 100 }, chipStyle]}
                            textStyle={[appStyles.textSmall, textStyle]}
                        />
                    )
                })
            }
        </Wrapper>

    )
}