const express = require('express');

const Users = require('./userDb')
const Posts = require('../posts/postDb')

const router = express.Router();

router.post('/api/users', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
  .then(data => {
    res.status(200).json(data)
  })
  .catch(error => {
    res.status(400).json({
      message: "unable to add"
    })
  })
});

router.post('/api/users/:id/posts',[validatePost, validateUserId], (req, res) => {
  // do your magic!
  const newPost = {
    user_id: req.params.id,
    text: req.body.text,
  }
  Posts.insert(newPost)
  .then(data => {
    res.status(200).json(data)
  })
  .catch(error => {
    res.status(500).json({
      message: `sorry, ${error}`
    })
  })
});

router.get('/api/users', (req, res) => {
  // do your magic!
  Users.get()
  .then(data => {
    res.status(200).json(data)
  })
  .catch(error => {
    res.status(500).json({
      message: `error ${error}`
    })
  })
});

router.get('/api/users/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('api/users/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json({
      message: `error ${err}`
    })
  })
});

router.delete('/api/users/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
  .then(data => {
    res.status(200).json({
      message: 'deleted!'
    })
  })
  .catch(err => {
    res.status(500).json({
      message: `error, ${err}`
    })
  })
});

router.put('/api/users/:id', [validateUserId, validateUser], (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json({
      message: `error, ${err}`
    })
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  Users.getById(req.params.id)
  .then(data => {
    if (data) {
      req.user.data
      next()
    } else {
      res.status(400).json({
        message: "invalid user id"
      })
    }
  })
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({
      message: "missing user data"
    })
  } else if (!req.body.name) {
    res.status(400).json({
      message: "missing required name field"
    })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({
      message: "missing post data"
    })
  } else if (!req.body.text) {
    res.status(400).json({
      message: "missing required text field"
    })
  } else {
    next()
  }
}

module.exports = router;
