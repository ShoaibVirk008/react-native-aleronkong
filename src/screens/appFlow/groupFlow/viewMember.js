import moment from 'moment';
import React, { Component, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Cards, Headers, Wrapper, Text, Common, Loaders } from '../../../components';
import { Api, appStyles, colors, DummyData, HelpingMethods } from '../../../services';

export default function Index({ route }) {
    const tempUsers = DummyData.users.slice()
    const tempMembers = [...tempUsers, ...tempUsers, ...tempUsers, ...tempUsers]
    const groupData = route?.params?.data || null


    const [members, setMembers] = useState(null)

    useEffect(() => {
        handleGetMembers()
    }, [])


    const handleGetMembers = () => {
        Api.getGroupMembers({ groupId: groupData._id })
            .then(res => {
                if (res) {
                    setMembers(res.data)
                }
            })
    }
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'View Members'}
                showBackArrow
            />

            {
                members ?
                    members?.length ?
                        <Members
                            data={members}
                        />
                        :
                        <Common.NoDataViewPrimary
                            containerStyle={[appStyles.mainContainer, appStyles.center]}
                            iconName='addusergroup'
                            iconType='antdesign'
                            text='No Members Yet'
                        />
                    :
                    <Loaders.Boxes
                        size={totalSize(5)}
                    />
            }
        </Wrapper>
    )
}

const Members = ({ data }) => {
    return (
        <FlatList
            data={data}
            renderItem={({ item, index }) => {
                const { member,createdAt } = item
                const {firstName,lastName,avatar}=member
                const name=firstName+' '+lastName
                const image=avatar
                const date = moment(createdAt).fromNow()
                return (
                    <Cards.UserPrimary
                    key={index}
                        imageUri={image}
                        title={name}
                        subRowContainerStyle={[appStyles.alignItemsCenter]}
                        rowContainerStyle={[appStyles.alignItemsCenter]}
                        containerStyle={{ borderBottomWidth: 1, borderBottomColor: colors.appBgColor3 }}
                        imageSize={totalSize(3.5)}
                        titleStyle={[appStyles.textRegular]}
                        right={
                            <Text isSmall isLightGray>{date}</Text>
                        }
                    />
                )
            }}
        />
    )
}