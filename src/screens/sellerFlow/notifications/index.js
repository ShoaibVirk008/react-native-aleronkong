import React, { Component } from 'react';
import { View, } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { Icon, SearchBar } from 'react-native-elements';
import { ScrollViews, Spacer, Wrapper, Text, Buttons, Common, CheckBoxes, Lines } from '../../../components';
import { navigate } from '../../../navigation/rootNavigation';
import { appStyles, colors, routes, sizes } from '../../../services';

export default function Index() {
    const options = [
        {
            title: 'Orders',
            sub_options: [
                { label: 'Order Confirmation', info: 'Sent automatically to the customer after they place their order.' },
                { label: 'Order edited', info: 'Sent to the customer after their order is edited (if you select this option).' },
                { label: 'Order invoice', info: 'Sent to the customer when the order has an outstanding balance.' },
                { label: 'Order cancelled', info: 'Sent automatically to the customer if their order is canceled (if you select this option).' },
                { label: 'Order refund', info: 'Sent automatically to the customer if their order is refunded (if you select this option).' },
                { label: 'Draft order invoice', info: 'Sent to the customer when a draft order invoice is created. You can edit this email invoice before you send it.' },
                { label: 'Abandoned POS checkout', info: 'Sent to the customer when you email their cart from POS. Includes a link to buy online.' },
                { label: 'Abandoned checkout', info: 'Sent to the customer if they leave checkout before they buy the items in their cart.' },
                { label: 'POS exchange receipt', info: 'Sent to the customer after they complete an exchange in person and want to be emailed a receipt.' },
                { label: 'Gift card created', info: 'Sent automatically to the customer when you issue or fulfill a gift card.' },
                { label: 'Payment error', info: "Sent automatically to the customer if their payment can't be processed during checkout." },
                { label: 'Pending payment error', info: "Sent automatically to the customer if their pending payment can't be processed after they have checked out." },
                { label: 'Pending payment success', info: 'Sent automatically to customer when pending payment is successfully processed after they have checkout.' },
            ]
        },
        {
            title: 'Shipping',
            sub_options: [
                { label: 'Fulfillment request', info: 'Sent automatically to a third-party fulfillment service provider when order items are fulfilled.' },
                { label: 'Shipping confirmation', info: 'Sent automatically to the customer when their order is fulfilled (if you select this option).' },
                { label: 'Shipping update', info: "Sent automatically to the customer if their fulfilled order's tracking number is updated (if you select this option)." },
                { label: 'Out for delivery', info: 'Sent to the customer automatically after orders with tracking information are out for delivery.' },
                { label: 'Delivered', info: 'Sent to the customer automatically after orders with tracking information are delivered.' },
            ]
        },
        {
            title: 'Local delivery',
            sub_options: [
                { label: 'Local order out for delivery', info: 'Sent to the customer when their local order is out for deliverv.' },
                { label: 'Local order delivered', info: 'Sent to the customer when their local order is delivered.' },
                { label: 'Local order missed delivery', info: "Sent to the customer when they miss a local delivery." },
            ]
        },
        {
            title: 'Local pickup',
            sub_options: [
                { label: 'Ready for pickup', info: 'Sent to the customer manually through Point of Sale or admin. Let the customer know their order is ready to be picked up.' },
                { label: 'Picked up', info: 'Sent to the customer when the order is marked as picked up.' },
            ]
        },
        {
            title: 'Customer',
            sub_options: [
                { label: 'Customer account invite', info: 'Sent to the customer with account activation instructions. You can edit this email before you send it.' },
                { label: 'Customer account welcome', info: 'Sent automatically to the customer when they complete their account activation.' },
                { label: 'Customer account password reset', info: 'Sent automatically to the customer when they ask to reset their accounts password.' },
                { label: 'Contact customer', info: 'Sent to the customer when you contact them from the orders or customers page. You can edit this email before you send it.' },
            ]
        },
        {
            title: 'Email marketing',
            sub_options: [
                { label: 'Customer marketing confirmation', info: 'Sent to the customer automatically when they sign up for email marketing (if email double opt-in is enabled).' },
            ]
        },
        {
            title: 'Returns',
            sub_options: [
                { label: 'Return instructions', info: 'Sent automatically to the customer when you create a return. Includes instructions as well as a return label, i applicable.' },
                { label: 'Return label', info: 'Sent to the customer after creating a return label.' },
            ]
        }
    ]
    const shopifyEmailChecks = [
        {
            label: 'Optimize open tracking (recommended)',
            info: 'Choose this option to balance tracking email open rates with maintaining your sender reputation.',
            is_checked: true
        },
        {
            label: 'Ask for consent',
            info: 'By default, email opens will not be tracked. Subscribers will be able to opt-in to tracking through the footer of your emails. Your open rate will be reported based on subscribers who opt-in, combined with overall engagement',
            is_checked: false
        },
        {
            label: 'Do not track',
            info: 'Your email open rate will not be reported. You will still be able to see other metrics, such as the number of clicks from subscribers in your emails.',
            is_checked: false
        },
        {
            label: 'Tracks all email opens',
            info: 'See how many subscribers open your emails. This will provide the most accurate reporting on open behavior.',
            is_checked: false
        }
    ]
    return (
        <Wrapper isMain>
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer isBasic />
                <Spacer isTiny />
                <Wrapper marginHorizontalBase>
                    <Text isRegular isMediumFont>Customize Email Templates</Text>
                    <Spacer isSmall />
                    <Text isSmall isLightGray>Change the look and feel of email notifications your customers receive. Add your logo and color theme.</Text>
                </Wrapper>
                <Spacer isBasic />
                <Buttons.BorderedSecondary
                    text='Customize'
                />
                <Spacer isBasic />
                {
                    options.map((item, index) => {
                        const { title, sub_options } = item
                        return (
                            <Wrapper key={index} style={[{ marginTop: sizes.marginVertical / 2 }]}>
                                <Wrapper marginHorizontalBase>
                                    <Text isRegular isMediumFont>{title}</Text>
                                </Wrapper>
                                <Spacer isBasic />
                                {
                                    sub_options.map((item, index) => {
                                        const { label, info } = item
                                        return (
                                            <Common.WrapperColoredBorderedShadow key={index} containerStyle={[{ marginBottom: sizes.marginVertical },]}>
                                                <Wrapper flexDirectionRow alignItemsCenter justifyContentSpaceBetween>
                                                    <Text isSmall isMediumFont>{label}</Text>
                                                    <Text isTiny isPrimaryColor isUnderlined
                                                        onPress={() => {
                                                            navigate(routes.seller.notificationsTemplate, { headerTitle: label })
                                                        }}
                                                    >Edit</Text>
                                                </Wrapper>
                                                <Spacer isSmall />
                                                <Text isSmall isGray>{info}</Text>
                                            </Common.WrapperColoredBorderedShadow>
                                        )
                                    })
                                }
                            </Wrapper>
                        )
                    })
                }
                <Spacer isBasic />
                <Wrapper>
                    <Wrapper marginHorizontalBase>
                        <Text isRegular isMediumFont>Marketing</Text>
                    </Wrapper>
                    <Spacer isBasic />
                    <Common.WrapperColoredShadow containerStyle={[{ paddingBottom: 0 }, appStyles.shadowExtraLight]}>
                        <Text isSmall>Require customers to confirm their:</Text>
                        <Spacer isSmall />
                        <CheckBoxes.Square
                            checked={true}
                            text='Email Subscription'
                        />
                        <Spacer isSmall />
                        <CheckBoxes.Square
                            checked={false}
                            text='SMS Subscription'
                        />
                        <Spacer isSmall />
                        <Wrapper isBorderedWrapper background2 style={{ marginHorizontal: -sizes.marginHorizontal / 1.25, borderRadius: 5, borderTopRightRadius: 0, borderTopLeftRadius: 0 }}>
                            <Text isTiny isGray>Customers who sign up will receive a confirmation message to validate their subscription. Previous subscribers will not be affected.</Text>
                        </Wrapper>
                    </Common.WrapperColoredShadow>
                </Wrapper>

                <Spacer isBasic />
                <Spacer isSmall />

                <Wrapper>
                    <Wrapper marginHorizontalBase>
                        <Text isRegular isMediumFont>Shopify Email open tracking</Text>
                    </Wrapper>
                    <Spacer isBasic />
                    <Common.WrapperColoredShadow containerStyle={[appStyles.shadowExtraLight]}>
                        <Text isTiny isGray>Open tracking allows you to see how many emails are opened.</Text>
                        <Spacer isSmall />
                        {
                            shopifyEmailChecks.map((item, index) => {
                                const { label, info, is_checked } = item
                                return (
                                    <CheckBoxes.Secondary
                                    key={index}
                                        checked={is_checked}
                                        title={label}
                                        text={info}
                                        containerStyle={[appStyles.alignItemsFlexStart, { marginTop: sizes.marginVertical / 1.5 }]}
                                        titleStyle={[appStyles.textSmall]}
                                        textStyle={[appStyles.textTiny, appStyles.textGray]}
                                        textContainerStyle={{ flex: 1 }}
                                    />
                                )
                            })
                        }
                    </Common.WrapperColoredShadow>
                </Wrapper>

                <Spacer isBasic />
                <Spacer isSmall />

                <Wrapper>
                    <Wrapper marginHorizontalBase>
                        <Text isRegular isMediumFont>Staff order notifications</Text>
                    </Wrapper>
                    <Spacer isBasic />
                    <Common.WrapperColoredShadow containerStyle={[appStyles.shadowExtraLight]}>
                        <Text isTiny isGray>Choose how you want to be notified. when a new order comes in or add other recipients.</Text>
                        <Spacer isSmall />
                        <Buttons.BorderedSecondary
                            text='Add recipient'
                            buttonStyle={[appStyles.marginHorizontalZero]}
                        />
                    </Common.WrapperColoredShadow>
                </Wrapper>

                <Spacer isBasic />
                <Spacer isSmall />

                <Wrapper>
                    <Wrapper marginHorizontalBase>
                        <Text isRegular isMediumFont>Recipients</Text>
                    </Wrapper>
                    <Spacer isBasic />
                    <Common.WrapperColoredShadow containerStyle={[{ paddingBottom: 0 }, appStyles.shadowExtraLight]}>
                        <Wrapper flexDirectionRow alignItemsCenter>
                            <Wrapper flex={1}>
                                <Text isTiny isGray>
                                    {`Send email to "Halena John" `}
                                    <Text isTextColor3>{`<halenajohn7@gmail.com>`}</Text>
                                </Text>
                            </Wrapper>
                            <Icon
                                name='delete'
                                color={colors.error2}
                                size={totalSize(1.75)}
                            />
                        </Wrapper>
                        <Spacer isSmall />
                        <Wrapper isBorderedWrapper alignItemsFlexEnd paddingVerticalSmall background2 style={{ marginHorizontal: -sizes.marginHorizontal / 1.25, borderRadius: 5, borderTopRightRadius: 0, borderTopLeftRadius: 0 }}>
                            <Wrapper flexDirectionRow alignItemsCenter>
                                <Text isTiny isPrimaryColor isUnderlined>Send test notification</Text>
                                <Lines.Vertical
                                    height={height(2)}
                                    style={[appStyles.marginHorizontalSmall]}
                                />
                                <Text isTiny isPrimaryColor isUnderlined>Disable</Text>
                            </Wrapper>
                        </Wrapper>
                    </Common.WrapperColoredShadow>
                </Wrapper>
                <Spacer isDoubleBase />
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}
