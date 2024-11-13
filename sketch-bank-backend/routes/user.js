const router = require('express').Router();
const bcrypt = require('bcrypt');

var hash = bcrypt.hashSync('password', 10);

router.get('/login', async (req, res) => {
    try {
        const {username, password} = req.query;
        console.log(password);
        console.log(hash);
        bcrypt.compare(password, hash, function(err, result) {
            console.log(result);
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

module.exports = router;