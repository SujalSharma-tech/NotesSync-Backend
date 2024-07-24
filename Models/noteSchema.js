import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  isPinned: {
    type: Boolean,
    default: false,
  },
  isTrashed: {
    type: Boolean,
    default: false,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  isShared: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  folder: {
    type: mongoose.Schema.ObjectId,
    ref: "Folder",
    default: null,
  },
  owner: {
    type: String,
  },
  sharedWith: [
    {
      userId: { type: mongoose.Schema.ObjectId, ref: "User" },
      email: { type: String },
    },
  ],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Notes = mongoose.model("Notes", noteSchema);
