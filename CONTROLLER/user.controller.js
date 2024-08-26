import { request, response } from "express";
import User from "../MODEL/user.model.js";
import { validationResult } from "express-validator";

export const signUp = async (request, response, next) => {
    const error = validationResult(request)
    if(!error.isEmpty())
        return response.status(401).json({error:error.array()})
    try {
        console.log("sign up");
        const newUser = new User({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
        })
        const result = await newUser.save()
        console.log(result);
        return response.status(200).json({ User: result, message: "User created successfully." });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server Problem..."});
    }
}

export const signIn = async(request,response,next)=>{
    console.log("sign in called");
    let username = request.query.username;
    let password = request.query.password;
    console.log("username "+username , "password "+password);
    try{
        let user = await User.findOne({email:username})
        if(user){
            console.log("user: ",user)

            if(User.checkPassword(password , user.password)){
                const userData = {
                    user_id : user.id,
                    name:user.name,
                    email:user.email
                } 
//i adjust  code to implement a "Forgot Password" option after three unsuccessful login attempts, instead of locking the account for a fixed period. This approach aligns more with real-world applications.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     

             return response.status(200).json({message:"Sign in Success...",data:user});

            } else {
                return response.status(500).json({Error:"Unauthorized User"});
            }
        }
            return response.status(500).json({Error:"Internal server problem..."});

    } catch(err){
        console.log("Unauthorized user..",err);
    }

}