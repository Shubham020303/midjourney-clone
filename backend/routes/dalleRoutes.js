import { Client } from "@octoai/client";
import * as dotenv from "dotenv";
import express from "express";

dotenv.config()

const router = express.Router()

const client = new Client(process.env.VITE_OCTOAI_API_KEY);

router.route("/").get((req, res) => {
	res.send("Hello from mid jarni")
})

router.route("/").post(async (req, res) => {
	try {
		const { prompt, negativePrompt, stylePreset, dimensions, numOfImages } = req.body
		const outputs = await client.infer("https://image.octoai.run/generate/sdxl", {
			prompt: prompt,
			negative_prompt: negativePrompt,
			num_images: parseInt(numOfImages),
			width: parseInt(dimensions.split("x")[0]),
			height: parseInt(dimensions.split("x")[1]),
			sampler: "DDIM",
			steps: 30,
			cfg_scale: 12,
			use_refiner: true,
			high_noise_frac: 0.8,
			style_preset: stylePreset
		});
		const image = numOfImages > 1 ? outputs.images : outputs.images[0].image_b64
		res.status(200).json({ photo: image })
	} catch (error) {
		console.log(error);
		// res.status(500).send(error?.response.data.error.message)
	}
})

export default router