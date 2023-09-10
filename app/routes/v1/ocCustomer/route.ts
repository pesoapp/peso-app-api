import { Router } from "express";
import { getById, setAddress } from "./controller.js";

const router: Router = Router();

router.route("/:id/address").patch(setAddress);
router.route("/:id").get(getById);

export default router;
