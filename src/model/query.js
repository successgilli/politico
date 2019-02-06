import { Pool } from 'pg';
import dotenv from 'dotenv';
import config from '../config';

dotenv.config();
// const dbConfig = config[process.env.NODE_env];
const connect = process.env.DATABASE_URL;
// const pool = new Pool(dbConfig);
const pool = new Pool({connectionString: connect });
const pdb = ( text, param, fnx) =>{
  let value;
  if (!param) {
    value = pool.query(text, fnx);
  }
  else if (param.constructor == Array) {
    value = pool.query(text, param, fnx);
  }  
  else {
    value = pool.query(text, param);
  }   
  return value;
}
export default pdb;