import {createServer} from './utils/server';
import logger from '@exmpl/utils/logger';

logger.debug(`app.ts::init()`);
createServer()
  .then( server => {
      server.listen( 3021, () => {
          logger.info(`Listening on port: ${3021}`);
      })
  })
  .catch( err => {
      logger.error(`Error:: ${err}`);
  });
