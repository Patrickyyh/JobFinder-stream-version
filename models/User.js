import mongoose from "mongoose";
import validator from 'validator'; 
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";


const UserSchema = new mongoose.Schema({
    name: {type: String,
      required:[true, 'Please provide a name'],
      minlength: 3,
      maxlength: 20,
      trim: true, },

    email: {type: String,
      required:[true, 'Please provide a email'],
      validate: {
         validator: validator.isEmail,
         message: 'Please provide valid email'
      }, 
      unique: true,
    },

    password: {type: String,
      required:[true, 'Please provide a password'],
      minlength: 6,
      select: false,  
     },

    lastName: {type: String,
     maxlength: 20,
     trim: true, 
     default: 'lastName'},

    location: {type: String,
        maxlength: 20,
        trim: true, 
        default: 'my city'},
})



// pre middleware for mongoose. 
//hashing the password before saved in the database 
 UserSchema.pre('save',async function(){

   if(!this.isModified('password')){ return;}
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password,salt); 

 });



 //build method for the User Model 
 UserSchema.methods.createJWT = function(){
    // the userId is basically the id of the user in mongoDB
    return jsonwebtoken.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn: '1d'})
 }


 UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await  bcryptjs.compare(candidatePassword,this.password);
    return isMatch; 

 }



export default mongoose.model('User',UserSchema); 