import currentTimestamp from '../currentTimestamp';

describe('currentTimestamp', () => {
    test('returns an integer', () => {
        expect(currentTimestamp()).toBeGreaterThan(0);
    });
});