import loopDataToRetrive from './loopDataToRetrive';

const hasError = meta => !!meta.error && !meta.isLoading;

export default (dataToRetrieve, props) => {
    let error = false;
    loopDataToRetrive(dataToRetrieve, props, info => {
        if (info.onlyActions) return;
        if (info.onlyPagination) return;
        if (!error) {
            const meta = props[info.reducer].meta;
            if (meta) error = hasError(props[info.reducer].meta);
        }
    });
    return error;
};
