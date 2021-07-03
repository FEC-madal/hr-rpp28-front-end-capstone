const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const axios = require('axios');

const QA_RouteConfig = require('../../config.js');
const QA_TOKEN = QA_RouteConfig.AUTH.Authorization;
const AUTH_HEADER = QA_RouteConfig.AUTH;
const API_PATH = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/';




// GET Product list (my version of Rob's code)
router.get('/products', (req, res) => {
  var builtPath = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/';

  axios.defaults.headers.common['Authorization'] = QA_TOKEN;

  axios.get(builtPath)
    .then((response) => {
      // console.log('is it getting to the route?');
      res.send(response.data);
      // console.log(response.data);
    })
    .catch((err) => {
      res.send('error at /products', err);
    });
});





// default options as middleware
router.use(fileUpload());
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

//NON-API Photo upload Logic

router.post('/uploadphoto', (req, res) => {
  // console.log('upload post received');

  // console.log(Object.keys(req.files));

  if (req.files.answerpic) {
    fs.writeFile(`./client/dist/${req.files.answerpic.name}`, req.files.answerpic.data, (err) => {
      if (err) {
        // return console.log(err);
      }
    //  console.log('The file was saved!');

      res.send(`http://localhost:3000/${req.files.answerpic.name}`);
    });
  }
});

// NON-API SEARCH LOGIC
router.get('/search/:searchterm', (req, res) => {
 // console.log('search request received!', req.params.searchterm);
  res.send('GET search request received: ');
});

// GET QUESTION LIST req.query has the query parameters
router.get('/questions', (req, res) => {
  var builtPath = API_PATH + `questions/?product_id=${req.query.product_id}&page=1&count=10`;

  axios.defaults.headers.common['Authorization'] = QA_TOKEN;

  axios.get(builtPath)
    .then((response) => {
      res.send(response.data);
      //console.log('succesfully build with dynamic product id: ', response.data.results[3].answers);
    })
    .catch((err) => {
      res.send('error at /questions', err);
    });
});

// GET ANSWER LIST FOR GIVEN QUESTION
// this route sorts the answers for us naturally.
router.get('/questions/:question_id/answers', (req, res) => {
 // console.log('returns answers for a given question', req.params.question_id);

  var builtPath = API_PATH + `questions/${req.params.question_id}/answers`;

  axios.defaults.headers.common['Authorization'] = QA_TOKEN;


  console.log('/questions/:question_id/answers called');

  axios.get(builtPath)
    .then((response) => {

      // before we send the results, lets send the results sorted

      let newResultsArray = response.data.results;

      // if (Array.isArray(newResultsArray)) {

      //   newResultsArray.sort((a,b) => b - a);
      //   response.data.results = newResultsArray;
      // } else {

      //   console.log('error in that the results array is not an array');
      // }
      // end my sort sequence
      res.send(response.data);
      // console.log(response.data);
    })
    .catch((err) => {
      res.send('error at /questions/:question_id/answers', err);
    });
});

// ADD ANSWER FOR A GIVEN QUESTION
router.post('/questions/:question_id/answers', (req, res) => {
  // construct object
  const builtPath = API_PATH + `questions/${req.params.question_id}/answers`;

  // const answerToBePosted = {
  //   body: 'Example answer to be posted',
  //   name: 'Question person',
  //   email: 'crimson@avenger.com',
  //   photos: [],
  // };


  // NOTE TO SELF UNCOMMENT THIS and ADD Product_ID to the initial axios request.
  const answerToBePosted = {
    body: req.body.answerbody,
    name: req.body.nickname,
    email: req.body.email,
    photos : req.body.photos,
  };

  const axiosObject = {
    method: 'post',
    headers: AUTH_HEADER,
    url: builtPath,
    data: answerToBePosted,
  };

  axios(axiosObject)
    .then((response) => {
      //console.log('successfully posted answer');
      res.send(response.data);
    })
    .catch((err) => {
      //console.log('there was an error posting an answer to the question');
      res.send(err);
    });
});

// ADD QUESTION
router.post('/questions', (req, res) => {
  // construct object
  const builtPath = API_PATH + `questions/`;

  // const questionToBePosted = {
  //   body: 'Why is abbreviation such a long word?',
  //   name: 'jack handy',
  //   email: 'jack@handy.com',
  //   product_id: 22122,
  // };

  // NOTE TO SELF UNCOMMENT THIS and ADD Product_ID to the initial axios request.
  const newQuestion = {
    body: req.body.question,
    name: req.body.nickname,
    email: req.body.email,
    product_id: req.body.product_id,
  };

  const axiosObject = {
    method: 'post',
    headers: AUTH_HEADER,
    url: builtPath,
    data: newQuestion,
  };

  // console.log('this is the question that was submitted: ', req.body.question);
  // console.log('this is the productId of the question: ', req.body.product_id);

  // console.log('req.body.question, ', req.body.question);
  // console.log('req.body.nickname, ', req.body.nickname);
  // console.log('req.body.email, ', req.body.email);
  // console.log('req.body.product_id, ', req.body.product_id);

  axios(axiosObject)
    .then((response) => {
      // console.log('successfully posted question, ', response.data);
      res.send(response.data);
    })
    .catch((err) => {
      // console.log('there was an error posting the question');
      res.send(err);
    });
});

// REPORT QUESTIONS

// Mark Question as Helpful
router.put('/questions/:question_id/helpful', (req, res) => {
  // construct object
  const builtPath = API_PATH + `questions/${req.params.question_id}/helpful`;

  const axiosObject = {
    method: 'put',
    headers: AUTH_HEADER,
    url: builtPath,
  };

  axios(axiosObject)
    .then((response) => {
      // console.log('success! reported Q as helpful');
      res.send(response.data);
    })
    .catch((err) => {
      // console.log('error reporting question as helpful');
      res.send(err);
    });
});

// Report Question
router.put('/questions/:question_id/report', (req, res) => {
  const builtPath = API_PATH + `questions/${req.params.question_id}/report`;

  const axiosObject = {
    method: 'put',
    headers: AUTH_HEADER,
    url: builtPath,
  };

  axios(axiosObject)
    .then((response) => {
      // console.log('success! reported Q');
      res.send(response.data);
    })
    .catch((err) => {
      // console.log('error reporting question');
      res.send(err);
    });
});

// REPORT ANSWERS

// Mark Answer as Helpful
router.put('/answers/:answer_id/helpful', (req, res) => {
  const builtPath = API_PATH + `answers/${req.params.answer_id}/helpful`;

  const axiosObject = {
    method: 'put',
    headers: AUTH_HEADER,
    url: builtPath,
  };

  axios(axiosObject)
    .then((response) => {
      //console.log('success! helpful answer recorded!', req.params.answer_id);
      res.send(response.data);
    })
    .catch((err) => {
      // console.log('error reporting answer at helpful put report', req.params.answer_id);
      res.send(err);
    });
});

// Report Answer
router.put('/answers/:answer_id/report', (req, res) => {
  const builtPath = API_PATH + `answers/${req.params.answer_id}/report`;

  const axiosObject = {
    method: 'put',
    headers: AUTH_HEADER,
    url: builtPath,
  };

  axios(axiosObject)
    .then((response) => {
      //console.log('success! reported answerid: ', response.data);
      res.send(response.data);
    })
    .catch((err) => {
      // console.log('error reporting answer');
      res.send(err);
    });
});

module.exports = router;