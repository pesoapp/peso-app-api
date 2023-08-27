import { Router } from "express";
import {
  getByCustomer,
  getAll,
  getById,
  add,
  update,
  removeOne,
} from "./controller.js";

const router: Router = Router();
router.route("/").get(getAll).post(add).delete(removeOne);
router.route("/:id").get(getById).patch(update);
router.route("/customer/:id").get(getByCustomer);

export default router;
