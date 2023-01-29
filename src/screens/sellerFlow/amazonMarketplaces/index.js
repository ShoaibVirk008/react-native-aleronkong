import React, { Component, useState } from 'react';
import { View, } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Lines, Wrapper, Text, Switches, ScrollViews, Buttons, Spacer } from '../../../components';

export default function Index() {

    const temp_options = [
        { label: 'United States', value: true },
        { label: 'Canada', value: true },
        { label: 'UK and Ireland', value: false },
        { label: 'Australia and New Zealand', value: true },
        { label: 'France, Belgium, Switzerland', value: true },
        { label: 'Germany, Austria, Switzerland', value: true },
        { label: 'Japan', value: false },
        { label: 'Italy', value: true },
        { label: 'India', value: true },
        { label: 'Spain', value: true },
    ]

    const [options, setOptions] = useState(temp_options)

    const handleOnPressOption = (item, index) => {
        const tempData = options.slice()
        tempData[index].value = !tempData[index].value
        setOptions(tempData)
    }
    return (
        <Wrapper isMain>

            <ScrollViews.WithKeyboardAvoidingView
                footer={
                    <Wrapper>
                        <Spacer isBasic/>
                        <Buttons.Colored
                            text='Save Changes'
                        />
                        <Spacer isBasic/>
                    </Wrapper>
                }
            >
                {
                    options.map((item, index) => {
                        return (
                            <Wrapper key={index}>
                                <Wrapper marginHorizontalBase paddingVerticalBase flexDirectionRow alignItemsCenter justifyContentSpaceBetween>
                                    <Text isMedium>{item.label}</Text>
                                    <Switches.Primary
                                        value={item.value}
                                        onPress={() => handleOnPressOption(item, index)}
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
