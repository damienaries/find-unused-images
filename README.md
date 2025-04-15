# 🧹 Find Unused Images

A simple Node.js CLI tool that detects and removes **unused image files** from your codebase. It scans your project for images (e.g., `.png`, `.svg`, `.webp`) and checks for references in your source files (e.g., `.js`, `.vue`, `.html`, etc).

This tool is perfect for cleaning up unused assets, whether you’re working on a frontend or backend project.

---

## ✨ Features

- Detects unused image files across popular frameworks.
- Supports a wide range of static and asset folders.
- Uses a default configuration that covers the most common file structures.
- Outputs a clear, formatted list of unused images with file paths.

---

## ⚙️ Frameworks Supported

### Frontend:

- **React** (CRA, Vite)
- **Next.js**
- **Vue 2/3** (Vue CLI, Vite)
- **Angular**
- **Svelte** / **SvelteKit**

### Backend:

- **Laravel** (PHP)
- **Django** (Python)
- **Flask** (Python)
- **ASP.NET Core**
- **Express.js**
- **Ruby on Rails**

---

## 📦 Installation

Install as a development dependency:

````bash
npm install find-unused-images --save-dev


## Usage

After installation, you can execute by running the following command from your terminal:

```bash
npx find-unused-images
````

## 🔧 Default Configuration

The script is preconfigured with sensible defaults that cover a wide range of frameworks and file structures. By default, it will:

### 📁 Search the following directories for image files:

- `./public/images`
- `./src/assets/images`
- `./static/images`
- `./src/lib/assets/images`
- `./wwwroot/images`
- `./storage/app/public`
- `./uploads`
- `./media`
- `./app/assets/images`

### 🖼️ Look for image file types:

- `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`

### 🧠 Scan code files with the following extensions for references:

- `.js`, `.jsx`, `.ts`, `.tsx`, `.vue`, `.svelte`
- `.html`, `.css`, `.blade.php`, `.cshtml`, `.py`, `.rb`, `.php`

> The search will include all these folders and file types by default. There’s no additional configuration required on your part.

### Example

```bash
$ find-unused-images
Generated file patterns [
	'public/**/*{.js,.jsx,.ts,.tsx,.vue,.blade.php,.html,.css}',
  'src/**/*{.js,.jsx,.ts,.tsx,.vue,.blade.php,.html,.css}',
	'resources/**/*{.js,.jsx,.ts,.tsx,.vue,.blade.php,.html,.css}'
]
Found 150 image files.
Scanning 50 code files.
Unused images:
- 'public/images/logo.png'
- 'src/assets/bg.jpg'
```

## 🧠 How It Works

1. It uses `fast-glob` to recursively scan all **default directories** for image and code files.
2. It reads the content of every matched code file and checks whether any image filenames appear in the code.
3. Image references can be direct (e.g., `src="logo.png"`) or inside custom component attributes (e.g., `<Image src="logo" />`).
4. Any image file that is not referenced in any code file is marked as **unused**.
5. A list of these unused image file paths is printed to the console for review and cleanup.

---

## 🧬 Code Overview

- **Image Matching**: `fast-glob` scans all default image folders for file extensions like `.png`, `.jpg`, `.svg`, etc.
- **Code Scanning**: The tool scans code files (e.g., `.js`, `.vue`, `.php`, etc.) for any references to the image file names.
- **Tracking Usage**: A `Set` is used to track which image files are actually referenced in the codebase.
- **Filtering Unused**: The final list of unused images is computed by comparing all found image files against those marked as used.

> No manual config or prompts required — the scan is fully automatic based on the built-in defaults.

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
