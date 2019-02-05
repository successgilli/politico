import express from 'express';
import bodyParser from 'body-parser';
import route from './router/routes';
import createTables from './model/migrations'

const app = express();
createTables();
const port = process.env.PORT || 8080 ;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', route);
app.use('/', (req, res)=>{
  res.status(404).json('rounte not available FROM gilbert');
})
app.listen(port, () => {
  console.log('listening on port 8080');
});

export default app;
