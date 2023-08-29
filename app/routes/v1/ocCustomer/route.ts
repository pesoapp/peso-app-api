import { Router } from "express";
import {
  toggleActiveStatus,
  getById,
  getAll,
  add,
  update,
  removeOne,
  setAddress,
} from "./controller.js";

const router: Router = Router();
router.route("/").get(getAll).post(add);
router.route("/:id").get(getById).patch(update).delete(removeOne);
router.route("/:id/status").patch(toggleActiveStatus);
router.route("/:id/address").patch(setAddress);

export default router;
