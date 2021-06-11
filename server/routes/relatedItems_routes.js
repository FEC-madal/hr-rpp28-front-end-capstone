const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const axios = require('axios');
const token = require('../../config.js');

const router = express.Router();
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';
// const product_id = require('../../src/components/relatedItems/relatedItemsModule.jsx');

router.use(fileUpload());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

const product_id = 22134;

router.get('/relatedItems', (req, res) => {
  // Turn this line on when app goes live
  // const builtUrl = url + `/products/${req.data.product_id}/related`;

  // Turn this line off when app goes live
  const builtUrl = url + `/products/22134/related`;

  const options = {
    method: 'get',
    url: builtUrl,
    headers: token.AUTH
  };

  console.log('options', options);

  axios(options)
    .then(({ data }) => {
      return (Promise.all(data.map((id) => {
        const builtUrl = url + `/products/${id}`;
        const options = {
          method: 'get',
          url: builtUrl,
          headers: token.AUTH
        }
        return axios(options)
          .then(({ data }) => {
            itemData[data.id] = data;
          });
      })));
    }).then((itemData) => {
      res.send(itemData);
    }).catch((err) => {
      console.log(err);
    });
});

// const getRelatedItemsIds = (product_id) => {
//   const builtUrl = url + `/products/${product_id}/related`;

//   const options = {
//     method: 'get',
//     url: builtUrl,
//     headers: token.AUTH
//   };

//   axios(options)
//     .then(({ data }) => {
//       return Promise.all(data.map((id) => {

//         return this.getRelatedItemsData(id);

//       }));
//     }).then((data) => {
//       res.send(data);
//     }).catch((err) => {
//       console.log(err);
//     });
// };

// const getRelatedItemsData = (id) => {
//   const builtUrl = url + `/products/${id}`;
//   const options = {
//     method: 'get',
//     url: builtUrl,
//     headers: token.AUTH
//   }
//   return axios(options)
//     .then(({ data }) => {
//       this.data[data.id] = data;
//     });
// };

// // NON-API Photo upload Logic (TomHo)
// router.post('/uploadphoto', (req, res) => {
//   console.log('upload post received');

//   console.log(Object.keys(req.files));

//   if (req.files.answerpic) {
//     fs.writeFile(`./client/dist/${req.files.answerpic.name}`, req.files.answerpic.data, (err) => {
//       if (err) {
//         return console.log(err);
//       }
//       console.log('The file was saved!');

//       res.send(`http://localhost:3000/${req.files.answerpic.name}`);
//     });
//   }
// });

// // API call for getting relatedItems Array
// const getRelatedItems = (product_id, callback) => {
//   const options = {
//     method: 'get',
//     url: url + `/products/${product_id}/related`,
//     headers: token.AUTH
//   };

//   axios(options)
//     .then((res) => {
//       callback(null, res.data);
//     })
//     .catch((err) => {
//       console.log('Error in routes/getRelatedItems:', err);
//     });
// };

// // Route for getting relatedItems array
// router.get('/relatedItems', (req, res) => {
//   console.log('Calling getRelatedItems with:', req.data);

//   getRelatedItems((req.body.data, (err, data) => {
//     if (err) {
//       console.log('Error in router.get/relatedItems:', err);
//     } else {
//       console.log('data should be an array:', data);
//       res.send(data);
//     }
//   }));
// });

// // API call for getting related items info
// const getRelatedItemsInfo = ((relatedProductIds, callback) => {
//   var relatedProductInfo = [];

//   for (let i = 0; i < relatedProductIds.length; i++) {
//     const options = {
//       method: 'get',
//       url: url + `/products/${relatedProductIds[i]}`,
//       headers: token.AUTH
//     };

//     axios(options)
//       .then((res) => {
//         relatedProductInfo.push(res.data);
//       })
//       .catch((err) => {
//         console.log('Error in routes/getRelatedItemsInfo:', err);
//       });
//   }
//   callback(null, relatedProductInfo);
// });

// // Route for getting related items info
// router.get('/relatedItemInfo', (req, res) => {
//   console.log('Calling relatedItemInfo with :', req.data);

//   getRelatedItemsInfo((req.body.data, (err, data) => {
//     if (err) {
//       console.log('Error in router.get/relatedItemsInfo:', err);
//     } else {
//       console.log('data should be an array of objects:', data);
//       res.send(data);
//     }
//   }));
// });

module.exports = router;