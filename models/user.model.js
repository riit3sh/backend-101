import mongoose, {Schema} from "mongoose";


const userSchema =new Schema(
    {
        username:{
            type:String,
            unique:true,
            required:true,
            minlength:1,
            maxlength:32,
            trim:true,
            lowercase:true
        },

        password:{
            type:String,
            required:true,
            minlength:6,
            maxlength:50
        },

        email:{
            type:String,
            required:true,
            minlength:5,
            maxlength:100,
            trim:true,
            lowercase:true
        }


    },


    {timestamps:true}
)


export const User=mongoose.model("User",userSchema);