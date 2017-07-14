import selectMetaKey from './selectMetaKey';

const _shouldLoad = (meta) => !(meta.isLoading || meta.loadedAt || meta.error);

const shouldLoad = (state, prefix, filter) => {
    const currentState = state.children[prefix[0]];
    const metaKey = selectMetaKey(filter[0]);
    const meta = currentState.meta[metaKey];

    if (prefix.length > 1 && _shouldLoad(meta)) {
        return false;
    }

    if (prefix.length === 1) {
        return _shouldLoad(meta);
    }

    return shouldLoad(currentState, [...prefix].slice(1), [...filter].slice(1));
};

export default (state, prefix, filter) => shouldLoad({ children: state }, prefix, filter);