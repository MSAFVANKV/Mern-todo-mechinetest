import mongoose, { Schema } from "mongoose";



const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },

},{ timestamps: true });

// Export the model
const UserModel = mongoose.model("User", userSchema);
export default UserModel;
