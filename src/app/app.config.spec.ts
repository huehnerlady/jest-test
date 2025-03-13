import { getSearchParam } from './app.config';

describe('getSearchParam', () => {
  beforeEach(() => {
    jest.spyOn(window, 'location', 'get').mockReturnValue({ search: '?testParam=value123&flag=true' } as Location);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the correct search parameter value', () => {
    expect(getSearchParam('testParam')).toBe('value123');
  });

  it('should return undefined for non-existing parameters', () => {
    expect(getSearchParam('nonExisting')).toBeUndefined();
  });

  it('should return true for a parameter with value "true"', () => {
    expect(getSearchParam('flag')).toBe(true);
  });

  it('should return false for a parameter with value "false"', () => {
    jest.spyOn(window, 'location', 'get').mockReturnValue({ search: '?flag=false' } as Location);
    expect(getSearchParam('flag')).toBe(false);
  });

  it('should return a trimmed string for other values', () => {
    jest.spyOn(window, 'location', 'get').mockReturnValue({ search: '?param=  testValue  ' } as Location);
    expect(getSearchParam('param')).toBe('testValue');
  });
});
