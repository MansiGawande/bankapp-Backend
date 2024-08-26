import mongoose, { Schema } from "mongoose";
import validator from "validator";

function validateDob(dob){
    //regex format dd/mm/yyyy
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

//^(0[1-9]|[12][0-9]|3[01] ensure day b/w 1 to31
//\/(0[1-9]|1[0-2]) ensures month b/w 1 to 12
//\/\d{4}$ ensures the year has four digits.

if(!regex.test(dob)){ //match with dob
    return false // incorrect format
}

// Split the date into day, month, and year
const [day,month,year] = dob.split('/');


//create a js date obj from string 
const date = new Date(`${year}-${month}-${day}`);

// Check if the date is in the past
return date <new Date();
}

const userInfo = new Schema({

    name:{
        type:String,
         required:true,
        minlength:[3,"Name must be at least 3 character Long"],
        maxlength:[50,"Name must be at most 50 character long"]
    },
    email:{
        type:String,
         required:true,
        trim:true,
        lowercase:true,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:"Please provide valid email"
     }
    },
    contact_no:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        maxlength:[10,"contact no must be 10 digit"],
        minlenght:[10,"contact number must be 10 digit"],
        validate:{
            validator:function(v){
                return /^[0-9]{10}$/.test(v); // contact
            },
            message:"contact number must be 10 digit"
        }
    },
   
    city:{
        type:String,
          required:true,
        trim: true
    },
    
    dateOfBirth:{
            type:String,
              required: true,
            trim: true,
            validate:{
                validator:validateDob,
                message:"Date of Birth must be in the format dd/mm/yy and in the past"
            }
        },
    PAN_no:{
        type:String,
          required: true,
        trim:true,
        maxlength: [10, "PAN number must be exactly 10 characters"],
        minlength: [10, "PAN number must be exactly 10 characters"],
        unique:true,
        validate: {
            validator: function(v) {
                return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v);
            },
            message: "Please provide a valid PAN number"
        }

//         [A-Z]{5}: Matches exactly 5 uppercase letters (A to Z). ABCDE1234F
// [0-9]{4}: Matches exactly 4 digits (0 to 9).
// [A-Z]{1}: Matches exactly 1 uppercase letter (A to Z)
        
    },
    address:{
        type:String,
         required:true,
        trim:true,
        maxlength:80,
        minlength: [10, "Address must be at least 10 characters long"],
        maxlength: [80, "Address can be at most 80 characters long"]
    },
    state:{
        type:String,
        required:true,
        trim:true,
        minlength: [2, "State name must be at least 2 characters long"],
        maxlength: [50, "State name can be at most 50 characters long"]
    
    },
    country:{
        type:String,
        trim:true,
         required:[true,"Country is required"],
        minlength: [2, "Country name must be at least 2 characters long"],
        maxlength: [50, "Country name can be at most 50 characters long"]
    
    },
    // regex:"^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}", aadhar no regex
    aadhar_no: {
        type: String,
          required: true,
        trim: true,
        minlength: [12, 'Aadhar card number must be 12 digits long'],
        maxlength: [12, 'Aadhar card number must be 12 digits long'],
        match: [/^\d{12}$/, 'Aadhar card number must be exactly 12 digits']
    },
    gender: {
        type: String,
        required: true,
        trim: true,
        enum: ['Male', 'Female', 'Other'], 
    },
    occupation: {
        type: String,
        required: [true, 'Occupation is required'],
        enum: {
          values: ['Salaried', 'Self-Employed', 'Business', 'Student', 'Retired', 'Unemployed'],
          message: 'Occupation must be one of Salaried, Self-Employed, Business, Student, Retired, or Unemployed'
        },
        minlength: [3, 'Occupation must be at least 3 characters long'],
        maxlength: [50, 'Occupation must be less than 50 characters long'],
        trim: true
      },
    

},{timestamps:true})
const userInfoTable = mongoose.model("CustomerInfo",userInfo);
export default userInfoTable;