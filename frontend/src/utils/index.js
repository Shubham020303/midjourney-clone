import FileSaver from "file-saver"

import { surpriseMePrompts } from "../constants";

export const getRandomPrompt = (prompt) => {
	const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
	const randomPrompt = surpriseMePrompts[randomIndex];

	if (randomPrompt === prompt) return getRandomPrompt(prompt)

	return randomPrompt
}

export const downloadImage = async (_id, photo) => {
	if (typeof (photo) === "object") {
		FileSaver.saveAs(photo[0], `download-${_id}.jpg`)
	}
	else {
		FileSaver.saveAs(photo, `download-${_id}.jpg`)
	}
}