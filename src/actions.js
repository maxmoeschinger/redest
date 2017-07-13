import fetch from './fetch';
import { typesCreator } from './reducer/reducer';
import {
    shouldLoadSingle,
    shouldLoadAll
} from './selectors';

const getIfNeeded = (types, baseUrl, prefix) => (id) => (dispatch, getState) => {
    if (shouldLoadSingle(getState()[prefix], id)) {
        dispatch(get(types, baseUrl)(id));
    }
};

const getAllIfNeeded = (types, baseUrl, prefix) => (filter = null) => (dispatch, getState) => {
    if (shouldLoadAll(getState()[prefix], filter)) {
        dispatch(getAll(types, baseUrl)(filter));
    }
};

const getAll = (types, baseUrl) => (filter = null) => (dispatch) => {
    dispatch({
        type: types.LOAD_ALL,
        status: 'start',
        payload: {
            filter
        }
    });

    fetch(baseUrl, 'GET', filter).then(
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

const get = (types, baseUrl) => (id) => (dispatch) => {
    dispatch({
        type: types.LOAD_ONE,
        status: 'start',
        payload: id
    });

    fetch(baseUrl + '/' + id, 'GET').then(
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

const create = (types, baseUrl) => (data) => (dispatch) => new Promise((resolve, reject) => {
    fetch(baseUrl, 'POST', data).then(
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

const update = (types, baseUrl) => (id, data) => (dispatch) => new Promise((resolve, reject) => {
    fetch(baseUrl + '/' + id, 'PUT', data).then(
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

const remove = (types, baseUrl) => (id) => (dispatch) => new Promise((resolve, reject) => {
    fetch(baseUrl + '/' + id, 'DELETE').then(
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

const invalidate = (types) => () => ({
    type: types.INVALIDATE
});

const fillActions = (prefix, baseUrl) => {
    const actions = {
        getIfNeeded,
        getAllIfNeeded,
        get,
        getAll,
        create,
        update,
        remove,
        invalidate
    };
    const types = typesCreator(prefix);
    let response = {};
    Object.keys(actions).forEach((actionKey) => {
        response[actionKey] = actions[actionKey](types, baseUrl, prefix)
    });
    return response;
};

export default (prefix, baseUrl) => fillActions(prefix, baseUrl)