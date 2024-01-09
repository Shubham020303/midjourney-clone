import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FormField, Loader } from '../components'
import { getRandomPrompt } from "../utils"

const CreatePost = () => {

	const navigate = useNavigate()
	const [form, setForm] = useState({
		name: "",
		prompt: "",
		negativePrompt: "",
		stylePreset: "base",
		dimensions: "1024 x 1024",
		numOfImages: 1,
		photo: ""
	})
	const [numOfImages, setNumOfImages] = useState(1)
	const [bigImage, setBigImage] = useState("")
	const [generatingImg, setGeneratingImg] = useState(false)
	const [loading, setLoading] = useState(false)

	const stylePresets = [
		["Base", "base"],
		["3D Model", "3d-model"],
		["Abstract", "Abstract"],
		["Advertising", "Advertising"],
		["Alien", "Alien"],
		["Analog Film", "analog-film"],
		["Anime", "anime"],
		["Architectural", "Architectural"],
		["Cinematic", "cinematic"],
		["Collage", "Collage"],
		["Comic Book", "comic-book"],
		["Craft Clay", "Craft Clay"],
		["Cubist", "Cubist"],
		["Digital Art", "digital-art"],
		["Disco", "Disco"],
		["Dreamscape", "Dreamscape"],
		["Dystopian", "Dystopian"],
		["Enhance", "enhance"],
		["Fairy Tale", "Fairy Tale"],
		["Fantasy Art", "fantasy-art"],
		["Fighting Game", "Fighting Game"],
		["Film Noir", "Film Noir"],
		["Flat Papercut", "Flat Papercut"],
		["Food Photography", "Food Photography"],
		["Gothic", "Gothic"],
		["Graffiti", "Graffiti"],
		["Grand Theft Auto", "GTA"],
		["Grunge", "Grunge"],
		["HDR", "HDR"],
		["Horror", "Horror"],
		["Hyperrealism", "Hyperrealism"],
		["Impressionist", "Impressionist"],
		["Isometric", "isometric"],
		["Kirigami", "Kirigami"],
		["Legend of Zelda", "Legend of Zelda"],
		["Line Art", "line-art"],
		["Long Exposure", "Long Exposure"],
		["Low Poly", "low-poly"],
		["Minecraft", "Minecraft"],
		["Minimalist", "Minimalist"],
		["Modeling Compound", "modeling-compound"],
		["Monochrome", "Monochrome"],
		["Nautical", "Nautical"],
		["Neon Noir", "Neon Noir"],
		["Neon Punk", "neon-punk"],
		["Origami", "origami"],
		["Paper Mache", "Paper Mache"],
		["Paper Quilling", "Paper Quilling"],
		["Papercut Collage", "Papercut Collage"],
		["Papercut Shadow Box", "Papercut Shadow Box"],
		["Photographic", "photographic"],
		["Pixel Art", "pixel-art"],
		["Pointillism", "Pointillism"],
		["Pokémon", "Pokémon"],
		["Pop Art", "Pop Art"],
		["Psychedelic", "Psychedelic"],
		["Real Estate", "Real Estate"],
		["Renaissance", "Renaissance"],
		["Retro Arcade", "Retro Arcade"],
		["Retro Game", "Retro Game"],
		["RPG Fantasy Game", "RPG Fantasy Game"],
		["Silhouette", "Silhouette"],
		["Space", "Space"],
		["Stacked Papercut", "Stacked Papercut"],
		["Stained Glass", "Stained Glass"],
		["Steampunk", "Steampunk"],
		["Strategy Game", "Strategy Game"],
		["Street Fighter", "Street Fighter"],
		["Super Mario", "Super Mario"],
		["Surrealist", "Surrealist"],
		["Techwear Fashion", "Techwear Fashion"],
		["Thick Layered Papercut", "Thick Layered Papercut"],
		["Tile Texture", "tile-texture"],
		["Tilt - Shift", "Tilt-Shift"],
		["Tribal", "Tribal"],
		["Typography", "Typography"],
		["Watercolor", "Watercolor"],
		["Zentangle", "Zentangle"],
	]

	const dimensions = [
		["1024 x 1024", "1024 x 1024"],
		["896 x 1152", "896 x 1152"],
		["832 x 1216", "832 x 1216"],
		["768 x 1344", "768 x 1344"],
		["640 x 1536", "640 x 1536"],
		["1536 x 640", "1536 x 640"],
		["1344 x 768", "1344 x 768"],
		["1216 x 832", "1216 x 832"],
		["1152 x 896", "1152 x 896"],
	]

	const generateImage = async () => {
		if (form.prompt) {
			try {
				setGeneratingImg(true)
				const response = await fetch("https://midjourney-2-0.onrender.com/api/v1/dalle", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(form)
				})
				const data = await response.json()
				setForm({ ...form, photo: data.photo })
				setBigImage("")
			} catch (error) {
				alert(error)
			} finally {
				setGeneratingImg(false)
			}
		}
		else {
			alert("Please enter a prompt");
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (form.prompt && form.photo) {
			setLoading(true)

			try {
				const response = await fetch("https://midjourney-2-0.onrender.com/api/v1/post", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(form)
				})

				await response.json()
				navigate("/")
			} catch (error) {
				alert(error)
			} finally {
				setLoading(false)
			}
		}
		else {
			alert("Please enter a prompt and generate an image")
		}
	}

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSurpriseMe = () => {
		const randomPromt = getRandomPrompt(form.prompt)
		setForm({ ...form, prompt: randomPromt })
	}

	return (
		<section className='max-w-7xl mx-auto'>
			<div>
				<h1 className='font-extrabold text-[#222328] text-[32px]'>Create</h1>
				<p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>Create imagenative and visually stunning images generated by DALL-E AI and share them with the community</p>
			</div>

			<form className='my-16 w-full' onSubmit={handleSubmit}>
				<div className='flex flex-col lg:flex-row gap-5 w-full'>
					<div className='lg:w-1/2 w-full flex flex-col gap-7'>
						<FormField
							labelName="Your Name"
							type="text"
							name="name"
							placeholder="John Doe"
							value={form.name}
							handleChange={handleChange}
						/>
						<FormField
							labelName="Prompt"
							type="text"
							name="prompt"
							placeholder="panda mad scientist mixing sparkling chemicals, digital art"
							value={form.prompt}
							handleChange={handleChange}
							isSurpriseMe
							handleSurpriseMe={handleSurpriseMe}
						/>
						<FormField
							labelName="Negative Prompt"
							type="text"
							name="negativePrompt"
							placeholder="lion or tiger"
							value={form.negativePrompt}
							handleChange={handleChange}
						/>
						<FormField
							labelName="Style"
							type="dropdown"
							name="stylePreset"
							placeholder="Base"
							value={form.style}
							handleChange={handleChange}
							options={stylePresets}
						/>
						<div className='flex flex-col lg:flex-row items-center gap-5 w-full'>
							<div className='w-full lg:w-1/2'>
								<FormField
									labelName="Dimensions"
									type="dropdown"
									name="dimensions"
									placeholder="1024 x 1024"
									value={form.dimensions}
									handleChange={handleChange}
									options={dimensions}
								/>
							</div>
							<div className='w-full lg:w-1/2'>
								<div className='flex items-center gap-2 mb-2'>
									<p className='block text-sm font-medium text-gray-900'>Image Count</p>
								</div>
								<div className='flex items-center justify-between w-full'>
									{[1, 2, 3, 4].map((item, index) => (
										<p key={index} className={"border border-gray-300 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-fit p-3 px-7 cursor-pointer " + (numOfImages === item ? "bg-[#4649ff] text-white" : "bg-gray-50 text-gray-900")} onClick={() => {
											setNumOfImages(item)
											setForm({ ...form, numOfImages: item })
										}}>{item}</p>
									))}
								</div>
							</div>
						</div>
						<div className='mt-5 flex gap-5'>
							<button type='button' onClick={generateImage} className={'text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center ' + (generatingImg ? "cursor-not-allowed" : "cursor-pointer")} disabled={generatingImg ? true : false}>
								{generatingImg ? "Generating..." : "Generate"}
							</button>
						</div>
						<div className=''>
							<p className='mt-2 text-[#666e75] text-[14px]'>Once you have created the image you want, you can share it with the community</p>
							<button type="submit" className='mt-3 text-white bg-[#6464ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
								{loading ? "Sharing..." : "Share with the community"}
							</button>
						</div>
					</div>
					<div className='lg:w-1/2 lg:mb-10'>
						<div className='lg:w-full lg:h-full w-full relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 h-54 flex justify-center items-center'>
							{form.photo ? (
								<img src={"data:image/jpeg;base64," + (bigImage === "" ? form.photo[0].image_b64 : bigImage)} alt={form.prompt} className='w-full h-full object-cover rounded-md' />
							) : (
								<svg
									fill="currentColor"
									className='w-9/12 h-9/12 object-contain opacity-40'
									viewBox="0 0 16 16"
								>
									<path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
									<path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5z" />
								</svg>
							)}

							{generatingImg && (
								<div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
									<Loader />
								</div>
							)}
						</div>
						{form.photo.length > 1 && (
							<div className='mt-3 flex items-center gap-3 mx-auto w-fit'>
								{form.photo.map((item, index) => (
									<div key={index} className={'relative border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 flex justify-center items-center cursor-pointer ' + (bigImage === item.image_b64 ? "bg-blue-500" : "bg-gray-50")} onClick={() => {
										setBigImage(item.image_b64)
									}}>
										<img src={"data:image/jpeg;base64," + item.image_b64} alt={form.prompt} className='w-full h-full max-w-20 max-h-20 object-contain rounded-md' />
										{generatingImg && (
											<div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
												<Loader />
											</div>
										)}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</form>
		</section>
	)
}

export default CreatePost