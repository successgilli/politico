import express from 'express';

const app = express();
app.listen(8080 || process.env.PORT, () => {
  console.log('listening on port 8080');
})
