import { Router } from "express";
import { getById } from "./controller.js";

const router: Router = Router();
router.route("/:id").get(getById);
export default router;
