import loopDataToRetrieve from './loopDataToRetrieve';
import restAction from '../actions';

export default (props, dataToRetrieve) => {
    loopDataToRetrieve(dataToRetrieve, (reducer, propReducer, dataToRetrieve) => {
        const endpointInfo = this.props[propReducer];
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
}