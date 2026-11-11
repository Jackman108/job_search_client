import { toBearerAuthorization, stripBearerPrefix } from './toBearerAuthorization';

describe('toBearerAuthorization', () => {
    it('prefixes raw JWT', () => {
        expect(toBearerAuthorization('abc.def.ghi')).toBe('Bearer abc.def.ghi');
    });

    it('keeps existing Bearer prefix', () => {
        expect(toBearerAuthorization('Bearer abc.def.ghi')).toBe('Bearer abc.def.ghi');
    });

    it('rejects empty token', () => {
        expect(() => toBearerAuthorization('  ')).toThrow('Token is missing');
    });
});

describe('stripBearerPrefix', () => {
    it('strips once', () => {
        expect(stripBearerPrefix('Bearer tok')).toBe('tok');
        expect(stripBearerPrefix('tok')).toBe('tok');
    });
});
