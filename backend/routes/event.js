import express from "express";

import {
    addEvent,
    retrieveEvent,
    updateEvent,
    deleteEvent,
} from "../controllers/event.js";

const router = express.Router();

router.post("/", addEvent);
router.get("/", retrieveEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
