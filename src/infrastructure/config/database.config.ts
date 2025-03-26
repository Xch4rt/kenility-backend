import { MongooseModuleOptions } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

export const databaseConfig: MongooseModuleOptions = {
  uri: 'MONGODB_URI',
};
