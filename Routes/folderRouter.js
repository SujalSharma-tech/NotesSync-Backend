import express from "express";
import {
  addFolder,
  deleteFolder,
  myFolders,
  updateFolder,
  updatestatus,
} from "../Controllers/folderController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/myfolders", isAuthenticated, myFolders);
router.post("/newfolder", isAuthenticated, addFolder);
router.delete("/deletefolder/:id", isAuthenticated, deleteFolder);
router.put("/updatefolder/:id", isAuthenticated, updateFolder);
router.patch("/updatestatus/:id", isAuthenticated, updatestatus);

export default router;
