import React from 'react'
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom"

// Pages
import { CreatePost, DetailedPost, Home, StyleDetails } from './pages'

const App = () => {
	return (
		<Router>
			<header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
				<Link to="/">
					<div className='flex items-center gap-2'>
						<svg viewBox="0 0 100.000000 100.000000" className='w-12 object-contain'>
							<g
								transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
								fill="#000000"
								stroke="none"
							>
								<path d="M365 909 c-83 -19 -155 -110 -155 -196 0 -32 -5 -44 -25 -57 -41 -27 -83 -94 -95 -152 -15 -69 5 -143 53 -199 19 -22 37 -52 40 -66 12 -46 63 -105 114 -130 63 -31 141 -31 201 0 l42 21 0 80 0 80 65 0 c62 0 65 -1 65 -23 0 -13 -9 -32 -20 -42 -20 -18 -27 -66 -14 -100 9 -23 61 -47 87 -39 63 19 89 92 47 134 -16 16 -20 33 -20 85 l0 64 -102 3 -103 3 -3 43 -3 42 130 0 c118 0 133 -2 151 -20 21 -21 69 -26 99 -10 31 16 46 65 31 100 -22 53 -85 67 -133 30 -22 -18 -40 -20 -151 -20 l-126 0 0 40 0 40 105 0 105 0 0 70 c0 57 4 74 20 90 42 42 16 115 -47 134 -26 8 -78 -16 -87 -39 -13 -34 -6 -82 14 -100 11 -10 20 -29 20 -42 0 -22 -3 -23 -65 -23 l-65 0 0 86 0 85 -32 13 c-49 20 -98 25 -143 15z m79 -85 c13 -5 16 -27 16 -134 0 -113 -2 -130 -20 -153 -11 -14 -29 -29 -40 -32 -16 -5 -20 -15 -20 -46 0 -42 8 -47 54 -29 l26 10 0 -129 c0 -125 -1 -129 -22 -135 -84 -22 -166 25 -184 107 -3 17 -17 39 -29 49 -70 55 -73 181 -6 242 21 19 22 19 54 -12 18 -18 35 -32 38 -32 2 0 13 15 23 34 18 33 18 33 -8 60 -32 35 -41 76 -26 121 21 63 89 100 144 79z" />
							</g>
						</svg>
						<p className='text-3xl font-bold'>MidJarni</p>
					</div>
				</Link>
				<Link to="/create-post" className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>Create</Link>
			</header>
			<main className='sm:p-8 px-8 py-8 w-full bg-[#F3F8FF] min-h-[calc(100vh-73px)]'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/create-post' element={<CreatePost />} />
					<Route path='/post/:id' element={<DetailedPost />} />
					<Route path='/style/:stylePreset' element={<StyleDetails />} />
				</Routes>
			</main>
			<div className='fixed bottom-0 left-0 w-full flex justify-between items-center bg-white sm:px-8 px-4 py-1 border-t border-t-[#e6ebf4]'>
				<p className='text-xs text-center w-full'>Created by <a href='https://github.com/Shubham020303' target='_blank' className='font-bold hover:underline'>Shubham Bhogayta</a></p>
			</div>
		</Router>
	)
}

export default App