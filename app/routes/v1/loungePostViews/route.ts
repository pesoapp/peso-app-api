import { Router } from "express";
import { add, getManyByPost } from "./controller.js";

const router: Router = Router();
router.route("/post/:id").get(getManyByPost);
router.route("/").post(add);
export default router;
