# ⚡ Smart Image Compressor

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

> **A secure, client-side image compressor that respects your privacy.**

Unlike other tools that upload your photos to a server, **Smart Image Compressor** processes everything inside your browser. Your images never leave your device.


## ✨ Features

### Core Functionality
- **🔒 100% Privacy:** No server uploads. All compression happens locally in your browser.
- **🎯 Target-Based Compression:** Specify exact output size in KB - the app will automatically compress to meet your target.
- **⚡ Real-Time Preview:** See quality changes instantly with debounced compression.
- **📊 Before vs After:** Side-by-side comparison to ensure your details remain sharp.

### Smart Controls
- **🎛️ Precise Quality Control:** Fine-tune compression from 1-100 quality.
- **📁 Format Selection:** Keep original format or choose output type.
- **📋 Clipboard Support:** Paste images directly from clipboard (Ctrl+V).

### User Experience
- **⚠️ Error Handling:** User-friendly toast notifications for all error scenarios.
- **🎨 Modern Dark UI:** Clean, professional interface with smooth animations.
- **🚀 Performance Optimized:** Memory leak fixes and efficient resource cleanup.

---

## 🏗️ Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS v4 + Custom CSS animations
- **Compression:** `browser-image-compression` library

---

## 💻 Installation

Follow these steps to run the project on your machine.

### Step 1: Clone the repository
```bash
git clone https://github.com/ShujaullahQazi/smart-image-compressor.git
```
---

### **Step 2: Navigate to the folder**
```bash

cd smart-image-compressor
```
---

### Step 3: Install dependencies
```bash

npm install
```
---

### Step 4: Start the App
```bash

npm run dev
```
---

### Step 5: Open in Browser
Visit `http://localhost:5173` to see the app running.

### Troubleshooting
- **Port already in use?** Vite will automatically try the next available port (5174, 5175, etc.)
- **Dependencies error?** Try deleting `node_modules` and running `npm install` again
- **Build issues?** Make sure you're using Node.js version 18 or higher

---

## 📖 How It Works

### Smart Compression Algorithm
1. **Target-Based:** Set your desired output size (e.g., 50KB for passport photos)
2. **Auto-Calculate:** The app calculates optimal quality and dimension settings
3. **Iterative Approach:** Uses binary search to find the perfect compression ratio
4. **Canvas API:** Browser's native canvas redraws the image at optimized settings
5. **Instant Download:** Compressed image converted to Blob for immediate download

### Privacy First
- All processing happens in your browser using the Canvas API
- Zero server uploads or external API calls
- Images never leave your device
- No data collection or tracking

---

## 📱 Usage Guide

### Basic Compression
1. **Upload Image:** 
   - Drag & drop an image onto the dropzone
   - Or click to browse and select a file
   - Or paste from clipboard (Ctrl+V)

2. **Adjust Target Size:** 
   - Use the slider to set your desired output size in KB
   - The app will automatically compress to meet this target
   - Default is 80% of original size

3. **Fine-Tune Quality:** 
   - Adjust the quality slider (1-100) for manual control
   - See real-time preview of changes

4. **Download:** 
   - Click "Download Compressed" to save your optimized image
   - File is named with `-compressed` suffix

### Supported Formats
JPG, JPEG, PNG, WebP, GIF, BMP

### File Size Limits
- Maximum upload: 10MB
- Recommended for best results: Under 5MB

---

## 🔮 Roadmap

### ✅ Completed
- [x] **Target File Size:** Auto-compress to specific KB size (implemented)
- [x] **Error Handling:** User-friendly error notifications
- [x] **Clipboard Support:** Paste images directly
- [x] **Memory Optimization:** Fixed memory leaks and cleanup

### 🎯 Upcoming Features
- [ ] **Batch Processing:** Compress multiple images at once
- [ ] **Format Conversion:** Advanced format options (WebP, AVIF)
- [ ] **Preset Templates:** Quick presets for common use cases (passport, social media, etc.)
- [ ] **Comparison Slider:** Interactive before/after comparison

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Commit your Changes (`git commit -m 'Add NewFeature'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center"> Built with ❤️ by <a href="https://github.com/ShujaullahQazi">Shujaullah Qazi</a> </p>
