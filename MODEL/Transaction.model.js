import mongoose, { Schema } from "mongoose"; 
 import accInfo from "../MODEL/Account.model.js";
import User from "./user.model.js";
 // Jab bhi koi transaction hota hai, sender aur reciever k avail_balance ko update karna hota hai,

//  Account Number (r,s),Authentication,Bank Name and Branch,IFSC Code,Amount,Transfer Type,Purpose of Transfer,OTP (One-Time Password),Transaction Password:,Confirmation, Notifications,Transaction Alerts

const tranactionTable = new Schema({
    Account_no:{
        type:Schema.Types.ObjectId,
        ref:'Account',
    },
    amount:{
        type:Number,
        required:true,
        trim:true,
        validate:{
            validator:function (v){
               return  v>0;
            },
            message:"Amount must be Positive."
        }
    },
    date_time:{
        type:Date,
        default:Date.now,
    },
    transfer_type:{
        type:String,
        // required:true,
        trim:true,
        default:"transfer",
    },
    from_account:{
        // type:Schema.Types.ObjectId,
        // ref:'Account',
        type:String,
        required:function(){
        return this.transfer_type ==='transfer'
        }
    },
    to_account:{
        // type:Schema.Types.ObjectId,
        // ref:'Account',
        type:String,
        required:function(){
            return this.transfer_type === 'transfer'
        }
    },
    status:{
        type:String,
        enum:['completed','pending','failed'],
        required:true,
        default:'completed'
    },
    description:{
        type:[String,"Desription is required"],
        required:true,
        trim:true,
        minlength: [10, "Description must be at least 10 characters long"],
        maxlength: [200, "Description cannot exceed 200 characters"],
    },
    recipient_Name:{
        type:String,
        required:true,
       minlength:[3,"Name must be at least 3 character Long"],
       maxlength:[50,"Name must be at most 50 character long"]
},
    login_id:{
        type: Schema.Types.ObjectId,
        ref: 'User'
},

})
const transaction = mongoose.model("transaction",tranactionTable)
export default transaction;