# weekly21
Typescript - React - Redux Learning

```
npm i io-ts fp-ts
```

```tsx
// Users.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Users } from './Users';

test('renders Users', () => {
    const users =  [
        {id: 3, name: 'Maximiliano', email: 'maximilianou@gmail.com', website: 'https://github.com/maximilianou', 
        address: { street: 'Roca', suite: 'D', city: 'Buenos Aires', geo: { lat: '-33', lng: '44'}}},
        {id: 5, name: 'Joaquin', email: 'jou@gmail.com', website: 'https://github.com/joaquin', 
        address: { street: '', suite: '', city: '', geo: { lat: '3', lng: '4'}}},
        {id: 7, name: 'Julian', email: 'juu@gmail.com', website: 'https://github.com/julian', 
        address: { street: '', suite: '', city: '', geo: { lat: '1', lng: '2'}}},
//        {id: '13', name: 'Julian', email: 'juu@gmail.com', website: 'https://github.com/julian', 
//        address: { street: '', suite: '', city: '', geo: { lat: 33, lng: 44}}},
//        {id: 15, name: 'Julian', email: 'juu@gmail.com', website: 'https://github.com/julian', 
//        address: { street: '', suite: '', city: '', geo: { lat: 33, lng: 44}}},
    ]; 
    render(<Users users={users} />);
    const elemMax = screen.getAllByText(/Maximiliano/g);
    expect(elemMax[0]).toBeInTheDocument();
    const elemJoa = screen.getAllByText(/Joaquin/g);
    expect(elemJoa[0]).toBeInTheDocument();
    const elemJul = screen.getAllByText(/Julian/g);
    expect(elemJul[0]).toBeInTheDocument();
});

```

```tsx
// Users.tsx
import { isRight } from 'fp-ts/lib/Either';
import * as t from 'io-ts';

const Address = t.type({
    street: t.string,
    suite: t.string,
    city: t.string,
    geo: t.type({ 
        lat: t.string, 
        lng: t.string
    }),
})

const User = t.type({
  id: t.number,
  name: t.string,
  email: t.string,
  website: t.string,
  address : Address,
})

type AddressType = {
    street: string,
    suite: string,
    city: string,
    geo: {
        lat: string,
        lng: string
    }
}

type UserType = {
    id: number,
    name: string,
    email: string,
    website: string,
    address: AddressType
}

type UsersProps = {
    users: UserType[]
}

export const Users: React.FC<UsersProps> = ( { users } ) => (
        <>
          <ul>
              {users.map( (u) => 
                  ( isRight(User.decode(u)) && <li key={u.id}>({u.id}) <span>{u.name}</span>, {u.email}</li>)
                  || 
                  ( !isRight(User.decode(u)) && <li key={u.id}>Not Matching {u.email}</li>)
                  )}
          </ul>
        </>
)

```

 - Create API project structure
```sh
# Makefile
create-api:
	mkdir api && cd api && npm -y init
	cd api && npm i express-openapi-validator	
	cd api && npm i @types/node typescript 
	cd api && npm install ts-node -D
	cd api &&  ./node_modules/.bin/tsc --init --rootDir src --outDir ./bin --esModuleInterop --lib ES2019 --module commonjs --noImplicitAny true
	cd api && mkdir src
	cd api && echo "console.log('Running.. TypeScript app')" > src/app.ts
    cd api && ./node_modules/.bin/tsc
	cd api && node ./bin/app.js
```
 - Run initial 
package.json
```json
  "scripts": {
    "build": "./node_modules/.bin/tsc ",
    "start": "node ./bin/app.js ",
    "dev": "./node_modules/.bin/ts-node ./src/app.ts ",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/node": "^14.14.16",
    "express-openapi-validator": "^4.10.1",
    "typescript": "^4.1.3"
  },
  "devDependencies": {
    "ts-node": "^9.1.1"
  }

```

```ts
//server.ts
import express from 'express'
import {Express} from 'express-serve-static-core'

export async function createServer(): Promise<Express> {
  const server = express()
  server.get('/', (req, res) => {
    res.send('Hello world!!!')
  })
  return server
}
```

```ts
//app.ts
import {createServer} from './utils/server'

createServer()
  .then(server => {
    server.listen(3000, () => {
      console.info(`Listening on http://localhost:3000`)
    })
  })
  .catch(err => {
    console.error(`Error: ${err}`)
  })
```


```yml
# config/openapi.yml
openapi: 3.0.3
info:
  title: API example
  description: API example declaration
  termsOfService: http://swagger.io/term/
  contact: 
    email: maximilianou@gmail.com
  license: 
    name: MIT
    url: https://opensource.org/license/MIT
  version: 1.0.0
externalDocs:
  description: Find out more about Swagger
  url: http://swagger.io
servers:
  - url: /api/v1
tags:
  - name: greeting
    description: Greeting APIs
paths:
  /hello:
    get:
      description: Return message to the caller
      tags:
        - greeting
      operationId: hello
      parameters:
        - name: name
          required: false
          in: query
          description: The name of the caller
          schema:
            type: string
      responses:
        200:
          description: success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HelloResponse'
components:
  schemas:
    HelloResponse:
      type: object
      additionalProperties: false
      required: 
        - message
      properties:
        message:
          type: string
```

```ts
//types/swagger-routes-express/index.d.ts
declare module 'swagger-routes-express'
```

```sh
create-api:
	mkdir api && cd api && npm -y init
	cd api && npm i express-openapi-validator	
	cd api && npm i @types/node typescript 
	cd api && npm install ts-node -D
	cd api &&  ./node_modules/.bin/tsc --init --rootDir src --outDir ./bin --esModuleInterop --lib ES2019 --module commonjs --noImplicitAny true
	cd api && mkdir src
	cd api && echo "console.log('Running.. TypeScript app')" > src/app.ts
    cd api && ./node_modules/.bin/tsc
	cd api && node ./bin/app.js
	cd api && npm i express @types/express
	cd api && npm i connect express-openapi-validator swagger-routes-express validator yamljs @types/validator @types/yamljs
    cd api && npm i swagger-ui-express @types/swagger-ui-express

```

```ts
// src/api/controllers/greeting.ts
import * as express from 'express'
 
export function hello(req: express.Request, res: express.Response): void {
  const name = req.query.name || 'stranger'
  const message = `Hello, ${name}!`
  res.json({
    "message": message
  })
}
```

```ts
// src/utils/server.ts
import express from 'express';
import { Express } from 'express-serve-static-core'
import * as OpenApiValidator  from 'express-openapi-validator';
import { connector, summarise} from 'swagger-routes-express';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

import * as api from '../api/controllers/greeting';

export async function createServer(): Promise<Express> {
  const yamlSpecFile = './config/openapi.yml';
  const apiDefinition = YAML.load(yamlSpecFile);
  const apiSummary = summarise(apiDefinition);

  const server = express();
  
  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDefinition));
  
  const validatorOprions = {
    coerceType: true,
    apiSpec: yamlSpecFile,
    validateRequests: true,
    validateResponses: true
  }

  server.use(OpenApiValidator.middleware(validatorOprions));

  server.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status).json({
      error: {
        type: 'request_validation',
        message: err.message,
        errors: err.errors
      }
    });
  });

  const connect = connector(api, apiDefinition, {
    onCreateRoute: (method: string, descriptor: any[]) => {
      console.log(`${method}: ${descriptor[0]} : ${(descriptor[1] as any).name}`);
    }
  });
  connect(server);

  return server;
}

```

```
npm run dev

curl http://localhost:3021/api/v1/hello
{"message":"Hello, stranger"}

curl http://localhost:3021/api/v1/hello?name=Max
{"message":"Hello, Max"}
```


```sh
maximilianou@instrument:~/projects/weekly21$ cd api/
maximilianou@instrument:~/projects/weekly21/api$ mkdir -p src/api/services
maximilianou@instrument:~/projects/weekly21/api$ touch src/api/services/user.ts
maximilianou@instrument:~/projects/weekly21/api$ touch src/api/controllers/user.ts
maximilianou@instrument:~/projects/weekly21/api$ mkdir -p src/api/utils
maximilianou@instrument:~/projects/weekly21/api$ touch src/api/utils/express.ts

```

```ts
// src/services/user.ts
export type ErrorResponse = { error: {type: string, message: string}}
export type AuthResponse = ErrorResponse | {userId: string}
function auth(bearerToken: string): Promise<AuthResponse>{
    return new Promise(function(resolve, reject){
      const token = bearerToken.replace('Bearer','');
      if(token === 'fakeToken'){
        resolve({userId: 'fakeTokenId'});
        return;
      }
      resolve({error: {type: 'unauthorized', message: 'Authorization Failed'}});
    });
}
export default { auth: auth };
```

```ts
```

api/
```
	npm i tsconfig-paths
```

package.json
```json
{
    "start": "node  -r tsconfig-paths/register ./bin/app.js ",
    "dev": "./node_modules/.bin/ts-node -r tsconfig-paths/register ./src/app.ts ",
}
```

tsconfig.json
```json
    "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    "paths": {
      "@exmpl/*": ["src/*","bin/*"]
    },                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
```

```
npm i morgan morgan-body
npm i -D @types/morgan
```

```ts
// api/utils/express_dev_logger.ts
import express from 'express';
export const expressDevLogger = 
  (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const startHrTime = process.hrtime();
  console.log(`Request: ${req.method} ${req.url} at ${new Date().toUTCString()}, User-Agent: ${req.get('User-Agent')}`);
  console.log(`Request Body: ${JSON.stringify(req.body)}`);
  const [oldWrite, oldEnd] = [res.write, res.end];
  const chunks: Buffer[] = [];
  (res.write as unknown) = function(chunk: any): void {
    chunks.push(Buffer.from(chunk));
    (oldWrite as Function).apply(res, arguments);
  }
  res.end = function(chunk: any): any  {
    if(chunk){
      chunks.push(Buffer.from(chunk));
    }
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    console.log(`Response ${res.statusCode} ${elapsedTimeInMs.toFixed(3)} ms`);
    const body = Buffer.concat(chunk).toString('utf-8');
    console.log(`Response Body: ${body}`);
    (oldEnd as Function).apply(res, arguments);
  }
  next();
}
```

```ts
// api/utils/server.ts
...
  server.use(bodyParser.json());
  server.use(morgan(`:method :url :status :response-time ms - :res[content-length]`));
  morganBody(server);
  server.use(expressDevLogger);
...
```


```
npm i dotenv-extended dotenv-parse-variables
npm i -D @types/dotenv-parse-variables
```

package.json
```json
{
    "start": "ENV_FILE=./config/.env.prod node  -r tsconfig-paths/register ./bin/app.js ",
    "dev": "ENV_FILE=./config/.env.dev  ./node_modules/.bin/ts-node -r tsconfig-paths/register ./src/app.ts ",
}
```

server.ts
```ts
...
  server.use(bodyParser.json());
  if(config.morganLogger){
    server.use(morgan(`:method :url :status :response-time ms - :res[content-length]`));
  }
  if(config.morganBodyLogger){
    morganBody(server);
  }
  if(config.exmplDevLogger){
    server.use(expressDevLogger); 
  }
  const connect = connector(api, apiDefinition, {
...
```

```
npm i winston
```

src/utils/logger.ts
```ts
import winston from 'winston';
import config from '@exmpl/config';
const prettyJson = winston.format.printf( info => {
  if(info.message.constructor === Object){
    info.message = JSON.stringify(info.message, null, 4);
  }
  return `${info.timestamp} ${info.label || '-'} ${info.level}: ${info.message} `;
});
const logger = winston.createLogger({
  level: config.loggerLevel === 'silent' ? undefined : config.loggerLevel,
  silent: config.loggerLevel === 'silent',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.prettyPrint(),
    winston.format.splat(),
    winston.format.simple(),
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
    prettyJson,
  ),
  defaultMeta: { service: 'api-example' },
  transports: [new winston.transports.Console({})],
});
export default logger;
```

config/.env.schema
```
...
# see src/utils/logger.ts for the list of values
LOGGER_LEVEL=
```

### TDD

#### Unit test
```
npm i -D jest @types/jest ts-jest
./node_modules/.bin/ts-jest config:init
```

```
cat jest.config.js 
```

```js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@exmpl/(.*)':'<rootDir>/src/$1'
  },
};
```
package.json
```json
{
    "test:unit": "ENV_FILE=./config/.env.test ./node_modules/.bin/jest"
}
```

```
touch config/.env.test
```

src/api/services/__tests__/user.ts
```ts
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
```

```
npm run test:unit
```

#### HTTP unit test

```
npm i -D supertest @types/supertest

mkdir src/api/controllers/__tests__
touch src/api/controllers/__tests__/greeting.ts
```

src/api/controllers/__tests__/greeting.ts
```ts
import request from 'supertest';
import {Express} from 'express-serve-static-core';
import {createServer} from '@exmpl/utils/server';
import { doesNotMatch } from 'assert';
let server: Express;
beforeAll(async () => {
  server = await createServer();
});
describe('GET /hello', () => {
  it('should return 200 and valid response when param list is empty', async (done) => {
    request(server)
      .get(`/api/v1/hello`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.body).toMatchObject({'message':'Hello, stranger!'});
        done();
      })
  });
  it('should return 200 and valid response when name param is set', async (done) => {
    const nameParam = 'MaximilianoTestName';
    request(server)
      .get(`/api/v1/hello?name=${nameParam}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.body).toMatchObject({'message': `Hello, ${nameParam}!`});
        done();
      });
  });
  it.skip('should return 400 and valid error response when param is empty', async (done) => {
    request(server)
      .get(`/api/v1/hello?name=`)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.body).toMatchObject({'error': {
          type: 'request_validation',
          message: expect.stringMatching(/Empty.*\'name\'/),
          errors: expect.anything()
        }});
      });
  });
});
```

```
npm run test:u src/api/controllers/__tests__/greeting.ts
```

src/api/controllers/__tests__/greeting.ts
```ts
import request from 'supertest';
import {Express} from 'express-serve-static-core';
import {createServer} from '@exmpl/utils/server';
let server: Express;
beforeAll(async () => {
  server = await createServer();
});
describe('GET /hello', () => {
  it('should return 200 and valid response when param list is empty', async (done) => {
    request(server)
      .get(`/api/v1/hello`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.body).toMatchObject({'message':'Hello, stranger!'});
        done();
      })
  });
  it('should return 200 and valid response when name param is set', async (done) => {
    const nameParam = 'MaximilianoTestName';
    request(server)
      .get(`/api/v1/hello?name=${nameParam}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.body).toMatchObject({'message': `Hello, ${nameParam}!`});
        done();
      });
  });
  it('should return 400 and valid error response when param is empty', async (done) => {
    request(server)
      .get(`/api/v1/hello?name=`)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.body).toMatchObject({'error': {
          type: 'request_validation',
          message: expect.stringMatching(/Empty.*\'name\'/),
          errors: expect.anything()
        }});
        done();
      });
  });
});
describe('GET /goodbye', () => {
  it('should return 200 and valid response to authorization with fakeToken request', async (done) => {
    request(server)
      .get(`/api/v1/goodbye`)
      .set('Authorization', 'Bearer fakeToken')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.body).toMatchObject({'message': 'Goodbye, fakeTokenId!'});
        done();
      });
  });
  it('shourd return 401 and valid error response to invalid auth token', async (done) => {
    request(server)
      .get(`/api/v1/goodbye`)
      .set('Authorization', 'Bearer invalidFakeToken')
      .expect(401)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.body).toMatchObject(
          {error: {type: 'unauthorized', message: 'Authorization Failed'}});
        done();
      });
  });  
  it('should return 401 and valid error response if authorization header is missed', async (done) => {
    request(server)
      .get(`/api/v1/goodbye`)
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.body).toMatchObject({'error': {
          type: 'request_validation',
          message: 'Authorization header required',
          errors: expect.anything()
        }});
        done();
      });
    });
});
```

#### TDD Coverage, Verbose
package.json
```json
{    
  "test:u": "ENV_FILE=./config/.env.test ./node_modules/.bin/jest --verbose --coverage"
}
```

https://losikov.medium.com/part-4-node-js-express-typescript-unit-tests-with-jest-5204414bf6f0

controllers/__tests__/user_failure.ts
```ts
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
```


### Mongo, mongoose, bcrypt
```
npm i mongoose bcrypt mongodb-memory-server
npm i -D @types/mongoose @types/bcrypt @types/mongodb-memory-server 
npm i -D faker @types/faker

```

```
maximilianou@instrument:~/projects/weekly22$ cat api/config/.env.schema 
MORGAN_LOGGER=
MORGAN_BODY_LOGGER=
EXMPL_DEV_LOGGER=
# see src/utils/logger.ts for the list of values
LOGGER_LEVEL=
MONGO_URL=
MONGO_CREATE_INDEX=
MONGO_AUTO_INDEX=

maximilianou@instrument:~/projects/weekly22$ cat api/config/.env.dev
MORGAN_LOGGER=true
MORGAN_BODY_LOGGER=true
EXMPL_DEV_LOGGER=true
LOGGER_LEVEL=debug
MONGO_URL=mongodb://localhost/exmpl
MONGO_AUTO_INDEX=true

maximilianou@instrument:~/projects/weekly22$ cat api/config/.env.prod
MORGAN_LOGGER=true
LOGGER_LEVEL=http
MONGO_URL=mongodb://localhost/exmpl
MONGO_AUTO_INDEX=false

maximilianou@instrument:~/projects/weekly22$ cat api/config/.env.test 
MONGO_URL=inmemory
MONGO_AUTO_INDEX=true

```

```ts
// src/config/index.ts
import dotenvExtended from 'dotenv-extended';
import dotenvParseVariables from 'dotenv-parse-variables';
type LogLevel = 'silent' | 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';
const env = dotenvExtended.load({
  path: process.env.ENV_FILE,
  defaults: './config/.env.defaults',
  schema: './config/.env.schema',
  includeProcessEnv: true,
  silent: false,
  errorOnMissing: true,
  errorOnExtra: true
});
const parsedEnv = dotenvParseVariables(env);
interface Config {
  morganLogger: boolean,
  morganBodyLogger: boolean,
  exmplDevLogger: boolean,
  loggerLevel: LogLevel, 
  mongo: {
    url: string,
    useCreateIndex: boolean,
    autoIndex: boolean,
  },
};
const config : Config = {
  morganLogger: parsedEnv.MORGAN_LOGGER as boolean,
  morganBodyLogger: parsedEnv.MORGAN_BODY_LOGGER as boolean,
  exmplDevLogger: parsedEnv.EXMPL_DEV_LOGGER as boolean,
  loggerLevel: parsedEnv.LOGGER_LEVEL as LogLevel,
  mongo: {
    url: parsedEnv.MONGO_URL as string,
    useCreateIndex: parsedEnv.MONGO_CREATE_INDEX as boolean,
    autoIndex: parsedEnv.MONGO_AUTO_INDEX as boolean,
  },
};
export default config;
```

```ts
// src/utils/db.ts
/* istanbul ignore file */
import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';
import config from '@exmpl/config';
import logger from '@exmpl/utils/logger';
mongoose.Promise = global.Promise;
mongoose.set('debug', process.env.DEBUG !== undefined);
const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: config.mongo.useCreateIndex,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  autoIndex: config.mongo.autoIndex,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};
class MongoConnection {
  private static _instance: MongoConnection;
  private _mongoServer?: MongoMemoryServer;
  static getInstance(): MongoConnection {
    if(!MongoConnection._instance){
      MongoConnection._instance = new MongoConnection();
    }
    return MongoConnection._instance;
  };
  public async open(): Promise<void> {
    try{ 
      if(config.mongo.url === 'inmemory'){
        logger.debug('connecting to inmemory mongodb');
        this._mongoServer = new MongoMemoryServer();
        const mongoUrl = await this._mongoServer.getConnectionString();
        await mongoose.connect(mongoUrl, opts);
      }else{
        logger.debut(`connecting to mongodb: ${config.mongo.url}`);
        mongoose.connect(config.mongo.url, opts);
      }
      mongoose.connection.on('connected', () => {
        logger.info('Mongo: connected.);
      });
      mongoose.connection('disconnected', () => {
        logger.info('Mongo: disconnected.);
      });
      mongoose.connection.on('error', (err) => {
        logger.error(`Mongo: ${String(err)}`);
        if(err.name === "MongoNetworkError"){
          setTimeout( () => {
            mongoose.connect(config.mongo.url, opts).catch(() => {}); 
          }, 5000);
        }
      });
    }catch(err){
      logger.error(`db.open: ${err}`);
      throw err;
    }
  }
  public async close(): Promise<void> {
    try{ 
      await mongoose.disconnect();
      if(config.mongo.url === 'inmemory'){
        await this._mongoServer!.stop();
      }
    }catch(err){
      logger.error(`db.open: ${err}`); 
      throw err;
    }
  }
};
export default MongoConnection.getInstance();
```

```ts
// src/app.ts
import logger from '@exmpl/utils/logger';
import {createServer} from '@exmpl/utils/server';
import db from '@exmpl/utils/db';
db.open()
  .then( () =>  
    createServer() )
  .then( (server: { listen: (arg0: number, arg1: () => void) => void; }) => {
      server.listen( 3021, () => {
          logger.info(`Listening on port: ${3021}`);
      })
  })
  .catch( (err: any) => {
      logger.error(`Error:: ${err}`);
  });
```


Reference:

 - Auth

https://www.npmjs.com/package/swagger-routes-express

https://swagger.io/docs/specification/authentication/

https://swagger.io/docs/specification/2-0/authentication/


https://losikov.medium.com/backend-api-server-development-with-node-js-from-scratch-to-production-fe3d3b860003

https://cevo.com.au/post/docker-cli-integration-with-amazon-ecs/

https://github.com/piotrwitek/react-redux-typescript-guide

https://dev.to/busypeoples/notes-on-typescript-pick-exclude-and-higher-order-components-40cp

https://www.freecodecamp.org/news/a-mental-model-to-think-in-typescript-2/amp/


- Medical English Vocabulary - 
https://www.englishclub.com/english-for-work/medical-vocabulary.htm

- Web HTML - 
https://www.w3.org/TR/
