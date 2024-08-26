import accInfo from "../MODEL/Account.model.js";
import User from "../MODEL/user.model.js";
import userInfoTable from "../MODEL/userInfo.model.js";

export const createAccount = async (request, response, next) => {
    console.log("request.body : ",request.body);
    try {
         
        let { email } = request.body;
        let { login_id } = request.body; // e

        let logindata = await accInfo.findOne({login_id}); //e
        if (logindata) { // e
            // console.log("Login ID passed in UserInfo as ref: ", logindata._id);
            const login_id = logindata.login_id
        } 

        let Useremail = await userInfoTable.findOne({ email: email });
        console.log("User email(account) is already ragisterd.. " + Useremail);
        // console.log(Useremail._id)

        if (!Useremail) Useremail = new userInfoTable(request.body);
        const user = await Useremail.save();
        console.log(user);


        let account = await accInfo.findOne({ user_id: Useremail._id });
        console.log("Given user(id) in Account table: ", account)

        if (account) {
            return response.status(200).json({ message: "Account is already exist..." });
        }

        let accData =  new  accInfo({
            Account_no: (Math.floor(Math.random() * 1000000000000)),
            // Ifsc_code: request.body.Ifsc_code,
            account_Type: request.body.account_Type,
            // balance: request.body.balance,
            avail_balance: request.body.avail_balance,
            user_id: Useremail._id,
            login_id:login_id
        })
        const result = await accData.save();
        console.log("new User account is created successfully...", result);
        return response.status(200).json({ message: "New User Account is created successfully...", User : Useremail ,Account: result })
    } catch (err) {
        console.log(err);
    }
}

// export const perticulerUser = async(request,response,next)=>{
//     const user_id = request.query.user_id;
//     try{
//         await accInfo.findOne({user_id}).populate({path: 'user_id'})
//        .then(result=>{
//         return response.status(200).json({message : "User Account  details: ", data : result})
//        }).catch(err =>{
//         console.log(err);
//         return response.status(500).json({error:"Internal server Problem"})
//        })
//     } catch(err){
//         console.log(err);
//         return response.status(500).json({error:"Internal server Problem"})
//     }
// }

export const perticulerUser = async (request, response, next) => {
    const login_id = request.query.login_id;

    try {
        const loginUser = await accInfo.findOne({ login_id });
        console.log(loginUser);

        if (!loginUser) {
            return response.status(200).json({ message: "1ST Login for View the Account Holder Information" });
        }

        const user_id = loginUser.user_id;
        console.log("user_id", user_id);

        const result = await accInfo.findOne({ user_id }).populate('user_id');
        return response.status(200).json({ message: "User Account details: ", data: result });

    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server Problem" });
    }
};



export const updateUser = async (request, response, next) => {
     console.log("updateUser called",request.body);

    try {
        const {
            contact_no,
            email,
            address,
            city,
            state,
            country,
            occupation,
            user_id
        } = request.body;

        // const loginUser = await accInfo.findOne({ login_id });
        // console.log(loginUser);

        // if (!loginUser) {
        //     return response.status(200).json({ message: "1ST Login for View the Account Holder Information" });
        // }

        const userUpdate = await userInfoTable.updateOne(
            { _id: user_id },
            {
                $set: {
                    contact_no,
                    email,
                    address,
                    city,
                    state,
                    country,
                    occupation
                }
            }
        );

        if (userUpdate.matchedCount === 0) {
            return response.status(404).json({ message: "User not found" });
        }

        if (userUpdate.modifiedCount > 0) {
            return response.status(200).json({ message: "User updated successfully" });
        } else {
            return response.status(200).json({ message: "No changes made to the user" });
        }
    } catch (err) {
        console.error(err);
        response.status(500).json({ message: "An error occurred while updating the user" });
    }
};


