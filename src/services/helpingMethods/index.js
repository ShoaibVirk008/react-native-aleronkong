import { UIManager, LayoutAnimation, Platform } from "react-native";
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { async_consts } from "../constants";
import store from "../store";
import * as Api from "../api";
import moment from "moment";

export const handleAnimation = () => {
    if (Platform.OS === "android") {
        UIManager.setLayoutAnimationEnabledExperimental &&
            UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
}
export const checkExpiry = () => {
    var d1 = Date.parse("2012-11-01");
    var d2 = Date.parse("2012-11-04");
    var expiryDate = Date.parse("2020-12-18");
    var currentDate = Date.now()
    console.log(expiryDate > currentDate)
    if (expiryDate < currentDate) {
        return true
    } else {
        return false
    }
}
export const compareDate = () => {
    var date1 = new Date('December 25, 2017 01:30:00');
    var date2 = new Date('June 18, 2016 02:30:00');
    console.log(date1.getTime() > date2.getTime())
    //best to use .getTime() to compare dates
    //if (date1.getTime() === date2.getTime()) {
    //same date
    //}

    if (date1.getTime() > date2.getTime()) {
        return true
    } else {
        return false
    }
}
export const checkNotificationPermission = async () => {
    messaging()
        .hasPermission()
        .then(enabled => {
            if (enabled) {
                console.log('Permission granted');
                getFcmToken();
            } else {
                console.log('Request Permission');
                requestPermission();
            }
        });
}
export const requestNotificationPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        console.log('Authorization status:', authStatus);
    } else {
        console.log('Authorization status: Not grannted');
    }
}

//////Cloude messageing Tokens
export const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem(async_consts.fcm_token);
    console.log('before fcmToken: ', fcmToken);
    // alert(fcmToken);
    if (!fcmToken) {
        fcmToken = await messaging().getToken();

        if (fcmToken) {
            console.log('after fcmToken: ', fcmToken);
            await AsyncStorage.setItem(async_consts.fcm_token, fcmToken);
            // await saveData('Users', userId, { Token: fcmToken });
        }
    } else {

        // await saveData('Users', userId, { Token: fcmToken });
    }
}

export const requestPermission = async () => {
    messaging()
        .requestPermission()
        .then(() => {
            getFcmToken();
        })
        .catch(error => {
            console.log('permission rejected');
        });
}

export const isPostLiked = (likes) => {
    const storeState = store.getState()
    const userId = storeState.user.currentUser._id
    const userLike = likes.find(item => item._id === userId)
    if (userLike) {
        return true
    } else {
        return false
    }
}

export const isUserBlocked = (userId) => {
    const storeState = store.getState()
    const blockedUsers = storeState.user.currentUser.blockedUsers
    const userIsBlocked = blockedUsers.find(item => item === userId)
    if (userIsBlocked) {
        return true
    } else {
        return false
    }
}

export const isUserFriend = (userId) => {
    const storeState = store.getState()
    const friends = storeState.user.currentUser.friends
    const userIsFrient = friends.find(item => item === userId)
    if (userIsFrient) {
        return true
    } else {
        return false
    }
}
export const isGroupJoined = (groupMembers) => {
    const storeState = store.getState()
    const id = storeState.user.currentUser._id
    const isJoined = groupMembers.find(item => item.member === id)
    if (isJoined) {
        return true
    } else {
        return false
    }
}
export const isGroupJoinRequestSent = (groupJoinRequests) => {
    const storeState = store.getState()
    const id = storeState.user.currentUser._id
    const isJoinRequestSent = groupJoinRequests.find(item => item === id)
    if (isJoinRequestSent) {
        return true
    } else {
        return false
    }
}
export const findMutualFriends = (userFriends) => {
    let response = null
    const storeState = store.getState()
    const friends = storeState.user.currentUser.friends
    const matchedFriends = friends.filter(element => userFriends.includes(element));
    response = matchedFriends
    return response

}
export const handleLikeDislikePost = async (item) => {
    let response = null
    const { likes } = item
    const isLiked = isPostLiked(likes)
    console.log('isLiked: ', isLiked)
    if (!isLiked) {
        await Api.LikePost({ postId: item._id }).
            then(res => {
                if (res) {
                    response = res
                }
            })
    } else {
        await Api.UnLikePost({ postId: item._id }).
            then(res => {
                if (res) {
                    response = res
                }
            })
    }
    return response
}

export const dateFormateBackend = (date) => {
    return moment(date).format('YYYY-MM-DD')
}
export const dateFormat_DDMMYYYY = (date) => {
    return moment(date).format('DD/MM/YYYY')
}

export const getDaysDifference = ({ firstDate, secondDate }) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    // const firstDate = new Date(2022, 12, 17);
    // const secondDate = new Date(2022, 12, 22);

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    //console.log('diffDays: ', diffDays)

    return diffDays

}

export const GetSubscribedPackage = (userId) => {
    let response = null
    const storeState = store.getState()
    const subscribedPackages = storeState.user.currentUser?.supportingPackages
    if (subscribedPackages) {
        const tempPackage = subscribedPackages.find(item => item.creator === userId)
        if (tempPackage) {
            response = tempPackage
        }
    }
    return response
}

export const GetSubscribedGuildPackage = () => {
    let response = null
    const storeState = store.getState()
    const subscribedPackages = storeState.user.currentUser?.supportingPackages
    if (subscribedPackages) {
        const tempGuildPackage = subscribedPackages.find(item => item.isGuildPackage)
        if (tempGuildPackage) {
            response = tempGuildPackage
        }
    }
    return response
}

export const IsProductBought = (productId) => {
    let response = null
    const storeState = store.getState()
    const { currentUser } = storeState.user
    const boughtProducts = currentUser?.boughtDigitalProducts
    if (boughtProducts) {
        const tempBoughtProduct = boughtProducts.find(item => item === productId)
        if (tempBoughtProduct) {
            response = tempBoughtProduct
        }
    }
    return response
}
export const isProductReviewed = (reviews) => {
    let response = null
    const storeState = store.getState()
    const { currentUser } = storeState.user
    const user_id = currentUser?._id
    const myReview = reviews.find(item => item.creator === user_id)
    if (myReview) {
        response = myReview
    }
    return response
}
export const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};

export const handleFriendUnfriendUser = async (user) => {
    let response = null
    const { _id } = user
    const isFriend = isUserFriend(_id)
    console.log('isFriend: ', isFriend)
    if (!isFriend) {
        await Api.addFriend({ userId: _id }).
            then(res => {
                if (res) {
                    response = res
                }
            })
    } else {
        await Api.unFriend({ userId: _id }).
            then(res => {
                if (res) {
                    response = res
                }
            })
    }
    return response
}
export const handleBlockUnblockUser = async (user) => {
    let response = null
    const { _id } = user
    const isBlocked = isUserBlocked(_id)
    console.log('isBlocked: ', isBlocked)
    if (!isBlocked) {
        await Api.blockUser({ userId: _id }).
            then(res => {
                if (res) {
                    response = res
                }
            })
    } else {
        await Api.unBlockUser({ userId: _id }).
            then(res => {
                if (res) {
                    response = res
                }
            })
    }
    return response
}
export const fancyTimeFormat = (duration) => {
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}