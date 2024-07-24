import express from "express";

import {
  DeleteNote,
  getSingleNote,
  addNote,
  GetAllNotes,
  getMyNotes,
  updateNote,
  addToFolder,
  updatestatus,
  restoreNote,
  DeleteAll,
  searchUser,
  shareNote,
  sharedWithMe,
} from "../Controllers/noteController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/addnote", isAuthenticated, addNote);
router.post("/addtofolder/:id", isAuthenticated, addToFolder);
router.delete("/deletenote/:id", isAuthenticated, DeleteNote);
router.get("/mynotes", isAuthenticated, getMyNotes);
router.get("/getsinglenote/:id", getSingleNote);
router.put("/updatenote/:id", isAuthenticated, updateNote);
router.patch("/updatestatus/:id", isAuthenticated, updatestatus);
router.patch("/:id/restore", isAuthenticated, restoreNote);
router.delete("/deleteall", isAuthenticated, DeleteAll);
router.get("/searchuser", isAuthenticated, searchUser);
router.post("/sharenote", isAuthenticated, shareNote);
router.get("/shared-with-me", isAuthenticated, sharedWithMe);

export default router;
