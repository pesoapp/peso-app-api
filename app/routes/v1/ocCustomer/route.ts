import { Router } from "express";
import { setAddress } from "./controller.js";

const router: Router = Router();

router.route("/:id/address").patch(setAddress);

export default router;
