const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const RIroutes = require('./server/routes/relatedItems_routes.js');
const review = require('./server/routes/reviewroutes.js')
const QAroutes = require('./server/routes/QA_routes.js');
const compression = require('compression');

const PORT = 3000;

app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/dist')));

// import routes
app.use('/qa', QAroutes);
app.use('/reviews', review);
app.use('/relatedItems', RIroutes);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});
