import { Router } from "express";
import {
  getByAuction,
  getAll,
  getById,
  add,
  update,
  removeOne,
  approve,
} from "./controller.js";

const router: Router = Router();
router.route("/").get(getAll).post(add);
router.route("/:id").get(getById).patch(approve).delete(removeOne);
router.route("/auction/:id").get(getByAuction);
export default router;
