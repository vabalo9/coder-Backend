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
        console.log(req.session)
        res.redirect('/profile')
    }
)


export default router