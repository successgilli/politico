import db from '../model/db';

const counter = 1;
class CreateParty {
  static createParty(req, res) {
    req.body.id = Math.floor((Math.random() * 100000) + counter);
    db.push(req.body);
    const response = {
      status: 200,
      data: [{ id: db[db.length - 1].id, name: db[db.length - 1].name }]
    }
    res.json(response);
  }
}
export default CreateParty;