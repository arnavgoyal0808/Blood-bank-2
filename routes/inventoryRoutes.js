import express from "express";
import { authmiddleware } from "../middlewares/authMiddleware.js";
import { createinventoryController, getInventoryController } from "../controllers/inventoryControllers.js";
const router = express.Router();

router.post('/create-inventory', authmiddleware,  createinventoryController);

router.get('/get-inventory' , authmiddleware , getInventoryController)


export default router;

