import UserModel from "../Models/userModal.js";

export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id);
        if (user) {
            res.status(201).json({ user });
        }
        else {

            res.status(500).json("No such user exists");
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const getAllUser = async (req, res) => {
    try {
        let user = await UserModel.find();
        res.status(200).json(user);

    } catch (error) {
        res.status(500).josn(error)
    }
}
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { _id, password } = req.body;
    if (id === _id) {
        try {
            if (password) {

            }
            const user = await UserModel.findByIdAndUpdate(id, req.body);
            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ error })
        }
    }
}

export const followUser = async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;
    if (_id === id) {
        res.status(403).json("Access denied Cannot follow yourself");
    } else {
        try {
            const followUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(_id);
            if (!followUser.followers.includes(_id)) {
                await followUser.updateOne({ $push: { followers: _id } });
                await followingUser.updateOne({ $push: { following: id } });
                res.status(200).json("User followed!")
            }
            else {
                res.status(403).json("User is already followed by you");
            }
        } catch (error) {
            res.status(500).json("User is already followed");
        }
    }
}

export const unfollowUser=async(req,res)=>{
    const id=req.params.id;
    const {_id}=req.body;
    if(_id===id){
        res.status(403).json("Action forbidden");
    }
    else{
        try {
            const followUser=await UserModel.findById(id);
            const unfollowUser=await UserModel.findById(_id);
            if(followUser.followers.includes(_id)){
                await followUser.updateOne({$pull:{followers:_id}});
                await unfollowUser.updateOne({$pull:{following:id}});
                res.status(200).json("User unFollowed");
            }
            else{
                res.status(403).json("User is not followed by you");
            }
        } catch (error) {
            res.status(500).json("Action forbidden");
        }
    }
}