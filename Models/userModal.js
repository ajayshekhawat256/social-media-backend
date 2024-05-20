import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        requirde: true
    },
    lastName: {
        type: String,
        required: true
    },
    isAdmin: {
        type: String,
        required: false
    },
    profilePicture: String,
    coverPicture: String,
    about: String,
    livesin: String,
    worksAt: String,
    country: String,
    relationship: String,
    followers: [],
    following: []
},
    { timestamps: true }
)
const UserModel=mongoose.model("Users",UserSchema);
export default UserModel;