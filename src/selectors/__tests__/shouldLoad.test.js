import shouldLoad from '../shouldLoad';

const shouldLoadTrueMeta = {
    isLoading: false,
    loadedAt: false,
    error: false
};

const shouldLoadFalseMeta = {
    isLoading: true,
    loadedAt: false,
    error: false
};

const state = {
    service: {
        entities: {
            1: {
                attribute: 'value'
            }
        },
        meta: {
            1: shouldLoadTrueMeta,
            2: shouldLoadFalseMeta
        },
        children: {
            testEndpoint: {
                entities: {
                    1: {
                        attribute: 'value'
                    }
                },
                meta: {
                    1: shouldLoadTrueMeta,
                    2: shouldLoadFalseMeta
                },
                children: {
                    testEndpoint: {
                        entities: {
                            1: {
                                attribute: 'value'
                            }
                        },
                        meta: {
                            1: shouldLoadTrueMeta
                        }
                    }
                }
            }
        }
    }
};

const successSetup = [
    [
        ['service'],
        [1],
        true
    ],
    [
        ['service'],
        [2],
        false
    ],
    [
        ['service', 'testEndpoint'],
        [1, 1],
        false
    ],
    [
        ['service', 'testEndpoint', 'testEndpoint'],
        [2, 2, 1],
        true
    ]
];

describe('shouldLoad', () => {
    successSetup.forEach((setup, index) => {
        test('returns the correct flag. run id: ' + index, () => {
            expect(shouldLoad(state, setup[0], setup[1])).toEqual(setup[2]);
        });
    });
});