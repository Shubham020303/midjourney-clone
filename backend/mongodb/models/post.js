import mongoose from "mongoose";

const Post = mongoose.Schema({
	name: { type: String, required: true },
	prompt: { type: String, required: true },
	negativePrompt: { type: String },
	stylePreset: { type: String },
	dimensions: { type: String },
	photo: [{ type: String, required: true }],
})

const PostSchema = mongoose.model("Post", Post)

export default PostSchema