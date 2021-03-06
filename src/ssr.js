import fillActions from './actions';

export default (store, axiosOptions) => {
    const state = store.getState();
    return Promise.all(
        state.redest._fetchActionLog.map(action => {
            return fillActions(action.payload.info, axiosOptions).get(
                store.dispatch
            );
        })
    );
};
