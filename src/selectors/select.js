import selectMetaKey from './selectMetaKey';

export default (state, prefix, filter) => {
    const metaKey = selectMetaKey(filter);
    const meta = state.meta[metaKey];
    let entities = [];
    if (meta && meta.ids) {
        entities = meta.ids.map((id) => state.entities[id]).filter((entity) => entity);
    }
    return {
        entities: entities,
        meta: meta
    }
}

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
