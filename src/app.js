import express from 'express';
import bodyParser from 'body-parser';
import route from './router/routes';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', route);
app.use('/', (req, res)=>{
  res.status(404).json('rounte not available FROM gilbert');
})
app.listen(6392 || process.env.PORT, () => {
  console.log('listening on port 8080');
})
export default app;
