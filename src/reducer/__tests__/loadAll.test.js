import loadAll from '../loadAll';
import { selectMetaKey } from '../../selectors/index';

describe('loadAll', () => {
    test('start is creating the correct meta', () => {
        const action = {
            status: 'start',
            payload: {
                filter: null
            }
        };
        const beforeState = {
            entities: {},
            meta: {}
        };
        const afterState = {
            entities: {},
            meta: {
                [selectMetaKey(action.payload.filter)]: {
                    isLoading: true,
                    error: false,
                    loadedAt: null
                }
            }
        };

        expect(loadAll(beforeState, action)).toEqual(afterState);
    });

    test('success is updating the store', () => {
        const testEntity = {
            id: 1,
            name: 'test'
        };

        const action = {
            status: 'success',
            payload: {
                filter: null,
                entities: {
                    [testEntity.id]: testEntity
                }
            }
        };

        const beforeState = {
            entities: {},
            meta: {}
        };

        const response = loadAll(beforeState, action);

        const afterState = {
            entities: {
                [testEntity.id]: testEntity
            },
            meta: {
                [selectMetaKey(action.payload.filter)]: {
                    isLoading: false,
                    error: false,
                    ids: ['1'],
                    loadedAt: response.meta[selectMetaKey(action.payload.filter)].loadedAt
                }
            }
        };

        expect(response).toEqual(afterState);
    });
});