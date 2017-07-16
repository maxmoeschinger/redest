import types from '../types';

export default (prefix) => () => ({
    type: types.INVALIDATE
});