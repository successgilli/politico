import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';

let id;
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
describe('POST: parties', () => {
  it('responed with the nname and id of created party ', (done) => {
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
  it ('should respond with an error message when keys are not complete', (done)=>{
    chai.request(server).post('/api/v1/parties').send(badData).end((err, res) => {
      res.body.should.have.property('status').eql(400);
      res.should.be.json;
      res.body.should.have.property('error').eql('missing a name key');
      done();
    })
    
  })
})
// get specific party //
describe('GET: Specific party', () => {
  
  it('responed with the nname, logo url and id of created party ', (done) => {
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
  it ('should respond with an error message when party not found', (done)=>{
    chai.request(server).get('/api/v1/parties/kl').end((err, res) => {
      res.body.should.have.property('status').eql(400);
      res.should.be.json;
      res.body.should.have.property('error').eql('Party not found');
      done();
    })
    
  })
  
})
