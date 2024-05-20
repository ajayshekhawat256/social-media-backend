import express from 'express';
import { createPost, deletePost, getPost, likePost, updatePost } from '../Controllers/postController.js';
const router=express.Router();

router.post('/',createPost);
router.get('/:id', getPost);
router.put('/update/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id/like', likePost);
// router.get("/:id/timeline", getTimeLinePost);

export default router;