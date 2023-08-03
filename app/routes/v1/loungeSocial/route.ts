import { Router } from "express";
import {
  getAllLikesByPost,
  getAll,
  getById,
  add,
  update,
  removeOne,
} from "./controller.js";

const router: Router = Router();
router.route("/").get(getAll).post(add);
router.route("/:id").get(getById).patch(update).delete(removeOne);
router.route("/post/:id/likes").get(getAllLikesByPost);
export default router;
