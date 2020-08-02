const router = require('express').Router();

router.get('/test', (req, res) => {
    res.send('abcd')
})

module.exports = router;
