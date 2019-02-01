import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';

let id;
let name;
const should = chai.should();
const data = {
  name: 'gilbert',
  hqAddress: 'somewhere',
  logoUrl: 'somethingLikeThat'
};
const badData = {
  hqAddress: 'somewhere',
  logoUrl: 'somethingLikeThat'
}
chai.use(chaiHttp);
//post create party
describe('POST: parties', () => {
  it ('should respond with an error message when keys are not complete', (done)=>{
    chai.request(server).post('/api/v1/parties').send(badData).end((err, res) => {
      res.body.should.have.property('status').eql(400);
      res.should.be.json;
      res.body.should.have.property('error').eql('missing a name key');
      done();
    })   
  })
})
  it('responed with the name and id of created party ', (done) => {
    chai.request(server).post('/api/v1/parties').send(data).end((err, res) => { 
      res.body.status.should.be.equal(200);
      res.should.be.json;
      res.body.data.should.be.a('array');
      res.body.should.have.property('data');
      res.body.data[0].should.have.property('name');
      res.body.data[0].should.have.property('id');
      id = res.body.data[0].id;      
      res.body.data[0].name.should.be.a('string');
      res.body.data[0].id.should.be.a('number');      
      done();
    })     
  })
  
// get specific party //
describe('GET: Specific party', () => {
  it('should respond with an error message when party not found', (done)=>{
    chai.request(server).get('/api/v1/parties/kl').end((err, res) => {
      res.body.should.have.property('status').eql(400);
      res.should.be.json;
      res.body.should.have.property('error').eql('Party not found');
      done();
    })
  })
})
  it('responed with the name, logo url and id of requested party', (done) => {
    chai.request(server).get('/api/v1/parties/' + id).end((err, res) => {
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
    })     
  }) 
// get all parties
for ( let i=0; i<5; i++){
  describe('put data in db', () => {
    it ('should input correct data. check for bad inputs', (done)=>{
      chai.request(server).post('/api/v1/parties').send(badData).end((err, res) => {
        res.body.should.have.property('status').eql(400);
        res.should.be.json;
        res.body.should.have.property('error').eql('missing a name key');
        done();
      })     
    })
    it('ensure posting works with the name and id of created party ', (done) => {
      chai.request(server).post('/api/v1/parties').send(data).end((err, res) => { 
        res.body.status.should.be.equal(200);
        res.should.be.json;
        res.body.data.should.be.a('array');
        res.body.should.have.property('data');
        res.body.data[0].should.have.property('name');
        res.body.data[0].should.have.property('id');
        id = res.body.data[0].id;       
        res.body.data[0].name.should.be.a('string');
        res.body.data[0].id.should.be.a('number');      
        done();
      })       
    })
    
  })
  // end
}
describe('GET: all party', () => {
  it('responed with all parties in the database and corresponding information', (done) => {
    chai.request(server).get('/api/v1/parties/').end((err, res) => {
      res.body.data.should.be.a('array') ; 
      res.should.be.json;
      res.body.data[0].should.be.a('object'); 
      res.body.status.should.equal(200);
      res.body.data.length.should.equal(6); // based on the first post to db
      done();
    })     
  })
  
})
// PATCH edit party name
describe('PATCH: edit party name', () => {
  it('should responed with an error message if id contains character', (done) => {
    chai.request(server).patch('/api/v1/parties/29769g8/bearsManyyy').end((err, res) => {
      res.body.should.have.property('error').eql('id invalid');
      done();
    })     
  })
  it('should responed with an error message if id is float', (done) => {
    chai.request(server).patch('/api/v1/parties/29769.8/bearsManyyy').end((err, res) => {
      res.body.should.have.property('error').eql('id should be integer number');
      done();
    })     
  })
  it('should responed with an error message if name contains number', (done) => {
    chai.request(server).patch('/api/v1/parties/29769/bearsManyyy6').end((err, res) => {
      res.body.should.have.property('error').eql('name should be only string');
      done();
    })     
  })
  it('should responed with an error message if id not found', (done) => {
    chai.request(server).patch('/api/v1/parties/429769/bearsManyyy').end((err, res) => {
      res.body.should.have.property('error').eql('not found');
      done();
    })     
  })
  it('should responed with the edited party', (done) => {
    chai.request(server).patch('/api/v1/parties/' + id + '/bearsManyyy').end((err, res) => {
      res.body.should.have.property('data');
      console.log(res.body.data)
      res.body.data[0].name.should.equal("bearsManyyy");
      done();
    })     
  })
  
  
})

