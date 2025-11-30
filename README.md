# 🖼️ Image Compressor

A modern, browser-based image compression tool that reduces file sizes while maintaining visual quality. Built with React and Vite, featuring a Squoosh.app-inspired interface with real-time compression preview.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-ISC-blue)

## ✨ Features

- **🖼️ Multiple Upload Methods**
  - Drag and drop images
  - Click to browse files
  - Paste from clipboard (Ctrl+V)

- **⚡ Real-Time Compression**
  - Quality slider (0-100) for precise control
  - Instant preview as you adjust
  - Debounced compression for smooth performance

- **📊 Side-by-Side Comparison**
  - Before/after view with original and compressed images
  - File size display on each image
  - Compression statistics (size reduction percentage)

- **🎨 Modern UI**
  - Dark theme interface
  - Responsive design
  - Smooth animations and transitions

- **💾 Easy Download**
  - One-click download of compressed images
  - Preserves original filename with "compressed-" prefix

## 🚀 Live Demo

[Add your Vercel deployment URL here]

## 🎯 How It Works

1. **Upload**: Drag, drop, or paste an image into the app
2. **Adjust**: Use the quality slider (0-100) to control compression
3. **Preview**: See the compressed image update in real-time
4. **Compare**: View original and compressed images side-by-side
5. **Download**: Save your optimized image with one click

The compression algorithm uses the `browser-image-compression` library, which:
- Automatically adjusts quality to meet target file size
- Uses Web Workers for non-blocking compression
- Maintains image dimensions up to 1920px
- Applies aggressive compression at lower quality settings

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm

### Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/image-compression.git

# Navigate to the project directory
cd image-compression

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🛠️ Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

The production files will be in the `dist/` directory.

## 🏗️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **browser-image-compression** - Image compression library
- **Tailwind CSS** - Styling (via CDN)

## 📖 Usage

### Basic Usage

1. Open the app in your browser
2. Upload an image using any method (drag & drop, click, or paste)
3. Adjust the quality slider to your desired compression level
4. Compare the original and compressed images
5. Click the download button to save your compressed image

### Quality Settings

- **0-30**: Aggressive compression, smaller file sizes, noticeable quality loss
- **31-60**: Balanced compression, good file size reduction, minimal quality loss
- **61-100**: Light compression, larger file sizes, near-original quality

### Supported Formats

- JPEG/JPG
- PNG
- WEBP
- Other browser-supported image formats

## 🎨 Features in Detail

### Real-Time Compression
The app compresses images in real-time as you adjust the quality slider. Compression is debounced (300ms) to prevent excessive processing.

### Smart Compression Algorithm
- Quality 0-29: Max dimension 1280px, very aggressive compression
- Quality 30-59: Max dimension 1600px, balanced compression
- Quality 60-100: Max dimension 1920px, light compression

### File Size Optimization
The compression algorithm automatically adjusts to meet target file sizes while maintaining the best possible quality for the selected compression level.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Inspired by [Squoosh.app](https://squoosh.app/)
- Built with [browser-image-compression](https://github.com/Donaldcwl/browser-image-compression)

## 📧 Contact

[Add your contact information or GitHub profile link]

---

⭐ If you find this project helpful, please consider giving it a star!
