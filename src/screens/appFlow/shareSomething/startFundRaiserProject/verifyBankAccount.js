import React, { Component, useEffect, useState } from 'react';
import { View, } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Buttons, Text, CheckBoxes, Headers, Pickers, ScrollViews, Spacer, TextInputs, Wrapper, Toasts } from '../../../../components';
import { navigate } from '../../../../navigation/rootNavigation';
import { Api, appStyles, HelpingMethods, routes } from '../../../../services';
const tempbanks = [
    { label: 'Bank of America', value: 'Bank of America' },
    { label: 'Bank 1', value: 'Bank 1' },
    { label: 'Bank 2', value: 'Bank 2' },
    { label: 'Bank 3', value: 'Bank 3' },
    { label: 'Bank 4', value: 'Bank 4' },
]
export default function Index({ route }) {

    const data = route?.params?.data || null
    console.log('verify bank details data: ' + data)

    const [banks, setBanks] = useState(tempbanks)
    const [bankName, setBankName] = useState('')
    const [bankNameError, setBankNameError] = useState('')
    const [bankAccountNumber, setBankAccountNumber] = useState('')
    const [bankAccountNumberError, setBankAccountNumberError] = useState('')
    const [iConfirm, setIconfirm] = useState(false)
    const [loadingGetData, setLoadingGetData] = useState(false)


    useEffect(() => {
        //getBanks()
    }, [])
    const getBanks = async () => {
        setLoadingGetData(true)
        await Api.getBanks().
            then(res => {
                if (res) {
                    setBanks(res.data)
                }
            })
        setLoadingGetData(false)
    }

    const validateNext = () => {
        HelpingMethods.handleAnimation()
        !bankName ? setBankNameError('Select bankName') : setBankNameError('')
        !bankAccountNumber ? setBankAccountNumberError('Enter account number') : setBankAccountNumberError('')
       
        if (bankName && bankAccountNumber) {
            if(iConfirm){
                return true
            }else{
                Toasts.Error('Please confirm your bank details are correct')
            }
            
        } else {
            return false
        }
    }

    const handleNext = () => {
        if (validateNext()) {
            navigate(
               // routes.fundRaisingProjectDetail,
                routes.shareSomethingRoutes.startFundRaiserProjectRoutes.reviewProject,
                {
                    flow: 'review',
                    data: { ...data, bankName, bankAccountNumber }
                }
            )
        }
    }
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'Verify bankName account'}
                showBackArrow
                alignTitleLeft
            />
            <ScrollViews.WithKeyboardAvoidingView
                keyboardShouldPersistTaps='always'
                footer={
                    <Wrapper marginHorizontalSmall>
                        <Spacer isBasic />
                        <Buttons.Colored
                            text={'Next'}
                            //onPress={() => navigate(routes.fundRaisingProjectDetail, { flow: 'review' })}
                            onPress={handleNext}
                        />
                        <Spacer isBasic />
                    </Wrapper>
                }
            >
                <Spacer isBasic />
                <Spacer isSmall />
                <Pickers.Searchable
                    title={'Bank'}
                    data={banks}
                    value={bankName}
                    onChangeText={v => setBankName(v)}
                    onPressItem={(item, index) => {
                        console.log('item', item)
                        setBankName(item.value)
                        bankNameError && setBankNameError('')
                    }}
                    isTitleSolidColor
                    error={bankNameError}
                />
                <Spacer isBasic />
                <Spacer isSmall />
                <TextInputs.Underlined
                    // inputRef={BirthdayInputRef}
                    title="Account Number"
                    value={bankAccountNumber}
                    onChangeText={(text) => {
                        setBankAccountNumber(text)
                        bankAccountNumberError && setBankAccountNumberError('')
                    }}
                    error={bankAccountNumberError}
                    isTitleSolidColor
                />
                <Spacer isBasic />
                <Spacer isSmall />
                <CheckBoxes.Primary
                    text={
                        <Text isSmall >
                            <Text isSmall isBoldFont >I confirm all my bank details are correct</Text>
                            — please note that you can’t change them after you submit your project for review. We are responsible for lost bankName transfers as a result of incorrect or unsupported bankName credentials or accounts.

                        </Text>
                    }
                    containerStyle={[{ alignItems: 'flex-start', }, appStyles.marginHorizontalBase]}
                    checked={iConfirm}
                    onPress={() => setIconfirm(!iConfirm)}
                />
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}
