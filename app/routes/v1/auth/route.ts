import { Router } from "express";
import { google, login } from "./controller.js";

const router: Router = Router();
router.route("/login").post(login);
router.route("/google").post(google);

export default router;
