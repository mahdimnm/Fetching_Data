import axios from "axios";
import {FETCH_USERS_REQUEST,FETCH_USERS_SUCCESS,FETCH_USERS_FAILURE,CHANGE_CURRENT_USER,CHANGE_CURRENT_POST} from "./ActionType";

export const fetchUsersRequest = () => {
    return{
        type: FETCH_USERS_REQUEST
    };
}

export const fetchUsersSuccess = (data) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: data
    };
}

export const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    };
}

export const changeCurrentUser = (curUser) => {
    return {
        type: CHANGE_CURRENT_USER,
        payload: curUser
    };
}

export const changeCurrentPost = (curPost) => {
    return {
        type: CHANGE_CURRENT_POST,
        payload: curPost
    };
}

export const fetchPosts = () => {
    return (dispatch) => {
        dispatch(fetchUsersRequest());
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(response => {
                dispatch(fetchUsersSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchUsersFailure(error.message));
            })
    };
}