import axios from "axios";
import { Toasts } from "../../components";
import { baseURL, endPoints } from "../constants";
import store, { actions } from "../store";
import { setCurrentUser } from "../store/actions";

export const createPackage = async ({ title, media, price, description }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = { title, media, price, description }
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.createPackage}`
    console.log('createPackage \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .post(uri, params, config)
        .then(async responseJson => {
            console.log('createPackage Response', responseJson.data);
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
export const getUserPackages = async ({ userId, guildPackages }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const user_id = userId ? userId : storeState.user.currentUser._id
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    // const uri = `${baseURL + endPoints.getUserPackages}/${user_id}/find-all`
    const uri = `${baseURL + endPoints.package.package}/${endPoints.package.findAll}?${!guildPackages ? 'creator=' + user_id : 'isGuildPackage=' + true}&limit=1000`
    console.log('getUserPackages \n\n  uri', uri, '\n\n config', config)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getUserPackages Response', responseJson.data);
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
export const deletePackage = async ({ packageId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.deletePackage}/${packageId}`
    console.log('deletePackage \n\n  uri', uri, '\n\n config', config)
    await axios
        .delete(uri, config)
        .then(async responseJson => {
            console.log('deletePackage Response', responseJson.data);
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

export const updatePackage = async ({ title, media, price, description, packageId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = { title, media, price, description }
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.updatePackage}/${packageId}`
    console.log('updatePackage \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .patch(uri, params, config)
        .then(async responseJson => {
            console.log('updatePackage Response', responseJson.data);
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

export const subscribePackage = async ({ packageId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.subscribePackage}/${packageId}`
    console.log('subscribePackage \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .patch(uri, params, config)
        .then(async responseJson => {
            console.log('subscribePackage Response', responseJson.data);
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

export const unsubscribePackage = async ({ packageId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.unsubscribePackage}/${packageId}`
    console.log('unsubscribePackage \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .patch(uri, params, config)
        .then(async responseJson => {
            console.log('unsubscribePackage Response', responseJson.data);
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

export const getAllAuthorsYouSupport = async () => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.getAllAuthorsYouSupport}`
    console.log('getAllSAuthorsYouSupport \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getAllSAuthorsYouSupport Response', responseJson.data);
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

//NOT BEING USEd
//Guild Packages
export const getAllGuildPackages = async ({ packageId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.guildPackage.guildPackage}/${endPoints.guildPackage.getAll}`
    console.log('getAllGuildPackages \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getAllGuildPackages Response', responseJson.data);
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

export const subscribeGuildPackage = async ({ packageId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.guildPackage.guildPackage}/${packageId}/${endPoints.guildPackage.subscribe}`
    console.log('subscribeGuildPackage \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .put(uri, params, config)
        .then(async responseJson => {
            console.log('subscribeGuildPackage Response', responseJson.data);
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

export const unsubscribeGuildPackage = async ({ packageId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.guildPackage.guildPackage}/${packageId}/${endPoints.guildPackage.unsubscribe}`
    console.log('unsubscribeGuildPackage \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .put(uri, params, config)
        .then(async responseJson => {
            console.log('unsubscribeGuildPackage Response', responseJson.data);
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

export const getPackagePaymentHistory = async ({packageId}) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.package.package}/${packageId}/${endPoints.package.paymentHistory}`
    console.log('getPackagePaymentHistory \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getPackagePaymentHistory Response', responseJson.data);
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