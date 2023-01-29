import { savePosts,saveCartDetail,saveNowPlaying,saveNowPlayingStatus } from "../reducers/app";
import store from "../index";

const { dispatch } = store


export const setPosts = data => {
    dispatch(savePosts(data))
}
export const setCartDetail = data => {
    dispatch(saveCartDetail(data))
}
export const setNowPlaying = data => {
    dispatch(saveNowPlaying(data))
}
export const setNowPlayingStatus = data => {
    dispatch(saveNowPlayingStatus(data))
}





