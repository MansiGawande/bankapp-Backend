import { request, response } from "express";
import accInfo from "../MODEL/Account.model.js";

export const createAccount = async(request,response,next)=>{
try{
    const accData = new accInfo({
        Account_no : (Math.floor(Math.random() * 1000000000000)),
        Ifsc_code:request.body.Ifsc_code,
        account_Type:request.body.account_Type,
        branch:request.body.branch,
        avail_balance:request.body.avail_balance,
})
const result = await accData.save();
console.log(result);
return response.status(200).json({ UserInfo: result, message: "User Information created successfully." });

} catch(err){
    console.log(err);
}
}


