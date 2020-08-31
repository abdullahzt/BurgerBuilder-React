import reducer from './auth';

import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userID: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should store token and user id upon login', () => {
        expect(reducer(initialState, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'token',
            userID: 'userid'
        })).toEqual({
            ...initialState,
            token: 'token',
            userID: 'userid'
        })
    })
})