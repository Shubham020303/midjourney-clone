import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Loader } from '../components'
import { downloadImage } from '../utils'

const DetailedPost = () => {
	const [loading, setLoading] = useState(false)
	const [post, setPost] = useState(null)
	const { id } = useParams("id")

	useEffect(() => {
		const fetchPost = async () => {
			setLoading(true)
			scrollTo(0, 0)

			try {
				const response = await fetch("# https://midjourney-2-0.onrender.com/api/v1/post/getPost?id=" + id, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					},
				})

				if (response.ok) {
					const result = await response.json()
					setPost(result.data[0])
				}
			} catch (error) {
				alert(error)
			} finally {
				setLoading(false)
			}
		}
		fetchPost()
	}, [])

	return (

		<section className='max-w-7xl mx-auto flex flex-col lg:flex-row gap-5 mb-10'>
			{loading ? (
				<div className='flex items-center justify-center w-full'>
					<Loader />
				</div>
			) : (
				<>
					<div className='lg:w-[30%] h-full'>
						<div>
							<p className='text-gray-400'>Prompt</p>
							<div className='border border-[#6469ff] bg-white rounded-lg p-2 px-3 mt-2'>
								<p className='text-md font-medium'>{post?.prompt}</p>
							</div>
						</div>
						<div className='my-5 flex items-center lg:justify-start justify-between gap-3'>
							<div className='flex items-center gap-2 bg-[#6469ff] rounded-lg text-white p-2 lg:px-6 px-4 cursor-pointer whitespace-nowrap' onClick={() => {
								navigator.clipboard.writeText(post?.prompt);
								document.getElementById("copyPrompt").innerText = "Copied!"
								document.getElementById("copyPromptSVG").classList.add("hidden")
								setTimeout(() => {
									document.getElementById("copyPrompt").innerText = "Copy Prompt"
									document.getElementById("copyPromptSVG").classList.remove("hidden")
								}, 1000)
							}}>
								<svg
									stroke="currentColor"
									fill="none"
									strokeWidth={2}
									viewBox="0 0 24 24"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="h-4 w-4"
									id='copyPromptSVG'
								>
									<rect x={9} y={9} width={13} height={13} rx={2} ry={2} />
									<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
								</svg>
								<p id='copyPrompt'>Copy Prompt</p>
							</div>
							<div className='flex items-center gap-2 bg-[#6469ff] rounded-lg text-white p-2 lg:px-8 px-4 cursor-pointer whitespace-nowrap' onClick={() => {
								navigator.clipboard.writeText(window.location.href);
								document.getElementById("copyURL").innerText = "Copied!"
								document.getElementById("copyURLSVG").classList.add("hidden")
								setTimeout(() => {
									document.getElementById("copyURL").innerText = "Copy URL"
									document.getElementById("copyURLSVG").classList.remove("hidden")
								}, 1000)
							}}>
								<svg
									stroke="currentColor"
									fill="none"
									strokeWidth={2}
									viewBox="0 0 24 24"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="h-4 w-4"
									id='copyURLSVG'
								>
									<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
									<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
								</svg>
								<p id='copyURL'>Copy URL</p>
							</div>
						</div>
						{post?.negativePrompt && (
							<>
								<div>
									<p className='text-gray-400'>Negative Prompt</p>
									<div className='border border-[#6469ff] bg-white rounded-lg p-2 px-3 mt-2'>
										<p className='text-lg font-medium'>{post?.negativePrompt}</p>
									</div>
								</div>
								<div className='my-5 w-fit flex items-center gap-2 bg-[#6469ff] rounded-lg text-white p-2 px-6 cursor-pointer'>
									<svg
										stroke="currentColor"
										fill="none"
										strokeWidth={2}
										viewBox="0 0 24 24"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="h-4 w-4"
									>
										<rect x={9} y={9} width={13} height={13} rx={2} ry={2} />
										<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
									</svg>
									<p>Copy Negative Prompt</p>
								</div>
							</>
						)}
						{post?.stylePreset && (
							<div>
								<p className='text-gray-400'>Style</p>
								<div className='flex items-center gap-3'>
									<div className='border border-[#6469ff] bg-white rounded-lg p-2 px-6 mt-2'>
										<p className='capitalize'>{post?.stylePreset}</p>
									</div>
									<Link to={"/style/" + post?.stylePreset} target='_blank'>
										<div className='mt-2 w-fit flex items-center gap-2 bg-[#6469ff] rounded-lg text-white p-3 cursor-pointer'>
											<svg
												stroke="currentColor"
												fill="none"
												strokeWidth={2}
												viewBox="0 0 24 24"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="h-4 w-4"
											>
												<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
												<polyline points="15 3 21 3 21 9" />
												<line x1={10} y1={14} x2={21} y2={3} />
											</svg>
										</div>
									</Link>
								</div>
							</div>
						)}
						{post?.dimensions && (
							<div className='my-5'>
								<p className='text-gray-400'>Dimensions</p>
								<div className='border border-[#6469ff] bg-white rounded-lg p-2 px-3 mt-2'>
									<p className='text-md font-medium'>{post?.dimensions}</p>
								</div>
							</div>
						)}
						<div className='my-5'>
							<p className='text-gray-400'>Creator</p>
							<div className='flex items-center gap-2 mt-2'>
								<img src={"https://api.dicebear.com/7.x/initials/svg?seed=" + post?.name + "&radius=50&scale=80"} className='w-7 h-7 aspect-square rounded-full object-cover' />
								<p className='text-md'>{post?.name}</p>
								{/* <div className='w-fit flex items-center gap-2 bg-[#6469ff] rounded-lg text-white p-2 cursor-pointer'>
							<svg
								stroke="currentColor"
								fill="none"
								strokeWidth={2}
								viewBox="0 0 24 24"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-3 w-3"
							>
								<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
								<polyline points="15 3 21 3 21 9" />
								<line x1={10} y1={14} x2={21} y2={3} />
							</svg>
						</div> */}
							</div>
						</div>
					</div>
					<div className='lg:w-[70%] h-full grid lg:grid-cols-2 grid-cols-1 gap-3'>
						{post?.photo.map((item, index) => (
							<div key={index} className='relative'>
								<img src={item} className='rounded-lg' />
								<button type='button' onClick={() => downloadImage(post?._id, item)} className='absolute bottom-4 right-4 outline-none bg-transparent border-none'>
									<svg
										fill="currentColor"
										className='w-6 h-6 object-contain invert'
										viewBox="0 0 16 16"
									>
										<path
											fillRule="evenodd"
											d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"
										/>
									</svg>
								</button>
							</div>
						))}
					</div>
				</>
			)}
		</section>
	)
}

export default DetailedPost