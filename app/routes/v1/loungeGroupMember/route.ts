import { Router } from "express";
import {
  removeCustomer,
  getByCustomer,
  getAll,
  getById,
  add,
  update,
  removeOne,
} from "./controller.js";

const router: Router = Router();
router.route("/").get(getAll).post(add);
router.route("/:id").get(getById).patch(update).delete(removeOne);
router.route("/customer/:id").get(getByCustomer);
router.route("/:id/customer/:customer_id").delete(removeCustomer);
export default router;
