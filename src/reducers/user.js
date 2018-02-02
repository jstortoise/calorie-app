import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    login: {
        status: 'INIT'
    },
    setting: {
        status: 'INIT',
        error: -1
    },
    status: {
        valid: false,
        isLoggedIn: false,
        isAdmin: false,
        calorie: 0,
        currentUser: ''
    },
    register: {
        status: 'INIT',
        error: -1
    },
    edit: {
        status: 'INIT',
        error: -1
    },
    delete: {
        status: 'INIT',
        error: -1
    },
    list: {
        status: 'INIT',
        data: [],
        error: -1
    },
    search: {
        status: 'INIT',
        error: -1,
        info: {}
    }
};


export default function user(state = initialState, action) {
    switch(action.type) {
        /* LOGIN */
        case types.USER_LOGIN:
            return update(state, {
                login: {
                    status: { $set: 'WAITING '}
                }
            });
        case types.USER_LOGIN_SUCCESS:
            return update(state, {
                login: {
                    status: { $set: 'SUCCESS' }
                },
                status: {
                    isLoggedIn: { $set: true },
                    isAdmin: { $set: action.loginInfo.role === 1 },
                    currentUser: { $set: action.loginInfo.username },
                    calorie: { $set: action.loginInfo.calorie }
                }
            });
        case types.USER_LOGIN_FAILURE:
            return update(state, {
                login: {
                    status: { $set: 'FAILURE' }
                }
            });

        /* logout */
        case types.USER_LOGOUT:
            return update(state, {
                status: {
                    isLoggedIn: { $set: false },
                    isAdmin: { $set: false },
                    currentUser: { $set: '' },
                    calorie: { $set: 0 }
                }
            });

        /* LIST */
        case types.USER_LIST:
            return update(state, {
                list: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.USER_LIST_SUCCESS:
            return update(state, {
                list: {
                    status: { $set: 'SUCCESS' },
                    data: { $set: action.data }
                }
            });
        case types.USER_LIST_FAILURE:
            return update(state, {
                list: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });

        /* REGISTER */
        case types.USER_REGISTER:
            return update(state, {
                register: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1}
                }
            });
        case types.USER_REGISTER_SUCCESS:
            return update(state, {
                register: {
                    status: { $set: 'SUCCESS' },
                }
            });
        case types.USER_REGISTER_FAILURE:
            return update(state, {
                register: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });

        /* EDIT */
        case types.USER_EDIT:
            return update(state, {
                edit: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1}
                }
            });
        case types.USER_EDIT_SUCCESS:
            return update(state, {
                edit: {
                    status: { $set: 'SUCCESS' },
                }
            });
        case types.USER_EDIT_FAILURE:
            return update(state, {
                edit: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });

        /* DELETE */
        case types.USER_DELETE:
            return update(state, {
                delete: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1}
                }
            });
        case types.USER_DELETE_SUCCESS:
            return update(state, {
                delete: {
                    status: { $set: 'SUCCESS' },
                }
            });
        case types.USER_DELETE_FAILURE:
            return update(state, {
                delete: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });

        /* SETTING */
        case types.USER_SETTING:
            return update(state, {
                setting: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.USER_SETTING_SUCCESS:
            return update(state, {
                setting: {
                    status: { $set: 'SUCCESS' },
                    dailyCalorie: { $set: action.calorie }
                },
                status: {
                    calorie: { $set: action.calorie }
                }
            });
        case types.USER_SETTING_FAILURE:
            return update(state, {
                setting: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });

        /* getinfo */
        case types.USER_GET_STATUS:
            return update(state, {
                status: {
                    isLoggedIn: { $set: true }
                }
            });
        case types.USER_GET_STATUS_SUCCESS:
            return update(state, {
                status: {
                    valid: { $set: true },
                    isAdmin: { $set: action.loginInfo.role === 1 },
                    currentUser: { $set: action.loginInfo.username },
                    calorie: { $set: action.loginInfo.calorie }
                }
            });
        case types.USER_GET_STATUS_FAILURE:
            return update(state, {
                status: {
                    valid: { $set: false },
                    isLoggedIn: { $set: false },
                    isAdmin: { $set: false },
                    calorie: { $set: 0 }
                }
            });

        /* SEARCH */
        case types.USER_SEARCH:
            return update(state, {
                search: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1}
                }
            });
        case types.USER_SEARCH_SUCCESS:
            return update(state, {
                search: {
                    status: { $set: 'SUCCESS' },
                    info: { $set: action.info }
                }
            });
        case types.USER_SEARCH_FAILURE:
            return update(state, {
                search: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });

        default:
            return state;
    }
}
