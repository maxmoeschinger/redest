import settings from '../settings';
import addPrefix from '../addPrefix';
import loadAll from './loadAll';
import loadOne from './loadOne';
import create from './create';
import deleteReducer from './delete';
import invalidate from './invalidate';
import update from './update';


export const newInitialState = (prefix) => ({
    entities: {},
    meta: {},
    prefix: prefix.join('_'),
    children: {}
});

export const types = addPrefix(settings.internalPropPrefix, {
    LOAD_ALL: 'LOAD_ALL',
    LOAD_ONE: 'LOAD_ONE',
    UPDATE: 'UPDATE',
    CREATE: 'CREATE',
    DELETE: 'DELETE',
    INVALIDATE: 'INVALIDATE'
});

const buildReducer = (endpoints, parentEndpoints = []) => {
    let reducers = {};
    endpoints.forEach((endpoint) => {
        const prefix = [...parentEndpoints, endpoint.name];
        reducers[endpoint.name] = reducer(prefix, buildReducer(endpoint.children, prefix));
    });
    return reducers;
};

const reducer = (prefix, children) => (state = newInitialState(prefix), action) => {
    if (action.prefix === prefix.join('_')) {
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
    } else if (Object.keys(children).length > 0) {
        let newChildren = {};
        Object.keys(children).forEach((childrenKey) => {
            newChildren[childrenKey] = reducer([...prefix, childrenKey])(state.children[childrenKey], action);
        });
        return {
            ...state,
            children: newChildren
        }
    }

    return state;
};

export default (reducerSetup) => buildReducer(reducerSetup.endpoints);