import fetch from '../fetch';
import types from '../types';

export default (prefix, filter = null) => (dispatch) => {
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