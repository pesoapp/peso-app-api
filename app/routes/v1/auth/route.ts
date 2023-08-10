import { Router } from "express";
import { apple, facebook, google, login } from "./controller.js";

const router: Router = Router();
router.route("/login").post(login);
router.route("/google").post(google);
router.route("/facebook").post(facebook);
router.route("/apple").post(apple);
export default router;
