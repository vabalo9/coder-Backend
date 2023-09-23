import passport from "passport";
import local from 'passport-local'
import userModel from "../DAO/models/user.model.js";
import GitHubStrategy from 'passport-github2'
import { createHash, isValidPassword } from "../utils.js";
import { cartsService } from "../repositories/index.js"
import {config} from 'dotenv'

config({path:'.env'})


const  newCart  = async()=> {
    const carts = await cartsService.getCarts()
  let ID
  carts.length === 0 ? ID = 1 : ID = carts[carts.length - 1].id + 1;
  const cart = { id: ID, products: [] }

  const cartGenerated = await cartsService.createCart(cart)
  

  return (cartGenerated);
}



const LocalStrategy = local.Strategy

const initializePassport =()=>{
    passport.use('github', new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT,
            clientSecret: process.env.GITHUB_SECRET,
            callbackURL: 'http://127.0.0.1:8080/api/session/githubcallback'
        },
        async (accesToken, refreshToken, profile,done)=>{
            const email= profile._json.email
            const cartIdResult = await newCart();
            try{
                const user = await userModel.findOne({email})
                if(user){
                    console.log('user already exist' + email)
                    return done(null,user)
                }

                const newUser={
                    first_name:profile._json.login,
                    email,
                    password:'',
                    cartId:cartIdResult._id
                }
                const result = await userModel.create(newUser)
                return done(null,result)
            }catch(e){
                return done('error to login with github ' + e)
            }
        }
    ))


    passport.use('register', new LocalStrategy(
        {
            passReqToCallback:true,
            usernameField:'email'
        },
        async(req,username,password,done)=>{
            const {first_name,email,last_name,age}= req.body
            try{
                const user = await userModel.findOne({email:username})
                if (user) {
                    console.log('este usuario ya existe')
                    return done(null,false)
                }
                const cartIdResult = await newCart();
                const newUser= {
                        first_name,
                        last_name,
                        email,
                        age,
                        password : createHash(password),
                        cartId:cartIdResult._id
                }
                const result = await userModel.create(newUser)
                return done(null,result)
            } catch(e) {
                return done ('error de registro' + e)
            }
        }
    ))

    passport.use('login', new LocalStrategy(
        {
            usernameField:'email'
        },
        async (username, password, done )=>{
            try {
            const user = await userModel.findOne({email:username}).lean().exec()
            if (!user) {
                console.log('el usuario no existe')
                return done(null, false)
            }

            if (!isValidPassword(user,password)) {
                console.log('contraseña invalida')
                return done(null,false)
            }
            return done(null,user)
        }catch(e){
            return done ('error login', error)
        }
        }
    ))

    passport.serializeUser((user, done)=>{
        done(null,user._id)
    })

    passport.deserializeUser(async (id, done)=>{
        const user = await userModel.findById(id)
        done(null,user)
    })
}

export default initializePassport