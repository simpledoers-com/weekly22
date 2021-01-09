import user from '../user';

describe('auth', () => {
  it('should resolve to true and valid userId for hardcoded token', async () => {
    const response = await user.auth('fakeToken');
    expect(response).toEqual({userId: 'fakeTokenId'});
  });
  it('should resolve with false for invalid token', async () => {
    const response = await user.auth('invalidToken');
    expect(response).toEqual({error: {type: 'unauthorized', message: 'Authorization Failed'}});
  });
});
