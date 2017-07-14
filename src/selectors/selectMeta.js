import selectMetaKey from './selectMetaKey';
import isLoaded from './isLoaded';

const selectMeta = (state, prefix, filter) => {
    const currentState = state.children[prefix[0]];
    const metaKey = selectMetaKey(filter[0]);
    const meta = currentState.meta[metaKey];

    if (!isLoaded(meta) || prefix.length === 1) {
        return meta;
    }

    return selectMeta(currentState, [...prefix].shift(), [...filter].shift())
};

export default (state, prefix, filter) => selectMeta({ children: state }, prefix, filter);