import axios from "axios";
import { Toasts } from "../../components";
import { endPoints, baseURL } from "../constants";
import store, { actions } from "../store";
import { setCurrentUser } from "../store/actions";

export const createGroup = async ({ coverPhoto, profilePhoto, description, name, privacy }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {
        coverPhoto,
        profilePhoto,
        description,
        name,
        privacy,
    }

    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.create_group}`
    console.log('createGroup \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .post(uri, params, config)
        .then(async responseJson => {
            console.log('createGroup Response', responseJson.data);
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

export const updateGroup = async ({ groupId, coverPhoto, profilePhoto, description, name, privacy }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {
        description,
        name,
        privacy,
    }
    coverPhoto ? params['coverPhoto'] = coverPhoto : null
    profilePhoto ? params['profilePhoto'] = profilePhoto : null

    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.update_group}/${groupId}`
    console.log('createGroup \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .put(uri, params, config)
        .then(async responseJson => {
            console.log('createGroup Response', responseJson.data);
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

export const getGroupDetail = async ({ groupId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.get_group_detail}/${groupId}`
    console.log('getGroupDetail \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getGroupDetail Response', responseJson.data);
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

export const getGroupMembers = async ({ groupId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.get_group_members}/${groupId}`
    console.log('getGroupMembers \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getGroupMembers Response', responseJson.data);
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


export const leaveGroup = async ({ groupId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.leave_group}/${groupId}`
    console.log('leaveGroup \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .put(uri, params, config)
        .then(async responseJson => {
            console.log('leaveGroup Response', responseJson.data);
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

export const joinGroup = async ({ groupId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.join_group}/${groupId}`
    console.log('joinGroup \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .put(uri, params, config)
        .then(async responseJson => {
            console.log('joinGroup Response', responseJson.data);
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

export const getGroups = async ({ query, type }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    //const  token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF3YWlzbWVociIsInN1YiI6IjYzNDdmZTMyMmYyOTE1YTEzMDQ0NTg3MCIsImlhdCI6MTY2OTcyNzEzOSwiZXhwIjoxNjcxMDIzMTM5fQ.R3ufEGiMMCEjaaop-LML9BOKAWFdNCS0VgPC9_oA3Uw'
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.get_groups}?${query ? 'query=' + query : ''}${type ? '&type=' + type : ''}`
    console.log('getGroups \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getGroups Response', responseJson.data);
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


    //code from postman
    // var config = {
    //     method: 'get',
    //     url: 'http://44.212.120.165/v1/group/find-all?query=js&type=forYou',
    //     headers: {
    //         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF3YWlzbWVociIsInN1YiI6IjYzNDdmZTMyMmYyOTE1YTEzMDQ0NTg3MCIsImlhdCI6MTY2ODUwNTg1NiwiZXhwIjoxNjY5ODAxODU2fQ.TKkixTAMeL7vqrf-lWSMv1kk5NBDA8bm6UTH_I_R4tU'
    //     }
    // };

    // axios(config)
    //     .then(function (response) {
    //         console.log('getGroups Response', response.data);
    //        // console.log(JSON.stringify(response.data));
    //         response = response.data.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    return response
};

export const getGroupJoinRequests = async ({ groupId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.get_group_join_requests}/${groupId}`
    console.log('getGroupJoinRequests \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getGroupJoinRequests Response', responseJson.data);
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

export const approveRejectGroupJoinRequest = async ({ groupId, userId, isApproved }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.approve_reject_group_join_request}/${groupId}/${userId}?isApproved=${isApproved}`
    console.log('approveRejectGroupJoinRequest \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .put(uri, params, config)
        .then(async responseJson => {
            console.log('approveRejectGroupJoinRequest Response', responseJson.data);
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

export const reportGroup = async ({ groupId, reason }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {
        reportedGroup: groupId,
        reason,
        type: 'group'
    }
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.report_group}`
    console.log('reportGroup \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .post(uri, params, config)
        .then(async responseJson => {
            console.log('reportGroup Response', responseJson.data);
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

export const deleteGroup = async ({ groupId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.delete_group}/${groupId}`
    console.log('deleteGroup \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .delete(uri, config)
        .then(async responseJson => {
            console.log('deleteGroup Response', responseJson.data);
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

export const getAllJoinedGroupsPosts = async ({ page }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {}
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.getAllJoinedGroupsPosts}?${page ? 'page=' + page:''}`
    console.log('getAllJoinedGroupsPosts \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getAllJoinedGroupsPosts Response', responseJson.data);
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