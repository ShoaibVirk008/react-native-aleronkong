import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Headers, Icons, Spacer, TextInputs, Wrapper } from '../../../../components';
import { appPdfs, appStyles, colors, product_categories, product_categories_labels, routes } from '../../../../services';
import Pdf from 'react-native-pdf';
import { goBack, navigate } from '../../../../navigation/rootNavigation';

const comic_episodes = ['Episode 1', 'Episode 2', 'Episode 3', 'Episode 4', 'Episode 5',]
const ebook_chapters = ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5',]
export default function Index({ navigation, route }) {
    const productData = route?.params?.data || null
    const { media, category, file, title, description, price,
        asin, publicationDate, language, fileSize,
        textToSpeech, enhancedTypeSetting, xRay, wordWise,
        printLength, lending, simultaneousDeviceUsage
    } = productData
    const isAudioBook = category.title === product_categories_labels.AudioBook
    const isComic = category.title === product_categories_labels.Comic
    const isEBook = category.title === product_categories_labels.Ebook

    const [selectedIndex, setIndex] = useState(0)
    const [isSearching, setSearching] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    return (
        <Wrapper isMain>
            <Headers.Primary
                showBackArrow
                alignTitleLeft
                onBackPress={!isSearching ? goBack : () => setSearching(false)}
                //title={isComic ? 'Episdoe 1 of 24' : 'Pages 1 / 236'}
                //title={isComic ? 'Episdoe 1 of 24' : (currentPage + '/' + totalPages)}
                title={ (currentPage + '/' + totalPages)}
                titleStyle={[appStyles.textMedium, appStyles.textColor2]}
                rightContainerStyle={{ flex: 0 }}
                leftContainerStyle={{ flex: 0 }}
                titleContainerStyle={[!isSearching ? appStyles.paddingHorizontalSmall : { alignItems: 'stretch', }]}
                headerTitle={
                    isSearching ?
                        <Wrapper >
                            <TextInputs.Colored
                                placeholder={'Search'}
                                value={searchQuery}
                                onChangeText={(v) => setSearchQuery(v)}
                                inputStyle={{ height: height(5) }}
                                containerStyle={[{ marginLeft: 0 }]}
                                iconNameRight={searchQuery ? 'close' : ''}
                                onPressIconRight={() => setSearchQuery('')}
                            />
                        </Wrapper>
                        :
                        null
                }
                right={
                    !isSearching ?
                        <Wrapper marginHorizontalBase flexDirectionRow>
                            {/* <HeaderButton
                                iconName={'list'}
                                iconType='feather'
                                onPress={() => navigate(
                                    routes.digitalProductsFlow.readBookMenu,
                                    {
                                        data: isComic ? comic_episodes : ebook_chapters,
                                        dataIndex: selectedIndex,
                                        onPressDataItem: (item, index) => setIndex(index)
                                    }
                                )}
                            /> */}
                            {/* {
                                isEBook ?
                                    <>
                                        <Spacer isBasic horizontal />
                                        <HeaderButton
                                            iconName={'format-font-size-increase'}
                                            iconType='material-community'
                                            onPress={() => { }}
                                        />
                                        <Spacer isBasic horizontal />
                                        <HeaderButton
                                            iconName={'format-font-size-decrease'}
                                            iconType='material-community'
                                            onPress={() => { }}
                                        />
                                        <Spacer isBasic horizontal />
                                        <HeaderButton
                                            iconName={'search'}
                                            iconType='material'
                                            onPress={() => setSearching(true)}
                                        />
                                    </>
                                    :
                                    null
                            } */}
                        </Wrapper>
                        :
                        null
                }
            />
            <Wrapper flex={1}>
                <Pdf
                    source={{ uri: file }}
                    // source={{ uri: isComic ? appPdfs.comic_1 : appPdfs.ebook_1 }}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                        setTotalPages(numberOfPages)
                    }}
                    trustAllCerts={false}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`Current page: ${page}`);
                        setCurrentPage(page)
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={{
                        flex: 1,
                        // height:'100%',
                        // width:'100%'
                    }}
                //scale={2}
                />
            </Wrapper>
        </Wrapper>
    )
}


const HeaderButton = ({ ...props }) => {
    return (
        <Icons.Button
            buttonSize={totalSize(3)}
            iconSize={totalSize(2.5)}
            iconColor={colors.appTextColor1}
            {...props}
        />
    )
}