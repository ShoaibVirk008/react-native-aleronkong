import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Toasts } from "../../components";
import { async_consts, baseURL, endPoints } from "../constants";
import store, { actions } from "../store";
import { setCurrentUser, setUserToken } from "../store/actions";

export const Register = async ({ email, password, firstName, lastName, userName, birthDate, avatar }) => {
    let response = null
    // let params = {
    //     email,
    //     password,
    //     firstName,
    //     lastName,
    //     userName,
    //     birthDate,
    //     avatar: avatar || ''
    // }
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('userName', userName)
    formData.append('birthDate', birthDate)
    avatar ? formData.append('avatar', avatar) : null
    let uri = `${baseURL + endPoints.register}`
    const config = {
        headers: {
            // "Authorization": `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        }
    }
   
    console.log('register \n\n uri===>', uri, '\n\n params', formData,'\n\n config', config)
    // console.log('params.avatar: ',avatar)
    await axios
        .post(uri, formData, config)
        .then(async responseJson => {
            console.log('register Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(Error => {
            Toasts.Error(Error.response.data.message)
            console.log(Error);
        });
    return response
};

export const Login = async ({ email, password }) => {
    let response = null
    let params = {
        email,
        password
    }
    let uri = `${baseURL + endPoints.login}`
    console.log('login \n\n Uri: ', uri, 'Params', params);
    await axios
        .post(uri, params)
        .then(async responseJson => {
            console.log('login Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    console.log('responseJson.data.statusCode: ', responseJson.data.statusCode)
                    response = responseJson.data
                    setCurrentUser(responseJson.data.data.user)
                    setUserToken(responseJson.data.data.access_token)
                    AsyncStorage.setItem(async_consts.user_credentials, JSON.stringify(params))
                }
            }
        })
        .catch(Error => {
            Toasts.Error(Error.response.data.message)
            console.log(Error);
        });
    return response
};

export const SocialLogin = async ({ authType, email, firstName, lastName, userName, birthDate, avatar }) => {
    let response = null
    let params = {
        authType,
        email,
        // firstName,
        // lastName,
        // userName,
        // birthDate,
        // avatar: avatar || ''
    }
    firstName ? params['firstName'] = firstName : null
    lastName ? params['lastName'] = lastName : null
    userName ? params['userName'] = userName : null
    birthDate ? params['birthDate'] = birthDate : null
    avatar ? params['avatar'] = avatar : null

    let uri = `${baseURL + endPoints.social_login}`
    console.log('SocialLogin \nUri: ', uri, '\nParams', params);
    await axios
        .post(uri, params)
        .then(async responseJson => {
            console.log('SocialLogin Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                    setCurrentUser(responseJson.data.data.user)
                    setUserToken(responseJson.data.data.access_token)
                    AsyncStorage.setItem(async_consts.user_credentials_social, JSON.stringify(params))
                }
            }
        })
        .catch(Error => {
            Toasts.Error(Error.response.data.message)
            console.log(Error);
        });
    return response
};

export const CheckEmail = async ({ email }) => {
    let response = null
    let params = {
        email,
    }
    console.log('CheckEmail Params', params);
    await axios
        .post(`${baseURL + endPoints.check_email}`, params)
        .then(async responseJson => {
            console.log('CheckEmail Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                }
            }
        })
        .catch(Error => {
            Toasts.Error(Error.response.data.message)
            console.log(Error);
        });
    return response
};

export const SendForgotPasswordLink = async ({ email }) => {
    let response = null
    let params = {
        email,
    }
    let uri = `${baseURL + endPoints.send_forgot_password_link}`
    console.log('SendForgotPasswordLink \nParams: ' + params + '\nUri: ', uri);
    await axios
        .post(uri, params)
        .then(async responseJson => {
            console.log('SendForgotPasswordLink Response', responseJson.data);
            if (responseJson.data) {
                // if (responseJson.data.statusCode === 200) {
                response = responseJson.data
                //   }
            }
        })
        .catch(Error => {
            Toasts.Error(Error.response.data.message)
            console.log(Error);
        });
    return response
};

export const ResetPassword = async ({ otp, password }) => {
    let response = null
    let params = {
        otp: Number(otp),
        password
    }
    let uri = `${baseURL + endPoints.reset_password}`
    console.log('ResetPassword \nParams: ' + params + '\nUri: ', uri);
    console.log('\notp: ' + params.otp + '\npassword: ', params.password);
    await axios
        .post(uri, params)
        .then(async responseJson => {
            console.log('ResetPassword Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                }
            }
        })
        .catch(Error => {
            Toasts.Error(Error.response.data.message)
            console.log(Error);
        });
    return response
};

export const changePassword = async ({ oldPassword, newPassword }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {
        oldPassword,
        newPassword
    }
    let uri = `${baseURL + endPoints.changePassword}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('changePassword \nparams: ' + params + '\nuri: ', uri + '\nconfig: ', config);
    await axios
        .post(uri, params, config)
        .then(async responseJson => {
            console.log('changePassword Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                }
            }
        })
        .catch(Error => {
            Toasts.Error(Error.response.data.message)
            console.log(Error);
        });
    return response
};