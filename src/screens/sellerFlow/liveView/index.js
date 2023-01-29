import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import { Lines, Wrapper, Text, Spacer, Common, Cards, Images, ScrollViews, Icons } from '../../../components';
import MapView, {
    PROVIDER_GOOGLE,
    Marker,
    Circle,
    Callout,
} from "react-native-maps";
import { height, totalSize, width } from 'react-native-dimension';
import { appStyles, colors, DummyData, MapStyles, sizes } from '../../../services';
import ProgressBar from 'react-native-progress/Bar';

const delta = 0.9;
const ASPECT_RATIO = width(100) / height(100);
const locationDelta = {
    latitudeDelta: delta,
    longitudeDelta: delta * ASPECT_RATIO,
};

export default function Index() {
    const defaultMarker = {
        title: "Your Location",
        cooards: {
            latitude: 51.5359,
            longitude: 0.1236,
        },
    };
    const reports = [
        {
            label: 'Visitors right now',
            value: '480',
            progress: 0.4,
            progress_color: '#FFE358'
        },
        {
            label: 'Total Sales',
            value: '$20',
            progress: 0.2,
            progress_color: '#FF3333'
        },
        {
            label: 'Total Sessions',
            value: '100',
            progress: 0.6,
            progress_color: '#0FBF1B'
        },
        {
            label: 'Total Orders',
            value: '20',
            progress: 0.5,
            progress_color: '#FF3333'
        }
    ]
    const top_products = DummyData.products_seller.slice()
    const top_locations = [
        { label: 'Location 1', info: '25 April 2022 at 11:00 pm GMT+5' },
        { label: 'Location 2', info: '25 April 2022 at 11:00 pm GMT+5' },
        { label: 'Location 3', info: '25 April 2022 at 11:00 pm GMT+5' }
    ]
    const top_customers = DummyData.users.slice()
    return (
        <Wrapper isMain style={{ backgroundColor: colors.appColor9 }}>
            <ScrollViews.WithKeyboardAvoidingView>
                <Wrapper flexDirectionRow paddingVerticalSmall marginHorizontalBase >
                    <Wrapper flex={5.5} justifyContentCenter>
                        <Text isRegular isMediumFont isWhite>John Doe</Text>
                        <Spacer isTiny />
                        <Text isTiny isLightGray>25 April 2022 at 11:00 pm GMT+5</Text>
                    </Wrapper>
                    <Lines.Vertical />
                    <Wrapper flex={4.5} alignItemsCenter>
                        <Text isRegular isWhite>Visitors Right Now</Text>
                        <Spacer isTiny />
                        <Text isLargeTitle isMediumFont style={{ color: colors.appColor10 }}>480</Text>
                    </Wrapper>
                </Wrapper>
                <Wrapper style={{ height: height(25) }}>
                    <MapView
                        //ref={mapRef}
                        style={{ ...StyleSheet.absoluteFillObject }}
                        // clusterColor={colors.appColor1}
                        // provider = { MapView.PROVIDER_GOOGLE }
                        customMapStyle={MapStyles.primary}
                        initialRegion={{
                            ...defaultMarker.cooards,
                            ...locationDelta,
                        }}
                    // showsUserLocation={true}
                    >
                        <Marker
                            coordinate={{
                                ...defaultMarker.cooards,
                            }}
                        >
                            <Icon
                                name='map-marker'
                                type='material-community'
                                size={totalSize(2.5)}
                                color={colors.error}
                            />
                        </Marker>

                    </MapView>
                </Wrapper>
                <Wrapper marginHorizontalBase flexDirectionRow justifyContentSpaceBetween style={{ flexWrap: 'wrap', }}>
                    {
                        reports.map((item, index) => {
                            const { label, value, progress, progress_color } = item
                            return (
                                <Wrapper key={index} marginVerticalBase>
                                    <Text isSmall isLightGray>{label}</Text>
                                    <Spacer isTiny />
                                    <Text isMedium isWhite>{value}</Text>
                                    <Spacer isSmall />
                                    <ProgressBar
                                        progress={progress}
                                        width={width(35)}
                                        borderWidth={0}
                                        color={progress_color}
                                        unfilledColor={colors.appBgColor4}
                                    />
                                </Wrapper>
                            )
                        })
                    }
                </Wrapper>
                <Spacer isBasic />
                <TopProduct
                    data={top_products}
                />
                <Spacer isBasic />
                <Spacer isBasic />
                <TopLocations
                    data={top_locations}
                />
                <Spacer isBasic />
                <Spacer isBasic />
                <TopCustomers
                    data={top_customers}
                />
                <Spacer isBasic />
                <Spacer isBasic />
                <BottomCards
                    activeCarts={'12'}
                    checkingOut={'10'}
                    purchased='35'
                />
                <Spacer isBasic />
                <Spacer isBasic />
            </ScrollViews.WithKeyboardAvoidingView>
        </Wrapper>
    )
}

const CardPrimary = ({ title, children }) => {
    return (
        <Common.WrapperColoredShadow
            containerStyle={{
                backgroundColor: colors.appColor9,
                ...appStyles.shadow,
                shadowColor: colors.appBgColor1
            }}>
            <Text isRegular isMediumFont isWhite>{title}</Text>
            <Spacer isSmall />
            {children}
        </Common.WrapperColoredShadow>
    )
}
const UserCard = ({ ...props }) => {
    return (
        <Cards.UserPrimary
            //imageUri={image}
            //imageSize={totalSize(5.5)}
            // image={
            //     <Images.SqareRound
            //         source={{ uri: image }}
            //     />
            // }
            //title={label}
            //subTitle='40 Sold | 32 Customers'
            titleStyle={[appStyles.textRegular, appStyles.textWhite]}
            subTitleStyle={[appStyles.textTiny, appStyles.textLightGray]}
            imageStyle={{ borderRadius: 5 }}
            containerStyle={[appStyles.paddingHorizontalZero, {}]}
            subRowContainerStyle={[appStyles.alignItemsCenter]}
            {...props}
        />
    )
}
const TopProduct = ({ data }) => {
    return (
        <CardPrimary
            title={'Top Products'}
        >
            {
                data.map((item, index) => {
                    const { image, label } = item
                    return (
                        <UserCard
                        key={index}
                            imageUri={image}
                            imageSize={totalSize(5.5)}
                            title={label}
                            subTitle='40 Sold | 32 Customers'
                        />
                    )
                })
            }
        </CardPrimary>
    )
}
const TopLocations = ({ data }) => {
    return (
        <CardPrimary
            title={'Top Locations'}
        >
            {
                data.map((item, index) => {
                    const { label, info } = item
                    return (
                        <UserCard
                        key={index}
                            image={
                                <Icons.Button
                                    iconName='map-marker'
                                    iconType='material-community'
                                    isRound
                                    buttonColor={colors.appBgColor1 + '20'}
                                    iconColor={colors.appBgColor4}
                                    iconSize={totalSize(2.5)}
                                    buttonStyle={[{ marginRight: sizes.marginHorizontal / 2 }]}
                                />
                            }
                            title={label}
                            subTitle={info}
                        />
                    )
                })
            }
        </CardPrimary>
    )
}
const TopCustomers = ({ data }) => {
    return (
        <CardPrimary
            title={'Top Customers'}
        >
            {
                data.map((item, index) => {
                    const { name, email } = item
                    return (
                        <UserCard
                        key={index}
                            image={
                                <Icons.Button
                                    iconName='person'
                                    iconType='ionicon'
                                    isRound
                                    buttonColor={colors.appBgColor1 + '20'}
                                    iconColor={colors.appColor9}
                                    iconSize={totalSize(3)}
                                    buttonStyle={[{ marginRight: sizes.marginHorizontal / 2 }]}
                                />
                            }
                            title={name}
                            subTitle={`name@gmail.com | +123 456 789`}
                        />
                    )
                })
            }
        </CardPrimary>
    )
}
const BottomCards = ({ activeCarts, checkingOut, purchased }) => {
    const options = [
        { label: 'Active Carts', value: activeCarts },
        { label: 'Checking Out', value: checkingOut },
        { label: 'Purchased', value: purchased }
    ]
    return (
        <Wrapper flexDirectionRow marginHorizontalSmall >
            {
                options.map((item, index) => {
                    const { label, value } = item
                    return (
                        <Wrapper key={index} flex={1} >
                            <Common.WrapperColoredShadow
                                //marginHorizontalTiny
                                marginHorizontalSmall
                                paddingHorizontalSmall
                                containerStyle={{
                                    backgroundColor: colors.appColor9,
                                    ...appStyles.shadow,
                                    shadowColor: colors.appBgColor1
                                }}>
                                <Text isSmallTitle isMediumFont isWhite alignTextCenter>{value}</Text>
                                <Spacer isSmall />
                                <Text isTiny isLightGray alignTextCenter>{label}</Text>
                            </Common.WrapperColoredShadow>
                        </Wrapper>
                    )
                })
            }
        </Wrapper>
    )
}