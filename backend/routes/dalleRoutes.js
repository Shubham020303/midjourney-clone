import { Client } from "@octoai/client";
import * as dotenv from "dotenv";
import express from "express";

dotenv.config()

const router = express.Router()

const client = new Client(process.env.VITE_OCTOAI_API_KEY);
// const endpointUrl = "https://image.octoai.run/generate/sdxl";

// const inputs = {
// 	"prompt": "A photo of a cute cat astronaut in space",
// 	"negative_prompt": "Blurry photo, distortion, low-res, poor quality",
// 	"width": 1024,
// 	"height": 1024,
// 	"num_images": 1,
// 	"sampler": "DDIM",
// 	"steps": 30,
// 	"cfg_scale": 12,
// 	"use_refiner": true,
// 	"high_noise_frac": 0.8,
// 	"style_preset": "base"
// };

router.route("/").get((req, res) => {
	res.send("Hello from mid jarni")
})

router.route("/").post(async (req, res) => {
	try {
		const { prompt } = req.body
		const outputs = await client.infer("https://image.octoai.run/generate/sdxl", {
			prompt: prompt,
			num_images: 1,
			width: 1024,
			height: 1024,
			sampler: "DDIM",
			steps: 30,
			cfg_scale: 12,
			use_refiner: true,
			high_noise_frac: 0.8,
			style_preset: "base"
		});
		// const aiResponse = await openaiConfig.images.generate({
		// 	model: 'dall-e-3',
		// 	prompt,
		// 	n: 1,
		// 	size: '1024x1024',
		// 	response_format: 'b64_json',
		// });
		const image = outputs.images[0].image_b64
		res.status(200).json({ photo: image })
	} catch (error) {
		console.log(error);
		// res.status(500).send(error?.response.data.error.message)
	}
})

export default router