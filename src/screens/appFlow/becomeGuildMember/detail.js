import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { Buttons, Common, Headers, ScrollViews, Spacer, Toasts, Wrapper } from '../../../components';
import { navigate } from '../../../navigation/rootNavigation';
import { Api, appImages, appStyles, routes } from '../../../services';
import { setCurrentUser } from '../../../services/store/actions';

export default function Index({ route, navigation }) {
    const { replace } = navigation
    const guildPackageData = route?.params?.data
    // const { title, image, amount, interval, description } = guildPackageData
    const { title, media, price, description } = guildPackageData
    const temp_description = 'Your awesomeness will be immortalized by honorable mention at the end of my latest book\n\n You also receive: \n1) A Mist Village T-Shirt \n2) A signed hardback copy of my first book \n3) A Mist Village Mafia Hoodie \n4) A signed Map of the River Peninsula! \n\n(Free Deliveries only inside the US) *Please PM me with your size *As always, all rewards come with lifelong appreciation'

    const [loadingJoin, setLoadingJoin] = useState(false)

    const currentUser = useSelector(state => state.user.currentUser)
    const { defaultPaymentMethod } = currentUser
    const cardNumber = defaultPaymentMethod?.card?.last4 ? '**** **** **** ' + defaultPaymentMethod?.card?.last4 : '**** **** **** 4464'

    // const handleSubscribe = async () => {
    //     setLoadingJoin(true)
    //     await Api.subscribePackage({ packageId: guildPackageData._id })
    //         .then(res => {
    //             if (res) {
    //                  setCurrentUser({ ...currentUser, guildPackage: guildPackageData })
    //                 replace(routes.becomeGuildMemberConfirmation, { data: guildPackageData })
    //                 // Toasts.Success('Package has been subscribed')
    //             }
    //         })
    //     setLoadingJoin(false)
    // }
    const handleSubscribe = async () => {
        if (defaultPaymentMethod) {
            setLoadingJoin(true)
            await Api.subscribePackage({ packageId: guildPackageData._id })
                .then(res => {
                    if (res) {
                        //const { _id, creator } = res.data
                        const newSubscribedPackage = res.data
                        const oldSubscribedPackages = currentUser?.supportingPackages || []
                        setCurrentUser({ 
                            ...currentUser,
                             supportingPackages: [...oldSubscribedPackages, newSubscribedPackage],
                             isGuildMember: true,
                            })
                        replace(routes.becomeGuildMemberConfirmation, { data: guildPackageData })
                       // Toasts.Success('Package has been subscribed')
                    }
                })
            setLoadingJoin(false)
        } else {
            Toasts.Error('Please add / select a payment method')
        }
    }
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'Become a Guild Member'}
                showBackArrow
            />
            <ScrollViews.WithKeyboardAvoidingView
                footer={
                    <Wrapper>
                        <Common.DefaultPaymentMethod/>
                        <Spacer isBasic />
                        <Wrapper marginHorizontalSmall>
                            <Buttons.Colored
                                text="Join"
                                shadow
                                onPress={handleSubscribe}
                                isLoading={loadingJoin}
                            // onPress={() => replace(routes.becomeGuildMemberConfirmation, { data: guildPackageData })}
                            />
                        </Wrapper>
                        <Spacer isDoubleBase />
                    </Wrapper>
                }
            >
                <Common.SupportPrimary
                    title={title}
                    image={media || appImages.noImageAvailable}
                    amount={price}
                    interval={'PER MONTH'}
                    description={description}
                    descriptionStyle={[appStyles.marginVerticalBase, appStyles.textMedium, appStyles.textColor3]}
                    style={[appStyles.marginHorizontalSmall]}
                // onPressJoin={onPressJoin?() => onPressJoin(item, index):null}
                // onPressEdit={onPressEdit?() => onPressEdit(item, index):null}
                // onPressSupport={onPressSupport?() => onPressSupport(item, index):null}
                // animation={index <= 5 && 'fadeInUp'}
                // duration={500 + (index * 100)}
                />
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}
