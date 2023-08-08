import { Router } from "express";
import {
  getAllByCustomer,
  getConversation,
  sendMessage,
} from "./controller.js";

const router: Router = Router();
router.route("/customer/:id").get(getAllByCustomer);
router.route("/:id/customer/:customerId").get(getConversation);
router.route("/").post(sendMessage);
export default router;
