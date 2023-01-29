import React, { Component, useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { colors, SearchBar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { Cards, Common, Headers, Icons, Lines, Loaders, Modals, Toasts, Wrapper } from '../../../components';
import { Api, appStyles, DummyData, Hooks, sizes } from '../../../services';
import { setCurrentUser } from '../../../services/store/actions';

export default function Index() {
    const tempAuthors = [...DummyData.users.slice(), ...DummyData.users.slice()]
    const { isModalVisible, toggleModal } = Hooks.UseModal()


    const [authors, setAuthors] = useState(null)
    const [packageIdToUnsubscribe, setPackageIdToUnsubscribe] = useState(null)
    const [loadingUnsubscribe, setLoadingUnsubscribe] = useState(false)

    const user = useSelector(state => state.user)
    const { currentUser } = user
    const { supportingPackages } = currentUser
    console.log('currentUser: ', currentUser)

    useEffect(() => {
        getAuthors()
    }, [])

    const getAuthors = async () => {
        Api.getAllAuthorsYouSupport().
            then(res => {
                if (res) {
                    setAuthors(res.data)
                } else {
                    setAuthors([])
                }
            })
    }


    const handleUnsubscribe = async () => {
        // console.log('packageIdToUnsubscribe: ',packageIdToUnsubscribe)
        // console.log('supportingPackages[0]: ',supportingPackages[0])
        setLoadingUnsubscribe(true)
        const subscibedPackageId = packageIdToUnsubscribe
        await Api.unsubscribePackage({ packageId: subscibedPackageId })
            .then(res => {
                if (res) {
                    let newAuthors = authors.filter(item => item._id != subscibedPackageId)
                    setAuthors(newAuthors)
                    let newSupportingPackages = currentUser.supportingPackages.filter(item => item._id != subscibedPackageId)
                    setCurrentUser({ ...currentUser, supportingPackages: newSupportingPackages })
                    toggleModal()
                    Toasts.Success('Package has been unsubscribed')
                }
            })
        setLoadingUnsubscribe(false)
    }
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'Authors You Support'}
                showBackArrow
            />

            {
                authors ?
                    authors?.length ?
                        <Authors
                            data={authors}
                            onPressCross={(item, index) => {
                                setPackageIdToUnsubscribe(item._id)
                                toggleModal()
                            }}
                        />
                        :
                        <Common.NoDataViewPrimary
                            containerStyle={[appStyles.mainContainer, appStyles.center]}
                            iconName='users'
                            iconType='font-awesome'
                            title='No Authors Yet'
                            text='You are supporting no authors'
                        //onPress={() => navigate(routes.AddSuppportPackage)}
                        />
                    :
                    <Loaders.Boxes
                        size={totalSize(5)}
                    />
            }
            <Modals.PopupPrimary
                visible={isModalVisible}
                disableSwipe
                toggle={toggleModal}
                title={'Are you sure you want to stop supporting this author?'}
                onPressButton1={toggleModal}
                onPressButton2={handleUnsubscribe}
                buttonText1='No'
                buttonText2={'Yes'}
                topMargin={height(75)}
                titleStyle={[appStyles.h6]}
                loadingButton2={loadingUnsubscribe}
            />
        </Wrapper>
    )
}

const Authors = ({ data, onPressCross }) => {

    return (
        <>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    const {creator,price}=item
                    const {firstName,lastName,avatar}=creator
                    const name=firstName+' '+lastName
                    return (
                        <Wrapper key={index}>
                            <Cards.UserPrimary
                                title={name}
                                imageUri={avatar}
                                imageSize={totalSize(4.25)}
                                subTitle={`$${price} per month`}
                                rowContainerStyle={[appStyles.alignItemsCenter]}
                                titleStyle={[appStyles.textRegular, appStyles.fontBold]}
                                subTitleStyle={[appStyles.textTiny, appStyles.textPrimaryColor, appStyles.fontBold]}
                                right={
                                    <Icons.Button
                                        iconName={'close'}
                                        buttonSize={sizes.iconButton.base}
                                        iconSize={sizes.icons.medium}
                                        buttonColor={colors.error + '20'}
                                        iconColor={colors.error}
                                        isRound
                                        onPress={() => onPressCross(item, index)}
                                    />
                                }
                            />
                            <Lines.Horizontal />
                        </Wrapper>
                    )
                }}
            />

        </>
    )
}
