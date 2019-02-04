import db from '../model/db';
import pdb from '../model/query';

const counter = 1;
class OfficeController {
  // create office
  static createOffice(req, res) {
    let name;
    let type;
    const keys = Object.keys(req.body); 
    keys.forEach((keyFromUser) => { 
      if (keyFromUser.toLowerCase() === 'name') {
        name = req.body[keyFromUser];
      }
      if (keyFromUser.toLowerCase() === 'type') {
        type = req.body[keyFromUser];
      }
    })
    const random = Math.floor((Math.random() * 100000) + counter);
    const office = {
      id: random,
      name,
      type, 
    }   
    db.push(office);
    const response = {
      status: 200,
      data: [{ id: db[db.length - 1].id, name: db[db.length - 1].name, type: db[db.length - 1].type }]
    }
    console.log(db);
    res.json(response);
  }

  // get all offices
  static getAll(req, res) {
    const text = 'SELECT * FROM parties';
    pdb(text, (err, result)=> {
      if (err) {
        throw err;
      }
      console.log('collecting from parties');
      res.json(result.rows);
  })
  }

  static insertParty(req, res) {
    const text = 'INSERT INTO parties (name, logo) VALUES ($1,$2)';
    const param =[req.body.name,req.body.logo];
    pdb(text,param, (err, result)=>{
      if (err) {
        throw err;
      }
      res.json('successful');
    })
  }
  static getAllOffices(req, res) {
    const dbOffice = [];
    db.forEach((item, index) => {
      if (item.hasOwnProperty('type')) {
        dbOffice.push(db[index]);
      }
    })
    const response = {
      status: 200,
      data: dbOffice,
    }
    res.json(response);
  }

  // for get specific office route
  static getSpecificOffice(req, res) {
    let officeIndex = 'notFound';
    const errorResponse = {
      status: 400,
      error: 'Office not found'
    };
    db.forEach((eachOfficeInDb, index) => {
      if (eachOfficeInDb.id === (parseInt(req.params.officeId,10))) {
        officeIndex = index;
      }
    })
    if ( isNaN (req.params.officeId) || !db[officeIndex] ) {
      res.json(errorResponse);
    }
    else if ( parseInt(req.params.officeId, 10) === db[officeIndex].id) {
      const response = {
        status: 200,
        data: [{ id: db[officeIndex].id,
          type: db[officeIndex].type,
          name: db[officeIndex].name
        },
        ]
      }
      res.json(response)
    }
    else {
      res.json(errorResponse);
    }
  }
}

export default OfficeController;
