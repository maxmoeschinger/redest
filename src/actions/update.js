import types from '../types';
import fetch from '../fetch';

export default (prefix) => (id, data) => (dispatch) => new Promise((resolve, reject) => {
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