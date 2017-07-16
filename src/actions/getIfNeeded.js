import { shouldLoad } from '../selectors';
import get from './get';

export default (prefix, filter) => (dispatch, getState) => {
    if (shouldLoad(getState(), prefix, filter)) {
        dispatch(get(prefix, filter));
    }
};