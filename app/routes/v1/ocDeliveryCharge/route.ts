import { Router } from "express";
import { getAll, add, update, removeOne } from "./controller.js";

const router: Router = Router();
router.route("/").get(getAll).post(add);
router.route("/:id").patch(update).delete(removeOne);

export default router;
