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