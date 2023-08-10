import { Router } from "express";
import { getAll } from "./controller.js";

const router: Router = Router();
router.route("/").get(getAll);
export default router;
