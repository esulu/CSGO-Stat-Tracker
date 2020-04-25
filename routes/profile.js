const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => { 
    console.log(req.params.id);
    res.send('request completed');
});

module.exports = router;