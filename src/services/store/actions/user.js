import { saveCurrentUser, saveUserToken } from "../reducers/user";
import store from "../index";

const { dispatch } = store


export const setCurrentUser = data => {
    dispatch(saveCurrentUser(data))
}

export const setUserToken = data => {
    dispatch(saveUserToken(data))
}



