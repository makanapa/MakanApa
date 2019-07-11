const User= require('../models/user')
const {compare}= require('../helpers/bcryt')
const {generateToken}= require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class userController{

    static register(req, res, next){
        // console.log('aaaaaaa')
            let newUser= new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            
            newUser.save()
            .then(user=>{
                res.status(201).json(user)
            })
            .catch(next)
        }
    
    static login(req, res, next){
            console.log('masuk login')
            User.findOne({email: req.body.email})
            .then(user=>{
                console.log(user)
                if(user){
                    if(compare(req.body.password, user.password)){
                        let payload= {
                            id: user._id,
                            email: user.email,
                            name: user.name
                        }
    
                        let token= generateToken(payload)
    
                        res.status(200).json({
                            token,
                            userId: user._id,
                            name: user.name
                        })
                    }else{
                        throw {code: 404, message: 'Wrong Email/Password'}
                    }
                }else{
                    throw {code: 404, message: 'Wrong Email/Password'}
                }
            })
            .catch(next)
        }


    static loginGoogle(req, res, next){
        client
        .verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        })

        .then(function(ticket){
            console.log(ticket)
            const { email, name } = ticket.getPayload()

            let password= name+'makanapa?'
            let fullname= name.split(' ')
            console.log(fullname,'fullname')
            let newUser= new User({
                name: name,
                email: email,
                password: password
            })

            User.findOne({email: email})
            .then(user=>{
                if(user){
                    // console.log(user)
                    let payload= {
                        id: user._id,
                        email: user.email,
                        name: user.name
                    }

                    let token= generateToken(payload)

                    res.status(200).json({
                        token,
                        userId: user._id,
                        name: user.name
                    })

                }else{
                    User.create(newUser)
                    .then(user=>{
                        let payload= {
                            id: user._id,
                            email: user.email,
                            name: user.name
                        }
    
                        let token= generateToken(payload)
    
                        res.status(200).json({
                            token,
                            userId: user._id,
                            name: user.name
                        })
                    })
                    .catch(next)  
                }
            })
            .catch(next)
        })
        .catch(next)
    }
}

module.exports= userController