import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { appStyles, colors, fontFamily, sizes, appIcons } from '../../services';

export default ({
    style,
    children,
    isXXLTitle,
    isXLTitle,
    isLargeTitle,
    isMediumTitle,
    isSmallTitle,
    isTinyTitle,
    isLarge,
    isMedium,
    isRegularPlus,
    isRegular,
    isSmallPlus,
    isSmall,
    isTiny,
    isXTiny,
    isInput,
    isButtonRegular,
    isButtonMedium,
    isButtonLarge,
    //align text
    alignTextCenter,
    alignTextRight,
    //colors
    isTextColor2,
    isTextColor3,
    isDarkGray,
    isGray,
    isLightGray,
    isWhite,
    isPrimaryColor,
    isSecondaryColor,
    isForthColor,
    //others
    isUnderlined,
    isBoldFont,
    isMediumFont,
    isRegularFont,
    isLightFont,

    lineHeight,
    ...props }) => {
    return (
        <Text
            style={[
                //titles
                isXXLTitle && styles.xxlTitleStyle,
                isXLTitle && styles.xlTitleStyle,
                isLargeTitle && styles.largeTitleStyle,
                isMediumTitle && styles.mediumTitleStyle,
                isSmallTitle && styles.smallTitleStyle,
                isTinyTitle && styles.tinyTitleStyle,
                //normal text
                isLarge && styles.largeTextStyle,
                isMedium && styles.mediumTextStyle,
                isRegularPlus && appStyles.textRegularPlus,
                isRegular && styles.regularTextStyle,
                isSmallPlus && appStyles.textSmallPlus,
                isSmall && styles.smallTextStyle,
                isTiny && styles.tinyTextStyle,
                isXTiny&&appStyles.xTinyText,

                isInput && styles.inputTitleStyle,
                isButtonRegular && styles.ButtonTextRegularStyle,
                isButtonMedium && styles.ButtonTextMediumStyle,
                isButtonLarge && appStyles.ButtonTextLarge,
                //align text
                alignTextCenter && appStyles.textCenter,
                alignTextRight && appStyles.alignTextRight,
                //text colors
                isTextColor2&&appStyles.textColor2,
                isTextColor3&&appStyles.textColor3,
                isDarkGray && appStyles.textDarkGray,
                isGray && appStyles.textGray,
                isLightGray && appStyles.textLightGray,
                isWhite && appStyles.textWhite,
                isPrimaryColor && appStyles.textPrimaryColor,
                isSecondaryColor && appStyles.textSecondaryColor,
                isForthColor && appStyles.textForthColor,

                //others
                isUnderlined && appStyles.textUnderlined,
                isBoldFont && appStyles.fontBold,
                isMediumFont && appStyles.fontMedium,
                isRegularFont && appStyles.fontRegular,
                isLightFont && appStyles.fontLight,
                {lineHeight:lineHeight},
                style,]}
            {...props}
        >
            {children}
        </Text>
    );
}




const styles = StyleSheet.create({
    xxlTitleStyle: {
        ...appStyles.h1
    },
    xlTitleStyle: {
        ...appStyles.h2
    },
    largeTitleStyle: {
        ...appStyles.h3
    },
    mediumTitleStyle: {
        ...appStyles.h4
    },
    smallTitleStyle: {
        ...appStyles.h5
    },
    tinyTitleStyle: {
        ...appStyles.h6,
    },
    largeTextStyle: {
        ...appStyles.textLarge
    },
    mediumTextStyle: {
        ...appStyles.textMedium
    },
    regularTextStyle: {
        ...appStyles.textRegular
    },
    smallTextStyle: {
        ...appStyles.textSmall
    },
    tinyTextStyle: {
        ...appStyles.textTiny
    },
    inputTitleStyle: {
        ...appStyles.textSmall,
        //...appStyles.fontLight,
        ...appStyles.textColor2
    },
    ButtonTextRegularStyle: {
        ...appStyles.ButtonRegular,
    },
    ButtonTextMediumStyle: {
        ...appStyles.ButtonMedium,
    },

});

