import { Router } from "express";
import {
  getAll,
  getAllByAuctioner,
  getById,
  add,
  update,
  removeOne,
} from "./controller.js";

const router: Router = Router();
router.route("/").get(getAll).post(add);
router.route("/auctioner/:id").get(getAllByAuctioner);
router.route("/:id").get(getById).patch(update).delete(removeOne);
export default router;
