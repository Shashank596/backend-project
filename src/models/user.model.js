 import mongoose from "mongoose" 
 import jwt from "jsonwebtoken" ;
 import bcrypt from " bcrypt" ;

 const userSchema =  new mongoose.Schema({
     username : {
        type : String,
        required : true , 
        unique : true,
        lowercase  : true ,
        trim : true , 
        index : true


     },
     email : {
        type : String,
        required : true , 
        unique : true,
        lowercase  : true ,
        trim : true , 

     },
     fullname: {
        type : String,
        required : true ,
        trim : true ,
        index : true 

     },
     avatar :  {
        type : String, // clooudinary url
        required : true ,


     },

     coverImage : {
        type : String, // cloudinaryurl

        
     },

     watchHistory : [
        {
            type : Schema.Types.ObjectId,
            ref : "Video"
        }

     ] ,

     password  : {
      type  : String ,
      required  : [true , "Password is Required"]

     } ,
     refreshToken : {
      type : String,
     }



 }, {timestamps : true});


 userSchema.pre("save", async function (next) {
   // async used beacuse it takes time ..

   if(!this.isModified("password")){
          return next() ;

   } //  run only if password field is updated..

   this.password =  bcrypt.hash(this.password, 10)
   next()
 })  // no arrow fn used bcoz arrow not recognises the refrence of "this" keyword
 

 userSchema.methods.isPasswordCorrect = async function(password) {
   return await bcrypt.compare(password , this.password)
 }
 userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
      id: this._id,
      email : this.email,
   },
    process.env.ACCESS_TOKEN_SECRET,
   {
      expiresIn : process.env.ACCESS_TOKEN_EXPIRY 
   }
)
 }
 userSchema.methods.generateRefreshToken = function() {
   return jwt.sign({
      id: this._id,
   },
    process.env.REFRESH_TOKEN_SECRET,
   {
      expiresIn : process.env.REFRESH_TOKEN_EXPIRY 
   }
)
 }

 export const User = mongoose.model("User", userSchema) ;