import db from '../model/db';

const counter = 1;
class OfficeController {
  //create office
  static createOffice(req, res) {
    let name;
    let type;
    const keys = Object.keys(req.body); 
    keys.forEach(keyFromUser => { 
      
      if(keyFromUser.toLowerCase() === 'name'){
        name = req.body[keyFromUser];
      }
      if(keyFromUser.toLowerCase() === 'type'){
        type = req.body[keyFromUser];
      }} )
    let random = Math.floor((Math.random() * 100000) + counter);
    let office = {
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
}

export default OfficeController;