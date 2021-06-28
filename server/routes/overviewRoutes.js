// const express = require('express');

// const router = express.Router();
// const bodyParser = require('body-parser');
// const fileUpload = require('express-fileupload');
// const fs = require('fs');
// const axios = require('axios');

// const token = require('../../config.js');

// const serverUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/';

// router.use(fileUpload());
// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());

// let prodId = 0;
// let addParams = '';

// const getProducts = (callback) => {
//   const options = {
//     method: 'get',
//     url: serverUrl + prodId + addParams,
//     headers: token.AUTH,
//   };
//   axios(options)
//     .then((response) => {
//       callback(null, response.data);
//     })
//     .catch((error) => {
//       // console.log('error', error.response);
//     });
// };

// router.get('/getoneproduct', (req, res) => {
//   prodId = req.query.productId;
//   prodUrl = req.url;
//   getProducts((err, data) => {
//     if (err) {
//       // console.log('server error: ', err);
//       res.status(404).send(err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// });

// router.get('/getproductstyle', (req, res) => {
//   prodId = req.query.productId;
//   addParams = '/styles';
//   getProducts((err, data) => {
//     if (err) {
//       // console.log('server error: ', err);
//       res.status(404).send(err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// });

// module.exports = router;
