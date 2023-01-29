import axios from "axios";
import { Toasts } from "../../components";
import { baseURL, endPoints } from "../constants";
import store, { actions } from "../store";
import { setCurrentUser } from "../store/actions";

export const search = async ({ query, filter, category, sort }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.search}?${query ? 'query=' + query : ''}${filter ? '&filter=' + filter : ''}${category ? '&category=' + category : ''}${sort ? '&sort=' + sort : ''}`

    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('search \n\n uri===>', uri, '\n\n params', params, '\n\n config', config)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('search Response', responseJson.data);
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