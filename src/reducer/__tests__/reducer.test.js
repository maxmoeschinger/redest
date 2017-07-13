import {
    newInitialState,
    default as reducer
} from '../reducer';

describe('reducer', () => {
    test('newInitialState is returning correct data', () => {
        const prefix = ['service', 'test'];
        const children = {};

        const result = {
            entities: {},
            meta: {},
            prefix: 'service_test',
            children
        };

        expect(newInitialState(prefix, children)).toEqual(result);
    });
    test('correct state is created', () => {
        const action = {
            type: '@@INIT'
        };

        const result = {
            service: {
                entities: {},
                meta: {},
                prefix: 'service',
                children: {
                    endpoint: {
                        entities: {},
                        meta: {},
                        prefix: 'service_endpoint',
                        children: {}
                    }
                }
            }
        };

        const redestSetup = {
            endpoints: [
                {
                    name: 'service',
                    children: [
                        {
                            name: 'endpoint'
                        }
                    ]
                }
            ]
        };

        const store = reducer(redestSetup);

        expect(store.redest(undefined, action)).toEqual(result);
    });
});