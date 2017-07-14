import selectMeta from '../selectMeta';

describe('selectMeta', () => {
    test('returns the correct meta', () => {
        const state = {
            service: {
                entities: {
                    1: {
                        attribute: 'value'
                    }
                },
                meta: {
                    1: {
                        isLoading: true
                    }
                },
                children: {
                    testEndpoint: {
                        entities: {
                            1: {
                                attribute: 'value'
                            }
                        },
                        meta: {
                            1: {
                                isLoading: true
                            }
                        }
                    }
                }
            }
        };

        const prefix = ['service'];
        const filter = [1];

        const response = {
            isLoading: true
        };

        expect(selectMeta(state, prefix, filter)).toEqual(response);
    });
});