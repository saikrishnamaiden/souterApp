import { ActionTypes } from "../constants";

const getCity = payload => {
  return {
    type: ActionTypes.GET_CITY_REQUEST,
    payload: payload
  };
};



const getEvents = payload => {
  return {
    type: ActionTypes.GET_EVENTS_REQUEST,
    payload: payload
  };
};

const getFeebacks = payload => {
  return {
    type: ActionTypes.GET_FEEBACKS_REQUEST,
    payload: payload
  };
};
const getComments = payload => {
  return {
    type: ActionTypes.GET_COMMENTS_REQUEST,
    payload: payload
  };
};

export { getCity,getEvents,getFeebacks,getComments};
