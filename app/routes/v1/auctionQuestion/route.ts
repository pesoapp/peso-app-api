import { Router } from "express";
import {
  getByAuction,
  getAll,
  getById,
  add,
  update,
  removeOne,
} from "./controller.js";

const router: Router = Router();
router.route("/").get(getAll).post(add);
router.route("/:id").get(getById).patch(update).delete(removeOne);
router.route("/auction/:id").get(getByAuction);
export default router;
