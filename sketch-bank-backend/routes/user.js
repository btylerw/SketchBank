const router = require('express').Router();
const bcrypt = require('bcrypt');
const pool = require('../db/pool');

// Currently bugged
async function doesUserExist(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1;", [username]);
    console.log(rows.length);
    if (rows.length >= 1) {
        return true;
    } else {
        return false;
    }
}

// Authenticates users
router.get('/login', async (req, res) => {
    try {
        // User passes in username and password
        const {username, password} = req.query;
        // Searches db for username and retrieves password
        await pool.query("SELECT password FROM users WHERE username = $1;", [username])
        .then(response => {
            const {rows} = response;
            // Password pulled from database
            const userPass = rows[0].password;
            // Compares entered password with password from database
            bcrypt.compare(password, userPass, function(err, result) {
                if (result) {
                    // if match, validated
                    res.json({isValid: true});
                } else {
                    // no match, don't validate
                    res.json({isValid: false});
                }
            })
        })
    } catch (err) {
        console.error(err);
        // There was an error, so we don't validate
        res.json({isValid: false});
    }
})

// Was previously used to retrieve test information
// Will be expanded upon once database has more relations
router.get('/:username/info', async (req, res) => {
    console.log('connected')
    const username = req.params.username;
})

// Creates a new account
router.post('/signup', async (req, res) => {
    try {
        // passed in user data
        const {username, fname, lname, password, email} = req.body;
        /*TODO: Insert a check here to make sure UNIQUE values don't already exist in db*/
        // Begin hashing passed in password
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
                    // User is entered into database
                    await pool.query("INSERT INTO users (username, password, email, fname, lname) VALUES ($1, $2, $3, $4, $5);", [username, password, email, fname, lname]);
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