import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

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
        },

       

    },


    {timestamps:true}
)


userSchema.pre("save", async function() {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});


userSchema.methods.comparePassword = async function(candidatePassword) {
    // Guard against missing inputs to avoid: "data and hash arguments required"
    if (typeof candidatePassword !== 'string' || candidatePassword.trim().length === 0) {
        return false;
    }
    if (!this.password || typeof this.password !== 'string' || this.password.trim().length === 0) {
        return false;
    }
    return await bcrypt.compare(candidatePassword, this.password);
};


export const User=mongoose.model("User",userSchema);