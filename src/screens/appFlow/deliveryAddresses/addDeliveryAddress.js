import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Buttons, Headers, ScrollViews, Spacer, TextInputs, Toasts, Wrapper } from '../../../components';
import { goBack } from '../../../navigation/rootNavigation';
import { Api, appStyles, HelpingMethods } from '../../../services';

export default function Index({ route }) {
    const isEdit = route?.params?.data || null
    const addressData = route?.params?.data || null

    const [label, setLable] = useState('')
    const [lableError, setLableError] = useState('')
    const [line1, setLine1] = useState('')
    const [line1Error, setLine1Error] = useState('')
    const [line2, setLine2] = useState('')
    const [line2Error, setLine2Error] = useState('')
    const [city, setCity] = useState('')
    const [cityError, setCityError] = useState('')
    const [state, setState] = useState('')
    const [stateError, setStateError] = useState('')
    const [country, setCountry] = useState('')
    const [countryError, setCountryError] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [postalCodeError, setPostalCodeError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        getSetAddressData()
    },[])

    const getSetAddressData = () => {
        if (addressData) {
            const { label, line1, line2, city, state, country, postalCode } = addressData
            setLable(label)
            setLine1(line1)
            setLine2(line2)
            setCity(city)
            setState(state)
            setCountry(country)
            setPostalCode(postalCode)
        }
    }
    const validation = () => {
        HelpingMethods.handleAnimation()
        !label ? setLableError('Enter label') : setLableError('')
        !line1 ? setLine1Error('Enter address line 1') : setLine1Error('')
        !line2 ? setLine2Error('Enter address line 2') : setLine2Error('')
        !city ? setCityError('Enter city') : setCityError('')
        !state ? setStateError('Enter state') : setStateError('')
        !country ? setCountryError('Enter country') : setCountryError('')
        !postalCode ? setPostalCodeError('Enter postal code') : setPostalCodeError('')
        if (label, line1, line2, city, state, country, postalCode) {
            return true
        } else {
            return false
        }
    }

    const handleAddAddress = async () => {
        if (validation()) {
            setLoading(true)
            await Api.addAddress({ label, line1, line2, city, state, country, postalCode })
                .then(res => {
                    if (res) {
                        Toasts.Success('Delivery Address Added')
                        goBack()
                    }
                })
            setLoading(false)
        }
    }
    const handleUpdateAddress = async () => {
        if (validation()) {
            setLoading(true)
            await Api.updateAddress({ addressId: addressData._id, label, line1, line2, city, state, country, postalCode })
                .then(res => {
                    if (res) {
                        Toasts.Success('Delivery Address Updated')
                        goBack()
                    }
                })
            setLoading(false)
        }
    }
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={!isEdit ? 'Add Delivery Address' : 'Edit Delivery Address'}
                showBackArrow
            />
            <ScrollViews.WithKeyboardAvoidingView
                footer={
                    <Wrapper>
                        <Spacer isSmall />
                        <Buttons.Colored
                            text={!isEdit ? 'Add' : 'Update'}
                            onPress={!isEdit ? handleAddAddress : handleUpdateAddress}
                            buttonStyle={[appStyles.marginHorizontalMedium]}
                            isLoading={loading}
                        />
                        <Spacer isDoubleBase />
                    </Wrapper>
                }
            >
                <Spacer />
                <Spacer isSmall />
                <TextInputs.Underlined
                    title={'label'}
                    value={label}
                    onChangeText={(t) => {
                        setLable(t)
                        lableError && [HelpingMethods.handleAnimation(), setLableError('')]
                    }}
                    error={lableError}
                    isTitleSolidColor
                />
                <Spacer />
                <Spacer isSmall />
                <TextInputs.Underlined
                    title={'Address Line 1'}
                    value={line1}
                    onChangeText={(t) => {
                        setLine1(t)
                        line1Error && [HelpingMethods.handleAnimation(), setLine1Error('')]
                    }}
                    error={line1Error}
                    isTitleSolidColor
                />
                <Spacer />
                <Spacer isSmall />
                <TextInputs.Underlined
                    title={'Address Line 2'}
                    value={line2}
                    onChangeText={(t) => {
                        setLine2(t)
                        line2Error && [HelpingMethods.handleAnimation(), setLine2Error('')]
                    }}
                    error={line2Error}
                    isTitleSolidColor
                />
                <Spacer />
                <Spacer isSmall />
                <TextInputs.Underlined
                    title={'City'}
                    value={city}
                    onChangeText={(t) => {
                        setCity(t)
                        cityError && [HelpingMethods.handleAnimation(), setCityError('')]
                    }}
                    error={cityError}
                    isTitleSolidColor
                />
                <Spacer />
                <Spacer isSmall />
                <TextInputs.Underlined
                    title={'State'}
                    value={state}
                    onChangeText={(t) => {
                        setState(t)
                        stateError && [HelpingMethods.handleAnimation(), setStateError('')]
                    }}
                    error={stateError}
                    isTitleSolidColor
                />
                <Spacer />
                <Spacer isSmall />
                <TextInputs.Underlined
                    title={'Country'}
                    value={country}
                    onChangeText={(t) => {
                        setCountry(t)
                        countryError && [HelpingMethods.handleAnimation(), setCountryError('')]
                    }}
                    error={countryError}
                    isTitleSolidColor
                />
                <Spacer />
                <Spacer isSmall />
                <TextInputs.Underlined
                    title={'Postal Code'}
                    value={postalCode}
                    onChangeText={(t) => {
                        setPostalCode(t)
                        postalCodeError && [HelpingMethods.handleAnimation(), setPostalCodeError('')]
                    }}
                    error={postalCodeError}
                    isTitleSolidColor
                />
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}
