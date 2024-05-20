import MessageModel from "../Models/messageModal.js"

export const addMessage=async(req,res)=>{
    const message=new MessageModel({
        text,
    })
    try {
        const result=await message.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getMessage=async(req,res)=>{
    const {chatId}=req.params;
    try {
        const result=await MessageModel.find({chatId});
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}