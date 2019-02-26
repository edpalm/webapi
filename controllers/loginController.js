'use strict'
const jwt = require('jsonwebtoken')
const loginController = {}

loginController.loginPost = async (req, res, next) => {
  // Hardcoded user.
  if (req.body.username === 'admin' && req.body.password === 'admin') {
    let secret = process.env.SECRET
    let tokenLifeTime = '1h'
    let token = jwt.sign({ username: req.body.username }, secret, { expiresIn: tokenLifeTime })

    res.status(200).json({
      message: `Logged in successfully!, Token received. Use the token in upcoming request, token will live for ${tokenLifeTime}`,
      token
    }, [
      { rel: 'self', method: 'POST', title: 'Login', href: `${process.env.HOST_URL}/login/` },
      { rel: 'view all', method: 'GET', title: 'Get all catches', href: `${process.env.HOST_URL}/catches/` },
      { rel: 'view one', method: 'GET', title: 'Get specific catch', href: `${process.env.HOST_URL}/catches/:id` },
      { rel: 'create', method: 'POST', title: 'Create Catch', href: `${process.env.HOST_URL}/catches/` },
      { rel: 'update', method: 'PUT', title: 'Update existing catch', href: `${process.env.HOST_URL}/catches/:id` },
      { rel: 'delete', method: 'DELETE', title: 'Delete existing catch', href: `${process.env.HOST_URL}/catches/:id` },
      { rel: 'hook', method: 'POST', title: 'Register Webhook', href: `${process.env.HOST_URL}/hooks/` }
    ])
  } else {
    res.status(401).json({
      message: 'Bad credentials, please try again'
    }, [
      { rel: 'self', method: 'POST', href: `${process.env.HOST_URL}${req.url}` }
    ])
  }
}

module.exports = loginController