import React from 'react'
import { Image, StyleSheet, TouchableOpacity, ActivityIndicator, ViewPropTypes } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, sizes, appStyles, appIcons } from '../../services';
import { Icons, Wrapper } from '..';
//import LinearGradient from 'react-native-linear-gradient';

export const Round = ({ style, size, source }) => {
    const defaultSize = totalSize(5)
    return (
        <Image
            source={source}
            style={[{ height: size ? size : defaultSize, width: size ? size : defaultSize, borderRadius: 150 }, style]}
        />
    );
}

export const SqareRound = ({ style, size, source }) => {
    const defaultSize = totalSize(5)
    return (
        <Image
            source={source}
            style={[{ height: size ? size : defaultSize, width: size ? size : defaultSize, borderRadius: sizes.cardRadius }, style]}
        />
    );
}

export const Profile = ({ imageStyle, source, containerStyle, animation, onPress, size, shadow, shadowColored, onPressCamera, showBorder, overlayStyle, iconSize, showBadge }) => {
    const defaultSize = size||totalSize(5)
    return (
        <TouchableOpacity disabled={!onPress} activeOpacity={1} onPress={onPress}>
            <Wrapper
                animation={animation}
                style={[
                    styles.ImageProfileContainer,
                    shadow && appStyles.shadow,
                    shadowColored && appStyles.shadowColored,
                    containerStyle]}>
                <Image
                    source={source}
                    style={[
                        styles.ImageProfile,
                        {
                            height: defaultSize,
                            width: defaultSize,
                        },
                        showBorder && { borderWidth: 2.5 }, imageStyle]}
                />
                {
                    onPressCamera ?
                        <Wrapper isAbsoluteFill style={[{ backgroundColor: colors.appBgColor6 + '40', borderRadius: 100 }, appStyles.center, overlayStyle]}>
                            <Icon
                                name="camera"
                                type="feather"
                                onPress={onPressCamera}
                                size={iconSize ? iconSize : totalSize(3)}
                                color={colors.appTextColor6}
                            />
                        </Wrapper>
                        :
                        null
                }
                {
                    showBadge ?
                        <Wrapper isAbsolute style={{ bottom: -defaultSize/20, right: -defaultSize/20 }}>
                            <Icons.Button
                                customIcon={appIcons.crown}
                                buttonColor={colors.appColor5}
                                buttonSize={defaultSize/2.5}
                                iconSize={defaultSize/5}
                                isRound
                                shadow
                            />
                        </Wrapper>
                        :
                        null
                }
            </Wrapper>
        </TouchableOpacity>
    );
}




const styles = StyleSheet.create({
    ImageProfileContainer: {
        // ...appStyles.shadowColored,
        // backgroundColor:'transparent',
        borderRadius: 100,
        backgroundColor: colors.appBgColor1
    },
    ImageProfile: {
        width: totalSize(15),
        height: totalSize(15),
        borderRadius: 100,
        //borderWidth: 5,
        //borderColor: colors.appBgColor1,

    },
    ImageProfileOverlay: {
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    },
    ImageCollectionItem: {
        width: width(32.5),
        height: height(20),
        borderRadius: 15,
    }
})
