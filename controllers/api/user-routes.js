const express = require('express');
const router = express.Router();
const Users = require('../../models/Users');

// Route to retrieve user data
router.get('/', async (req, res) => {
    try {
      const userData = await Users.findAll();
      const users = userData.map((user) => user.get({ plain: true }));
      res.json(users);
      console.log(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username) {
            res.status(400).json({ message: 'Username is required for login.' });
            return;
        }

        const user = await Users.findOne({ where: { username } });

        if (!user) {
            res.status(404).json({ message: 'No user found with that username.' });
            return;
        }

        const validPassword = user.checkPassword(password);

        if (!validPassword) {
            res.status(401).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;
            res.json({ user: { id: user.id, username: user.username }, message: 'You are now logged in!' });
        });

    } catch (err) {
        // console.error("DEBUG: Server error", err);  // to debug log
        res.status(500).json(err);
    }
});


router.post('/logout', (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.status(200).json({ message: "You are not logged in!" });
            return;
        }
        
        req.session.loggedIn = false;
        req.session.userId = null; 

        req.session.destroy(() => {
            res.status(200).json({ message: "You have been logged out!" });
        });
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: "A server error has occurred." });
    }
});


router.post('/signup', async (req, res) => {
    try {
        const { username, password, first_name, last_name, email } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password required." });
        }

        // Check if the user already exists
        const foundUser = await Users.findOne({
            where: {
                username: username
            }
        });

        if (foundUser) {
            return res.status(400).json({ message: "Username is already taken!" });
        }

        // Create the new user
        const newUser = await Users.create({
            username,
            password,
            first_name,
            last_name,
            email
        }, { returning: true, individualHooks: true });

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            return res.status(200).json({ message: "Signed up" });
        });
    } 
    catch(err) {
        if (!err.errors) {
            console.error(err);
            return res.status(500).json({ message: "A server error has occurred." });
        }

        const error = err.errors[0];

        if (error.type !== 'Validation error') {
            return res.status(400).json({ message: error.message });
        }

        const dataName = error.path;
        const dataNameCap = dataName.charAt(0).toUpperCase() + dataName.slice(1).toLowerCase();
        const validate = Users.getAttributes()[dataName]?.validate;

        if (error.validatorName === 'len') {
            return res.status(400).json({ message: `${dataNameCap} must be at least ${validate.len[0]} characters long!` });
        } else if (error.validatorName === 'isAlphanumeric') {
            return res.status(400).json({ message: `${dataNameCap} must contain only letters and numbers!` });
        } else {
            return res.status(400).json({ message: error.message });
        }
    }
});




module.exports = router;