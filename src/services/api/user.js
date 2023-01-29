import axios from "axios";
import { Toasts } from "../../components";
import { baseURL, endPoints } from "../constants";
import store, { actions } from "../store";
import { setCurrentUser } from "../store/actions";

export const UpdateUser = async ({ firstName, lastName, userName, birthDate, avatar, fcmToken, userToken }) => {
    let response = null
    const storeState = store.getState()
    const token = userToken ? userToken : storeState.user.userToken
    const current_user = storeState.user.currentUser
    let params = {}
    firstName ? params['firstName'] = firstName : null
    lastName ? params['lastName'] = lastName : null
    userName ? params['userName'] = userName : null
    birthDate ? params['birthDate'] = birthDate : null
    avatar ? params['avatar'] = avatar : null
    fcmToken ? params['fcmToken'] = fcmToken : null
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.updateUser}`
    console.log('UpdateProfile \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .put(uri, params, config)
        .then(async responseJson => {
            console.log('UpdateProfile Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    const { avatar, birthDate, userName, lastName, firstName, fcmToken } = responseJson.data.data
                    const user_updated_fields = { avatar, birthDate, userName, lastName, firstName, fcmToken }
                    const updated_user = { ...current_user, ...user_updated_fields }
                    //setCurrentUser(responseJson.data.data)
                    setCurrentUser(updated_user)
                    response = responseJson.data.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(Error => {
            Toasts.Error(Error.response.data.message)
            console.error(Error);
        });
    return response
};

export const uploadFile = async (file) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const formData = new FormData()
    formData.append('file', file)
    const uri = `${baseURL + endPoints.uploadFile}`
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        }
    }
    console.log('uploadFile \n\n uri===>', uri, '\n\n params', formData, '\n\n config', config)
    await axios
        .post(uri, formData, config)
        .then(async responseJson => {
            console.log('uploadFile Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.Error(error.response.data.message)
            // Toasts.Error(error.response)
            console.error(error);
        });
    return response
};

export const addFriend = async ({ userId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.addFriend}/${userId}/create`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('addFriend \n\n uri===>', uri, '\n\n params', params, '\n\n config', config)
    await axios
        .put(uri, params, config)
        .then(async responseJson => {
            console.log('addFriend Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.Error(error.response.data.message)
            console.error(error);
        });
    return response
};
export const unFriend = async ({ userId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.user.user}/${endPoints.user.friend}/${userId}/${endPoints.user.remove}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('unFriend \n\n uri===>', uri, '\n\n params', params, '\n\n config', config)
    await axios
        .put(uri, params, config)
        .then(async responseJson => {
            console.log('unFriend Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.Error(error.response.data.message)
            console.error(error);
        });
    return response
};
export const blockUser = async ({ userId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.user.user}/${userId}/${endPoints.block}`
    //const uri = `${baseURL + endPoints.user}/${userId}/${endPoints.unblock}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('blockUser \n\n uri===>', uri, '\n\n params', params, '\n\n config', config)
    await axios
        .put(uri, params, config)
        .then(async responseJson => {
            console.log('blockUser Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.Error(error.response.data.message)
            console.error(error);
        });
    return response
};
export const unBlockUser = async ({ userId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.user.user}/${userId}/${endPoints.unblock}`
    //const uri = `${baseURL + endPoints.user}/${userId}/${endPoints.unblock}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('unBlockUser \n\n uri===>', uri, '\n\n params', params, '\n\n config', config)
    await axios
        .put(uri, params, config)
        .then(async responseJson => {
            console.log('unBlockUser Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.Error(error.response.data.message)
            console.error(error);
        });
    return response
};

export const reportUser = async ({ userId, reason }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {
        reason,
        reportedUser: userId,
        type: 'user'
    }
    const uri = `${baseURL + endPoints.reportUser}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('reportUser \n\n uri===>', uri, '\n\n params', params)
    await axios
        .post(uri, params, config)
        .then(async responseJson => {
            console.log('reportUser Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.Error(error.response.data.message)
            console.error(error);
        });
    return response
};

export const getUserDetail = async ({ userId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.user.user}/${endPoints.user.findOne}/${userId}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('getUserDetail \n\n uri===>', uri, '\n\n params', params)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getUserDetail Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.Error(error.response.data.message)
            console.error(error);
        });
    return response
};