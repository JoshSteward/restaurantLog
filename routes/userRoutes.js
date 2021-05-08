const router = require("express").Router();
const bcrypt = require('bcypt');
const User = require('../models/user');

//create new user 
router.post('/', async (req, res) => {
    try {
      const newUser = req.body;
      // hash the password from 'req.body' and save to newUser
      bcrypt.hash(req.body.password, 10).then(response => {
          newUser.password = response; 
      });
      // create the newUser with the hashed password and save to DB
      const userData = await User.create(newUser);
      res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  module.exports = router;
  