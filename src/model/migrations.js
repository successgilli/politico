import pdb from './query';

const partyTable = `CREATE TABLE IF NOT EXISTS parties (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(20) NOT NULL,
    hqAddress VARCHAR(255) NOT NULL,
    logoUrl VARCHAR(255) NOT NULL
);`;

const officeTable = `CREATE TABLE IF NOT EXISTS offices (
    id SERIAL PRIMARY KEY NOT NULL,
    type VARCHAR(20) NOT NULL,
    name VARCHAR(20) NOT NULL
);`;

const userTable = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY NOT NULL,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    hashedPassword VARCHAR(100) NOT NULL,
    otherName VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL UNIQUE,
    phoneNumber VARCHAR(11) NOT NULL,
    passportUrl VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN DEFAULT false
);`; 

const candidateTable = `CREATE TABLE IF NOT EXISTS candidates (
     id serial,
     candidateName VARCHAR(100) NOT NULL,
     userId integer NOT NULL,
     partyId integer NOT NULL,
     officeId integer NOT NULL,
    candidateId integer NOT NULL,
    PRIMARY KEY (officeId, userId)
);`;
const createTables = () => {
  pdb(`${officeTable} ${partyTable} ${userTable} ${candidateTable}`, ()=>{
    console.log('table created');
  })
};

export default createTables;
