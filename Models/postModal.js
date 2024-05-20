import mongoose from "mongoose";
const postSchema=mongoose.Schema({
    userId:{
        type:String,
        required: true
    }
    ,desc:{ type:String },
    likes:[],
    image:String,

},{
    timeStamps:true
});
var PostModel=mongoose.model("post",postSchema);
export default PostModel;