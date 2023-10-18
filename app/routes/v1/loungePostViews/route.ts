import { Router } from "express";
import { getManyByPost } from "./controller.js";

const router: Router = Router();
router.route("/post/:id").get(getManyByPost);
export default router;
