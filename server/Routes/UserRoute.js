import express from "express";
import { deleteUser, followUser, getAllUsers, getUser, unFollowUser, updateUser } from "../Controllers/UserController.js";
import authMiddleWare from "../MiddleWare/authMiddileWare.js";

const router = express.Router();

router.get('/:id', getUser);
router.put('/:id', updateUser)
router.delete('/:id', deleteUser);
router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unFollowUser);
router.get('/', getAllUsers);

export default router;