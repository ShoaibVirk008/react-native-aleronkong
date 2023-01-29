import axios from "axios";
import { Platform, Share } from 'react-native'
import { Toasts } from "../../components";
import { baseURL, endPoints, post_types } from "../constants";
import store, { actions } from "../store";
import { setCurrentUser } from "../store/actions";

export const CreatePost = async ({
    //post params
    description, privacy, images, videos, group, type,
}) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const isFundraisingProject = type === post_types.fundraisingProject

    let params = {
        content: description,
        // images,
        // videos,
        privacy,
        //groupId,
        //type,
        //fundraisingProjectDetails
    }
    type ? params['type'] = type : null
    images?.length ? params['images'] = images : null
    videos?.length ? params['videos'] = videos : null
    group ? params['group'] = group : null
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.create_post}`
    console.log('CreatePost \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .post(uri, params, config)
        .then(async responseJson => {
            console.log('CreatePost Response', responseJson.data);
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
export const UpdatePost = async ({
    //post params
    postId,
    description, privacy, images, videos, group, type,
}) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const isFundraisingProject = type === post_types.fundraisingProject

    let params = {
        content: description,
        // images,
        // videos,
        privacy,
        //groupId,
        //type,
        //fundraisingProjectDetails
    }
    type ? params['type'] = type : null
    images?.length ? params['images'] = images : null
    videos?.length ? params['videos'] = videos : null
    group ? params['group'] = group : null
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.post.post}/${postId}/${endPoints.post.update}`
    console.log('UpdatePost \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .put(uri, params, config)
        .then(async responseJson => {
            console.log('UpdatePost Response', responseJson.data);
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

export const deletePost = async ({ postId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.post.group}/${endPoints.post.post}/${postId}/${endPoints.post.delete}`
    console.log('deletePost \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .delete(uri, config)
        .then(async responseJson => {
            console.log('deletePost Response', responseJson.data);
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
            console.log(Error);
        });
    return response
};
export const GetAllPosts = async () => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.get_all_posts}?privacy=public`
    console.log('GetAllPosts \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('GetAllPosts Response', responseJson.data);
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
            console.log(Error);
        });
    return response
};

export const GetPostDetail = async ({ postId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.post.post}/${postId}/${endPoints.post.findOne}`
    console.log('GetPostDetail \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('GetPostDetail Response', responseJson.data);
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
            console.log(Error);
        });
    return response
};

export const GetHomePosts = async ({ page }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.get_home_posts}?${page ? 'page=' + page : ''}`
    console.log('GetHomePosts \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('GetHomePosts Response', responseJson.data);
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
            console.log(Error);
        });
    return response
};

export const GetAllMyPosts = async ({ }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.get_all_my_posts}`
    console.log('GetAllMyPosts \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .get(uri, params, config)
        .then(async responseJson => {
            console.log('GetAllMyPosts Response', responseJson.data);
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
            console.log(Error);
        });
    return response
};

export const GetUserPosts = async ({ userId,page }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.user_posts}/${userId}?${page?'page='+page:''}`
    console.log('GetUserPosts \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('GetUserPosts Response', responseJson.data);
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
            console.log(Error);
        });
    return response
};

export const LikePost = async ({ postId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.like_post}/${postId}`
    console.log('LikePost \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .post(uri, params, config)
        .then(async responseJson => {
            console.log('LikePost Response', responseJson.data);
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
            console.log(Error);
        });
    return response
};

export const UnLikePost = async ({ postId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.unlike_post}/${postId}`
    console.log('UnLikePost \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .put(uri, params, config)
        .then(async responseJson => {
            console.log('UnLikePost Response', responseJson.data);
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
            console.log(Error);
        });
    return response
};

export const CommentPost = async ({ postId, comment }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {
        content: comment
    }
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.comment_post}/${postId}`
    console.log('CommentPost \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .post(uri, params, config)
        .then(async responseJson => {
            console.log('CommentPost Response', responseJson.data);
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
            console.log(Error);
        });
    return response
};

export const BlockPost = async ({ postId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.block_post}/${postId}`
    console.log('BlockPost \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .put(uri, params, config)
        .then(async responseJson => {
            console.log('BlockPost Response', responseJson.data);
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
            console.log(Error);
        });
    return response
};

export const ReportPost = async ({ postId, reason }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {
        reason
    }
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.report_post}/${postId}`
    console.log('ReportPost \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .put(uri, params, config)
        .then(async responseJson => {
            console.log('ReportPost Response', responseJson.data);
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
            console.log(Error);
        });
    return response
};

// export const getFundraisingProjectCategories = async ({ }) => {
//     let response = null
//     const storeState = store.getState()
//     const token = storeState.user.userToken
//     let params = {}
//     const config = { headers: { "Authorization": `Bearer ${token}` } }
//     const uri = `${baseURL + endPoints.get_fundraisinproject_categories}`
//     console.log('getFundraisingProjectCategories \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
//     await axios
//         .get(uri, params, config)
//         .then(async responseJson => {
//             console.log('getFundraisingProjectCategories Response', responseJson.data);
//             if (responseJson.data) {
//                 if (responseJson.data.statusCode === 200) {
//                     response = responseJson.data
//                 } else {
//                     Toasts.Error(responseJson.data.message)
//                 }
//             }
//         })
//         .catch(Error => {
//             Toasts.Error(Error.response.data.message)
//             console.log(Error);
//         });
//     return response
// };

// export const getFundraisingProjectSubCategories = async ({ }) => {
//     let response = null
//     const storeState = store.getState()
//     const token = storeState.user.userToken
//     let params = {}
//     const config = { headers: { "Authorization": `Bearer ${token}` } }
//     const uri = `${baseURL + endPoints.get_fundraisinproject_subcategories}`
//     console.log('getFundraisingProjectSubCategories \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
//     await axios
//         .get(uri, params, config)
//         .then(async responseJson => {
//             console.log('getFundraisingProjectSubCategories Response', responseJson.data);
//             if (responseJson.data) {
//                 if (responseJson.data.statusCode === 200) {
//                     response = responseJson.data
//                 } else {
//                     Toasts.Error(responseJson.data.message)
//                 }
//             }
//         })
//         .catch(Error => {
//             Toasts.Error(Error.response.data.message)
//             console.log(Error);
//         });
//     return response
// };

export const getBanks = async ({ }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.get_banks}`
    console.log('getBanks \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .get(uri, params, config)
        .then(async responseJson => {
            console.log('getBanks Response', responseJson.data);
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
            console.log(Error);
        });
    return response
};





export const sharePost = async (postId) => {
    const WEB_API_KEY = 'AIzaSyBFj2Cxbg-Vpmg4gyno3thAGoKqKjPA-N8'
    try {
        const payload = {
            dynamicLinkInfo: {
                domainUriPrefix: 'https://aleronkong.page.link',
                link: `https://aleronkong.page.link/postDetail/${postId}`,
                androidInfo: {
                    androidPackageName: "com.aleronkong"
                },
                iosInfo: {
                    iosBundleId: "com.aleronkong",
                    iosAppStoreId: "123456789"
                },
                socialMetaTagInfo: {
                    socialTitle: 'Aleron Kong',
                    socialDescription: 'Checkout the post',
                    // socialImageLink: "https://aleron-kong.s3.amazonaws.com/20221227T125102772Z908900",
                    socialImageLink: "https://aleron-kong.s3.amazonaws.com/20221227T131601028Z458727"
                }
            },
        };
        const url = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${WEB_API_KEY}`
        console.log('shareVideo url->', url)
        console.log('payload url->', payload)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Accept': 'application/json',
                // 'Content-Type':'application/json'
            },
            body: JSON.stringify(payload),
        });
        const json = await response.json();
        console.log('shareVideo response->', json)
        const result = await Share.share({
            //message: 'Checkout the MovZ video',
            //message: 'Veja essa dança no MOVZ!',
            message: `Checkout the post no AleronKong app!${Platform.OS === 'ios' ? '' : ('\n' + json.shortLink)}`,
            // url: json.shortLink,
            url: Platform.OS === 'ios' ? json.shortLink : ''
            // title: `Checkout the vide: ${videoId}`,
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            //dismissed
        }
    }
    catch (error) {
        console.log('shareVideo error->', JSON.stringify(error))
    }
}


export const fundFundraisingProject = async ({ projectId, amount, paymentMethod }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {
        projectId,
        amount,
        paymentMethod
    }
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.fundFundraisingProject}`
    console.log('fundFundraisingProject \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .post(uri, params, config)
        .then(async responseJson => {
            console.log('fundFundraisingProject Response', responseJson.data);
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
            console.log(Error);
        });
    return response
};

export const updatePostComment = async ({ postId, commentId, comment }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {
        postId,
        commentId,
        content: comment
    }
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.post.post}/${endPoints.post.comment}/${endPoints.post.update}`
    console.log('updatePostComment \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .put(uri, params, config)
        .then(async responseJson => {
            console.log('updatePostComment Response', responseJson.data);
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
            console.log(Error);
        });
    return response
};

export const deletePostComment = async ({ postId, commentId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.post.post}/${postId}/${endPoints.post.comment}/${commentId}/${endPoints.post.delete}`
    console.log('deletePostComment \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .delete(uri, config)
        .then(async responseJson => {
            console.log('deletePostComment Response', responseJson.data);
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
            console.log(Error);
        });
    return response
};