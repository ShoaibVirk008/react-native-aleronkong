import React, { Component, useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Cards, Headers, Wrapper, Text, Buttons, Spacer, Common, Loaders } from '../../../components';
import { Api, appStyles, colors, DummyData } from '../../../services';

export default function Index({ route }) {
    const groupData = route?.params?.data

    //const tempUsers = DummyData.users.slice()
    //const tempMemberRequests = [...tempUsers]

    const [memberRequests, setMemberRequests] = useState(null)
    const [loadingRespondIndex, setLoadingRespondIndex] = useState(null)

    useEffect(() => {
        handleGetMemberRequests()
    }, [])


    const handleGetMemberRequests = () => {
        Api.getGroupJoinRequests({ groupId: groupData._id })
            .then(res => {
                if (res) {
                    setMemberRequests(res.data)
                }
            })
    }

    const handleApproveDisapproveRequest = async ({ item, index, approve }) => {
        setLoadingRespondIndex(index)
        await Api.approveRejectGroupJoinRequest({
            groupId: groupData._id,
            userId: item._id,
            isApproved: approve
        })
            .then(res => {
                if (res) {
                    const newMemberRequests = memberRequests.filter(ite => ite != item)
                    setMemberRequests(newMemberRequests)
                }
            })
        setLoadingRespondIndex(false)
    }
    return (
        <Wrapper isMain>
            <Headers.Primary
                title={'Member Requests'}
                showBackArrow
            />

            {
                memberRequests ?
                    memberRequests?.length ?
                        <MemberRequests
                            data={memberRequests}
                            onPressApprove={(item, index) => { handleApproveDisapproveRequest({ item, index, approve: true }) }}
                            onPressDisapprove={(item, index) => { handleApproveDisapproveRequest({ item, index, approve: false }) }}
                            loadingIndex={loadingRespondIndex}
                        />
                        :
                        <Common.NoDataViewPrimary
                            containerStyle={[appStyles.mainContainer, appStyles.center]}
                            iconName='addusergroup'
                            iconType='antdesign'
                            text='No Join Requests Yet'
                        />
                    :
                    <Loaders.Boxes
                        size={totalSize(5)}
                    />
            }
        </Wrapper>
    )
}

const MemberRequests = ({ data, onPressApprove, onPressDisapprove, loadingIndex, }) => {
    return (
        <FlatList
            data={data}
            renderItem={({ item, index }) => {
                const { firstName, lastName, avatar } = item
                const name = firstName + ' ' + lastName
                const image = avatar
                const is_loading = loadingIndex === index
                return (
                    <Cards.UserPrimary
                    key={index}
                        imageUri={image}
                        title={name}
                        //subRowContainerStyle={[appStyles.alignItemsCenter]}
                        rowContainerStyle={[appStyles.alignItemsCenter]}
                        containerStyle={{ borderBottomWidth: 1, borderBottomColor: colors.appBgColor3 }}
                        imageSize={totalSize(3.5)}
                        titleStyle={[appStyles.textRegular]}
                        subTitle='Follows you'
                        subTitleStyle={[appStyles.textSmall, appStyles.textLightGray]}
                        rightBottom={
                            !is_loading ?
                                <>
                                    <Wrapper alignItemsFlexStart>
                                        <Spacer isSmall />
                                        <Wrapper flexDirectionRow alignItemsCenter>
                                            <Buttons.ColoredSmall
                                                text={'Approve'}
                                                textStyle={[appStyles.textSmall, appStyles.textWhite]}
                                                buttonStyle={[appStyles.paddingHorizontalMedium]}
                                                onPress={() => onPressApprove(item, index)}
                                            />
                                            <Spacer isSmall horizontal />
                                            <Buttons.ColoredSmall
                                                text={'Disapprove'}
                                                textStyle={[appStyles.textSmall]}
                                                buttonStyle={[appStyles.paddingHorizontalMedium, { backgroundColor: colors.appBgColor2 }]}
                                                onPress={() => onPressDisapprove(item, index)}
                                            />
                                        </Wrapper>
                                    </Wrapper>
                                </>
                                :
                                <ActivityIndicator
                                    size={totalSize(3)}
                                    color={colors.appTextColor4}
                                />
                        }
                    />
                )
            }}
        />
    )
}