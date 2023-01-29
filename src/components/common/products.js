import React, { useRef, useState } from 'react'
import { Image, Pressable } from 'react-native'
import { FlatList } from 'react-native'
import { height, totalSize, width } from 'react-native-dimension'
import { Icon } from 'react-native-elements'
import { Wrapper, Text, Ratings, Spacer, Images, Buttons, Common, Lines } from '..'
import { appStyles, sizes, colors, routes, appImages } from '../../services'
import { Menu } from 'react-native-material-menu'
import { navigate } from '../../navigation/rootNavigation'
export function ProductPrimary({ image, onPress, title, rating, reviewsCount, containerStyle, imageStyle }) {
    return (
        <Pressable
            onPress={onPress}
        >
            <Wrapper marginHorizontalBase style={[containerStyle]}>
                <Image
                    source={{ uri: image }}
                    style={[{ width: null, height: height(20), borderRadius: sizes.cardRadius }, imageStyle]}
                />
                <Wrapper>
                    <Spacer isSmall />
                    <Text numberOfLines={1} isRegular isBoldFont>{title}</Text>
                    <Spacer isTiny />
                    <Wrapper flexDirectionRow alignItemsCenter>
                        <Ratings.Primary
                            value={rating}
                            iconSize={totalSize(1)}
                        />
                        <Spacer isTiny horizontal />
                        <Text isTiny isTextColor3>{`${rating}(${reviewsCount})`}</Text>
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        </Pressable>
    )
}
export function ProductsPrimaryHorizontal({ data, onPressItem, containerStyle, imageStyle }) {
    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            ListFooterComponent={() => <Spacer width={sizes.marginHorizontal} />}
            ListHeaderComponent={() => <Spacer width={sizes.marginHorizontal} />}
            ItemSeparatorComponent={() => <Spacer width={sizes.marginHorizontal / 2} />}
            renderItem={({ item, index }) => {
                const {
                    media, image, title, availableColors,
                    availableSizes, price,avgRating,reviews
                } = item
                const rating = avgRating||0
                const reviews_count =reviews?.length||'0'
                const product_image = media ? media?.[0] : image || appImages.noImageAvailable
                return (
                    <ProductPrimary
                        key={index}
                        containerStyle={[{ width: width(33) }, appStyles.marginHorizontalZero, containerStyle]}
                        imageStyle={[{ height: height(15) }, imageStyle]}
                        onPress={() => onPressItem(item, index)}
                        image={product_image}
                        title={title}
                        availableColors={availableColors}
                        availableSizes={availableSizes}
                        price={price}
                        rating={rating}
                        reviewsCount={reviews_count}
                    />
                )
            }}
        />
    )
}
export function ProductsPrimaryVertical2({ data, onPressItem, containerStyle, imageStyle, ...props }) {
    return (
        <Wrapper flex={1} style={{ marginHorizontal: width(3) }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                numColumns={2}
                ListFooterComponent={() => <Spacer heigh={sizes.marginVertical} />}
                ListHeaderComponent={() => <Spacer heigh={sizes.marginVertical} />}
                ItemSeparatorComponent={() => <Spacer heigh={sizes.marginVertical} />}
                renderItem={({ item, index }) => {
                  
                    const {
                        media, image, title, availableColors,
                        availableSizes, price,avgRating,reviews
                    } = item
                    const rating = avgRating||0
                    const reviews_count = reviews?.length||'0'
                    const product_image = media ? media?.[0] : image || appImages.noImageAvailable
                    return (
                        <Wrapper key={index} flex={1 / 2} style={{ marginHorizontal: width(1.5) }}>
                            <ProductPrimary
                                containerStyle={[{}, appStyles.marginHorizontalZero, containerStyle]}
                                imageStyle={[{ height: height(20) }, imageStyle]}
                                onPress={() => onPressItem(item, index)}
                                image={product_image}
                                title={title}
                                availableColors={availableColors}
                                availableSizes={availableSizes}
                                price={price}
                                rating={rating}
                                reviewsCount={reviews_count}
                            />
                        </Wrapper>
                    )
                }}
                {...props}
            />
        </Wrapper>
    )
}

//Seller Components
export const ProductSecondary = ({
    image, typee, inventory, label, type, vendor,
    containerStyle, onPress,
    onPressDots, onPressMenuOption
}) => {

    const menuRef = useRef(null)

    const showMenu = () => menuRef.current.show()
    const hideMenu = () => menuRef.current.hide()

    const menu_options = ['Edit Product', 'Set as Active', 'Set as Draft', 'Archive Products', 'Delete Products', 'Add Tags', 'Remove Tags', 'Add to collection']
    return (
        <Pressable onPress={onPress}>
            <Wrapper isBorderedWrapper marginHorizontalZero paddingHorizontalSmall paddingVerticalSmall background1 style={[appStyles.shadowExtraLight, containerStyle]}>
                <Wrapper flexDirectionRow>
                    <Images.SqareRound
                        source={{ uri: image }}
                        size={width(25)}
                    />
                    <Wrapper flex={0.05} />
                    <Wrapper flex={1}>
                        <Wrapper flexDirectionRow alignItemsFlexStart justifyContentSpaceBetween>
                            <Buttons.ColoredSmall
                                text={typee}
                                textStyle={[appStyles.textTiny, appStyles.textGray]}
                                buttonStyle={[appStyles.paddingVerticalTiny, appStyles.paddingHorizontalTiny, { backgroundColor: colors.success + '40' }]}
                            />
                            {
                                onPressDots ?
                                    <Menu
                                        ref={menuRef}
                                        anchor={
                                            <Icon
                                                name='dots-horizontal'
                                                type='material-community'
                                                size={totalSize(2.75)}
                                                color={colors.appTextColor4}
                                                iconStyle={{ marginTop: -totalSize(0.9) }}
                                                onPress={showMenu}
                                            />
                                        }
                                        onRequestClose={hideMenu}
                                        style={[, appStyles.marginVerticalSmall, appStyles.paddingHorizontalSmall, { marginLeft: -width(10), }]}
                                    >
                                        <Wrapper>
                                            {
                                                menu_options.map((item, index) => {
                                                    return (
                                                        <Pressable
                                                            key={index}
                                                            onPress={() => {
                                                                onPressMenuOption && onPressMenuOption(item, index);
                                                                hideMenu()
                                                            }}>
                                                            <Wrapper paddingVerticalSmall>
                                                                <Text isSmall>{item}</Text>
                                                            </Wrapper>
                                                            {
                                                                index === 4 || index === 6 ?
                                                                    <Lines.Horizontal />
                                                                    :
                                                                    null
                                                            }
                                                        </Pressable>
                                                    )
                                                })
                                            }
                                        </Wrapper>
                                    </Menu>
                                    :
                                    null
                            }
                        </Wrapper>
                        <Spacer isSmall />
                        <Text isSmall isBoldFont>{label}</Text>
                        <Spacer isSmall />
                        <Common.TitleInfo
                            title={'Inventory'}
                            info={inventory}
                        />
                        <Spacer isSmall />
                        <Common.TitleInfo
                            title={'Type'}
                            info={type}
                        />
                        <Spacer isSmall />
                        <Common.TitleInfo
                            title={'Vendor'}
                            info={vendor}
                        />
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        </Pressable>
    )
}
export const ProductsSecondaryHorizontal1 = ({ data, onPressItem, onPressDots, ...flatListProps }) => {
    return (
        <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={() => <Spacer width={sizes.marginHorizontal} />}
            ListHeaderComponent={() => <Spacer width={sizes.marginHorizontal} />}
            ItemSeparatorComponent={() => <Spacer width={sizes.marginHorizontal / 2} />}
            renderItem={({ item, index }) => {
                const { image, typee, inventory, label, type, vendor } = item
                // const rating = avgRating
                // const reviews_count = reviews?.length||'0'
                return (
                    <ProductSecondary
                        key={index}
                        onPress={() => onPressItem(item, index)}
                        containerStyle={[{ width: width(85) }, appStyles.marginVerticalSmall]}
                        image={image}
                        typee={typee}
                        inventory={inventory}
                        label={label}
                        type={type}
                        vendor={vendor}
                        onPressDots={onPressDots ? () => onPressDots(item, index) : null}
                    />
                )
            }}
            {...flatListProps}
        />
    )
}
export const ProductsSecondaryVertical1 = ({ data, onPressItem, onPressDots, ...flatListProps }) => {
    const [isMenuVisible, setMenuVisibility] = useState(false)

    const toggleMenu = () => setMenuVisibility(!isMenuVisible)

    const handleOnPressMenuOption = (item, index) => {
        index === 0 ?
            navigate(routes.app, { screen: routes.shareSomethingRoutes.SellProducts })
            :
            null
    }
    return (
        <>

            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={() => <Spacer height={sizes.marginVertical} />}
                ListHeaderComponent={() => <Spacer height={sizes.marginVertical} />}
                ItemSeparatorComponent={() => <Spacer height={sizes.marginVertical / 2} />}
                renderItem={({ item, index }) => {
                    const { image, typee, inventory, label, type, vendor } = item
                    return (
                        <ProductSecondary
                            key={index}
                            onPress={() => onPressItem(item, index)}
                            containerStyle={[{}, appStyles.marginHorizontalBase]}
                            image={image}
                            typee={typee}
                            inventory={inventory}
                            label={label}
                            type={type}
                            vendor={vendor}
                            onPressDots={
                                onPressDots ?
                                    () => onPressDots(item, index) :
                                    () => {
                                        toggleMenu()
                                    }
                            }
                            onPressMenuOption={handleOnPressMenuOption}
                        />
                    )
                }}
                {...flatListProps}
            />

        </>
    )
}