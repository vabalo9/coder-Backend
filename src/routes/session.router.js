import { Router } from "express";
import UserModel from "../DAO/models/user.model.js";
import passport from "passport";
import {createHash, isValidPassword} from '../utils.js'

const router = Router()


router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, user) => {
        if (err) {
            // Handle the error if needed
            return next(err);
        }
        if (!user) {
            // Authentication failed
            return res.redirect('/register');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            req.session.user = user;
            return res.redirect('/home.handlebars');
        });
    })(req, res, next);
});


router.post('/register',
 passport.authenticate('register', { failureRedirect: '/register'}), 
 async (req, res) => {
    

    return res.redirect('/check')
}
)

// GITHUB
router.get(
    '/login-github',
    passport.authenticate('github', {scope: ['user:email'] }),
    async(req, res) => {}
)

router.get(
    '/githubcallback',
    passport.authenticate('github', { failureRedirect: '/'}),
    async(req, res) => {
        console.log('Callback: ', req.user)
        req.session.user = req.user
        console.log('console: '+req.session)
        res.redirect('/profile')
    }
)



router.post('/current', (req, res, next) => {
    const email = req.headers.email;
    const password = req.headers.password;

    if (!email || !password) {
        return res.status(400).json({ error: "Ingrese email y contraseña." });
    }

    // Adjuntamos el email y la contraseña al body para que passport pueda usarlos
    req.body.email = email;
    req.body.password = password;

    passport.authenticate('login', (err, user, info) => {
        if (err) {
            return next(err); 
        }

        if (!user) {
            return res.status(401).json({ error: info.message || "Authentication failed." });
        }

        
        return res.json(user);

    })(req, res, next);
});



export default router