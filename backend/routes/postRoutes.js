import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import express from "express";

import Post from "../mongodb/models/post.js";

dotenv.config()

const router = express.Router()

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Get all posts

router.route("/").get(async (req, res) => {
	try {
		const posts = await Post.find({});
		res.status(201).json({ success: true, data: posts })
	} catch (error) {
		res.status(500).json({ success: false, message: error })
	}
})

// Create a post

router.route("/").post(async (req, res) => {

	try {
		const { name, prompt, photo } = req.body
		const photoUrl = await cloudinary.uploader.upload(photo, { secure: true })
		
		const newPost = await Post.create({
			name,
			prompt,
			photo: photoUrl.secure_url
		})

		res.status(201).json({ success: true, data: newPost })
	} catch (error) {
		res.status(500).json({ success: false, message: error })
	}

})

export default router
