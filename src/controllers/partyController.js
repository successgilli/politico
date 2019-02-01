import db from '../model/db';

const counter = 1;
class PartyController {
  //create party
  static createParty(req, res) {
    let name;
    let hqAddress;
    let logoUrl;
    const keys = Object.keys(req.body); 
    keys.forEach(keyFromUser => { 
      
      if(keyFromUser.toLowerCase() === 'name'){
        name = req.body[keyFromUser];
      }
      if(keyFromUser.toLowerCase() === 'hqaddress'){
        hqAddress = req.body[keyFromUser];
      }
      if(keyFromUser.toLowerCase() === 'logourl')
        logoUrl = req.body[keyFromUser];
    } )
    let random = Math.floor((Math.random() * 100000) + counter);
    let party = {
      id: random,
      name,
      hqAddress,
      logoUrl 
    }   
    db.push(party);
    const response = {
      status: 200,
      data: [{ id: db[db.length - 1].id, name: db[db.length - 1].name }]
    }
    res.json(response);
  }
//for get specific party route
  static getSpecificParty(req, res) {
    let partyIndex = 'notFound';
    const errorResponse = {
      status: 400,
      error: 'Party not found'
    };
    db.forEach((eachPartyInDb, index) => {
      if (eachPartyInDb.id === (parseInt(req.params.partyId,10))) {
        partyIndex = index;
      }
    })
  
    if ( isNaN(req.params.partyId) || !db[partyIndex] ){
      res.json(errorResponse);
    }
    else if ( parseInt(req.params.partyId, 10) === db[partyIndex].id) {
      const response = {
        status: 200,
        data: [{ id: db[partyIndex].id,
          name: db[partyIndex].name,
          logoUrl: db[partyIndex].logoUrl
        }
        ]
      }
      res.json(response)
    }
    else {
      res.json(errorResponse);
    }
  }
// get all parties

  static getAllParties (req, res) {
    const response = {
      status: 200,
      data: db
    }
    res.json(response);
  }
//edit party name
  static editPartyName(req, res) {
    let partyIndex = 'not found';
    db.forEach((eachParty, index) => {
      if (eachParty.id === parseInt(req.params.partyId, 10)) {
        partyIndex = index;
      }         
    })
    if (typeof partyIndex === 'number') {
      db[partyIndex].name = req.params.name;
      let response = {
        status: 200,
        data: [
          {
            db: db[partyIndex].id,
            name: db[partyIndex].name
          }
        ]
      }
      res.status(200).json(response);
    }
    else {
      const response = {
        status: 404,
        error: 'not found'
      };
      res.status(404).json(response);
    } 
  }
  // delete party
  static deletePartyName(req, res) {
    let partyIndex = 'not found';
    db.forEach((eachParty, index) => {
      if (eachParty.id === parseInt(req.params.partyId, 10)) {
        partyIndex = index;
      }         
    })
    if (typeof partyIndex === 'number') {
      db.splice(partyIndex, 1);
      let response = {
        status: 200,
        data: [
          {
            message: 'successfully deleted'
          }
        ]
      }
      res.status(200).json(response);
    }
    else {
      const response = {
        status: 404,
        error: 'party not found'
      };
      res.status(404).json(response);
    } 
  }
}
export default PartyController;