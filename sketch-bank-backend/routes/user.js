const router = require('express').Router();
const bcrypt = require('bcrypt');

var hash = bcrypt.hashSync('password', 10);

router.get('/login', async (req, res) => {
    try {
        const {username, password} = req.query;
        bcrypt.compare(password, hash, function(err, result) {
            if (result) {
                res.json({isValid: true})
            } else {
                res.json({isValid: false});
            }
        });
    } catch (err) {
        console.error(err);
    }
})

router.post('/signup', async (req, res) => {
    try {
        const {username, password, email} = req.body;
        console.log('Signup Request Received, but no database yet');
    } catch (err) {
        console.error(err);
    }
})

module.exports = router;