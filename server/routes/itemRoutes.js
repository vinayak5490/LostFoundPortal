import express from "express";
import { createItem, getAllItem, deleteItem, getItemById } from "../controllers/itemController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";
import { foundItemContact } from "../controllers/itemController.js";


const router = express.Router();

router.post("/",protect,upload.single('image'), createItem);
router.get("/", getAllItem);
router.delete('/:id', protect, deleteItem);
router.get('/:id', getItemById)
router.post('/found', foundItemContact);


export default router;