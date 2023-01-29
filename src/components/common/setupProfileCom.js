import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View } from 'react-native';
import { Wrapper, Images, Icons, Spacer, TextInputs, Pickers, Text, Modals } from '..';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, sizes, HelpingMethods, appIcons, routes, appImages } from '../../services';
import * as ImagePicker from 'react-native-image-picker';
// import CountryPicker from 'react-native-country-picker-modal'
import { Icon } from 'react-native-elements';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';

const options = {
    title: 'Select Photo',
    quality: 1,
    maxWidth: 500,
    maxHeight: 500,
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const dummyGenders = [
    {
        label: 'Male',
        value: 'male'
    },
    {
        label: 'Female',
        value: 'female'
    },
    {
        label: 'Other',
        value: 'other'
    }
]
export default SetupProfile = React.forwardRef((props, ref) => {

    const { data, invertColors } = props
    useImperativeHandle(ref, () => ({
        getAllData,
        validate
    }));
    const BirthdayInputRef = useRef(null)

    const [imageUri, setImageUri] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    // const [phoneNumber, setPhoneNumber] = useState('')
    const [userName, setUsername] = useState('')
    const [birthday, setBirthday] = useState('')
    //const [gender, setGender] = useState('')
    //const [genders, setGenders] = useState(dummyGenders)
    const [imageFile, setImageFile] = useState(null)
    // const [countryCode, setCountryCode] = useState('US')
    // const [countryPhoneCode, setCountryPhoneCode] = useState('1')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isImagePickerPopupVisible, setImagePickerPopupVisibility] = useState(false);
    //Error messages
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    // const [phoneNumberError, setPhoneNumberError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [birthdayError, setBirthdayError] = useState('')
    //const [genderError, setGenderError] = useState('')
    const [imageError, setImageError] = useState('')


    useEffect(() => {
        setAllData()
    }, [])

    const toggleImagePickerPopup = () => setImagePickerPopupVisibility(!isImagePickerPopupVisible)

    // const onSelect = (gender) => {
    //     setCountryCode(gender.cca2)
    //     setCountryPhoneCode(gender.callingCode[0])
    // }
    const setAllData = () => {
        //const { data } = props
        if (data) {
            const {
                profileImage, firstName, lastName, countryCode,
                countryPhoneCode, phoneNumber, userName, birthday,
                gender
            } = data
            profileImage && setImageUri(data.profileImage)
            firstName && setFirstName(data.firstName);
            lastName && setLastName(data.lastName)
            countryCode && setCountryCode(data.countryCode)
            countryPhoneCode && setCountryPhoneCode(data.countryPhoneCode)
            phoneNumber && setPhoneNumber(data.phoneNumber.toString())
            userName && setUsername(data.userName)
            birthday && setBirthday(data.birthday)
            gender && setGender(data.gender)
        }
    }
    const launchImagePicker = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                //console.log('User cancelled image picker');
            } else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                //console.log('User tapped custom button: ', response.customButton);
            } else {
                if (!response.fileName) response.fileName = 'profile_image';
                const imageObj = response?.assets[0]
                console.log('launchImagePicker response: ', imageObj)
                const tempFile = {
                    uri: imageObj.uri,
                    name: response.fileName,
                    type: imageObj.type
                }
                setImageFile(tempFile)
            }
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
                const imageObj = response?.assets[0]
                console.log('launchImagePicker response: ', imageObj)
                const tempFile = {
                    uri: imageObj.uri,
                    name: response.fileName,
                    type: imageObj.type
                }
                setImageFile(tempFile)
            }
        });
    }

    const validate = () => {
        HelpingMethods.handleAnimation()
        !firstName ? setFirstNameError('Enter your first name') : setFirstNameError('')
        !lastName ? setLastNameError('Enter your last name') : setLastNameError('')
        !userName ? setUsernameError('Enter your userName') : setUsernameError('')
        //!gender ? setGenderError('Select your gender') : setGenderError('')
        !birthday ? setBirthdayError('Add your birthday') : setBirthdayError('')
        // !phoneNumber ? setPhoneNumberError('Enter your Phone number') : setPhoneNumberError('')
        if (firstName && lastName && userName && birthday) return true
        else return false
    }
    const getAllData = () => {
        const params = {
            imageFile,
            firstName,
            lastName,
            userName,
            //gender,
            birthday: birthday,
            // phoneNumber,
            // countryPhoneCode,
            // countryCode
        }
        validate()
        return params
    }
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        console.warn("date string: ", moment(date).toISOString());
        hideDatePicker();
        setBirthday(moment(date).toISOString())
        //setBirthday(date)
        // setTimeout(() => {
        //     BirthdayInputRef.current.blur()
        // }, 500);
    };

    return (
        <Wrapper flex={1}>
            <Wrapper flex={1}>
                <Spacer isBasic />
                <Wrapper isCenter>
                    {
                        imageFile || imageUri ?
                            <Images.Profile
                                source={{ uri: imageFile ? imageFile.uri : imageUri }}
                                onPressCamera={toggleImagePickerPopup}
                                size={width(50)}
                                iconSize={totalSize(3.5)}
                            />
                            :
                            <Icons.Button
                                iconName="camera"
                                iconType="feather"
                                iconSize={totalSize(3.5)}
                                // buttonSize={tt}
                                buttonSize={width(50)}
                                //  iconSize={totalSize(3)}
                                buttonColor={!invertColors ? colors.appBgColor2 : colors.appBgColor4}
                                iconColor={!invertColors ? colors.appTextColor1 : colors.appTextColor6}
                                onPress={toggleImagePickerPopup}
                                isRound
                            />
                    }
                </Wrapper>
                <Spacer isBasic />
                <Spacer isBasic />
                <Wrapper flexDirectionRow alignItemsFlexStart marginHorizontalBase>
                    <Wrapper flex={1}>
                        <TextInputs.Underlined
                            title="First Name"
                            value={firstName}
                            onChangeText={(text) => setFirstName(text)}
                            error={firstNameError}
                            containerStyle={{ marginHorizontal: 0 }}
                            invertColors={invertColors}
                            autoCapitalize={'words'}
                        />
                    </Wrapper>
                    <Wrapper flex={0.1} />
                    <Wrapper flex={1}>
                        <TextInputs.Underlined
                            title="Last Name"
                            value={lastName}
                            onChangeText={(text) => setLastName(text)}
                            error={lastNameError}
                            containerStyle={{ marginHorizontal: 0 }}
                            invertColors={invertColors}
                            autoCapitalize={'words'}
                        />
                    </Wrapper>
                </Wrapper>
                <Spacer isBasic />
                <Spacer isSmall />
                <TextInputs.Underlined
                    title="Username"
                    value={userName}
                    onChangeText={(text) => setUsername(text)}
                    error={usernameError}
                    right={
                        userName.length >= 5 &&
                        <Icon
                            name="check-circle"
                            type="feather"
                            size={totalSize(2.5)}
                            color={colors.success}
                        />
                    }
                    invertColors={invertColors}
                />
                {/* <Spacer isBasic />
                <Pickers.Underlined
                    title="Gender"
                    data={genders}
                    value={gender}
                    onChange={(value, index) => setGender(value)}
                    error={genderError}
                    invertColors
                /> */}
                <Spacer isBasic />
                <Spacer isSmall />
                <TextInputs.Underlined
                    // inputRef={BirthdayInputRef}
                    title="Birthday"
                    value={birthday ? moment(birthday).format('DD/MM/YYYY') : ''}
                    //value={'asdasdad'}
                    // onChangeText={(text) => setBirthday(text)}
                    onPress={showDatePicker}
                    // onFocus={showDatePicker}
                    error={birthdayError}
                    iconNameRight="calendar"
                    iconTypeRight="feather"
                    // right={
                    //     <Icon
                    //         name="calendar"
                    //         type="feather"
                    //         size={totalSize(2.5)}
                    //     />
                    // }
                    invertColors={invertColors}
                // containerStyle={{ marginHorizontal: 0 }}
                />
                {/* <Spacer isSmall />
                <Wrapper marginHorizontalBase>
                    <Text isRegular isGray>* You must be 18 years of age or older</Text>
                </Wrapper> */}
                {/*<Wrapper style={{}}>
                    <TextInputs.Underlined
                        titleStatic={"Phone Number"}
                        keyboardType="number-pad"
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                        error={phoneNumberError}
                        inputStyle={{ backgroundColor: colors.transparent, }}
                        left={
                            <Wrapper style={{ marginRight: sizes.marginHorizontal, backgroundColor: colors.transparent, }}>
                                <CountryPicker
                                    {...{
                                        countryCode,
                                        withFilter: true,
                                        withFlag: true,
                                        withCountryNameButton: false,
                                        withCallingCodeButton: false,
                                        withAlphaFilter: true,
                                        withCallingCode: true,
                                        withEmoji: true,
                                        onSelect,
                                    }}
                                // visible
                                />
                                <Text isMedium>+{countryPhoneCode}</Texts>
                            </Wrapper>
                        }
                    />
                </Wrapper>*/}
            </Wrapper>
            <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={birthday ? moment(birthday).toDate() : moment(Date.now()).toDate()}
            />
            <Modals.ImagePickerPopup
                visible={isImagePickerPopupVisible}
                toggle={toggleImagePickerPopup}
                onPressButton1={launchCamera}
                onPressButton2={launchImagePicker}
            />
        </Wrapper>
    );
})

