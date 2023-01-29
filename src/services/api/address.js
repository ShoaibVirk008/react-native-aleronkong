import axios from "axios";
import { Toasts } from "../../components";
import { baseURL, endPoints } from "../constants";
import store, { actions } from "../store";
import { setCurrentUser } from "../store/actions";

export const addAddress = async ({ label, line1, line2, city, state, country, postalCode }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = { label, line1, line2, city, state, country, postalCode }
    const uri = `${baseURL + endPoints.address.address}/${endPoints.address.create}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('addAddress \n\n uri===>', uri, '\n\n params', params)
    await axios
        .post(uri, params, config)
        .then(async responseJson => {
            console.log('addAddress Response', responseJson.data);
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

export const getAllAddresses = async () => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.address.address}/${endPoints.address.findAll}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('getAllAddresses \n\n uri===>', uri, '\n\n params', params)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getAllAddresses Response', responseJson.data);
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

export const defaultAddress = async ({ addressId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.address.address}/${addressId}/${endPoints.address.default}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('defaultAddress \n\n uri===>', uri, '\n\n params', params)
    await axios
        .put(uri, params, config)
        .then(async responseJson => {
            console.log('defaultAddress Response', responseJson.data);
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

export const deleteAddress = async ({ addressId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.address.address}/${addressId}/${endPoints.address.delete}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('deleteAddress \n\n uri===>', uri, '\n\n params', params)
    await axios
        .delete(uri, config)
        .then(async responseJson => {
            console.log('deleteAddress Response', responseJson.data);
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

export const updateAddress = async ({addressId, label, line1, line2, city, state, country, postalCode }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = { label, line1, line2, city, state, country, postalCode }
    const uri = `${baseURL + endPoints.address.address}/${addressId}/${endPoints.address.update}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('updateAddress \n\n uri===>', uri, '\n\n params', params)
    await axios
        .patch(uri, params, config)
        .then(async responseJson => {
            console.log('updateAddress Response', responseJson.data);
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