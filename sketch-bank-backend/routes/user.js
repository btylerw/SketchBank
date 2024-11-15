const router = require('express').Router();
const bcrypt = require('bcrypt');

var hash = bcrypt.hashSync('password', 10);
const users = [
    {id: 1, name: 'user1', balance: 1000.00},
    {id: 2, name: 'user2', balance: 500.00},
    {id: 3, name: 'user3', balance: 750.77},
]

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

router.get('/:username/info', async (req, res) => {
    console.log('connected')
    const username = req.params.username;
    const retrievedUser = users.filter(user => user.name === username);
    res.json(retrievedUser[0]);

})

router.post('/signup', async (req, res) => {
    try {
        const {username, password, email} = req.body;
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.error(`Error: ${err}`);
                return;
            }
            bcrypt.hash(password, salt, async(err, password) => {
                if (err) {
                    console.error(`Error: ${err}`);
                }
                try {
                    console.log(password);
                    res.json('User "successfuly created"');
                }
                catch (err) {
                    console.error(`Error: ${err}`);
                    res.json('Issue creating user');
                }
            })
        })
        console.log('Signup Request Received, but no database yet');
    } catch (err) {
        console.error(err);
    }
})

module.exports = router;