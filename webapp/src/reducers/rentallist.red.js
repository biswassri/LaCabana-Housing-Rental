import { FETCH_RENTALS_INIT, FETCH_RENTALS_SUCCESS, FETCH_RENTALS_FAIL } from "../actions/type";
  
  const INITIAL_STATE = {
    rentals: {
      data: [],
      errors: [],
      isFetching: false,
      isUpdating: false
    }
  };
  
  export const rentalsReducer = (state = INITIAL_STATE.rentals, action) => {
    switch (action.type) {
      case FETCH_RENTALS_INIT: {
        return { ...state, data: [], errors: [], isFetching: true };
      }
      case FETCH_RENTALS_SUCCESS: {
        return { ...state, data: action.payload, isFetching: false };
      }
      case FETCH_RENTALS_FAIL: {
        return { ...state, errors: action.payload, isFetching: false };
      }
      default:
        return state;
    }
  };