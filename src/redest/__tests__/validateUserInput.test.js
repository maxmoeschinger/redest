import validateUserInput from '../validateUserInput';

const erroredConfigs = [
    {},
    ['test'],
    [{}],
    [{ endpoint: 'test' }],
    [{ endpoint: 'test', select: 'test' }],
];

describe('validateUserInput', () => {
    beforeEach(() => {
        console.error = jest.fn((error) => {
            throw new Error(error);
        });
    });

    test('to throw when invalid configuration', () => {
        erroredConfigs.forEach((config) => {
            expect(() => validateUserInput(config)).toThrow();
        });
    });
});