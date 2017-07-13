import selectOne from '../selectOne';

describe('selectOne', () => {
    test('selects the right value', () => {
        const state = {
            entities: {
                1: {
                    attribute: 'value'
                }
            },
            meta: {
                '1': {
                    isLoading: true
                }
            }
        };

        const response = {
            entities: [state.entities[1]],
            meta: state.meta['1']
        };

        expect(selectOne(state, 1)).toEqual(response);
    });
});