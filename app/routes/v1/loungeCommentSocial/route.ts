import { Router } from "express";
import { toggleLike, add, removeOne } from "./controller.js";

const router: Router = Router();
router.route("/").post(add);
router.route("/comment/:comment_id/customer/:customer_id").delete(removeOne);
router.route("/like").patch(toggleLike);
export default router;
