import { FETCH_RESERVATIONS, REMOVE_RESERVATION } from "./actionTypes";
import axios from 'axios';

export const fetchReservations = reservations => {
  return {
    type: FETCH_RESERVATIONS,
    payload: reservations
  }
};

export const fetchAllReservations = userId => {
  return (dispatch) => {
		return axios.get(`http://localhost:3001/api/reservations/${userId}`)
			.then(response => {
				console.log(userId)
				dispatch(fetchReservations(response.data))
			})
			.catch(error => {
				throw(error);
			});
  };
};

export const removeReservation = removedReservationId => {
	return {
		type: REMOVE_RESERVATION,
		payload: removedReservationId
	}
}

export const deleteReservation = reservationId => {
	return (dispatch) => {
		return axios.delete(`http://localhost:3001/api/reservation/${reservationId}`)
			.then(response => {
				dispatch(removeReservation(reservationId))
			})
			.catch(error => {
				throw(error);
			});
	}
}