export const STORED_USER = 'STORED_USER';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

export const getUsers = (userDetails) => ({
    type: STORED_USER,
    data: {userDetails}
});

export const addUser = (details) => ({
    type: ADD_USER,
    data: {details}
});

export const updateUser = (details) => ({
    type: UPDATE_USER,
    data: {details}
});

export const deleteUser = (id) => ({
    type: DELETE_USER,
    data: {id}
});