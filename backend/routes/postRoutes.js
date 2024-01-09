import * as dotenv from "dotenv";
import express from "express";

import Post from "../mongodb/models/post.js";

dotenv.config()

const router = express.Router()

// Get all posts

router.route("/").get(async (req, res) => {

	const posts = await Post.find();
	let page = req.query.page
	let pageSize = 10;
	let startIndex = (page - 1) * pageSize;
	let endIndex = page * pageSize;
	let sortedPosts = posts.slice().reverse()
	let finalPosts = sortedPosts.slice(startIndex, endIndex)
	res.status(201).json({ success: true, data: finalPosts })
})

// Get individual post

router.route("/getPost").get(async (req, res) => {
	let id = req.query.id
	const post = await Post.find({ _id: id });
	res.status(201).json({ success: true, data: post })
})

// Create a post

router.route("/").post(async (req, res) => {

	try {
		const { name, prompt, negativePrompt, stylePreset, dimensions, photo } = req.body
		const images = []
		for (let index = 0; index < photo.length; index++) {
			const element = photo[index];
			let formdata = new FormData()
			formdata.append("image", element.image_b64)
			// formdata.append("name", (name + "-" + prompt + "-" + (index + 1)))
			const result = await fetch("https://api.imgbb.com/1/upload?key=" + process.env.IMGBB_API_KEY, {
				method: 'POST',
				redirect: 'follow',
				body: formdata
			})
				.then(response => response.json())
				.then(result => images.push(result.data.image.url))
				.catch(error => console.log('error', error));
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
