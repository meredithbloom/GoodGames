const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  res.render('games/index.ejs')
})


module.exports = router;
