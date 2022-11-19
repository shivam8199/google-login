import * as express from 'express';
import * as  passport from "passport";
import {Strategy} from 'passport-google-oauth20'

const fs=require('fs')
const app = express();
app.listen(5500, () => {
    console.log('server is started');
})

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

passport.use(new Strategy({
        clientID: '1092273081093-q4nju88sko5ogm2t6rkqau8la3ko2dft.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:5500/auth/google/callback'
    },
    function (accessToken, refreshToken, profile, done) {
        // if user already exist in your dataabse login otherwise
        // save data and signup
        done(null, {});
    }
));

app.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));

app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/auth/fail'}),
    (req, res, next) => {
        console.log(req.user, req.isAuthenticated());
       res.send('<h1>hi you are in </h1>')
    })
// app.get('/register',(req,res,next)=>{
// res.json
// })
    
app.get('/auth/fail', (req, res, next) => {
    res.send('user logged in failed');
});

app.get('/logout', (req, res, next) => {
    req.logout();
    res.send('user is logged out');
});

