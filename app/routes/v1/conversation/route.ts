import { Router } from "express";
import { getAllByCustomer } from "./controller.js";

const router: Router = Router();
router.route("/customer/:id").get(getAllByCustomer);
export default router;
