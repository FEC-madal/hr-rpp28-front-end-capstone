const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const axios = require('axios');

const QA_RouteConfig = require('../../config.js');
const TOKEN = QA_RouteConfig.AUTH.Authorization;
const AUTH_HEADER = QA_RouteConfig.AUTH;
const API_PATH = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/';

// default options as middleware
router.use(fileUpload());
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

//NON-API Photo upload Logic

router.post('/uploadphoto', (req, res) => {
  console.log('upload post received');

  // console.log(Object.keys(req.files));

  if (req.files.answerpic) {
    fs.writeFile(`./client/dist/${req.files.answerpic.name}`, req.files.answerpic.data, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log('The file was saved!');

      res.send(`http://localhost:3000/${req.files.answerpic.name}`);
    });
  }
});

// NON-API SEARCH LOGIC
router.get('/search/:searchterm', (req, res) => {
  // console.log('search request received!', req.params.searchterm);
  res.send('GET search request received: ');
});

// GET QUESTION LIST
router.get('/questions', (req, res) => {
  var builtPath = API_PATH + 'questions/?product_id=22122';

  axios.defaults.headers.common['Authorization'] = TOKEN;

  axios.get(builtPath)
    .then((response) => {
      res.send(response.data);
      // console.log(response.data);
    })
    .catch((err) => {
      res.send('error at /questions', err);
    });
});

// GET ANSWER LIST FOR GIVEN QUESTION
router.get('/questions/:question_id/answers', (req, res) => {
  console.log('returns answers for a given question', req.params.question_id);

  var builtPath = API_PATH + `questions/${req.params.question_id}/answers`;

  axios.defaults.headers.common['Authorization'] = TOKEN;


  console.log('route reached');

  axios.get(builtPath)
    .then((response) => {
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
      console.log('successfully posted answer');
      res.send(response.data);
    })
    .catch((err) => {
      console.log('there was an error posting an answer to the question');
      res.send(err);
    });
});

// ADD QUESTION
router.post('/questions', (req, res) => {
  // construct object
  const builtPath = API_PATH + `questions/`;

  const questionToBePosted = {
    body: 'Why is abbreviation such a long word?',
    name: 'jack handy',
    email: 'jack@handy.com',
    product_id: 22122,
  };

  // NOTE TO SELF UNCOMMENT THIS and ADD Product_ID to the initial axios request.
  // const newQuestion = {
  //   body: req.body.question,
  //   name: req.body.nickname,
  //   email: req.body.email,
  //   product_id: req.body.product_id,
  // };

  const axiosObject = {
    method: 'post',
    headers: AUTH_HEADER,
    url: builtPath,
    data: questionToBePosted,
  };

  axios(axiosObject)
    .then((response) => {
      console.log('successfully posted question');
      res.send(response.data);
    })
    .catch((err) => {
      console.log('there was an error posting the question');
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
      console.log('success! reported Q as helpful');
      res.send(response.data);
    })
    .catch((err) => {
      console.log('error reporting question as helpful');
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
      console.log('success! reported Q');
      res.send(response.data);
    })
    .catch((err) => {
      console.log('error reporting question');
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
      console.log('success! reported answer');
      res.send(response.data);
    })
    .catch((err) => {
      console.log('error reporting answer');
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
      console.log('success! reported answer');
      res.send(response.data);
    })
    .catch((err) => {
      console.log('error reporting answer');
      res.send(err);
    });
});

module.exports = router;