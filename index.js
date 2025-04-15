#!/usr/bin/env node

import { readFileSync } from 'fs';
import { basename } from 'path';
import fg from 'fast-glob';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './config.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);

// function to scan for image files ina  directory
async function getImageFiles(directories, imageTypes) {
	const imagePatterns = directories.map((directory) => {
		return path.join(directory, `**/*{${imageTypes.join(',')}}`);
	});

	return fg(imagePatterns).then((files) => files);
}

async function findUnusedImages(directories, fileTypes, imageTypes) {
	try {
		// get the image files from the directories
		const imageFiles = await getImageFiles(directories, imageTypes);
		const imageNames = imageFiles.map((image) =>
			basename(image, path.extname(image))
		);

		// construct file patterns
		const filePatterns = directories.map((dir) =>
			path.join(dir, `**/*{${fileTypes.join(',')}}`)
		);

		console.log('Generated File Patterns:', filePatterns);

		// get all code files
		const codeFiles = await fg(filePatterns);
		console.log(`Found ${imageFiles.length} image files`);
		console.log(`Scanning ${codeFiles.length} code files`);

		const componentRegex = new RegExp(
			`<[a-zA-Z-]+[^>]*(?:icon|src|name|filename)=["']([^"']+)["']`,
			'gi'
		);

		// Read all code files to check for image usage
		const usedImages = new Set();

		for (const file of codeFiles) {
			const content = readFileSync(file, 'utf8');

			// check for direct file references
			for (const image of imageFiles) {
				const imageName = basename(image);
				if (content.includes(imageName)) {
					usedImages.add(image);
				}
			}

			// check for component-based references
			let match;
			while ((match = componentRegex.exec(content)) !== null) {
				const extractedName = match[1];
				if (imageNames.includes(extractedName)) {
					const fullPath = imageFiles.find((img) => {
						return basename(img, path.extname(img)) === extractedName;
					});
					if (fullPath) {
						usedImages.add(fullPath);
					}
				}
			}
		}

		// find the unused images
		const unusedImages = imageFiles.filter((image) => !usedImages.has(image));

		return unusedImages;
	} catch (e) {
		console.error('Error finding unused images', e);
	}
}

if (import.meta.url === `file://${__filename}`) {
	findUnusedImages(config.directories, config.fileTypes, config.imageTypes)
		.then((unusedImages) => {
			if (unusedImages.length) {
				console.log('Found unused images:', unusedImages);
			} else {
				console.log('No unused images found');
			}
		})
		.catch((e) => {
			console.error('Error finding unused images', e);
		});
}

export default findUnusedImages;
