const express = require('express');

const server = express();

const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')

server.use(express.json())
server.use(postRouter)
server.use(userRouter)
server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(Date().now)
  console.log('Method', req.method)
  console.log('URL', req.url)
}

module.exports = server;
