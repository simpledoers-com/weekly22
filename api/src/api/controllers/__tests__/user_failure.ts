import request from 'supertest';
import {Express} from 'express-serve-static-core';

import UserService from '@exmpl/api/services/user';
import {createServer} from '@exmpl/utils/server';

jest.mock('@exmpl/api/services/user');

let server: Express;
beforeAll( async () => {
  server = await createServer();
});

describe('auth failure', () => {
  it('sould return 500 and valid response if auth reject', async (done) => {
    (UserService.auth as jest.Mock).mockRejectedValue(new Error());
    request(server)
      .get(`/api/v1/goodbye`)
      .set('Authorization', 'Bearer fakeToken')
      .expect(500)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.body).toMatchObject({error: {
          type: 'internal_server_error', 
          message: 'Internal Server Error'
        }});
        done();
      });
  });
});