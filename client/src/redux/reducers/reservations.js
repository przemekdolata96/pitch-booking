// Initial (starting) state
import { FETCH_RESERVATIONS } from "../actions/actionTypes";
export const initialState = {
    reservations: []
}

// Our root reducer starts with the initial state
// and must return a representation of the next state
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RESERVATIONS:
            return { ...state, reservations: action.payload }
        default:
            return state;
    }
}

export default reducer;