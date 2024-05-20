import express from 'express';
import { followUser, getAllUser, getUser, unfollowUser, updateUser } from '../Controllers/UserControllers.js';
const router=express.Router();

router.get('/:id',getUser);
router.get('/',getAllUser);
router.put('/update/:id',updateUser);
router.put('/follow/:id',followUser);
router.put('/unFollow/:id',unfollowUser);

export default router