import React, { useState } from 'react'
import {
    Animated,
    View,
    Text,
    Pressable,
    Button,
    StyleSheet,
    Platform,
} from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { Cards, Common, Lines, Modals, Spacer, TextInputs, Wrapper } from '../../../../components'
import { appStyles, colors, product_categories, routes, sizes } from '../../../../services';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { Icon } from 'react-native-elements';


export default function Index({ route, navigation }) {
    const { navigate, replace, goBack } = navigation

    const pdfs = route?.params?.data || null
    const selectedPdfIndex = route?.params?.dataIndex >= 0 ? route?.params?.dataIndex : null
    const onPressPdfItem = route?.params?.onPressDataItem || null

    console.log('pdfs: ', pdfs)
    console.log('selectedPdfIndex: ', selectedPdfIndex)

    const MenuOptions = [
        {
            label: `View Profile`
        },
        {
            label: `Block `
        },
        {
            label: `Report `
        },
    ]

    const [isMainMenuPopupVisible, setMainMenuPopupVisibility] = useState(true)

    const toggleMainMenuPopup = () => setMainMenuPopupVisibility(!isMainMenuPopupVisible)





    const handleOnpressOptions = (item, index) => {
        onPressPdfItem(item, index)
        goBack()

    }

    const RenderOptions = () => {
        return (
            <Wrapper isBorderedWrapper paddingHorizontalZero paddingVerticalZero style={{ borderColor: colors.appBgColor2 }}>
                {
                    pdfs.map((item, index) => {
                        const is_selected = index === selectedPdfIndex
                        return (
                            <Wrapper key={index}>
                                {
                                    index != 0 ?
                                        <Lines.Horizontal />
                                        :
                                        null
                                }
                                <Cards.IconTitleArrow
                                    title={item}
                                    containerStyle={[{ paddingVertical: height(2) }]}
                                    titleStyle={[appStyles.textRegular, appStyles.textColor3, is_selected && [appStyles.textPrimaryColor, appStyles.fontBold]]}
                                    onPress={() => handleOnpressOptions(item, index)}
                                />
                            </Wrapper>
                        )
                    })
                }
            </Wrapper>
        )
    }
    return (
        <>
            <Common.PopupWrappers.Main
                toggle={goBack}
                containerStyle={{ ...appStyles.paddingVerticalBase, paddingBottom: height(7) }}
            >
                <RenderOptions />
            </Common.PopupWrappers.Main>
            {/* <Modals.PopupPrimary
                visible={isMainMenuPopupVisible}
                toggle={() => {
                    toggleMainMenuPopup()
                    goBack()
                }}
                topMargin={height(30)}
            >
              <RenderOptions/>
            </Modals.PopupPrimary> */}

        </>
    );
}

