import { filterObject } from './filterObject';

describe('filterObject', () => {
  it('should filter out falsy values', () => {
    const input = { a: 1, b: 0, c: null, d: 'test', e: undefined };
    const expectedOutput = { a: 1, d: 'test' };
    expect(filterObject(input)).toEqual(expectedOutput);
  });

  it('should return an empty object if all values are falsy', () => {
    const input = { a: 0, b: null, c: undefined };
    const expectedOutput = {};
    expect(filterObject(input)).toEqual(expectedOutput);
  });

  it('should return the same object if all values are truthy', () => {
    const input = { a: 1, b: 'test', c: true };
    const expectedOutput = { a: 1, b: 'test', c: true };
    expect(filterObject(input)).toEqual(expectedOutput);
  });
}); 