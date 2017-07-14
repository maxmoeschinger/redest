export default (filter = null) => {
    if (filter) {
        if (typeof filter === 'object') {
            return Object.keys(filter).map((filterKey) => filterKey + '_' + filter[filterKey]).join('_');
        }
        return filter;
    }

    return 'all';
}