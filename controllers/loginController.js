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
