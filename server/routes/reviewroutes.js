const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const axios = require('axios');
const token = require('../../config.js')

var AWS = require('aws-sdk');
// Set the Region
AWS.config.loadFromPath('./config.json');
router.use(fileUpload());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


router.get('/review-product', (req, res) => {

  getReviews(req.query.count, req.query.product_id, (err, data) => {
    if (err) {
      // console.log(err);
    } else {
      res.send(data);
    }
  });
});

router.get('/breakdown', (req, res) => {
  getMeta(req.query.product_id, (err, data) => {
    // console.log('we are here');
    if (err) {
      // console.log(err);
    } else {
      res.send(data);
    }
  });
});

router.post('/postreview', (req, res) => {
  // console.log('this is what is being sent: ',JSON.stringify(req.body))
  postReview(req.body, (err, data) => {
    // console.log('we are here');
    if (err) {
      // console.log(err);
      res.send(err);
    } else {
      res.send(data);
    }
  });
});


router.put('/helpful', (req, res) => {
  putHelpful(req.body.data, (err, data) => {
    if (err) {

      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.put('/report', (req, res) => {
  putReport(req.body.data, (err, data) => {
    // console.log('we are here');
    if (err) {
      // console.log(err);
      // res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.post('/uploadphoto', (req, res) => {
  if (req.files.reviewphoto) {
    fs.writeFile(`./client/dist/${req.files.reviewphoto.name}`, req.files.reviewphoto.data, (err) => {
      if (err) {
        // return console.log(err);
      } else {
        s3 = new AWS.S3({apiVersion: '2006-03-01'});

        // call S3 to retrieve upload file to specified bucket
        var uploadParams = {Bucket: 'review-widget2', Key: '', Body: ''};
        var file = `./client/dist/${req.files.reviewphoto.name}`;

        // Configure the file stream and obtain the upload parameters

        var fileStream = fs.createReadStream(file);
        fileStream.on('error', function(err) {
          console.log('File Error', err);
        });
        uploadParams.Body = fileStream;
        var path = require('path');
        uploadParams.Key = path.basename(file);

        // call S3 to retrieve upload file to specified bucket
        s3.upload (uploadParams, function (err, data) {
          if (err) {
            console.log("Error", err);
          } if (data) {
            res.send(data);
          }
        });
      }
    });
  }
});












//Helpers to get the actual data to pass back to the requests//

//Gets the reviews for the individual review tile
const getReviews = (num, product, callback) => {
let count = num || 2
let product_id = product;
 let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${product_id}&page=1&count=${count}`;
  axios({
    method: 'get',
    url: url,
    headers: token.AUTH
  })
    .then((response) => {
      callback(null, response.data);
    })
    .catch((err) => {
      callback(err, null);
    });
};

//Gets the meta for ALL of the reviews for the product breakdown section
const getMeta = (product, callback) => {
  let product_id = product;
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${product_id}`
  axios({
    method: 'get',
    url: url,
    headers: token.AUTH
  })
    .then((response) => {
      callback(null, response.data);
    })
    .catch((err) => {
      callback(err, null)
    });
};

//Post a review
const postReview = (data, callback) => {
  let url = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews";
  axios({
    method: 'post',
    url: url,
    headers: token.AUTH,
    data: data

  })
    .then((response) => {
      callback(null, response.data);
    })
    .catch((err) => {
      console.log('this is an error: ', err);
      callback(err, null)
    });
};

//Increase helpfulness "Yes" by one
const putHelpful = (data, callback) => {
  let review_id = data
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${review_id}/helpful`;
  axios({
    method: 'put',
    url: url,
    headers: token.AUTH,
  })
    .then((response) => {
      // console.log('successful: ');
      callback(null, response.data);
    })
    .catch((err) => {
      // console.log('this is an error: ', err);
      callback(err, null)
    });
};

const putReport = (data, callback) => {
  let review_id = data
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${review_id}/report`;
  axios({
    method: 'put',
    url: url,
    headers: token.AUTH,
  })
    .then((response) => {
      // console.log('successful: ');
      callback(null, response.data);
    })
    .catch((err) => {
      // console.log('this is an error: ', err);
      callback(err, null)
    });
};

module.exports = router;