import restAction from '../actions';

const getData = (state, tree = []) => {
    if (tree.length > 1) {
        const children = state[tree[0]].children;
        let newTree = [...tree];
        newTree.shift();
        return getData(children, newTree)
    }

    return state[tree[0]];
};

const check = (props, dataToRetrieve, parentEndpoints = []) => {
    dataToRetrieve.forEach((dataPoint) => {
        const prefix = [...parentEndpoints, dataPoint.endpoint];
        const data = getData(props.redest, prefix);
        const actions = restAction(endpointInfo.prefix, endpointInfo.baseUrl);
        const filter = dataToRetrieve.select(this.props);
        if (filter && typeof filter === 'object') {
            this.props.dispatch(actions.getAllIfNeeded(filter));
        } else if (filter === 'all') {
            this.props.dispatch(actions.getAllIfNeeded(null));
        } else if (filter) {
            this.props.dispatch(actions.getIfNeeded(filter));
        }
    });
};

export default () => {};