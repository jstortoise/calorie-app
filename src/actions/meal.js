import {
    MEAL_CREATE,
    MEAL_CREATE_SUCCESS,
    MEAL_CREATE_FAILURE,
    MEAL_EDIT,
    MEAL_EDIT_SUCCESS,
    MEAL_EDIT_FAILURE,
    MEAL_DELETE,
    MEAL_DELETE_SUCCESS,
    MEAL_DELETE_FAILURE,
    MEAL_LIST,
    MEAL_LIST_SUCCESS,
    MEAL_LIST_FAILURE,
    MEAL_SEARCH,
    MEAL_SEARCH_SUCCESS,
    MEAL_SEARCH_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* ====== MEAL ====== */

/* LIST */
export function listMealRequest() {
    return (dispatch) => {
        dispatch(listMeal());

        return axios.post('/api/meal/list')
        .then((response) => {
            dispatch(listMealSuccess(response.data));
        }).catch((error) => {
            dispatch(listMealFailure(error.response.data.code));
        });
    };
}

export function listMeal() {
    return {
        type: MEAL_LIST
    };
}

export function listMealSuccess(data) {
    return {
        type: MEAL_LIST_SUCCESS,
        data
    };
}

export function listMealFailure(error) {
    return {
        type: MEAL_LIST_FAILURE,
        error
    };
}

/* CREATE */
export function createMealRequest(mealname, calorie) {
    return (dispatch) => {
        // inform create API is starting
        dispatch(createMeal());

        return axios.post('/api/meal/create', { mealname, calorie })
        .then((response) => {
            dispatch(createMealSuccess());
        }).catch((error) => {
            dispatch(createMealFailure(error.response.data.code));
        });
    };
}

export function createMeal() {
    return {
        type: MEAL_CREATE
    };
}

export function createMealSuccess() {
    return {
        type: MEAL_CREATE_SUCCESS
    };
}

export function createMealFailure(error) {
    return {
        type: MEAL_CREATE_FAILURE,
        error
    };
}

/* EDIT */
export function editMealRequest(id, mealname, calorie) {
    return (dispatch) => {
        dispatch(editMeal());

        return axios.put('/api/meal/' + id, { mealname, calorie })
        .then((response) => {
            dispatch(editMealSuccess());
        }).catch((error) => {
            dispatch(editMealFailure(error.response.data.code));
        });
    };
}

export function editMeal() {
    return {
        type: MEAL_EDIT
    };
}

export function editMealSuccess() {
    return {
        type: MEAL_EDIT_SUCCESS
    };
}

export function editMealFailure(error) {
    return {
        type: MEAL_EDIT_FAILURE,
        error
    };
}

/* DELETE */
export function deleteMealRequest(id) {
    return (dispatch) => {
        dispatch(deleteMeal());

        return axios.delete('/api/meal/' + id)
        .then((response) => {
            dispatch(deleteMealSuccess());
        }).catch((error) => {
            dispatch(deleteMealFailure(error.response.data.code));
        });
    };
}

export function deleteMeal() {
    return {
        type: MEAL_DELETE
    };
}

export function deleteMealSuccess() {
    return {
        type: MEAL_DELETE_SUCCESS
    };
}

export function deleteMealFailure(error) {
    return {
        type: MEAL_DELETE_FAILURE,
        error
    };
}

/* SEARCH */
export function searchMealRequest(id) {
    return (dispatch) => {
        dispatch(searchMeal());

        return axios.get('/api/meal/search/' + id)
        .then((response) => {
            dispatch(searchMealSuccess(response.data));
        }).catch((error) => {
            dispatch(searchMealFailure(error.response.data.code));
        });
    };
}

export function searchMeal() {
    return {
        type: MEAL_SEARCH
    };
}

export function searchMealSuccess(info) {
    return {
        type: MEAL_SEARCH_SUCCESS,
        info
    };
}

export function searchMealFailure(error) {
    return {
        type: MEAL_SEARCH_FAILURE,
        error
    };
}
