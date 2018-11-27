// Initial (starting) state
import { FETCH_RESERVATIONS, REMOVE_RESERVATION } from "../actions/actionTypes";
export const initialState = {
    reservations: []
}

// Our root reducer starts with the initial state
// and must return a representation of the next state
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RESERVATIONS:
            return { ...state, reservations: action.payload };
        case REMOVE_RESERVATION:
            return {...state, reservations: state.reservations.filter(reservation => {
                return reservation.id !== action.payload
            })}
        default:
            return state;
    }
}

export default reducer;