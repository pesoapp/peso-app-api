import { Router } from "express";
import {
  getAllActive,
  getById,
  setAddress,
  toggleActiveStatus,
} from "./controller.js";

const router: Router = Router();

router.route("/:id/address").patch(setAddress);
router.route("/:id/status").patch(toggleActiveStatus);
router.route("/active").get(getAllActive);
router.route("/:id").get(getById);

export default router;
