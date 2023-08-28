import { Router } from "express";
import {
  getManyByCustomer,
  getAll,
  getById,
  add,
  update,
  removeOne,
} from "./controller.js";

const router: Router = Router();
router.route("/").get(getAll).post(add);
router.route("/:id").get(getById).patch(update).delete(removeOne);
router.route("/customer/:id").get(getManyByCustomer);
export default router;
