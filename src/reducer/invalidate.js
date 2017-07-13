import resetMeta from './resetMeta';

export default (state, action) => ({
    ...state,
    meta: resetMeta(state.meta)
})