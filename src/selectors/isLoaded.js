export default (meta) => {
    if (!meta) {
        return false;
    }
    return meta.loadedAt && !meta.error;
}
