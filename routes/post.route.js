import {Router} from 'express';
import {createPost,updatePost,getPosts,deletePost} from '../controller/post.controller.js';

const router = Router();

router.route("/create").post(createPost);
router.route("/getPosts").get(getPosts);
router.route("/update/:id").patch(updatePost);
router.route("/delete/:id").delete(deletePost);
export default router;
 