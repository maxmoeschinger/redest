import { select, selectOne } from '../selectors/index';
import loopDataToRetrieve from './loopDataToRetrieve';

export default (dataToRetrieve, state, props) => {
    let newProps = {};
    loopDataToRetrieve(dataToRetrieve, (reducer, propReducer, dataToRetrieve) => {
        newProps[propReducer] = {
            prefix: state[reducer].prefix,
            baseUrl: state[reducer].baseUrl
        };
        let propName = reducer;
        if (dataToRetrieve.propName) propName = dataToRetrieve.propName;
        const filter = dataToRetrieve.select(props);
        if (filter && typeof filter === 'object') {
            newProps[propName] = select(state[reducer], filter);
        } else if (filter === 'all') {
            newProps[propName] = select(state[reducer]);
        } else if (filter) {
            newProps[propName] = selectOne(state[reducer], filter);
        }
    });
    return newProps;
};