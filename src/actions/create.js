import types from '../types';
import fetch from '../fetch';

export default (prefix) => (data) => (dispatch) => new Promise((resolve, reject) => {
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