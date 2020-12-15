import {LOGIN_SUCCESS_ACT, LOGIN_FAILURE_ACT , LOGOUT_ACT, CLEAR_LOGIN_ERROR_ACT} from "../actions/type";

const INITIAL_STATE = {
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    location: "",
    phone: "",
    isLogin: false,
    errors: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS_ACT : {
            return {
                ...state,
                isLogin: true,
                errors: [],
                username: action.username,
                email: action.email,
                firstname: action.firstname,
                lastname: action.lastname,
                location: action.location,
                phone: action.phone,
              };
        }
        case LOGIN_FAILURE_ACT : {
            return {
                ...state,
                isLogin: false,
                errors: action.errors,
              };
        }
        case LOGOUT_ACT: {
            return INITIAL_STATE
        }
        case CLEAR_LOGIN_ERROR_ACT: {
            return {
                ...state,
                isLogin: false,
                errors: [],
            };
        }
        default:
            return state;
    }
};