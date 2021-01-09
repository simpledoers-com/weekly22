export type ErrorResponse = { error: {type: string, message: string}}
export type AuthResponse = ErrorResponse | {userId: string}
import logger from '@exmpl/utils/logger';
function auth(bearerToken: string): Promise<AuthResponse>{
  logger.debug(`services::user.ts::auth()`);
    return new Promise(function(resolve, reject){      
      const token = bearerToken.replace('Bearer ','');
      logger.debug(`services::user.ts::auth() .. token::[${token}]`);
      if(token === 'fakeToken'){
        return resolve({userId: 'fakeTokenId'});
      }
      return resolve({error: {type: 'unauthorized', message: 'Authorization Failed'}});
    });
}

export default { auth: auth };
