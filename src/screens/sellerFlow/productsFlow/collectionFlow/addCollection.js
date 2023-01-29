import React, { Component, useState } from 'react';
import { FlatList, View } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { ScrollViews, Spacer, TextInputs, Wrapper, Text, CheckBoxes, Chips, Buttons, Images, Icons, Modals } from '../../../../components';
import { appImages, appStyles, colors, fontSize, sizes } from '../../../../services';
import * as ImagePicker from 'react-native-image-picker';
const media = [
    {
        type: 'image',
        uri: appImages.product3,
    },
]
export default function Index() {


    const [images, setImages] = useState([])

    const [isImagePickerVisible, setImagePickerVisibility] = useState(false)
    const toggleImagePicker = () => setImagePickerVisibility(!isImagePickerVisible)

    const launchImagePicker = () => {
        ImageCropPicker.openPicker({
            quality: 9,
            compressImageMaxHeight: 700,
            compressImageMaxWidth: 800,
            cropping: false,
            multiple: true,
        }).then(response => {
            let tempArray = [];
            //this.setState({ ImageSource: response });
            let photos = []
            for (const item of response) {
                let pathParts = item.path.split('/');
                const tempObj = {
                    // ...item,
                    // uri: item.path
                    uri: item.path,
                    type: item.mime,
                    name: pathParts[pathParts.length - 1]
                }
                photos.push(tempObj);
            }
            setImages([...images, ...photos])
        });
    }
    const launchCamera = () => {
        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                if (!response.fileName) response.fileName = 'profile_image';
                const tempFile = {
                    uri: response.uri,
                    name: response.fileName,
                    type: response.type
                }
                setImages([...images, tempFile])
            }
        });
    }
    return (
        <Wrapper isMain>
            <ScrollViews.WithKeyboardAvoidingView>
                <Spacer isBasic />
                <Spacer isSmall />
                <TextInputs.UnderlinedSecondary
                    titleStatic='Title'
                    value='Summer Collection'
                />
                <Spacer isBasic />
                <Wrapper marginHorizontalBase>
                    <Text isSmallPlus isMediumFont>Description</Text>
                </Wrapper>
                <Spacer isSmall />
                <TextInputs.Bordered
                    placeholder={'asda'}
                    value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                    containerStyle={{ borderWidth: 1 }}
                    inputStyle={{ fontSize: fontSize.small, height: height(15), textAlignVertical: 'top', paddingTop: height(1), lineHeight: totalSize(2.25) }}
                    multiline
                />
                <Spacer isBasic />
                <Spacer isSmall />
                <Wrapper marginHorizontalBase>
                    <Text isSmallPlus isMediumFont>Collection Type</Text>
                    <Spacer isBasic />
                    <CheckBox
                        title='Manual'
                        text={'Add products to this collection one by one'}
                        isChecked={false}
                        onPress={() => { }}
                    />
                    <Spacer isBasic />
                    <CheckBox
                        title='Automated'
                        text={'Existing and future products that match the conditions you set will automatically be added to this collection.'}
                        isChecked={true}
                        onPress={() => { }}
                    />
                </Wrapper>
                <Spacer isBasic />
                <Spacer isSmall />
                <Wrapper marginHorizontalBase>
                    <Text isSmallPlus isMediumFont>Conditions</Text>
                    <Spacer isBasic />
                    <CheckBox
                        title='All conditions'
                        text={'Product must match all conditions'}
                        isChecked={false}
                        onPress={() => { }}
                    />
                    <Spacer isBasic />
                    <CheckBox
                        title='Any condition'
                        text={'Product must match any of these conditions'}
                        isChecked={true}
                        onPress={() => { }}
                    />
                </Wrapper>
                <Spacer isBasic />
                <TextInputs.UnderlinedSecondary
                    titleStatic={'Tags'}
                    placeholder='Enter Tag'
                />
                <Spacer isSmall />
                <Wrapper marginHorizontalBase>
                    <Chips.Primary
                        data={['T-shirt', 'Shirt']}
                        chipStyle={{ backgroundColor: colors.appBgColor3, borderRadius: sizes.cardRadius / 2 }}
                        onPress={() => { }}
                    />
                </Wrapper>
                <Spacer isBasic />
                <Spacer isSmall />
                <Wrapper marginHorizontalBase>
                    <Text isSmallPlus isMediumFont>Collection Images</Text>
                    <Spacer isSmall />
                    <Wrapper isBorderedWrapper marginHorizontalZero>
                        <FlatList
                            horizontal
                            data={media}
                            showsHorizontalScrollIndicator={false}
                            ItemSeparatorComponent={() => <Spacer isSmall horizontal />}
                            renderItem={({ item, index }) => {
                                return (
                                    <Images.SqareRound
                                    key={index}
                                        source={{ uri: item.uri }}
                                        size={width(30)}
                                    />
                                )
                            }}
                            ListFooterComponent={() =>
                                <Wrapper flexDirectionRow>
                                    <Spacer isSmall horizontal />
                                    <Icons.Button
                                        iconName={'plus'}
                                        buttonStyle={{ borderWidth: 1, borderColor: colors.appBgColor4, borderStyle: 'dashed' }}
                                        buttonSize={width(30)}
                                        iconColor={colors.appTextColor1 + '40'}
                                        onPress={toggleImagePicker}
                                    />
                                </Wrapper>
                            }
                        />
                    </Wrapper>
                </Wrapper>
                <Spacer isBasic />
                <Spacer isBasic />
                <Wrapper marginHorizontalBase flexDirectionRow style={{}}>
                    <Wrapper flex={1}>
                        <Buttons.ColoredSmall
                            text={'Save'}
                            buttonStyle={[{ borderRadius: 5 }, appStyles.center, appStyles.paddingVerticalSmall]}
                        />
                    </Wrapper>
                    <Wrapper flex={0.1} />
                    <Wrapper flex={1}>
                        <Buttons.BorderedSmall
                            text={'Discard'}
                            buttonStyle={[{ borderRadius: 5 }, appStyles.center, appStyles.paddingVerticalSmall]}
                            tintColor={colors.appColor8}
                        />
                    </Wrapper>
                </Wrapper>
                <Spacer isDoubleBase />
            </ScrollViews.WithKeyboardAvoidingView>
            <Modals.ImagePickerPopup
                visible={isImagePickerVisible}
                toggle={toggleImagePicker}
                onPressButton1={launchCamera}
                onPressButton2={launchImagePicker}
            />
        </Wrapper>
    )
}

const CheckBox = ({ title, text, isChecked, onPress }) => {
    return (
        <CheckBoxes.Primary
            checked={isChecked}
            title={title}
            text={text}
            checkedIconName={'radiobox-marked'}
            checkedIconColor={colors.appTextColor1}
            uncheckedIconColor={colors.appTextColor1}
            onPress={onPress}
            containerStyle={[appStyles.alignItemsFlexStart]}
            titleStyle={[appStyles.textSmall]}
            textStyle={[appStyles.textSmall, appStyles.textLightGray]}
        />
    )
}