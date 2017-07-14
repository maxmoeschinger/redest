import fetch from './fetch';
import types from './types';

import {
    shouldLoad
} from './selectors';

export const getIfNeeded = (prefix, filter) => (dispatch, getState) => {
    if (shouldLoad(getState(), prefix, filter)) {
        dispatch(getAll(prefix, filter));
    }
};

export const getAll = (prefix, filter = null) => (dispatch) => {
    dispatch({
        type: types.LOAD_ALL,
        status: 'start',
        payload: {
            filter
        }
    });

    fetch('/' + prefix.join('/'), 'GET', filter).then(
        (entities) => {
            let newEntities = {};
            entities.forEach((entity) => {
                newEntities[entity.id] = entity;
            });
            dispatch({
                type: types.LOAD_ALL,
                status: 'success',
                payload: {
                    entities: newEntities,
                    filter
                }
            });
        },
        (error) => {
            dispatch({
                type: types.LOAD_ALL,
                status: 'error',
                payload: {
                    error,
                    filter
                }
            });
        }
    );
};

export const get = (prefix) => (id) => (dispatch) => {
    dispatch({
        type: types.LOAD_ONE,
        status: 'start',
        payload: id
    });

    fetch('/' + prefix.join('/') + '/' + id, 'GET').then(
        (entity) => {
            dispatch({
                type: types.LOAD_ONE,
                status: 'success',
                payload: entity
            });
        },
        (error) => {
            dispatch({
                type: types.LOAD_ONE,
                status: 'error',
                payload: {
                    id,
                    error
                }
            });
        }
    );
};

export const create = (prefix) => (data) => (dispatch) => new Promise((resolve, reject) => {
    fetch('/' + prefix.join('/'), 'POST', data).then(
        (success) => {
            dispatch({
                type: types.CREATE,
                payload: success
            });
            resolve(success);
        },
        (error) => {
            reject(error);
        }
    );
});

export const update = (prefix) => (id, data) => (dispatch) => new Promise((resolve, reject) => {
    fetch('/' + prefix.join('/') + '/' + id, 'PUT', data).then(
        (success) => {
            dispatch({
                type: types.UPDATE,
                payload: success
            });
            resolve(success);
        },
        (error) => {
            reject(error);
        }
    );
});

export const remove = (prefix) => (id) => (dispatch) => new Promise((resolve, reject) => {
    fetch('/' + prefix.join('/') + '/' + id, 'DELETE').then(
        (success) => {
            dispatch({
                type: types.DELETE,
                payload: id
            });
            resolve(success);
        },
        (error) => {
            reject(error);
        }
    );
});

export const invalidate = (prefix) => () => ({
    type: types.INVALIDATE
});