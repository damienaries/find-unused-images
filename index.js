#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const fg = require('fast-glob');

async function findUnusedImages(
	imageGlob = 'public/**/*.{jpg,jpeg,png,gif,svg,webp}'
) {
	// Find all images in the project
	const imageFiles = await fg(imageGlob);

	// Find all the files that could reference images
	const codeFiles = await fg([
		'src/**/*.{js,jsx,ts,tsx,vue,html,css}',
		'public/**/*.html',
	]);

	// Read all code files to check for image usage
	const usedImages = new Set();

	for (const file of codeFiles) {
		const content = fs.readFileSync(file, 'utf8');

		for (const image of imageFiles) {
			const imageName = path.basename(image);
			if (content.includes(imageName)) {
				usedImages.add(image);
			}
		}
	}

	// find the unused images
	const unusedImages = imageFiles.filter((image) => !usedImages.has(image));

	return unusedImages;
}

if (require.main === module) {
	findUnusedImages().then((unusedImages) => {
		console.log('Unused images', unusedImages);
	});
}

module.exports = findUnusedImages;
