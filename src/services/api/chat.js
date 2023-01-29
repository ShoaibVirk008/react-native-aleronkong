import axios from "axios";
import { Toasts } from "../../components";
import { baseURL, endPoints } from "../constants";
import store, { actions } from "../store";
import { setCurrentUser } from "../store/actions";

export const GetAllMessagesOfChat = async ({ chatId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.getMessagesOfChat}/${chatId}`
    console.log('GetAllMessagesOfChat \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('GetAllMessagesOfChat Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
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

export const sendMessage = async ({ chatId, message, gif, images, videos }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {
        chat: chatId,
       // content: message,
    }
    message ? params['content'] = message : null
    images ? params['images'] = images : null
    videos ? params['videos'] = videos : null
    gif ? params['gif'] = gif : null

    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.sendMessage}`
    console.log('sendMessage \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .post(uri, params, config)
        .then(async responseJson => {
            console.log('sendMessage Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
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



export const createChat = async ({ receiverId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {
        receiverId
    }
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.createChat}`
    console.log('createChat \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .post(uri, params, config)
        .then(async responseJson => {
            console.log('createChat Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
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

export const FindChatOfTwoUsers = async ({ receiverId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.chatOfTwoUsers}/${receiverId}`
    console.log('FindChatOfTwoUsers \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('FindChatOfTwoUsers Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(Error => {
            // Toasts.Error(Error.response.data.message)
            console.error(Error);
        });
    return response
};

export const getRecentChats = async () => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.recentChats}`
    console.log('getRecentChats \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getRecentChats Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
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


export const DeleteChat = async ({ chatId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.deleteChat}/${chatId}`
    console.log('DeleteChat \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .delete(uri, config)
        .then(async responseJson => {
            console.log('DeleteChat Response', responseJson.data);
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
            console.error(Error);
        });
    return response
};

export const MuteChat = async ({ chatId, interval,startTime,endTime }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {
        chat: chatId,
        interval
    }
    startTime && [params['startTime'] = startTime]
    endTime && [params['endTime'] = endTime]
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.muteChat}`
    console.log('MuteChat \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .put(uri, params, config)
        .then(async responseJson => {
            console.log('MuteChat Response', responseJson.data);
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
            console.error(Error);
        });
    return response
}; 