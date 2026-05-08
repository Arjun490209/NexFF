import e from "express";
import auth from "../controllers/auth.controller.js";
import protect from "../middleware/Protect.js";
const router = e.Router();

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/users", protect, getAllUsers);

router.put("/user/role/:id", protect, updateUserRole);

router.put("/user/wallet/:id", protect, addWalletBalance);

router.delete("/user/:id", protect, deleteUser);

export default router;
