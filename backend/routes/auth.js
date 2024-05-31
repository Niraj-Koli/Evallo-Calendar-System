import express from "express";

import { authenticateUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/googleLogin", authenticateUser);

export default router;
