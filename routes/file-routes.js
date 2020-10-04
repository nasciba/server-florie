const express = require('express');
const router  = express.Router();
const parser = require('../configs/cloudinary-setup');

router.post('/upload', parser.single("imageUrl"), (req, res) => {
    console.log('file is: ', req.file)

    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    
    res.json({ secure_url: req.file.secure_url });
    console.log(res.json)
})

module.exports = router;