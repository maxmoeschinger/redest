export default (state, id) => ({
    entities: [state.entities[id] ? state.entities[id] : null].filter((value) => value),
    meta: state.meta[id] ? state.meta[id] : {}
});