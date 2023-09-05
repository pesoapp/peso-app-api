import { Router } from "express";
import {
  getByCustomer,
  getAll,
  getById,
  add,
  update,
  removeOne,
  updateQuantity,
} from "./controller.js";

const router: Router = Router();
router.route("/").get(getAll).post(add);
router.route("/customer/:id").get(getByCustomer);
router.route("/:id").get(getById).patch(update).delete(removeOne);
router.route("/:id/quantity").patch(updateQuantity);
export default router;
