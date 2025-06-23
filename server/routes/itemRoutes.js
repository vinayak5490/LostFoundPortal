import express from "express";
import { createItem, getAllItem } from "../controllers/itemController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",protect, createItem);
router.get("/", getAllItem);


export default router;