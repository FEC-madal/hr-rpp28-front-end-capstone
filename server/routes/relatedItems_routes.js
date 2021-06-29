const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const axios = require('axios');
const RI_TOKEN = require('../../config.js');
const outfit = require('../OutfitHelpers.js');

const router = express.Router();

router.use(fileUpload());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

const deconstructQuery = (input, flag = '') => {
  if (input === undefined) {
    return '';
  }
  if (flag) {
    return `${flag}=${input}`;
  }
  return `/${input}`;
};

const handleRequest = (query, callback) => {
  const urlInfo = {};
  urlInfo.productId = deconstructQuery(query.productId);
  urlInfo.flag = deconstructQuery(query.flag);

  const axiosVar = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products${urlInfo.productId + urlInfo.flag}`;

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products${urlInfo.productId + urlInfo.flag}`, {
    headers: {
      'User-Agent': 'request',
      Authorization: RI_TOKEN.AUTH.Authorization
    },
  })
    .then((data) => {
      callback(null, data.data);
    })
    .catch((err) => {
      callback(err, null);
    })
};

router.get('/products', (req, res) => {
  handleRequest(req.query, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.get('/reviews/meta', (req, res) => {
  const builtURL = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${req.query.product_id}`;

    axios.get(builtURL, {
      headers: {
        'User-Agent': 'request',
        Authorization: RI_TOKEN.AUTH.Authorization
      },
    })
      .then((metaData) => {
        res.send(metaData.data.ratings);
      })
      .catch((err) => {
        res.send(err);
      });
})

router.get('/outfits', (req, res) => {
  outfit.getAllOutfits((err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(data);
    }
  });
});

router.post('/outfits', (req, res) => {
  outfit.saveOutfit(req.body, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(data);
    }
  });
})

router.delete('/outfits', (req, res) => {
  outfit.deleteOutfit(req.body.id, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(data);
    }
  });
})

module.exports = router;