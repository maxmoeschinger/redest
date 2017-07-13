import reducer from './reducer';

const buildReducer = (endpoints, parentEndpoints = []) => endpoints.map((endpoint) => {
    const prefix = [...parentEndpoints, endpoint.name];
    const endpoint = path + '/' + endpoint.name;
    return reducer(prefix, buildReducer(endpoint.childrens, prefix));
});

export default (reducerSetup) => buildReducer(reducerSetup.endpoints);