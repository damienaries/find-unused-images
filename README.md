# Find Unused Images

A simple Node.js tool to find unused image files in a codebase. It scans your project directories for image files and checks which ones are actually being used in your code. This tool is particularly useful for cleaning up unused assets from your project.

## Features

- Scans specified directories for image files (e.g., `.png`, `.jpg`, `.svg`).
- Matches the image files against your codebase to detect which ones are used and which ones are unused.
- Configurable directories and file types (e.g., `.js`, `.ts`, `.jsx`).
- Outputs a list of unused image files.

## Installation

Install the tool as an npm package:

```bash
npm install find-unused-images --save-dev
```

## Usage

After installation, you can use the tool by running the following command from your terminal:

```bash
npx find-unused-images
```

## Configuration

By default, the tool will scan the following:

- Directories: `./public`, `./src` (You can add more directories to scan).
- File types: `.js`, `.jsx`, `.ts`, `.tsx`, `.vue`, `.html`, `.css`, `.blade.php` (You can change this as per your needs).
- Image types: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`.

If you'd like to customize these settings, the tool will prompt you during installation to configure the directories and file types. The configurations are saved in a `config.json` file.

## Running the Tool

1. **Directory Scan**: The tool will scan the directories you specified for all matching files based on the extensions you defined.
2. **Code File Scan**: It will read the content of each code file and check if any image is referenced.
3. **Unused Images**: After scanning, it will output the list of image files that are not used in your codebase.

### Example

```bash
$ npx find-unused-images
Found 150 image files.
Found 50 code files.
Unused images:
- public/images/logo.png
- src/assets/bg.jpg
```

## Custom Configuration

You can customize the directories and file types by editing the `config.json` file in the root of your project. If this file doesn't exist, the tool will create it after the first run.

```json
{
	"directories": ["./assets", "./src", "./public"],
	"fileTypes": [".js", ".jsx", ".html", ".css"],
	"imageTypes": [".png", ".jpg", ".jpeg", ".gif", ".svg"]
}
```

- `directories`: An array of directories to scan for files.
- `fileTypes`: An array of file extensions to check for references to image files.
- `imageTypes`: An array of image file extensions to look for.

## How it Works

1. The tool uses `fast-glob` to scan the specified directories for image files and code files based on the extensions you provide.
2. It then reads the content of the code files and checks if any image filenames appear in the content.
3. Images that are not referenced in the code are considered "unused."
4. The list of unused images is returned, which you can then use to clean up unnecessary files from your project.

## Code Overview

- **Image File Matching**: `fast-glob` is used to match all image files in the specified directories based on extensions like `.png`, `.jpg`, etc.
- **File Scanning**: The tool scans code files (e.g., `.js`, `.tsx`) for references to image files.
- **Set to Track Used Images**: A `Set` is used to track image filenames found in the code files.
- **Unused Images Calculation**: After scanning, the tool compares the used images against all image files and returns the unused ones.

## Development

If you'd like to contribute to the project or modify it, feel free to clone the repo and make your changes.

1. Clone the repo:

```bash
git clone https://github.com/your-username/find-unused-images.git
```

2. Install dependencies:

```bash
npm install
```

3. Make your changes and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
