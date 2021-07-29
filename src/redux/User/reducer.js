import {FETCH_USERS_REQUEST,FETCH_USERS_SUCCESS,FETCH_USERS_FAILURE,CHANGE_CURRENT_USER,CHANGE_CURRENT_POST} from "./ActionType";

const initialState = {
    loading: true,
    posts: [],
    error: "",
    curUser: 1,
    curPost: 1
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST: return{
            ...state,
            loading: true
        };
        case FETCH_USERS_SUCCESS: return{
            loading: false,
            posts: action.payload,
            error: "",
        };
        case FETCH_USERS_FAILURE: return{
            loading: false,
            posts: [],
            error: action.payload,
        };
        case CHANGE_CURRENT_USER: return{
            ...state,
            curUser: action.payload
        };
        case CHANGE_CURRENT_POST: return{
            ...state,
            curPost: action.payload
        };
        default: return state
    }
}

export default reducer;