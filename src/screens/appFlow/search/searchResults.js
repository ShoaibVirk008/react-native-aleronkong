import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, View, } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { Icon, SearchBar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { ScrollViews, Spacer, TextInputs, Wrapper, Text, Lines, Icons, Common, Modals, Cards, Loaders } from '../../../components';
import { goBack, navigate } from '../../../navigation/rootNavigation';
import { Api, appImages, appStyles, async_consts, colors, DummyData, fontSize, HelpingMethods, routes, search_filter_options, search_sort_options, sizes } from '../../../services';
import { setCurrentUser } from '../../../services/store/actions';
const recent_searched = ['memory', 'positive thoughts', 'Catcher In The Eye']

export default function Index({ route }) {
    const searchPlaceholder = route?.params?.searchPlaceholder || ''

    const [recentSearches, setRecentSearches] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState(null)
    const [loadingSearch, setLoadingSearch] = useState(false)
    const [selectedResutlsTabIndex, selectResutlsTabIndex] = useState(null)
    const [selectedSortOption, selectSortOption] = useState(null)
    const [isSearching, setSearching] = useState(false)

    const searchInputRef = useRef(null)
    useEffect(() => {
        getSetData()
    }, [])

    useEffect(() => {
        if (selectedResutlsTabIndex === null) {

        } else if (selectedResutlsTabIndex >= 0) {
            handleSearch()
        }
    }, [selectedResutlsTabIndex, selectedSortOption])
    const getSetData = async () => {
        const asynRecentlySearched = await AsyncStorage.getItem(async_consts.recently_searched)
        if (asynRecentlySearched) {
            const parsedAsynRecentlySearched = JSON.parse(asynRecentlySearched)
            setRecentSearches(parsedAsynRecentlySearched)
        }
    }
    const handleSearch = async (query) => {

        if (query) {
            setSearchQuery(query)
        }
        const _query = query || searchQuery

        if (_query) {
            setSearching(true)
            setLoadingSearch(true)
            const recentSearchExist = recentSearches.find(item => item === _query)
            if (!recentSearchExist) {
                const newRecentSearches = [...recentSearches, _query]
                setRecentSearches(newRecentSearches)
                AsyncStorage.setItem(async_consts.recently_searched, JSON.stringify(newRecentSearches))
            }
            let searchParams = { query: _query }
            if (selectedResutlsTabIndex === 1) {
                searchParams['filter'] = search_filter_options.people
            } else if (selectedResutlsTabIndex === 2) {
                searchParams['filter'] = search_filter_options.group
            } else if (selectedResutlsTabIndex === 3 || selectedResutlsTabIndex === 4 || selectedResutlsTabIndex === 5) {
                searchParams['filter'] = search_filter_options.product
                const productCategory = selectedResutlsTabIndex === 3 ? '639045265a7d4cf7fd9e3b63' :
                    selectedResutlsTabIndex === 4 ? '639045325a7d4cf7fd9e3b66' :
                        selectedResutlsTabIndex === 5 ? '639045005a7d4cf7fd9e3b60' : ''
                searchParams['category'] = productCategory
            }
            if (selectedSortOption) {
                searchParams['sort'] = selectedSortOption
            }
            await Api.search(searchParams)
                .then(res => {
                    if (res) {
                        setSearchResults(res.data)
                    } else {

                    }
                })
            setLoadingSearch(false)
            // setTimeout(() => {
            //     // searchInputRef?.current?.blur()
            //     setSearchResults([])
            //     setLoadingSearch(false)
            // }, 2000);
        }
    }
    const handleDeleteRecentSearchItem = (item, index) => {
        const newRecentSearches = recentSearches.filter(ite => ite != item)
        setRecentSearches(newRecentSearches)
        AsyncStorage.setItem(async_consts.recently_searched, JSON.stringify(newRecentSearches))
    }
    const handleClearAllRecentSearches = (item, index) => {
        setRecentSearches([])
        AsyncStorage.removeItem(async_consts.recently_searched)
    }
    const handleCancelSearch = () => {
        setSearching(false)
        setSearchQuery('')
        setSearchResults(null)
        selectResutlsTabIndex(null)
        selectSortOption('default')
    }
    return (
        <Wrapper isMain>
            <Spacer isStatusBarHeigt />
            <TextInputs.SearchBar
                inputRef={searchInputRef}
                placeholder={searchPlaceholder||'Search audiobooks, comics, e-books'}
                inputStyle={{ fontSize: fontSize.regular }}
                iconNameLeft='chevron-left'
                iconSizeLeft={totalSize(3)}
                iconColorLeft={searchQuery ? colors.appTextColor1 : colors.appTextColor5}
                //autoFocus
                onPressIconLeft={!searchResults ? goBack : handleCancelSearch}
                value={searchQuery}
                onChangeText={(v) => setSearchQuery(v)}
                returnKeyType='search'
                onSubmitEditing={() => {
                    if (selectedResutlsTabIndex >= 0) {
                        handleSearch()
                    } else {
                        selectResutlsTabIndex(0)
                    }
                }}
                containerStyle={[appStyles.marginHorizontalSmall]}
                autoFocus
            />
            <Spacer isSmall />
            <Wrapper flex={1}>
                {
                    !isSearching ?
                        <RecentlySearched
                            data={recentSearches}
                            onPressItem={(item, index) => {
                                if (selectedResutlsTabIndex >= 0) {
                                    handleSearch(item)
                                } else {
                                    selectResutlsTabIndex(0)
                                }
                            }}
                            onPressClearAll={handleClearAllRecentSearches}
                            onPressDeleteItem={handleDeleteRecentSearchItem}

                        />
                        :
                        <Results
                            data={searchResults}
                            onChangeTopTab={(item, index) => { selectResutlsTabIndex(index) }}
                            onChangeSort={(item, index) => { item.value === 'default' ? selectSortOption(null) : selectSortOption(item.value) }}
                            isLoading={loadingSearch}
                        />
                }
                {/* <Loaders.BoxesAbsolute
                    isVisible={loadingSearch}
                /> */}
            </Wrapper>
        </Wrapper>
    )
}

const RecentlySearched = ({ data, onPressItem, onPressClearAll, onPressDeleteItem }) => {
    return (
        <Wrapper flex={1}>
            {
                data.length ?
                    <>
                        <Wrapper flexDirectionRow justifyContentSpaceBetween marginHorizontalBase marginVerticalSmall>
                            <Text isSmall isBoldFont isTextColor3>Recently Searched</Text>
                            <Text isSmall isBoldFont isPrimaryColor
                                onPress={onPressClearAll}
                            >Clear All</Text>
                        </Wrapper>
                        <Lines.Horizontal />
                        <ScrollViews.WithKeyboardAvoidingView>
                            {
                                data.map((item, index) => {
                                    return (
                                        <Pressable
                                        key={index}
                                            onPress={() => onPressItem(item, index)}
                                        >
                                            <Wrapper alignItemsCenter flexDirectionRow justifyContentSpaceBetween marginHorizontalBase marginVerticalSmall>
                                                <Text isRegular  >{item}</Text>
                                                <Icon
                                                    name={'close'}
                                                    color={colors.appTextColor5}
                                                    onPress={() => onPressDeleteItem(item, index)}
                                                />
                                            </Wrapper>
                                            <Lines.Horizontal />
                                        </Pressable>
                                    )
                                })
                            }
                        </ScrollViews.WithKeyboardAvoidingView>
                    </>
                    :
                    null
            }
        </Wrapper>
    )
}



const topTabs = [{ label: 'All Results' }, { label: 'People' }, { label: 'Group' }, { label: 'Audio Book' }, { label: 'Comics' }, { label: 'E-Books' },]
const sortOptions = [
    { label: 'Default', value: 'default' },
    { label: 'Name', value: 'name' },
    { label: 'Rating', value: 'rating' },
]
const Results = ({ data, onChangeTopTab, isLoading, onChangeSort }) => {

    const currentUser = useSelector(state => state.user.currentUser)
    const [selectedTopTabIndex, setTopTabIndex] = useState(0)
    const [isSortByModalVisible, setSortByModalVisible] = useState(false)
    const [selectedSortOption, setSelectedSortOption] = useState('default')
    const [loadingAddFriendIndex, setLoadingAddFriendIndex] = useState(null)

    const toggleSortByModal = () => setSortByModalVisible(!isSortByModalVisible)

    // const allResultsProducts = [
    //     {
    //         label: '34 AudioBooks',
    //         products: [...DummyData.audio_books.slice()],
    //     },
    //     {
    //         label: '24 Comics',
    //         products: [...DummyData.comics.slice()],
    //     },
    //     {
    //         label: '71 E-Books',
    //         products: [...DummyData.e_books.slice()],
    //     },
    // ]
    const allResultsProducts = selectedTopTabIndex === 0 ? data?.products || [] : []
    // const allResultsPeople = [...DummyData.users.slice(0, 3)]
    const allResultsPeople = selectedTopTabIndex === 0 ? data?.users || [] : []
    const allResultsPeopleCount = selectedTopTabIndex === 0 ? data?.users?.length || 0 : 0
    const allResultsGroups = selectedTopTabIndex === 0 ? data?.groups || [] : []
    const allResultsGroupsCount = selectedTopTabIndex === 0 ? data?.groups?.length || 0 : 0


    const isAudioBook = selectedTopTabIndex === 2
    const isComic = selectedTopTabIndex === 3
    const isEBook = selectedTopTabIndex === 4

    // const audioBooks = [...DummyData.audio_books.slice(), ...DummyData.audio_books.slice(), ...DummyData.audio_books.slice()]
    // const comics = [...DummyData.comics.slice(), ...DummyData.comics.slice(), ...DummyData.comics.slice()]
    // const eBooks = [...DummyData.e_books.slice(), ...DummyData.e_books.slice(), ...DummyData.e_books.slice()]

    //const peopleResults = [...DummyData.users.slice(), ...DummyData.users.slice(), ...DummyData.users.slice()]
    const peopleResults = selectedTopTabIndex === 1 ? data?.users || [] : []
    //const productsResults = isAudioBook ? audioBooks : isComic ? comics : isEBook ? eBooks : []
    const productsResults = selectedTopTabIndex === 3 || selectedTopTabIndex === 4 || selectedTopTabIndex === 5 ? data?.products || [] : []
    const groupResults = selectedTopTabIndex === 2 ? data?.groups || [] : []

    const totalResultsFound = data?.total || 0

    const handleAddFriend = async (user, index) => {
        setLoadingAddFriendIndex(index)
        await HelpingMethods.handleFriendUnfriendUser(user).
            then(res => {
                if (res) {
                    const { friends } = res.data
                    const newCurrentUser = { ...currentUser, friends }
                    setCurrentUser(newCurrentUser)
                }
            })
        setLoadingAddFriendIndex(null)
    }

    const TitlePrimary = ({ title, onPressRight }) => {
        return (
            <Wrapper flexDirectionRow justifyContentSpaceBetween marginHorizontalBase>
                <Text isTinyTitle isBoldFont>{title}</Text>
                {/* <Text isRegular isPrimaryColor isBoldFont>See All</Text> */}
            </Wrapper>
        )
    }
    return (
        <Wrapper flex={1}>
            <Common.ButtonsGroupPrimary
                data={topTabs}
                initalIndex={selectedTopTabIndex}
                onPressButton={(item, index) => {
                    setTopTabIndex(index)
                    onChangeTopTab && onChangeTopTab(item, index)
                }}
                activeTextStyle={[appStyles.textRegular, appStyles.textWhite]}
                inActiveTextStyle={[appStyles.textRegular, appStyles.textPrimaryColor]}
                inActiveButtonStyle={[{ borderRadius: sizes.cardRadius, backgroundColor: colors.transparent, borderWidth: 1, borderColor: colors.appColor1 }, appStyles.paddingHorizontalSmall, appStyles.paddingVerticalSmall]}
                activeButtonStyle={{ borderRadius: sizes.cardRadius }}
            />



            {
                !isLoading ?
                    <>
                        {
                            totalResultsFound ?
                                <Wrapper>
                                    <Wrapper flexDirectionRow justifyContentSpaceBetween marginHorizontalBase marginVerticalSmall>
                                        <Text isSmall isBoldFont isTextColor3>{totalResultsFound} result{totalResultsFound > 1 ? 's' : ''} found</Text>
                                        <Text isSmall isBoldFont isPrimaryColor
                                            onPress={toggleSortByModal}
                                        >Sort</Text>
                                    </Wrapper>
                                </Wrapper>
                                :
                                null
                        }
                        {
                            selectedTopTabIndex === 0 ?
                                allResultsPeople.length || allResultsGroups.length || allResultsProducts.length ?
                                    <ScrollViews.WithKeyboardAvoidingView>
                                        {
                                            allResultsPeople?.length ?
                                                <>
                                                    <TitlePrimary
                                                        title={allResultsPeopleCount + ' People'}
                                                    />
                                                    <Spacer isBasic />
                                                    <People
                                                        data={allResultsPeople}
                                                        onPressAddFriend={handleAddFriend}
                                                        loadingIndex={loadingAddFriendIndex}
                                                        onPressItem={(item, index) => navigate(routes.userDetail, { data: item })}
                                                    />
                                                </>
                                                :
                                                null
                                        }
                                        {
                                            allResultsGroups.length ?
                                                <>
                                                    <TitlePrimary
                                                        title={allResultsGroupsCount + ' Group'}
                                                    />
                                                    <Spacer isBasic />
                                                    <Common.GroupsPrimaryHorizontal
                                                        data={allResultsGroups}
                                                        onPressItem={(item, index) => navigate(routes.groupDetail, { data: item })}
                                                    />
                                                </>
                                                :
                                                null
                                        }
                                        {
                                            allResultsProducts.map((item, index) => {
                                                return (
                                                    <Wrapper key={index} marginVerticalBase>
                                                        <TitlePrimary
                                                            title={item?.category}
                                                        />
                                                        <Spacer isBasic />
                                                        <Common.ProductsPrimaryHorizontal
                                                            data={item?.products}
                                                            onPressItem={(item, index) => navigate(routes.digitalProductsFlow.productDetail, { data: item })}
                                                            imageStyle={[(index === 1 || index === 2) && { height: height(22.5) }]}
                                                        />
                                                    </Wrapper>
                                                )
                                            })
                                        }

                                    </ScrollViews.WithKeyboardAvoidingView>
                                    :
                                    <Common.NoDataViewPrimary
                                        containerStyle={[appStyles.mainContainer, appStyles.center]}
                                        text='No Results Found'
                                    />
                                :
                                selectedTopTabIndex === 1 ?
                                    peopleResults?.length ?
                                        <ScrollViews.WithKeyboardAvoidingView>
                                            <People
                                                data={peopleResults}
                                                onPressAddFriend={handleAddFriend}
                                                loadingIndex={loadingAddFriendIndex}
                                                onPressItem={(item, index) => navigate(routes.userDetail, { data: item })}
                                            />
                                        </ScrollViews.WithKeyboardAvoidingView>
                                        :
                                        <Common.NoDataViewPrimary
                                            containerStyle={[appStyles.mainContainer, appStyles.center]}
                                            text='No People Found'
                                        />
                                    :
                                    selectedTopTabIndex === 2 ?
                                        groupResults.length ?
                                            <Common.GroupsPrimaryVertical
                                                data={groupResults}
                                                onPressItem={(item, index) => navigate(routes.groupDetail, { data: item })}
                                            />
                                            :
                                            <Common.NoDataViewPrimary
                                                containerStyle={[appStyles.mainContainer, appStyles.center]}
                                                text='No Groups Found'
                                            />
                                        :
                                        (selectedTopTabIndex === 3 || selectedTopTabIndex === 4 || selectedTopTabIndex === 5) ?
                                            productsResults?.length ?
                                                <Common.ProductsPrimaryVertical2
                                                    data={productsResults}
                                                    onPressItem={(item, index) => navigate(routes.digitalProductsFlow.productDetail, { data: item, })}
                                                    imageStyle={[(isComic || isEBook) && { height: height(27.5) }]}
                                                    ListHeaderComponent={<></>}
                                                />
                                                :
                                                <Common.NoDataViewPrimary
                                                    containerStyle={[appStyles.mainContainer, appStyles.center]}
                                                    text='No Products Found'
                                                />
                                            :

                                            null
                        }
                    </>
                    :
                    <Loaders.Boxes
                        size={totalSize(7)}
                    />


            }
            <Modals.PickerPopup
                visible={isSortByModalVisible}
                toggle={toggleSortByModal}
                data={sortOptions}
                textKey={'label'}
                onPressItem={(item, index) => {
                    setSelectedSortOption(item.value)
                    onChangeSort && onChangeSort(item, index)
                    toggleSortByModal()
                    //toggleReportPopup()
                }}
                isSelected={(item, index) => {
                    return selectedSortOption === item.value
                }}
                topMargin={height(50)}
                selectionIndicator={'radio'}
                headerTitle={`Sort by`}
                headerTitleStyle={[appStyles.h6]}
            //buttonText1='Done'
            // onPressButton1={() => {
            //     toggleSortByModal()
            // }}
            >

            </Modals.PickerPopup>
        </Wrapper>
    )
}

const People = ({ data, onPressItem, onPressAddFriend, loadingIndex }) => {
    return (
        <Wrapper>
            {
                data.map((item, index) => {
                    const { _id, avatar, firstName, lastName, friends } = item
                    const name = firstName + ' ' + lastName
                    const image = avatar || appImages.noUser
                    //const is_friend = index === 0
                    const is_friend = HelpingMethods.isUserFriend(_id)
                    const mutual_friends = friends ? HelpingMethods.findMutualFriends(friends) : []
                    const mutual_friends_count = mutual_friends?.length || 0
                    mutual_friends_count && console.log('mutual_friends_count: ', mutual_friends_count)
                    const is_loading = loadingIndex === index
                    return (
                        <Wrapper key={index}>
                            <Cards.UserPrimary
                                onPress={() => onPressItem(item, index)}
                                imageUri={image}
                                title={name}
                                subTitle={mutual_friends_count + ' mutual friends'}
                                titleStyle={[appStyles.textRegular, appStyles.fontBold, appStyles.textColor2]}
                                subTitleStyle={[appStyles.textTiny, appStyles.textLightGray]}
                                rowContainerStyle={[appStyles.alignItemsCenter]}
                                subRowContainerStyle={[appStyles.alignItemsCenter]}
                                imageSize={totalSize(4.25)}
                                right={
                                    !is_loading ?
                                        <Icons.Button
                                            iconName={is_friend ? 'user-check' : 'user-plus'}
                                            iconType='feather'
                                            buttonColor={is_friend ? colors.appColor1 : colors.appColor1 + '20'}
                                            isRound
                                            iconColor={is_friend ? colors.appTextColor6 : colors.appColor1}
                                            buttonSize={totalSize(3.5)}
                                            iconSize={totalSize(1.75)}
                                            onPress={() => onPressAddFriend(item, index)}

                                        />
                                        :
                                        <ActivityIndicator
                                            size={(totalSize(3.5))}
                                            color={colors.appBgColor4}
                                        />
                                }
                            />
                        </Wrapper>
                    )
                })
            }
        </Wrapper>
    )
}