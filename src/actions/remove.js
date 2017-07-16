import types from '../types';
import fetch from '../fetch';

export default (prefix) => (id) => (dispatch) => new Promise((resolve, reject) => {
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