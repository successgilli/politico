import { Pool } from 'pg';
import dotenv from 'dotenv';
import config from '../config';

dotenv.config();
const dbConfig = config[process.env.NODE_env];
const pool = new Pool(dbConfig);

const pdb = ( text, param, fnx) =>{
  let value;
  if (param.constructor==Array) {
    value = pool.query(text, param, fnx);
  }  
  else {
    value = pool.query(text, param);
  }   
  return value;
}
export default pdb;