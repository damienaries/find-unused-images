import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function askForConfig() {
	const answers = await inquirer.prompt([
		{
			type: 'input',
			name: 'directories',
			message:
				'Enter a comma separated list of directories to scan (default: ./public, ./src):',
			default: './public, ./src',
		},
		{
			type: 'input',
			name: 'extensions',
			message:
				'Enter a comma separated list of file types to scan (default: .js, .jsx, .ts, .tsx, .vue, .blade.php, .html, .css):',
			default: '.js, .jsx, .ts, .tsx, .vue, .blade.php, .html, .css',
		},
		{
			type: 'input',
			name: 'imageTypes',
			message:
				'Enter a comma separated list of file types to scan (default: png, jpg, jpeg, gif, svg, webp):',
			default: 'png, jpg, jpeg, gif, svg, webp',
		},
	]);

	// save config to file
	const config = {
		directories: answers.directories.split(',').map((dir) => dir.trim()),
		fileTypes: answers.extensions.split(',').map((ext) => ext.trim()),
		imageTypes: answers.imageTypes.split(',').map((ext) => ext.trim()),
	};

	const configFilePath = path.join(__dirname, 'config.json');
	fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));

	console.log(`Config saved to ${configFilePath}`);
}

askForConfig();
