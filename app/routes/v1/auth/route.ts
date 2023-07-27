import { Router } from "express";
import { login } from "./controller.js";

const router: Router = Router();
router.route("/login").post(login);

export default router;
