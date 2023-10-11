import { Router } from "express";
import { toggle } from "./controller.js";

const router: Router = Router();
router.route("/toggle").patch(toggle);
export default router;
