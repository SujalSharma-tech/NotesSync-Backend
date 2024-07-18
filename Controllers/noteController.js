import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Folder } from "../Models/folderSchema.js";
import { Notes } from "../Models/noteSchema.js";
import cloudinary from "cloudinary";

export const addNote = catchAsyncErrors(async (req, res, next) => {
  const { title, content } = req.body;
  const createdBy = req.user._id;
  const username = req.user.name;

  if (!title || !content) {
    return next(
      new ErrorHandler("Title and content are required fields!", 400)
    );
  }

  const noteData = {
    title,
    content,
    createdBy,
    username,
  };

  const note = await Notes.create(noteData);
  res.status(201).json({
    success: true,
    message: "Note Uploaded",
    note,
  });
});

export const DeleteNote = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const note = await Notes.findById(id);
  if (!note) {
    return next(new ErrorHandler("Note not found", 400));
  }
  await note.deleteOne();
  res.status(200).json({
    success: true,
    message: "Note deleted!",
  });
});

export const GetAllNotes = catchAsyncErrors(async (req, res, next) => {
  const notes = await Notes.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    notes,
  });
});

export const getSingleNote = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const note = await Notes.findById(id);
  res.status(200).json({
    success: true,
    note,
  });
});
export const getMyNotes = catchAsyncErrors(async (req, res, next) => {
  const createdBy = req.user._id;
  const notes = await Notes.find({ createdBy }).sort({
    createdAt: -1,
  });
  res.status(200).json({
    success: true,
    notes,
  });
});

export const updateNote = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let note = await Notes.findById(id);
  if (!note) {
    return next(new ErrorHandler("Note not Found!", 400));
  }
  const newNoteData = {
    title: req.body.title,
    content: req.body.content,
  };

  note = await Notes.findByIdAndUpdate(id, newNoteData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Note Successfully Updated!",
    note,
  });
});
export const updatestatus = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let note = await Notes.findById(id);
  if (!note) {
    return next(new ErrorHandler("Note not Found!", 400));
  }
  const { isPinned, isTrashed, isArchived, title, content } = req.body;
  const updatedFields = {};
  if (typeof isPinned !== "undefined") updatedFields.isPinned = isPinned;
  if (typeof isTrashed !== "undefined") updatedFields.isTrashed = isTrashed;
  if (typeof isArchived !== "undefined") updatedFields.isArchived = isArchived;
  if (typeof title !== "undefined") updatedFields.title = title;
  if (typeof content !== "undefined") updatedFields.content = content;

  note = await Notes.findByIdAndUpdate(id, updatedFields, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Note Successfully Updated!",
    note,
  });
});
export const restoreNote = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let note = await Notes.findById(id);
  if (!note) {
    return next(new ErrorHandler("Note not Found!", 400));
  }
  // const { isPinned, isTrashed, isArchived, title, content } = req.body;
  const updatedFields = { isTrashed: false };

  note = await Notes.findByIdAndUpdate(id, updatedFields, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Note Successfully Restored!",
    note,
  });
});

export const addToFolder = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params; //folderId
  const { noteId } = req.body; //noteid

  let note = await Notes.findById(noteId);
  if (!note) {
    return next(new ErrorHandler("Note not found", 400));
  }
  let folder = await Folder.findById(id);
  if (!folder) {
    return next(new ErrorHandler("Folder not found", 400));
  }

  if (folder.notes.some((note) => note.toString() === noteId)) {
    return next(new ErrorHandler("Note already in folder", 400));
  }

  const noteData = {
    folder: id,
  };
  note = await Notes.findByIdAndUpdate(noteId, noteData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  const folderData = {
    notes: [...folder.notes, note],
  };
  folder = await Folder.findByIdAndUpdate(id, folderData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Note added to folder successfully",
    folder,
  });
});
