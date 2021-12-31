import { combineReducers } from 'redux';

import { STORED_USER, ADD_USER, UPDATE_USER, DELETE_USER } from "./actions"

let dataState = { userDetails: [] };

const userReducer = (state = dataState, action) => {
    switch (action.type) {
        case STORED_USER:
            let { userDetails } = action.data;

            return {...state, userDetails};

        case ADD_USER:
            let { details } = action.data;

            let clone = JSON.parse(JSON.stringify(state.userDetails));

            clone.unshift(details); 

            return {...state, userDetails: clone};

        case UPDATE_USER:{
            let { details } = action.data;

            let clone = JSON.parse(JSON.stringify(state.userDetails));

            const index = clone.findIndex((obj) => obj._id === details._id);

            if (index !== -1) clone[index] = details;

            return {...state, userDetails: clone};
        }

        case DELETE_USER:{
            let { id } = action.data;

            let clone = JSON.parse(JSON.stringify(state.userDetails));

            const index = clone.findIndex((obj) => obj._id === id);

            if (index !== -1) clone.splice(index, 1);

            return {...state, userDetails: clone};
        }

        default:
            return state;
    }
};

// Combine all the reducers
const rootReducer = combineReducers({userReducer});

export default rootReducer;
