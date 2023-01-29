import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Buttons, Headers, ScrollViews, Spacer, TextInputs, Toasts, Wrapper } from '../../../components';
import { goBack } from '../../../navigation/rootNavigation';
import { Api, appStyles, HelpingMethods } from '../../../services';

export default function Index({ route }) {
    const isEdit = route?.params?.data || null

    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [cardNumberError, setCardNumberError] = useState('')
    const [cardExpiry, setCardExpiry] = useState('')
    const [cardExpiryError, setCardExpiryError] = useState('')
    const [cvc, setCvc] = useState('')
    const [cvcError, setCvcError] = useState('')
    const [loading, setLoading] = useState(false)

    // Handle card number on change
    const handleOnChangeCardNumberText = (cardNumber) => {
        HelpingMethods.handleAnimation()
        !cardNumber ? setCardNumberError('') : cardNumber.length < 19 ? setCardNumberError('Please enter all 16 digits') : setCardNumberError('')
        //setState({ cardNumber })
        setCardNumber(cardNumber.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())
    }

    const handleOnChangeCardExpiryText = (text) => {
        //setState({ cardNumber })
        HelpingMethods.handleAnimation()
        !text ? setCardExpiryError('') : text.length < 5 ? setCardExpiryError('Invalid expiry') : setCardExpiryError('')
        if (text.indexOf('.') >= 0 || text.length > 5) {
            return;
        }
        if (text.length === 2 && cardExpiry.length === 1) {
            text += '/'
        }
        // Update the state, which in turns updates the value in the text field
        setCardExpiry(text)
    }

    const handleOnChangeCvcText = (cvc) => {
        HelpingMethods.handleAnimation()
        !cvc ? setCvcError('') : cvc.length < 3 ? setCvcError('Invalid cvc') : setCvcError('')
        //setState({ cardNumber })
        setCvc(cvc)
    }

    const paymentValidations = () => {
        HelpingMethods.handleAnimation()
        !cardNumber ? setCardNumberError('Enter card number.') : cardNumber.length < 19 ? setCardNumberError('Invalid card number') : setCardNumberError('')
        !name ? setNameError("Enter card holder's name") : setNameError('')
        !cardExpiry ? setCardExpiryError('Enter expiry.') : cardExpiry.length < 5 ? setCardExpiryError('Invalid expiry') : setCardExpiryError('')
        !cvc ? setCvcError('Enter cvc') : cvc.length < 3 ? setCvcError('Invalid cvc') : setCvcError('')

        if (cardNumber.length === 19 && name.length >= 2 && cardExpiry.length === 5 && cvc.length === 3) {
            return true
        } else {
            return false
        }
    }

    const handleAddPaymentMethod = async () => {
        if (paymentValidations()) {
            setLoading(true)
            console.log('cardExpiry.slice(0,2):', cardExpiry.slice(0, 2))
            console.log('cardExpiry.slice(3,5):', cardExpiry.slice(3, 5))
            await Api.addPaymentMethod({
                name,
                number: cardNumber.replace(/\s/g, ''),
                expiryMonth: Number(cardExpiry.slice(0, 2)),
                expiryYear: Number(cardExpiry.slice(3, 5)),
                cvc
            }).then(res => {
                if (res) {
                    Toasts.Success('Payment Methode Added')
                    goBack()
                }
            })
            setLoading(false)
        }
    }
    const handleUpdatePaymentMethod = async () => {
        if (paymentValidations()) {
            setLoading(true)
            await Api.updatePaymentMethod({
                name,
                number: cardNumber.replace(/\s/g, ''),
                expiryMonth: cardExpiry.slice(0, 2),
                expiryYear: cardExpiry.slice(3, 5),
                cvc
            }).then(res => {
                if (res) {
                    Toasts.Success('Payment Method Updated')
                    goBack()
                }
            })
            setLoading(false)
        }
    }
   

    return (
        <Wrapper isMain>
            <Headers.Primary
                title={!isEdit ? 'Add Payment Method' : 'Edit Payment Method'}
                showBackArrow
            />
            <ScrollViews.WithKeyboardAvoidingView
                footer={
                    <Wrapper>
                        <Spacer isSmall />
                        <Buttons.Colored
                            text={!isEdit ? 'Add' : 'Update'}
                            onPress={() => {
                                !isEdit ?
                                    handleAddPaymentMethod() :
                                    handleUpdatePaymentMethod()
                            }}
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
                    title={"Card Holder's Name"}
                    value={name}
                    onChangeText={(t) => {
                        setName(t)
                        nameError && [HelpingMethods.handleAnimation(), setNameError('')]
                    }}
                    error={nameError}
                    isTitleSolidColor
                />
                <Spacer />
                <Spacer isSmall />
                <TextInputs.Underlined
                    title={'Card Number'}
                    value={cardNumber}
                    onChangeText={handleOnChangeCardNumberText}
                    error={cardNumberError}
                    isTitleSolidColor
                    keyboardType="number-pad"
                    maxLength={19}
                />
                <Spacer />
                <Spacer isSmall />
                <Wrapper flexDirectionRow marginHorizontalBase>
                    <Wrapper flex={1}>
                        <TextInputs.Underlined
                            title={'Expiry'}
                            value={cardExpiry}
                            onChangeText={handleOnChangeCardExpiryText}
                            error={cardExpiryError}
                            isTitleSolidColor
                            containerStyle={{ marginHorizontal: 0 }}
                            keyboardType="number-pad"
                            maxLength={5}
                        />
                    </Wrapper>
                    <Spacer isSmall horizontal />
                    <Wrapper flex={1}>
                        <TextInputs.Underlined
                            title={'CVV'}
                            value={cvc}
                            secureTextEntry
                            onChangeText={handleOnChangeCvcText}
                            error={cvcError}
                            isTitleSolidColor
                            containerStyle={{ marginHorizontal: 0 }}
                            keyboardType="number-pad"
                            maxLength={3}
                        />
                    </Wrapper>
                </Wrapper>
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}
