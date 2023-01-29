import axios from "axios";
import { Toasts } from "../../components";
import { baseURL, endPoints } from "../constants";
import store, { actions } from "../store";
import { setCurrentUser } from "../store/actions";

export const addPaymentMethod = async ({ name, number, expiryMonth, expiryYear, cvc }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = { name, number, expiryMonth, expiryYear, cvc }
    const uri = `${baseURL + endPoints.paymentMethod.paymentMethod}/${endPoints.paymentMethod.create}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('addPaymentMethod \n\n uri===>', uri, '\n\n params', params)
    await axios
        .post(uri, params, config)
        .then(async responseJson => {
            console.log('addPaymentMethod Response', responseJson.data);
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
export const updatePaymentMethod = async ({paymentMethodId, name, number, expiryMonth, expiryYear, cvc }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = { name, number, expiryMonth, expiryYear, cvc }
    const uri = `${baseURL + endPoints.paymentMethod.paymentMethod}/${paymentMethodId}/${endPoints.paymentMethod.update}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('updatePaymentMethod \n\n uri===>', uri, '\n\n params', params)
    await axios
        .patch(uri, params, config)
        .then(async responseJson => {
            console.log('updatePaymentMethod Response', responseJson.data);
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
export const getAllPaymentMethods = async () => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.paymentMethod.paymentMethod}/${endPoints.paymentMethod.findAll}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('getAllPaymentMethods \n\n uri===>', uri, '\n\n params', params)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getAllPaymentMethods Response', responseJson.data);
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

export const defaultPaymentMethod = async ({ paymentMethodId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.paymentMethod.paymentMethod}/${paymentMethodId}/${endPoints.paymentMethod.default}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('defaultPaymentMethod \n\n uri===>', uri, '\n\n params', params)
    await axios
        .patch(uri, params, config)
        .then(async responseJson => {
            console.log('defaultPaymentMethod Response', responseJson.data);
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

export const removePaymentMethod = async ({ paymentMethodId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.paymentMethod.paymentMethod}/${paymentMethodId}/${endPoints.paymentMethod.delete}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('removePaymentMethod \n\n uri===>', uri, '\n\n params', params)
    await axios
        .delete(uri, config)
        .then(async responseJson => {
            console.log('removePaymentMethod Response', responseJson.data);
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

