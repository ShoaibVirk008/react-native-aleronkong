import { useIsFocused } from '@react-navigation/native'
import React from 'react'
import { height } from 'react-native-dimension'
import { Buttons, Headers, ScrollViews, Spacer, TextInputs, Wrapper } from '../../../../components'
import { goBack } from '../../../../navigation/rootNavigation'
import { sizes } from '../../../../services'

export default function Description({ route, navigation }) {
    const { setParams } = navigation
    const { description, handleChangeText } = route?.params
    const isFocused=useIsFocused()
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'Description'}
                showBackArrow
            />
            <Wrapper flex={1}>
                <ScrollViews.KeyboardAvoiding>
                    <Spacer />
                    <TextInputs.Underlined
                        //titleStatic={'Description'}
                        placeholder='Write description here...'
                        value={description}
                        autoFocus
                        multiline
                        inputStyle={{ height: height(50), marginVertical: sizes.smallMargin,textAlignVertical:'top' }}
                        onChangeText={(t) => {
                            isFocused && setParams({ description: t })
                            handleChangeText(t)
                        }}
                    />
                    <Spacer />
                    <Buttons.Colored
                        text={'Done'}
                        onPress={goBack}
                    />
                    <Spacer />
                </ScrollViews.KeyboardAvoiding>
            </Wrapper>
        </Wrapper>
    )
}