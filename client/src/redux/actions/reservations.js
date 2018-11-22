import { FETCH_RESERVATIONS } from "./actionTypes";
import axios from 'axios';

export const fetchReservations = (reservations) => {
  return {
    type: FETCH_RESERVATIONS,
    payload: reservations
  }
};

export const fetchAllReservations = (userId) => {
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