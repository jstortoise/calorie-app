import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    create: {
        status: 'INIT',
        error: -1
    },
    list: {
        status: 'INIT',
        data: [],
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
    search: {
        status: 'INIT',
        error: -1,
        info: {}
    },
    totalCalorie: 0
};

export default function meal(state = initialState, action) {

    switch(action.type) {
        /* LIST */
        case types.MEAL_LIST:
            return update(state, {
                list: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1}
                }
            });
        case types.MEAL_LIST_SUCCESS:
            return update(state, {
                list: {
                    status: { $set: 'SUCCESS' },
                    data: { $set: action.data.meals }
                },
                totalCalorie : { $set: action.data.totalCalorie }
            });
        case types.MEAL_LIST_FAILURE:
            return update(state, {
                list: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });

        /* CREATE */
        case types.MEAL_CREATE:
            return update(state, {
                create: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1}
                }
            });
        case types.MEAL_CREATE_SUCCESS:
            return update(state, {
                create: {
                    status: { $set: 'SUCCESS' },
                }
            });
        case types.MEAL_CREATE_FAILURE:
            return update(state, {
                create: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });

        /* EDIT */
        case types.MEAL_EDIT:
            return update(state, {
                edit: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1}
                }
            });
        case types.MEAL_EDIT_SUCCESS:
            return update(state, {
                edit: {
                    status: { $set: 'SUCCESS' },
                }
            });
        case types.MEAL_EDIT_FAILURE:
            return update(state, {
                edit: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });

        /* DELETE */
        case types.MEAL_DELETE:
            return update(state, {
                delete: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1}
                }
            });
        case types.MEAL_DELETE_SUCCESS:
            return update(state, {
                delete: {
                    status: { $set: 'SUCCESS' },
                }
            });
        case types.MEAL_DELETE_FAILURE:
            return update(state, {
                delete: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });

        /* SEARCH */
        case types.MEAL_SEARCH:
            return update(state, {
                search: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1}
                }
            });
        case types.MEAL_SEARCH_SUCCESS:
            return update(state, {
                search: {
                    status: { $set: 'SUCCESS' },
                    info: { $set: action.info }
                }
            });
        case types.MEAL_SEARCH_FAILURE:
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
