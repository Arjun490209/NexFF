import e from "express";
import auth from "../controllers/auth.controller.js";

const router = e.Router();

router.post("/register", auth.register);
router.post("/login", auth.login);

export default router;
