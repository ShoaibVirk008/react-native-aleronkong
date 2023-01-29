import React, { Component, useState } from 'react';
import { View, } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { Icon, SearchBar } from 'react-native-elements';
import { Common, Images, Pickers, ScrollViews, Spacer, Wrapper, Text, Icons, Buttons, TextInputs, Chips } from '../../../components';
import { appStyles, colors, DummyData, sizes } from '../../../services';
const products = [
    { label: 'Product 1', value: 'Product 1' },
    { label: 'Product 2', value: 'Product 2' },
    { label: 'Product 3', value: 'Product 3' },
    { label: 'Product 4', value: 'Product 4' },
]
const customers_all = [
    { label: 'Customer 1', value: 'Customer 1' },
    { label: 'Customer 2', value: 'Customer 2' },
    { label: 'Customer 3', value: 'Customer 3' },
    { label: 'Customer 4', value: 'Customer 4' },
]
export default function Index() {
    const [productSearchQuery, setProductSearchQuery] = useState('')
    const [customerSearchQuery, setCustomerSearchQuery] = useState('')
    const selectedProducts = DummyData.products_seller.slice(0, 2)

    return (
        <Wrapper isMain>
            <ScrollViews.WithKeyboardAvoidingView
                keyboardShouldPersistTaps='handled'
            >
                <Spacer isBasic />
                <Common.TitleInfoSecondary
                    title={'Product'}
                    info={'Add custom item'}
                    titleStyle={[appStyles.textGray]}
                    infoStyle={{ color: colors.appColor1 + '80' }}
                />
                <Pickers.SearchableSecondary
                    data={products}
                    value={productSearchQuery}
                    onChangeText={v => setProductSearchQuery(v)}
                    onPressItem={(item, index) => {
                        console.log('item', item)
                        setProductSearchQuery(item.value)
                    }}
                    placeholder='Search product'
                    tintColor={colors.appTextColor1}
                />
                <Spacer isSmall />
                <Products
                    data={selectedProducts}
                />
                <Spacer isBasic />
                <Spacer isBasic />
                <Common.TitleInfoSecondary
                    title={'Payment'}
                    titleStyle={[appStyles.textSmallPlus, appStyles.fontBold]}
                />
                <Spacer isSmall />
                <Common.TitleInfoSecondary
                    title={'Subtotal'}
                    info={'$200.00'}
                />
                <Spacer isSmall />
                <Common.TitleInfoSecondary
                    title={'Add discount'}
                    info={'$0.00'}
                    titleStyle={[appStyles.textPrimaryColor]}
                />
                <Spacer isSmall />
                <Common.TitleInfoSecondary
                    title={'Add shipping'}
                    info={'$0.00'}
                    titleStyle={[appStyles.textPrimaryColor]}
                />
                <Spacer isSmall />
                <Common.TitleInfoSecondary
                    title={'Tax'}
                    info={'$12.00'}
                    titleStyle={[appStyles.textPrimaryColor]}
                />
                <Spacer isSmall />
                <Common.TitleInfoSecondary
                    title={'Total'}
                    info={'$212.00'}
                    titleStyle={[appStyles.fontBold]}
                    infoStyle={[appStyles.fontBold]}
                />
                <Spacer isBasic />
                <Wrapper marginHorizontalBase flexDirectionRow>
                    <Wrapper flex={1}>
                        <Buttons.BorderedSecondary
                            text='Send Invoice'
                            buttonStyle={[appStyles.marginHorizontalZero]}
                        />
                    </Wrapper>
                    <Wrapper flex={0.1} />
                    <Wrapper flex={1}>
                        <Buttons.ColoredSecondary
                            text='Select Payment'
                            buttonStyle={[appStyles.marginHorizontalZero]}
                        />
                    </Wrapper>
                </Wrapper>
                <Spacer isBasic />
                <Common.TitleInfoSecondary
                    title={'Customer'}
                    info={'Add new customer'}
                    titleStyle={[appStyles.textGray]}
                    infoStyle={{ color: colors.appColor1 + '80' }}
                />
                <Pickers.SearchableSecondary
                    data={customers_all}
                    value={customerSearchQuery}
                    onChangeText={v => setCustomerSearchQuery(v)}
                    onPressItem={(item, index) => {
                        console.log('item', item)
                        setCustomerSearchQuery(item.value)
                    }}
                    placeholder='Search customer'
                    tintColor={colors.appTextColor1}
                />
                <Spacer isBasic />
                <Common.TitleInfoSecondary
                    title={'Note'}
                    titleStyle={[appStyles.fontBold]}
                />
                <Spacer isSmall />
                <Wrapper isBorderedWrapper>
                    <Text isSmall>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</Text>
                </Wrapper>
                <Spacer isBasic />
                <TextInputs.UnderlinedSecondary
                    titleStatic={'Tags'}
                    placeholder='Write Tag'
                />
                <Spacer isSmall />
                <Wrapper marginHorizontalBase>
                    <Chips.Primary
                        data={['T-shirt', 'Shirt']}
                        chipStyle={{backgroundColor: colors.appBgColor3,borderRadius:sizes.cardRadius/2}}
                        onPress={()=>{}}
                    />
                </Wrapper>
                <Spacer isBasic />
                <Wrapper marginHorizontalBase flexDirectionRow>
                   
                    <Wrapper flex={1}>
                        <Buttons.ColoredSecondary
                            text='Save'
                            buttonStyle={[appStyles.marginHorizontalZero]}
                        />
                    </Wrapper>
                    <Wrapper flex={0.1} />
                    <Wrapper flex={1}>
                        <Buttons.BorderedSecondary
                            text='Discard'
                            buttonStyle={[appStyles.marginHorizontalZero,{borderColor:colors.error}]}
                            tintColor='red'
                            textStyle={{color:colors.error}}
                        />
                    </Wrapper>
                </Wrapper>
                <Spacer isBasic />
                <Spacer isBasic />
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}

const Products = ({ data }) => {
    const IconPrimary = ({ ...props }) => {
        return (
            <Icons.Button
                //iconName={'chevron-back'}
                //iconType={'ionicon'}
                buttonSize={totalSize(1.5)}
                iconSize={totalSize(1.3)}
                buttonStyle={{ borderWidth: 1, borderColor: colors.appTextColor4 }}
                iconColor={colors.appTextColor4}
                {...props}
            />
        )
    }
    return (
        <>
            {
                data.map((item, index) => {
                    const { image, label, price } = item
                    return (
                        <Wrapper key={index} marginHorizontalBase marginVerticalTiny flexDirectionRow>
                            <Images.SqareRound
                                source={{ uri: image }}
                                size={height(8)}
                                style={{ borderRadius: sizes.cardRadius / 2 }}
                            />
                            <Wrapper flex={0.05} />
                            <Wrapper flex={1} justifyContentSpaceBetween>
                                <Wrapper flexDirectionRow alignItemsCenter>
                                    <Wrapper flex={1}>
                                        <Text isSmall isGray>{label}</Text>
                                    </Wrapper>
                                    <Icon
                                        name='delete'
                                        color={colors.error + '80'}
                                        size={totalSize(2)}
                                    />
                                </Wrapper>
                                <Text isSmall isGray>$200.00</Text>
                                <Wrapper flexDirectionRow alignItemsCenter>
                                    <Text isSmall isGray>Qty: </Text>
                                    <>
                                        <IconPrimary
                                            iconName={'chevron-back'}
                                            iconType={'ionicon'}
                                        />
                                        <Wrapper marginHorizontalTiny>
                                            <Text isSmall isDarkGray>01</Text>
                                        </Wrapper>
                                        <IconPrimary
                                            iconName={'chevron-forward'}
                                            iconType={'ionicon'}
                                        />
                                    </>
                                </Wrapper>
                            </Wrapper>
                        </Wrapper>
                    )
                })
            }
        </>
    )
}