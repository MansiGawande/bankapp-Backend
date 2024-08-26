import bcrypt from 'bcryptjs'
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
    },
    password:{
        type:String,
        required : true,
        // minlength:8,
        set(value) { // value = password
           let saltkey = bcrypt.genSaltSync(10);
           let encryptedPassword = bcrypt.hashSync(value,saltkey);
           console.log("encryptedPassword: ",encryptedPassword); // $2a$10$V4QaMkWrQJcKcqhc42T.deZakna/GLXDyY7KBVMHkyMphRpHdCoVy
           return encryptedPassword;
        }
    },
    failedAttempts: {
        type: Number,
        default: 0
    },
    lockoutUntil: {//track whether the account is locked due to failed password attempts.temporarily prevent further login attempts
        type: Date,
        default: null
    }

})
const User = mongoose.model("User", userSchema);

User.checkPassword = (originalPassword,encryptedPassword) =>{
    console.log("Check password called...");
    return bcrypt.compareSync(originalPassword,encryptedPassword);
}
export default User;
