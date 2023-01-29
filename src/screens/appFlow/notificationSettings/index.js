import React, { Component, useState } from 'react';
import { View, } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Headers, Wrapper, Text, Lines, Switches, ScrollViews, Spacer, Buttons } from '../../../components';
import { goBack } from '../../../navigation/rootNavigation';
import { appStyles } from '../../../services';

export default function Index() {
    const [options, setOptions] = useState([{ title: 'Enable Notifications', value: true }, { title: 'New Release', value: true }, { title: 'New Posts', value: false }, { title: 'App Updates', value: true }])

    const onPressOption = (item, index) => {
        let tempOptions = options.slice()
        tempOptions[index].value = !tempOptions[index].value
        setOptions(tempOptions)
    }
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'Notification Settings'}
                showBackArrow
            />
            <ScrollViews.WithKeyboardAvoidingView
                footer={
                    <Wrapper>
                        <Spacer isBasic />
                        <Buttons.Colored
                            text={'Save Changes'}
                            buttonStyle={[appStyles.marginHorizontalMedium]}
                            onPress={goBack}
                        />
                        <Spacer isDoubleBase />
                    </Wrapper>
                }
            >
                {
                    options.map((item, index) => {
                        return (
                            <Wrapper key={index}>
                                <Wrapper marginHorizontalBase flexDirectionRow alignItemsCenter marginVerticalBase justifyContentSpaceBetween>
                                    <Text isRegular isTextColor2>{item.title}</Text>
                                    <Switches.Primary
                                        value={item.value}
                                        onPress={() => onPressOption(item, index)}
                                    />
                                </Wrapper>
                                <Lines.Horizontal />
                            </Wrapper>
                        )
                    })
                }
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}
