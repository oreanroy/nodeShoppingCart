var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Product = require('../models/product');

var csrfProtection = csrf();
router.use(csrfProtection);
/* GET home page. */
router.get('/', function(req, res) {
  Product.find(function(err, docs){
   // console.log(products.length);
   //var productChunks = [];
   //var chunkSize = 3;
   //for (var i=0; i <= docs.length; i+= chunkSize){
   //   productChunks.push(docs.slice(i, i + chunkSize));
   //}
    res.render('shop/index', { title: 'Shopping-Cart', products: docs });  
  })
});

router.get('/user/signup', function(req, res, next) {
  var messages = req.flash('error'); 
  res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/user/signup', passport.authenticate({
  successRedirect: 'user/profile',
  failureRedirect: 'user/signup',
  failureFlash: true
})
)

router.get('user/profile', (req, res, next) => {
  res.render('user/profile'); 
})

module.exports = router;
