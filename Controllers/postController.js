import PostModel from "../Models/postModal.js"

export const createPost = async (req, res) => {
    const newPost = new PostModel(req.body);
    try {
        await newPost.save();
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await PostModel.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    try {
        const post = await PostModel.findById(postId);
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Post Updated");
        }
        else {
            res.status(403).json("Action forbidden");
        }


    } catch (error) {
        res.status(500).json(error);
    }
}
export const deletePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    try {
        const post = await PostModel.findById(id);
        if (userId === post.userId) {
            await post.deleteOne();
            res.status(200).json("Post deleted successufully");
        }
        else {
            res.status(401).json("Action forbidden");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}
export const likePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    try {
        const post = await PostModel.findById(id);
        if (post.likes.includes(userId)) {
            await post.updateOne({ $pull: { likes: userId } });
            res.status(200).json("Post disliked");
        }
        else {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json("Post liked");
        }

    } catch (error) {
        res.status(500).json(error);
    }
}