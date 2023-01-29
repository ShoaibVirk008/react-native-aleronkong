import React from 'react'
import { FlatList, Image } from 'react-native'
import { Pressable } from 'react-native'
import { height, totalSize, width } from 'react-native-dimension'
import { Images, Wrapper, Text, Spacer, Icons } from '../../components'
import { appStyles, colors, sizes } from '../../services'



export function GroupsPrimaryHorizontal({ data, onPressItem, ...props }) {
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
                const { profilePhoto, name, members } = item
                const members_count = members ? members?.length : 0
                return (
                    <GroupPrimary
                    key={index}
                        animation={index <= 4 && 'fadeInRight'}
                        duration={300 + (index * 100)}
                        image={profilePhoto}
                        title={name}
                        subtitle={members_count + ' Member' + (members_count > 1 ? 's' : '')}
                        containerStyle={{}}
                        imageStyle={{ width: width(33), height: width(30) }}
                        onPress={() => onPressItem(item, index)}
                    />
                )
            }}
            {...props}
        />
    )
}
export function GroupsPrimaryVertical({ data, onPressItem, onPressCreateNewGroup, }) {
    return (
        <Wrapper
            flexDirectionRow
            justifyContentSpaceBetween
            marginHorizontalBase
            style={{ flexWrap: 'wrap', }}>
            {
                onPressCreateNewGroup ?
                    <Wrapper
                        isColored
                        marginHorizontalZero
                        paddingVerticalZero
                        paddingHorizontalZero
                        style={[{
                            marginBottom: sizes.marginVertical / 1.5,
                            width: width(43), height: width(45),
                            backgroundColor: colors.appColor1 + '20'
                        },]}
                    >
                        <Pressable
                            style={[{ flex: 1 }, appStyles.center]}
                            onPress={onPressCreateNewGroup}
                        >
                            <Icons.WithText
                                text={`Create a${'\n'}New Group`}
                                direction={'column'}
                                textStyle={[appStyles.textRegular, appStyles.textPrimaryColor, appStyles.textCenter]}
                                iconName={'plus'}
                                iconSize={totalSize(3)}
                                tintColor={colors.appColor1}
                            />
                        </Pressable>
                    </Wrapper>
                    :
                    null

            }

            {
                data?.length ?
                    data.map((item, index) => {
                        const { profilePhoto, coverPhoto, description, name, members, } = item
                        const members_count = members ? members?.length : 0
                        return (
                            <GroupPrimary
                                key={index}
                                animation={index <= 6 && 'fadeInUp'}
                                duration={300 + (index * 100)}
                                image={profilePhoto}
                                title={name}
                                subtitle={members_count + ' Member' + (members_count > 1 ? 's' : '')}
                                containerStyle={{ marginBottom: sizes.marginVertical / 1.5 }}
                                imageStyle={{ width: width(43), height: width(45) }}
                                onPress={() => onPressItem(item, index)}
                            />
                        )
                    })
                    :
                    null
            }
        </Wrapper>
    )
}
export function GroupPrimary({
    title, subtitle, image, onPress,
    containerStyle, imageStyle, animation, duration }) {
    return (
        <Pressable
            onPress={onPress}
            style={[containerStyle]}
        >
            <Wrapper
                animation={animation}
                duration={duration}
            >
                <Image
                    source={{ uri: image }}
                    style={[{ width: null, height: height(20), borderRadius: sizes.cardRadius }, imageStyle]}
                />
                <Spacer isSmall />
                <Text isRegular isBoldFont>{title}</Text>
                <Spacer isTiny />
                <Text isTiny isTextColor3>{subtitle}</Text>

            </Wrapper>
        </Pressable>
    )
}