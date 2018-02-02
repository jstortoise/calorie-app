import {
    USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT,
    USER_REGISTER,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_EDIT,
    USER_EDIT_SUCCESS,
    USER_EDIT_FAILURE,
    USER_DELETE,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAILURE,
    USER_LIST,
    USER_LIST_SUCCESS,
    USER_LIST_FAILURE,
    USER_SETTING,
    USER_SETTING_SUCCESS,
    USER_SETTING_FAILURE,
    USER_GET_STATUS,
    USER_GET_STATUS_SUCCESS,
    USER_GET_STATUS_FAILURE,
    USER_SEARCH,
    USER_SEARCH_SUCCESS,
    USER_SEARCH_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* ====== USER ====== */

/* LOGIN */
export function loginRequest(username, password) {
    return (dispatch) => {
        dispatch(login());

        return axios.post('/api/user/login', { username, password })
        .then((response) => {
            dispatch(loginSuccess(response.data.loginInfo));
        }).catch((error) => {
            dispatch(loginFailure());
        });
    };
}

export function login() {
    return {
        type: USER_LOGIN
    };
}

export function loginSuccess(loginInfo) {
    return {
        type: USER_LOGIN_SUCCESS,
        loginInfo
    };
}

export function loginFailure() {
    return {
        type: USER_LOGIN_FAILURE
    };
}

/* LOGOUT */
export function logoutRequest() {
    return (dispatch) => {
        return axios.post('/api/user/logout')
        .then((response) => {
            dispatch(logout());
        });
    };
}

export function logout() {
    return {
        type: USER_LOGOUT
    };
}

/* LIST */
export function listUserRequest() {
    return (dispatch) => {
        // inform list API is starting
        dispatch(listUser());

        return axios.post('/api/user/list')
        .then((response) => {
            dispatch(listUserSuccess(response.data));
        }).catch((error) => {
            dispatch(listUserFailure(error.response.data.code));
        });
    };
}

export function listUser() {
    return {
        type: USER_LIST
    };
}

export function listUserSuccess(data) {
    return {
        type: USER_LIST_SUCCESS,
        data
    };
}

export function listUserFailure(error) {
    return {
        type: USER_LIST_FAILURE
    };
}

/* REGISTER */
export function registerRequest(username, password, calorie) {
    return (dispatch) => {
        // inform register API is starting
        dispatch(register());

        return axios.post('/api/user/register', { username, password, calorie })
        .then((reponse) => {
            dispatch(registerSuccess());
        }).catch((error) => {
            dispatch(registerFailure(error.response.data.code));
        });
    };
}

export function register() {
    return {
        type: USER_REGISTER
    };
}

export function registerSuccess() {
    return {
        type: USER_REGISTER_SUCCESS
    };
}

export function registerFailure(error) {
    return {
        type: USER_REGISTER_FAILURE,
        error
    };
}

/* EDIT */
export function editUserRequest(id, username, password, calorie) {
    return (dispatch) => {
        // inform edit API is starting
        dispatch(editUser());

        return axios.put('/api/user/' + id, { username, password, calorie })
        .then((reponse) => {
            dispatch(editUserSuccess());
        }).catch((error) => {
            dispatch(editUserFailure(error.response.data.code));
        });
    };
}

export function editUser() {
    return {
        type: USER_EDIT
    };
}

export function editUserSuccess() {
    return {
        type: USER_EDIT_SUCCESS
    };
}

export function editUserFailure(error) {
    return {
        type: USER_EDIT_FAILURE,
        error
    };
}

/* DELETE */
export function deleteUserRequest(id) {
    return (dispatch) => {
        // inform delete API is starting
        dispatch(deleteUser());

        return axios.delete('/api/user/' + id)
        .then((reponse) => {
            dispatch(deleteUserSuccess());
        }).catch((error) => {
            dispatch(deleteUserFailure(error.response.data.code));
        });
    };
}

export function deleteUser() {
    return {
        type: USER_DELETE
    };
}

export function deleteUserSuccess() {
    return {
        type: USER_DELETE_SUCCESS
    };
}

export function deleteUserFailure(error) {
    return {
        type: USER_DELETE_FAILURE,
        error
    };
}

/* SETTING */
export function settingRequest(calorie) {
    return (dispatch) => {
        // inform register API is starting
        dispatch(setting());

        return axios.post('/api/user/setting', { calorie })
        .then((response) => {
            dispatch(settingSuccess(response));
        }).catch((error) => {
            dispatch(settingFailure(error.response.data.code));
        });
    };
}

export function setting() {
    return {
        type: USER_SETTING
    };
}

export function settingSuccess(response) {
    return {
        type: USER_SETTING_SUCCESS,
        calorie: parseInt(response.data.calorie)
    };
}

export function settingFailure(error) {
    return {
        type: USER_SETTING_FAILURE,
        error
    };
}

/* GET STATUS */
export function getStatusRequest() {
    return (dispatch) => {
        dispatch(getStatus());
        return axios.get('/api/user/getinfo')
        .then((response) => {
            dispatch(getStatusSuccess(response.data.info));
        }).catch((error) => {
            dispatch(getStatusFailure());
        });
    };
}

export function getStatus() {
    return {
        type: USER_GET_STATUS
    };
}

export function getStatusSuccess(info) {
    return {
        type: USER_GET_STATUS_SUCCESS,
        loginInfo: info
    };
}

export function getStatusFailure() {
    return {
        type: USER_GET_STATUS_FAILURE
    };
}

/* SEARCH */
export function searchUserRequest(id) {
    return (dispatch) => {
        dispatch(searchUser());

        return axios.get('/api/user/search/' + id)
        .then((response) => {
            dispatch(searchUserSuccess(response.data));
        }).catch((error) => {
            dispatch(searchUserFailure(error.response.data.code));
        });
    };
}

export function searchUser() {
    return {
        type: USER_SEARCH
    };
}

export function searchUserSuccess(info) {
    return {
        type: USER_SEARCH_SUCCESS,
        info
    };
}

export function searchUserFailure(error) {
    return {
        type: USER_SEARCH_FAILURE,
        error
    };
}

