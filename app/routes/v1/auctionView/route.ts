import { Router } from "express";
import { getByAuction } from "./controller.js";

const router: Router = Router();
router.route("/auction/:id").get(getByAuction);
export default router;
