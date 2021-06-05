const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');


const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('./client/dist'));

app.get('/', (req, res) => {

  //res.send('basic get request received');
  console.log('received a request at /');

});


app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});