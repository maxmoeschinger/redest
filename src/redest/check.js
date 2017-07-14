import { getIfNeeded } from '../actions';
import { selectMeta, isLoaded } from '../selectors';

const getFilter = (filter) => {
    if (filter === 'all') {
        return null;
    } else {
        return filter;
    }
};

const check = (props, redestState, dataToRetrieve, parentPrefix = [], parentFilter = []) => {
    dataToRetrieve.forEach((dataPoint) => {
        const prefix = [...parentPrefix, dataPoint.endpoint];
        const meta = selectMeta(redestState, parentPrefix, parentFilter);
        const isLoaded = isLoaded(meta);

        props.dispatch(getIfNeeded(prefix, [...parentFilter, getFilter(dataPoint.select(props))]));

        if (Array.isArray(dataPoint.children) && isLoaded) {
            meta.ids.forEach((id) => {
                check(props, redestState, dataPoint.children, prefix, [...parentFilter, id]);
            });
        }
    });
};

export default check;