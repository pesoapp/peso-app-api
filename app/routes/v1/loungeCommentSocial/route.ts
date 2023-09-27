import { Router } from "express";
import { add, removeOne } from "./controller.js";

const router: Router = Router();
router.route("/").post(add);
router.route("/comment/:comment_id/customer/:customer_id").delete(removeOne);
export default router;
