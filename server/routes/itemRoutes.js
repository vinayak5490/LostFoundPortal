import express from "express";
import { createItem, getAllItem } from "../controllers/itemController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/",protect,upload.single('image'), createItem);
router.get("/", getAllItem);


export default router;