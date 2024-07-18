import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Folder } from "../Models/folderSchema.js";
import { Notes } from "../Models/noteSchema.js";

export const addFolder = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;
  const createdBy = req.user._id;
  const username = req.user.name;

  if (!name) {
    return next(new ErrorHandler("Name is required field!", 400));
  }

  const folderData = {
    name,
    createdBy,
  };

  const folder = await Folder.create(folderData);
  res.status(201).json({
    success: true,
    message: "Folder created",
    folder,
  });
});

export const myFolders = catchAsyncErrors(async (req, res, next) => {
  const folders = await Folder.find({ createdBy: req.user._id }).sort({
    createdAt: -1,
  });
  if (!folders) {
    return next(new ErrorHandler("No folders found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Folders fetched",
    folders,
  });
});

export const deleteFolder = catchAsyncErrors(async (req, res, next) => {
  console.log("delete");
  const { id } = req.params;
  const folder = await Folder.findById(id);
  console.log(folder);
  if (!folder) {
    return next(new ErrorHandler("Folder not Found!", 400));
  }
  await Notes.updateMany({ folder: id }, { $set: { folder: null } });

  await folder.deleteOne();
  res.status(200).json({
    success: true,
    message: "Folder deleted!",
    _id: id,
  });
});

export const updateFolder = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;
  const createdBy = req.user._id;

  if (!name) {
    return next(new ErrorHandler("Name is required field!", 400));
  }

  const folderData = {
    name,
  };

  const folder = await Folder.findByIdAndUpdate(id, folderData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(201).json({
    success: true,
    message: "Folder Updated",
    folder,
  });
});
export const updatestatus = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { name, isPinned } = req.body;

  const updatedFields = {};
  if (typeof isPinned !== "undefined") updatedFields.isPinned = isPinned;
  if (typeof name !== "undefined") updatedFields.name = name;

  const folder = await Folder.findByIdAndUpdate(id, updatedFields, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(201).json({
    success: true,
    message: "Folder Updated",
    folder,
  });
});
