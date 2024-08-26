import mongoose, { Schema } from "mongoose";
import userInfoTable from "./userInfo.model.js"
import User from "./user.model.js"

const accountInfo = new Schema({
    Account_no:{
        type:Number,
        required:true,
        unique:true,
        trim:true,
        minlength:[12,"Name must be at least 12 Digit Long"],
        maxlength:[12,"Name must be at least 12 Digit Long"],
    },
    Ifsc_code:{
        type:String,
        required:true,
        trim:true,
        default:"AAAA0BBBBBB", //  1st 4 for bank name,0 is 5th ch always,6 is branch code =11

        validate: {
            validator: function (v) {
                console.log(v);
                return v && v.length === 11;
            },
            message: "IFSC code should be exactly 11 characters long"
        }
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'CustomerInfo'
    },
    account_Type:{
        type:String,
        required:true,
        trim:true,
        //  default: "saving",
    },
    avail_balance:{
        type:mongoose.Types.Decimal128,
        trim:true,
        required:true,
        // default: 0.0,
        validate:{
            validator:function (v){
                return v>=0;
            },
            message: "Available balance must be non-negative."
        }
    },
    login_id:{
        type: Schema.Types.ObjectId,
        ref: 'User'
},
        timestamps:{
        type:Date, 
        default: Date.now // isi me store hota hai fatch apne acc 
}
});

const accInfo = mongoose.model("Account",accountInfo);

export default accInfo;