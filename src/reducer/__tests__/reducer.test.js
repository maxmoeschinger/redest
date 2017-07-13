import {
    newInitialState
} from '../reducer';

describe('reducer', () => {
    test('newInitialState is returning correct data', () => {
        const prefix = ['service', 'test'];
        const childrens = {};

        const result = {
            entities: {},
            meta: {},
            prefix: 'service_test',
            childrens
        };

        expect(newInitialState(prefix, childrens)).toEqual(result);
    });
});