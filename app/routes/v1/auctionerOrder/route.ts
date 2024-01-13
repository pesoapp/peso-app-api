import { Router } from "express";
import {
  getAll,
  getAllByAuctioner,
  getById,
  add,
  update,
  removeOne,
  cancel,
} from "./controller.js";

const router: Router = Router();
router.route("/").get(getAll).post(add);
router.route("/cancel").post(cancel);
router.route("/auctioner/:id").get(getAllByAuctioner);
router.route("/:id").get(getById).patch(update).delete(removeOne);
export default router;
