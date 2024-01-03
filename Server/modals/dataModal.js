
import mongoose, { Schema } from "mongoose";



const userDataSchema = new Schema({
    fullname: { type: String, required: true },
    department: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });


// Export the model
const UserDataModel = mongoose.model("data", userDataSchema);
export default UserDataModel;
