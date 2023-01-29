import axios from "axios";
import { Toasts } from "../../components";
import { baseURL, endPoints } from "../constants";
import store, { actions } from "../store";
import { setCurrentUser } from "../store/actions";



export const getAllOrders = async () => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.order.order}/${endPoints.order.findAll}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('getAllOrders \n\n uri===>', uri, '\n\n params', params)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getAllOrders Response', responseJson.data);
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

export const getOrderDetail = async ({ orderId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.order.order}/${orderId}/${endPoints.order.findOne}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('getOrderDetail \n\n uri===>', uri, '\n\n params', params)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getOrderDetail Response', responseJson.data);
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

export const updateOrder = async ({ orderId, status }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = { status }
    const uri = `${baseURL + endPoints.order.order}/${orderId}/${endPoints.order.update}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('updateOrder \n\n uri===>', uri, '\n\n params', params)
    await axios
        .put(uri, params, config)
        .then(async responseJson => {
            console.log('updateOrder Response', responseJson.data);
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