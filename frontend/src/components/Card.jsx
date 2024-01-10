import React from 'react'
import { NavLink } from 'react-router-dom'

import { downloadImage } from '../utils'

const Card = ({ _id, name, prompt, negativePrompt, photo }) => {
	return (
		<div className='rounded-xl group relative shadow-card hover:shadow-cardhover card w-full h-full min-w-full min-h-full'>
			<NavLink to={"/post/" + _id}>
				<img src={typeof (photo) === "object" ? photo[0] : photo} className='w-full h-full min-w-full min-h-full object-cover rounded-xl' alt={prompt} loading='lazy' />
				<div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md'>
					<p className='text-white text-md overflow-y-auto prompt descTruncate'>{prompt}</p>
					{negativePrompt && <p className='text-gray-400 text-xs mt-2 overflow-y-auto prompt truncate'>{negativePrompt}</p>}
					<div className='mt-5 flex justify-between items-center gap-2'>
						<div className='flex items-center gap-2'>
							<img src={"https://api.dicebear.com/7.x/initials/svg?seed=" + name + "&radius=50&scale=75"} className='w-7 h-7 aspect-square rounded-full object-cover' />
							<p className='text-white text-sm'>{name}</p>
						</div>
						<button type='button' onClick={() => downloadImage(_id, photo)} className='outline-none bg-transparent border-none'>
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
				</div>
			</NavLink>
		</div>
	)
}

export default Card