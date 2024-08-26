
// import transaction from "../MODEL/Transaction.model.js";
// import accInfo from "../MODEL/Account.model.js";
// import mongoose from "mongoose";
// import { request, response } from "express";
// import userInfoTable from "../MODEL/userInfo.model.js";

// // isme sender (from_account) aur receiver (to_account) accounts ke balances update hote hain. transactions ko track karne ke liye ek Transaction model use kr rhe h

// export const transactionOp = async (request, response, next) => {
//   try {
//     console.log(request.body);
//     let { from_account, to_account, amount } = request.body;
//     const Ifsc_code = "AAAA0BBBBBB";
//     const transfer_type = "transfer";  // fix kr skte

//     // if (transfer_type !== "transfer") { // depend on user but we only 1 option transfer so we fix it
//     //   return response.status(400).json({
//     //     message:
//     //       "Invalid transaction type. Only 'transfer' transactions are allowed.",
//     //   });
//     // }
//     // amount is a valid number
//     amount = Number(amount);
//     if (isNaN(amount) || amount <= 0) {
//       return response.status(400).json({
//         message: "Invalid amount. Please enter a valid amount.",
//       });
//     }

//     if (transfer_type === "transfer") {
//       // Fetch the sender account details
//       let senderAcc = await accInfo.findOne({ Account_no: from_account });
//       if (!senderAcc) {
//         return response
//           .status(400)
//           .json({ message: "Sender account number does not exist..." });
//       }
//       console.log("senderAcc: ", senderAcc);
//       // kyoki Decimal128 obj k form db m store hote > , < === se compare nhi kar skte, convert avail_bal Decimal128 into number for comparison

//       let senderbalance = parseFloat(senderAcc.avail_balance.toString());

//       if (typeof senderbalance !== "number" || isNaN(senderbalance)) {
//         return response
//           .status(500)
//           .json({ message: "Invalid sender account balance" });
//       }

//       if (senderbalance < amount) {
//         return response.status(400).json({ message: "Insufficient balance." });
//       }
//       // else sender account amt deduct hoga

//       // Deduct amount from sender's account
//       let updateSenderBalance = senderbalance - amount;

//       // Convert back to Decimal128 before saving
//       senderAcc.avail_balance = mongoose.Types.Decimal128.fromString(
//         updateSenderBalance.toString()
//       );

//       // save deduct balance      //(undefined - amount), toh result NaN

//       const result2 = await senderAcc.save();
//       console.log("Amount sent by sender: " + result2);

//       // receiver account details fetch
//       let receiverAcc = await accInfo.findOne({ Account_no: to_account });
//       console.log("receiverAcc: ", receiverAcc);

//       if (!receiverAcc) {
//         return response
//           .status(400)
//           .json({ message: "Receiver account does not exist.." });
//       } // receive me add hoga amount

//       // Convert avail_balance to a Number, perform the addition, then convert back to Decimal128
//       let receiverBalance = parseFloat(receiverAcc.avail_balance.toString());

//       let updateReceiverBalance = receiverBalance + amount;

//       // Convert back to Decimal128 before saving
//       receiverAcc.avail_balance = mongoose.Types.Decimal128.fromString(
//         updateReceiverBalance.toString()
//       );

//       const result1 = await receiverAcc.save();
//       console.log("Amount received by receiver: " + result1);
//     }

//     // transaction details store k liye transaction object create
//     const transactionData = new transaction({
//       from_account,
//       to_account,
//       amount,
//       transfer_type,
//       Ifsc_code,
//       description: `Transaction of ${amount} from ${from_account} to ${to_account}`,
//     });

//     const result3 = await transactionData.save();
//     console.log("Transaction data: " + result3);

//     return response
//       .status(200)
//       .json({ message: "Transaction is successfully done", Details: result3 });
//   } catch (err) {
//     console.log(err);
//     return response.status(500).json({
//       message: "An error occurred during the transaction.",
//       error: err.message,
//     });
//   }
// };

//====================================Correct============================================

import transaction from "../MODEL/Transaction.model.js";
import accInfo from "../MODEL/Account.model.js";
import mongoose from "mongoose";
import { request, response } from "express";
import userInfoTable from "../MODEL/userInfo.model.js";
import { Decimal128 } from 'mongodb'; 

// isme sender (from_account) aur receiver (to_account) accounts ke balances update hote hain. transactions ko track karne ke liye ek Transaction model use kr rhe h

export const transactionOp = async (request, response, next) => {
  try {
    console.log(request.body);
    let { to_account, amount, login_id, recipient_Name } = request.body;
    const Ifsc_code = "AAAA0BBBBBB";
    const transfer_type = "transfer";  // fix kr skte

    if (!to_account || !amount || !login_id) {
      return response.status(400).json({ message: "Missing required fields." });
    }
    const accountDetails = await accInfo.findOne({ login_id })
    console.log(accountDetails);
    console.log("accountDetails.login_id", accountDetails.Account_no);
    const loginId = accountDetails.login_id

    if (!accountDetails) {
      return response.status(404).json({ message: "Sender account not found." });
    }
    const from_account = accountDetails.Account_no;

    // if (transfer_type !== "transfer") { // depend on user but we only 1 option transfer so we fix it
    //   return response.status(400).json({
    //     message:
    //       "Invalid transaction type. Only 'transfer' transactions are allowed.",
    //   });
    // }
    // amount is a valid number
    amount = Number(amount);
    if (isNaN(amount) || amount <= 0) {
      return response.status(400).json({
        message: "Invalid amount. Please enter a valid amount.",
      });
    }

    if (transfer_type === "transfer") {
      // Fetch the sender account details
      let senderAcc = await accInfo.findOne({ Account_no: from_account });
      if (!senderAcc) {
        return response
          .status(400)
          .json({ message: "Sender account number does not exist..." });
      }
      console.log("senderAcc: ", senderAcc);
      // kyoki Decimal128 obj k form db m store hote > , < === se compare nhi kar skte, convert avail_bal Decimal128 into number for comparison

      let senderbalance = parseFloat(senderAcc.avail_balance.toString());

      if (typeof senderbalance !== "number" || isNaN(senderbalance)) {
        return response
          .status(500)
          .json({ message: "Insufficient account balance" });
      }

      if (senderbalance < amount) {
        return response.status(400).json({ message: "Insufficient balance." });
      }
      // else sender account amt deduct hoga

      // deduct amount from sender's account
      let updateSenderBalance = senderbalance - amount;

      // convert back to Decimal128 before saving
      senderAcc.avail_balance = mongoose.Types.Decimal128.fromString(
        updateSenderBalance.toString()
      );

      // save deduct balance      //(undefined - amount), toh result NaN

      const result2 = await senderAcc.save();
      console.log("Amount sent by sender: " + result2);

      // receiver account details fetch
      let receiverAcc = await accInfo.findOne({ Account_no: to_account });
      console.log("receiverAcc: ", receiverAcc);

      if (!receiverAcc) {
        return response
          .status(400)
          .json({ message: "Receiver account does not exist.." });
      } // receive me add hoga amount

      // convert avail_balance to a Number, perform the addition, then convert back to Decimal128
      let receiverBalance = parseFloat(receiverAcc.avail_balance.toString());

      let updateReceiverBalance = receiverBalance + amount;

      // convert back to Decimal128 before saving
      receiverAcc.avail_balance = mongoose.Types.Decimal128.fromString(
        updateReceiverBalance.toString()
      );

      const result1 = await receiverAcc.save();
      console.log("Amount received by receiver: " + result1);
    }

    // transaction details store k liye transaction object create
    const transactionData = new transaction({
      from_account,
      to_account,
      amount,
      transfer_type,
      Ifsc_code,
      recipient_Name,
      login_id:loginId,
      description: `Transaction of ${amount} from ${from_account} to ${to_account}`,
    });

    const result3 = await transactionData.save();
    console.log("Transaction data: " + result3);

    return response
      .status(200)
      .json({ message: "Transaction is successfully done", data: result3 });
  } catch (err) {
    console.log(err);
    return response.status(500).json({
      message: "An error occurred during the transaction.",
      error: err.message,
    });
  }
};



// export const statementview = async (request, response, next) => {
//   try {
//     console.log(request.body);

//     const login_id = request.query.login_id; 
//     if (!login_id) {
//       return response.status(400).json({ message: "Missing required fields." });
//     }

//     const accountDetails = await accInfo.findOne({ login_id });
//     if (!accountDetails) {
//       return response.status(404).json({ message: "Account not found." });
//     }

//     const from_account = accountDetails.Account_no;
//     console.log("Account Number:", from_account);
//     const avail_balance = accountDetails.avail_balance;

//     const transactions = await transaction.find({ from_account });
//     if (transactions.length > 0) {
//       console.log(transactions);
//     const avail_balance = accountDetails.avail_balance;
//       return response.status(200).json({ message: "User transaction details:", data: transactions,avail_balance });
//     } else {
//       return response.status(404).json({ message: "No transactions found for this account." });
//     }
//   } catch (error) {
//     console.error("Error fetching transaction details:", error);
//     return response.status(500).json({ message: "Internal Server Error" });
//   }
// };



export const statementview = async (request, response, next) => {
  try {
    const login_id = request.query.login_id;
    if (!login_id) {
      return response.status(400).json({ message: "Missing required fields." });
    }

    // Fetch the initial account details
    const accountDetails = await accInfo.findOne({ login_id });
    if (!accountDetails) {
      return response.status(404).json({ message: "Account not found." });
    }

    const { Account_no: from_account, avail_balance } = accountDetails;
    
    // convert avail_balance from Decimal128 to a js no
    let currentBalance = parseFloat(avail_balance.toString());

    const transactions = await transaction.find({ login_id });

    if (transactions.length > 0) {
      // attach avail_balance to each transaction
      const transactionsWithBalance = transactions.map(txn => {
        const amount = parseFloat(txn.amount.toString());

        // Subtract the transaction amount for transfers
        currentBalance -= amount;

        // Return transaction with updated balance
        return {
          ...txn.toObject(),
          avail_balance: currentBalance.toFixed(2), // Format balance to 2 decimal places
        };
      });

      return response.status(200).json({
       data: {
          transactions: transactionsWithBalance,
          from_account,
        }
      });
    } else {
      return response.status(404).json({ message: "No transactions found for this account." });
    }
  } catch (error) {
    console.error("Error fetching transaction details:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
};

