import mongoose, { Schema } from "mongoose";
import transaction from "../MODEL/Transaction.model.js";
import accInfo from "../MODEL/Account.model.js"
import userInfoTable from "../MODEL/userInfo.model.js"

const StatementTable = new SchemaType({
    user_id:{
        type:Schema.types.ObjectId,
        ref:"CustomerInfo"
    },
    Account_no:{
        type:Schema.types.ObjectId,
        ref:"Account",
    },
    transaction_id:{
       type:Schema.types.ObjectId,
        ref:'transaction'
    },
    start_date:{
        type:Date,

    },end_date:{
        type:Date
    },
    opening_balance:{
        type:Number,
    },
    closing_balance:{
        type:Number
    }
})
const statement = mongoose.Schema("statement",StatementTable);
export default statement;