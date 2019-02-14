import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';
import pdb from '../src/model/query';

let id;
let name;
const should = chai.should();
const data = {
  name: 'gilbert',
  hqAddress: 'somewhere',
  logoUrl: 'somethingLikeThat'
};
const officeData = {
  name: 'gilbert',
  type: 'somewhere',
};

const badData = {
  hqAddress: 'somewhere',
  logoUrl: 'somethingLikeThat'
};
chai.use(chaiHttp);
//post create party
describe('POST: parties', () => {
  it ('should respond with an error message when keys are not complete', (done)=>{
    chai.request(server).post('/api/v1/parties').send(badData).end((err, res) => {
      res.body.should.have.property('status').eql(401);
      res.should.be.json;
      res.body.should.have.property('error').eql('missing a name key');
      done();
    });   
  });
});
it('responed with the name and id of created party ', (done) => {
  chai.request(server).post('/api/v1/parties').send(data).end((err, res) => { 
    res.body.status.should.be.equal(200);
    res.should.be.json;
    res.body.data.should.be.a('array');
    res.body.should.have.property('data');
    res.body.data[0].should.have.property('name');
    res.body.data[0].should.have.property('id');
    // eslint-disable-next-line prefer-destructuring
    id = res.body.data[0].id;
    res.body.data[0].name.should.be.a('string');
    res.body.data[0].id.should.be.a('number');      
    done();
  });     
});
  
// get specific party //
describe('GET: Specific party', () => {
  it('should respond with an error message when party not found', (done)=>{
    chai.request(server).get('/api/v1/parties/100000').end((err, res) => {
      res.body.should.have.property('status').eql(400);
      res.should.be.json;
      res.body.should.have.property('error').eql('party not found');
      done();
    });
  });
});
it('responed with the name, logo url and id of requested party', (done) => {
  chai.request(server).get(`/api/v1/parties/${id}`).end((err, res) => {
    res.body.status.should.be.equal(200);
    res.should.be.json;
    res.body.data.should.be.a('array');
    res.body.should.have.property('data');
    res.body.data[0].should.have.property('name');
    res.body.data[0].should.have.property('id');
    res.body.data[0].should.have.property('logoUrl');
    res.body.data[0].name.should.be.a('string');
    res.body.data[0].id.should.be.a('number');      
    done();
  });     
}); 
// get all parties
describe('GET: all party', () => {
  it ('responed with all parties in the database and corresponding information', (done) => {
    chai.request(server).get('/api/v1/parties/').end((err, res) => {
      res.body.data.should.be.a('array') ; 
      res.should.be.json;
      res.body.data[0].should.be.a('object'); 
      res.body.status.should.equal(200);
      pdb('SELECT * FROM parties ', (err, result) => {
        const count = result.rowCount;
        res.body.data.length.should.equal(count); // based on the information in the database
      });
      done();
    });     
  }); 
});
// PATCH edit party name
describe('PATCH: edit party name', () => {
  it('should responed with an error message if id contains character', (done) => {
    chai.request(server).patch('/api/v1/parties/29769g8/bearsManyyy').end((err, res) => {
      res.body.should.have.property('error').eql('id invalid');
      done();
    });
  });
  it('should responed with an error message if id is float', (done) => {
    chai.request(server).patch('/api/v1/parties/29769.8/bearsManyyy').end((err, res) => {
      res.body.should.have.property('error').eql('id should be integer number');
      done();
    });     
  });
  it('should responed with an error message if name contains number', (done) => {
    chai.request(server).patch('/api/v1/parties/29769/bearsManyyy6').end((err, res) => {
      res.body.should.have.property('error').eql('name should be only string');
      done();
    });     
  });
  it('should responed with an error message if id not found', (done) => {
    chai.request(server).patch('/api/v1/parties/429769/bearsManyyy').end((err, res) => {
      res.body.should.have.property('error').eql('id not found');
      done();
    });     
  });
  it('should responed with the edited party', (done) => {
    chai.request(server).patch(`/api/v1/parties/${id}/created`).end((err, res) => {
      res.body.should.have.property('data');
      res.body.data[0].name.should.equal("created");
      done();
    });     
  });
  
  
});
// DELETE party
describe('DELETE: party', () => {
  it('should responed with an error message if id contains character', (done) => {
    chai.request(server).delete('/api/v1/parties/29769g8').end((err, res) => {
      res.body.should.have.property('error').eql('id invalid');
      done();
    });
  });
  it('should responed with an error message if id is float', (done) => {
    chai.request(server).delete('/api/v1/parties/29769.8').end((err, res) => {
      res.body.should.have.property('error').eql('id should be integer number');
      done();
    });
  });
  it('should responed with an error message if id not found', (done) => {
    chai.request(server).delete('/api/v1/parties/429769').end((err, res) => {
      res.body.should.have.property('error').eql('party not found');
      done();
    });
  });
  it('should responed with the edited party', (done) => {
    chai.request(server).delete(`/api/v1/parties/${id}`).end((err, res) => {
      res.body.data[0].message.should.equal('successfully deleted');
      done();
    });
  });
});
