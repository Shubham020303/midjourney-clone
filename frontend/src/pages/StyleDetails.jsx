import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Loader } from '../components'

import { downloadImage } from '../utils'

const StyleDetails = () => {
	const [loading, setLoading] = useState(false)
	const [posts, setPosts] = useState(null)
	const [imageToPreview, setImageToPreview] = useState("")
	const [imageToPreviewId, setImageToPreviewId] = useState("")
	const { stylePreset } = useParams("stylePreset")

	useEffect(() => {
		const fetchPost = async () => {
			setLoading(true)
			scrollTo(0, 0)

			try {
				const response = await fetch("https://midjourney-2-0.onrender.com/api/v1/post/getStyle?style=" + stylePreset, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					},
				})

				if (response.ok) {
					const result = await response.json()
					setPosts(result.data)
				}
			} catch (error) {
				alert(error)
			} finally {
				setLoading(false)
			}
		}
		fetchPost()
	}, [])
	console.log(posts);

	return (
		<section className='max-w-7xl mx-auto'>
			<dialog id="imagePreview" className='w-full h-full backdrop-blur-lg bg-transparent fixed top-0 left-0 overflow-visible shadow-lg'>
				<img src={imageToPreview} className='w-full h-full object-contain' />
				<div className='bg-[#6469ff] absolute bottom-2 right-2 text-white p-1.5 px-4 rounded-lg flex items-center gap-2 cursor-pointer active:scale-110 transition-all duration-300' onClick={() => {
					downloadImage(imageToPreviewId, imageToPreview)
				}}>
					<svg
						fill="currentColor"
						className="w-5 h-5 text-white"
						viewBox="0 0 16 16"
					>
						<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
						<path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
					</svg>
					<p>Download</p>
				</div>
				<div className='absolute -top-4 -right-4 bg-[#6469ff] rounded-full p-2 cursor-pointer' onClick={() => {
					document.body.style.overflow = "visible"
					document.getElementById('imagePreview').close()
				}}>
					<svg
						fill="currentColor"
						className="w-5 h-5 text-white"
						viewBox="0 0 16 16"
					>
						<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
					</svg>
				</div>
			</dialog>

			<div>
				<h1 className='font-extrabold text-[#222328] text-[32px] capitalize'>{stylePreset}</h1>
				<p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>Browse through a collection of imagenative and visually stunning images generated with {stylePreset} style.</p>
			</div>

			{posts?.length > 0 && posts?.map((item, index) => (
				<div key={index} className='my-10'>
					<div className='flex items-center gap-2 mt-2'>
						<img src={"https://api.dicebear.com/7.x/initials/svg?seed=" + item.name + "&radius=50&scale=80"} className='w-7 h-7 aspect-square rounded-full object-cover' />
						<p className='text-md'>{item.name}</p>
					</div>
					<div className="my-5">
						<p className='text-gray-400'>Prompt</p>
						<div className='flex flex-col lg:flex-row items-start lg:items-center gap-2 w-full'>
							<div className='border border-[#6469ff] bg-white rounded-lg p-2 px-3 mt-2 w-full'>
								<p className='text-md font-medium'>{item.prompt}</p>
							</div>
							<Link to={"/post/" + item._id} target='_blank'>
								<div className='mt-2 w-fit flex items-center gap-2 bg-[#6469ff] rounded-lg text-white p-3 cursor-pointer'>
									<p className='block lg:hidden'>View post</p>
									<svg
										stroke="currentColor"
										fill="none"
										strokeWidth={2}
										viewBox="0 0 24 24"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="h-5 w-5"
									>
										<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
										<polyline points="15 3 21 3 21 9" />
										<line x1={10} y1={14} x2={21} y2={3} />
									</svg>
								</div>
							</Link>
						</div>
					</div>
					<div className='grid grid-cols-1 lg:grid-cols-4 gap-3'>
						{item?.photo?.map((photo, index2) => (
							<img key={index2} src={photo} className='rounded-lg cursor-pointer' onClick={() => {
								document.body.style.overflow = "hidden"
								document.getElementById('imagePreview').showModal()
								setImageToPreview(photo)
								setImageToPreviewId(item._id)
							}} />
						))}
					</div>
				</div>
			))}
		</section>
	)
}

export default StyleDetails