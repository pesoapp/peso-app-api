import { Router } from "express";
import { getById, getAll, add, update, removeOne } from "./controller.js";

const router: Router = Router();
router.route("/").get(getAll).post(add);
router.route("/:id").get(getById).patch(update).delete(removeOne);

export default router;
