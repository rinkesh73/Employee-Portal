const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors')

const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

require('./controller')(app);

app.use((err, req, res, next) => {
  if(err) {
    res.setHeader('Content-type', 'application/json');
    res.statusCode = err.statusCode;
    res.end(JSON.stringify({message: err.message}));
  }
});

app.listen(PORT, () => {
 try {
  //ADD YOUR MONGO DB URL
  mongoose.connect('----ADD URL HERE----', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
 } catch(e) {
  console.log('--error', e);
  console.log(e);
 }

  console.log(`The server has been started at port ${PORT}`);
});
