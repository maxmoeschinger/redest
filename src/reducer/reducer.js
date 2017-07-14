import types from '../types';
import loadAll from './loadAll';
import loadOne from './loadOne';
import create from './create';
import deleteReducer from './delete';
import invalidate from './invalidate';
import update from './update';

export const newInitialState = () => ({
    entities: {},
    meta: {},
    children: {}
});

const reducer = (endpoints = [], prefix = []) => (state = newInitialState(), action) => {
    if (Array.isArray(action) && action.prefix.join('_') === prefix.join('_')) {
        switch (action.type) {
            case types.LOAD_ALL:
                return loadAll(state, action);
            case types.LOAD_ONE:
                return loadOne(state, action);
            case types.CREATE:
                return create(state, action);
            case types.UPDATE:
                return update(state, action);
            case types.DELETE:
                return deleteReducer(state, action);
            case types.INVALIDATE:
                return invalidate(state, action);
            default:
                return state;
        }
    }

    let children = { ...state.children };

    if (Array.isArray(endpoints)) {

        endpoints.forEach((endpoint) => {
            const currentPrefix = [...prefix, endpoint.name];
            const childEndpoints = endpoint.children;
            const childState = state.children ? state.children[endpoint.name] : undefined;

            children[endpoint.name] = reducer(childEndpoints, currentPrefix)(childState, action);
        });
    }

    return {
        ...state,
        children
    };
};

export default (reducerSetup) => ({
    redest: (state, action) => reducer(reducerSetup.endpoints)(state, action).children
});