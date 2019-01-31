import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';


const { expect } = chai.expect;
const { assert } = chai.assert;
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
      res.body.data[0].name.should.be.a('string');
      res.body.data[0].id.should.be.a('number');      
      
    })
    done();  
  })
  it ('should respond with an error message when keys are not complete', (done)=>{
    chai.request(server).post('/api/v1/parties').send(badData).end((err, res) => {
      res.body.should.have.property('status').eql(400);
      res.should.be.json;
      res.body.should.have.property('error').eql('missing a name key');
      
    })
    done();
  })
})
