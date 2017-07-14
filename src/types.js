import addPrefix from './addPrefix';
import settings from './settings';

export default addPrefix(settings.internalPropPrefix, {
    LOAD_ALL: 'LOAD_ALL',
    LOAD_ONE: 'LOAD_ONE',
    UPDATE: 'UPDATE',
    CREATE: 'CREATE',
    DELETE: 'DELETE',
    INVALIDATE: 'INVALIDATE'
});