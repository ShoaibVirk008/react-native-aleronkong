import axios from "axios";
import { Toasts } from "../../components";
import { baseURL, endPoints } from "../constants";
import store, { actions } from "../store";
import { setCurrentUser } from "../store/actions";

export const AddFundraiserProject = async ({
    image, video, title,subtitle, description, category, subCategory,
    location, launchDate, compaignDuration, fundingGoal }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {
        title,
        subtitle,
        description,
        category,
        subCategory,
        location,
        launchDate,
        compaignDuration,
        fundingGoal,
    }
    image ? params['image'] = image : null
    video ? params['video'] = video : null

    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.addFundraisingProject}`
    console.log('AddFundraisingProject \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .post(uri, params, config)
        .then(async responseJson => {
            console.log('AddFundraisingProject Response', responseJson.data);
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

export const getFundraiserProjectCategories = async () => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.getFundraiserCategories}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('getFundraiserCategories \n\n uri===>', uri, '\n\n params', params)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getFundraiserCategories Response', responseJson.data);
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

export const getFundraiserProjectSubcategories = async ({categoryId}) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.getFundraiserSubcategories}/${categoryId}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('getFundraiserSubcategories \n\n uri===>', uri, '\n\n params', params)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getFundraiserSubcategories Response', responseJson.data);
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