import { Router } from "express";
import { getByAuction, toggle } from "./controller.js";

const router: Router = Router();
router.route("/auction/:id").get(getByAuction);
router.route("/toggle").patch(toggle);
export default router;
