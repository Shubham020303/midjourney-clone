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
		let page = req.query.page
		let finalPosts = posts.slice(posts.length - 10 * (page + 1), posts.length - 10 * page)
		res.status(201).json({ success: true, data: finalPosts })
	} catch (error) {
		res.status(500).json({ success: false, message: error })
	}
})

// Create a post

router.route("/").post(async (req, res) => {

	try {
		const { name, prompt, negativePrompt, stylePreset, dimensions, photo } = req.body
		const images = []
		for (let index = 0; index < photo.length; index++) {
			const element = photo[index];
			const result = await cloudinary.uploader.upload("data:image/jpeg;base64," + element.image_b64, { secure: true })
			images.push(result.secure_url)
		}

		const newPost = await Post.create({
			name,
			prompt,
			negativePrompt,
			stylePreset,
			dimensions,
			photo: images
		})

		res.status(201).json({ success: true, data: newPost })
	} catch (error) {
		console.error('Error creating new post:', error);
		res.status(500).json({ success: false, message: error })
	}

})

export default router
